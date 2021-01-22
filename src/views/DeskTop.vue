<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>合同数：{{ numberList.contractNumber }}</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>采购清单数：{{ numberList.purchasingListNumber }}</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>客户数：{{ numberList.clientNumber }}</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>销售员数：{{ numberList.salesmanNumber }}</el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px" :gutter="10">
      <el-col :span="12">
        <el-card>
          <div id="goodsChart" style="width: 550px; height: 500px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="contractChart" style="width: 550px; height: 500px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "desktop",
  data() {
    return {
      numberList: {
        contractNumber: 0,
        purchasingListNumber: 0,
        clientNumber: 0,
        salesmanNumber: 0,
      },
      goodsChartOption: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
      contractChartOption: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let goodsChart = this.$echarts.init(
        document.getElementById("goodsChart")
      );
      // 绘制图表
      goodsChart.setOption(this.goodsChartOption);
    },
    drawLine2() {
      let contractChart = this.$echarts.init(
        document.getElementById("contractChart")
      );
      // 绘制图表
      contractChart.setOption(this.contractChartOption);
    },
  },
  created() {},
  mounted() {
    this.drawLine();
    this.drawLine2();
  },
};
</script>

<style scoped>
</style>
