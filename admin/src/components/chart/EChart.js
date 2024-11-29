import ReactApexChart from "react-apexcharts";

function EChart(userData, psy) {

  console.log(userData)

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

  userData.dashboard.map((data) => {
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
  const categories1 = [
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
  ]
  const chartData1 = []
  const monthData1 = []

  // userData.psy.map((data) => {
  //   chartData1.push(data.count)
  //   categories1.map((month, i) => {
  //     if (i + 1 == data._id.month) {
  //       monthData1.push(month)
  //     }
  //   }
  //   )
  // })

  userData.psy.map((data) => {
    console.log(data.data)
    data.data.map((item) => {
      if (item.count == 0) {
        chartData1.push(item.count)

      }
      else {
        chartData1.push(item.count.count)
      }
      categories1.map((month, i) => {
        if (i + 1 == item.month) {
          monthData1.push(month)
        }
      }
      )

    })
  })

  const eChart = {
    series: [
      {
        name: "Expact",
        data: chartData,
        color: "#fff",
      },
      {
        name: "Psychologist",
        data: chartData1,
        color: "blue",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: monthData,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
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



  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      {/* <div className="chart-vistior">
        <Title level={5}>Active Users</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}
    </>
  );
}

export default EChart;
