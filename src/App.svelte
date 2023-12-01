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



export let url = "/deploy"



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
  </div>
</Router>

<style>
</style>