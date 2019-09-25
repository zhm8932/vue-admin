<template>
  <div class="app-container">
    <h2>图片裁剪</h2>
    <Cropper crop-button-text="确认提交" @crop="handleCrop" />
  </div>
</template>

<script>
  import Cropper from '../../components/Cropper'
  import {uploadImg} from '../../api/data'
  export default {
    name: 'CropperDemo',
    components: {Cropper},
    methods: {
      handleCrop(blob) {
        console.log('blob--:', blob)
        const formData = new FormData()
        formData.append('name', '124')
        formData.append('type', 'F')
        formData.append('file', blob)
        console.log('formData--:', formData)
        uploadImg(formData).then(() => {
          this.$message.success('文件上传成功')
        })
      }
    }
  }
</script>

<style scoped>

</style>
