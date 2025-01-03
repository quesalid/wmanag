// for visualizaione https://vega.github.io/vega-lite/
// https://deck.gl/
// https://observablehq.com/documentation/

import L from 'leaflet';

type Coords = [number, number, number?]; // [lat, long, alt]

function getPopUp(section: Section) {
    const div = document.createElement('div');
    const twinbutton = section.twin?`<input id="button-${section.name}" style="margin-right:2px;cursor:pointer;margin-top: 8px;border:1px solid #555; border-radius: 3px; background-color:#777; color:#fff" type="button" value="Twin">`:'';
    const d3button = section.d3 ? `<input id="button-d3-${section.name}" style="margin-right:2px;cursor:pointer;margin-top: 8px;border:1px solid #555; border-radius: 3px; background-color:#777; color:#fff" type="button" value="3D">` : '';
    div.innerHTML = `<div style="display:block;font-weight:bold"><h3>${section.name}</h3>
                        <div style="font-weight:normal">${section.description}</div>
                        <div style="font-weight:normal">Coordinates:
                        <ul style="padding-left:10px;">
                        <li>Latitude: ${section.closestPoint[0]}</li>
                        <li>Longitude: ${section.closestPoint[1]}</li>
                        <li>Altitude: ${section.closestPoint[2]} m.s.l.m.</li>
                        </ul>
                        </div>`+ twinbutton + d3button
                        +`</div>`;

    const popupElement:any = div.firstChild;
    // get the button
    const buttonTwin = popupElement?.querySelector(`#button-${section.name}`);
    // add the event listener
    if(buttonTwin)
        buttonTwin.addEventListener('click', () => { section.popupClickTwin(section) });
    const buttonD3 = popupElement?.querySelector(`#button-d3-${section.name}`);
    if (buttonD3)
        buttonD3.addEventListener('click', () => { section.popupClickD3(section) });
    return div;
}
export class Section {
    name: string;
    description: string;
    coords: Coords[];
    zoom: number;
    closestPoint: Coords;
    type: string; // "LineString" or "Polygon"
    drawsection: any;
    style: any;
    properties: any;
    twinwin: any;
    d3win:any
    image = '';
    twin: any;
    d3: any;
    
    constructor(opts: any) {
        this.name = opts && opts.name ? opts.name : "Default";
        this.description = opts && opts.description ? opts.description : "Default description";
        this.coords = opts && opts.coords ? opts.coords : [[12, 42]];
        this.zoom = opts && opts.zoom ? opts.zoom : 10;
        this.type = opts && opts.type ? opts.type : "LineString";
        this.properties = opts && opts.properties ? opts.properties : {};
        this.twinwin = opts && opts.twinwin ? opts.twinwin : 'defaultTwinManager';
        this.d3win = opts && opts.d3win ? opts.d3win : 'defaultD3Manager';
        this.image = opts && opts.image ? opts.image : '';
        this.twin = opts && opts.twin ? opts.twin : null;
        this.d3 = opts && opts.d3 ? opts.d3 : null;
        this.style = opts && opts.style ? opts.style : {
            color:  '#0000ff',
            weight:  3,
            opacity: 1.0,
            radius: 0,
        }
        // find the closest point to the baricenter
        let minLat = 90;
        let maxLat = -90;
        let minLong = 180;
        let maxLong = -180;
        this.coords.forEach((coord) => {
            if (coord[0] < minLat) minLat = coord[0];
            if (coord[0] > maxLat) maxLat = coord[0];
            if (coord[1] < minLong) minLong = coord[1];
            if (coord[1] > maxLong) maxLong = coord[1];
        });
        const baricenter = [(minLat + maxLat) / 2, (minLong + maxLong) / 2];
        // find the closest point to the baricenter
        let minDist = 1000000;
        let closestPoint = this.coords[0];
        this.coords.forEach((coord) => {
            const dist = Math.sqrt((coord[0] - baricenter[0]) ** 2 + (coord[1] - baricenter[1]) ** 2);
            if (dist < minDist) {
                minDist = dist;
                closestPoint = coord;
            }
        });
        this.closestPoint = closestPoint;
    }

    flyto(map: any) {
        // fly to the closest point - invert the coordinates
        const coords = [this.closestPoint[1], this.closestPoint[0]];
        
        map.flyTo(coords,this.zoom);
    }
    getCenter() {
        return this.closestPoint;
    }
    getBounds() {
        let minLat = 90;
        let maxLat = -90;
        let minLong = 180;
        let maxLong = -180;
        this.coords.forEach((coord) => {
            if (coord[0] < minLat) minLat = coord[0];
            if (coord[0] > maxLat) maxLat = coord[0];
            if (coord[1] < minLong) minLong = coord[1];
            if (coord[1] > maxLong) maxLong = coord[1];
        });
        return [[minLat, minLong], [maxLat, maxLong]];
    }

    getGeoJSON() {
        const geojson: any = {}
        geojson.type = "Feature";
        geojson.geometry = { type: this.type, coordinates: this.coords };
        geojson.properties = {name: this.name, description: this.description};
        for (let key in this.properties) { 
            geojson.properties[key] = this.properties[key];  
        }
        return geojson;
    }

    drawSection(map: any, opt: any) {
        let myStyle = {
            color: opt && opt.color ? opt.color : 'red',
            weight: opt && opt.weight ? opt.weight : 3,
            opacity: opt && opt.opacity ? opt.opacity : 0.5,
            radius:0
        }
        let mySection:any = this.getGeoJSON();
        mySection.properties.style = myStyle;
        // se è presente la proprietà radius disegna un cerchio altrimenti type
        let section: any;
        if (mySection.properties.radius) {
            myStyle.radius = mySection.properties.radius;
            const coords:any =[ mySection.geometry.coordinates[0][1], mySection.geometry.coordinates[0][0]];
            section = new L.Circle(coords, myStyle)
            /**  POPOUP BUILD */
            const popup = getPopUp(this);
            // from innerHtml to DOM element
            const div = document.createElement('div');
            // add the popup
            div.appendChild(popup);
            section.bindPopup(popup);
            /**  END POPOUP BUILD */

            section.addTo(map);
        } else {
            section = L.geoJSON(mySection, {style: myStyle}).addTo(map);
        }
        this.drawsection = section;
        return section;
    }

    removeSection(map: any) {
        map.removeLayer(this.drawsection);
    }

    updateSection(coordinates: any) {
        this.coords = coordinates;
        this.drawsection.setLatLngs(coordinates);
        // update the closest point
        let minLat = 90;
        let maxLat = -90;
        let minLong = 180;
        let maxLong = -180;
        this.coords.forEach((coord) => {
            if (coord[0] < minLat) minLat = coord[0];
            if (coord[0] > maxLat) maxLat = coord[0];
            if (coord[1] < minLong) minLong = coord[1];
            if (coord[1] > maxLong) maxLong = coord[1];
        });
        const baricenter = [(minLat + maxLat) / 2, (minLong + maxLong) / 2];
        // find the closest point to the baricenter
        let minDist = 1000000;
        let closestPoint = this.coords[0];
        this.coords.forEach((coord) => {
            const dist = Math.sqrt((coord[0] - baricenter[0]) ** 2 + (coord[1] - baricenter[1]) ** 2);
            if (dist < minDist) {
                minDist = dist;
                closestPoint = coord;
            }
        });
        this.closestPoint = closestPoint;
    }

    setStyle(map: any,style:any) {
        map.eachLayer((layer: any) => {
            if (layer.feature && layer.feature.properties && layer.feature.properties.name === this.name) {
                layer.setStyle(style);
            }
        })
    }

    toggleStyle(map: any, style: any) {
        map.eachLayer((layer: any) => {
            if (layer.feature && layer.feature.properties) {
                if (layer.feature.properties.name === this.name) {
                    layer.setStyle(style);
                } else {
                    layer.setStyle(this.style);
                }
            } else {
                if (layer._mRadius) {
                    const coords = [layer.getLatLng().lng, layer.getLatLng().lat];
                    if (coords[0] === this.closestPoint[0] && coords[1] === this.closestPoint[1]) {
                        layer.setStyle(style);
                    }
                    else {
                        layer.setStyle(this.style);
                    }
                }
            }
        })
    }

    popupClickTwin(section:any) {
        // on popup click send event to the twinwin
        const twin = document.getElementById(section.twinwin)
        if (twin) {
            twin.dispatchEvent(new CustomEvent('show', { detail: section }))
        }
        const d3 = document.getElementById(section.d3win)
        if (d3) {
            d3.dispatchEvent(new CustomEvent('hide', { detail: null }))
        }
    }

    popupClickD3(section: any) {
        // on popup click send event to the twinwin
        const twin = document.getElementById(section.twinwin)
        if (twin) {
            twin.dispatchEvent(new CustomEvent('hide', { detail: null }))
        }
        const d3 = document.getElementById(section.d3win)
        if (d3) {
            d3.dispatchEvent(new CustomEvent('show', { detail: section }))
        }
    }
    
}