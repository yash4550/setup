import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";


function LineChart(userData) {
  console.log(userData)
  const { Title, Paragraph } = Typography;
  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",

  ]
  const chartData = []
  const monthData = []
  userData.dashboard && userData.dashboard.map((data) => {
    console.log(data.data)
    data.data.map((item) => {
      if (item.count == 0) {
        chartData.push(item.count)
      }
      else {
        chartData.push(item.count.count)
      }
      categories.map((month, i) => {
        if (i + 1 == item.month) {
          monthData.push(month)
        }
      }
      )

    })



  })


  const lineChart = {
    series: [
      {
        name: "Event",
        data: chartData,
        offsetY: 0,
      },
      // {
      //   name: "Websites",
      //   data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      //   offsetY: 0,
      // },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: true,
        },
      },

      legend: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: monthData,
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };


  console.log(chartData)
  console.log(monthData)

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Active Session</Title>

        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Session</li>
            {/* <li>{<MinusOutlined />} Sales</li> */}
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
