<script lang="ts">
  // EXTERNAL
  import {onMount} from 'svelte'
  import { useNodes,useEdges } from '@xyflow/svelte';
  // INTERNAL
  import '../flowstyles.css'
  import { getNodeTemplate } from '../utils'
  import MapModal from '../../map/modal/MapModal.svelte';
  import {getAddressFromCoordinates} from '../../../script/apidataconfig.js'

  
  // EXPORT VARIABLES
  export let id = "NodePanelId"
  // INTERNAL VARIABLES
  let bodyid = "NodePanelBodyId"
  let nodeid:any
  let title = "Edit Node"
  //let nodeid = ''
  let winHeight = ''
  const nodes = useNodes();
  const edges = useEdges();
  let node:any ={data:{label:''}}
  let template:any = []
  let showModal = false;
  let selectedLocation:any = null;

  onMount(async () => {  
	// Add event listner shownodepanel
	const nodePanel = document.getElementById(id)
	let nodePanelBody:any = document.getElementById(bodyid);
    if(nodePanel){
        nodePanel.addEventListener("shownodepanel",async (ev:any)=>{
            nodeid = ev.detail
			// Get Node
			node = $nodes.find((node:any) => node.id === nodeid);
			console.log("NODE",node)
			template = getNodeTemplate(node.type)
            nodePanel.style.visibility='visible'
			nodePanelBody.style.height = '';
			// force update of values inside template
			template = [...template]
			

        })
    }
	if(nodePanel){
        nodePanel.addEventListener("hidenodepanel",async (ev:any)=>{
            nodeid = ev.detail
			// Set Initial Node
			node = {data:{label:''}}
			template = []
            nodePanel.style.visibility='hidden'
			nodePanelBody.style.height = '0px';
        })
    }
 })

 const minimize = (event:any)=>{
	let nodePanelBody:any = document.getElementById(bodyid);
	winHeight = nodePanelBody.style.height
	if(winHeight == '')
      winHeight ="0px"
	else
	  winHeight = ""
	nodePanelBody.style.height = winHeight;
}
 const close = (ev:any) =>{
	const nodePanel:any = document.getElementById(id)
	let nodePanelBody:any = document.getElementById(bodyid);
	nodePanel.style.visibility='hidden'
	node = {data:{label:''}}
	template = []
    nodePanel.style.visibility='hidden'
	nodePanelBody.style.height = '0px';
 }

 const changeLabel = (ev:any) =>{
	 const label = ev.target.value
	 // get node and update label
	 const nodeIndex = $nodes.findIndex((node:any) => node.id === nodeid);
	 if(nodeIndex != -1)
		$nodes[nodeIndex].data.label = label
	 // get span from id
	 const spanid = 'span-'+nodeid
	 const span = document.getElementById(spanid)
	 // change span text
	 if(span)
		span.innerText = label
 }

 const changeValue = (ev:any, field:any) =>{
	 const value = ev.target.value
	 // get node and update label
	 const nodeIndex = $nodes.findIndex((node:any) => node.id === nodeid);
	 if(nodeIndex != -1)
		$nodes[nodeIndex].data.internalData[field] = value
 }

const pickAddress = async (ev:any) => {
	  console.log("PICK ADDRESS")
	  try{
		  let response:any = ''
		  if(selectedLocation){
			response = await getAddressFromCoordinates(selectedLocation,"WtDpLYuY39XKDh4g0h1z")
			// get element and update value
			const autoaddress:any = document.getElementById('autoaddress-'+nodeid)
			const nodeIndex = $nodes.findIndex((node:any) => node.id === nodeid);
			console.log("ADDRESS",response)
			if(autoaddress && response){
				const address = response.address.road + ", " + response.address.city + ", " + response.address.state + ", " + response.address.postcode
				autoaddress.value = address
				// update node
				if(nodeIndex != -1)
					$nodes[nodeIndex].data.internalData['address'] = address
			}
		  }
	  }catch(e){
		  console.log("ERROR",e)
	  }
 }
 const pickCoords = (ev:any) =>{
	  showModal = true;
 }

  const  closeMap = () => {
    showModal = false;
  }

 const handleLocationSelected = ({ detail }) => {
    selectedLocation = detail;
	// get element and update value
	const lon:any = document.getElementById('lon-'+nodeid)
	const lat:any = document.getElementById('lat-'+nodeid)
	const nodeIndex = $nodes.findIndex((node:any) => node.id === nodeid);
	if(lon && selectedLocation.lng){
		lon.value = selectedLocation.lng
		// update node
		if(nodeIndex != -1)
			$nodes[nodeIndex].data.internalData['lon'] = selectedLocation.lng
	}
	if(lat && selectedLocation.lat){
		lat.value = selectedLocation.lat
		// update node
		if(nodeIndex != -1)
			$nodes[nodeIndex].data.internalData['lat'] = selectedLocation.lat
	}
    closeMap();
  }
</script>

<div id="{id}" class="node-panel">
    <div class="node-panel-header" >
		<span class="node-panel-title">{title}</span>
		<!--span id={"title-"+id}>{title}</!--span-->
		<div style="margin:2px;">
			<input class="wmanag-button cursor-pointer text-lg" type="button"  value="&horbar;" on:click={minimize} />
			<input class="wmanag-button cursor-pointer text-lg" type="button"  value="&bigotimes;" on:click={close} />
		</div>
	</div>
	<div class="node-panel-body" id="{bodyid}">
		<div class="node-panel-body-item">
			<span>label</span> 
			<input type="text" value={node.data.label} on:change={changeLabel}/>
		</div>
	{#each template as item}
		{#if item.show}
			{#if item.type == 'select'} 
				<div class="node-panel-body-item">
						<span>{item.name}</span> 
						<select value={nodeid?node.data.internalData[item.name]:item.value} on:change={(ev)=>{changeValue(ev,item.name)}}>
							{#each item.options.opts as option}
								<option value={option.value}>{option.name}</option>
							{/each}}
						</select>
					</div>
			{:else if item.type == 'number' && (item.name == 'lon' || item.name == 'lat')}
				<div class="node-panel-body-item">
						<span>{item.name}</span> 
						<input id={item.name+"-"+nodeid} type="number" size="10" disabled value={nodeid?node.data.internalData[item.name]:item.value}/>
						<div class="node-panel-body-item-button">
							<input type="button" value="..." on:click={pickCoords}/>
						</div>
					</div>
			{:else if item.type == 'autoaddress'}
				<div class="node-panel-body-item">
						<span>{item.name}</span> 
						<input id={item.type+"-"+nodeid} type="text" size="18" on:change={(ev)=>{changeValue(ev,item.name)}} value={nodeid?node.data.internalData[item.name]:item.value}/>
						<div class="node-panel-body-item-button">
							<input type="button" value="..." on:click={pickAddress}/>
						</div>
					</div>
			{:else}
				<div class="node-panel-body-item">
					<span>{item.name}</span> 
					<input type="{item.type}" value={nodeid?node.data.internalData[item.name]:item.value} on:change={(ev)=>{changeValue(ev,item.name)}}/>
				</div>
			{/if}
		{/if}
	{/each}
	</div>
</div>
{#if showModal}
    <MapModal on:locationSelected={handleLocationSelected} on:close={closeMap} />
{/if}

<style>

</style>