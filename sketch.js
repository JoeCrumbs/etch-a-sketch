const CLEAR = document.querySelector('#clear');
const CONTAINER = document.querySelector('#sketch-container');

function createSketchGrid(columnNumber) {
    let gridNode;
    // To Do: get grdelements to resize responsively
    let gridElementSize = (100 / columnNumber).toString() + '%';
    //let mousePressed = false; // use for mousedown solution
    for (i = 1; i <= columnNumber * columnNumber; i++) {
        gridNode = document.createElement('div');
        gridNode.classList.add('sketch-container__div');
        gridNode.style.width = gridElementSize;
        gridNode.style.height = gridElementSize;
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
                this.classList.add('sketch-container__div--hovered');
            //}
        });
        CONTAINER.appendChild(gridNode);
    }
}

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

CLEAR.addEventListener('click', function() {
    CONTAINER.innerHTML = '';
    let columnNumber = getNewgridSize('New Gridsize in px (number between 1 and 100)', 'Invalid input! Try Again');
    createSketchGrid(columnNumber);
});

createSketchGrid(50);