import * as core from '@actions/core';
import {loadServer, startServer} from "./functions/loader";
import fs from "fs";

try {
    loadServer((folder) => {
        core.info("Server Loaded!")

        const plugin = core.getInput('path')
        fs.cpSync(plugin, `${folder}/plugins`)

        core.info("Plugin Loaded! Starting...")

        const server = startServer(folder)

        setTimeout(() => {
            server.kill()
            core.info("Server Stopped!")
        }, core.getInput('time') * 1000)
    })
} catch(error) {
    core.setFailed(error.message);
}