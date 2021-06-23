import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";
import taskData from "./data.json";

import HC_more from "highcharts/highcharts-more"; //module
import draggable from "highcharts/modules/draggable-points";
HC_more(Highcharts); //init module
draggable(Highcharts);

var today = new Date(),
  day = 1000 * 60 * 60 * 24,
  // Utility functions
  dateFormat = Highcharts.dateFormat,
  defined = Highcharts.defined,
  isObject = Highcharts.isObject;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();
var line = "";
var d;

class App extends React.Component {
  constructor(props) {
    super(props);
    taskData.map((x, i) => {
      // if(x.start && x.end){
      x.start = today + (1 + i) * day;
      x.end = today + (6 + i) * day;
      // }
      return x;
    });
    this.chartComponent = React.createRef();
    this.state = {
      options: {
        rangeSelector: {
          enabled: true,
          buttonPosition: {
            align: "right",
            x: 0,
            y: 0,
          },
          dropdown: "never",
          inputEnabled: false,
        },
        chart: {
          spacingLeft: 1,
          // zoomType: "x",
          // panning: true,
          // panKey: "shift",
          // backgroundColor: 'white',
          events: {
            load: function () {
              // Draw the flow chart
            },
          },
        },

        title: {
          text: "Gantt Project Management",
        },
        subtitle: {
          text: "Drag and drop points to edit",
        },
        plotOptions: {
          series: {
            animation: false, // Do not animate dependency connectors
            dragDrop: {
              draggableX: true,
              draggableY: true,
              //   dragMinY: 0,
              //   dragMaxY: 2,
              dragPrecisionX: day / 3, // Snap to eight hours
              liveRedraw: false,
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
              style: {
                cursor: "default",
                pointerEvents: "none",
              },
            },
            allowPointSelect: true,
            point: {
              events: {
                // select: function (event) {
                //   console.log("select", event);
                //   chart.renderer
                //     .image(
                //       "https://www.highcharts.com/samples/graphics/sun.png",
                //       event.target.plotX,
                //       event.target.plotY,
                //       // 733,
                //       // 175,
                //       20,
                //       20
                //     )
                //     .add()
                //     .on("click", function () {
                //       console.log("click:" + this);
                //     });
                // },
                // unselect: function (event) {
                //   console.log("unselect", event);
                // },
                drag: (data) => {
                  var ren = this.chartComponent.current.chart.renderer;
                  // Separator, client from service
                  if (line == "") {
                    line = ren
                      .path([
                        "M",
                        data.chartX,
                        data.chartY,
                        "L",
                        data.chartX,
                        850,
                      ])
                      .attr({
                        "stroke-width": 2,
                        stroke: "silver",
                        dashstyle: "dash",
                      })
                      .add();
                  } else {
                    d = line.d.split(" ");
                    d[1] = data.chartX;
                    d[2] = data.chartY;
                    d[4] = data.chartX;
                    line.animate(
                      {
                        d: d,
                      },
                      500
                    );
                  }
                },
                drop: (data) => {
                  line.destroy();
                  line = "";
                },
              },
            },
          },
        },
        accessibility: {
          enabled: true,
          keyboardNavigation: {
            seriesNavigation: "serialize",
          },
        },
        xAxis: {
          currentDateIndicator: true,
        },
        yAxis: {},
        series: [
          {
            //   events:{
            //   click : function(event){
            //     console.log(',,,,,,,,,,,,,,,,,,,,,,',event.point)
            //   }
            // },
            name: "Offices",
            data: taskData,
          },
          {
            name: "Product",
            data: [
              {
                name: "New product launch",
                id: "new_product",
                owner: "Peter",
              },
              {
                name: "Development",
                id: "development",
                parent: "new_product",
                start: today - day,
                end: today + 11 * day,
                completed: {
                  amount: 0.6,
                  fill: "#e80",
                },
                owner: "Susan",
              },
              {
                name: "Beta",
                id: "beta",
                dependency: "development",
                parent: "new_product",
                start: today + 12.5 * day,
                milestone: true,
                owner: "Peter",
              },
              {
                name: "Final development",
                id: "finalize",
                dependency: "beta",
                parent: "new_product",
                start: today + 13 * day,
                end: today + 17 * day,
              },
              {
                name: "Launch",
                dependency: "finalize",
                parent: "new_product",
                start: today + 17.5 * day,
                milestone: true,
                owner: "Peter",
              },
            ],
          },
        ],
        // tooltip: {
        //   pointFormatter: function () {
        //     var point = this,
        //       format = "%e. %b",
        //       options = point.options,
        //       completed = options.completed,
        //       amount = isObject(completed) ? completed.amount : completed,
        //       status = (amount || 0) * 100 + "%",
        //       lines;

        //     lines = [
        //       {
        //         value: point.name,
        //         style: "font-weight: bold;",
        //       },
        //       {
        //         title: "Start",
        //         value: dateFormat(format, point.start),
        //       },
        //       {
        //         visible: !options.milestone,
        //         title: "End",
        //         value: dateFormat(format, point.end),
        //       },
        //       {
        //         title: "Completed",
        //         value: status,
        //       },
        //       {
        //         title: "Owner",
        //         value: options.owner || "unassigned",
        //       },
        //     ];

        //     return lines.reduce(function (str, line) {
        //       var s = "",
        //         style = defined(line.style) ? line.style : "font-size: 0.8em;";
        //       if (line.visible !== false) {
        //         s =
        //           '<span style="' +
        //           style +
        //           '">' +
        //           (defined(line.title) ? line.title + ": " : "") +
        //           (defined(line.value) ? line.value : "") +
        //           "</span><br/>";
        //       }
        //       return str + s;
        //     }, "");
        //   },
        // },

        mapNavigation: {
          enableMouseWheelZoom: true,
        },
      },
    };
  }

  render() {
    return (
      <HighchartsReact
        constructorType={"chart"}
        constructorType={"ganttChart"}
        ref={this.chartComponent}
        highcharts={Highcharts}
        options={this.state.options}
      />
    );
  }
}
export default App;
