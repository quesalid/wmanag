<script lang='ts'>
import {onMount} from 'svelte'
import { Stage, Layer, Shape, Line, Group, Rect, Image } from "svelte-konva"
import SevenSegment from '../sevensegment/SevenSegment.svelte'


const width = 400
const height = width*0.625
const n = 40
const delta = width/n
let stage:any
let piston:any
let vacuumpiston:any
let containerShape:any
let ductShape:any
let leftHeater:any
let rightHeater:any
let image:any = null;
let waterSpray:any = null;
let steam:any=null;
let h2o2:any=null;
let vialsFirstRow:any
let vialsSecondRow:any
let vialsFirstTray:any
let vialsSecondTray:any
let firstTray:any
let firstTrayHandle:any
let exhaustGas:any
let condenser:any
let condensercip:any
let leftCip:any
let rightCip:any
let condenserTank:any
let condenserTankShape:any
let cipGroup:any
let sipGroup:any
let h2o2Group:any
let chamberTemp = 0.0
let chamberPress = 1.3
let svgname = "SVGSSD"
let svgname1 = "SVGSSD1"
let chamberTempEvent = new CustomEvent("chamberTemp",{detail:{chamberTemp:0}})
let chamberPressEvent = new CustomEvent("chamberPress",{detail:{chamberPress:0}})

let svgDiv:any
let svgDiv1:any

export let phase:any = {type:''}
onMount(async () => {
        const img = document.createElement("img");
        img.src = "/Vial.png";
        img.onload = () => {
            image = img;
        };
        const ws = document.createElement("img");
        ws.src = "/WaterSpray.png";
        ws.onload = () => {
            waterSpray = ws;
        };
        const st = document.createElement("img");
        st.src = "/Steam.png";
        st.onload = () => {
            steam = st;
        };
        const h2 = document.createElement("img");
        h2.src = "/H2o2.png";
        h2.onload = () => {
            h2o2 = h2;
        };
        svgDiv = document.getElementById(svgname)
        svgDiv1 = document.getElementById(svgname1)
    });

const sleep = function (ms:any) {
						return new Promise(resolve => setTimeout(resolve, ms));
						}

const shapeTank = (context:any,shape:any) =>{
    shape.id = 'TANK-001'
    const width = shape.width();
    const height = shape.height();
    // DRAW TANK
    context.beginPath();
    context.moveTo(4*delta, 8*delta);
    context.lineTo(4*delta, height - 4*delta);
    context.lineTo(18*delta, height - 4*delta);
    context.lineTo(18*delta, height - 8*delta);
    context.lineTo(22*delta, height - 8*delta);
    context.lineTo(23*delta, height - 5*delta);
    context.lineTo(37*delta, height - 5*delta);
    context.lineTo(38*delta, height - 6*delta);
    context.lineTo(38*delta, height - 14*delta);
    context.lineTo(37*delta, height - 15*delta);
    context.lineTo(23*delta, height - 15*delta);
    context.lineTo(22*delta, height - 12*delta);
    context.lineTo(18*delta, height - 12*delta);
    context.lineTo(18*delta, 8*delta);
    context.closePath();

    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
}

const shapeTankContext = {
    width:width,
    height:height,
    fill:'#FFFFFF',
    stroke:'#666666',
    strokeWidth:3
}
const shapeCondenserTank = (context:any,shape:any) =>{
    shape.id = 'TANK-001'
    const width = shape.width();
    const height = shape.height();
    // DRAW TANK
    context.beginPath();
    context.moveTo(22*delta, height - 8*delta);
    context.lineTo(23*delta, height - 5*delta);
    context.lineTo(37*delta, height - 5*delta);
    context.lineTo(38*delta, height - 6*delta);
    context.lineTo(38*delta, height - 14*delta);
    context.lineTo(37*delta, height - 15*delta);
    context.lineTo(23*delta, height - 15*delta);
    context.lineTo(22*delta, height - 12*delta);
    context.closePath();

    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
}

const shapeCondenserTankContext = {
    width:width,
    height:height,
    fill:'#FF0000',
    stroke:'#666666',
    strokeWidth:3,
    opacity:0.0,
}



const lineLeftSprinklerContext:any = {
    points:[4.5*delta, 8*delta, 4.5*delta, 18*delta, 4.5*delta+2, 18*delta,4.5*delta+2, 8*delta],
    lineCap:'round',
    lineJoin:'round',
    stroke:'grey',
    strokeWidth:1
}

const lineLeftHeaterContext:any = {
    points:[6*delta, 11*delta, 6*delta, 21*delta, 6*delta+2, 21*delta,6*delta+2, 11*delta],
    lineCap:'round',
    lineJoin:'round',
    stroke:'grey',
    strokeWidth:1
}

const lineRightSprinklerContext:any = {
    points:[17.5*delta, 8*delta, 17.5*delta, 18*delta, 17.5*delta+2, 18*delta,17.5*delta+2, 8*delta],
    lineCap:'round',
    lineJoin:'round',
    stroke:'grey',
    strokeWidth:1
}

const lineRightHeaterContext:any = {
    points:[16*delta, 11*delta, 16*delta, 21*delta, 16*delta+2, 21*delta,16*delta+2, 11*delta],
    lineCap:'round',
    lineJoin:'round',
    stroke:'grey',
    strokeWidth:1
}

const lineExhaustGasContext:any = {
    points:[37*delta, 19*delta, 37*delta+2, 19*delta, 37*delta+2, 10*delta,37*delta,10*delta,37*delta, 19*delta],
    lineCap:'round',
    lineJoin:'round',
    stroke:'grey',
    strokeWidth:1
}

const lineCondenserContext:any = {
    points:[38*delta, 12*delta, 26*delta,12*delta,26*delta,18*delta,38*delta,18*delta,38*delta,18*delta-2, 26*delta+2,18*delta-2,26*delta+2,12*delta+2,38*delta,12*delta+2],
    lineCap:'round',
    lineJoin:'round',
    stroke:'grey',
    strokeWidth:1
}

const lineCondenserCipContext:any = {
    points:[38*delta, 13*delta, 28*delta,13*delta,28*delta,13*delta+2,38*delta,13*delta+2],
    lineCap:'round',
    lineJoin:'round',
    stroke:'grey',
    strokeWidth:1
}

const movePiston = (y:any,duration:any) =>{
    piston.to({y:y,duration:duration})
}

const moveFirstTray = (y:any,duration:any) =>{
    firstTray.to({y:y,duration:duration})
}

const moveFirstVial = (y:any,duration:any) =>{
    vialsFirstRow.to({y:y,duration:duration})
}

const moveVacuumPiston = (x:any,duration:any) =>{
    vacuumpiston.to({x:x,duration:duration})
}

const fhContainer = (fill:any,opacity:any,duration:any) =>{
    containerShape.to({fill:fill,opacity:opacity,duration:duration})
}
const fhHeater = (stroke:any,duration:any) =>{
    rightHeater.to({stroke:stroke,duration:duration})
    leftHeater.to({stroke:stroke,duration:duration})
}

const fhTray = (fill:any,duration:any) =>{
    vialsFirstTray.to({fill:fill,duration:duration})
    vialsSecondTray.to({fill:fill,duration:duration})
    firstTrayHandle.to({fill:fill,duration:duration})
}

const fhCondenser = (stroke:any,duration:any) =>{
    condenser.to({stroke:stroke,duration:duration})
}

const fhCondenserCip = (stroke:any,duration:any) =>{
    condensercip.to({stroke:stroke,duration:duration})
}

const fhCip = (stroke:any,duration:any) =>{
    rightCip.to({stroke:stroke,duration:duration})
    leftCip.to({stroke:stroke,duration:duration})
}

const fhCondenserTank =(fill:any,duration:any,opacity:any,visible=true)=>{
    condenserTank.to({visible:visible})
    condenserTankShape.to({fill:fill,duration:duration,opacity:opacity})
    
}

const load = async (duration:any) =>{
    firstTray.to({visible:true,duration:duration})
    vialsFirstRow.to({visible:true,duration:duration})
    vialsSecondRow.to({visible:true,duration:duration})
}

const unload = async (duration:any) =>{
    firstTray.to({visible:false,duration:duration})
    vialsFirstRow.to({visible:false,duration:duration})
    vialsSecondRow.to({visible:false,duration:duration})
    // SET VIALS TO START POSITION
    moveFirstTray(0,0.7)
    moveFirstVial(0,0.7)
}

const freezing = async () =>{
    chamberTempEvent.detail.chamberTemp=-25.4
    svgDiv.dispatchEvent(chamberTempEvent)
    chamberPressEvent.detail.chamberPress=1.3
    svgDiv1.dispatchEvent(chamberPressEvent)
    fhHeater('blue',0.4)
    fhTray('blue',0.4)
    await sleep(600)
    fhContainer("blue",0.3,1.5)
    await sleep(2000)
    fhHeater('black',0.4)
    fhTray('#555555',0.4)
}

const primaryDrying = async () =>{
    chamberTempEvent.detail.chamberTemp= 15.0
    svgDiv.dispatchEvent(chamberTempEvent)
    chamberPressEvent.detail.chamberPress=1.3
    svgDiv1.dispatchEvent(chamberPressEvent)
    moveVacuumPiston(delta,0.7)
    fhHeater('red',0.4)
    fhTray('red',0.4)
    fhCondenser('blue',0.4)
    await sleep(600)
     chamberPressEvent.detail.chamberPress=1.0
    svgDiv1.dispatchEvent(chamberPressEvent)
    fhContainer("red",0.3,0.7)
    await sleep(2000)
     chamberPressEvent.detail.chamberPress=0.5
    svgDiv1.dispatchEvent(chamberPressEvent)
    fhContainer("red",0.0,0.7)
    await sleep(2000)
    chamberPressEvent.detail.chamberPress=0.1
    svgDiv1.dispatchEvent(chamberPressEvent)
    fhHeater('black',0.4)
    fhTray('#555555',0.4)
    fhCondenser('grey',0.4)
    await sleep(2000)
    chamberPressEvent.detail.chamberPress=0.02
    svgDiv1.dispatchEvent(chamberPressEvent)
    moveVacuumPiston(0,0.7)
}

const sealing = async ()=>{
    chamberTempEvent.detail.chamberTemp= 18.0
    svgDiv.dispatchEvent(chamberTempEvent)
     chamberPressEvent.detail.chamberPress=1.3
    svgDiv1.dispatchEvent(chamberPressEvent)
    movePiston(delta/2,0.7)
    await sleep(1000)
    movePiston(delta,0.7)
    moveFirstTray(delta/2,0.7)
    await sleep(1000)
    movePiston(delta*3/2,0.7)
    moveFirstTray(delta,0.7)
    moveFirstVial(delta/2,0.7)
    await sleep(1000)
    movePiston(0,0.7)
}

const defrost = async ()=>{
    chamberTempEvent.detail.chamberTemp= 25.0
    svgDiv.dispatchEvent(chamberTempEvent)
    chamberPressEvent.detail.chamberPress=1.3
    svgDiv1.dispatchEvent(chamberPressEvent)
    fhCondenserCip("red",0.7)
    fhCondenserTank("red",0.7,0.2,true)
    await sleep(1000)
    fhCondenserTank("red",0.7,0.3,true)
    await sleep(1000)
    fhCondenserTank("red",0.7,0.2,true)
    await sleep(1000)
    fhCondenserCip("grey",0.7)
    fhCondenserTank("red",0.7,0.0,false)
}

const cip = async()=>{
    chamberTempEvent.detail.chamberTemp= 18.5
    svgDiv.dispatchEvent(chamberTempEvent)
    chamberPressEvent.detail.chamberPress=1.3
    svgDiv1.dispatchEvent(chamberPressEvent)
    moveVacuumPiston(delta,0.7)
    fhCondenserCip("blue",0.7)
    fhCip("blue",0.7)
    await sleep(1000)
    cipGroup.to({visible:true})
    await sleep(1000)
    fhCondenserCip("grey",0.7)
    fhCip("grey",0.7)
    await sleep(1000)
    cipGroup.to({visible:false})
}

const sip = async ()=>{
      chamberTempEvent.detail.chamberTemp= 30.0
      svgDiv.dispatchEvent(chamberTempEvent)
      chamberPressEvent.detail.chamberPress=2.5
      svgDiv1.dispatchEvent(chamberPressEvent)
      fhCondenserCip("purple",0.7)
      fhCip("purple",0.7)
      await sleep(1000)
      sipGroup.to({visible:true,opacity:0.4,duration:0.7})
      await sleep(1000)
      fhCondenserCip("grey",0.7)
      fhCip("grey",0.7)
      await sleep(1000)
      sipGroup.to({visible:false})
}

const steryl = async ()=>{
      chamberTempEvent.detail.chamberTemp= 20.0
      svgDiv.dispatchEvent(chamberTempEvent)
      chamberPressEvent.detail.chamberPress=1.3
      svgDiv1.dispatchEvent(chamberPressEvent)
      fhCondenserCip("green",0.7)
      fhCip("green",0.7)
      await sleep(1000)
      h2o2Group.to({visible:true,opacity:0.5,duration:0.7})
      await sleep(1000)
      fhCondenserCip("grey",0.7)
      fhCip("grey",0.7)
      await sleep(1000)
      h2o2Group.to({visible:false})
      moveVacuumPiston(0,0.7)
}

const shapeClick = async (ev:any) =>{
    console.log("SHAPE CLICKED", ev.detail.target)
    const infoDiv:any = document.getElementById("id-freeze-dryer-info-title")
    infoDiv.innerHTML="STEP: LOAD"
    await load(0.7)
    await sleep(1000)
    infoDiv.innerHTML="STEP: FREEZING"
    await freezing()
    await sleep(1000)
    infoDiv.innerHTML="STEP: PRIMARY DRYING"
    await primaryDrying()
    await sleep(1000)
    infoDiv.innerHTML="STEP: SEALING"
    await sealing()
    await sleep(1000)
    infoDiv.innerHTML="STEP: UNLOAD"
    await unload(0.1)
    await sleep(1000)
    infoDiv.innerHTML="STEP: DEFROST"
    await defrost()
    await sleep(1000)
    infoDiv.innerHTML="STEP: CIP"
    await cip()
    await sleep(1000)
    infoDiv.innerHTML="STEP: SIP"
    await sip()
    await sleep(1000)
    infoDiv.innerHTML="STEP: H2O2"
    await steryl()
    infoDiv.innerHTML="STEP:"
}
const shapeMouseEnter = (ev:any) =>{
    stage.container().style.cursor = 'pointer';
}
const shapeMouseLeave = (ev:any) =>{
    stage.container().style.cursor = 'default';
}
</script>
<div class="freeze-dryer-container">
<Stage config={{ width: window.innerWidth/3, height: window.innerHeight*2/3 }} bind:handle={stage}>
    <Layer>
        <Shape        
            config={{
                width: shapeTankContext.width,
                height: shapeTankContext.height,
                sceneFunc: shapeTank,
                fill: shapeTankContext.fill,
                stroke: shapeTankContext.stroke,
                strokeWidth: shapeTankContext.strokeWidth,
            }}
        />
        <Line
           bind:handle={leftCip}
           config={lineLeftSprinklerContext}
        />
        <Line
           bind:handle={leftHeater}
           config={lineLeftHeaterContext}
        />
        <Line
           bind:handle={rightCip}
           config={lineRightSprinklerContext}
        />
        <Line
           bind:handle={rightHeater}
           config={lineRightHeaterContext}
        />
        <Line
           bind:handle={exhaustGas}
           config={lineExhaustGasContext}
        />
        <Line
           bind:handle={condenser}
           config={lineCondenserContext}
        />
        <Line
           bind:handle={condensercip}
           config={lineCondenserCipContext}
        />
        <Group bind:handle={piston}>
            <Rect 
                config={
                    {x: 7*delta,y: 10*delta, width: 8*delta,height: 6,fill: "#555555"}
                }
            />
            <Rect 
                config={
                    {x: 9*delta,y: 10*delta - 6, width: 4*delta,height: 6,fill: "#555555"}
                }
            />
            <Rect 
                config={
                    {x: 10.5*delta,
                    y: 4*delta - 6, 
                    width: 1.5*delta,
                    height: 6*delta,
                    fillLinearGradientStartPoint: { x: 10*delta, y: 4*delta - 6 },
                    fillLinearGradientEndPoint: { x:  12*delta, y: 20*delta - 6 },
                    fillLinearGradientColorStops: [0,  "#DDDDDD", 1,  "#555555"]
                    }
                }
            />
        </Group>
         <Rect 
                config={
                    {x: 9*delta+5,y: 8*delta - 10, width: 10,height: 10,fill: "#999999",stroke:'#555555'}
                }
            />
         <Rect 
                config={
                    {x: 9*delta+30,y: 8*delta - 10, width: 10,height: 10,fill: "#999999",stroke:'#555555'}
                }
            />
        <Rect 
                config={
                    {x: 9*delta+4,y: 8*delta - 14, width: 37,height: 4,fill: "#555555"}
                }
            />
        <Rect 
                config={
                    {x: 10*delta,y: 8*delta - 5, width: 25,height: 5,fill: "#555555"}
                }
            />
        <Rect 
                config={
                    {x: 10*delta,y: 8*delta, width: 25,height: 5,fill: "#555555"}
                }
            />
        <Group bind:handle={vacuumpiston}>
            <Rect 
                config={
                    {x: 21.5*delta,y: 14.8*delta, width: 18*delta,height: 6,fill: "#DDDDDD"}
                }
            />
            <Rect 
                config={
                    {x: 21.5*delta+2,y: 14.8*delta-2, width: delta,height: 10,fill: "#555555"}
                }
            />
           <Line
                config={
                    {
                        points:[21.7*delta+5,13*delta,21.3*delta+5,14*delta,21.3*delta+5,16*delta,21.7*delta+5,17*delta ],
                        lineCap:'round',
                        lineJoin:'round',
                        stroke:'#555555',
                        strokeWidth:3
                    }
                }
           />
           <Line
                config={
                    {
                        points:[21.7*delta+5,13*delta,21.7*delta+5,17*delta ],
                        lineCap:'round',
                        lineJoin:'round',
                        stroke:'#555555',
                        strokeWidth:1
                    }
                }
           />
        </Group>
        <Rect 
                config={
                    {x: 38*delta-4,y: 15.5*delta - 14, width: 4,height: 20,fill: "#555555"}
                }
            />
        <Rect 
                config={
                    {x: 38*delta,y: 15.5*delta - 14, width: 4,height: 20,fill: "#555555"}
                }
        />

       
        <Shape  
            bind:handle={containerShape}
            config={{
                width: shapeTankContext.width,
                height: shapeTankContext.height,
                sceneFunc: shapeTank,
                fill: "blue",
                stroke: shapeTankContext.stroke,
                strokeWidth: shapeTankContext.strokeWidth,
                opacity:0.0
            }}
            on:click={shapeClick}
            on:mouseenter={shapeMouseEnter}
            on:mouseout= {shapeMouseLeave} 
        />
        <Group bind:handle={firstTray} config={{visible:false}}>
            <Rect   bind:handle={firstTrayHandle}
                    config={
                        {x: 7.5*delta,y: 11*delta, width: 70,height: 6,fill: "#555555"}
                    }
            />
        </Group>
        <Group bind:handle={vialsFirstRow} config={{visible:false}}>
            <Image config={
                { image,scaleX: 0.5,scaleY: 0.5,x:8.5*delta,y:12*delta,}
            } />
            <Image config={
                { image,scaleX: 0.5,scaleY: 0.5,x:8.5*delta +20,y:12*delta,}
            } />
            <Image config={
                { image,scaleX: 0.5,scaleY: 0.5,x:8.5*delta +40,y:12*delta,
                }
            } />
            <Rect    bind:handle={vialsFirstTray}
                    config={
                        {x: 7.5*delta,y: 14*delta, width: 70,height: 6,fill: "#555555"}
                    }
            />
        </Group>
        <Group bind:handle={vialsSecondRow} config={{visible:false}}>
            <Image config={
                { image,scaleX: 0.5,scaleY: 0.5,x:8.5*delta,y:15*delta,}
            } />
            <Image config={
                { image,scaleX: 0.5,scaleY: 0.5,x:8.5*delta +20,y:15*delta,}
            } />
            <Image config={
                { image,scaleX: 0.5,scaleY: 0.5,x:8.5*delta +40,y:15*delta,
                }
            } />
            <Rect   bind:handle={vialsSecondTray}
                    config={
                        {x: 7.5*delta,y: 17*delta, width: 70,height: 6,fill: "#555555"}
                    }
            />
        </Group>
        <Group bind:handle={condenserTank} config={{visible:false}}>
            <Shape  bind:handle={condenserTankShape}      
            config={{
                width: shapeCondenserTankContext.width,
                height: shapeCondenserTankContext.height,
                sceneFunc: shapeCondenserTank,
                fill: shapeCondenserTankContext.fill,
                stroke: shapeCondenserTankContext.stroke,
                strokeWidth: shapeCondenserTankContext.strokeWidth,
                opacity: shapeCondenserTankContext.opacity
            }}
        />
        </Group>
        <Group bind:handle={cipGroup} config={{visible:false}}>
             <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:9*delta,}
            } />
            <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:13*delta,}
            } />
            <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:17*delta,}
            } />
             <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:9*delta,}
            } />
            <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:13*delta,}
            } />
            <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:17*delta,}
            } />
            <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:18*delta,y:13*delta,}
            } />
            <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:28*delta,y:13*delta,}
            } />
            <Image config={
                { image:waterSpray,scaleX: 0.5,scaleY: 0.5,x:34*delta,y:13*delta,}
            } />
        </Group>
         <Group bind:handle={sipGroup} config={{visible:false,opacity:0.0}}>
             <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:9*delta,}
            } />
            <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:13*delta,}
            } />
            <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:17*delta,}
            } />
             <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:9*delta,}
            } />
            <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:13*delta,}
            } />
            <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:17*delta,}
            } />
            <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:18*delta,y:13*delta,}
            } />
            <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:28*delta,y:13*delta,}
            } />
            <Image config={
                { image:steam,scaleX: 0.5,scaleY: 0.5,x:34*delta,y:13*delta,}
            } />
        </Group>
         <Group bind:handle={h2o2Group} config={{visible:false,opacity:0.0}}>
              <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:9*delta,}
            } />
            <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:13*delta,}
            } />
            <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:5*delta,y:17*delta,}
            } />
             <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:9*delta,}
            } />
            <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:13*delta,}
            } />
            <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:14*delta,y:17*delta,}
            } />
            <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:18*delta,y:13*delta,}
            } />
            <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:28*delta,y:13*delta,}
            } />
            <Image config={
                { image:h2o2,scaleX: 0.5,scaleY: 0.5,x:34*delta,y:13*delta,}
            } />
         </Group>
    </Layer>
</Stage>
    <div class="freeze-dryer-info">
         <div class="freeze-dryer-controls">
            <div class="freeze-dryer-control-title">{phase.type} </div>
        </div>
        <div id="id-freeze-dryer-info-title">STEP:</div>
        <div class="freeze-dryer-measure">
            <div>Chamber Temp DEGC: </div>
            <SevenSegment bind:val={chamberTemp} svgname={svgname} eventName={"chamberTemp"}/>
        </div>
         <div class="freeze-dryer-measure">
            <div>Chamber Press. bar: </div>
            <SevenSegment bind:val={chamberPress} svgname={svgname1} eventName={"chamberPress"}/>
        </div>
    </div>
</div>

<style>
.freeze-dryer-container{
    display:flex;
}
.freeze-dryer-info{
    display:block;
}
#id-freeze-dryer-info-title{
    font-weight: 600 ;
}
.freeze-dryer-measure{
    display:flex;
    justify-content:space-between ;
    margin-left:auto;
}
.freeze-dryer-control-title{
    display:flexbox;
    justify-content:center ;
    font-weight: 600 ;
    font-size:medium ;
}
</style>