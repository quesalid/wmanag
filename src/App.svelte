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

import { Router, Route, navigate } from "svelte-routing";
import { onMount} from "svelte";
import {login} from './lib/script/apisecurity'


import ADMINDB from "./routes/AdminDB.svelte"
import MAPMANAGER from "./lib/components/contents/MapManager.svelte"
// *******   ROUTES *********/
import MAINPAGE from "./routes/MainPage.svelte"
import {Login} from "./lib/components/contents"
import DashBoard from "./routes/DashBoard.svelte"
import Configure from "./routes/Configure.svelte"
import ConfigureAgent from "./routes/ConfigureAgent.svelte"
import GraphIsa from "./routes/GraphIsa.svelte";
import GraphBayes from "./routes/GraphBayes.svelte"
import Deploy from "./routes/Deploy.svelte"
import Monitor from "./routes/Monitor.svelte"

export const url = "/deploy"

 onMount(async () => {  
     
 })

</script>

<Router>
  <div>
    <Route path="/" component={MAINPAGE}/>
    <!--  L O G I N -->
    <Route path="/datalogin">
	  <Login openModalButton="Login" extsubmit={async (data) => {
		return {authenticated:true}
	  }} image = 'ICO_UP2_DATA.png' landingPage='/data' modulename="data"/>
    </Route>
    <Route path="/clonelogin">
	  <Login openModalButton="Login" extsubmit={async (data) => {
		return {authenticated:true}
	  }} image = 'ICO_UP2_CLONE.png' landingPage='/clone'modulename="clone"/>
    </Route>
    <Route path="/ailogin">
	  <Login openModalButton="Login" extsubmit={async (data) => {
		return {authenticated:true}
	  }} image = 'ICO_UP2_AI.png' landingPage='/ai'modulename="ai"/>
    </Route>
    <Route path="/learnlogin">
	  <Login openModalButton="Login" extsubmit={async (data) => {
		return {authenticated:true}
	  }} image = 'ICO_UP2_LEARN.png' landingPage='/learn'modulename="learn"/>
    </Route>
    <!-- D A S H B O A R D S -->
    <Route path="/data">
        <DashBoard logoImage="/ICO_UP2_DATA.png" logout="/datalogin"/>
    </Route>
    <Route path="/clone">
        <DashBoard logoImage="/ICO_UP2_CLONE.png" logout="/clonelogin"/>
    </Route>
    <Route path="/ai">
        <DashBoard logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
    <Route path="/learn">
        <DashBoard logoImage="/ICO_UP2_LEARN.png" logout="/learnlogin"/>
    </Route>
    <!--  C O N F I G U R E   -->
     <Route path="/data/configure">
        <Configure logoImage="/ICO_UP2_DATA.png" logout="/datalogin"/>
    </Route>
    <Route path="/clone/configure">
		    <Configure logoImage="/ICO_UP2_CLONE.png" logout="/clonelogin"/>
    </Route>
    <Route path="/ai/configure">
		    <Configure logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
    <Route path="/learn/configure">
		    <Configure logoImage="/ICO_UP2_LEARN.png" logout="/learnlogin"/>
    </Route>
    <!-- C O N F I G U R E     A G E N T-->
    <Route path="/data/configure/agent">
        <ConfigureAgent logoImage="/ICO_UP2_DATA.png" logout="/datalogin"/>
    </Route>
    <Route path="/clone/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_CLONE.png" logout="/clonelogin"/>
    </Route>
    <Route path="/ai/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
    <Route path="/learn/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_LEARN.png" logout="/learnlogin"/>
    </Route>
    <!-- D E P L O Y -->
    <Route path="/data/deploy">
        <Deploy logoImage="/ICO_UP2_DATA.png" logout="/datalogin"/>
    </Route>
    <Route path="/clone/deploy">
		    <Deploy logoImage="/ICO_UP2_CLONE.png" logout="/clonelogin"/>
    </Route>
    <Route path="/ai/deploy">
		    <Deploy logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
    <Route path="/learn/deploy">
		    <Deploy logoImage="/ICO_UP2_LEARN.png" logout="/learnlogin"/>
    </Route>
    <!-- B U I L D -->
    <Route path="/data/build">
        <GraphIsa logoImage="/ICO_UP2_DATA.png" logout="/datalogin"/>
    </Route>
    <Route path="/ai/build">
        <GraphBayes logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
	<!-- M O N I T O R-->
    <Route path="/data/monitor">
        <Monitor logoImage="/ICO_UP2_DATA.png" logout="/datalogin"/>
    </Route>
    <Route path="/clone/monitor">
		<Monitor logoImage="/ICO_UP2_CLONE.png" logout="/clonelogin"/>
    </Route>
    <Route path="/ai/monitor">
		 <Monitor logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
    <Route path="/learn/monitor">
		 <Monitor logoImage="/ICO_UP2_LEARN.png" logout="/learnlogin"/>
    </Route>

    <Route path="/admindb" component={ADMINDB}/>
    <Route path="/mapmanager" component={MAPMANAGER}/>
  </div>
</Router>

<style>
</style>