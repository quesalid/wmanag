<script lang="ts">
export let barheight = "50px"
export let bgcolor = "#f0f0f0"
</script>
	<header id="navbar">
      <nav class="navbar-container container" style="--height:{barheight};--background-color:{bgcolor}">
        <div class='topbar-section left-section'>
            <slot name="lefttop">No slot </slot>
        </div>
        <div class='topbar-section center-section'>
            <slot name="centertop">No slot </slot>
        </div>
        <div class='topbar-section right-section'>
            <slot name="righttop">No slot </slot>
        </div>
      </nav>
    </header>
<style>
.container {
  padding: 0 0rem;
  margin: 0 auto;
}
#navbar {
  position: fixed;
  left: 0;
  right: 0;
}
.navbar-container {
  display: flex;
  justify-content: space-between;
  height: var(--height);
  align-items: center;
  background-color: var(--background-color);
}
.topbar-section{
    display: flex;
    flex-direction:row ;
    align-items: center;
    height:100%;
    /*border: 1px solid red;*/
    padding: 0.4rem;
}
.left-section{
    width: 33%;
    justify-content:left;
}
.center-section{
    width: 34%;
    justify-content: center;
}
.right-section{
    width: 33%;
    justify-content: right;
}
</style>