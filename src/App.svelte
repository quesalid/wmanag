<script lang="ts">
// VPN FOR DEPLOYNG
// https://www.softether.org/
// https://kinsta.com/blog/web-components/
// https://stenciljs.com/docs/getting-started
// https://javascript.info/web-components
//
// SYSTEM Dynamics
// https://www.systemdynamics.org/
// https://insightmaker.com/
//
// SECURITY ANS PRIVATE CLOUD
// https://blog.cozy.io/en/cozy-cloud-how-to-encrypt-web-application/
//
// BPM MODELING
// https://bpmn.io/toolkit/bpmn-js/walkthrough/
//
// AI MODEL HUGGINGFACE
// https://huggingface.co/docs/api-inference/index
// curl "https://api-inference.huggingface.co/models/google/gemma-2-2b-it" -H "Authorization: Bearer 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" -H "Content-Type: application/json"" -d @testhf.json

// WHATS App
// https://github.com/WhiskeySockets/Baileys

import { Router, Route } from "svelte-routing";
import { onMount} from "svelte";
import {login} from './lib/script/apisecurity'

// *******   ROUTES *********/
import SPLASHCREEN from "./routes/SplashScreen.svelte"
import {Login} from "./lib/components/contents"
import DashBoardDynamic from "./routes/DashBoardDynamic.svelte"
import Configure from "./routes/Configure.svelte"
import ConfigureAgent from "./routes/ConfigureAgent.svelte"
import BuildData from "./routes/BuildData.svelte";
import GraphBayes from "./routes/GraphBayes.svelte"
import NeuralBrain from "./routes/NeuralBrain.svelte"
import Deploy from "./routes/Deploy.svelte"
import Monitor from "./routes/Monitor.svelte"
import Admin from "./routes/Admin.svelte"
import BuildClone from './routes/BuildClone.svelte'
import Assistant from "./routes/Assistant.svelte"

export const url = "/deploy"

// APPWIDE VARIABLES
let bgcolor = "#ddefde"
export let titlefontsize = "15px"
export let titlecolor = "#444"
export let titleweight = "bold"
export let bodycolor = "#ffffff"
/// BAR VARIABLES
export let barheigth = "55px"
export let barheigth1 = "55px"
export let imgheight = "55px"
export let topbarheight = "90%"
export let  avatarsize = "w-10"

 onMount(async () => {  

 })

 const extsubmit = async (data:any) =>{
     return {authenticated:true}
 }

</script>

<Router>
  <div>
    <Route path="/" component={SPLASHCREEN}/>
    <!--  L O G I N -->
    <Route path="/datalogin">
	  <Login openModalButton="Login" extsubmit={extsubmit} image = 'ICO_UP2_DATA.png' landingPage='/data' modulename="data"/>
    </Route>
    <Route path="/clonelogin">
	  <Login openModalButton="Login" extsubmit={extsubmit} image = 'ICO_UP2_CLONE.png' landingPage='/clone'modulename="clone"/>
    </Route>
    <Route path="/ailogin">
	  <Login openModalButton="Login" extsubmit={extsubmit} image = 'ICO_UP2_AI.png' landingPage='/ai'modulename="ai"/>
    </Route>
    <Route path="/learnlogin">
	  <Login openModalButton="Login" extsubmit={extsubmit} image = 'ICO_UP2_LEARN.png' landingPage='/learn'modulename="learn"/>
    </Route>
    <!-- D A S H B O A R D S    D Y N A M I C -->
    <Route path="/data">
        <DashBoardDynamic logoImage="/ICO_UP2_DATA.png"  
            {bgcolor}
            titlefontsize="13px"
		    {titlecolor}
		    {titleweight}
		    {bodycolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/clone">
        <DashBoardDynamic logoImage="/ICO_UP2_CLONE.png"  
            {bgcolor}
            titlefontsize="13px"
		    {titlecolor}
		    {titleweight}
		    {bodycolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/ai">
        <DashBoardDynamic logoImage="/ICO_UP2_AI.png"  
            {bgcolor}
            titlefontsize="13px"
		    {titlecolor}
		    {titleweight}
		    {bodycolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/learn">
        <DashBoardDynamic logoImage="/ICO_UP2_LEARN.png"  
            {bgcolor}
            titlefontsize="13px"
		    {titlecolor}
		    {titleweight}
		    {bodycolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <!--  C O N F I G U R E   -->
     <Route path="/data/configure">
        <Configure logoImage="/ICO_UP2_DATA.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/clone/configure">
		    <Configure logoImage="/ICO_UP2_CLONE.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/ai/configure">
		    <Configure logoImage="/ICO_UP2_AI.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/learn/configure">
		    <Configure logoImage="/ICO_UP2_LEARN.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <!-- C O N F I G U R E     A G E N T-->
    <Route path="/data/configure/agent">
        <ConfigureAgent logoImage="/ICO_UP2_DATA.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/clone/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_CLONE.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/ai/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_AI.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/learn/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_LEARN.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <!-- D E P L O Y -->
    <Route path="/data/deploy">
        <Deploy logoImage="/ICO_UP2_DATA.png"  
        bgcolor={bgcolor}
        barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/clone/deploy">
		    <Deploy logoImage="/ICO_UP2_CLONE.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/ai/deploy">
		    <Deploy logoImage="/ICO_UP2_AI.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/learn/deploy">
		    <Deploy logoImage="/ICO_UP2_LEARN.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <!-- B U I L D -->
    <Route path="/data/build">
        <BuildData logoImage="/ICO_UP2_DATA.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/clone/build">
        <BuildClone logoImage="/ICO_UP2_CLONE.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/ai/build">
        <GraphBayes logoImage="/ICO_UP2_AI.png" logout="/ailogin"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
     <Route path="/ai/brain">
        <NeuralBrain logoImage="/ICO_UP2_AI.png" logout="/ailogin"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
	<!-- M O N I T O R-->
    <Route path="/data/monitor">
        <Monitor logoImage="/ICO_UP2_DATA.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/clone/monitor">
		<Monitor logoImage="/ICO_UP2_CLONE.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/ai/monitor">
		 <Monitor logoImage="/ICO_UP2_AI.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/learn/monitor">
		 <Monitor logoImage="/ICO_UP2_LEARN.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <!-- A D M I N-->
    <Route path="/data/admin">
        <Admin logoImage="/ICO_UP2_DATA.png"  
            bgcolor={bgcolor}
	        barheigth = {barheigth}
	        barheigth1 = {barheigth1}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/clone/admin">
		<Admin logoImage="/ICO_UP2_CLONE.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        barheigth1 = {barheigth1}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/ai/admin">
		 <Admin logoImage="/ICO_UP2_AI.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        barheigth1 = {barheigth1}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/learn/admin">
		 <Admin logoImage="/ICO_UP2_LEARN.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        barheigth1 = {barheigth1}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <!-- A S S I S T A N T  -->
    <Route path="/data/assistant">
        <Assistant logoImage="/ICO_UP2_DATA.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/clone/assistant">
		<Assistant logoImage="/ICO_UP2_CLONE.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/ai/assistant">
		 <Assistant logoImage="/ICO_UP2_AI.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
    <Route path="/learn/assistant">
		 <Assistant logoImage="/ICO_UP2_LEARN.png"  
            bgcolor={bgcolor}
            barheigth = {barheigth}
	        imgheight = {imgheight}
	        topbarheight = {topbarheight}
	        avatarsize = {avatarsize}/>
    </Route>
  </div>
</Router>

<style>
</style>