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
import GRAPHISA from "./routes/GraphIsa.svelte"
import PORTALTEMPLATE from "./routes/PortalTemplate.svelte"
import MAPMANAGER from "./routes/MapManager.svelte"
import MAINPAGE from "./routes/MainPage.svelte"
import Login from "./lib/components/contents/Login.svelte"
import DashBoard from "./routes/DashBoard.svelte"

export const url = "/deploy"

 onMount(async () => {  
     
 })

</script>

<Router>
  <div>
    <Route path="/" component={MAINPAGE}/>
    <Route path="/datalogin">
	  <Login openModalButton="Login" extsubmit={async (data) => {
		console.log(data)
		return {authenticated:true}
	  }} image = 'ICO_UP2_DATA.png' landingPage='/data/dashboard'/>
    </Route>
    <Route path="/clonelogin">
	  <Login openModalButton="Login" extsubmit={async (data) => {
		console.log(data)
		return {authenticated:true}
	  }} image = 'ICO_UP2_CLONE.png' landingPage='/clone/dashboard'/>
    </Route>
    <Route path="/ailogin">
	  <Login openModalButton="Login" extsubmit={async (data) => {
		console.log(data)
		return {authenticated:true}
	  }} image = 'ICO_UP2_AI.png' landingPage='/ai/dashboard'/>
    </Route>
    <Route path="/learnlogin">
	  <Login openModalButton="Login" extsubmit={async (data) => {
		console.log(data)
		return {authenticated:true}
	  }} image = 'ICO_UP2_LEARN.png' landingPage='/learn/dashboard'/>
    </Route>
    <Route path="/data/dashboard">
        <DashBoard logoImage="/ICO_UP2_DATA.png" logout="/datalogin"/>
    </Route>
    <Route path="/clone/dashboard">
        <DashBoard logoImage="/ICO_UP2_CLONE.png" logout="/clonelogin"/>
    </Route>
    <Route path="/ai/dashboard">
        <DashBoard logoImage="/ICO_UP2_AI.png" logout="/ailogin"/>
    </Route>
    <Route path="/learn/dashboard">
        <DashBoard logoImage="/ICO_UP2_LEARN.png" logout="/learnlogin"/>
    </Route>
    <Route path="/docker" component={DOCKER}/>
    <Route path="/deploy" component={DEPLOY}/>
    <Route path="/admindb" component={ADMINDB}/>
    <Route path="/graphbayes" component={GRAPHBAYES}/>
    <Route path="/graphisa" component={GRAPHISA}/>
    <Route path="/portaltemplate" component={PORTALTEMPLATE}/>
    <Route path="/mapmanager" component={MAPMANAGER}/>
  </div>
</Router>

<style>
</style>