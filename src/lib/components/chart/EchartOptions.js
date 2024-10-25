import * as echarts from "echarts";

export const calendarPie = (data,opts) => {
    const cellSize = [80, 80];
    const pieRadius = 25;
    const scatterData = data;
    const pieSeries = scatterData.map(function (item, index) {
        const Line1 = Math.round(Math.random() * 70) + 30;
        const Line2 = Math.round(Math.random() * (100 - Line1));
        const Idle = 100 - Line1 - Line2;
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
            data: [
                { name: 'Line1', value: Line1 },
                { name: 'Line2', value: Line2 },
                { name: 'Idle', value: Idle }
            ]
        };
    });

    const option = {
        title: {
            text: opts.title ? opts.title : 'Utilizzo Mensile Linee - Sept. 2024',
            left: 'center',
            padding:  [0, 0, 40, 0]
        },
        tooltip: {
            //formatter: '{a} {b} {c} {d}'
        },
        legend: {
            data: ['Line1', 'Line2', 'Idle'],
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
                nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            monthLabel: {
                show: false
            },
            range: ['2024-09']
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

export const gradientStackedArea = (data,opts) => {
    const option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
            text: opts.title?opts.title:'Gradient Stacked Area Chart',
            left: 'center',
            padding: [0, 0, 40, 0]
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
            data: ['Prim 1', 'Sec 1', 'Prim 2', 'Sec 2', 'Fanghi'],
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Prim 1',
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
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
            },
            {
                name: 'Sec 1',
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
                            color: 'rgb(0, 221, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(77, 119, 255)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310]
            },
            {
                name: 'Prim 2',
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
                            color: 'rgb(55, 162, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(116, 21, 219)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 132, 201, 334, 190, 130, 220]
            },
            {
                name: 'Sec 2',
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
                            color: 'rgb(255, 0, 135)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(135, 0, 157)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 402, 231, 134, 190, 230, 120]
            },
            {
                name: 'Fanghi',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 191, 0)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(224, 62, 76)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150]
            }
        ]
    };
    return option;
}

const barWithColor = (data,opts) => {
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
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        title: {
            text: opts.title ? opts.title : 'Y Bar Chart Stacked',
            left: 'center',
            padding: [0, 0, 40, 0]
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
            {
                name: 'Prim 1',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: 'Sec 1',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Prim 2',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Sec 2',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
                name: 'Fanghi',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
        ]
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