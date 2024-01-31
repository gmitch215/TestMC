import * as core from '@actions/core';

export const BUILD_TOOLS_URL = "https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar";

export const BUILDS_WATERFALL = "https://api.papermc.io/v2/projects/waterfall/versions/{version}/builds"
export const BUILDS_PAPER = "https://api.papermc.io/v2/projects/paper/versions/{version}/builds"
export const BUILDS_PURPUR = "https://api.purpurmc.org/v2/purpur/{version}"
export const BUILDS_VELOCITY = "https://api.papermc.io/v2/projects/velocity/versions/{version}/builds"

export const runtimes = {
  "craftbukkit": {
    "download": "buildtools",
    "flags": "--rev {version} --compile craftbukkit",
    "output": "craftbukkit-{version}.jar"
  },
  "spigot": {
    "download": "buildtools",
    "flags": "--rev {version}",
    "output": "spigot-{version}.jar"
  },
  "paper": {
    "url": "https://api.papermc.io/v2/projects/paper/versions/{version}/builds/{build}/downloads/paper-{version}-{build}.jar"
  },
  "purpur": {
    "url": "https://api.purpurmc.org/v2/purpur/{version}/{build}/download"
  },

  "bungeecord": {
    "download": "git",
    "url": "https://github.com/SpigotMC/BungeeCord.git",
    "exec": "mvn clean install",
    "output": "bootstrap/target/BungeeCord.jar",
    "versions": {
      "1.20.3": "a1cd694363a4adbd4dcf8c7f8680cb6faf16cf50",
      "1.20.2": "0dd7b984280869fad1617dc24a8685a1eb3c7846",
      "1.20.1": "68200133b6aa06d9fd257e47c11cfe734ec001bf",
      "1.19.4": "f9712cbc7c9ec6295e4a5a646ead1dd0f2d7ed1a",
      "1.19.3": "5467e3a8424fdc4b72a26fc35d9a0432333fa4b2",
      "1.19": "eccdf87f2217ae3a0f6943134d8c61df3f9d0097",
      "1.18": "8b363d3d1fe06f56c9fca97d9807fdb41f64e3cb",
      "1.17.1": "90573625f13b91aebd077136dade67637573a0e7",
      "1.16.5": "9f6a798ea6381e23fb1a17f9667ddb70d468985a ",
      "1.16.4": "a0f9333a132079199353e1b5c63fd75b91cffa6d",
      "1.16.3": "94c4fcbad7cd6f16b31de291ddec0d254d997550",
      "1.16.2": "4786c0986b851d51ead33f5dc34235d98857cca0",
      "1.16.1": "d0fd673b60128e347fdbcab28619d12d22a4f292",
      "1.15.2": "129884f44d950ed97b36e1237dc1a098975c0475",
      "1.15": "4cccf53775fc88b008e102bfd6d0cdcc7a044ac0",
      "1.14": "3f01748d750fa96537b1d222321460b1a9b0a1a4",
      "1.13": "b1cc72e2127622385abfcb8d7cc0cc3a976576f6",
      "1.12": "ff891c000ecf4b65f9a30f092aba3d7642f5fc11",
      "1.11": "9ecdde2292885b2fbf95c43a386c291f735a1770",
      "1.10": "e4cf010bdafea747aea8932679041c90268c4940",
      "1.9": "05de455a9c46e90e2cfd823eb6cfd320c399a346",
      "1.8": "2cec5f344acf3bbc89ef7f7ac1b491b9633035ee"
    }
  },
  "waterfall": {
    "url": "https://api.papermc.io/v2/projects/waterfall/versions/{version}/builds/{build}/downloads/waterfall-{version}-{build}.jar"
  },
  "velocity": {
    "url": "https://api.papermc.io/v2/projects/velocity/versions/{version}/builds/{build}/downloads/velocity-{version}-{build}.jar"
  }
}

export const current = core.getInput('runtime', { required: true })