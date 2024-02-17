<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTRNAL
import {getDeviceTemplate} from '../../script/utils.js'
// API
import {getControllers,getMachines,getAgents,getDevices} from '../../script/apidataconfig.js'
// STORE
import {token, mock,module} from '../../ustore.js'

onMount(async () => {
		//console.log("DATA FORM", agent)
		const filters:any = []
		let ret:any
		ret = await getDevices([{module:$module.toUpperCase(),_type:'eq'}],$mock)
		devices = ret.data
		ret = await getAgents([{module:$module.toUpperCase(),_type:'eq'},{type:'SCANNER',_type:'eq'}],$mock)
		agents = ret.data
		ret = await getMachines(filters,$mock)
		machines = ret.data
		ret = await getControllers(filters,$mock)
		controllers = ret.data
		const found = agents.find((item:any)=> item.uid == point.agent)
		if(found)
			driver = found.source.driver
	});


// EXPORTS
export let point:any
export let title:any

// internal
let machines:any = []
let agents:any = []
let controllers:any = []
let devices:any = []
let driver = ''
let areaS7 = ['DB','PA','PE','MK','DB','CT','TM']
let areaModbus = ['COIL','DISCRETE','INPUT','HOLDING']

const setDrv = (ev:any) =>{
	const target = ev.target
	const found = agents.find((item:any)=> item.uid == target.value)
	if(found)
		driver = found.source.driver
}

const setClass = (ev:any) =>{
	const target = ev.target
	const typ = ev.target.value
	if(typ != 'ALARM' && typ != 'EVENT')
		point.atype = 'ANALOG'
	else
		point.atype = 'DIGITAL'
}

</script>
	<section class="device-form">
		<fieldset>
			<legend>IDENTIFICATION</legend>
			<label for="point-tag">Tag<span class="req">*</span>:</label>
			<input type="text" id="point-tag" name="tag" bind:value={point.tag}>
			<label for="point-class">Class<span class="req">*</span>:</label>
			<select name="class" id="point-class" bind:value={point.atype}>
				<option value="ANALOG">ANALOG</option>
				<option value="DIGITAL">DIGITAL</option>
			</select>
			<label for="point-type">Type<span class="req">*</span>:</label>
			<select name="type" id="point-type" bind:value={point.type} on:change={setClass}>
				<option value="TEMPERATURE">TEMPERATURE</option>
				<option value="PRESSURE">PRESSURE</option>
				<option value="HUMIDITY">HUMIDITY</option>
				<option value="SPEED">SPEED</option>
				<option value="CURRENT">CURRENT</option>
				<option value="VOLTAGE">VOLTAGE</option>
				<option value="NUMBER">NUMBER</option>
				<option value="FLOW">FLOW</option>
				<option value="ALARM">ALARM</option>
				<option value="EVENT">EVENT</option>
			</select>
			<label for="point-description">Description:</label>
			<input type="text" id="point-description" name="description" bind:value={point.description}>
		</fieldset>
		<fieldset>
			<legend>MEASUREMENT</legend>
			<label for="point-um">U.M.<span class="req">*</span>:</label>
			<select name="um" id="point-um" bind:value={point.um}>
				<option value="DEGC">DEGC</option>
				<option value="PSIA">PSIA</option>
				<option value="%">%</option>
				<option value="RPM">RPM</option>
				<option value="A">A</option>
				<option value="V">V</option>
				<option value="#/m3">#/m3</option>
				<option value="m3/sec">m3/sec</option>
				<option value="ON/OFF">ON/OFF</option>
				<option value="ON/OFF">ON/OFF</option>
			</select>
			{#if point.atype == 'ANALOG'}
				<label for="point-hlim">Hlim:</label>
				<input type="number" id="point-hlim" name="hlim" bind:value={point.hlim}>
				<label for="point-llim">Llim:</label>
				<input type="number" id="point-llim" name="llim" bind:value={point.llim}>
			{/if}
		</fieldset>
		<fieldset>
			<legend>FIELD</legend>
			<label for="point-machine-uid">Machine<span class="req">*</span>:</label>
			<select name="machine" id="point-machine-uid" bind:value={point.machine}>
				{#each machines as machine}
					<option value="{machine.uid}">{machine.name}</option>
				{/each}
			</select>
			<label for="poin-controller-uid">Controller<span class="req">*</span>:</label>
			<select name="controller" id="point-controller-uid" bind:value={point.controller}>
				{#each controllers as controller}
					<option value="{controller.uid}">{controller.name}</option>
				{/each}
			</select>
			<label for="poin-device-uid">Device<span class="req">*</span>:</label>
			<select name="device" id="point-device-uid" bind:value={point.device}>
				{#each devices as device}
					<option value="{device.uid}">{device.name}</option>
				{/each}
			</select>
			<label for="poin-agent-uid">Agent<span class="req">*</span>:</label>
			<select name="agent" id="point-agent-uid" bind:value={point.agent} on:change={setDrv}>
				{#each agents as agent}
					<option value="{agent.uid}">{agent.name}</option>
				{/each}
			</select>
			<label for="point-driver">Driver:</label>
			<input type="text" id="point-driver" name="driver" bind:value={driver} disabled>
		</fieldset>
		<fieldset>
			<legend>MEMORY MAP</legend>
			{#if driver == 'modbus'}
				<label for="point-address">Address<span class="req">*</span>:</label>
				<input type="number" id="point-address" name="llim" bind:value={point.address}>
				{#if point.atype == 'DIGITAL'}
					<label for="point-bit">Bit<span class="req">*</span>:</label>
					<input type="number" id="point-bit" name="bit" bind:value={point.bit}>
				{/if}
				<label for="point-area">Area<span class="req">*</span>:</label>
				<select name="device" id="point-device-uid" bind:value={point.area}>
					{#each areaModbus as area}
						<option value="{area}">{area}</option>
					{/each}
				</select>
			{:else if driver == 's7'}
				<label for="point-address">Address<span class="req">*</span>:</label>
				<input type="number" id="point-address" name="llim" bind:value={point.address}>
				{#if point.atype == 'DIGITAL'}
					<label for="point-bit">Bit<span class="req">*</span>:</label>
					<input type="number" id="point-bit" name="bit" bind:value={point.bit}>
				{/if}
				<label for="point-area">Area<span class="req">*</span>:</label>
				<select name="device" id="point-device-uid" bind:value={point.area}>
					{#each areaS7 as area}
						<option value="{area}">{area}</option>
					{/each}
				</select>
				<label for="point-numarea">Num Area<span class="req">*</span>:</label>
				<input type="number" id="point-numarea" name="numarea" bind:value={point.numarea}>
			{:else if driver == 'ip'}
				<label for="point-address">IP TAG<span class="req">*</span>:</label>
				<input type="text" id="point-address" name="llim" bind:value={point.address}>
			{/if}
		</fieldset>
	</section>
<style>

.device-form{
	color: #444;
	background-color: #fff;
	padding:0.4em;
	border-radius: 10px;
}
section{
	margin: 3px;
}
fieldset {
	color: #999;
	border: 1px solid;
	border-radius: 2px;
	margin: 3px;
}
label{
	color: #444;
	margin: 2px;
	font-weight:600 ;
}
input{
	color: #444;
}
input:disabled{
	background-color: #ffffbb ;
}
select{
	color: #444;
}
legend{
	margin-left:5px;
}
.req {
  color: red;
}
</style>