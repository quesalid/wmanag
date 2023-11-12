<script lang="ts">
 import classNames from 'classnames'
  export let divClass = 'w-full'
  export let tabStyle: 'default' | 'underline' ='default'
  export let tree:any = {}
</script>

<div class={classNames(divClass, $$props.class)}>
  <slot {tabStyle} {tree}/>
</div>
<style>
  .w-full{
	width:100%;
  }
</style>