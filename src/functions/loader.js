import * as core from '@actions/core';

import * as fs from 'fs';
import { exec } from 'child_process';
import * as http from 'http';

import { BUILD_TOOLS_URL, runtimes, current, BUILDS_PAPER, BUILDS_PURPUR, BUILDS_WATERFALL } from '../assets/runtime';
import * as versions from '../assets/versions/minecraft';
import * as versionsVelocity from '../assets/versions/velocity';
export function getRuntime() {
    return runtimes[current] ?? throw new TypeError(`Runtime ${current} not found`);
}

export function loadServer(callback) {
    const runtime = getRuntime()
    const folder = fs.mkdtempSync('server')

    if (runtime === 'velocity') {

        return folder
    }

    if (!versions.isAvailable())
        throw new TypeError(`Version ${versions.current} not found`);

    switch (runtime['download'] ?? 'url') {
        case 'buildtools': {
            const buildtools = fs.mkdtempSync('buildtools')
            const jar = fs.createWriteStream(`${buildtools}/BuildTools.jar`)
            const flags = runtime['flags'].replace('{version}', versions.current)

            http.get(BUILD_TOOLS_URL, res => {
                res.pipe(jar)

                jar.on('finish', () => {
                    jar.close()

                    exec(`java -jar BuildTools.jar ${flags}`, (error, stdout, stderr) => {
                        if (error) throw error;
                        if (stderr) throw stderr;

                        fs.cpSync(`${buildtools}/${runtime['output'].replace('{version}', versions.current)}`, `${folder}/server.jar`)
                        callback()
                    })
                })
            })

            break;
        }
        case 'git': {
            const git = fs.mkdtempSync('git')
            const repo = runtime['url']
            const target = runtime['target']

            exec(`git clone ${repo} ${git}`, (error, stdout, stderr) => {
                if (error) throw error;
                if (stderr) throw stderr;

                fs.cpSync(`${git}/${target}`, `${folder}/server.jar`)
                callback()
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
                    buildsUrl = BUILDS_WATERFALL.replace('{version}', versionsVelocity.current)
                    break;
                }
                default: {
                    throw new TypeError(`Download method ${runtime['download']} not found: Could not find {build} for ${current}`);
                }
            }

            http.get(buildsUrl, res => res.json().then(json => {
                let build = 0
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

                http.get(url, res => {
                    res.pipe(jar)

                    jar.on('finish', () => {
                        jar.close()
                    })
                })
            }))

            break;
        }
        default: {
            throw new TypeError(`Download method ${runtime['download']} not found: Invalid Runtime ${current}`);
        }
    }

    return folder
}