<template>
  <div class="app-container">
    <div>
      <input v-model="a" type="text">
      <span>{{ a }}</span>
      <p>
        <input id="jack" v-model="checkedNames" type="checkbox" value="Jack">
        <label for="jack">Jack</label>
        <input id="john" v-model="checkedNames" type="checkbox" value="John">
        <label for="john">John</label>
        <input id="mike" v-model="checkedNames" type="checkbox" value="Mike">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
      </p>
      <p>
        <input id="one" v-model="picked" type="radio" value="One">
        <label for="one">One</label>
        <br>
        <input id="two" v-model="picked" type="radio" value="Two">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </p>
      <p>
        <select v-model="selected">
          <option value="1">苹果</option>
          <option value="2">香蕉</option>
          <option value="3">梨子</option>
        </select>
        <span>Selected: {{ selected }}</span>
      </p>
      <p>
        <select v-model="selected2" multiple style="width: 50px;">
          <option value="11">苹果</option>
          <option value="22">香蕉</option>
          <option value="33">梨子</option>
        </select>
        <span>Selected2: {{ selected2 }}</span>
      </p>
    </div>
    <div>
      <input :value="d" @input="d = $event.target.value">
      <span>{{ d }}</span>
    </div>
    <div>
      <el-input v-model="b" type="text" />
      <span>{{ b }}</span>
    </div>
    <div>
      <!--<my-input v-model="c" type="text" :checked="checked" />-->
      <my-input v-model="c" />
      <span>{{ c }}</span>
    </div>
    <div>
      <h3>myInput2</h3>
      <myInput2 v-model="c2" />
      <span>{{ c2 }}</span>
    </div>
    <div>
      <!--
    这儿是组件的父级，也就是组件的实例。实例本来应该定义事件来监听子组件的一切“异动”，
    但v-model呢却是给组件内部加个model:{prop:"自定义",event:"自定义"}来监听子组件的变化
-->
      <myCheckbox v-model="checked2" @change="handleChange" />
      <p>{{ checked2 }}</p>
    </div>
    <div>
      <h3>mySelect</h3>
      <mySelect v-model="selectValue" :options="options" />
      <!--<mySelect :options="options" />-->
      <p>{{ selectValue }}</p>
    </div>
    <div>
      <h3>mySelect2</h3>
      <!--<mySelect2 v-model="selectValue2" :selectValue2="selectValue2" :options="options" />-->
      <!--<mySelect2 v-model="selectValue2" :selectValue2="selectValue2" :options="options" />-->
      <mySelect2 v-model="selectValue2" :options="options" />
      <p>{{ selectValue2 }}</p>
    </div>
    <div>
      <h3>mySelect3</h3>
      <mySelect3 v-model="selectValue3" :options="options" @handleChange="handleChange" />
      <p>{{ selectValue3 }}</p>
    </div>
  </div>
</template>
<!--默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。-->
<!--
做一下总结：
如果你懒，不想自己去处理事件，那就用默认的 'value' && 'input' 事件去处理，如果用原生事件的，甚至连model属性也可以省去。
如果你想自己的代码比较明确，区分出自定义事件，那么下面的组合才是你的菜。
prop和event看你自己心情定义，当然要知名见意【尽量避开关键字】
model: {
  prop: 'someProp', // 注意，是prop，不带s。我在写这个速记的时候，多写了一个s，调试到怀疑人生
  event: 'someEvent'
}
this.$emit('someProp', [returnValueToParent])-->

<script>
  import myInput from '../../components/Example/myInput'
  import myInput2 from '../../components/Example/myInput2'
  import myCheckbox from '../../components/Example/myCheckbox'
  import mySelect from '../../components/Example/mySelect'
  import mySelect2 from '../../components/Example/mySelect2'
  import mySelect3 from '../../components/Example/mySelect3'
  export default {
    name: 'Model',
    components: { myInput, myInput2, myCheckbox, mySelect, mySelect2, mySelect3 },
    data() {
      return {
        checkedNames: [],
        picked: '',
        checked: '',
        // checked2: false,
        checked2: '',
        selected: '',
        selected2: [],
        a: '',
        b: '',
        c: '',
        c2: '',
        d: '',
        selectValue: '选项1',
        selectValue2: '选项2',
        selectValue3: '选项3',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    },
    methods: {
      handleChange(data) {
        console.log('data---:', data)
      }
    }
  }
</script>

<style scoped>

</style>
