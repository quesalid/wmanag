<script lang="ts">
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";

   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {getDevices} from '../lib/script/apidataconfig.js'
   import {token, mock, currentplant} from '../lib/ustore.js'
   import Wmanag from '../lib/components/WManag.svelte'
   import {SimpleTable} from '../lib/components/table'
   import {getImage,getDeviceColumns} from '../lib/script/utils.js'
   import {dragElement} from '../lib/components/CompUtils.js'
   
  


   let devicesdata:any = writable([])
	onMount(async () => {
		center.init([
			  'Suspicious login on your server less then a minute ago',
			  'Successful login attempt by @johndoe',
			  'Successful login attempt by @amy',
			  'Suspicious login on your server 7 min',
			  'Suspicious login on your server 11 min ago',
			  'Successful login attempt by @horace',
			  'Suspicious login on your server 14 min ago',
			  'Successful login attempt by @jack'
		])
		const filters:any = []
		const ret = await getDevices(filters,$mock)
		$devicesdata = ret.data
		console.log("DEVICES DATA",$devicesdata)
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"
	export let module = "data"

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	const avatargroups = [
		[
			{ icon: null, text: `Dashborad` },
			{ icon: null, text: `Profile` },
			{ icon: null, text: `Settings` },
		], [
			{ icon: null, text: `Logout`,link:logout },
		]
	]
	
	const avatarsize = "w-10"
	const avatar = '/PPULICANI.png'
	const avatarmessage = "p.pulicani@up2twin.com"
	const avatarclass = "font-bold text-sm italic"


	// click Logo
	const onClickLogo = (ev:any)=>{
		console.log("LOGO CLICKED",$currentplant)
		navigate(`/`+module)
	}

	// TABLE VARIABLES
	const titleagent = 'DEVICES'
	let onClickAddDevice = (ev:any)=>{console.log("ONCLICK ADD CONTAINER")}
	let toolbardevice = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddDevice,label:"Add"}]
	const disableClose = true
	const draggable = true
	let zindex = 4
    let headercolor = bgcolor
	let pagesize = true
	let pSize = 3

	let devicedatacolumns = getDeviceColumns(module)

</script>
<div>
		<div>
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<Logo logofilename="{logoImage}" imgheight={imgheight} onClick={onClickLogo}>
					</Logo>
				</div>
				<div slot="centertop">
					<BreadCrumb/>
				</div>
				<div slot="righttop" class='flex'>
				<AlertMessages/>
				<DropDownMenu groups={avatargroups} image="{avatar}" 
						imagesize='{avatarsize}'
						message={avatarmessage}
						messageclass={avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}' module="{module}"/>
				</div>
			</TopBar>

		</div>
		<div class="configurator-container" style="--top:{barheigth}">
			<Wmanag id="containerWManager"  title="{titleagent}" toolbar={toolbardevice} {disableClose} {draggable} {headercolor} {zindex}>
				<SimpleTable slot="bodycontent" data={devicesdata} datacolumns={devicedatacolumns} {pagesize} {pSize}/>
			</Wmanag>
		</div>
</div>

<style>
.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}

</style>


