# 🔬 TestMC

> A GitHub Action to test Minecraft Plugins on a Server for a Specific Version

A GitHub Action that sets up a Minecraft Server/Server Proxy to test your mods and plugins on.

> [!NOTE]
> By using this GitHub Action you agree to the official [Minecraft EULA](https://www.minecraft.net/en-us/eula).
>
> This GitHub Action is not affiliated with Mojang or Microsoft.

## 📦 Setup

> [!WARNING]
> Because of the way the server exists, it is impossible to determine when the server crashes or an error is detected in the server. This is planned to be changed in a future release.

### Example Files

#### Simple Build

```yaml
jobs:
  test:
    # ...
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
      - uses: gmitch215/TestMC@v2
        with:
          # Runs Latest Version
          path: 'path/to/plugin.jar'
          runtime: 'paper'
          time: 120
```

Globs are also supported, in which case the first result is used:

```yaml
jobs:
  test:
    # ...
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
      - uses: gmitch215/TestMC@v2
        with:
          path: 'path/to/plugin/myplugin-*.jar'
          runtime: 'paper'
          version: '1.21.1' # Specify a Version
          time: 240
```

#### Using Matrix Builds

> [!TIP]
> Building a server (especially using buildtools) takes 3-5 minutes, on top of the additional server runtime. It is recommended that you utilize matrix builds to speed up runtime.

```yaml
jobs:
  test:
    strategy:
      matrix:
        runtime: ['paper', 'spigot']
        version: ['1.20.1', '1.20.2', '1.20.4', '1.20.6']
    # ...
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
      - uses: gmitch215/TestMC@v2
        with:
          path: 'path/to/plugin.jar'
          runtime: ${{ matrix.runtime }}
          version: ${{ matrix.version }}
          time: 120
          commands: |
            version
```

#### Using a Directory

You can copy a directory into the server directory before the server starts. This can be useful for specifying a `server.properties`, custom world files, etc:

```yaml
jobs:
  test:
    # ...
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
      - uses: gmitch215/TestMC@v2
        with:
          path: 'path/to/plugin.jar'
          runtime: 'purpur'  
          version: '1.21'
          time: 360
          files: | # Supports Globs; Can contain anything you want to copy
            .github/test-server/* 
            server.properties
          commands: |
            customplace 0 10 0 stone
            kill @e[type=!player]
```

### All Options

| Option Name            | Description                                                                                                             | Required            | Default Value  |
|------------------------|-------------------------------------------------------------------------------------------------------------------------|---------------------|----------------|
| `path`                 | The path to the plugin to test.                                                                                         | **true**            |                |
| `runtime`              | The runtime option to use.                                                                                              | **true**            |                |
| `version`              | The runtime (Minecraft) version to use.                                                                                 | false               | latest version |
| `time`                 | How long the server should run for, in seconds.                                                                         | false               | `120`          |
| `build`                | Optionally specify a specific build number for your inputted runtime.                                                   | on `fabric` servers | latest build   |
| `flags`                | Additional Flags to pass to the server jar.                                                                             | false               | ''             |
| `experimental`         | Whether to allow experimental versions.                                                                                 | false               | `false`        |
| `use-similar-versions` | Whether to find a similar version (determined by its protocol version) to use if the inputted version is not available. | false               | `true`         |
| `commands`             | Commands to execute on the server after startup has finished.                                                           | false               | ''             |
| `files`                | A directory to copy into the server directory, before it starts.                                                        | false               | ''             |

## 📕 Platforms

### Versions

**Minimum Version**: 1.8

**Latest Version**: 1.21.1 (8-16-2024)

**Latest Experimental Version**: 1.18-rc3 (1-31-2024)

> [!WARNING]
> The following versions are not guaranteed to be available:
>
> - 1.8.1, 1.8.2, 1.8.9
> - 1.9.1, 1.9.3,
> - 1.10.1
> - 1.16

### Runtimes

#### Servers

- [x] CraftBukkit (`craftbukkit`)
- [x] SpigotMC (`spigot`)
- [x] PaperMC (`paper`)
- [x] Purpur (`purpur`)
- [x] Fabric (`fabric`)
  - Your `build` option is **required** and should be specified as `loader version/installer version` (e.g. `0.15.11/1.0.1`).
  - To find your build, visit the [Server Downloader](https://fabricmc.net/use/server/).

#### Server Proxies

- [x] Bungeecord (`bungeecord`)
- [x] Waterfall (`waterfall`)
- [x] Velocity (`velocity`)

## 🧑🏾‍💻 License

This project is licensed under the [LGPL-3.0](LICENSE) License, similar to other Bukkit projects.
