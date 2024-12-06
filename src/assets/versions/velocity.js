export const versions = {
  "latest": "3.4.0-SNAPSHOT",
  "versions": [
    "3.4.0-SNAPSHOT",
    "3.3.0-SNAPSHOT",
    "3.2.0-SNAPSHOT",
    "3.1.2-SNAPSHOT",
    "3.1.1-SNAPSHOT",

    "3.1.1",
    "3.1.0",

    "1.1.9",
    "1.0.10"
  ]
}

export const latest = versions.latest

export function isAvailable(version) {
  return versions.versions.includes(version)
}