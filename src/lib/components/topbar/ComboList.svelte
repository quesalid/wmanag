<script lang='ts'>
	import { createCombobox } from 'svelte-headlessui'
	import Transition from 'svelte-transition'
	import Selector from '../icons/Selector.svelte'
	import Check from '../icons/Check.svelte'
	import {onMount} from "svelte"
	import {currentplant} from "../../ustore.js"
   
   

	
	export let data:any = []

   const combobox = createCombobox({ label: 'Actions', selected:$currentplant.name })
   onMount(() => {
	    console.log("DATA",data,$currentplant )
		$combobox.selected = $currentplant
		$combobox =$combobox
	});



	function onSelect(e: Event) {
		const selected = (e as CustomEvent).detail.selected
		console.log('select', selected)
		$currentplant = selected
		$combobox.selected = selected
	}

	$: filtered = data.filter((item:any)=> item.name.toLowerCase().replace(/\s+/g, '').includes($combobox.filter.toLowerCase().replace(/\s+/g, '')))

</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="fixed top-1 w-40">
		<div class="relative mt-1">
			<div
				class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 text-sm"
			>
				<input
					use:combobox.input
					on:select={onSelect}
					class="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
					value={$currentplant.name}
				/>
				<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
				<button use:combobox.button class="absolute inset-y-0 right-0 flex items-center pr-2" type="button">
					<Selector class="h-5 w-5 text-gray-400" />
				</button>
			</div>

			<Transition
				show={$combobox.expanded}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				on:after-leave={() => combobox.reset()}
			>
				<ul
					use:combobox.items
					class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					{#each filtered as value}
						{@const active = $combobox.active === value}
						{@const selected = $combobox.selected === value}
						<li
							class="relative cursor-default select-none py-2 pl-10 pr-4 {active ? 'bg-teal-600 text-white' : 'text-gray-900'}"
							use:combobox.item={{ value }}
						>
							<span class="block truncate {selected ? 'font-medium' : 'font-normal'}">{value.name}</span>
							{#if selected}
								<span class="absolute inset-y-0 left-0 flex items-center pl-3 {active ? 'text-white' : 'text-teal-600'}">
									<Check class="h-5 w-5" />
								</span>
							{/if}
						</li>
					{:else}
						<li class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900">
							<span class="block truncate font-normal">Nothing found</span>
						</li>
					{/each}
				</ul>
			</Transition>
		</div>
	</div>
</div>



<style>
</style>
