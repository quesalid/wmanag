<script lang="ts">
// VPN FOR DEPLOYNG
// https://www.softether.org/
// https://kinsta.com/blog/web-components/


import { Router, Route, navigate } from "svelte-routing";
import { onMount} from "svelte";
import DOCKER from "./routes/DockerMain.svelte"
import DEPLOY from "./routes/DeployMain.svelte"
import ADMINDB from "./routes/AdminDB.svelte"
import GRAPHBAYES from "./routes/GraphBayes.svelte"
import GRAPHISA from "./routes/GraphIsa.svelte"
import PORTALTEMPLATE from "./routes/PortalTemplate.svelte"
import MAPMANAGER from "./routes/MapManager.svelte"

export const url = "/deploy"

 onMount(async () => {  
     
 })

</script>

<Router>
  <div>
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