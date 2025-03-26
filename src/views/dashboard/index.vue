<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px;">
      <el-card class="box-card">
        <div class="user">
          <img src="../../assets/images/cat.png" alt="">
          <div class="user-info">
            <p class="name">{{ this.$store.state.user.name }}</p>
            <p class="access">{{ this.$store.state.user.roles }}</p>
          </div>
        </div>
        <div class="login-info">
          <p class="login-time">上次登录时间：<span>2025-3-3</span></p>
          <p class="login-addr">上次登录地点：<span>南昌</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px;">
      <div class="num">
        <el-card v-for="item in countDate" :key="item.name" :body-style="{display:'flex', padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px;">
        <!-- 折线图 -->
        <div>
          <div ref="echarts1" style="height: 280px;"></div>
        </div>
      </el-card>

      <div class="graph">
        <el-card style="height: 260px;">
          <!-- 柱状图 -->
          <div>
            <div ref="echarts2" style="height: 260px;"></div>
          </div>
        </el-card>
        <el-card style="height: 260px;">
          <div ref="echarts3" style="height: 260px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
//import { getStatisticalData } from '@api/home'; // 引入模拟接口的模块
import * as echarts from 'echarts';

export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '品牌',
        todayBuy: '日销量',
        monthBuy: '月销量',
        totalBuy: '总销量'
      },
      countDate: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#00E5EE"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#00E5EE"
        }
      ]
    };
  },
  // mounted() {
  //   axios.get('/vue-admin-template/home/list').then((response) => {
  //     const { data } = response;
  //     const { tableData } = data.data;
  //     this.tableData = tableData;

  //     // 基于准备好的 dom，初始化 echarts 实例
  //     const echarts1 = echarts.init(this.$refs.echarts1);
  //     // 指定图标的配置项和数据
  //     let echarts1Option = {};
  //     // 处理数据 xAxis
  //     const { orderData, userData, videoData } = data.data;
  //     const legend = [];
  //     if (orderData.data.length > 0) {
  //       legend = Object.keys(orderData.data[0]);
  //     }
  //     echarts1Option.xAxis = {
  //       data: orderData.date
  //     };
  //     echarts1Option.yAxis = {};
  //     echarts1Option.legend = {
  //       data: legend
  //     };
  //     echarts1Option.series = [];
  //     legend.forEach(key => {
  //       const seriesData = orderData.data.map(item => item[key] || 0);
  //       echarts1Option.series.push({
  //         name: key,
  //         data: seriesData,
  //         type: 'line'
  //       });
  //     });
  //     console.log(echarts1Option);
  //     //使用刚指定的配置和数据显示图表
  //     echarts1.setOption(echarts1Option);

  //     // 柱状图
  //     const echarts2 = echarts.init(this.$refs.echarts2);
  //     const echarts2Option = {
  //       legend: {
  //         //图例颜色
  //         textStyle: {
  //           color: "#333"
  //         }
  //       },
  //       grid: {
  //         left: "20%"
  //       },
  //       //提示框
  //       tooltip: {
  //         trigger: "axis"
  //       },
  //       xAxis: {
  //         type: "category", //类目轴
  //         data: userData.map(item => item.date), //拿到userData 通过数组遍历每一项的date值
  //         axisLine: {
  //           lineStyle: {
  //             color: "#17b3a3"
  //           }
  //         },
  //         axisLabel: {
  //           interval: 0,
  //           color: "#333"
  //         }
  //       },
  //       yAxis: [
  //         {
  //           type: "value",
  //           axisLine: {
  //             lineStyle: {
  //               color: "#17b3a3"
  //             }
  //           }
  //         }
  //       ],
  //       color: ["#2ec7c9", "#b6a2de"],
  //       series: [
  //         {
  //           name: '新增用户',
  //           data: userData.map(item => item.new),
  //           type: 'bar'
  //         },
  //         {
  //           name: '活跃用户',
  //           data: userData.map(item => item.active),
  //           type: 'bar'
  //         }
  //       ]
  //     };
  //     console.log(echarts2Option);
  //     echarts2.setOption(echarts2Option);

  //     const echarts3 = echarts.init(this.$refs.echarts3);
  //     const echarts3Option = {
  //       tooltip: {
  //         trigger: "item"
  //       },
  //       color: [
  //         "#00868B",
  //         "#CDC9C9",
  //         "#00BFFF",
  //         "#48D1CC"
  //       ],
  //       series: [
  //         {
  //           data: videoData,
  //           type: 'pie'
  //         }
  //       ]
  //     };
  //     console.log(echarts3Option);
  //     echarts3.setOption(echarts3Option);
  //   });
  // }
};
</script>

<style>
.user {
  display: flex;
  align-items: center; /* 垂直居中 */
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
 .user-info {
   .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
   .access {
      font-size: 40;
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;   /* 自适应布局 */
  flex-wrap: wrap;  /* 强制自动换行 */
  justify-content: space-between;   /* 两边靠边 */
 .icon {
    height: 80px;
    width: 80px;
    font-size: 30px;
    line-height: 80px;
    color: aliceblue;
    text-align: center;
  }
 .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
   .price {
      font-size: 30px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
    }
   .desc {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
 .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
 .el-card {
    width: 48%;
  }
}
</style>
