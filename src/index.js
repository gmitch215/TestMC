import * as core from '@actions/core';
import {loadServer, startServer} from "./functions/loader.js";
import fs from "fs";
import { globSync } from 'glob';

try {
    loadServer((folder) => {
        core.info("Server Loaded!")

        const path = core.getInput('path', { required: true })
        const plugin = globSync(path)[0]
        if (!fs.existsSync(plugin)) throw new Error(`No files found in '${path}'`)

        fs.mkdirSync(`${folder}/plugins`)
        fs.cpSync(plugin, `${folder}/plugins/plugin.jar`)

        fs.writeFileSync(`${folder}/eula.txt`, 'eula=true')

        const files = core.getMultilineInput('files')
        if (files) {
            const files0 = globSync(files)

            if (files0.length)
                for (const file of files0) fs.cpSync(file, `${folder}/${file}`)
        }

        core.info("Plugin Loaded! Starting...")

        const server = startServer(folder)
        const stop = () => {
            if (server.exitCode) return

            server.stdin.end()
            if (server.kill()) {
                core.info("Server Stopped!")
            } else {
                core.error("Server Kill Required")
                server.kill('SIGKILL')
            }

            setTimeout(() => {
                fs.rmSync(folder, { recursive: true, force: true, maxRetries: 10, retryDelay: 1000 })
            }, 10_000)
        }

        process.on('SIGINT', stop)

        server.stdout.on('data', (data) => {
            process.stdout.write(`[SERVER] ${data.toString()}`)
        })

        server.stderr.on('data', (data) => {
            process.stderr.write(`[SERVER] ${data.toString()}`)
        })

        const commands = core.getMultilineInput('commands')
        if (commands) {
            server.stdin.setDefaultEncoding('utf-8')
            commands.forEach(command => server.stdin.write(`${command}\n`, err => {
                if (err) process.stderr.write(`[SERVER] ${err}`)
            }))
        }

        setTimeout(stop, core.getInput('time') * 1000)
    })
} catch (error) {
    core.setFailed(error.message);
}