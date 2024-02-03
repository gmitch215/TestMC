import * as fs from 'fs'
import '../inputs.js'

const pluginPath = `${process.cwd()}/tests/plugin.jar`

if (!fs.existsSync(pluginPath))
    throw new Error(`Test Plugin in '${pluginPath}' does not exist`)

// Other Inputs
process.env['INPUT_PATH'] = pluginPath