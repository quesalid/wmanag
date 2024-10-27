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

const gradientStackedAreaData = (data,opts=null) => {
    return data
}

const barWithColorData = (data,opts=null) => {
    return data
}

const barYStackedData = (data,opts=null) => {
    return data
}

const EchartData = {
    calendarPie: calendarPieData,
    gradientStackedArea: gradientStackedAreaData,
    barWithColor: barWithColorData,
    barYStacked: barYStackedData,
}

export default EchartData;
