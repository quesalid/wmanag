<script lang="ts">
import {onMount} from "svelte"
import {TopBar,Logo,DropDownMenu,AlertMessages} from "../lib/components/topbar"
import { center } from '../lib/components/topbar/notifications';


onMount(() => {
    center.init([
      'Suspicious login on your server less then a minute ago',
      'Successful login attempt by @johndoe',
      'Successful login attempt by @amy',
      'Suspicious login on your server 7 min',
      'Suspicious login on your server 11 min ago',
      'Successful login attempt by @horace',
      'Suspicious login on your server 14 min ago',
      'Successful login attempt by @jack'
    ]);
  });
const barheigth = "50px"

const avatargroups = [
	[
		{ icon: null, text: `Dashborad` },
		{ icon: null, text: `Profile` },
		{ icon: null, text: `Settings` },
	], [
		{ icon: null, text: `Logout` },
	]
]



const avatarsize = 'w-10'
const avatar = 'PPULICANI.png'
const avatarmessage = "p.pulicani@up2twin.com"
const avatarclass = "font-bold text-sm italic"
const bgcolor = "#fff2e8"
</script>

<div>
	<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
		<div slot="lefttop">
			<Logo logofilename="ICO_UP2_DATA.png" imgheight={barheigth}>
			</Logo>
		</div>
		<div slot="centertop">
		</div>
		<div slot="righttop" class='flex'>
		<AlertMessages/>
		<DropDownMenu groups={avatargroups} image="{avatar}" 
				imagesize={avatarsize} 
				message={avatarmessage}
				messageclass={avatarclass}>
		</DropDownMenu>
		</div>
	</TopBar>
</div>

<style>
</style>