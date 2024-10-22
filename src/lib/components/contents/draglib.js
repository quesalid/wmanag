// https://javascript.info/mouse-drag-and-drop
const DnD = (element,parent) => {
    element.onmousedown = function (event) {
        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;
        // disable default browser drag and drop actions
        element.ondragstart = function () {
            return false;
        };
        // (1) prepare to moving: make absolute and on top by z-index
        element.style.position = 'absolute';
        element.style.zIndex = 1000;

        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(element);

        // centers the element at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
            // calculate widht/height of the element to smooth the movement
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }

        // move our absolutely positioned element under the pointer
        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // (2) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // (3) drop the element, remove unneeded handlers
        element.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        };
    }
}

const RemoveDnD = (element) => {
    element.onmousedown = null;
    element.ondragstart = null;
    // remove the element from the document
    element.remove();
}


const DragLib = {
    DnD,
    RemoveDnD
}

export default DragLib