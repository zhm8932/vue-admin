<template>
  <Editor id="tinymceEditor" :init="tinymceInit" v-model="content" @input="handleInput" :key="tinymceFlag" />
</template>

<script>
  // 富文本
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'

  import 'tinymce/themes/silver/theme.min.js'
  import 'tinymce/skins/ui/oxide/skin.min.css'

  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/fullscreen'

  import plugins from './plugins'
  import toolbar from './toolbar'

  export default {
    name: 'Tinymce',
    components: {Editor},
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        content: this.value,
        height: 360,
        tinymceFlag: 1,
        tinymceInit: {}
      }
    },
    activated() {
      this.tinymceFlag++
    },
    methods: {
      handleInput() {
        console.log('content---1:', this.content)
        this.$emit('input', this.content)
      },
      // 插入图片至编辑器
      insertImage(res, file) {
        console.log('res--:', res, 'file:', file)
        const src = '' // 图片存储地址
        tinymce.execCommand('mceInsertContent', false, `<img src=${src}>`)
      },
      handleSubmit() {
        console.log('content---:', this.content)
      }
    },
    created() {
      const _this = this
      this.tinymceInit = {
        // skin_url: '/tinymce/skins/ui/oxide',
        // language_url: `/tinymce/langs/zh_CN.js`,
        // language: 'zh_CN',
        height: document.body.offsetHeight - 100,
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        // elementpath: false,  //禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        menubar: false, // 隐藏最上方menu
        // menubar: 'file edit insert view format table',
        // plugins: plugins,
        toolbar: toolbar,
        // toolbar: 'fontselect fontsizeselect code codesample',
        plugins: 'advlist table lists paste preview fullscreen',
        // plugins: 'advlist table lists paste preview fullscreen',
        // toolbar: 'fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | imageUpload quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
        /**
         * 下面方法是为tinymce添加自定义插入图片按钮
         * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
         */
        setup: (editor) => {
          console.log('editor--:', editor)
          editor.ui.registry.addButton('imageUpload', {
            // text: '插入图片',
            tooltip: '插入图片',
            icon: 'image',
            onAction: () => {
              const upload = _this.$refs.imageUpload
              console.log('upload----:', upload)
              // upload.handleClick()
            }
          })
        }
      }
      /* tinymce.init({
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        // plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      })*/
    }
  }
</script>

<style scoped>

</style>
