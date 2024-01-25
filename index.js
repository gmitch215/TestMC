import * as fs from 'fs';

import * as core from '@actions/core';
import * as github from '@actions/github';

import runtime from './assets/runtime';

try {
    const runtime = core.getInput('runtime', { required: true });
    const path = core.getInput('path', { required: true });
    
    const dir = fs.mkdtempSync('server')
    

} catch(error) {
    core.setFailed(error.message);
}