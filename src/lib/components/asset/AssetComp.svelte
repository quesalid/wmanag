<script lang='ts'>
import { onMount } from 'svelte';

import {Asset} from './asset'
   

onMount(async () => {
    // get structures array and assets from twin
    if(twindata){
        structures = twindata.sections.map((section:any) => {
		    return section.name
	    })
        if(structures.length >0){
            selectedStructure = structures[0]
            // get section from twin
            const coords = twindata.sections.find((section:any) => section.name == selectedStructure).coords
            buildAssetFromCoords(coords)
        }
    }
})


export let d3win = 'map-container-maplibre'
export let containerClass='map-container-maplibre'
export let twindata:any

let sortColumn = ''; // Colonna corrente per il sorting
let sortDirection = 1; // 1 = Ascendente, -1 = Discendente
let selectedStructure = 'Struttura 1'
let assets:any = []
let structures:any = ['Struttura 1','Struttura 2','Struttura 3']

const buildAssetFromCoords = (coords: number[][]) => {
	for(let i = 0; i < coords.length; i++){
		const asset = new Asset(coords[i],null);
		if(i%5 == 0)
			asset.setUserData({
                id:'C8194-'+i,
                status:'WARNING',
                 alarmLeft:['ALARM', '1', '0', '0', '1', '0', '0'],
                 alarmRight:['ALARM', '0', '0', '0', '1', '0', '0'],
            });
		else if(i%7 == 0)
			asset.setUserData(
                {
                    id:'C8194-'+i,
                    status:'ALARM',
                    alarmLeft:['ALARM', '1', '0', '0', '1', '0', '0'],
                    alarmRight:['ALARM', '2', '0', '0', '2', '0', '0'],
                });
		else 
			asset.setUserData(
                {
                    id:'C8194-'+i,
                    status:'NORMAL',
                    alarmLeft:['ALARM', '0', '0', '0', '0', '0', '0'],
                    alarmRight:['ALARM', '0', '0', '0', '0', '0', '0'],
                });
        if(i == 0 || i == coords.length-1){
		    asset.addField('descriprion','stazione trasformazione')
            asset.addField('type','trasformator')
        }else{
			asset.addField('descriprion','linea elettrica')
			asset.addField('type','tower')}
		assets.push(asset);
	}
	// forza il re-rendering
	assets = [...assets]
}


const flyTo = (ev:any,asset:any) => {
    // eventually hide other windows
    const wmanag = document.getElementById('defaultAssetGraphManager')
    wmanag?.dispatchEvent(new CustomEvent('hide'))
    // show d3libre window
    const d3 = document.getElementById(d3win)
    d3?.dispatchEvent(new CustomEvent('show', {detail: assets}))
    // send the event to mapClass component
    const event:any = new CustomEvent('flyToAsset', {detail: {assets:assets,asset:asset}})
    const target:any = document.querySelector('.'+containerClass);
    target.dispatchEvent(event);
}

// Funzione per l'ordinamento
const sortBy = (column:any) => {
    if (sortColumn === column) {
        sortDirection *= -1; // Inverti l'ordine se clicchi sulla stessa colonna
    } else {
        sortColumn = column;
        sortDirection = 1; // Ripristina ordine ascendente
    }

    assets.sort((a:any, b:any) => {
        const valueA = a.userData[column];
        const valueB = b.userData[column];

        // Confronta in base al tipo di dato (numerico o stringa)
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return (valueA - valueB) * sortDirection;
        } else {
            return valueA.localeCompare(valueB) * sortDirection;
        }
    });

    assets = [...assets]; // Forza il re-rendering
};

const selectStructure = (ev:any) => {
	selectedStructure = ev.target.value
}

// force redraw on twindata change
$: {
     if(twindata){
        structures = twindata.sections.map((section:any) => {
		return section.name
	    })
        if(structures.length >0){
            selectedStructure = structures[0]
            // get section from twin
            const coords = twindata.sections.find((section:any) => section.name == selectedStructure).coords
            buildAssetFromCoords(coords)
        }
     }	
}

</script>
	<div class="asset-comp-class">
    <div class="asset-comp-header">
         <div class="asset-comp-title">Elenco degli Asset</div>
         <!-- structure selection-->
         <div class="asset-comp-structure">
             <span>Struttura:</span>
			<select on:change={selectStructure}>
                {#each structures as structure}
                    <option value={structure}>{structure}</option>
				{/each}
			</select>
        </div>
    </div>
    <div class="asset-comp-body">
        <!-- tabella con colonne ordinabili e ricercabili -->
        <table>
            <thead>
                <tr>
                    <th on:click={() => sortBy('id')}>Id {sortColumn === 'id' ? (sortDirection === 1 ? '▲' : '▼') : ''}</th>
                    <th on:click={() => sortBy('type')}>Type {sortColumn === 'type' ? (sortDirection === 1 ? '▲' : '▼') : ''}</th>
                    <th on:click={() => sortBy('status')}>Status {sortColumn === 'status' ? (sortDirection === 1 ? '▲' : '▼') : ''}</th>
                    <th>Flyto</th>
                </tr>
            </thead>
            <tbody>
                {#each assets as asset}
                    <tr>
                        <td>{asset.userData.id}</td>
                        <td>{asset.userData.type}</td>
                        {#if asset.userData.status == 'NORMAL'}
                            <td style="background-color: green;">{asset.userData.status}</td>
                        {:else if asset.userData.status == 'WARNING'}
                            <td style="background-color: orange;font-weight:bold;">{asset.userData.status}</td>
                        {:else if asset.userData.status == 'ALARM'}
                            <td style="background-color: red;font-weight:bold;">{asset.userData.status}</td>
                        {:else}
                            <td>{asset.userData.status}</td>
                        {/if}
                        <td class="td-clickable" on:click={(ev)=>{flyTo(ev,asset)}}>&#9655;</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
.asset-comp-class{
	font-family: 'Orbitron', sans-serif;
	width: 28vw;
	height: 100%;
	font-size: smaller;
}

.asset-comp-header{
    display: flex;
	justify-content:space-between;
	align-items: left;
	height: 10%;
    background-color: rgba(100, 100, 100, 0.8);
    color: white;

}
.asset-comp-structure{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
    width: 60%;
}
.asset-comp-structure select{
    width: 100%;
	padding: 5px;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: white;
	color: black;
	font-weight: bold;
	cursor: pointer;
}
.asset-comp-title{
    font-size: larger;
	font-weight: bold;
	padding: 5px;
    text-align: left ;
}
.asset-comp-body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%; /* Altezza totale disponibile */
}

.asset-comp-body table {
    border-collapse: collapse;
    width: 100%;
}

.asset-comp-body thead {
    position: sticky;
    top: 0;
    z-index: 2; /* Per sovrapporsi alle righe della tabella */
    background-color: rgba(0, 0, 0, 0.8); /* Mantieni uno sfondo per distinguere */
}

.asset-comp-body thead tr{
     display: table;
    width: 100%;
    table-layout: fixed; /* Allinea correttamente le celle */
}

.asset-comp-body tbody {
    display: block;
    max-height: 400px; /* Altezza massima per il contenitore delle righe */
    overflow-y: auto;
    overflow-x: hidden;
}

.asset-comp-body tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed; /* Allinea correttamente le celle */
}
.td-clickable{
	cursor: pointer;
}

th {
    cursor: pointer;
    position: relative;
    user-select: none;
}

th::after {
    content: '';
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
}

th:hover {
    color: #999; /* Colore di evidenziazione */
}
</style>