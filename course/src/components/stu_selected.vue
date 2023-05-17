<template>
    <!-- <p v-for="(value,key) in courses" :key='key'>key:{{key}}-----value:{{value}}</p> -->
    <!-- <p>{{ this.courses[0].courseId}}</p> -->
    <el-table :data="courses.slice((currentPage-1)*PageSize,currentPage*PageSize)" border style="width: 100%" v-show="sta">
          <el-table-column prop="courseId" label="课程编号" width="180" />
          <el-table-column prop="name" label="课程名" />
          <el-table-column prop="teacherId" label="任课教师" />
          <el-table-column prop="tim" label="上课时间" />
          <el-table-column prop="room" label="上课地点" />
          <el-table-column prop="capacity" label="课容量" />
          <el-table-column prop="credits" label="学分" />
          <el-table-column label="操作">
              <template #default="scope">
                <el-button size="text" @click="Withdrawal(scope.row.courseId)">退课</el-button>
              </template>
          </el-table-column>
        </el-table>

        <div class="tabListPage" v-show="sta">
           <el-pagination @size-change="handleSizeChange" 
                          @current-change="handleCurrentChange" 
                          :current-page="currentPage" 
                          :page-sizes="pageSizes" 
                          :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                          :total="totalCount">
             </el-pagination>
       </div>

</template>

<script>
export default {
  data() {
    return {
      sta: false,//控制画面显示
      account:null,
      courses:[],
      currentPage:1,//默认显示页面
      totalCount:1,//courses记录长度
      PageSize:8,//每页显示条数
      pageSizes:[5,8,12],// 个数选择器
    }
  },
  methods: {
    getcourse(){
        this.$axios({
          url: "/api/enrollment/checkCourse/"+this.account,
          method: "get",
        })
        .then((res) => {
            this.courses=res.data;
            // console.log("getcourse() lenth:"+res.data.length);
            // console.log("getcourse() courses:"+this.courses);
            this.totalCount=res.data.length;
            this.sta=true;
            return;
          })
        .catch((err) => {
            console.log(err);
            return;
        });
    },
    handleSizeChange(val) {
           // 改变每页显示的条数 
           this.PageSize=val
           // 在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage=1
    },
         // 显示第几页
    handleCurrentChange(val) {
           // 改变默认的页数
           this.currentPage=val
    },
    Withdrawal(id){
      this.$axios({
          url: "/api/course/delete/"+id,
          method: "delete",
          data:{
            courseId:id,
            studentId:this.account
          },
        })
        .then((res) => {
          if(res.data==0){
            this.$message({
            type: "error",
            message: "退课失败！",
            });
            this.getcourse();
            return;
          }
          else
            {
            this.$message({
            type: "success",
            message: "退课成功！",
            });
            this.getcourse();
            return;
            }
          })
        .catch((err) => {
            console.log(err);
            return;
        });
    }

  },
    created(){
    this.account=this.$route.query.account;
    this.getcourse();
  }
}
</script>