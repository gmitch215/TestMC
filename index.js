const core = require('@actions/core');
const github = require('@actions/github');

try {} catch(error) {
    core.setFailed(error.message);
}