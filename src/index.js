import * as core from '@actions/core';
import {loadServer, startServer} from "./functions/loader.js";
import fs from "fs";

try {
    loadServer((folder) => {
        core.info("Server Loaded!")

        const plugin = core.getInput('path', { required: true }) || `${process.cwd()}/tests/plugin.jar`
        if (!fs.existsSync(plugin)) throw new Error(`Plugin in '${plugin}' does not exist`)

        fs.mkdirSync(`${folder}/plugins`)
        fs.cpSync(plugin, `${folder}/plugins/plugin.jar`)

        fs.writeFileSync(`${folder}/eula.txt`, 'eula=true')

        core.info("Plugin Loaded! Starting...")

        const server = startServer(folder)
        const stop = () => {
            server.kill()
            core.info("Server Stopped!")
            fs.rmSync(folder, { recursive: true, force: true })
        }

        server.on('exit', stop)

        setTimeout(stop, core.getInput('time') * 1000)
    })
} catch (error) {
    core.setFailed(error.message);

}