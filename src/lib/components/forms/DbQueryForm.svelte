<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
// INTRNAL
import {getUserTemplate,downloadDataUrl} from '../../script/utils.js'
// API
import {getUsers} from '../../script/apisecurity.js'
// STORE
import {token, mock} from '../../ustore.js'

let dbitem:any = ''
let formatteddbitem:HTMLElement|null
onMount(async () => {
	    
	});


// EXPORTS
export let param = ""
export let modalId="db-query-form"
export let  bgcolor = "#ddefde"




</script>
<div class="db-information-form" id={modalId} style="--background-color:{bgcolor}">
	<textarea id="db-query-area" rows={7} cols={80} bind:value={param}/>
</div>
<style>
.db-query-form{
  display: block;
  overflow-y: auto;
  scroll-behavior:auto ;
}
#db-query-area{
	border: 1px solid #999999;
	height:100% ;
	margin:5px;
	resize: none;
}
</style>