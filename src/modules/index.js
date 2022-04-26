import fs from 'fs'

const modules = async (app) => {
  const rootPath = __dirname;
  const moduleNames = await fs.promises.readdir(rootPath)
  await Promise.all(
    moduleNames.map(async (moduleName) => {
      const directory = await fs.promises.lstat(`${rootPath}/${moduleName}`)
      if (directory && directory.isDirectory()) {
        const module = require(`./${moduleName}`)
        if (module && module.router) await module.router(app)
      }
    })
  )
  return app
}

export default modules
