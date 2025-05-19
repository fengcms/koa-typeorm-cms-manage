<template>
  <div class="mark-editor">
    <div class="upload-progress" :style="`width:${progress}%`" />
    <Editor :value="content"  :plugins="plugins" @change="handleChange" :uploadImages="upImg" />
  </div>
</template>
<script>
import { StaticDomain } from '@/config'
import breaks from '@bytemd/plugin-breaks'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import { Editor, Viewer } from '@bytemd/vue'
import upload from './mixin/upload'
const plugins = [
  gfm(),
  breaks(),
  highlight()
  // Add more plugins here
]

export default {
  name: 'MarkEditor',
  components: { Editor, Viewer },
  mixins: [upload],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: '',
      toolbars: {
        uploadImage: true,
        split: true
      },
      plugins
    }
  },
  watch: {
    value(val) {
      this.content = val
    },
    content(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    upImg(file) {
      this.upload(file[0]).then(({ name, path }) => {
        const imgMdStr = `\n![${name}](${StaticDomain}${path})\n`
        this.value = this.value + imgMdStr
        // editor.insert(imgMdStr)
      })
    },
    handleChange(value) {
      this.content = value
    }
  }
}
</script>
<style lang="scss">
.mark-editor {
  position: relative;
  .upload-progress {
    position: absolute;top: 0;left: 0;height: 2px;background: green;
  }
}
.bytemd{
  height: 600px !important;
  &-toolbar {
    line-height: 1;
  }
}
.bytemd-status {
  &::after {
    content: '';
    clear: both;
    display: block;
  }
}
</style>
