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
export let result = ""
export let modalId="db-output-form"
export let  bgcolor = "#ddefde"


</script>
<div class="db-output-form" id={modalId} style="--background-color:{bgcolor}">
	<div id="db-output-area" >
		<div id="db-output-query">Query> {query}</div>
		<div id="db-output-response"><i>Result></i> {result}</div>
	</div>
</div>

<style>
.db-output-form{
  display: block;
  overflow-y: auto;
  scroll-behavior:auto ;
}
#db-output-area{
	height:100% ;
	margin:5px;
}
#db-output-query{
	border:1px solid #999999;
	font-style: italic;
}
#db-output-response{
	margin-top: 5px;
	border:1px solid #999999;
}
</style>