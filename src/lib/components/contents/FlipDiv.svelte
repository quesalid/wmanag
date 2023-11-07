<script lang="ts">
export let scanner = {
	agent: "SCANNER01",
	type: "SCANNER",
	description: "Descrizione dello scanner",
	source:"s7-127.0.0.1:502",
	destination:"mqtt-127.0.0.1:8883",
}
export let colorleft = "#f0f0f0"
export let colorrightstart = "#afffaf"
export let colorrightstop = "#ffafaf"
export let onClickDeploy = (ev:any)=>{
	console.log("DEPLOY CLICKED",ev.target)
	const leftelem = document.getElementById(scanner.agent+'-left-hide')
	const rightelem = document.getElementById(scanner.agent+'-right-hide')
	if(leftelem && rightelem){
		leftelem.style.visibility = "hidden"
		rightelem.style.visibility = "visible"
	}
}
export let onClickUndeploy = (ev:any)=>{
	console.log("UNDEPLOY CLICKED",ev.target)
	const rightelem = document.getElementById(scanner.agent+'-right-hide')
	const leftelem = document.getElementById(scanner.agent+'-left-hide')
	if(leftelem && rightelem){
		leftelem.style.visibility = "visible"
		rightelem.style.visibility = "hidden"
	}
}

export let onClickStart =(ev:any)=>{
	console.log("START CLICKED",ev.target)
	const rightelem = document.querySelector('.upper-content.right')
	if(rightelem){
		rightelem.style.setProperty('--background-color', colorrightstart);
	}
}

export let onClickStop =(ev:any)=>{
	console.log("STOP CLICKED",ev.target)
	const rightelem = document.querySelector('.upper-content.right')
	if(rightelem){
		rightelem.style.setProperty('--background-color', colorrightstop);
	}
}

</script>

	<div class="flip-div-wrapper">
		<div class="flip-div">
			<div class="inside-flip-div left">
				<div class="inside-flip-hide-left" id="{scanner.agent+'-left-hide'}">
					<div class="upper-content left" style="--background-color: {colorleft} ;">
						<div class="upper-content-left left">
							AGENT: {scanner.agent} TYPE: {scanner.type}
							<br>{scanner.description}
						</div>
						<div class="upper-content-right left">
							<input type="image" src="/DARROWRIGHT.svg" alt="ALT IMAGE" height="20" on:click={onClickDeploy}/>
						</div>
					</div>
					<div class="middle-content left">
						SOURCE: {scanner.source} <br>DEST: {scanner.destination}
					</div>
					<div class="lower-content left">
					</div>
				</div>
			</div>
			<div class="inside-flip-div right">
				<div class="inside-flip-hide-right" id="{scanner.agent+'-right-hide'}">
					<div class="upper-content right" style="--background-color: {colorrightstop} ;">
						<div class="upper-content-left right">
							<input type="image"  src="/DARROWLEFT.svg" alt="ALT IMAGE" height="20" on:click={onClickUndeploy}/>
						</div>
						<div class="upper-content-right right">
							AGENT: {scanner.agent} TYPE: {scanner.type}
							<br>{scanner.description}
						</div>
					</div>
					<div class="middle-content right">
						SOURCE: {scanner.source} <br>DEST: {scanner.destination}
					</div>
					<div class="lower-content right">
						<label for="agent-start" style="margin-right:3px;margin-left:3px;">Start</label>
						<input name="agent-start" type="image" src="/START.svg" alt="ALT IMAGE" height="22" on:click={onClickStart}/>
						<label for="agent-stop" style="margin-right:3px;margin-left:3px;">Stop</label>
						<input name="agent-stop" type="image" src="/STOP.svg" alt="ALT IMAGE" height="22" on:click={onClickStop}/>
					</div>
				</div>
			</div>
			
		</div>
	</div>

<style>
.flip-div-wrapper{
	display:flexbox;
	justify-content:center ;
	margin: 4px;
	overflow-y:auto ;
	height: 600px;
}
.flip-div{
	display:flex;
	width:800px;
	height: 120px;
	justify-content:space-evenly ;
	
}

.inside-flip-div{
	width:40%;
	height: 90%;
	border: 1px solid #333;
	background-color: #fff;
	margin: 3px;
}
.inside-flip-hide-left{
	height:100%;
}

.inside-flip-hide-right{
	height:100%;
	visibility: hidden;
}

.upper-content{
	display:flex;
	width: 100%;
	height: 44%;
	border-bottom: 1px solid #000;
	border-radius: 10px ;
	
}
.upper-content .left{
	background-color: var(--background-color);
}
.upper-content .right{
	background-color: var(--background-color);
}

.middle-content{
	width: 100%;
	height: 36%;
	border-bottom: 1px solid #333;
	background-color: #fff;
}
.middle-content.right{
	text-align: right;
}
.lower-content{
	width: 100%;
	height: 20%;
	border-bottom: 1px solid #333;
	background-color: #fff;
	display:flex;
}
.upper-content-left.left{
	height:100%;
	width: 90%;
	/*border-right: 1px solid #000;*/
}
.upper-content-right.left{
	height:100%;
	width: 10%;
	display: flex;
    justify-content: center;
    align-items: center;
}
.upper-content-left.right{
	height:100%;
	width: 10%;
	display: flex;
    justify-content: center;
    align-items: center;
}
.upper-content-right.right{
	height:100%;
	width: 90%;
	text-align: right;
}
</style>