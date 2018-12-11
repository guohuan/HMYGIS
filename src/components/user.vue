<template>
    <section>
        <!-- 工具条 -->
        <el-col :span="24" class="toolbar" style="padding-bottom:0px">
            <el-form :model="filters" :inline="true">
              <el-form-item>
                  <el-input v-model="filters.aliseName" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" v-on:click="getUsers">查询</el-button>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="handleAddUser">新增</el-button>
              </el-form-item>
            </el-form>
        </el-col>

        <!-- 表格 -->
        <el-table :data="users" highlight-current-row  v-loading="userLoading" @selection-change="selectChange" style="width:100%">
          <el-table-column type="selection" width="55">              
          </el-table-column>
           <el-table-column type="index" width="60">              
          </el-table-column>
           <el-table-column prop="id" label="id" width="200" sortable >              
          </el-table-column>
           <el-table-column prop="name" label="姓名" width="150" sortable >              
          </el-table-column>
           <el-table-column prop="aliseName" label="别名" width="200" sortable >              
          </el-table-column>
           <el-table-column prop="remark" label="备注" width="400" sortable >              
          </el-table-column>
          <el-table-column label="操作" width="150">
              <template slot-scope="userscope">
                  <el-button type="small" @click="handleEditUser(userscope.$index,userscope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="handleDeleteUser(userscope.$index,userscope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>

        <!-- 工具条 -->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" :disabled="this.selectRecords.length === 0" @click="batchRemove">批量删除</el-button>
            <el-pagination layout="prev,pager,next" :total="total" :page-size="10" @current-change="handleCurrentChange" style="float:right"></el-pagination>
        </el-col>

        <!-- 新增界面 -->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addFormData" label-width="80px" :rules="addFormRules" ref="addFormData">
              <el-form-item label="id" prop="id">
                  <el-input v-model="addFormData.id" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                  <el-input v-model="addFormData.name" auto-complete="off" clearable ></el-input>
              </el-form-item>
              <el-form-item label="别名" prop="aliseName">
                  <el-input v-model="addFormData.aliseName" auto-complete="off" clearable ></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                  <el-input v-model="addFormData.remark" auto-complete="off" clearable ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>


        <!-- 编辑界面 -->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editFormData" label-width="80px" :rules="editFormRules" ref="editFormData">
              <el-form-item label="id" prop="id">
                  <el-input v-model="editFormData.id" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                  <el-input v-model="editFormData.name" auto-complete="off" clearable ></el-input>
              </el-form-item>
              <el-form-item label="别名" prop="aliseName">
                  <el-input v-model="editFormData.aliseName" auto-complete="off" clearable ></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                  <el-input v-model="editFormData.remark" auto-complete="off" clearable ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
import utils from '../common/util.js';

export default {
    data(){
        return{
            filters:{
                aliseName:''
            },
            users:[
                {
                    id:utils.CreateUUID(),
                    name:'guoh',
                    aliseName:'郭欢',
                    remark:'测试用户'
                },
                {
                    id:utils.CreateUUID(),
                    name:'ls',
                    aliseName:'李四',
                    remark:'测试用户'
                },                
                {
                    id:utils.CreateUUID(),
                    name:'zs',
                    aliseName:'张三',
                    remark:'测试用户'
                },                
                {
                    id:utils.CreateUUID(),
                    name:'ww',
                    aliseName:'王五',
                    remark:'测试用户'
                },
                {
                    id:utils.CreateUUID(),
                    name:'ls1',
                    aliseName:'李四1',
                    remark:'测试用户'
                },                
                {
                    id:utils.CreateUUID(),
                    name:'zs1',
                    aliseName:'张三1',
                    remark:'测试用户'
                },                
                {
                    id:utils.CreateUUID(),
                    name:'ww1',
                    aliseName:'王五1',
                    remark:'测试用户'
                },

            ],
            total:7,
            page:1,
            userLoading:false,
            selectRecords:[],//选中的记录

            // 
            // 新增界面相关设置
            addFormVisible:false, //是否显示新增界面
            addLoading:false,
            addFormRules:{
                id:[
                    {required:true,message:'请输入编号',trigger:'blur'},
                ],
                name:[
                    {required:true,message:'请输入姓名',trigger:'blur'},
                ]
            },
            // 新增界面数据
            addFormData:{
                id:utils.CreateUUID(),
                name:'',
                aliseName:'',
                remark:''
            },
            // 
            // 
            
            // 
            // 编辑界面相关设置
            editFormVisible:false, //是否显示编辑界面
            editLoading:false,
            editFormRules:{
                id:[
                    {required:true,message:'请输入编号',trigger:'blur'},
                ],
                name:[
                    {required:true,message:'请输入姓名',trigger:'blur'},
                ]
            },
            // 编辑界面数据
            editFormData:{
                id:'',
                name:'',
                aliseName:'',
                remark:''
            },
            // 
            // 
        }
    },
    methods:{
        handleCurrentChange(val){
            this.page = val;
            // this.getUsers();
        },
        //获取用户信息
        getUsers:function(){
            this.total = this.users.length;
        },
        //新增用户
        handleAddUser:function(){            
            this.addFormVisible = true;
            this.addFormData = {
                id:utils.CreateUUID(),
                name:'CSYH00',
                aliseName:'测试用户00',
                remark:'这是一个测试用户'
            };
        },
        //编辑用户
        handleEditUser:function(index,row){
            this.editFormVisible = true;
            this.editFormData = Object.assign({},row);
        },
        //删除用户
        handleDeleteUser:function(index,row){
            this.$confirm('确认删除该记录吗？','提示',{
                type:'warning'
            }).then(()=>{
                this.userLoading = true;
                let paras = {id:row.id};

                this.userLoading = false;
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });

            }).catch(()=>{

            });
        },
        selectChange:function(selRecords){
            this.selectRecords = selRecords;
        },
        // 新增
        addSubmit:function(){
            this.$refs.addFormData.validate(
                (valid)=>{
                    if (valid) {
                        this.$confirm('确认提交吗？','提示',{}).then(()=>{
                            this.addLoading = true;
                            let paras=Object.assign({},this.addFormData);
                            this.users.push({
                                id:paras.id,
                                name:paras.name,
                                aliseName:paras.aliseName,
                                remark:paras.remark
                            });
                        
                            this.addLoading = false;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });

                            this.$refs['addFormData'].resetFields();
                            this.addFormVisible = false;
                        })
                    }
                }
            );
        },

        // 编辑
        editSubmit:function(){
            this.$refs.editFormData.validate((valid)=>{
                if (valid) {
                    this.$confirm('确认提交吗？','提示',{}).then(()=>{
                        this.editLoading = true;
                        let paras = Object.assign({},this.editFormData);
                        this.users.some(u=>{
                            if (u.id === paras.id) {
                                u.name= paras.name;
                                u.aliseName = paras.aliseName;
                                u.remark = paras.remark;
                            }
                        });
                        
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });

                        this.$refs['editFormData'].resetFields();
                        this.editFormVisible = false;

                    })
                }
            });
        },

        // 批量删除
        batchRemove:function(){
            var ids = this.selectRecords.map(item => item.id).toString();
            this.$confirm('确认删除选中记录吗？','提示',{
                type:'warning'
            }).then(()=>{
                this.userLoading = true;
                ids = ids.split(',');
                // var susers = this.users.filters(function(u){
                //     return !ids.includes(u.id);
                // });
                // this.users =susers;
                this.userLoading = false;
                this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
            })
        }

    },

}
</script>
<style lang="scss" scoped>

</style>
