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

import { Router, Route, navigate } from "svelte-routing";
import { onMount} from "svelte";
import {login} from './lib/script/apisecurity'

// *******   ROUTES *********/
import SPLASHCREEN from "./routes/SplashScreen.svelte"
import {Login} from "./lib/components/contents"
import DashBoard from "./routes/DashBoard.svelte"
import Configure from "./routes/Configure.svelte"
import ConfigureAgent from "./routes/ConfigureAgent.svelte"
import BuildData from "./routes/BuildData.svelte";
import GraphBayes from "./routes/GraphBayes.svelte"
import Deploy from "./routes/Deploy.svelte"
import Monitor from "./routes/Monitor.svelte"
import Admin from "./routes/Admin.svelte"
import BuildClone from './routes/BuildClone.svelte'
import DashBoardConfig from "./routes/DashBoardConfig.svelte"

export const url = "/deploy"

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
    <!-- D A S H B O A R D S -->
    <Route path="/data">
        <DashBoard logoImage="/ICO_UP2_DATA.png"/>
    </Route>
    <Route path="/clone">
        <DashBoard logoImage="/ICO_UP2_CLONE.png"/>
    </Route>
    <Route path="/ai">
        <DashBoard logoImage="/ICO_UP2_AI.png"/>
    </Route>
    <Route path="/learn">
        <DashBoard logoImage="/ICO_UP2_LEARN.png"/>
    </Route>
    <!--  C O N F I G U R E   -->
     <Route path="/data/configure">
        <Configure logoImage="/ICO_UP2_DATA.png"/>
    </Route>
    <Route path="/clone/configure">
		    <Configure logoImage="/ICO_UP2_CLONE.png"/>
    </Route>
    <Route path="/ai/configure">
		    <Configure logoImage="/ICO_UP2_AI.png"/>
    </Route>
    <Route path="/learn/configure">
		    <Configure logoImage="/ICO_UP2_LEARN.png"/>
    </Route>
    <!-- C O N F I G U R E     A G E N T-->
    <Route path="/data/configure/agent">
        <ConfigureAgent logoImage="/ICO_UP2_DATA.png"/>
    </Route>
    <Route path="/clone/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_CLONE.png"/>
    </Route>
    <Route path="/ai/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_AI.png"/>
    </Route>
    <Route path="/learn/configure/agent">
		    <ConfigureAgent logoImage="/ICO_UP2_LEARN.png"/>
    </Route>
    <!-- D E P L O Y -->
    <Route path="/data/deploy">
        <Deploy logoImage="/ICO_UP2_DATA.png"/>
    </Route>
    <Route path="/clone/deploy">
		    <Deploy logoImage="/ICO_UP2_CLONE.png"/>
    </Route>
    <Route path="/ai/deploy">
		    <Deploy logoImage="/ICO_UP2_AI.png"/>
    </Route>
    <Route path="/learn/deploy">
		    <Deploy logoImage="/ICO_UP2_LEARN.png"/>
    </Route>
    <!-- B U I L D -->
    <Route path="/data/build">
        <BuildData logoImage="/ICO_UP2_DATA.png"/>
    </Route>
    <Route path="/clone/build">
        <BuildClone logoImage="/ICO_UP2_CLONE.png"/>
    </Route>
    <Route path="/ai/build">
        <GraphBayes logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
	<!-- M O N I T O R-->
    <Route path="/data/monitor">
        <Monitor logoImage="/ICO_UP2_DATA.png"/>
    </Route>
    <Route path="/clone/monitor">
		<Monitor logoImage="/ICO_UP2_CLONE.png"/>
    </Route>
    <Route path="/ai/monitor">
		 <Monitor logoImage="/ICO_UP2_AI.png"/>
    </Route>
    <Route path="/learn/monitor">
		 <Monitor logoImage="/ICO_UP2_LEARN.png"/>
    </Route>
    <!-- A D M I N-->
    <Route path="/data/admin">
        <Admin logoImage="/ICO_UP2_DATA.png"/>
    </Route>
    <Route path="/clone/admin">
		<Admin logoImage="/ICO_UP2_CLONE.png" />
    </Route>
    <Route path="/ai/admin">
		 <Admin logoImage="/ICO_UP2_AI.png" />
    </Route>
    <Route path="/learn/admin">
		 <Admin logoImage="/ICO_UP2_LEARN.png" />
    </Route>
    <!-- D A S H B O A R D    C O N F I G -->
    <Route path="/data/dashboardconfig">
        <DashBoardConfig logoImage="/ICO_UP2_DATA.png"/>
    </Route>
    <Route path="/clone/dashboardconfig">
		<DashBoardConfig logoImage="/ICO_UP2_CLONE.png"/>
    </Route>
    <Route path="/ai/dashboardconfig">
		 <DashBoardConfig logoImage="/ICO_UP2_AI.png"/>
    </Route>
    <Route path="/learn/dashboardconfig">
		 <DashBoardConfig logoImage="/ICO_UP2_LEARN.png"/>
    </Route>
  </div>
</Router>

<style>
</style>