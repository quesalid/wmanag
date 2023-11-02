<script lang="ts">
    
import Wmanag from '../lib/components/WManag.svelte'
import DockerManag from '../lib/components/contents/DockerManag.svelte'

const onClickPlus = (ev:any)=>{
	console.log("ONCLICK PLUS")
}

const onClickMinus = (ev:any)=>{
	console.log("ONCLICK MINUS")
}

const onClickX = (ev:any)=>{
	console.log("ONCLICK X")
}

let toolbar = [
	{type:'button',value:'CA',function:onClickPlus,label:''},
	{type:'button',value:'CERT',function:onClickMinus,label:''},
	{type:'button',value:'PEM',function:onClickX,label:''},
	{type:'button',value:'INVIA',function:onClickX,label:''},
]

const disableClose = true
const draggable = true
const zindex = 4
const headercolor = "#e9e9e9"

</script>

	<div class="home-div">
		<Wmanag id="defaultWManager" title="WManag" toolbar={toolbar} {disableClose} {draggable} {headercolor}>
			<DockerManag slot="bodycontent" {zindex} {headercolor}/>"
		</Wmanag>
	</div>
<style>
.home-div{
	position: relative;
	width: 500px;
	height: fit-content;
	display: block;
}

</style>


