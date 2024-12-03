/**
	* Drag element
	* @param { any } element
	* @param { any } dragzone
*/
export const dragElement = (element:any, dragzone:any) => {
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	let initialZIndex = element.style.zIndex;

	const dragMouseUp = () => {
		document.onmouseup = null;
		document.onmousemove = null;

		element.classList.remove("drag");

		// stop dragging the element: set it back to normal
		element.style.zIndex = initialZIndex;
	};

	const dragMouseMove = (event:any) => {
		//event.preventDefault();
		event.stopPropagation();

		pos1 = pos3 - event.clientX;
		pos3 = event.clientX;


		pos2 = pos4 - event.clientY;
		pos4 = event.clientY;

		// maintain the element within the dragzone
		if (element.offsetTop - pos2 < dragzone.offsetTop) {
			pos2 = 0;
		}
		if (element.offsetLeft - pos1 < dragzone.offsetLeft) {
			pos1 = 0;
		}
		if (element.offsetTop - pos2 > window.innerHeight - element.offsetHeight) {
			pos2 = 0;
		}
		if (element.offsetLeft - pos1 > window.innerWidth - element.offsetWidth) {
			pos1 = 0;
		}
		element.style.top = `${element.offsetTop - pos2}px`;
		element.style.left = `${element.offsetLeft - pos1}px`;
	};

	const dragMouseDown = (event:any) => {
		//event.preventDefault();
		event.stopPropagation();

		pos3 = event.clientX;
		pos4 = event.clientY;

		element.classList.add("drag");

		// start dragging the element: put it on top
		element.style.zIndex = 1000;

		document.onmouseup = dragMouseUp;
		document.onmousemove = dragMouseMove;

	};

	dragzone.onmousedown = dragMouseDown;

};



export const showHideLoader = (loaderid:any, pageid:any, show:any, relative = false, dragelem = '', offset = { top: 0, left: 0 }) => {
	const loader = document.getElementById(loaderid)
	const wManager = document.getElementById(pageid)

	// MOVE LOADER RESPECT TO WINDOW
	if (loader) {
		if (wManager) {
			let rect = wManager.getBoundingClientRect();
			switch (relative) {
				case true:
					let dragzone = document.getElementById(dragelem)
					let droprect = null
					if (dragzone)
						droprect = dragzone.getBoundingClientRect();
					let top = droprect && droprect.top ? rect.top - droprect.top : rect.top
					let left = droprect && droprect.x ? rect.left - droprect.left : rect.left
					top += offset.top ? offset.top : 0
					left += offset.left ? offset.left : 0
					loader.style.top = (top - 12) + 'px'
					loader.style.left = (left - 12) + 'px'
					break
				case false:
					loader.style.top = (rect.top - 12) + 'px'
					loader.style.left = (rect.left - 12) + 'px'
					break
			}
			if (show)
				loader.style.display = "flex"
			else
				loader.style.display = "none"
		}
	}
}