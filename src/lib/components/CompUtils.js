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

};



export const showHideLoader = (loaderid, pageid, show, relative = false, dragelem = '', offset = {top:0,left:0}) => {
	const loader= document.getElementById(loaderid)
	const wManager = document.getElementById(pageid)
	
	// MOVE LOADER RESPECT TO WINDOW
	if (loader) {
		if (wManager) {
			let rect = wManager.getBoundingClientRect();
			switch (relative) {
				case true:
					let dragzone = document.getElementById(dragelem)
					let droprect = null
					if(dragzone)
						droprect = dragzone.getBoundingClientRect();
					let top = droprect && droprect.top ? rect.top - droprect.top : rect.top
					let left = droprect && droprect.x ? rect.left - droprect.left : rect.left
					top += offset.top ? offset.top : 0
					left+=offset.left?offset.left:0
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