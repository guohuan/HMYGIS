<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" name="name" v-model="name"> <br>
      <input type="text" name="aliseName" v-model="aliseName"> <br>
      <input type="text" name="remark" v-model="remark"> <br>
      <a href="javascript:;" @click="addUser">提交</a>
      <a href="javascript:;" @click="QueryUser">查询</a>
    </form>
  </div>
</template>
 
<script>
import utils from '../common/util.js';
import axios from 'axios';

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id:'',
      name: '',
      aliseName: '',
      remark: ''
    }
  },
  methods: {
    addUser() {
      var id = utils.CreateUUID();
      var name = this.name;
      var usertype = '1';
      var aliseName = this.aliseName;
      var remark = this.remark;
      axios.post('http://127.0.0.1:3000/api/user/addUser',
       {
        id:id,
        name: name,
        userType:usertype,
        aliseName: aliseName,
        remark: remark
      },
      {}).then((response) => {
        console.log(response.msg);
        this.$alert("response.msg:"+response.msg);
      }).catch((err)=>{    
        this.$alert("err:"+err);
        // console.log(err);
      });
    },

    QueryUser(){
      axios.get('http://127.0.0.1:3000/api/user/GetUser',{},{}).then((response)=>{
        // this.$alert("response:"+response);
      });
    },
    
  }
}
</script>
