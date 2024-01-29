import * as core from '@actions/core';

import * as fs from 'fs';
import { exec, spawn } from 'child_process';
import 'node-fetch'
import * as https from 'https'

import {
    BUILD_TOOLS_URL,
    BUILDS_PAPER,
    BUILDS_PURPUR,
    BUILDS_VELOCITY,
    BUILDS_WATERFALL,
    current,
    runtimes
} from '../assets/runtime';
import * as versions from '../assets/versions/minecraft';
import * as versionsVelocity from "../assets/versions/velocity";

export function getRuntime() {
    let runtime = runtimes[current];
    if (!runtime) throw new TypeError(`Runtime ${current} not found`);

    return runtime;
}


export function loadServer(callback) {
    const runtime = getRuntime()
    const folder = fs.mkdtempSync('server')

    if (runtime === 'velocity') {
        if (!versionsVelocity.isAvailable(versions.current))
            throw new TypeError(`Version ${versions.current} not found`);
    } else {
        if (!versions.isAvailable(versions.current))
            throw new TypeError(`Version ${versions.current} not found`);
    }

    switch (runtime['download'] ?? 'url') {
        case 'buildtools': {
            const buildtools = fs.mkdtempSync('buildtools')
            const jar = fs.createWriteStream(`${buildtools}/BuildTools.jar`)
            const flags = runtime['flags'].replace('{version}', versions.current)

            https.get(BUILD_TOOLS_URL, res => {
                res.pipe(jar)

                jar.on('finish', () => {
                    jar.close()

                    exec(`java -jar BuildTools.jar ${flags}`, (error, stdout, stderr) => {
                        if (error) throw error;
                        if (stderr) throw new Error(stderr);

                        fs.cpSync(`${buildtools}/${runtime['output'].replace('{version}', versions.current)}`, `${folder}/server.jar`)
                        callback(folder)
                    })
                })
            })

            break;
        }
        case 'git': {
            const git = fs.mkdtempSync('git')
            const repo = runtime['url']
            const target = runtime['output']

            exec(`git clone ${repo} ${git}`, (error, _, stderr) => {
                if (error) throw error;
                if (stderr) throw new Error(stderr);

                const copy = () => exec(runtime['exec'], (error, _, stderr) => {
                    if (error) throw error;
                    if (stderr) throw new Error(stderr);

                    fs.cpSync(`${git}/${target}`, `${folder}/server.jar`)
                    callback(folder)
                })

                if (runtime['versions']['current'])
                    exec(`git checkout ${runtime['versions']['current']}`, (error, _, stderr) => {
                        if (error) throw error;
                        if (stderr) throw new Error(stderr);

                        copy()
                    })
                else
                    copy()
            })
            break;
        }
        case 'url': {
            let buildsUrl = ""
            let paper = true
            switch (current) {
                case "paper": {
                    buildsUrl = BUILDS_PAPER.replace('{version}', versions.current)
                    break;
                }
                case "purpur": {
                    buildsUrl = BUILDS_PURPUR.replace('{version}', versions.current)
                    paper = false
                    break;
                }
                case "waterfall": {
                    buildsUrl = BUILDS_WATERFALL.replace('{version}', versions.current)
                    break;
                }
                case "velocity": {
                    buildsUrl = BUILDS_VELOCITY.replace('{version}', versions.current)
                    break;
                }
                default: {
                    throw new TypeError(`Download method ${runtime['download']} not found: Could not find {build} for ${current}`);
                }
            }

            fetch(buildsUrl)
                .then(res => res.json())
                .then(json => {
                    let build
                    if (paper) {
                        const builds = json['builds']
                        build = builds.reduce((acc, current) => {
                            if (current.channel === "default" ) return current;
                            return acc;
                        }, null)['build'];
                    } else
                        build = Number(json['builds']['latest'])

                    const url = runtime['url']
                        .replace('{version}', versions.current)
                        .replace('{build}', build)

                    const jar = fs.createWriteStream(`${folder}/server.jar`)

                    https.get(url, res => {
                        res.pipe(jar)

                        jar.on('finish', () => {
                            jar.close()
                            callback(folder)
                        })
                    })
            })

            break;
        }
        default: {
            throw new TypeError(`Download method ${runtime['download']} not found: Invalid Runtime ${current}`);
        }
    }
}

export function startServer(folder) {
    const flags = core.getInput('flags')

    return spawn('java', ['-jar', 'server.html', 'nogui', ...flags.split(' ')], {
        cwd: folder,
        detached: true,
        stdio: 'ignore'
    })
}