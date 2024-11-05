import * as turf from '@turf/turf';
import L from 'leaflet';

const parameters:any = {
    bbox: [12.61800, 41.90838, 12.65048, 41.89052], // Bounding box
    cellsize: 0.035, // Dimensione della cella in km
    windDirection: 45, // Direzione del vento in gradi
    windIntensity: 0.2, // Intensità del vento
    mapid: 'leafletmap', // Id della mappa
    map: null // Mappa Leaflet

}

const initSimulation = (bbox: any, cellsize: any, windDirection: any, windIntensity: any, map: any,mapid:any) => {
    parameters.bbox = bbox;
    parameters.cellsize = cellsize;
    parameters.windDirection = windDirection;
    parameters.windIntensity = windIntensity;
    parameters.map = map;
    parameters.mapid = mapid;
    console.log("INIT SIMULATION",parameters)
}

const setWindDirection = (direction: any) => {
    parameters.windDirection = direction;
}
const setWindIntensity = (intensity: any) => {
    parameters.windIntensity = intensity;
}
const getBurnProbability = () => {
    // this must be replaced with a real value
    return Math.random() * 0.5 + 0.2;
}

const  createGrid = () => {
    const grid = turf.squareGrid(parameters.bbox, parameters.cellsize, { units: 'kilometers' });
    grid.features.forEach(cell => {
        cell.properties = {
            state: 'vegetation',
            burnProbability: getBurnProbability() // this must be replaced with a real value
        };
    });
    return grid.features;
}


function drawGrid(cells:any) {
    let index = 0;
    function drawNextBatch() {
        const batchSize = 50; // Disegna 50 celle per volta
        for (let i = 0; i < batchSize && index < cells.length; i++, index++) {
            const cell = cells[index];
            const color = cell.properties.state === 'burning' ? 'red' :
                cell.properties.state === 'burned' ? 'black' : 'green';

            const polygon = L.polygon(cell.geometry.coordinates[0].map((coord:any) => [coord[1], coord[0]]), {
                color: color,
                weight: 0.5,
                fillOpacity: 0.3,
                opacity: 0.1
            }).addTo(parameters.map);

            cell.polygon = polygon; // Salva il poligono per aggiornamenti futuri

            // Aggiungi evento click per avviare l'incendio
            polygon.on('click', () => {
                if (cell.properties.state === 'vegetation') {
                    cell.properties.state = 'burning'; // Imposta la cella in fiamme
                    // manda evento di start fire
                    console.log("START FIRE",parameters.mapid)
                    const mapdiv = document.getElementById(parameters.mapid);
                    const startFire = new CustomEvent("startfire", { detail: parameters.mapid })
                    mapdiv?.dispatchEvent(startFire)
                }
            });
        }

        if (index < cells.length) {
            requestAnimationFrame(drawNextBatch); // Continua al prossimo frame
        }
    }

    drawNextBatch(); // Inizia il processo
}


const propagateFire = (cells:any) => {
    const burningCells = cells.filter((cell:any) => cell.properties.state === 'burning');

    burningCells.forEach((cell:any) => {
        const cellCentroid = turf.centroid(cell); // Centroid della cella in fiamme

        // Trova i vicini entro la distanza diagonale
        const neighbors = cells.filter((otherCell:any) => {
            if (otherCell === cell) return false; // Escludi la stessa cella

            const otherCellCentroid = turf.centroid(otherCell); // Centroid dei vicini
            const distance = turf.distance(cellCentroid, otherCellCentroid, { units: 'kilometers' });

            return distance <= 1.5 * parameters.cellsize; // Considera anche le celle diagonali
        });

        // Propaga il fuoco ai vicini
        neighbors.forEach((neighbor: any) => {
            const burnProbability = getPropagationProbability(neighbor.properties.burnProbability, cell, neighbor);

            if (neighbor.properties.state === 'vegetation' &&
                Math.random() < burnProbability) {
                neighbor.properties.state = 'burning';
            }
        });

        // Cambia lo stato della cella attuale a "burned"
        cell.properties.state = 'burned';
    });
}

const resetSimulation = (cells:any) => {
    cells.forEach((cell:any) => {
        cell.properties.state = 'vegetation'; // Ripristina tutte le celle a "vegetation"
    });

    // Rimuovi i poligoni dalla mappa per resettare la visualizzazione
    cells.forEach((cell:any) => {
        if (cell.polygon) {
            parameters.map.removeLayer(cell.polygon);
            cell.polygon = null;
        }
    });

    drawGrid(cells); // Ridisegna la griglia con celle ripristinate
}

const  updateGrid = (cells:any) => {
    cells.forEach((cell:any) => {
        if (cell.properties.state === 'burning') {
            cell.polygon.setStyle({ color: 'red',opacity:1.0 });
        } else if (cell.properties.state === 'burned') {
            cell.polygon.setStyle({ color: 'black',opacity:0.1 });
        }
    });
}

const getPropagationProbability = (baseProbability:any, cell:any, neighbor:any) => {
    const cellCentroid = turf.centroid(cell);
    const neighborCentroid = turf.centroid(neighbor);

    // Calcola la direzione tra cella e vicino
    const angle = turf.bearing(cellCentroid, neighborCentroid);

    // Calcola la differenza tra la direzione del vento e l'angolo verso il vicino
    const angleDifference = Math.abs((angle - parameters.windDirection + 360) % 360);

    // Più piccolo è l'angolo rispetto al vento, più alta è la probabilità di prendere fuoco
    const windEffect = Math.max(0, 1 - (angleDifference / 180)) * parameters.windIntensity;

    return baseProbability + windEffect;
}

export {
    createGrid,
    drawGrid,
    propagateFire,
    updateGrid,
    resetSimulation,
    initSimulation,
    setWindDirection,
    setWindIntensity
}

