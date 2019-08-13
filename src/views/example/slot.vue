<template>
  <div class="app-container">
    <sChild>
      <p>父组件里传的内容</p>
    </sChild>
    <sChild2>
      <h2 slot="header">自定义的头部</h2>
      <p slot="footer">自定义底部</p>
      <div>自定义的main, 覆盖了原值</div>
    </sChild2>
    <sChild3 :list="users">
      <template slot="cont" scope="props">
        <p>{{ props }}</p>
        <span>{{ users[props.$index].id }}</span>
        <span>{{ users[props.$index].name }}</span>
        <span>{{ users[props.$index].age }}</span>
        <!-- 这里可以自定[编辑][删除]按钮的链接和样式 -->
        <el-button @click="handleClick">编辑</el-button>
        <el-button :href="'#del/id/'+users[props.$index].id">删除</el-button>
      </template>
    </sChild3>
    <sChild4 :items="books"></sChild4>
    <sChild4 :items="books">
      <template slot-scope="child">
        <div>{{ child }}</div>
        <p><span style="color:red">{{child.index+1}}、</span><b>《{{child.title}}》</b><i>{{child.author}}</i></p>
      </template>
    </sChild4>
    <p>--------------------------------------------</p>
    <current-user :user="user">
      <template v-slot:default="slotProps">
        {{ slotProps }}
        {{ slotProps.user.firstName }}
        {{ slotProps.user.lastName }}
      </template>
    </current-user>
    <p>--------------------------------------------</p>
    <current-user :user="user">
      <template slot-scope="scope">
        {{ scope }}
        {{ scope.user.lastName }}
      </template>
    </current-user>
  </div>
</template>

<script>
  import currentUser from '../../components/Example/currentUser'
  import sChild from '../../components/Example/sChild'
  import sChild2 from '../../components/Example/sChild2'
  import sChild3 from '../../components/Example/sChild3'
  import sChild4 from '../../components/Example/sChild4'
  export default {
    name: 'SlotMain',
    components: { currentUser, sChild, sChild2, sChild3, sChild4},
    data() {
      return {
        user: {
          firstName: '张',
          lastName: '三'
        },
        users: [
          {id: 1, name: '张三', age: 20},
          {id: 2, name: '李四', age: 22},
          {id: 3, name: '王五', age: 27},
          {id: 4, name: '张龙', age: 27},
          {id: 5, name: '赵虎', age: 27}
        ],
        books: [
          {
            name: '三体',
            author: '刘慈欣'
          },
          {
            name: '解忧杂货店',
            author: '东野圭吾'
          },
          {
            name: '爱与寂寞',
            author: '吉杜·克里希那穆提'
          }
        ]
      }
    },
    methods: {
      handleClick() {

      }
    }
  }
</script>

<style scoped>

</style>
