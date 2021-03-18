const CLEAR = document.querySelector('#clear');
const CONTAINER = document.querySelector('#sketch-container');
const RADIO_RGB = document.querySelector('#rgb');
const COLUMN_SLIDER = document.querySelector('#column-number');
const TEXT_INPUT = document.querySelector('#text-input-slider');
let useRGB = false;

function createSketchGrid(columnNumber) {
    let gridNode;
    // To Do: get grdelements to resize responsively
    //let mousePressed = false; // use for mousedown solution
    CONTAINER.setAttribute('style','display:grid; grid-template: repeat(' + columnNumber+ ', 1fr) / repeat('
            + columnNumber+ ', 1fr)');
    for (i = 1; i <= columnNumber * columnNumber; i++) {
        gridNode = document.createElement('div');
        gridNode.classList.add('sketch-container__div');
        //if (i % columnNumber === 1) gridNode.style.clear = 'left';
        /* use for mousedown solution
        gridNode.addEventListener('mousedown', function() {
            mousePressed = true;
        });
        gridNode.addEventListener('mouseup', function() {
            mousePressed = false;
        }); */
        gridNode.addEventListener('mouseleave', function() {
            //if (mousePressed) {
                if(!useRGB) {
                    this.classList.add('sketch-container__div--hovered');
                } else {
                    if (this.style.backgroundColor === '') {
                        this.style.backgroundColor = setRandomRGBColor()
                    } else {
                        this.style.filter = decreaseBrightness(this.style.filter);
                    }
                }
            //}
        });
        CONTAINER.appendChild(gridNode);
    }
}
/*
function getNewgridSize(message, messageInvalid) {
    let columnNumber = +prompt(message);
    if (columnNumber === null) {
        return 50;
    } else if (!(typeof columnNumber === 'number' &&  0 < columnNumber  && columnNumber <= 100)) {
        return getNewgridSize(messageInvalid, messageInvalid);
    } else {
        return columnNumber;
    }
}
*/

function setRandomRGBColor() {
    return 'rgb(' + getRandomRGBValue() + ',' + getRandomRGBValue() + ',' + getRandomRGBValue();
}

function getRandomRGBValue() {
    let randomValue = Math.floor(Math.random() * 266);
    return randomValue;
}

function decreaseBrightness(elStyle) {
    if (elStyle === '') {
        return 'brightness(90%)';
    } else {
        let brightness = +elStyle.substring(elStyle.indexOf('(') + 1, elStyle.indexOf('%')) - 10;
        return 'brightness(' + brightness + '%)';
    }
};

CLEAR.addEventListener('click', function() {
    CONTAINER.innerHTML = '';
    let columnNumber = COLUMN_SLIDER.value;
    createSketchGrid(columnNumber);
});

RADIO_RGB.addEventListener('change', function() {
    useRGB = this.checked;
});

COLUMN_SLIDER.addEventListener('change',function() {
    TEXT_INPUT.value = this.value;
});

TEXT_INPUT.addEventListener('change',function() {
    COLUMN_SLIDER.value = this.value;
});

createSketchGrid(50);