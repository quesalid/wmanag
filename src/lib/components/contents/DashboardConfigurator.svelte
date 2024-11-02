<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import './dashconf.css'

  // Interfaccia per definire un widget
  interface Widget {
    id: string;
    name: string;
    width: number;
    height: number;
    top?: number;
    left?: number;
    isSelected?: boolean;
    isDragging?: boolean;
    image?: string;
    minimized?: string;
    params?: any;
  }

  // Costanti per le dimensioni
  const MENU_WIDGET_WIDTH = 100;
  const MENU_WIDGET_HEIGHT = 30;
  const GRID_SNAP = 10; // Snap alla griglia
  const GRID_ROWS = 60;
  const GRID_COLS = 60;
  let arrayrows = Array(GRID_ROWS)
  let arraycols = Array(GRID_COLS)

  const fromWinToWidget = (windows:any) => {
      return windows.map((w:any) => {
	  return {
		id: w.id,
		name: w.name,
		width: w.width?w.width.replace("px",""):null,
		height:w.height? w.height.replace("px",""):null,
		//top: w.top && w.top!="0px"?+w.top.replace("px","") + +barheight.replace("px",""):null,
        top: w.top && w.top!="0px"?+w.top.replace("px",""):null,
		left: w.left? w.left.replace("px",""):null,
		isSelected: false,
		isDragging: false,
		image: w.image,
        minimized: w.minimized?w.minimized:'off',
        params: w.params?w.params:null
	  }
	})
	
  }

  const scaleWidgets = (widgets: Widget[], scale: number) => {
	return widgets.map(w => ({
	  ...w,
	  width: w.width * scale,
	  height: w.height * scale,
	  top: w.top ? (w.top) * scale : undefined,
	  left: w.left ? w.left * scale : undefined
	}));
  }
  onMount(() => {
    /*const area = document.querySelector(container) as HTMLElement;
	let areaWidth = area.clientWidth;
   
    // calcola la larghezza dello schermo
    const width = window.innerWidth;
    const height = window.innerHeight;
    // calcola il fattore di scala
    const scaleX = areaWidth / width;
    scale = scaleX;
    
    // aggiusta l'altezza
    area.style.height = (height * scale)+'px';
    // calcola il numero di griglie
    const grid2 = document.querySelector('.dashboard-grid') as HTMLElement;
    const gridWidth2 = area.clientWidth;
    const gridHeight2 = area.clientHeight;
    // clacola il numero come minimo intero
    const gridColsInt2 = Math.floor(gridWidth2 / GRID_SNAP);
    const gridRowsInt2 = Math.floor(gridHeight2 / GRID_SNAP);
    arrayrows = Array(gridRowsInt2)
    arraycols = Array(gridColsInt2)*/
    // add event listener on custom event dashmounted
    const thisComponent = document.getElementById(id)
    thisComponent?.addEventListener('dashmounted', (e:any) => {
        const area = document.querySelector('.dashboard-area') as HTMLElement;
        const cont = document.querySelector(container) as HTMLElement;
	    let areaWidth = area.clientWidth;
        let areaHeight = area.clientHeight;
   
        // calcola la larghezza dello schermo
        const width = cont.clientWidth;
        const height = cont.clientHeight;
        console.log("width",width,"height",height,"areaWidth",areaWidth,"areaHeight",areaHeight)
        // calcola il fattore di scala
        const scaleX = areaWidth / width;
        scale = scaleX;
    
        // aggiusta l'altezza
        area.style.height = (height * scale)+'px';
        console.log("scale",scale,"width",width,"height",height,"areaWidth",areaWidth,"areaHeight",areaHeight)
        // calcola il numero di griglie
        const grid2 = document.querySelector('.dashboard-grid') as HTMLElement;
        const gridWidth2 = area.clientWidth;
        const gridHeight2 = area.clientHeight;
        // clacola il numero come minimo intero
        const gridColsInt2 = Math.floor(gridWidth2 / GRID_SNAP);
        const gridRowsInt2 = Math.floor(gridHeight2 / GRID_SNAP);
        arrayrows = Array(gridRowsInt2)
        arraycols = Array(gridColsInt2)
		// set windows
		windows = e.detail.windows
		availaibleWindows = windows.filter((w:any) => w.visible == "hidden")
		dashboardWindows = windows.filter((w:any) => w.visible == "visible")
		$availableWidgets = fromWinToWidget(availaibleWindows)
		$dashboardWidgets = fromWinToWidget(dashboardWindows);
        console.log("dashmounted",$availableWidgets,$dashboardWidgets)
		// scale widgets
		dashboardWidgets.update(widgets => scaleWidgets(widgets, scale));
		availableWidgets.update(widgets => scaleWidgets(widgets, scale));
	});

  });

 

  // EXPORTS
  export let scale = 1;
  export let id = "DashboardConfiguratorId"
  export let container = "#main-dashboard-config-page"
  export let barheight = "60px"
  export let saveDashboard = (ev:any, dwidgets:any,avwidgets:any) => {
            console.log("saveDashboard")
  }

  export let windows:any = []
  

  let availaibleWindows = windows.filter((w:any) => w.visible == "hidden")
  let dashboardWindows = windows.filter((w:any) => w.visible == "visible")
  let availableWidgets = writable<Widget[]>(fromWinToWidget(availaibleWindows))
  let dashboardWidgets = writable<Widget[]>(fromWinToWidget(dashboardWindows));

  // Variabili per gestire il movimento del widget
  let draggedWidget: Widget | null = null;
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;

  // Funzione per gestire l'inizio del drag
  const  handleDragStart = (event: DragEvent, widget: Widget, source: 'menu' | 'dashboard') => {
    // Imposta i dati per il drag
    event.dataTransfer?.setData('text/plain', JSON.stringify({
      ...widget,
      source
    }));

    // Se il widget è già nella dashboard, prepara lo spostamento
    if (source === 'dashboard') {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      startX = event.clientX;
      startY = event.clientY;
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      
      // Seleziona il widget
      dashboardWidgets.update(widgets => 
        widgets.map(w => ({
          ...w, 
          isSelected: w.id === widget.id,
          isDragging: w.id === widget.id
        }))
      );
    } else {
      // Per i widget dal menu, imposta il widget trascinato
      draggedWidget = { ...widget, source };
    }
  }

  // Funzione per gestire il movimento del widget
  const  handleMouseMove = (event: MouseEvent) => {
    const movingWidget = $dashboardWidgets.find(w => w.isDragging);
    if (!movingWidget) return;

    // Calcola il nuovo position con snap alla griglia
    const container = event.currentTarget as HTMLElement;
    const containerRect = container.getBoundingClientRect();
    
    const newLeft = Math.round(
      (event.clientX - containerRect.left - offsetX) / GRID_SNAP
    ) * GRID_SNAP;
    
    const newTop = Math.round(
      (event.clientY - containerRect.top - offsetY) / GRID_SNAP
    ) * GRID_SNAP;

    // Aggiorna la posizione del widget
    dashboardWidgets.update(widgets => 
      widgets.map(w => 
        w.isDragging 
          ? { 
              ...w, 
              left: Math.max(0, newLeft), 
              top: Math.max(0, newTop) 
            } 
          : w
      )
    );
  }

  // Funzione per fermare il movimento
  const  handleMouseUp = () => {
    dashboardWidgets.update(widgets => 
      widgets.map(w => ({
        ...w, 
        isDragging: false
      }))
    );
  }

  // Funzione per gestire il drop
  const  handleDrop = (event: DragEvent) => {
    event.preventDefault();
    
    // Recupera i dati del widget trascinato
    const rawData = event.dataTransfer?.getData('text/plain');
    if (!rawData) return;

    const droppedWidget: Widget & { source: 'menu' | 'dashboard' } = JSON.parse(rawData);

    // Determina l'area di destinazione
    const targetArea = (event.currentTarget as HTMLElement).classList.contains('widget-menu') 
      ? 'menu' 
      : 'dashboard';

    const rect:any = event.currentTarget.getBoundingClientRect();
    const newLeft:any = Math.round((event.clientX - rect.left) / GRID_SNAP) * GRID_SNAP;
    const newTop:any = Math.round((event.clientY - rect.top) / GRID_SNAP) * GRID_SNAP;

    if (droppedWidget.source === 'menu' && targetArea === 'dashboard') {
      // Aggiungi alla dashboard
      dashboardWidgets.update(widgets => [
        ...widgets, 
        { 
          ...droppedWidget, 
          left: newLeft, 
          top: newTop,
          isSelected: true
        }
      ]);
      availableWidgets.update(widgets => 
        widgets.filter(w => w.id !== droppedWidget.id)
      );
    } else if (droppedWidget.source === 'dashboard' && targetArea === 'menu') {
      // Rimuovi dalla dashboard e aggiungi al menu
      dashboardWidgets.update(widgets => 
        widgets.filter(w => w.id !== droppedWidget.id)
      );
      availableWidgets.update(widgets => [
        ...widgets, 
        { ...droppedWidget, left: undefined, top: undefined }
      ]);
    }
  }

  // Funzione per consentire il drop
  const  allowDrop = (event: DragEvent) => {
    event.preventDefault();
  }

  // Funzione per selezionare un widget
  const  selectWidget = (widgetId: string)=> {
    dashboardWidgets.update(widgets => 
      widgets.map(w => ({ 
        ...w, 
        isSelected: w.id === widgetId 
      }))
    );
  }

  const setminimize = (e:MouseEvent) => {
	const widgetId = e.target.id.replace("check-","")
    // if checked set minimize
    const checked = (e.target as HTMLInputElement).checked
    dashboardWidgets.update(widgets => 
	  widgets.map(w => ({ 
		...w, 
		minimized: w.id === widgetId && checked ? "on" : "off"
	  }))
	);
    availableWidgets.update(widgets => 
	  widgets.map(w => ({ 
		...w, 
		minimized: w.id === widgetId && checked ? "on" : "off"
	  }))
	);
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  id={id}
  class="dashboard-configurator"
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
>
  <!-- Menu dei widget disponibili -->
  <div>
      <input class="widget-menu-button" type="button" value="Save" on:click={(ev)=>{saveDashboard(ev,$dashboardWidgets,$availableWidgets)}} />
  <div 
    class="widget-menu" 
    on:drop={handleDrop} 
    on:dragover={allowDrop}
  >
    {#each $availableWidgets as widget (widget.id)}
    <div class="widget-plus-check">
      <input type="checkbox" id={"check-"+widget.id} name={"check"+widget.id} on:click={setminimize} checked={widget.minimized=='on'?true:false}/>
      <div 
        class="widget menu-widget"
        draggable={true}
        on:dragstart={(e) => handleDragStart(e, widget, 'menu')}
        style="width: {MENU_WIDGET_WIDTH}px; height: {MENU_WIDGET_HEIGHT}px;"
      >
        {widget.name}
      </div>
    </div>
    {/each}
  </div>
  </div>
  <!-- Area Dashboard -->
  <div 
    class="dashboard-area" 
    on:drop={handleDrop} 
    on:dragover={allowDrop}
  >
    <!-- Griglia di sfondo -->
    <div class="dashboard-grid">
      {#each arrayrows as _, row}
        {#each arraycols as _, col}
          <div 
            class="grid-cell" 
            style="
              left: {col * GRID_SNAP}px; 
              top: {row * GRID_SNAP}px;
            "
          ></div>
        {/each}
      {/each}
    </div>
    <div style='width:100%;height:48px border: 2px solid #f00;'></div>
    <!-- Widget nella dashboard -->
    {#each $dashboardWidgets as widget (widget.id)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div 
        class="widget dashboard-widget"
        class:selected={widget.isSelected}
        class:dragging={widget.isDragging}
        draggable={true}
        on:dragstart={(e) => handleDragStart(e, widget, 'dashboard')}
        on:click={() => selectWidget(widget.id)}
        style="
          width: {widget.width}px; 
          height: {widget.height}px; 
          position: absolute; 
          left: {widget.left}px; 
          top: {widget.top}px;
          z-index: {widget.isDragging ? 100 : 10};
        "
      >
      {#if widget.image}
            <img src={'/dashboard/'+widget.image} alt={widget.name} />
      {:else}
            {widget.name}
      {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  
</style>