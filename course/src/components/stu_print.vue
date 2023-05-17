<template>
 <div class="timetable" v-show="sta">
    <table>
        <thead>
        <tr>
          <th>时间</th>
          <th :key="index" v-for="(item, index) in tableData.length">
            {{ "周" + digital2Chinese(item, "week") }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr :key="index" v-for="(lesson, index) in tableData[0].length">
            <td>
            <p>{{ "第" + digital2Chinese(lesson) + "节" }}</p>
            </td>
            <td :key="courseIndex" v-for="(course, courseIndex) in tableData">
                <span class="course-name">{{ tableData[courseIndex][index].courseName }}</span>
                <p class="teacher-name">{{ tableData[courseIndex][index].teacherName }}</p>
                <p class="location-name">{{ tableData[courseIndex][index].location }}</p>
            </td>
        </tr>
      </tbody>
    </table>
 </div>
</template>

<script>
export default {
data() {
    return {
      sta: false,//控制画面显示
      account:null,
      courses:[],
      tableData: [
        [
          {
            courseName: "",
            teacherName: "",
            location: ""
          }
        ]
      ],
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
            console.log("getcourse() lenth:"+res.data.length);
            console.log("getcourse() courses:"+this.courses);
            this.updateData(this.courses);
            this.sta = true;
            return;
          })
        .catch((err) => {
            console.log(err);
            return;
        });
    },

    updateData(data) {//data->courses
      this.clearTable();
      for (let i = 0; i < data.length; i++) {
        this.setLesson(data[i]);
      }
      console.log(this.tableData);
    },
    setLesson(item) { //courses[i]的时间格式：周x x-x节
      let split = item.tim.split(" ");
      let week = this.Weekdigital(split[0]);
      let split2=split[1].split("-");
      let lesson = parseInt(split2[0]);
      let length = parseInt(split2[1].substr(0,split2[1].length-1))-parseInt(split2[0])+1;
      for (let i = 0; i < length; i++) {
        this.tableData[week - 1][lesson - 1 + i] = {
          courseName: item.name,
          teacherName: item.teacherId,
          location: item.room+"教室"
        };
      }
    },
    clearTable() { //tableData[7][9] 7天*9节课
      let table = [];
      for (let i = 0; i < 7; i++) {
        let arr = [];
        for (let i2 = 0; i2 < 9; i2++) {
          arr.push({
            courseName: "",
            teacherName: "",
            location: ""
          });
        }
        table.push(arr);
      }
      this.tableData = table;
    },
    //数字->汉字    "0"->零，"7"->"七"/"日"
    digital2Chinese(num, identifier) {
      const character = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十"
      ];
      return identifier === "week" && num === 7 ? "日" : character[num];
    },
    //一周七日->数字
    Weekdigital(week) {
      switch(week){
        case "周一":return 1;
        case "周二":return 2;
        case "周三":return 3;
        case "周四":return 4;
        case "周五":return 5;
        case "周六":return 6;
        case "周日":return 7;
      }
    }
},


created(){
    this.account=this.$route.query.account;
    this.getcourse();
},


}
</script>

<style lang="scss" scoped>
table {
  table-layout: fixed;
  width: 100%;

  thead {
    background-color: #67a1ff;

    th {
      color: #fff;
      line-height: 17px;
      font-weight: normal;
    }
  }

  tbody {
    background-color: #eaf2ff;

    td {
      line-height: 0;
      color: #677998;
      height: 50px;

      span {
        line-height: 0.9;
      }
    }

    .course-name {
      color: #000;
      font-size: 16px;
      font-weight: 200;
    }
  }

  th,
  td {
    width: 60px;
    padding: 2px 2px;
    font-size: 12px;
    text-align: center;
  }

  tr td:first-child {
    color: #333;

    .period {
      font-size: 8px;
    }
  }
}
</style>

