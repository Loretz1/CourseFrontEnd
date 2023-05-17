<script>
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data () {
    return {
      loginForm: {
        account: "",
        passWord: "",
      },
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      }
    };
  },
 
  methods: {
    ...mapMutations(["changeLogin"]),
    submitForm() {
      const userAccount = this.loginForm.account;
      const userPassword = this.loginForm.passWord;
      if (!userAccount) {
        return this.$message({
          type: "error",
          message: "账号不能为空！",
        });
      }
      if (!userPassword) {
        return this.$message({
          type: "error",
          message: "密码不能为空！",
        });
      }

      this.$axios({
          url: "/api/user/login",
          method: "post",
          data: {
            id:this.loginForm.account,
            password:this.loginForm.passWord
          },
        })
        .then((res) => {
            var data=res.data;
            // console.log("result:"+data);
            if(data==0){
              return this.$message({
              type: "error",
              message: "账号或密码错误！",
              });
            }
            else{
              if(this.loginForm.account.startsWith('000'))
                this.$router.push({name:'managerpage',query:{account:this.loginForm.account}});
              else if(this.loginForm.account.startsWith('001'))
                this.$router.push({name:'teacherpage',query:{account:this.loginForm.account}});
              else 
                this.$router.push({name:'studentpage',query:{account:this.loginForm.account}});
            }
          })
        .catch((err) => {
            console.log(err);
        });

    },
  },
};
</script>

<template>
  <div class="login">
    <div class="mylogin" align="center">
      <h4>选课系统</h4>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
      >
        <el-form-item label="" prop="account" style="margin-top: 10px">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-s-custom"></span>
            </el-col>
            <el-col :span="22">
              <el-input
                class="inps"
                placeholder="账号"
                v-model="loginForm.account"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="" prop="passWord">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-lock"></span>
            </el-col>
            <el-col :span="22">
              <el-input
                class="inps"
                type="password"
                placeholder="密码"
                v-model="loginForm.passWord"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 55px">
          <el-button type="primary" round class="submitBtn" @click="submitForm"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
  .login {
    width: 100vw;
    padding: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
    background-position: left top;
    background-color: #7ea1eb;
    color: #fff;
    font-family: "Source Sans Pro";
    position: relative;
  }
 
  .mylogin {
    width: 240px;
    height: 280px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 50px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
    background: linear-gradient(
      230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%
    );
  }
 
  .inps input {
    border: none;
    color: #fff;
    background-color: transparent;
    font-size: 12px;
  }
 
  .submitBtn {
    background-color: transparent;
    color: #39f;
    width: 250px;
  }
</style>
