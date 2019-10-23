<template>
  <div>
    <div class="dashboard-editor-container">
      <el-row style="background:#fff;padding:0;margin-bottom:32px;">
        <!-- <line-chart :chart-data="{xAxisData, yAxisData, label}" /> -->
        <!-- <h2>Prediction Plot</h2> -->
        <line-chart2 :chart-data="getFuture" />
        <!-- <h2>History Plot</h2> -->
        <line-chart2 :chart-data="getPast" />
      </el-row>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/views/dashboard/admin/components/LineChart'
import LineChart2 from '@/views/plotTest/components/LineChart2'
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from '@/views/dashboard/admin/components/PanelGroup'
import RaddarChart from '@/views/dashboard/admin/components/RaddarChart'
import PieChart from '@/views/dashboard/admin/components/PieChart'
import BarChart from '@/views/dashboard/admin/components/BarChart'
import TransactionTable from '@/views/dashboard/admin/components/TransactionTable'
import TodoList from '@/views/dashboard/admin/components/TodoList'
import BoxCard from '@/views/dashboard/admin/components/BoxCard'

import router from '@/router'

const lineChartData = {
  newVisitis: {
    xAxisData: [120, 82, 91, 154, 162, 140, 145,230],
    yAxisData: ['120', '82', '91', '154', '162', '140', '145','230'],
    label: 'Future'
  },
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    LineChart2,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  props: {
    past: {
      xAxisData: {
        default: ['a', 'x', 'c', 'd', 'e', 'f', 'g', 'h']
      },
      yAxisData: {
        default: [120, 82, 91, 154, 162, 140, 145,230]
      },
      label: {
        default: 'Past'
      },
      colorPicked: {
        default: '#999997'
      },
      twoLines: {
        default: true
      },
      yAxisData2: {
        default: [150, 96, 190, 150, 180, 160, 76,180]
      },
      label2: {
        default: 'Prediction'
      },
      colorPicked2: {
        default: '#999997'
      }
    },
    future: {
      xAxisData: {
        default: [120, 82, 91, 154, 162, 140, 145,230]
      },
      yAxisData: {
        default: ['a', 'x', 'c', 'd', 'e', 'f', 'g', 'h']
      },
      label: {
        default: 'Future'
      },
      colorPicker: {
        default: '#999997'
      }
    }

  },
  watch: {
    past: {
      immediate: true,
      handler() {
        if (typeof this.past !== 'undefined')
          localStorage.setItem('past', JSON.stringify(this.past))
      }
    },
    future: {
      immediate: true,
      handler() {
        if (typeof this.future !== 'undefined')
          localStorage.setItem('future', JSON.stringify(this.future))
      }
    },
  },
  computed: {
    getPast() {
      if (typeof this.past !== 'undefined') {
        return this.past
      } else {
        return JSON.parse(localStorage.getItem('past'))
      }
    },
    getFuture() {
      if (typeof this.future !== 'undefined') {
        return this.future
      } else {
        return JSON.parse(localStorage.getItem('future'))
      }
    }
  },
  // mounted() {
  //   this.past = localStorage.getItem('past');
  //   this.future = localStorage.getItem('future');
  // },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  // background-color: rgb(240, 242, 245);
  background-color: #26293c;
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
