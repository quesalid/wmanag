let base = +new Date(2024, 10, 3);
let oneHour = 3600 * 1000;
let date:any = [];
let data = [100];
let datasim = [100];
let diff = [0];
let now: any = new Date(base);
let interval: any;
function addData(shift=false) {
    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
    date.push(now);
    let newdata = (Math.random() - 0.5) * 5 + data[data.length - 1];
    let newsim = (Math.random() - 0.5) * 5 + datasim[datasim.length - 1];
    let newdiff = Math.abs(100*(newdata - newsim)/newdata);
    data.push(newdata);
    datasim.push(newsim);
    diff.push(newdiff);
    if (shift) {
        date.shift();
        data.shift();
        datasim.shift();
        diff.shift();
    }
    base += oneHour;
    now = new Date(base);
    console.log("base",base)
}
for (var i = 1; i < 30; i++) {
    addData();
}
let option = {
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value'
    },
    series: [
        {
            name: 'Real',
            type: 'line',
            smooth: true,
            symbol: 'none',
            //stack: 'a',
            data: data
        },
        {
            name: 'Simulated',
            type: 'line',
            smooth: true,
            symbol: 'none',
           // stack: 'a',
            data: datasim
        },
        {
            name: 'Difference',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
                normal: {}
            },
            data: diff
        }
    ]
};
const startSim = (myChart:any) => {
    interval = setInterval(function () {
        addData(true);
        myChart.setOption({
            xAxis: {
                data: date
            },
            series: [
                {
                    name: 'Real',
                    data: data
                },
                {
                    name: 'Simulated',
                    data: datasim
                },
                {
                    name: 'Difference',
                    data: diff
                }
            ]
        });
    }, 500);
}

const stopSim = (myChart: any) => {
    if (interval) {
        clearInterval(interval);
        myChart.setOption({
            xAxis: {
                data: date
            },
            series: [
                {
                    name: 'Real',
                    data: [100]
                },
                {
                    name: 'Simulated',
                    data: [100]
                },
                {
                    name: 'Difference',
                    data: [0]
                }
            ]
        });
    }
}

export { option, startSim, stopSim }
