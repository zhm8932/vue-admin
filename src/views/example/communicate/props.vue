<template>
  <div>
    <h2>1. 父组件向子组件传值</h2>
    <h2>2. 子组件向父组件传值</h2>
    <comArticle :articles="articleList" @onEmitIndex="handleIndex" />
    {{ currentIndex }}
  </div>
</template>

<script>
  import comArticle from '../../../components/Example/article'
  export default {
    name: 'Props',
    components: {comArticle},
    data() {
      return {
        articleList: ['红楼梦', '西游记', '三国演义'],
        currentIndex: ''
      }
    },
    methods: {
      handleIndex(index) {
        console.log('index---:', index)
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>

</style>
