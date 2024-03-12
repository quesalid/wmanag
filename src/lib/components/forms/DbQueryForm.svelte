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
export let query = ""
export let modalId="db-query-form"
export let  bgcolor = "#ddefde"




</script>
<div class="db-information-form" id={modalId} style="--background-color:{bgcolor}">
	<input id="db-query-area" type='textarea' bind:value={query}/>
</div>
<style>
.db-query-form{
  display: block;
  overflow-y: auto;
  scroll-behavior:auto ;
}
#db-query-area{
	border: 1px solid #999999;
	width:100%;
	height:100% ;
}
</style>