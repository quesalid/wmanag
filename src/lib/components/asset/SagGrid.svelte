<script lang='ts'>
    import { onMount } from "svelte";
    import SagComp from "./SagComp.svelte";
</script>
<!-- arrange a grid of 2 columns and three rows-->
<div class="sag-grid-container-class">
    <h2>SAG CHART</h2>
	<div class="sag-grid-class">
		<SagComp cableName="4A" cableColor="#fc97af" />
		<SagComp cableName="4B" cableColor="#87f7cf" />
		<SagComp cableName="8A" cableColor="#f7f494" />
		<SagComp cableName="8B" cableColor="#72ccff" />
		<SagComp cableName="12A" cableColor="#f7c5a0" />
		<SagComp cableName="12B" cableColor="#d4a4eb" />
	</div>
</div>
<style>
.sag-grid-container-class{
	height: 100%;
	width: 100%;
	background-color:  rgba(41,52,65,0.88);
	color: white;

}
.sag-grid-container-class h2{
	font-size:larger;
	text-align: center;
	padding-top: 2vh;
}
.sag-grid-class{
    display: grid;
	width:100%;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	gap: 1px;
	padding: 1px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin: 1px;
	background-color: rgba(41,52,65,0.88);
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	margin-top: 10vh;
}
</style>