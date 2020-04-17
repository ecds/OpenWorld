import styled from 'styled-components';

export const FontIcon = styled("i")`
	height: 16px;
	width: 16px;
	background-size: 16px 16px;
	position: relative;
	float: left;
	top: 0.3em;
	left: 0;
	color: ${props => props.theme.TEXT};

	~ input[type=checkbox]:checked {
		color: ${props => props.theme.MAIN};
	}
`;

export function addIconToDOM(container, icon, theme) {
    console.log(theme)
    var img = document.createElement("i");
    img.className = icon;
    img.setAttribute('style', `
        height: 16px;
        width: 16px;
        background-size: 16px 16px;
        position: relative;
        float: left;
        top: 0.3em;
        left: 0;
        color: ${theme.TEXT};

        ~ input[type=checkbox]:checked {
            color: ${theme.MAIN};
        }
    `);
    container.appendChild(img);
}