// 将 vue-element-admin 的设置选项转移到 /src/config/index.js 中配置
// 避免多处配置引起混乱
import config from './config/index.js'
const Settings = config.Settings
export default Settings

