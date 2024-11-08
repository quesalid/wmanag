import L from 'leaflet';

type Coords = [number, number, number?]; // [lat, long, alt]
export class Section {
    name: string;
    description: string;
    coords: Coords[];
    zoom: number;
    closestPoint: Coords;
    type: string; // "LineString" or "Polygon"
    drawsection: any;
    style: any;
    
    constructor(opts: any) {
        this.name = opts && opts.name ? opts.name : "Default";
        this.description = opts && opts.description ? opts.description : "Default description";
        this.coords = opts && opts.coords ? opts.coords : [[12, 42]];
        this.zoom = opts && opts.zoom ? opts.zoom : 10;
        this.type = opts && opts.type ? opts.type : "LineString";
        this.style = opts && opts.style ? opts.style : {
            color:  '#0000ff',
            weight:  3,
            opacity: 1.0
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
        const coords = this.closestPoint.slice().reverse();
        
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
        return {
            type: "Feature",
            properties: {
                name: this.name,
                description: this.description
            },
            geometry: {
                type: this.type,
                coordinates: this.coords
            }
        };
    }

    drawSection(map: any, opt: any) {
        let myStyle = {
            color: opt && opt.color ? opt.color : 'red',
            weight: opt && opt.weight ? opt.weight : 3,
            opacity: opt && opt.opacity ? opt.opacity : 0.5
        }
        let mySection:any = this.getGeoJSON();
        mySection.properties.style = myStyle;
        const section: any = L.geoJSON(mySection).addTo(map);
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
                    console.log("N A M E", layer.feature.properties.name)
                    layer.setStyle(this.style);
                }
            }
        })
    }
    
}