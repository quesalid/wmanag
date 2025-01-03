// TEST DATA
let pes_sal = [[13.00559, 42.36565,420],
[12.98807, 42.35958,410],
[12.97786, 42.36656,398],
[12.93497, 42.35804,389],
[12.93215, 42.35856,377],
[12.90635, 42.35020,370],
[12.88833, 42.33871,355],
[12.86430, 42.32225,345],
[12.84663, 42.31285,333],
[12.80162, 42.29924,320],
[12.79402, 42.29296,310],
[12.76378, 42.27657,295],
[12.75541, 42.27361,285],
[12.75262, 42.26929,275],
[12.73997, 42.25277,265],
]

let lecap_sal = [[12.81103856710884, 42.233127969121924,260],
[12.795848313616348, 42.25187158834545, 245],
[12.783313524902658, 42.25449363463404,220],
[12.766418809679854, 42.257922299917674,203],
[12.73997, 42.25277,190]
]

let sal_mc = [[12.73997, 42.25277,190],
[12.739684361026148, 42.246305486640125,185],
[12.739154885017543, 42.234251851134935,181],
[12.738956779691021, 42.223380832461004,174],
[12.739353438510921, 42.21221780434419,170],
[12.732312744083831, 42.19598382797091,168],
[12.731618591149, 42.17886385245642,163],
[12.727057014808652, 42.16012208430569,155],
[12.72824699126836, 42.149462524450165,150],
[12.738956779405745, 42.137256962096785,147],
[12.75928554520464, 42.12379870522704,142],
[12.763747956928551, 42.11232383563311,130],
[12.766722898058147, 42.10518777261236,125],
[12.763747956908874, 42.09451896443191,119],
[12.757599745328248, 42.07928521034901,115],
[12.755814780638685, 42.069348182816626,108],
[12.745474396366134, 42.043733288695314,105],
[12.725564786621947, 42.03369156143788,100],
[12.691208325652529, 42.00753569152636,98],
[12.66929858932924, 41.9937485621529,97],
[12.648802384381646, 41.98613153372771,95]
]

let sal_ott = [
	[12.73997, 42.25277,190],
	[12.717645424303251, 42.24754031656858,184],
	[12.662061526077087, 42.253303669331316,178],
	[12.642163788190679, 42.247220114863616,172],
	[12.620459255465606, 42.23923836514931,166],
	[12.59286424911037, 42.22989583786572,161],
	[12.571611984478833, 42.21732682003723,155],
	[12.542447170380328, 42.20940650543168,150],
	[12.519439372591508, 42.184919253691426,146],
	[12.510937632097972, 42.150364993623846,142],
	[12.493701259210177, 42.13236411114986,135],
	[12.480349138476397, 42.1172394146225,130],
	[12.459228512543463, 42.09148311517958,122],
	[12.444419797808877, 42.088960957101584,117],
	[12.403392375019616, 42.07022178621619,113],
	[12.336874538755643, 42.05598352448593,108],
	[12.339302196908854, 42.029841699732245,102],
	[12.38130068277877, 42.00657544887896,98],
	[12.408352116220078, 41.98487969941577,93],
	[12.414857673068228, 41.97034203922025,88],
	[12.424394906113939, 41.93900114726294,85]
]

const serb_ott = [[12.424394906113939, 41.93900114726294,85]]
const centrale_sal = [[12.73997, 42.25277,190]]
const sorgenti_pes = [[13.00559, 42.36565,420]]
const sorgenti_lecap = [[12.81103856710884, 42.233127969121924,260]]
const serb_mc = [[12.648802384381646, 41.98613153372771, 95]]

let rdp_udsud = [
	[13.471033574202934, 45.85175337043916, 200],
	[13.46887710880064, 45.85166383155799, 200],
	[13.464776641631351, 45.85232698092819, 200],
	[13.460000923650009, 45.85315269243209, 200],
    [13.455210296215855, 45.85241464295666, 200],
    [13.450542801534054, 45.85231740018976, 200],
    [13.44505195689818, 45.85224297923758, 200],
    [13.440372959758156, 45.85264705377735, 200],
    [13.43491566711406, 45.853145201118316, 200],
    [13.430552649969458, 45.85374031215768, 200],
    [13.427054412283702, 45.85425048747848, 200],
    [13.42180239528584, 45.85469186472455, 200],
    [13.421753083471454, 45.85477640549971, 200],
    [13.42049752877672, 45.856784211169646, 200],
    [13.419075072517051, 45.85909838146707, 200],
    [13.417231569217059, 45.86211775336656, 200],
    [13.414944259553529, 45.86584485333895, 200],
    [13.412842256462007, 45.86940123416414, 200],
    [13.410700121573068, 45.872928602028615, 200],
    [13.409024382824242, 45.87626183308792, 200],
    [13.407730604141983, 45.879269523343716, 200],
    [13.405790138711938, 45.883102613795984, 200],
    [13.404673390576106, 45.88535190067511, 200],
    [13.401449156409143, 45.88716849668964, 200],
	[13.397964200555625, 45.889176883277486, 200],
	[13.393997700459533, 45.89144838751932, 200],
	[13.390497942214385, 45.8941214339159, 200],
    [13.387071330745606, 45.896817549729164, 200],
    [13.383708066508717, 45.899508680937736, 200],
    [13.380488647981107, 45.90207119265619, 200],
    [13.377430534947708, 45.904495986850016, 200],
    [13.374393238607812, 45.90689393176899, 200],
    [13.371921326740082, 45.90885788036059, 200],
    [13.368830462308601, 45.91130921261307, 200],
    [13.365567464319943, 45.91382065050609, 200],
    [13.362734735836513, 45.914786797388075, 200],
    [13.358106067172415, 45.91618069663717, 200],
    [13.355244373386684, 45.917071419328344, 200],
    [13.35189875631175, 45.918063650495355, 200],
    [13.347889485540682, 45.919268640789234, 200],
    [13.343076806040843, 45.91965574702892, 200],
    [13.338048063988897, 45.920019261652214, 200],
    [13.332570960307958, 45.920426599116404, 200],
    [13.327696565621824, 45.920785249222355, 200],
    [13.32323639294551, 45.92113773632758, 200],
    [13.319594100618815, 45.92387639472775, 200],
    [13.315751587018477, 45.92683995804946, 200],
	[13.312192114997028, 45.929493474069304, 200],
	[13.310873017679514, 45.93216340236006, 200]
	]

let pv_pratola = [
		[13.870247310264508, 42.085615499870165, 200],
		[13.871629455839244, 42.086232686185454, 200],
		[13.871762204284279, 42.08612547584798, 200],
		[13.87202770117434, 42.08621240316251, 200],
		[13.872168258351431, 42.08503307910852, 200],
		[13.871114079524402, 42.08454048025469, 200],
		[13.870247310264508, 42.085615499870165, 200]
	]
	

let staz_redipuglia = [[13.471033574202934, 45.85175337043916,200]]

let staz_udine_sud = [[13.310873017679514, 45.93216340236006,200]]

const zoom = 11;

let models = [
	{
		uid: '90a96422-56cd-f4ab-aa56-f4d45622a81e',
		name: 'CentraleSalisano-v.1.0.0',
		library: 'brain',
		params: {
			type: 'RNN',
			size: '6,32,16,1',
			epochs: 10000,
		}
	},
	{
		uid: '91a96422-36cd-f4ab-9a56-f4d45622a910',
		name: 'AcqPeschiera-v.1.0.0',
		library: 'brain',
		params: {
			type: 'LSTM',
			size: '12,64,32,3',
			epochs: 10000,
		}
	},
	
]


let pvsections = [

	{
		name: "PV-Pratola",
		description: "Impianto FV via Spinelle Pratola Peligna (AQ)",
		coords: pv_pratola,
		zoom: zoom + 6 ,
		type: "LineString",
	}
]

let electrosections = [
	{
		name: "RDP-Udine-Sud",
		description: "Rete di distribuzione primaria Udine Sud",
		coords: rdp_udsud,
		zoom: zoom,
		type: "LineString",
	},
	{
		name: "Staz-Trasf-Redipuglia",
		description: "Stazione di trasformazione Redipuglia",
		coords: staz_redipuglia,
		properties: {
			radius: 400.00,
		},
		zoom: zoom + 2,
		type: "Point",
		d3: {
			viwer: "line",
		},
	},
	{
		name: "Staz-Trasf-Udine-sud",
		description: "Stazione di trasformazione Udine Sud",
		coords: staz_udine_sud,
		properties: {
			radius: 400.00,
		},
		zoom: zoom + 2,
		type: "Point",
		d3: {
			viwer: "line",
		},
	}
]

let sections = [
	{
		name: "Peschiera-Salisano",
		description: "Sezione acquedotto da sorgenti Peschiera a centrale Salisano",
		coords: pes_sal,
		zoom: zoom,
		type: "LineString",
	},
	{
		name: "LeCapore-Salisano",
		description: "Sezione acquedotto da sorgenti Le Capore a centrale Salisano",
		coords: lecap_sal,
		zoom: zoom,
		type: "LineString"
	},
	{
		name: "Salisano-MonteCarnale",
		description: "Sezione acquedotto da centrale Salisano a Monte Carnaro",
		coords: sal_mc,
		zoom: zoom,
		type: "LineString"
	},
	{
		name: "Salisano-Ottavia",
		description: "Sezione acquedotto da centrale Salisano a Ottavia",
		coords: sal_ott,
		zoom: zoom,
		type: "LineString"
	},
	{
		name: "Sorgenti-Peschiera",
		description: "Sorgenti Peschiera",
		coords: sorgenti_pes,
		properties: {
			radius: 400.00,
		},
		zoom: zoom + 2,
		type: "Point",
		d3: {
			viwer: "line",
		},
	},
	{
		name: "Sorgenti-LeCapore",
		description: "Sorgenti Le Capore",
		coords: sorgenti_lecap,
		properties: {
			radius: 400.00,
		},
		zoom: zoom + 2,
		type: "Point"
	},
	{
		name: "Centrale-Salisano",
		description: "Centrale Idroelettrica Salisano",
		coords: centrale_sal,
		properties: {
			radius: 400.00,
		},
		zoom: zoom + 2,
		type: "Point",
		image: "salisano.svg",
		twin: {
			uid: "CentraleSalisano-v.1.0.0",
			model: {
				type: "RNNTimeStep",
				size: '6,32,16,1',
				epochs: 100,
				optimizer: "adam",
				loss: "mean_squared_error",
			},
			input_vector: [
				{ label: "s1fl", tag: "PESCHERA-FLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
				{ label: "s2fl", tag: "LECAP-FLOW", unit: "m3/sec", max: 5, min: 3, value: 4 },
				{ label: "l1vl1", tag: "PESCH-SAL-VALV1", unit: "%", max: 100, min: 0, value: 80 },
				{ label: "l1vl2", tag: "PESCH-SAL-VALV2", unit: "%", max: 100, min: 0, value: 75 },
				{ label: "l2vl1", tag: "LECAP-SAL-VALV1", unit: "%", max: 100, min: 0, value: 83 },
				{ label: "l2vl2", tag: "LECAP-SAL-VALV2", unit: "%", max: 100, min: 0, value: 68 },
			],
			output_vector: [
				{ label: "power", tag: "SALISANO-POWER", unit: "MW", max: 25, min: 8, value: 21.6 },
			]
		},
		d3: {
			viwer: "line",
		},
	},
	{
		name: "Serbatoio-Ottavia",
		description: "Serbatoio Ottavia",
		coords: serb_ott,
		properties: {
			radius: 400.00,
		},
		zoom: zoom+2,
		type: "Point",
		d3: {
			viwer: "line",
		},
	},
	{
		name: "Serbatoio-Monte-Carnale",
		description: "Serbatoio Monte Carnale",
		coords: serb_mc,
		properties: {
			radius: 400.00,
		},
		zoom: zoom + 2,
		type: "Point"
	}
]

const twindata = [
	{
		name: "Acquedotto-Peschiera",
		description: "Acquedotto del Peschiera",
		twin: {
			uid: "AcqPeschiera-v.1.0.0",
			model: {
				type: "LSTM",
				size: '12,64,32,3',
				epochs: 100,
				optimizer: "adam",
				loss: "mean_squared_error",
			},
			input_vector: [
				{ label:"s1fl",tag: "PESCHERA-FLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
				{ label: "s2fl",tag: "LECAP-FLOW", unit: "m3/sec", max: 5, min: 3, value: 4 },
				{ label: "l1vl1",tag: "PESCH-SAL-VALV1", unit: "%", max: 100, min: 0, value: 80 },
				{ label: "l1vl2",tag: "PESCH-SAL-VALV2", unit: "%", max: 100, min: 0, value: 75 },
				{ label: "l2vl1",tag: "LECAP-SAL-VALV1", unit: "%", max: 100, min: 0, value: 83 },
				{ label: "l2vl2", tag: "LECAP-SAL-VALV2", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l3vl1", tag: "SAL-OTT-VALV1", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l3vl2", tag: "SAL-OTT-VALV2", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l4vl1", tag: "SAL-MCAR-VALV1", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l4vl2", tag: "SAL-MCAR-VALV2", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "o1fl", tag: "OTT-OUTFLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
				{ label: "o2fl", tag: "MCAR-OUTFLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
			],
			output_vector: [
				{ label: "power", tag: "SALISANO-POWER", unit: "MW", max: 25, min: 8, value: 21.6 },
				{ label: "tlev1", tag: "OTT-LEVEL", unit: "%", max: 100, min: 0, value: 78.6 },
				{ label: "tlev2", tag: "MCAR-LEVEL", unit: "%", max: 100, min: 0, value: 78.6 },
			]
		},
		sections: sections,
	},
	{
		name: "Elett-Redipuglia-Udine-Sud",
		description: "Elettrodotto Redipuglia Udine Sud",
		twin: {
			uid: "El-Redipuglia-UdineSud-v.1.0.0",
			model: {
				type: "LSTM",
				size: '12,64,32,3',
				epochs: 100,
				optimizer: "adam",
				loss: "mean_squared_error",
			},
			input_vector: [
				{ label: "s1fl", tag: "PESCHERA-FLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
				{ label: "s2fl", tag: "LECAP-FLOW", unit: "m3/sec", max: 5, min: 3, value: 4 },
				{ label: "l1vl1", tag: "PESCH-SAL-VALV1", unit: "%", max: 100, min: 0, value: 80 },
				{ label: "l1vl2", tag: "PESCH-SAL-VALV2", unit: "%", max: 100, min: 0, value: 75 },
				{ label: "l2vl1", tag: "LECAP-SAL-VALV1", unit: "%", max: 100, min: 0, value: 83 },
				{ label: "l2vl2", tag: "LECAP-SAL-VALV2", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l3vl1", tag: "SAL-OTT-VALV1", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l3vl2", tag: "SAL-OTT-VALV2", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l4vl1", tag: "SAL-MCAR-VALV1", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l4vl2", tag: "SAL-MCAR-VALV2", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "o1fl", tag: "OTT-OUTFLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
				{ label: "o2fl", tag: "MCAR-OUTFLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
			],
			output_vector: [
				{ label: "power", tag: "SALISANO-POWER", unit: "MW", max: 25, min: 8, value: 21.6 },
				{ label: "tlev1", tag: "OTT-LEVEL", unit: "%", max: 100, min: 0, value: 78.6 },
				{ label: "tlev2", tag: "MCAR-LEVEL", unit: "%", max: 100, min: 0, value: 78.6 },
			]
		},
		sections: electrosections,
	},
	{
        name: "PV-Pratola",
        description: "Impianto FV via Spinelle Pratola Peligna (AQ)",
        twin: {
            uid: "PV-Pratola-v.1.0.0",
            model: {
                type: "LSTM",
                size: '12,64,32,3',
                epochs: 100,
                optimizer: "adam",
                loss: "mean_squared_error",
            },
            input_vector: [
                { label: "s1fl", tag: "PESCHERA-FLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
                { label: "s2fl", tag: "LECAP-FLOW", unit: "m3/sec", max: 5, min: 3, value: 4 },
                { label: "l1vl1", tag: "PESCH-SAL-VALV1", unit: "%", max: 100, min: 0, value: 80 },
                { label: "l1vl2", tag: "PESCH-SAL-VALV2", unit: "%", max: 100, min: 0, value: 75 },
                { label: "l2vl1", tag: "LECAP-SAL-VALV1", unit: "%", max: 100, min: 0, value: 83 },
                { label: "l2vl2", tag: "LECAP-SAL-VALV2", unit: "%", max: 100, min: 0, value: 68 },
                { label: "l3vl1", tag: "SAL-OTT-VALV1", unit: "%", max: 100, min: 0, value: 68 },
                { label: "l3vl2", tag: "SAL-OTT-VALV2", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l4vl1", tag: "SAL-MCAR-VALV1", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "l4vl2", tag: "SAL-MCAR-VALV2", unit: "%", max: 100, min: 0, value: 68 },
				{ label: "o1fl", tag: "OTT-OUTFLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
				{ label: "o2fl", tag: "MCAR-OUTFLOW", unit: "m3/sec", max: 10, min: 8, value: 9.1 },
            ],
            output_vector: [
                { label: "power", tag: "SALISANO-POWER", unit: "MW", max: 25, min: 8, value: 21.6 },
                { label: "tlev1", tag: "OTT-LEVEL", unit: "%", max: 100, min: 0, value: 78.6 },
                { label: "tlev2", tag: "MCAR-LEVEL", unit: "%", max: 100, min: 0, value: 78.6 },
            ]
        },
        sections: pvsections,
    }
]


// Stats data simulated
const specSalisano = {
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "Grafico multi-linea con markers per le serie temporali della potenza di uscita.",
		"data": {
			"name": "table",
				"format": {
				"type": "json"
			}
		},
		"params": [
			{
				"name": "highlight",
				"select": {
					"type": "point",
					"fields": ["year"],
					"on": "click",
					"clear": "dblclick" // per deselezionare con doppio clic
				}
			}
		],
		"mark": {
			"type": "bar",
			"point": true
		},
		"encoding": {
			"x": {
				"field": "month",
				"type": "ordinal",
				"title": "Month",
				"sort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			},
			"y": {
				"field": "value",
				"type": "quantitative",
				"title": "Power Output (MW)",
				"scale": { "domain": [15, 23.5] }
			},
			"color": {
				"condition": {
					"param": "highlight",
					"field": "year",
					"type": "nominal",
					"scale": { "scheme": "category10" }
				},
				"value": "lightgray"
			},
			"opacity": {
				"condition": { "param": "highlight", "value": 1 },
				"value": 0.3
			},
			"tooltip": [
				{ "field": "year", "type": "nominal", "title": "Year" },
				{ "field": "month", "type": "ordinal", "title": "Month" },
				{ "field": "value", "type": "quantitative", "title": "Power Output (MW)" }
			]
	}
}



const specSalisanoBar = {
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	"description": "Grafico a barre orizzontale impilato che mostra la potenza di uscita mensile per anno.",
	"mark": "bar",
	"data": {
		"name": "table",
		"format": {
			"type": "json"
		}
	},
	"encoding": {
		"x": {
			"field": "reduced",
			"type": "quantitative",
			"title": "Power Output (10MW)"
		},
		"y": {
			"field": "month",
			"type": "ordinal",
			"title": "Month",
			"sort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		},
		"color": {
			"field": "year",
			"type": "nominal",
			"title": "Year",
			"scale": { "scheme": "category10" }
		},
		"tooltip": [
			{ "field": "year", "type": "nominal", "title": "Year" },
			{ "field": "month", "type": "ordinal", "title": "Month" },
			{ "field": "value", "type": "quantitative", "title": "Power Output (MW)" }
		]
	}
};



const dataSalisano = {
	table: [
		{ "year": "2020", "month": "Jan", "value": 21.5, "reduced": 2.15 },
		{ "year": "2020", "month": "Feb", "value": 22.1, "reduced": 2.21},
		{ "year": "2020", "month": "Mar", "value": 20.3, "reduced": 2.03 },
		{ "year": "2020", "month": "Apr", "value": 23.0, "reduced": 2.30},
		{ "year": "2020", "month": "May", "value": 21.0, "reduced": 2.30 },
		{ "year": "2020", "month": "Jun", "value": 22.5, "reduced": 2.25 },
		{ "year": "2020", "month": "Jul", "value": 20.7, "reduced": 2.07 },
		{ "year": "2020", "month": "Aug", "value": 23.2, "reduced": 2.32 },
		{ "year": "2020", "month": "Sep", "value": 19.9, "reduced": 1.99 },
		{ "year": "2020", "month": "Oct", "value": 22.8, "reduced": 2.28 },
		{ "year": "2020", "month": "Nov", "value": 21.4, "reduced": 2.14 },
		{ "year": "2020", "month": "Dec", "value": 23.3, "reduced": 2.33 },

		{ "year": "2021", "month": "Jan", "value": 22.0, "reduced": 2.20 },
		{ "year": "2021", "month": "Feb", "value": 21.3, "reduced": 2.13 },
		{ "year": "2021", "month": "Mar", "value": 23.1, "reduced": 2.31 },
		{ "year": "2021", "month": "Apr", "value": 20.4, "reduced": 2.04 },
		{ "year": "2021", "month": "May", "value": 19.8, "reduced": 1.98 },
		{ "year": "2021", "month": "Jun", "value": 23.0, "reduced": 2.30 },
		{ "year": "2021", "month": "Jul", "value": 22.2, "reduced": 2.22 },
		{ "year": "2021", "month": "Aug", "value": 21.9, "reduced": 2.19 },
		{ "year": "2021", "month": "Sep", "value": 20.8, "reduced": 2.08 },
		{ "year": "2021", "month": "Oct", "value": 23.5, "reduced": 2.35 },
		{ "year": "2021", "month": "Nov", "value": 19.9, "reduced": 1.99 },
		{ "year": "2021", "month": "Dec", "value": 22.4, "reduced": 2.24 },

		{ "year": "2022", "month": "Jan", "value": 19.8, "reduced": 1.98 },
		{ "year": "2022", "month": "Feb", "value": 23.4, "reduced": 2.34 },
		{ "year": "2022", "month": "Mar", "value": 21.0, "reduced": 2.10 },
		{ "year": "2022", "month": "Apr", "value": 22.7, "reduced": 2.27 },
		{ "year": "2022", "month": "May", "value": 20.5, "reduced": 2.05 },
		{ "year": "2022", "month": "Jun", "value": 23.3, "reduced": 2.33 },
		{ "year": "2022", "month": "Jul", "value": 22.1, "reduced": 2.21 },
		{ "year": "2022", "month": "Aug", "value": 21.4, "reduced": 2.14 },
		{ "year": "2022", "month": "Sep", "value": 22.9, "reduced": 2.29 },
		{ "year": "2022", "month": "Oct", "value": 23.0, "reduced": 2.30 },
		{ "year": "2022", "month": "Nov", "value": 21.2, "reduced": 2.12 },
		{ "year": "2022", "month": "Dec", "value": 20.3, "reduced": 2.03 },

		{ "year": "2023", "month": "Jan", "value": 22.5, "reduced": 2.25 },
		{ "year": "2023", "month": "Feb", "value": 20.6, "reduced": 2.06 },
		{ "year": "2023", "month": "Mar", "value": 23.0, "reduced": 2.30 },
		{ "year": "2023", "month": "Apr", "value": 21.7, "reduced": 2.17 },
		{ "year": "2023", "month": "May", "value": 22.3, "reduced": 2.23 },
		{ "year": "2023", "month": "Jun", "value": 20.8, "reduced": 2.08 },
		{ "year": "2023", "month": "Jul", "value": 23.2, "reduced": 2.32 },
		{ "year": "2023", "month": "Aug", "value": 21.6, "reduced": 2.16 },
		{ "year": "2023", "month": "Sep", "value": 22.4, "reduced": 2.24 },
		{ "year": "2023", "month": "Oct", "value": 19.9, "reduced": 1.99 },
		{ "year": "2023", "month": "Nov", "value": 22.7, "reduced": 2.27 },
		{ "year": "2023", "month": "Dec", "value": 21.8, "reduced": 2.18 }
	]
}

const specTrellisArea = {
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	"description": "Grafico Trellis Area per visualizzare la potenza di uscita mensile per anno.",
	"data": {
		"name": "table",
		"format": {
			"type": "json"
		}
	},
	"height": 40,
	"width": 200,
	"mark": "area",
	"encoding": {
		"x": {
			"field": "month",
			"type": "ordinal",
			"title": "Month",
			"sort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		},
		"y": {
			"field": "value",
			"type": "quantitative",
			"title": "(MW)",
			"axis": { "grid": false }
		},
		"color": {
			"field": "year",
			"type": "nominal",
			"legend": null 
		},
		"row": {
			"field": "year",
			"type": "nominal",
			"title": "year"
		},
		"tooltip": [
			{ "field": "year", "type": "nominal", "title": "Year" },
			{ "field": "month", "type": "ordinal", "title": "Month" },
			{ "field": "value", "type": "quantitative", "title": "Power Output (MW)" }
		]
	}
};

const getVegaSpecs = (section) => {
	const specs = []
	switch (section) {
		case "Centrale-Salisano":
			const spec1 = { "type": "bar", spec: specSalisanoBar }
			const spec2 = { "type": "trellisarea", spec: specTrellisArea }
			specs.push(spec1)
			specs.push(spec2)
			break
		default:
			break
	}
	return specs
}

const getVegaData = (section) => {
	switch (section) {
		case "Centrale-Salisano":
				return dataSalisano;
		default:
			return null
	}
}
const msections = {
	sections,
	twindata,
	getVegaSpecs,
	getVegaData
}

export default msections;


