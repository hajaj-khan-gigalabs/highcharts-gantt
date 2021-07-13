import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";
import taskData from "./data.json";

import HC_more from "highcharts/highcharts-more"; //module
import draggable from "highcharts/modules/draggable-points";
import map from "highcharts/modules/map";
HC_more(Highcharts); //init module
draggable(Highcharts);
map(Highcharts);

var today = new Date(),
  day = 1000 * 60 * 60 * 24;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();
var line = "";
var d;
var parents;
var minusImage = "https://img.icons8.com/pastel-glyph/2x/minus.png";
var plusImage =
  "data:image/png;base64,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";
var chartComponent = React.createRef();

var state = {
  options: {
    rangeSelector: {
      enabled: true,
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1m",
          events: {
            click: function () {
              alert("Clicked button");
            },
          },
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "ytd",
          text: "YTD",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      dropdown: "never",
      inputEnabled: true,
    },
    chart: {
      spacingLeft: 1,
      zoomType: "x",
      // panning: true,
      // panKey: "shift",
      // backgroundColor: "white",
      events: {
        load: () => {
          addImagesOnTasks();
          addMouseWheelZoom();
          Highcharts.wrap(Highcharts.Pointer.prototype, "dragStart", (p, e) => {
            zoomCallback();
          });

          Highcharts.wrap(
            Highcharts._modules["Core/Axis/TreeGridAxis.js"].Additions
              .prototype,
            "collapse",
            function (proceed, node) {
              Highcharts.fireEvent(this.axis, "collapse", {
                axis: this.axis,
                node: node,
              });

              var ret = proceed.apply(
                this,
                Array.prototype.slice.call(arguments, 1)
              );

              Highcharts.fireEvent(this.axis, "afterCollapse", {
                axis: this.axis,
                node: node,
              });

              return ret;
            }
          );

          Highcharts.wrap(
            Highcharts._modules["Core/Axis/TreeGridAxis.js"].Additions
              .prototype,
            "expand",
            function (proceed, node) {
              Highcharts.fireEvent(this.axis, "expand", {
                axis: this.axis,
                node: node,
              });

              var ret = proceed.apply(
                this,
                Array.prototype.slice.call(arguments, 1)
              );

              Highcharts.fireEvent(this.axis, "afterExpand", {
                axis: this.axis,
                node: node,
              });

              return ret;
            }
          );
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
          // draggableY: true,
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
            drag: (data) => {
              var ren = chartComponent.current.chart.renderer;
              if (line == "") {
                line = ren
                  .path(["M", data.chartX, data.chartY, "L", data.chartX, 850])
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
              imagePloatingAfterDrag(data);
              line.destroy();
              line = "";
            },
          },
        },
      },
      timeline: {
        dragDrop: {
          draggableX: true,
          dragPrecisionX: 1,
          dragPrecisionY: 1,
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
    yAxis: {
      events: {
        // expand: function (event) {
        //   console.log("expand", event);
        // },
        afterExpand: (event) => {
          setTimeout(() => {
            //getting clicked node
            let childsArray = [];
            let clickedPoint = event.node.id;
            function recurse(childs) {
              childs.forEach((element) => {
                if (element.children.length > 0) {
                  childsArray.push(element.id);
                  recurse(element.children);
                }
              });
            }
            if (event.node.children.length > 0) {
              recurse(event.node.children);
            }
            let chartt = chartComponent.current.chart;
            var points = chartt.series;
            //change image of clicked Node
            points.map(function (rec) {
              rec.points.map(function (point) {
                if (clickedPoint == point.id) {
                  point.myImage.attr({
                    href: minusImage,
                  });
                }
                if (childsArray.includes(point.id) && point.isInside) {
                  point.myImage.css({
                    visibility: "visible",
                  });
                }
              });
            });
          }, 200);
        },
        // collapse: function (event) {
        //   console.log("collapse", event);
        // },
        afterCollapse: (event) => {
          setTimeout(() => {
            // Getting All childs
            let childsArray = [];
            let clickedPoint = event.node.id;
            function recurse(childs) {
              childs.forEach((element) => {
                if (element.children.length > 0) {
                  childsArray.push(element.id);
                  recurse(element.children);
                }
              });
            }
            if (event.node.children.length > 0) {
              recurse(event.node.children);
            }

            // hiding images of childs
            let chartt = chartComponent.current.chart;
            var points = chartt.series;

            points.map(function (rec) {
              rec.points.map(function (point) {
                if (clickedPoint == point.id) {
                  point.myImage.attr({
                    href: plusImage,
                  });
                }
                if (childsArray.includes(point.id) && point.isInside) {
                  point.myImage.css({
                    visibility: "hidden",
                  });
                }
              });
            });
          }, 200);
        },
      },
    },
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
      enabled: true,
      buttons: { zoomIn: { align: "right" }, zoomOut: { align: "right" } },
      enableMouseWheelZoom: false,
    },
  },
};

const addImagesOnTasks = () => {
  setTimeout(() => {
    let chartt = chartComponent.current.chart;
    var points = chartt.series,
      width = 20,
      height = 20;
    parents = points.map(function (rec) {
      return rec.points.map(function (point) {
        if (point.options.parent) {
          return point.options.parent;
        }
      });
    });
    points.map(function (rec) {
      rec.points.map(function (point) {
        if (
          !point.milestone &&
          [...new Set(parents[0].concat(parents[1]))].includes(point.id)
        ) {
          point.myImage = chartt.renderer
            .image(
              minusImage,
              point.plotX + chartt.plotLeft - 20,
              point.plotY + chartt.plotTop - height / 2,
              width,
              height
              // function (event) {
              //   console.log(event);
              // }
            )
            .css({
              position: "relative",
            })
            .attr({
              id: point.index,
              zIndex: 10,
            })
            .add()
            .on("click", function (event) {
              if (chartt.yAxis[0].ticks[event.target.id]) {
                chartt.yAxis[0].ticks[event.target.id].toggleCollapse();
              }
              if (point.collapsed) {
                point.myImage.attr({
                  href: plusImage,
                });
              } else {
                point.myImage.attr({
                  href: minusImage,
                });
              }
            });
        }
      });
    });
  }, 0);
};

const imagePloatingAfterDrag = (data) => {
  let chartt = chartComponent.current.chart;
  let point = data.newPoints[data.newPointId].point;
  let height = 20;
  if (!point.milestone && point.myImage) {
    setTimeout(() => {
      data.target.myImage.attr({
        x: point.plotX + chartt.plotLeft - 20,
        y: point.plotY + chartt.plotTop - height / 2,
      });
    }, 150);
  }
};

const addMouseWheelZoom = () => {
  document
    .getElementById("container")
    .addEventListener("mousewheel", (event) => {
      if (event.ctrlKey == true) {
        event.preventDefault();
        if (event.deltaY == -100)
          chartComponent.current.chart.mapZoom(
            0.8,
            chartComponent.current.chart.xAxis[0].toValue(event.clientX),
            chartComponent.current.chart.yAxis[0].toValue(event.clientY),
            event.clientX,
            event.clientY
          );
        else
          chartComponent.current.chart.mapZoom(
            1.2,
            chartComponent.current.chart.xAxis[0].toValue(event.clientX),
            chartComponent.current.chart.yAxis[0].toValue(event.clientY),
            event.clientX,
            event.clientY
          );
        zoomCallback();
      }
    });
};

const zoomCallback = () => {
  setTimeout(() => {
    let chartt = chartComponent.current.chart;
    var points = chartt.series,
      height = 20;

    console.log("zoom called", points);
    points.map((rec) => {
      rec.points.map(async (point) => {
        if (!point.milestone && point.myImage) {
          if (point.isInside) {
            point.myImage
              .attr({
                x: point.plotX + chartt.plotLeft - 20,
                y: point.plotY + chartt.plotTop - height / 2,
              })
              .css({
                display: "block",
              });
          } else {
            point.myImage.css({
              display: "none",
            });
          }
        }
      });
    });
  }, 200);
};

function App() {
  const chartInitilization = () => {
    taskData.map((x, i) => {
      x.start = today + (1 + i) * day;
      x.end = today + (25 + i) * day;
      return x;
    });
  };

  chartInitilization();

  return (
    <div id="container">
      <HighchartsReact
        constructorType={"chart"}
        constructorType={"ganttChart"}
        ref={chartComponent}
        highcharts={Highcharts}
        options={state.options}
      />
    </div>
  );
}
export default App;
