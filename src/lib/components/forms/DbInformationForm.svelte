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
	    formatteddbitem = document.getElementById("formatted-db-item")
		// GET MYSELF
		const dbInfoForm = document.getElementById(modalId)
		if(dbInfoForm){
			dbInfoForm.addEventListener("dbitemclicked",async (e:any)=>{
				const retdbitem = e.detail
				console.log("INFO",retdbitem)
				dbitem = formatDbItem(retdbitem)
				console.log("INFO",dbitem)
				if(formatteddbitem)
					formatteddbitem.innerHTML = dbitem
			})
		}
	});

const formatDbItem = (dbitem:any)=>{
	let retInner 
	if(dbitem.type){
		switch(dbitem.type){
			case 'db':
				return('Schema: <b>'+dbitem.name+'</b>')
			case 'table':
				 retInner = 'Table:  <b>'+dbitem.name+'</b>'
				 if(dbitem.columns){
					retInner += '<br>Columns<br>'
					for(let i=0;i<dbitem.columns.length;i++){
						const column = dbitem.columns[i]
						retInner += '<p>&emsp;'+column.name+'&emsp;&emsp;&ensp;'+column.type+'</p>'
					}
				 }
				 return(retInner)
			case 'column':
				retInner = 'Column:  <b>'+dbitem.name+'</b><br>'
				retInner += 'Definition<br>'
				retInner += '<p>&emsp;'+dbitem.column.name+'&emsp;&emsp;&ensp;'+dbitem.column.type+'</p>'
				return(retInner)
			default:
				return("")
		}
	}
	
}
// EXPORTS
export let modalId = "DbInfoDiv"
export let  bgcolor = "#ddefde"




</script>
<div class="db-information-form" id={modalId} style="--background-color:{bgcolor}">
	<div>Details</div>
	<div id='formatted-db-item'>{dbitem}</div>
</div>
<style>
.db-information-form{
  display: block;
  overflow-y: auto;
  scroll-behavior:auto ;
  height:150px;

}

</style>