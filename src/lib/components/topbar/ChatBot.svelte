<script lang='ts'>
  // import the custom store
  import { navigate } from "svelte-routing";
  import {navigation,getArrayFromPath,module, assistant} from '../../ustore.js'
  import {onMount} from "svelte"

  // Add custom event listener on load to change icon fill color
  onMount(()=>{
    fill = $assistant?fillon:filloff
	document.addEventListener('toggleassistant',(e:any)=>{
	  const status = e.detail.status
      if(status){
		fill = fillon
	  }else{
          fill = filloff
	  }
	})
  })

  export let configAssistant = (ev:any) =>{
      console.log("EVENT",ev)
      const link = '/'+$module+'/assistant'
      navigate(link)
	  // UPDATE NAVIGATION
	  $navigation = getArrayFromPath(link)
  }

  export let width = '30px'
  export let height = '30px'
  export let fillon = '#00AA00'
  export let filloff = '#999999'

  let fill = filloff

</script>

<button class="relative p-1 mt-1 text-center" on:click={configAssistant}>
      <svg id="ICON_ASSISTANT" fill="{fill}" width="{width}" height="{height}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z"/>
            <ellipse cx="8.5" cy="12" rx="1.5" ry="2"/>
            <ellipse cx="15.5" cy="12" rx="1.5" ry="2"/>
            <path d="M8 16h8v2H8z"/>
      </svg>
</button>



<style>
 
</style>