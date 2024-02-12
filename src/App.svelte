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

import { Router, Route, navigate } from "svelte-routing";
import { onMount} from "svelte";

import DOCKER from "./routes/DockerMain.svelte"
import DEPLOY from "./routes/DeployMain.svelte"
import ADMINDB from "./routes/AdminDB.svelte"
import GRAPHBAYES from "./routes/GraphBayes.svelte"
import PORTALTEMPLATE from "./routes/PortalTemplate.svelte"
import MAPMANAGER from "./routes/MapManager.svelte"
// *******   ROUTES *********/
import MAINPAGE from "./routes/MainPage.svelte"
import {Login} from "./lib/components/contents"
import DashBoard from "./routes/DashBoard.svelte"
import Configure from "./routes/Configure.svelte"
import ConfigureAgent from "./routes/ConfigureAgent.svelte"
import GraphIsa from "./routes/GraphIsa.svelte";
import GraphBayes from "./routes/GraphBayes.svelte"

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
    <!-- B U I L D -->
    <Route path="/data/build">
        <GraphIsa logoImage="/ICO_UP2_DATA.png" logout="/datalogin"/>
    </Route>
    <Route path="/ai/build">
        <GraphBayes logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
	
    <Route path="/docker" component={DOCKER}/>
    <Route path="/deploy" component={DEPLOY}/>
    <Route path="/admindb" component={ADMINDB}/>
    <Route path="/graphbayes" component={GRAPHBAYES}/>
    <Route path="/portaltemplate" component={PORTALTEMPLATE}/>
    <Route path="/mapmanager" component={MAPMANAGER}/>
  </div>
</Router>

<style>
</style>