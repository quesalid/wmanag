import * as echarts from "echarts";

const calendarGetVirtualData = (initdate, enddate) => {
    const date = +echarts.time.parse(initdate);
    const end = +echarts.time.parse(enddate);
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
        data.push([
            echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
            // TBD - insert call to real data
            Math.floor(Math.random() * 10000)
        ]);
    }
    return data;
}
const barStackedVirtualData = (opts = null) => {
    const locdata = []
    const numseries = 5
    const numdata = 7
    const maxscale = 2500
    const max = maxscale / numseries
    const min = 100
    const names = ['Prim 1', 'Sec 1', 'Prim 2', 'Sec 2', 'Fanghi']
    for (let i = 0; i < numseries; i++) {
        const series = []
        for (let j = 0; j < numdata; j++) {
            series.push(Math.floor(Math.random() * max) + min)
        }
        locdata.push({ name: names[i], data: series })
    }
    return locdata
}
const gradientStackedAreaVirtualData = (opts = null) => {
    const locdata = []
    const numseries = 5
    const numdata = 7
    const maxscale = 1300
    const max = maxscale / numseries
    const min = 100
    const names = ['Prim 1', 'Sec 1', 'Prim 2', 'Sec 2', 'Fanghi']
    const colors = [
        { offset0: 'rgb(128, 255, 165)', offset1: 'rgb(1, 191, 236)' },
        { offset0: 'rgb(0, 221, 255)', offset1: 'rgb(77, 119, 255)' },
        { offset0: 'rgb(55, 162, 255)', offset1: 'rgb(116, 21, 219)' },
        { offset0: 'rgb(255, 0, 135)', offset1: 'rgb(135, 0, 157)' },
        { offset0: 'rgb(255, 191, 0)', offset1: 'rgb(224, 62, 76)' }
    ]
    for (let i = 0; i < numseries; i++) {
        const series = []
        for (let j = 0; j < numdata; j++) {
            series.push(Math.floor(Math.random() * max) + min)
        }
        locdata.push({ name: names[i], data: series,colors:colors[i] })
    }
    return locdata
}


const calendarPieData = (data, opts = null) => {
    let initdate = opts.initdate || '2017-01-01';
    let enddate = opts.enddate || '2017-12-31';
    if (opts) {
        initdate = opts.initdate || '2017-01-01';
        enddate = opts.enddate || '2017-12-31';
    }
    data = calendarGetVirtualData(initdate, enddate);
    return data
}

const gradientStackedAreaData = (data, opts = null) => {
    data = gradientStackedAreaVirtualData();
    return data
}

const barWithColorData = (data,opts=null) => {
    return data
}

const barYStackedData = (data, opts = null) => {
    data = barStackedVirtualData();
    return data
}

const EchartData = {
    calendarPie: calendarPieData,
    gradientStackedArea: gradientStackedAreaData,
    barWithColor: barWithColorData,
    barYStacked: barYStackedData,
}

export default EchartData;
