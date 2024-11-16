import * as echarts from "echarts";

const getPieData = (opts = null) => {
    const Line1 = Math.round(Math.random() * 70) + 30;
    const Line2 = Math.round(Math.random() * (100 - Line1));
    const Idle = 100 - Line1 - Line2;
    const defaultdata = [
        { name: 'Line1', value: Line1 },
        { name: 'Line2', value: Line2 },
        { name: 'Idle', value: Idle }
    ]
    let data = []
    if (opts && opts.names) {
        for(let i=0;i<opts.names.length;i++) {
            data.push({name:opts.names[i],value:Math.floor(Math.random()*100)})
        }
    }
    return(data?data:defaultdata)
}
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
    const numdata = opts && opts.range ? opts.range : 7
    const maxscale = 2500
    const min = 100
    const names = opts && opts.names? opts.names: ['Prim 1', 'Sec 1', 'Prim 2', 'Sec 2', 'Fanghi']
    const numseries = names.length ? names.length : 5
    const max = maxscale / numseries
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
    const numdata = opts && opts.range? opts.range : 7
    const maxscale = 1300
    const min = 100
    const names = opts && opts.names? opts.names: ['Prim 1', 'Sec 1', 'Prim 2', 'Sec 2', 'Fanghi']
    const numseries = names.length ? names.length : 5
    const max = maxscale / numseries
    const colors = opts && opts.colors ? opts.colors : [
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
    let initdate = '2017-01-01';
    let enddate = '2017-12-31';
    if (opts) {
        // check if initdate and enddate are passed
        /*const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const todaydate = yyyy + '-' + mm + '-' + dd;
        if (opts.initdate && opts.initdate > todaydate)
            opts.initdate = todaydate;
        if (opts.enddate && opts.enddate > todaydate)
            opts.enddate = todaydate;*/
        // end check
        initdate = opts.initdate?opts.initdate:initdate;
        enddate = opts.enddate?opts.enddate:enddate;
    }
    data = calendarGetVirtualData(initdate, enddate);
    return data
}

const gradientStackedAreaData = (data, opts = null) => {
    const optsdata = opts ? opts : null;
    data = gradientStackedAreaVirtualData(optsdata);
    return data
}

const barWithColorData = (data,opts=null) => {
    return data
}

const barYStackedData = (data, opts = null) => {
    const optsdata = opts ? opts : null;
    data = barStackedVirtualData(optsdata);
    return data
}


const EchartData = {
    piData: getPieData,
    calendarPie: calendarPieData,
    gradientStackedArea: gradientStackedAreaData,
    barWithColor: barWithColorData,
    barYStacked: barYStackedData,
}

export default EchartData;
