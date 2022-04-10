import { Chart, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useContext } from 'react'
import { ChartContext } from './InputForm'

Chart.register(...registerables)

//X軸用の配列を作成
const Xdata = [...Array(200).keys()]

const Graph = () => {
  const labels = Xdata
//  受信したデータを受け取ってグラフ表示する
  const Ydata =  useContext(ChartContext);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "終了時の残り資金",
        data: Ydata,
        xAxisID: 'xAxis1',
        borderColor: "#4080ff",
        backgroundColor: "#4080ff"
      },
    ],
  }
  const options: {} = {
    plugins: {
    title: {
      display: true,
      font: {
        size: 16,
      },
      color: "#4267b2",
      text: '各試行終了時の残った資金(最初の200試行)'
    },
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    },
      },
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      'xAxis1': { 
          display: true,
          scaleLabel:{
            display: true,
          },
        },
      },
    }

  return (
    <Bar height={500} width={500} data={data} options={options} />
  )
}

export default Graph
