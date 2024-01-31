import * as fs from 'fs'

const pluginPath = `${process.cwd()}/tests/plugin.jar`

if (!fs.existsSync(pluginPath))
    throw new Error(`Test Plugin in '${pluginPath}' does not exist`)

// Set Inputs
process.env['INPUT_PATH'] = pluginPath
process.env['INPUT_TIME'] = '120'
process.env['INPUT_RUNTIME'] = 'spigot'