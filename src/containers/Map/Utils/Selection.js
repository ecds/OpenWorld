export function highlightGeoJSON(layer) {
   if (!layer) return;

   try {
       layer.setStyle({
           weight: 6,
           dashArray: '1'
       });
   } catch(e) {
       console.log('meh')
   }
}

export function dehighlightGeoJSON(data, layer, selected=null) {
    if (selected && selected._leaflet_id === layer._leaflet_id)
        return;

    layer.setStyle({
        weight: 4,
        dashArray: '20 20'
    });
}

export function selectGeoJSON(data, layer, map, curr) {
    if (curr && curr._leaflet_id !== layer._leaflet_id) {
        dehighlightGeoJSON(data, curr, null);
        curr.bringToBack();
    }

    // map.fitBounds(layer.getBounds());
    layer.setStyle({
        weight: 5,
    });

    layer.bringToFront();

    return layer;
}
