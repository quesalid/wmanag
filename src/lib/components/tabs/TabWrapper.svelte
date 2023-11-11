<script lang="ts">
// https://blog.openreplay.com/creating-a-svelte-tabs-component-with-slot-props/
 import classNames from 'classnames'
  export let divClass = 'w-full'
  export let tabStyle: 'default' | 'underline' ='default'
</script>

<div class={classNames(divClass, $$props.class)}>
  <slot />
</div>
<style>
  .w-full{
	width:100%;
  }
</style>