<template>
  <div class="cropper-wrapper">
    <div class="img-box">
      <img :id="imgId" class="cropper-image" alt="">
    </div>
    <div class="right-con">
      <div :id="previewId" class="preview-box" />
      <div class="button-box">
        <slot>
          <el-upload
            action="/image/upload"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :auto-upload="true"
          >
            <el-button type="primary" style="width: 100%">上传图片</el-button>
          </el-upload>
        </slot>
        <!--<div v-show="insideSrc">-->
        <template v-if="insideSrc">
          <div class="button-wrapper">
            <el-button type="primary" @click="rotate"><i class="el-icon-refresh" /></el-button>
            <el-button type="primary" @click="shrink"><i class="el-icon-minus" /></el-button>
            <el-button type="primary" @click="magnify"><i class="el-icon-plus" /></el-button>
            <el-button type="primary" @click="scale('X')"><i class="el-icon-sort" /></el-button>
            <el-button type="primary" @click="move(0, -moveStep)"><i class="el-icon-arrow-up" /></el-button>
            <el-button type="primary" @click="scale('Y')"><i class="el-icon-printer" /></el-button>
            <el-button type="primary" @click="move(-moveStep, 0)"><i class="el-icon-arrow-left" /></el-button>
            <el-button type="primary" @click="move(0, moveStep)"><i class="el-icon-arrow-down" /></el-button>
            <el-button type="primary" @click="move(moveStep, 0)"><i class="el-icon-arrow-right" /></el-button>
          </div>
          <el-button v-if="cropButtonText" class="crop-text" type="primary" @click="crop">{{ cropButtonText }}</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import './index.scss'
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  export default {
    name: 'Cropper',
    props: {
      cropButtonText: {
        type: String,
        default: ''
      },
      moveStep: {
        type: Number,
        default: 4
      }
    },
    data() {
      return {
        cropper: null,
        insideSrc: ''
      }
    },
    computed: {
      imgId() {
        return `cropper${this._uid}`
      },
      previewId() {
        return `cropper${this._uid}`
      }
    },
    watch: {
      insideSrc(src) {
        this.replace(src)
      }
    },
    created() {
      this.$nextTick(() => {
        const dom = document.getElementById(this.imgId)
        this.cropper = new Cropper(dom, {
          preview: `#${this.previewId}`,
          checkCrossOrigin: true
        })
      })
    },
    methods: {
      beforeUpload(file) {
        console.log('file--:', file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = event => {
          this.insideSrc = event.srcElement.result
        }
        // false 不自动上传
        return false
      },
      replace(src) {
        this.cropper.replace(src)
      },
      move(...arg) {
        this.cropper.move(...arg)
      },
      shrink() {
        this.cropper.zoom(-0.1)
      },
      magnify() {
        this.cropper.zoom(0.1)
      },
      rotate() {
        this.cropper.rotate(90)
      },
      scale(d) {
        this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
      },
      crop() {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          this.$emit('crop', blob)
        })
      }
    }
  }
</script>

<style scoped>

</style>
