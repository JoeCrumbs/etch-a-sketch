(function() {

    function createSketchGrid(columnNumber) {
        let gridNode;
        let gridNodeCounter = 1;
        let formerElementCounter = null;
        CONTAINER.setAttribute('style','display:grid; grid-template: repeat(' + columnNumber+ ', 1fr) / repeat('
                + columnNumber+ ', 1fr)');
        for (i = 1; i <= columnNumber * columnNumber; i++) {
            gridNode = document.createElement('div');
            gridNode.classList.add('sketch-container__div');
            gridNode.dataset.counter = (gridNodeCounter++).toString();

            //use draw functions on touch / hover with mousedown
            gridNode.addEventListener('mouseleave', function() {
                formerElementCounter = setupDrawListener(this, mousePressed, formerElementCounter, false);
            });
            gridNode.addEventListener('touchmove', function(touch) {
                touch.preventDefault();
                el = document.elementFromPoint(touch.touches[0].clientX, touch.touches[0].clientY);
                formerElementCounter = setupDrawListener(el, mousePressed, formerElementCounter, true)
            });
            CONTAINER.appendChild(gridNode);
        }
    }

    function setupDrawListener(el,mousePressed, formerElementCounter, isMobile) {
        // check if element is in drawing grid
        if (el && el.dataset && el.dataset.counter && (mousePressed || isMobile)) {
            curElementCounter = el.dataset.counter;
        } else return null;
        if (curElementCounter !== formerElementCounter) { //only draw when moving to new grid (important for touch)
            // Erase when eraser is toggled
            if(changeListeners.eraser) {
                el.style.backgroundColor= '';
                el.style.filter = '';
                return curElementCounter;
            }
            //use random color if rgb is toggled
            //colors will bw overwritten as long as shading is not used
            if(!changeListeners.rgb) {
                el.style.backgroundColor= COLORPICKER.value;
            } else if (!changeListeners.shade || (changeListeners.shade && el.style.backgroundColor === '')) {
                el.style.backgroundColor = setRandomRGBColor() ;
            }
            // use shade if shade is toggled
            if (changeListeners.shade) {
                el.style.filter = decreaseBrightness(el.style);
            }
        }
        return curElementCounter;
    }

    function setRandomRGBColor() {
        return 'rgb(' + getRandomRGBValue() + ',' + getRandomRGBValue() + ',' + getRandomRGBValue();
    }

    function getRandomRGBValue() {
        let randomValue = Math.floor(Math.random() * 266);
        return randomValue;
    }

    function decreaseBrightness(elStyle) {
        if (elStyle.filter === '' && elStyle.backgroundColor === '') {
            return 'brightness(100%)';
        } else if (elStyle.filter === '') {
            return 'brightness(90%)';
        } else {
            let brightness = +elStyle.filter.substring(elStyle.filter.indexOf('(') + 1, elStyle.filter.indexOf('%')) - 10;
            return 'brightness(' + brightness + '%)';
        }
    };


    //setup all EventListeners
    const CLEAR = document.querySelector('#clear');
    const CONTAINER = document.querySelector('#sketch-container');
    const COLUMN_SLIDER = document.querySelector('#column-number');
    const GRID_TEXT = document.querySelector('#gridsize');
    const COLORPICKER = document.querySelector('#colorpicker');
    const HTML = document.querySelector('html');
    const TOGGLERS = document.querySelectorAll('input[type=checkbox]');
    let mousePressed = false;

    //setum EventListeners for Toggle Settings
    let changeListeners = {};
    TOGGLERS.forEach(function(toggler) {
        changeListeners[toggler.id] = false;
        toggler.addEventListener('change', function() {
            changeListeners[toggler.id] = this.checked;
        });
    });

    //setup EventListeners for mousedown solution
    HTML.addEventListener('mousedown', function() {
        mousePressed = true;
    });
    HTML.addEventListener('mouseup', function() {
        mousePressed = false;
    });

    CLEAR.addEventListener('click', function() {
        CONTAINER.innerHTML = '';
        let columnNumber = COLUMN_SLIDER.value;
        createSketchGrid(columnNumber);
    });

    COLUMN_SLIDER.addEventListener('change',function() {
        GRID_TEXT.textContent = this.value + ' x ' + this.value;
    });

    createSketchGrid(50);
})();