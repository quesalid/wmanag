
<script lang='ts'>
// MAPTILER KEY gH88mRCqCEYrX8xwbYGo
// MAPTILER URL https://api.maptiler.com/maps/topo/style.json?key=gH88mRCqCEYrX8xwbYGo
// https://api.maptiler.com/tiles/terrain-quantized-mesh-v2/tiles.json?key=gH88mRCqCEYrX8xwbYGo

import { onMount, onDestroy,afterUpdate } from 'svelte';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import AssetPanel from './AssetPanel.svelte'
import AssetChart from '../asset/AssetChart.svelte'

export let terrain = true
export let buildings = false
export let addModels = true
export let roads = false
export let water = false
//export let objectUrl = 'https://maplibre.org/maplibre-gl-js/docs/assets/34M_17/34M_17.gltf'
export let objectUrl = 'OHMS_3D.gltf'
export let showPanel = true
export let assets:any = [
]
export let sceneOrigin:any = [13.471033574202934,  45.85175337043916]
export let containerClass = 'map-container-maplibre'

let map:any;
const apiKey = 'gH88mRCqCEYrX8xwbYGo'; // Sostituisci con la tua chiave API
const terrainSourceId = 'maptiler-terrain';
let mapcontainer:any
let modelLoaded:any
let mapcontainerName = 'map-3d-maplibre'
let flyAsset:any = null


  onMount(async () => {
    modelLoaded = await loadModel(objectUrl);
    const mapcont:any = document.querySelector('.'+containerClass);
     console.log("MAP CONTAINER",mapcont,containerClass)
    if(mapcont && !map){
        await addmap()
    }
    // add event listner to containerClass to fly to asset
    mapcont?.addEventListener('flyToAsset', (e:any) => {
		console.log('flyToAsset', e.detail)
		assets = e.detail.assets?e.detail.assets:[]
        console.log("RECEIVED ASSETS",assets)
        flyAsset = e.detail.asset
		if(flyAsset){
            // udate elevation
            assets = [...assets]
			map.flyTo({
				center: flyAsset.modelLocation,
				zoom: 15.9,
				speed: 0.8,
				curve: 1,
				easing(t:any) {
					return t;
				}
			});
		}
	});
    // force re-rendering
    assets = [...assets]
   
  });

  afterUpdate(() => {
        // Aggiorna il layer ogni volta che `assets` cambia
        if (map && modelLayer.updateLayer) {
            modelLayer.updateLayer(map);
        }
    });

  const addmap = async () => {
	 if(!map){
        map =  new maplibregl.Map({
          container: mapcontainerName, // ID del contenitore
          style: `https://api.maptiler.com/maps/outdoor/style.json?key=${apiKey}`,
          //style: `https://api.maptiler.com/maps/basic-v2/style.json??key=${apiKey}`,
          //style: `https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`,
          center: [13.471033574202934,  45.85175337043916], // Centro della mappa (long, lat)
          zoom: 15,
          pitch: 60,
          pitchWithRotate: true,
        });

        map.addControl(
            new maplibregl.NavigationControl({
                visualizePitch: true,
                showZoom: true,
                showCompass: true,
            })
        );

        // Aggiungi il supporto per il terreno
        map.on('load', async () => {
          console.log("MAP LOAD")
          if(terrain){
              // check if source already exists
              if (map.getSource(terrainSourceId)) {
			    return;
		      }
              await map.addSource(terrainSourceId, {
                type: 'raster-dem',
                url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${apiKey}`,
                tileSize: 256,
                maxzoom: 15.9, // Zoom massimo supportato dal DEM
                exaggeration: 3,
              });
               console.log("MAP SET TERRAIN")
              // Configura il layer per il terreno
              map.setTerrain({ source: terrainSourceId, exaggeration: 1.5 });

              // Aggiungi un effetto di ombreggiatura (opzionale)
              // check if layer already exists
              if (!map.getLayer('hillshade')) {
                  map.addLayer({
                    id: 'hillshade',
                    type: 'hillshade',
                    source: terrainSourceId,
                    layout: {},
                    paint: {
                      'hillshade-exaggeration': 2,
                    },
                  });
              }
              if(addModels){
                  console.log("MODEL LOADING.....")
                  // Load the model
                  //modelLoaded = await loadModel(objectUrl);
                  for(let i=0;i<assets.length;i++){
				      assets[i].model = modelLoaded.clone();
                      assets[i].model.userData.id = assets[i].userData.id;
                      // se status è ALARM cambia colore ad red
                      if(assets[i].userData.status == 'ALARM'){
						  assets[i].model.traverse((child:any) => {
							  if (child.isMesh) {
								  child.material = new THREE.MeshBasicMaterial({color: 0xff0000});
							  }
						  });
					  }
                      // se status è WARNING cambia colore a orange
					  if(assets[i].userData.status == 'WARNING'){
                          assets[i].model.traverse((child:any) => {
                              if (child.isMesh) {
                                  child.material = new THREE.MeshBasicMaterial({color: 0xffa500});
							  }
                              });
                      }
			      }
                  map.addLayer(modelLayer);
              }
              map.addControl(
                    new maplibregl.TerrainControl({
                        source: 'terrainSource',
                        exaggeration: 1
                    })
                );
          }
          if(buildings){
              // Insert the layer beneath any symbol layer.
              const layers = map.getStyle().layers;
              let labelLayerId;
              for (let i = 0; i < layers.length; i++) {
                  if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                      labelLayerId = layers[i].id;
                      break;
                  }
              }

              map.addSource('openmaptiles', {
                  url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${apiKey}`,
                  type: 'vector',
              });

              map.addLayer(
                  {
                      'id': '3d-buildings',
                      'source': 'openmaptiles',
                      'source-layer': 'building',
                      'type': 'fill-extrusion',
                      'minzoom': 15,
                      'filter': ['!=', ['get', 'hide_3d'], true],
                      'paint': {
                          'fill-extrusion-color': [
                              'interpolate',
                              ['linear'],
                              ['get', 'render_height'], 0, 'lightgray', 200, 'royalblue', 400, 'lightblue'
                          ],
                          'fill-extrusion-height': [
                              'interpolate',
                              ['linear'],
                              ['zoom'],
                              15,
                              0,
                              16,
                              ['get', 'render_height']
                          ],
                          'fill-extrusion-base': ['case',
                              ['>=', ['get', 'zoom'], 16],
                              ['get', 'render_min_height'], 0
                          ]
                      }
                  },
                  labelLayerId
              );

             
          }
        });
     }
     
  }

  onDestroy(() => {
	if (map) {
	  map.remove();
	}
  });

  /** OBJECT LOADING FUNCTIONS */
const calculateDistanceMercatorToMeters =(from:any, to:any) => {
    const mercatorPerMeter = from.meterInMercatorCoordinateUnits();
    // mercator x: 0=west, 1=east
    const dEast = to.x - from.x;
    const dEastMeter = dEast / mercatorPerMeter;
    // mercator y: 0=north, 1=south
    const dNorth = from.y - to.y;
    const dNorthMeter = dNorth / mercatorPerMeter;
    return {dEastMeter, dNorthMeter};
}

const  loadModel = async (url:any) => {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(url);
    const model = gltf.scene;
    // add basic material to model
    model.traverse((child:any) => {
		if (child.isMesh) {
			child.material = new THREE.MeshBasicMaterial({color: 0x777777});
		}
	});
    
    return model;
}

const modelLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',

    currentAssets: [],


    onAdd(map:any, gl:any) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.scene = new THREE.Scene();
        this.scene.rotateX(Math.PI / 2);
        this.scene.scale.multiply(new THREE.Vector3(1, 1, -1));

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(50, 70, -30).normalize();
        this.scene.add(light);

        this.clickableObjects = [];
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });
        this.renderer.autoClear = false;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        map.getCanvas().addEventListener('click', (event:any) => {
            this.onMouseClick(event, map);
        });


        // Carica gli asset iniziali
        this.updateLayer(map);
    },

    updateLayer(map:any) {
        try{
        // Rimuove gli oggetti che non sono più presenti in `assets`
        const assetIds = assets.map((asset:any) => asset.userData.id);
        this.currentAssets = this.currentAssets.filter((existingAsset:any) => {
            if (!assetIds.includes(existingAsset.userData.id)) {
                this.scene.remove(existingAsset);
                this.clickableObjects = this.clickableObjects.filter((obj:any) => obj !== existingAsset);
                return false; // Rimuovi dal layer
            }
            return true; // Mantieni
        });
        // Aggiunge nuovi asset o aggiorna quelli esistenti
        for (let i=0;i< assets.length;i++) {
            let asset = assets[i];
            let existingAsset:any = this.currentAssets.find((a:any) => a.userData.id === asset.userData.id);
            //const model:any = asset;
            const sceneElevation = map.queryTerrainElevation(sceneOrigin) || 0;
            const modelElevation = map.queryTerrainElevation(asset.modelLocation) || 0;
            
            //const modelup = modelElevation - sceneElevation;
            const modelup = (modelElevation - sceneElevation)*3;
            const sceneOriginMercator = maplibregl.MercatorCoordinate.fromLngLat(sceneOrigin);
            const modelMercator = maplibregl.MercatorCoordinate.fromLngLat(asset.modelLocation);
            const { dEastMeter: modeleast, dNorthMeter: modelnorth } = calculateDistanceMercatorToMeters(sceneOriginMercator, modelMercator);

            if (!existingAsset) {
                // Aggiungi nuovo asset
                // se asset nuovo aggiungi il model
                asset.model = asset.model?asset.model:modelLoaded.clone();
                asset.model.userData = asset.userData;
                //if(model.model){
                    // tenere conto della exageration del terreno
                    
                    asset.model.position.set(modeleast, modelup, modelnorth);

                    if(asset.userData.status == 'ALARM'){
						  asset.model.traverse((child:any) => {
							  if (child.isMesh) {
								  child.material = new THREE.MeshBasicMaterial({color: 0xff0000});
							  }
						  });
					  }
                      // se status è WARNING cambia colore a orange
					  if(asset.userData.status == 'WARNING'){
                          asset.model.traverse((child:any) => {
                              if (child.isMesh) {
                                  child.material = new THREE.MeshBasicMaterial({color: 0xffa500});
							  }
                              });
                      }
                      if(asset.userData.status == 'NORMAL'){
                          asset.model.traverse((child:any) => {
                              if (child.isMesh) {
                                child.material = new THREE.MeshBasicMaterial({color: 0x777777});
                              }
                              });
                      }

                    this.scene.add(asset.model);

                    this.clickableObjects.push(asset.model);
                
                    this.currentAssets.push(asset);
                //}
            } else {
                // Aggiorna asset esistente
                existingAsset.model.position.set(modeleast, modelup, modelnorth);
                existingAsset.model.traverse((child:any) => {
                    if (child.isMesh) {
                        child.material.color.set(existingAsset.userData.status === 'ALARM' ? 0xff0000 :
                                                 existingAsset.userData.status === 'WARNING' ? 0xffa500 :
                                                 0x777777);
                    }
                });
            }
        }

        map.triggerRepaint();
        }catch(e){
            console.log("ERROR UPDATING LAYER",e)
        }
    },

    onMouseClick(event:any, map:any) {
        const rect = map.getCanvas().getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.clickableObjects);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            clickedObject.userData.onClick?.();
        }
    },

    render(gl:any, mercatorMatrix:any) {
        const offsetFromCenterElevation = map.queryTerrainElevation(sceneOrigin) || 0;
        const sceneOriginMercator = maplibregl.MercatorCoordinate.fromLngLat(sceneOrigin, offsetFromCenterElevation);

        const sceneTransform = {
            translateX: sceneOriginMercator.x,
            translateY: sceneOriginMercator.y,
            translateZ: sceneOriginMercator.z,
            scale: sceneOriginMercator.meterInMercatorCoordinateUnits()
        };

        const m = new THREE.Matrix4().fromArray(mercatorMatrix);
        const l = new THREE.Matrix4()
            .makeTranslation(sceneTransform.translateX, sceneTransform.translateY, sceneTransform.translateZ)
            .scale(new THREE.Vector3(sceneTransform.scale, -sceneTransform.scale, sceneTransform.scale));

        this.camera.projectionMatrix = m.multiply(l);
        this.camera.updateMatrixWorld();
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        try{
        map.triggerRepaint();
        }catch(e){
			console.log("ERROR RENDERING MAP")
		}
    },

    onRemove(map:any, gl:any) {
        this.renderer.dispose();
        this.scene = null;
        this.currentAssets = [];
    }
};



</script>
<div>
    <div id="map-container" class="{containerClass}">
        <div id="map-3d-maplibre" bind:this={mapcontainer}></div>
        {#if showPanel}
            <AssetPanel bind:asset={flyAsset}/>
        {/if}
    </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

#map-3d-maplibre {
    width: 60vw;
    height: 65vh;
  }
.asset-graph-container{
    margin-top: 30px;
}

</style>