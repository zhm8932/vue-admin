<template>
  <div class="app-container">
    <h3>页面权限</h3>
    <p>测试</p>
    <switch-roles @change="handleRoleChange" />
  </div>
</template>

<script>
  // import { mapState } from 'vuex'
  import SwitchRoles from '../../components/SwitchRoles'
  export default {
    name: 'Page',
    components: { SwitchRoles },
    data() {
      return {
        role: 'admin'
      }
    },
    computed: {
      roles() {
        return this.$store.getters.roles
      },
      switchRoles: {
        get() {
          console.log('roles----:', this.roles)
          return this.roles[0]
        },
        set(val) {
          console.log('change-role----:', val)
          this.$store.dispatch('user/changeRoles', val)
            .then(() => {

            })
        }
      }
    },
    methods: {
      handleRoleChange() {
        console.log('页面角色---权限修改')
        // this.$router.push({ path: '/permission/index?' + +new Date() })
        this.$router.push({path: `/permission/index?${Date.now()}`})
      }
    }
  }
</script>

<style scoped>

</style>
