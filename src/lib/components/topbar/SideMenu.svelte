<script lang='ts'>
import { createMenu } from 'svelte-headlessui'

const menu = createMenu({ label: 'Menus' })

function onSelect(e: Event) {
	console.log('select', (e as CustomEvent).detail)
}

export let topbarheight = "95%"
export let  groups = [
		[
			{ icon: null, text: `Monitor` },
			{ icon: null, text: `Build` },
		], [
			{ icon: null, text: `Configure` },
			{ icon: null, text: `Deploy` }
		]
	]

const toggleNav = (ev:any)=> {
  const sidenav = document.getElementById("mySidenav")
  if(sidenav){
		if(!$menu.expanded){
			sidenav.style.width = "250px";
		}
		else{
			sidenav.style.width = "0";
		}
	}
}


</script>

<div id="mySidenav" class="sidenav rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
		style="width:{$menu.expanded?'250px':'0'}" 
		use:menu.items>
  <div class="display:block;">
  <!--a href="javascript:void(0)" class="closebtn" on:click={closeNav}>&times;</!--a-->
    {#each groups as group}
		{#each group as item}
			{@const active = $menu.active === item.text}
			<button class="group flex rounded-md justify-items-start w-full px-2 py-2 text-sm {active ? 'bg-teal-600 text-white' : 'text-gray-900'}"  use:menu.item>{item.text}</button>
		{/each}
	{/each}
  </div>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span  style="font-size:30px;cursor:pointer; margin-right: 10px;" use:menu.button on:select={onSelect}>&#9776</span>


<style>
.sidenav {
  height: 92%;
  width: 0;
  position: fixed;
  z-index: 1;
  bottom:0;
  overflow-x: hidden;
  padding-top: 60px;
   padding-top: 60px;
  left: 0;
  background-color: #fff;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav button {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 22px;
  color: #818181;
  transition: 0.3s;
}

.sidenav button:hover {
  color: #f1f1f1;
}

</style>