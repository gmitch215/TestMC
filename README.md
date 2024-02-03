# 🔬 TestMC
> A GitHub Action to test Minecraft Plugins on a Server for a Specific Version

A GitHub Action that sets up a Minecraft Server/Server Proxy to test your plugins on.

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
      - uses: GamerCoder/testermc@v1
        with:
          path: 'path/to/plugin.jar'
          runtime: 'paper'
          version: '1.20.1'
          time: 120
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
        version: ['1.20.1', '1.20.2', '1.20.4']
    # ...
    steps:
      - uses: actions/checkout@v4
      - uses: GamerCoder/testermc@v1
        with:
          path: 'path/to/plugin.jar'
          runtime: ${{ matrix.runtime }}
          version: ${{ matrix.version }}
          time: 120
```

> [!WARNING]
> You will need to split your matrix builds into separate jobs if you are planning to use runtimes where different Java Versions are allowed.
> For example, 1.8 does not support Java 16, while 1.17 does not support Java 8.

### All Options

| Option Name            | Description                                                                                                             | Required | Default Value  |
|------------------------|-------------------------------------------------------------------------------------------------------------------------|----------|----------------|
| `path`                 | The path to the plugin to test.                                                                                         | **true** |                |
| `runtime`              | The runtime option to use.                                                                                              | **true** |                |
| `version`              | The runtime (Minecraft) version to use.                                                                                 | false    | latest version |
| `time`                 | How long the server should run for, in seconds.                                                                         | false    | `120`          |
| `build`                | Optionally specify a specific build number for your inputted runtime.                                                   | false    | latest build   |
| `flags`                | Additional Flags to pass to the server jar.                                                                             | false    | ''             |
| `experimental`         | Whether to allow experimental versions.                                                                                 | false    | `false`        |
| `use-similar-versions` | Whether to find a similar version (determined by its protocol version) to use if the inputted version is not available. | false    | `true`         |

## 📕 Platforms

### Versions

**Minimum Version**: 1.8

**Latest Version**: 1.20.4 (1-31-2024)

**Latest Experimental Version**: 1.18-rc3 (1-31-2024)

> [!WARNING]
> The following versions are not guaranteed to be available:
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

#### Server Proxies
- [x] Bungeecord (`bungeecord`)
- [x] Waterfall (`waterfall`)
- [x] Velocity (`velocity`)

## 🧑🏾‍💻 License

This project is licensed under the [LGPL-3.0](LICENSE) License, similar to other Bukkit projects.
