<script lang='ts'>
  import { onMount } from 'svelte';
  import * as Cesium from 'cesium';
  import '../../../../node_modules/cesium/Build/Cesium/Widgets/widgets.css';

  export let section:any

  const CESIUM_ION_TOKEN = import.meta.env.VITE_CESIUM_TOKEN;
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzOTk5NTRiMi00NTc0LTQ5M2EtYjAxNy0wZTNjMDViNGEwNTAiLCJpZCI6MjU0Nzk3LCJpYXQiOjE3MzE0NDQyMzR9.Q7hVel0FnRqHYZDVqFeSfqJgOdjxDfv88h1IuN_UXiY';

  let viewer:any;
  

  onMount(async () => {
    console.log("SECTION",section)

    /*viewer = new Cesium.CesiumWidget("cesiumContainer",{
      terrainProvider: await Cesium.createWorldTerrainAsync(),
    });*/
     viewer = new Cesium.CesiumWidget('cesiumContainer',{
            baseLayer: false,

        });
     //let iprov =Cesium.IonImageryProvider.fromAssetId(3954);
    const mapbox = new Cesium.MapboxImageryProvider({
            mapId: 'mapbox.satellite',
            accessToken: 'pk.eyJ1IjoicXVlc2FsaWQiLCJhIjoiY20zZnFhaGQ3MHBmbzJsczhuZm1sN3UybiJ9.0ksNwSVSwTQlu6dqUS9bIw'
        });
     viewer.imageryLayers.addImageryProvider(mapbox);
     
     //const buildingsTileset = await Cesium.createOsmBuildingsAsync();
     //viewer.scene.primitives.add(buildingsTileset);
  });

  $: if(section && viewer && section.closestPoint){
        console.log("SECTION ----------------------->>>>>>>",section)
        flyTo(section.closestPoint[0], section.closestPoint[1], section.closestPoint[2])
  }

  const flyTo = async (lat:number, lon:number, alt:number) => {
	viewer.camera.flyTo({
	  destination: Cesium.Cartesian3.fromDegrees(lat, lon, alt)
	});
    //const buildingsTileset = await Cesium.createOsmBuildingsAsync();
    //viewer.scene.primitives.add(buildingsTileset);
  }

</script>

<div id="cesiumContainer"></div>