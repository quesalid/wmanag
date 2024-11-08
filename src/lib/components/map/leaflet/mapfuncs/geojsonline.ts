import  L  from 'leaflet';

const drawLine = (coordinates: any, map: any, opt: any) => {
    
    let myStyle = {
        color: opt && opt.color ? opt.color : 'red',
        weight: opt && opt.weight ? opt.weight : 3,
        opacity: opt && opt.opacity ? opt.opacity : 0.5
    }
    let myLines:any = {
        "type": "Feature",
            "properties": {
            "name": opt && opt.props && opt.props.name ? opt.props.name: 'Line',
            "popupContent": opt && opt.props && opt.props.popupContent ? opt.props.popupContent : null,
            "style":myStyle
        },
        "geometry": {
         "type": "LineString",
         "coordinates": coordinates
        }
    }
    
    console.log("myLines", myLines)
    const line: any = L.geoJSON(myLines).addTo(map);
    console.log("myLines line", line)
    return line;
}

const drawLines = (coordinates: any, map: any, opt: any) => {
    

}

const removeLine = (line: any, map: any) => {
    map.removeLayer(line);
}

const getCoords = (line: any) => {
    return line.getLatLngs();
}

const updateLine = (line: any, coordinates: any) => {
    line.setLatLngs(coordinates);
}



export {
    drawLine,
    removeLine,
    updateLine,
    getCoords
};