module.exports = {
  apps: [
    {
      name: "Static File Server",
      script: "./index.mjs",
      instances: "max",
      exec_mode: "cluster"
    }
  ]
}
