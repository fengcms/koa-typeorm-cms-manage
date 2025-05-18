import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const svgModules = import.meta.glob('./svg/*.svg', { eager: true })
Object.values(svgModules).forEach(module => module.default)
