<script lang="ts">
	import { createMenu } from 'svelte-headlessui'
	import Transition from 'svelte-transition'
	
	const menu = createMenu({ label: 'Actions' })

	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail)
	}

	// prettier-ignore
	export let  groups = [
		[
			{ icon: null, text: `Edit` },
			{ icon: null, text: `Duplicate` },
		], [
			{ icon: null, text: `Archive` },
			{ icon: null, text: `Move` },
		], [
			{ icon: null, text: `Delete` },
		],
	]

	export let image = "AVATAR.svg"
	export let imagesize = "w-9"
	export let message = "Use menu to say something"
	export let messageclass = "font-bold"

	const imgclass = "inline-flex justify-center rounded-full  px-0 py-0 "+ imagesize +" text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="relative top-0 w-16 text-right">
		<div class="relative inline-block text-left">
			<!--button
				use:menu.button
				on:select={onSelect}
				class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				Options
			</!--button-->
			<div class="badge-count-top" data-count='0'>
			<img alt='Options' src="{image}" on:select={onSelect}  use:menu.button
			class="{imgclass}"
			/>
			</div>
			<Transition
				show={$menu.expanded}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
			
				<div
					use:menu.items
					class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div class="{messageclass}">{message}</div>
					{#each groups as group}
						<div class="px-1 py-1">
							{#each group as option}
								{@const active = $menu.active === option.text}
								<button
									use:menu.item
									class="group flex rounded-md items-center w-full px-2 py-2 text-sm {active ? 'bg-violet-500 text-white' : 'text-gray-900'}"
								>
									<svelte:component this={option.icon} class="w-5 h-5 mr-2" {active} />
									{option.text}
								</button>
							{/each}
						</div>
					{/each}
				</div>
			</Transition>
		</div>
	</div>
</div>

<style>
</style>