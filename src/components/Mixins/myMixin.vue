<script>
  export default {
    name: 'MyMixin',
    created() {
      this.hello()
    },
    methods: {
      hello() {
        console.log('hello from mixin!')
      }
    }
  }
</script>

<style scoped>

</style>
