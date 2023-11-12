<script lang='ts'>
// https://stackoverflow.com/questions/41574776/what-is-class-mb-0-in-bootstrap-4
 export let tabStyle: 'default' | 'underline' ='default'
  type classOptions = {
    [key: string]: string;
  }
  export const divClasses = {
    default: 'mb-4 font-bold border-b border-gray-200 dark:border-gray-700',
    underline: 'mb-4 text-sm font-bold text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'
  }
  export const ulClasses = {
    default: 'flex flex-wrap -mb-px',
    underline: 'flex flex-wrap -mb-px'
  }
</script>

<div class={divClasses[tabStyle]}>
  <ul class={ulClasses[tabStyle]}  role="tablist">
    <slot />
  </ul>
</div>
<style>
.flex{
    display:flex
}
.flex-wrap{
	flex-wrap:wrap
}
.-mb-px{
	margin-bottom:0px;
	padding-right: 0px;
	padding-left: 0px;
}
</style>