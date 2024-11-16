import * as echarts from "echarts";
import EchartData from './EchartData.js'

const calendarPie = (data,opts) => {
    const cellSize = [80, 80];
    const pieRadius = 25;
    const dataopts = opts && opts._data ? opts._data : null;
    const scatterData = EchartData.calendarPie(data,dataopts);
    const pieSeries = scatterData.map(function (item, index) {
        /*console.log("ITEM: ", item)
        const Line1 = Math.round(Math.random() * 70) + 30;
        const Line2 = Math.round(Math.random() * (100 - Line1));
        const Idle = 100 - Line1 - Line2;*/
        return {
            type: 'pie',
            id: 'pie-' + index,
            center: item[0],
            radius: pieRadius,
            coordinateSystem: 'calendar',
            label: {
                formatter: '{c}',
                position: 'inside'
            },
            data: EchartData.piData(opts._data)
        };
    });

    const option = {
        title: {
            text: opts.title ? opts.title : 'Utilizzo Mensile Linee - Sept. 2024',
            left: 'center',
            padding: [0, 0, 40, 0],
            textStyle: {
                color: '#999'
            },
        },
        tooltip: {
            //formatter: '{a} {b} {c} {d}'
        },
        legend: {
            data: opts&&opts._data&&opts._data.names?opts._data.names:['Line1', 'Line2', 'Idle'],
            bottom: 60
        },
        calendar: {
            top: 65,
            left: 'center',
            orient: 'vertical',
            height: 400,
            cellSize: cellSize,
            yearLabel: {
                show: false,
                fontSize: 30
            },
            dayLabel: {
                margin: 20,
                firstDay: 1,
                nameMap: opts && opts._data && opts._data.xlabels ? opts._data.xlabels : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            monthLabel: {
                show: false
            },
            range: opts.calendar && opts.calendar.range? [opts.calendar.range]:['2024-10']
        },
        series: [
            {
                id: 'label',
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 0,
                label: {
                    show: true,
                    formatter: function (params) {
                        return echarts.time.format(params.value[0], '{dd}', false);
                    },
                    offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 15],
                    fontSize: 12
                },
                data: scatterData
            },
            ...pieSeries
        ]
    };

    return option;
}

const gradientStackedArea = (data, opts) => {
    console.log("GRADIENT STACKED AREA DATA: ", opts)
    const dataopts = opts && opts._data ? opts._data : null;
    const locdata = EchartData.gradientStackedArea(data, dataopts);
    let title = opts.title ? opts.title : 'Gradient Stacked Area Chart';
    if (opts._data && opts._data.initdate && opts._data.enddate)
        title = title + ' ' + opts._data.initdate.replaceAll('-', '/') + ' - ' + opts._data.enddate.replaceAll('-', '/');
    const series = []
    for (let i = 0; i < locdata.length; i++) {
        const sr = {
            name: locdata[i].name,
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: locdata[i].colors.offset0
                    },
                    {
                        offset: 1,
                        color: locdata[i].colors.offset1
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: locdata[i].data
        }
        series.push(sr)
    }
    const option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
            text: title,
            left: 'center',
            padding: [0, 0, 40, 0],
            textStyle: {
                color: '#999'
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: opts&&opts._data&&opts._data.names?opts._data.names:['Prim 1', 'Sec 1', 'Prim 2', 'Sec 2', 'Fanghi'],
            top: 30,
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: opts && opts._data && opts._data.xlabels ? opts._data.xlabels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: series
    };
    return option;
}

const barWithColor = (data, opts) => {
    const dataopts = opts && opts._data ? opts._data : null;
    const locdata = EchartData.barWithColor(data, dataopts);
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        title: {
            text: opts.title?opts.title:'Bar Chart with Color',
            left: 'center',
            padding: [0, 0, 40, 0]
        },
        series: [
            {
                data: [
                    120,
                    {
                        value: 200,
                        itemStyle: {
                            color: '#a90000'
                        }
                    },
                    150,
                    80,
                    70,
                    110,
                    130
                ],
                type: 'bar'
            }
        ]
    };
    return option;
}

const barYStacked = (data, opts) => {
    const dataopts = opts && opts._data ? opts._data : null;
    const locdata = EchartData.barYStacked(data, dataopts);
    let title = opts.title ? opts.title : 'Y Bar Chart Stacked';
    const series = []
    for (let i = 0; i < locdata.length; i++) {
        const sr = {
            name: locdata[i].name,
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: locdata[i].data
        }
    series.push(sr)
    }
    if (opts._data && opts._data.initdate && opts._data.enddate)
        title = title + ' ' + opts._data.initdate.replaceAll('-', '/') + ' - ' + opts._data.enddate.replaceAll('-', '/');
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        title: {
            text: title,
            left: 'center',
            padding: [0, 0, 40, 0],
            textStyle: {
                color: '#999'
            },
        },
        legend: {
            top: 30,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: opts&&opts._data&&opts._data.xlabels?opts._data.xlabels:['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
        },
        series: series
    };
    return option;
}


const EchartOptions = {
    calendarPie: calendarPie,
    gradientStackedArea: gradientStackedArea,
    barWithColor: barWithColor,
    barYStacked: barYStacked,
}

export default EchartOptions;