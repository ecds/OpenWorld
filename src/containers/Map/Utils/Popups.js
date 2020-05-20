export function populatePopup(data, popup_content) {
    let popupContent = '';
    let popupSrc = popup_content;

    for (let j = 0; j < popupSrc.length; j++) {
        if (popupSrc[j].conditional === true) {
            if (data.properties[popupSrc[j].property] !== popupSrc[j].falsyValue) {
                popupContent += popupSrc[j].content
                                + data.properties[popupSrc[j].property]
                                + popupSrc[j].suffix;
            } 
        } else {
            popupContent += popupSrc[j].content;
        }
    }

    return popupContent;
}