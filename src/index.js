import * as core from '@actions/core';
import {loadServer, startServer} from "./functions/loader.js";
import fs from "fs";

try {
    loadServer((folder) => {
        core.info("Server Loaded!")

        const plugin = core.getInput('path', { required: true })
        if (!fs.existsSync(plugin)) throw new Error(`Plugin in '${plugin}' does not exist`)

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
                server.kill('SIGKILL')
            }

            fs.rmSync(folder, { recursive: true, force: true, maxRetries: 10, retryDelay: 1000 })
        }

        process.on('SIGINT', signal => {
            server.emit('close', 128, signal)
        })

        server.stdout.on('data', (data) => {
            process.stdout.write(`[SERVER] ${data.toString()}`)
        })

        server.stderr.on('data', (data) => {
            process.stderr.write(`[SERVER] ${data.toString()}`)
        })

        server.on('close', (code, signal) => {
            core.info(`Server Exited with code ${code} and signal ${signal}`)
            stop()
        })

        setTimeout(stop, core.getInput('time') * 1000)
    })
} catch (error) {
    core.setFailed(error.message);
}