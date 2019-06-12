<template>
  <div class="app-container icons-container">
    <p class="warn-content">
      <a href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html" target="_blank">Add and use
      </a>
    </p>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div v-for="item of iconsMap" :key="item" @click="handleClipboard($event, generateIconCode(item))">
          <el-tooltip placement="top">
            <div slot="content">
              {{ generateIconCode(item) }}
            </div>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element Icons">
        <div v-for="item in elementIcons" :key="item" @click="handleClipboard($event, generateElementIconCode(item))">
          <el-tooltip effect="dark" placement="top-start">
            <div slot="content">
              {{ generateElementIconCode(item) }}
            </div>
            <div class="icon-item">
              <i :class="'el-icon-'+ item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import clipboard from '../../utils/clipboard'
  import elementIcons from './element-icon'
  import icons from './requireIcons'
  export default {
    name: 'Icons',
    data() {
      return {
        elementIcons,
        iconsMap: icons
      }
    },
    methods: {
      generateIconCode(symbol) {
        return `<svg-icon icon-class="${symbol}" />`
      },
      generateElementIconCode(icon) {
        return `<i class="el-icon-${icon}"></i>`
      },
      handleClipboard(event, icon) {
        console.log('icon----------:', icon)
        console.log('e----------:', event)
        clipboard(event, icon)
      }
    }
  }
</script>

<style lang="scss" scoped>
.icons-container{
  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;  /*设置或检索在何时成为属性事件的target pointer-events: none 的作用是让元素实体 “虚化*/
  }
}
</style>
