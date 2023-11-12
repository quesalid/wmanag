<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	}

	let selected = ''
</script>
<script>
//	import { slide } from 'svelte/transition'
	export let tree
	const {label, children} = tree

	let expanded = _expansionState[label] || false
	const toggleExpansion = () => {
		expanded = _expansionState[label] = !expanded
		if(expanded){
			selected = label
		}
		if(tree.type==='TABLE'){
			console.log('TABLE',label,expanded,selected)
		}
	}
	$: arrowDown = expanded
</script>

<ul><!-- transition:slide -->
	<li>
		{#if children}
			<span on:click={toggleExpansion}>
				<span class="arrow" class:arrowDown>&#x25b6</span>
				{label}
			</span>
			{#if expanded}
				{#each children as child}
					<svelte:self tree={child} />
				{/each}
			{/if}
		{:else}
			<span>
				<span class="no-arrow"/>
				<!-- Expand tree node keys-->
				<span class="item-container">
					{#each Object.keys(tree) as key}
						{#if key !== 'children' && key !== 'label'}
							<span>{key}: <b>{tree[key]}</b></span>
						{/if}
					{/each}
				</span>
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem; 
		user-select: none;
	}
	.no-arrow {
		display:flex;
		margin-right: 10px;
		padding-left: 1.0rem; 
		flex-direction: column;
		justify-content:space-evenly ;
	}
	.arrow {
		cursor: pointer;
		display: inline-block;
		/*transition: transform 200ms; */
	}
	.arrowDown { transform: rotate(90deg); }
	.item-container{
		display: grid;
		grid-template-columns: 15% 10% 75%;
		grid-template-rows: auto;
	}
	
</style>