<script lang='ts'>
import {onMount} from 'svelte'
import { Stage, Layer, Shape, Line, Group, Rect, Image } from "svelte-konva"
import SevenSegment from '../sevensegment/SevenSegment.svelte'

const width = 400
const height = width*0.625
const n = 40
const delta = width/n
let stage:any

export let phase:any = {type:''}
onMount(async () => {
        
    });

const shapeTank = (context:any,shape:any) =>{
    shape.id = 'TANK-001'
    const width = shape.width();
    const height = shape.height();
    // DRAW TANK
    context.beginPath();
    context.moveTo(8*delta, 5*delta);
    context.lineTo(7*delta, 6*delta);
    context.lineTo(6*delta, 7*delta);
    context.lineTo(5*delta, 8.5*delta);
    context.lineTo(5*delta, 25*delta);
    context.lineTo(6*delta, 26.5*delta);
    context.lineTo(22*delta, 26.5*delta);
    context.lineTo(23*delta, 25*delta);
    context.lineTo(23*delta, 8.5*delta);
    context.lineTo(22*delta, 7*delta);
    context.lineTo(21*delta, 6*delta);
    context.lineTo(20*delta, 5*delta);
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

</script>
<div class="preparer-container">
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
    </Layer>
</Stage>
    <div class="preparer-info">
        <div class="preparer-controls">
            <div class="preparer-control-title">{phase.type} </div>
        </div>
        <div id="id-preparer-info-title">STEP:</div>
        <div class="preparer-measure">
            <div>Chamber Temp DEGC: </div>
            <!--SevenSegment bind:val={chamberTemp} svgname={svgname} eventName={"chamberTemp"}/-->
        </div>
         <div class="preparer-measure">
            <div>Chamber Press. bar: </div>
            <!--SevenSegment bind:val={chamberPress} svgname={svgname1} eventName={"chamberPress"}/-->
        </div>
    </div>
</div>

<style>
.preparer-container{
    display:flex;
}
.preparer-info{
    display:block;
}
#id-preparer-info-title{
    font-weight: 600 ;
}
.preparer-measure{
    display:flex;
    justify-content:space-between ;
    margin-left:auto;
}
.preparer-control-title{
    display:flexbox;
    justify-content:center ;
    font-weight: 600 ;
    font-size:medium ;
}
</style>