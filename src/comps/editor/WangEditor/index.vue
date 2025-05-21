<template>
    <div class="editor—wrapper">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
    </div>
</template>
<script>
import { DomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import upload from '../mixin/upload'
import { toolbarConfig } from './config'
export default {
  name: 'WangEditor',
  components: { Editor, Toolbar },
  mixins: [upload],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: { ...toolbarConfig },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            customUpload: (file, insertFn) => {
              console.log(file)
              this.upload(file).then(({ path }) => {
                insertFn(path)
              })
            }
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  watch: {
    value(val) {
      this.html = val
    },
    html(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    // }, 1500)
    setTimeout(() => {
      const toolbar = DomEditor.getToolbar(this.editor)

      const curToolbarConfig = toolbar.getConfig()
      console.log(JSON.stringify(curToolbarConfig))
    }, 1000)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style>
.editor—wrapper {
  border: 1px solid #ccc;
}
.w-e-full-screen-container {
  z-index: 1000000; /* 按需定义 */
}
</style>