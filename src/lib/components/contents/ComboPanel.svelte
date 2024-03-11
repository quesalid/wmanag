<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { writable } from "svelte/store";
// INTERNAL
import SimpleTable from '../table/SimpleTable.svelte'
import SvelteEcharts from '../chart/SvelteEcharts.svelte'

export let data:any =[]
export let chartoptions = {
		"title": "Point  Macchina: ",
        "axes": {
            "bottom": {
                "title": "Sampling time ",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "title": "UM ",
                "scaleType": "linear"
            }
        },
        "curve": "curveMonotoneX",
        "height": "300px",
		"legend":{"data":""},
        "width": "600px",
        "experimental": true,
        "zoomBar": {
            "top": {
                "enabled": false
            }
        },
		"toolbar":{"enabled":false}
}
export let tabdatacolumns:any = []
export let pagesize = true
export let pSize = 5
export let id = ''

let tabdata:any = writable([])

onMount(async () => {
    $tabdata = data
    const comboPanel = document.getElementById(id)
    if(comboPanel){
        comboPanel.addEventListener("summaryclicked",async (e:any)=>{
            console.log("COMBO PANEL",data)
            data = data
            $tabdata = []
            $tabdata = data
        })
    }

})

</script>
	
	<div class="combo-panel-container" id={id}>
		<div class="combo-panel-menu">
            <div class="combo-panel-menu-title">
            </div>
		</div>
		<div class="combo-panel-chart">
            <!--SvelteEcharts bind:data={data} bind:options={chartoptions}/-->
		</div>
		<div class="combo-panel-table">
            <SimpleTable bind:data={tabdata} bind:datacolumns={tabdatacolumns} {pagesize} {pSize}/>
		</div>
	</div>
<style>
.combo-panel-container{
    display:block;
    border: 1px solid #bbbbbb;
}
.combo-panel-menu{
    display:flex;
}
.combo-panel-menu-title{
    display:block;
}
</style>