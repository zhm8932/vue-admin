<template>
  <div>
    <p> {{ $t('permission.roles') }} : {{ roles }} </p>
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="admin" />
      <el-radio-button label="editor" />
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'SwitchRoles',
    computed: {
      roles() {
        return this.$store.getters.roles
      },
      switchRoles: {
        get() {
          return this.roles[0]
        },
        set(val) {
          this.$store.dispatch('user/changeRoles', val)
            .then(() => {
              this.$emit('change')
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
