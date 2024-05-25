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

        core.info("Plugin Loaded! Starting...")

        const server = startServer(folder)
        const stop = () => {
            if (server.kill()) {
                core.info("Server Stopped!")
            } else {
                core.error("Server Kill Required")
                server.kill('SIGSTOP')
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

        setTimeout(stop, core.getInput('time') * 1000)
    })
} catch (error) {
    core.setFailed(error.message);
}