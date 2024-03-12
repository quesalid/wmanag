<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTERNAL
import DB from '../../script/mockdb.js'
import {module} from '../../ustore.js'

onMount(async () => { 
    const dbs = DB.generateDbs($module.toUpperCase())
    console.log(" DBS ",dbs)
    tree.dbs = dbs
})


export let tree:any = {
    name:'DBS',
    dbs:[
        {name:'administration',tables:[
            {name:'users',columns:[
                {name:'uid',type:'char'},
                {name:'name',type:'char'},
                {name:'surname',type:'char'}
            ]},
            {name:'logs',columns:[]},
        ]},
        {name:'clone',tables:[
            {name:'devices',columns:[]},
            {name:'agents',columns:[]},
        ]}
    ]
}


</script>

<ul class="tree">
  <li>
    <details>
      <summary style="font-style:italic ;">DBS</summary>
      <ul>
        {#each tree.dbs as DB}
        <li style="font-weight:bold;">{DB.name}
          <details>
            <summary style="font-weight:normal;font-style:italic ;">Tables</summary>
            <ul>
              {#if DB.tables}
                {#each DB.tables as TABLE}
                    <li>{TABLE.name}
                        <details>
                        <summary style="font-weight:normal;font-style:italic ;">Columns</summary>
                        <ul>
                            {#if TABLE.columns}
                                 {#each TABLE.columns as COLUMN}
                                    <li>{COLUMN.name}</li>
                                {/each}
                             {/if}
                         </ul>
                        </details>    
                    </li>
                {/each}
              {/if}
            </ul>
          </details>
        </li>
        {/each}
      </ul>
    </details>
  </li>
</ul>


<style>
.tree{
  --spacing : 1.5rem;
  --radius  : 10px;
}

.tree li{
  display      : block;
  position     : relative;
  padding-left : calc(2 * var(--spacing) - var(--radius) - 2px);
}

.tree ul{
  margin-left  : calc(var(--radius) - var(--spacing));
  padding-left : 0;
}

.tree ul li{
  border-left : 2px solid #ddd;
}

.tree ul li:last-child{
  border-color : transparent;
}

.tree ul li::before{
  content      : '';
  display      : block;
  position     : absolute;
  top          : calc(var(--spacing) / -2);
  left         : -2px;
  width        : calc(var(--spacing) + 2px);
  height       : calc(var(--spacing) + 1px);
  border       : solid #ddd;
  border-width : 0 0 2px 2px;
}

.tree summary{
  display : block;
  cursor  : pointer;
}

.tree summary::marker,
.tree summary::-webkit-details-marker{
  display : none;
}

.tree summary:focus{
  outline : none;
}

.tree summary:focus-visible{
  outline : 1px dotted #000;
}

.tree li::after,
.tree summary::before{
  content       : '';
  display       : block;
  position      : absolute;
  top           : calc(var(--spacing) / 2 - var(--radius));
  left          : calc(var(--spacing) - var(--radius) - 1px);
  width         : calc(2 * var(--radius));
  height        : calc(2 * var(--radius));
  border-radius : 50%;
  background    : #ddd;
}

.tree summary::before{
  z-index    : 1;
  background : #696 url('expand-collapse.svg') 0 0;
}

.tree details[open] > summary::before{
  background-position : calc(-2 * var(--radius)) 0;
}
</style>