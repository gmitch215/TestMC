import * as core from '@actions/core'

export const versions = {
    "latest": "1.20.4",
    "versions": [
        "1.20.4",
        "1.20.3",
        "1.20.2",
        "1.20.1",
        "1.20",

        "1.19.4",
        "1.19.3",
        "1.19.2",
        "1.19.1",
        "1.19",

        "1.18.2",
        "1.18.1",
        "1.18",

        "1.17.1",
        "1.17",

        "1.16.5",
        "1.16.4",
        "1.16.3",
        "1.16.2",
        "1.16.1",

        "1.15.2",
        "1.15.1",
        "1.15",

        "1.14.4",
        "1.14.3",
        "1.14.2",
        "1.14.1",
        "1.14",

        "1.13.2",
        "1.13.1",
        "1.13",

        "1.12.2",
        "1.12.1",
        "1.12",

        "1.11.2",
        "1.11.1",
        "1.11",

        "1.10.2",
        "1.10.1",
        "1.10",

        "1.9.4",
        "1.9.3",
        "1.9.2",
        "1.9.1",
        "1.9",

        "1.8.9",
        "1.8.8",
        "1.8.7",
        "1.8.6",
        "1.8.5",
        "1.8.4",
        "1.8.3",
        "1.8.2",
        "1.8.1",
        "1.8"
    ],
    "similar_versions": {
        "1.20.4": ["1.20.3"],
        "1.20.1": ["1.20"],

        "1.19.1": ["1.19"],

        "1.18.1": ["1.18"],

        "1.17.1": ["1.17"],

        "1.16.5": ["1.16.4"],
        "1.16.3": ["1.16.2"],

        "1.15.2": ["1.15.1", "1.15"],

        "1.14.4": ["1.14.3", "1.14.2", "1.14.1", "1.14"],

        "1.13.1": ["1.13"],

        "1.12.2": ["1.12.1", "1.12"],

        "1.11.2": ["1.11.1", "1.11"],

        "1.10.2": ["1.10.1", "1.10"],

        "1.9.4": ["1.9.3", "1.9.2"],
        "1.9.1": ["1.9"],

        "1.8.9": ["1.8.8", "1.8.7", "1.8.6", "1.8.5", "1.8.4"],
        "1.8.3": ["1.8.2", "1.8.1", "1.8"],
        "1.8.2": ["1.8.1", "1.8"]
    },

    "experimental": [
        "1.13-pre7",
        "1.14-pre5",
        "1.14.3-pre4",
        "1.18-pre5",
        "1.18-pre8",
        "1.18-rc3",
    ]
}

export const latest = versions.latest
export const current = core.getInput("version").toLowerCase()
export const experimental = core.getBooleanInput('experimental')

export function similar(version) {
    for (const v in versions.similar_versions) {
        if (versions.similar_versions[v].includes(version))
            return v;

    }

    return version;
}

export function isAvailable(version) {
    return versions.versions.includes(version) || (experimental && versions.experimental.includes(version))
}
