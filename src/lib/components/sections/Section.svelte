<script lang="ts">


export let sections:any = []
export let map:any
export let initlat = 45.0;
export let initlon = 7.0;
export let initzoom = 10;


const fly = (ev:any) => {
	let section = sections[parseInt(ev.target.id)]
	if(map && section)
	    section.flyto(map)
	const style ={color:'#ff0000',weight:3,opacity:1.0}
	section.toggleStyle(map,style)
	
}

const reset = (ev:any) => {
	for(let i=0;i<sections.length;i++) {
		let section = sections[i]
		const style ={color:'#0000ff',weight:3,opacity:1.0}
		section.toggleStyle(map,style)
	}
	map.setView([initlat, initlon], initzoom)
}

const twin = (ev:any) => {
	// get section
	let section = sections[parseInt(ev.target.id)]
	console.log(section)
}
</script>
 <div class="section-class">
	 <div class="section-class-header">
    <input class="button-reset" type="button" id={"reset"} value="Reset" on:click={reset}/>
	</div>
	<div class="section-class-body">
		{#each sections as section, idx}
			<div class="section-class-item">
			<span>{section.name}</span>
			<div class="button-div">
			<input type="button" id={idx+""} value="Show" on:click={fly}/>
			<input type="button" id={idx+""} value="Twin" on:click={twin}/>
			</div>
			</div>
		{/each}
	</div>
 </div>

<style>
.section-class {
	background-color: white;
	padding: 10px;
	width: 25vw;
}
.section-class-body{
	overflow-x:hidden ;
	overflow-y:auto;
	height: 60vh;
}
.section-class-item{
	margin-top: 4px;
	display: flex;
	justify-content:space-between;
	flex-direction:column ;
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: 4px;
}
.section-class-item span {
	margin-left: 4px;
}
input {
	cursor:pointer;
	margin-top: 8px;
	border:1px solid #555; 
	border-radius: 3px; 
	background-color:#777; 
	color:#fff;
	font-weight:bold;
	margin-right: 3px;
}

input:hover{
	color: #FF0
}

.button-reset {
	cursor:pointer;
	margin-top: 8px;
	border:1px solid #555; 
	border-radius: 3px; 
	background-color:#B77; 
	color:#fff;
	font-weight:bold;
}
.button-div{
	display:flex
}
</style>