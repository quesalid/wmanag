<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTRNAL
import {getDeviceTemplate} from '../../script/utils.js'
// API
import {getDevices} from '../../script/apidataconfig.js'
// STORE
import {token, mock, currentmainentity} from '../../ustore.js'

onMount(async () => {
		
	});




// EXPORTS
export let agent:any
export let title:any


</script>
	<section class="device-form">
		<fieldset>
			<legend>identification</legend>
		    </fieldset>
		<fieldset>
			<legend>source</legend>
		</fieldset>
		<fieldset>
			<legend>destination</legend>
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
	font-weight: bold ;
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