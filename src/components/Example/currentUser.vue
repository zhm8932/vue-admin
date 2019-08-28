<template>
  <p>
    <!--<slot v-bind:user="user">
      {{ user.lastName }}
    </slot>-->
    <slot :user="user" :age="age">
      {{ user.lastName }}
    </slot>
  </p>
</template>

<script>
  export default {
    name: 'CurrentUser',
    props: {
      user: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        age: 102
      }
    }
  }
</script>

<style scoped>

</style>
