const modulesFiles = import.meta.glob('./lib/*.js', { eager: true })

const modules = Object.entries(modulesFiles).reduce((modules, [path, module]) => {
  const name = path.split('/').pop().replace(/\.[^/.]+$/, '')
  modules[name] = module.default
  return modules
}, {})

const install = (Vue, opts = {}) => {
  Object.keys(modules).forEach(name => {
    Vue.use(modules[name])
  })
}

export default {
  install
}
