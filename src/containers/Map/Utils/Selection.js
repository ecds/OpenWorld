export function highlightGeoJSON(layer) {
    //console.log(layer);

    layer.setStyle({
        weight: 4
    });
}

export function dehighlightGeoJSON(data, layer, selected) {
    if (selected && selected._leaflet_id === layer._leaflet_id) 
        return;

    layer.setStyle({
        weight: 2
    });
}

export function selectGeoJSON(data, layer, map, curr) {
    if (curr && curr._leaflet_id !== layer._leaflet_id) {
        dehighlightGeoJSON(data, curr, null);
        curr.bringToBack();
    }
    
    map.fitBounds(layer.getBounds());
    layer.setStyle({
        weight: 5,
    });

    layer.bringToFront();

    return layer;
}
