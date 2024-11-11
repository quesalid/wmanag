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
const serb_mc = [[12.648802384381646, 41.98613153372771,95]]

const zoom = 11;

let mocksectcoords = [
	{
		name: "Peschiera-Salisano",
		description: "Sezione acquedotto da sorgenti Peschiera a centrale Salisano",
		coords: pes_sal,
		zoom: zoom,
		type: "LineString"
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
		type: "Point"
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
		image: "Salisano.png",
		twin: {
			uid: "Salisano-v.1.0.0",
			model: {
				type: "LSTM",
				hidden_layers: 2,
				hidden_neurons: 10,
				epochs: 100,
				optimizer: "adam",
				loss: "mean_squared_error",
			}
		}
	},
	{
		name: "Serbatoio-Ottavia",
		description: "Serbatoio Ottavia",
		coords: serb_ott,
		properties: {
			radius: 400.00,
		},
		zoom: zoom+2,
		type: "Point"
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

const sections = {
	mocksectcoords
}

export default sections;


