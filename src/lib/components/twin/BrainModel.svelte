<script lang='ts'>
// https://v2.scrimba.com/neural-networks-in-javascript-c01f
// https://wagenaartje.github.io/neataptic/
import { onMount } from 'svelte';
import * as brain from 'brain.js'

export let conf:any ={
	networkType: 'FeedForward',
	size: '10,8,6,3',
    _inputs: 'a1,b1,c,d,e,f,g,h,i,j',
    _extinputs: 'a1,b1,c,d,e,f,g,h,i,j',
};

export let options:any = {
        height: 400,
        width: 600,
        radius: 6,
        line: {
          width: 0.5,
          color: '#000',
        },
        inputs: {
          color: 'rgba(0, 128, 0, 0.5)',
          /*labels: "a,b,c,d,e,f,g,h,i,j".split(
            ','
          ),*/
        },
        hidden: {
          color: 'rgba(255, 127, 80, 0.5)',
        },
        outputs: {
          color: 'rgba(100, 149, 237, 0.5)',
        },
        recurrentLine: {
          color: '#f00',
        },
        fontSize: '14px',
      }

let element:any;

onMount(() => {
	element = document.getElementById('resultNetwork');
    options.inputs.labels = conf._inputs.split(',');
    if(element)
	    drawNetwork(conf,element,options);
    // add event listener to show twin
    const labels:any = document.querySelectorAll('svg .label');
    const tooltip:any = document.getElementById('tooltip');

        labels.forEach(label => {
            // Aggiungi l'event listener per il mouseover
            label.addEventListener('mouseover', (event:any) => {
                let textContent = event.target.textContent;
                const item = conf._extinputs.find((item:any) => item.label === textContent);
                if(item){
					textContent = `${item.label} - ${item.tag}`;
				}

                // Posiziona e mostra il popup
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY - 70}px`;
                tooltip.textContent = textContent;
                tooltip.style.visibility = 'visible';
            });

            // Nascondi il popup quando il mouse esce dall'elemento
            label.addEventListener('mouseout', () => {
                tooltip.style.visibility = 'hidden';
            });

            // Aggiorna la posizione del popup mentre si muove il mouse
            label.addEventListener('mousemove', (event:any) => {
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY - 70}px`;
            });
        });
});


const drawNetwork = (conf:any,element:any,options:any,useJson=false) =>{
	const networkType = conf.networkType;
    const size:any = conf.size.split(',').map((item:any) => {
                        return parseInt(item, 10);
                });
    const networkConfig = {
            inputSize: size[0],
            inputRange: size[0],
            hiddenLayers: size.slice(1, size.length - 1),
            outputSize: size[size.length - 1],
     };
     const networkTypes:any = {
        NeuralNetwork: (config:any) => {
            return new brain.NeuralNetwork(config);
        },
        RNN: (config:any) => {
            return new brain.recurrent.RNN(config);
        },
        RNNTimeStep: (config:any) => {
            return new brain.recurrent.RNNTimeStep(config);
        },
        FeedForward: (config:any) => {
            // constructor shim
            const { input, feedForward, target } = brain.layer;
            return new brain.FeedForward({
            inputLayer: () => input({ height: config.inputSize }),
            hiddenLayers: config.hiddenLayers.map((l:any) => (inputLayer:any) =>
                feedForward({ height: l }, inputLayer)
            ),
            outputLayer: (inputLayer) =>
                target({ height: config.outputSize }, inputLayer),
            });
        },
        Recurrent: (config:any) => {
            // constructor shim
            const { input, RNN, output } = brain.layer;
            return new brain.Recurrent({
            inputLayer: () => input({ height: config.inputSize }),
            hiddenLayers: config.hiddenLayers.map((layerHeight:any) => {
                return (inputLayer:any, recurrentInput:any) => {
                return new RNN(
                    { height: layerHeight },
                    inputLayer,
                    recurrentInput
                );
                };
            }),
            outputLayer: (inputLayer) =>
                output({ height: config.outputSize }, inputLayer),
            });
        },
     };
     
     const network = networkTypes[networkType](networkConfig);
     element.innerHTML = useJson
            ? brain.utilities.toSVG(network.toJSON(), options)
            : brain.utilities.toSVG(network, options);
}



</script>

			<div id="resultNetwork"></div>
            <div id="tooltip" class="tooltip"></div>
<style>
.tooltip {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.7);
	color: #fff;
	padding: 5px;
	border-radius: 4px;
	font-size: 12px;
	pointer-events: none;
	visibility: hidden;
    cursor: pointer;
}
</style>