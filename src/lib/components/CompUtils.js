/**
	* Drag element
	* @param { any } element
	* @param { any } dragzone
*/
export const dragElement = (element, dragzone) => {
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;

	const dragMouseUp = () => {
		document.onmouseup = null;
		document.onmousemove = null;

		element.classList.remove("drag");
	};

	const dragMouseMove = (event) => {
		//event.preventDefault();
		event.stopPropagation();

		pos1 = pos3 - event.clientX;
		pos3 = event.clientX;


		pos2 = pos4 - event.clientY;
		pos4 = event.clientY;


		element.style.top = `${element.offsetTop - pos2}px`;
		element.style.left = `${element.offsetLeft - pos1}px`;
	};

	const dragMouseDown = (event) => {
		//event.preventDefault();
		event.stopPropagation();

		pos3 = event.clientX;
		pos4 = event.clientY;

		element.classList.add("drag");

		document.onmouseup = dragMouseUp;
		document.onmousemove = dragMouseMove;
	};

	dragzone.onmousedown = dragMouseDown;

	const getPosition = () => {
		return { x: element.style.left, y: element.style.top };
    }
};

export const showHideLoader = (loaderid, pageid, show, relative=null) => {
	const loader= document.getElementById(loaderid)
	const wManager = document.getElementById(pageid)
	
	// MOVE LOADER RESPECT TO WINDOW
	if (loader) {
		if (wManager) { 
		let rect = wManager.getBoundingClientRect();
		if (!relative) {
			loader.style.top = (rect.top - 12) + 'px'
			loader.style.left = (rect.left - 12) + 'px'
		} else {
			/*loader.style.top = (rect.top - 12) + 'px'
			loader.style.left = (rect.left - 12) + 'px'*/
			}
		}
		if (show)
			loader.style.display = "flex"
		else
			loader.style.display = "none"
	}
}