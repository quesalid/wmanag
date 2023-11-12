<script lang="ts">
  // adding active class
  import classNames from 'classnames';
  export let id;
  export let activeTabValue
  export let inactiveClass = 'inline-block py-1 px-1 text-sm font-bold text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
  export let activeClass = 'inline-block py-1 px-1 text-sm font-bold text-center text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
  type classOptions = {
    [key: string]: string;
  }
  const activeClasses: classOptions  = {
    default: 'inline-block py-1 px-1 text-sm font-bold text-center text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500', 
    underline: 'inline-block p-1 font-bold text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
  }
  const inactiveClasses: classOptions  = {
    default: 'inline-block py-1 px-1 text-sm font-bold text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300',
    underline: 'inline-block p-1 font-bold rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
  }
  const liClasses : classOptions = {
    default: 'mr-2',
    underline: 'mr-2'
  };
  export let tabStyle: 'default' | 'underline' ='default'
</script>

<li class={liClasses[tabStyle]} role="presentation">
  <button
    on:click
    class={classNames(activeTabValue === id ? activeClasses[tabStyle] : inactiveClasses[tabStyle])}
    id="{id}-tabhead"
    type="button"
    role="tab">
    <slot />
  </button>
</li>

<style>
li::marker {
  content: '';
}
.mr-2{
	margin-right:0.5rem;
}
.inline-block{
	display:inline-block;
}
.py-4{
	padding-top:1rem;
	padding-bottom:1rem;
}
.px-4{
	padding-left:1rem;
	padding-right:1rem;
}
.p-4{
	padding:1rem;
}
.py-1{
	padding-top:0.25rem;
	padding-bottom:0.25rem;
}
.px-1{
	padding-left:0.25rem;
	padding-right:0.25rem;
}
.p-1{
	padding:0.25rem;
}
.text-sm{
	font-size:0.875rem;
}
.font-medium{
	font-weight:500;
}
.font-bold{
	font-weight:700;
}
.text-center{
	text-align:center;
}
.text-gray-500{
	color:#6b7280;
}
.rounded-t-lg{
	border-top-left-radius:0.5rem;
	border-top-right-radius:0.5rem;
}
.hover:text-gray-600:hover{
	color:#6b7280;
}
.hover:bg-gray-50:hover{
	background-color:#f9fafb;
}
.dark:text-gray-400{
	color:#9ca3af;
}
.dark:hover:bg-gray-800:hover{
	background-color:#1f2937;
}
.dark:hover:text-gray-300:hover{
	color:#d1d5db;
}
.text-blue-600{
	color:#2563eb;
}
.bg-gray-100{
	background-color:#f3f4f6;
}
.active{
	--tw-bg-opacity:1;
	background-color:rgba(229, 231, 235, var(--tw-bg-opacity));
}
.dark:bg-gray-800{
	background-color:#1f2937;
}
.dark:text-blue-500{
	color:#3b82f6;
}
.border-b-2{
	border-bottom-width:0.125rem;
}
.border-blue-600{
	--tw-border-opacity:1;
	border-color:rgba(59, 130, 246, var(--tw-border-opacity));
}
.border-transparent{
	border-color:transparent;
}
.hover:border-gray-300:hover{
	--tw-border-opacity:1;
	border-color:rgba(209, 213, 219, var(--tw-border-opacity));
}
.dark:hover:border-gray-300:hover{
	--tw-border-opacity:1;
	border-color:rgba(209, 213, 219, var(--tw-border-opacity));
}
.dark:hover:text-gray-300:hover{
	color:#d1d5db;
}

</style>