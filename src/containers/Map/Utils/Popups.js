import { OVERLAYS } from '../../../constants';

export function populatePopup(data, ind) {
    let popupContent = '';
    let popupSrc = OVERLAYS[ind].OPTIONS.POPUP_CONTENT;

    for (let j = 0; j < popupSrc.length; j++) {
        if (popupSrc[j].CONDITIONAL === true) {
            if (data.properties[popupSrc[j].PROPERTY] !== undefined) {
                popupContent += popupSrc[j].CONTENT
                                + data.properties[popupSrc[j].PROPERTY]
                                + popupSrc[j].SUFFIX;
            } 
        } else {
            popupContent += popupSrc[j].CONTENT;
        }
    }

    return popupContent;
}