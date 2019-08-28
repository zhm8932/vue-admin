<template>
  <div class="app-container">
    <p>富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见</p>
    <div class="tinymce-container">
      <el-upload
        multiple
        class="editor-upload-btn"
        ref="imageUpload"
        action="//jsonplaceholder.typicode.com/posts/"
        :on-success="insertImage"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
      <Tinymce v-model="content"/>
      <el-button type="primary" @click="handleSubmit">提交内容</el-button>
    </div>
  </div>
</template>

<script>
  // 富文本
  import Tinymce from '../../components/Tinymce'
  export default {
    name: 'TinymceDemo',
    components: {Tinymce},
    data() {
      return {
        content: '本地图片上传功能仅为演示，实际使用需要补全图片存储地址'
      }
    },
    methods: {
      insertImage(res, file) {
        console.log('res--:', res, 'file:', file)
        // const src = '' // 图片存储地址
        // tinymce.execCommand('mceInsertContent', false, `<img src=${src}>`)
      },
      handleSubmit() {
        console.log('content---:', this.content)
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .tinymce-container {
    position: relative;
    line-height: normal;
  }
  .tinymce-container>>>.mce-fullscreen {
    z-index: 10000;
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
  }
  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }
  .editor-upload-btn {
    display: inline-block;
  }
</style>
