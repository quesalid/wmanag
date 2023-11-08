<script lang="ts">
  export let checked = false;
  export let color = "#2196F3";
  export let height = "34px"
  export let width = "60px"
  export let onCheck = (ev: any) => {
      console.log("CHECKED", ev.target.checked)
      checked = ev.target.checked;
  };

</script>

<label class="switch" style="--width:{width};--heigth:{height}">
  <input type="checkbox"  style="--background-color:{color} ;" on:change={onCheck}/>
  <span class="slider" style="--border-radius:{height}"/>
</label>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: var(--border-radius);
    border: 2px solid #aaa;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 80%;
    width: 43%;
    left: 4px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #afffaf;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #afffaf;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(80%);
    -ms-transform: translateX(80%);
    transform: translateX(80%);
  }
</style>

