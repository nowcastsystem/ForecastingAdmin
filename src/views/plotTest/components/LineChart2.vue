<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import { toolbox as features } from 'echarts/lib/langEN'
// require('echarts/theme/macarons') // echarts theme
// require('echarts/theme/vintage')
// require('echarts/theme/dark')
// require('echarts/theme/halloween')
// require('echarts/theme/chalk')
// require('echarts/theme/dark2')
require('@/views/plotTest/themes/dark2')
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'dark2')
      this.setOptions(this.chartData)
    },
    setOptions({ xAxisData, yAxisData, label, colorPicked, twoLines = false, label2 = "none", yAxisData2 = [], colorPicked2 = ""} = {}) {
      if (twoLines) {
      this.chart.setOption({
        title: {
            text: 'History Plot',
            left: 20,
            textStyle: {
                fontSize: 25
            }
        },
        xAxis: {
          data: xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 40,
          right: 40,
          bottom: 45,
          top: 50,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        axisPointer: {
            label: {
                color: "black",
                backgroundColor: "#fcb500"
            }
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: [label, label2]
        },
        toolbox: {
            // left: 'right',
            right: 30,
            feature: {
                // dataZoom: {
                //     xAxisIndex: 'none'
                // },
                dataView: {
                    title: "view data",
                    lang: ['Data Viewer', 'Close', 'Refresh']
                },
                restore: {
                    title: "restore"
                },
                saveAsImage: {
                    title: "save"
                }
            }
        },
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],
        series: [{
          name: label, 
        //   itemStyle: {
        //     normal: {
        //       color: colorPicked,
        //       lineStyle: {
        //         color: colorPicked,
        //         width: 3
        //       }
        //     }
        //   },
          smooth: true,
          type: 'line',
          data: yAxisData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: label2, 
        //   itemStyle: {
        //     normal: {
        //       color: colorPicked2,
        //       lineStyle: {
        //         color: colorPicked2,
        //         width: 3
        //       }
        //     }
        //   },
          smooth: true,
          type: 'line',
        //   itemStyle: {
        //     normal: {
        //       color: '#3888fa',
        //       lineStyle: {
        //         color: '#3888fa',
        //         width: 3
        //       },
        //       areaStyle: {
        //         color: '#f3f8ff'
        //       }
        //     }
        //   },
          data: yAxisData2,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
      ]
      })
      } else {
      this.chart.setOption({
        title: {
            text: 'Prediction Plot',
            left: 20,
            top: 20,
            textStyle: {
                fontSize: 25
            }
        },
        grid: {
            left: 60,
            right: 40,
            top: 80
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        axisPointer: {
            label: {
                color: "black",
                backgroundColor: "#fcb500"
            }
        },
        xAxis: {
            data: xAxisData
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        legend: {
          data: [label]
        },
        toolbox: {
            // left: 'right',
            right: 30,
            top: 20,
            feature: {
                // dataZoom: {
                //     yAxisIndex: 'none'
                // },
                dataView: {
                    title: "view data",
                    lang: ['Data Viewer', 'Close', 'Refresh']
                },
                saveAsImage: {
                    title: "save"
                }
            }
        },
        // dataZoom: [{
        //     startValue: '2014-06-01'
        // }, {
        //     type: 'inside'
        // }],
        // visualMap: {
        //     top: 10,
        //     right: 10,
        //     pieces: [{
        //         gt: 0,
        //         lte: 50,
        //         color: '#096'
        //     }, {
        //         gt: 50,
        //         lte: 100,
        //         color: '#ffde33'
        //     }, {
        //         gt: 100,
        //         lte: 150,
        //         color: '#ff9933'
        //     }, {
        //         gt: 150,
        //         lte: 200,
        //         color: '#cc0033'
        //     }, {
        //         gt: 200,
        //         lte: 300,
        //         color: '#660099'
        //     }, {
        //         gt: 300,
        //         color: '#7e0023'
        //     }],
        //     outOfRange: {
        //         color: '#999'
        //     }
        // },
        series: {
            name: 'Prediction Plot',
            type: 'line',
            data: yAxisData.map(function (item) {
                return item;
            }),
            markLine: {
                silent: true,
                data: [{
                    yAxis: 50
                }, {
                    yAxis: 100
                }, {
                    yAxis: 150
                }, {
                    yAxis: 200
                }, {
                    yAxis: 300
                }]
            }
        }

        // ====================================================================

    //     xAxis: {
    //       data: xAxisData,
    //       boundaryGap: false,
    //       axisTick: {
    //         show: false
    //       }
    //     },
    //     grid: {
    //       left: 10,
    //       right: 10,
    //       bottom: 20,
    //       top: 30,
    //       containLabel: true
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross'
    //       },
    //       padding: [5, 10]
    //     },
    //     yAxis: {
    //       axisTick: {
    //         show: false
    //       }
    //     },
    //     legend: {
    //       data: [label]
    //     },
    //     series: [{
    //       name: label, itemStyle: {
    //         normal: {
    //           color: colorPicked,
    //           lineStyle: {
    //             color: colorPicked,
    //             width: 3
    //           }
    //         }
    //       },
    //       smooth: true,
    //       type: 'line',
    //       data: yAxisData,
    //       animationDuration: 2800,
    //       animationEasing: 'cubicInOut'
    //     }

    //   ]
      })

      }


    }
  }
}
</script>
