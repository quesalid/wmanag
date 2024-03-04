<script lang='ts'>
import {onMount} from "svelte"


const intdivWidthRation = 0.133333333
const intdivColor = "white"
let eventListener:any 
onMount(async () => {
	//const polar:any = computeIntDivPositions(donut);
	// add div at polar positions
	const donutElement = document.getElementById(donut.id)
	// REMOVE EVENT LISTENER IF EXISTS
	if(eventListener && donutElement)
		donutElement.removeEventListener("donutredraw",eventListener)
	if(donutElement){
		eventListener = donutElement.addEventListener("donutredraw",async (e:any)=>{
			// SET CURRENT DEVICE IN STORE
			redrawDonut(donutElement)
		})
	}
	redrawDonut(donutElement)
})

const redrawDonut = (donutElement:any) => {
	if(donutElement){
		const polar:any = computeIntDivPositions(donut);
		// DELETE ALL CHILDS IF EXISTS
		/*while (donutElement.firstChild) {
			
				donutElement.removeChild(parent.donutElement);
		}*/
		donutElement.textContent = '';
		let i=1
		polar.forEach((el:any)=>{
			const intWidth = parseInt(donut.donutWidth, 10)*intdivWidthRation
			let div = document.createElement("div")
			div.style.display = "flex"
			div.style.justifyContent = "center"
			div.style.alignItems = "center"
			div.style.position = "absolute"
			div.style.width = intWidth +"px"
			div.style.height = intWidth +"px"
			div.style.backgroundColor = el.bgcolor
			div.style.color = el.color
			div.style.left = (el.x1-intWidth/2) + "px"
			div.style.top = (el.y1-intWidth/2) + "px"
			div.style.border = "1px solid #888"
			div.style.borderRadius = "50%"
			// set font size proportional to div size
			div.style.fontSize = intWidth/2+"px"
			div.innerHTML = el.label
			div.addEventListener("mouseover",()=>{
				div.style.cursor = "pointer"
			})
			div.addEventListener("mouseleave",()=>{
				div.style.cursor = "default"
			})
			div.addEventListener("click",(ev:any)=>{
				// EMIT CUSTOM EVENT
				const pageDiv = document.getElementById(el.pageId)
				const donutClicked = new CustomEvent("donutclicked", { detail: el.id})
				if(pageDiv)
					pageDiv?.dispatchEvent(donutClicked)
			})
			donutElement.appendChild(div)
			if(addNumbers){
				const intWidthNum = parseInt(donut.donutWidth, 10)*intdivWidthRation/3
				let divNum = document.createElement("div")
				divNum.style.display = "flex"
				divNum.style.justifyContent = "center"
				divNum.style.alignItems = "center"
				divNum.style.position = "absolute"
				divNum.style.width = intWidthNum +"px"
				divNum.style.height = intWidthNum +"px"
				divNum.style.color = "#333"
				divNum.style.backgroundColor = pSBC ( 0, el.bgcolor)
				divNum.style.left = (el.x2-intWidthNum/2) + "px"
				divNum.style.top = (el.y2-intWidthNum/2) + "px"
				//divNum.style.border = "1px solid #888"
				divNum.style.borderRadius = "50%"
				divNum.style.fontSize = intWidthNum*7/10+"px"
				let inText = ""+(i++)
				divNum.textContent = inText
				donutElement.appendChild(divNum)
			}
		})
		// SET CONIC GRADIENT
	    conicGradient = getConicGradient(donut.conicData)
	}
}

/**
 * Background color modifier
 * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * @param p
 * @param c0
 * @param c1
 * @param l
 */
const pSBC:any=(p:any,c0:any,c1:any,l:any)=>{
	let r,g,b,P,f,t,h,m=Math.round,a:any=typeof(c1)=="string";
	if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
	h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=pSBC.pSBCr(c0),P=p<0,t=c1&&c1!="c"?pSBC.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
	if(!f||!t)return null;
	if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
	else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
	a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
	if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
	else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

pSBC.pSBCr=(d:any)=>{
	const i=parseInt;
	let n=d.length,x:any={};
	if(n>9){
		const [r, g, b, a] = (d = d.split(','));
	        n = d.length;
		if(n<3||n>4)return null;
		x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
	}else{
		if(n==8||n==6||n<4)return null;
		if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
		d=i(d.slice(1),16);
		if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=Math.round((d&255)/0.255)/1000;
		else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
	}return x
};

export let donut:any
export let addNumbers :boolean = false


const getConicGradient = (data:any)=>{
		let ret = ''
		data.forEach((el:any)=>{
			ret += `${el.bgcolor} ${el.start}deg ${el.end}deg,`
		})
		return ret.slice(0,-1)
	}
let conicGradient = getConicGradient(donut.conicData)

const computeIntDivPositions = (donut:any) =>{
	// get donut element
	const donutElement = document.getElementById(donut.id)
	if(donutElement){
		var rect = donutElement.getBoundingClientRect();
		// trasform conic data to polar coordinates
		let polarData = donut.conicData.map((el:any)=>{
			let start = ((el.end + el.start)/2-90) * Math.PI / 180 
			let start1 = (el.start-90) * Math.PI / 180 
			let x1 = rect.width/2 + rect.width*13/32 * Math.cos(start)
			let y1 = rect.height/2 + rect.height*13/32 * Math.sin(start)
			let x2 = rect.width/2 + rect.width*15/32 * Math.cos(start1)
			let y2 = rect.height/2 + rect.height*15/32 * Math.sin(start1)
			let bgcolor = el.bgcolor
			let label = el.label
			let color = el.color
			let pageId = donut.pageId
			if(el.pageId)
				pageId = el.pageId
			let id = el.sectorid
			return {x1,y1,x2,y2,bgcolor,label,color,pageId,id}
		})
		return polarData
	}
}


// on mouse move
	let setCoords = (ev:any)=>{
		var rect = ev.target.getBoundingClientRect();
		var x = ev.clientX - rect.left- rect.width/2; //x position within the element.
		var y = ev.clientY - rect.top - rect.height/2;  //y position within the element.
		// GET MOUSE POSIZTION IN POLAR COORDINATES
		const radius = Math.sqrt(x*x + y*y)
		let angle = Math.atan2(y, x) * 180 / Math.PI +90
		angle = angle < 0 ? angle + 360 : angle
		if(radius < parseInt(donut.donutWidth, 10)/2 && radius > parseInt(donut.donutWidth, 10)/4){
			ev.target.style.cursor = "pointer"
			
		}else{
			ev.target.style.cursor = "default"
		}
	}
</script>

	<div class="dash-bubble border  rounded -bs-dark-border-subtle">
		{#if donut.showTitle == true}
			<h2>{donut.dbTitle}</h2>
		{/if}
		<div class="dash-area flex">
			<div class="dash-content-header">
					<div id="{donut.id}" class="donut" style="--width:{donut.donutWidth};--height:{donut.donutHeight};--conic-gradient:{conicGradient};">
					</div>
			</div>
		</div>
	</div>
<style>
.dash-bubble{
	position:relative;
	color: #888;
	margin: 0.2em;
}
.dash-bubble h2{
	font-size:large;
	font-weight: bold;
}

.dash-area{
	width: 100%;
}
.dash-content-header{
	margin: 0.2em;
	padding: 0.2em;
	font-weight: bold;
}

.donut {
    display: flex;
	justify-content: center;
	 align-items: center;
    border-radius: 100%;
    width: calc(var(--width));
    height: calc(var(--height));
    position: relative;
    top: 50%;
    left: 50%;
	color: #fff;
	text-align: center;
    transform: translate(-50%, -50%);
    background: conic-gradient(
        var(--conic-gradient)
    );
}

.donut::after {
    content: '';
    position: relative;
    width: 60%;
    height: 60%;
    background: #ffffff;
    border-radius: 50%;
    top: 30%;
    left: 30%;
    transform: translate(-50%, -50%);
}


</style>