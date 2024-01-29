const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const stepDisplay = document.getElementById('currentStep');
const barDisplay = document.getElementById('currentBar');
let currentStep = 0;
let playing = false;
const dotRadius = 30;
const dotSpacing = 60;
const totalSteps = 441;
const delay = 125; // Delay in ms
// let animationArray = new Array(totalSteps).fill("00000000");

let animationArray = [
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "10000000",
    "10000000",
    "10000000",
    "10000000",
    "10000010",
    "10000010",
    "10000010",
    "10000010",
    "10001010",
    "10001010",
    "10001010",
    "10001010",
    "10101010",
    "10101010",
    "10101010",
    "10101010",
    "11101010",
    "11101010",
    "11101010",
    "11101010",
    "11101011",
    "11101011",
    "11101011",
    "11101011",
    "11101111",
    "11101111",
    "11101111",
    "11101111",
    "11111111",
    "11111111",
    "11111111",
    "11111111",
    "11110111",
    "11110111",
    "11110111",
    "11110111",
    "11100011",
    "11100011",
    "11100011",
    "11100011",
    "11000001",
    "11000001",
    "11000001",
    "11000001",
    "10000000",
    "10000000",
    "10000000",
    "10000000",
    "10000000",
    "10000000",
    "11000000",
    "11000000",
    "01100000",
    "01100000",
    "00110000",
    "00110000",
    "00011000",
    "00011000",
    "00001100",
    "00001100",
    "00000110",
    "00000110",
    "00000011",
    "00000011",
    "00000010",
    "00000010",
    "00000010",
    "00000010",
    "00000100",
    "00000100",
    "00001000",
    "00001000",
    "00001000",
    "00001000",
    "00001000",
    "00001000",
    "00010000",
    "00010000",
    "00100000",
    "00100000",
    "00100000",
    "00100000",
    "00100000",
    "00100000",
    "01000000",
    "01000000",
    "10000000",
    "10000000",
    "10000000",
    "10000000",
    "10000000",
    "10000000",
    "00000001",
    "00000001",
    "00000010",
    "00000010",
    "00000010",
    "00000010",
    "00000000",
    "00000000",
    "00000100",
    "00000000",
    "01000000",
    "00000000",
    "10000000",
    "00000000",
    "00010000",
    "00000000",
    "00000010",
    "00000000",
    "00100000",
    "00000000",
    "00000001",
    "00000000",
    "00001000",
    "00000000",
    "01000000",
    "00000000",
    "00000001",
    "00000000",
    "11111111",
    "00000000",
    "11111111",
    "00000000",
    "11000011",
    "00000000",
    "00111100",
    "00000000",
    "11111111",
    "11111111",
    "11110111",
    "11101111",
    "11011111",
    "10111111",
    "01111111",
    "11111110",
    "11111101",
    "11111011",
    "11110111",
    "11101111",
    "11011111",
    "10111111",
    "01111111",
    "11111110",
    "11111101",
    "11111011",
    "11110111",
    "11100011",
    "11000001",
    "10000000",
    "10000111",
    "10000001",
    "11110000",
    "11000000",
    "10000111",
    "10000001",
    "11100011",
    "10000000",
    "11110111",
    "11110111",
    "11100011",
    "11100011",
    "11000001",
    "11000001",
    "11100011",
    "11000001",
    "11110111",
    "11110111",
    "11100011",
    "11100011",
    "11000001",
    "10000000",
    "11100011",
    "11000001",
    "11110111",
    "11100011",
    "11000001",
    "10000000",
    "00001000",
    "00000000",
    "00100000",
    "00000000",
    "00000010",
    "00000000",
    "01000000",
    "00000000",
    "00000100",
    "00000000",
    "00000001",
    "00000000",
    "00010000",
    "00000000",
    "01010101",
    "01010101",
    "01010101",
    "01010101",
    "10101010",
    "10101010",
    "01001001",
    "01001001",
    "00101010",
    "00101010",
    "00011100",
    "00011100",
    "01010101",
    "01010101",
    "01001001",
    "01001001",
    "00101010",
    "00101010",
    "00011100",
    "00011100",
    "10101010",
    "10101010",
    "10101010",
    "00101010",
    "00001000",
    "00000000",
    "11000001",
    "11000001",
    "11100011",
    "11100011",
    "11110111",
    "11110111",
    "11111111",
    "11111111",
    "11100011",
    "11100011",
    "11000001",
    "11000001",
    "10000000",
    "10000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "01000000",
    "00000000",
    "01000000",
    "00000000",
    "01000000",
    "10100000",
    "00010001",
    "00001010",
    "00000100",
    "00001010",
    "00010001",
    "10100000",
    "01000000",
    "10100000",
    "00010001",
    "00001010",
    "00000100",
    "00001010",
    "00010001",
    "10100000",
    "00000001",
    "10000011",
    "11000111",
    "11101110",
    "01111100",
    "00111000",
    "00010000",
    "00000000",
    "00010000",
    "00111000",
    "01111100",
    "11101110",
    "11000111",
    "10000011",
    "00000001",
    "00000000",
    "00001000",
    "00001000",
    "00001000",
    "00001000",
    "00001001",
    "00001001",
    "00001001",
    "00001001",
    "01001001",
    "01001001",
    "11001001",
    "11001001",
    "11011001",
    "11011001",
    "11011101",
    "11011101",
    "11111111",
    "11111111",
    "00000000",
    "00000000",
    "11111111",
    "11111111",
    "11111111",
    "00000000",
    "11111111",
    "11111111",
    "11111111",
    "11110111",
    "11100011",
    "11000001",
    "10000000",
    "00000000",
    "00001000",
    "00000000",
    "00001000",
    "00000000",
    "00010100",
    "00000000",
    "00010100",
    "00000000",
    "00100010",
    "00100010",
    "00100010",
    "00000000",
    "10000000",
    "10000000",
    "01000001",
    "01000001",
    "00010100",
    "00000000",
    "00010100",
    "00000000",
    "00100010",
    "00000000",
    "00100010",
    "00000000",
    "01000001",
    "01000001",
    "01000001",
    "00000000",
    "01000001",
    "01000001",
    "10000000",
    "10000000",
    "00100010",
    "00000000",
    "00010100",
    "00000000",
    "00010100",
    "00000000",
    "01000001",
    "01000001",
    "01000001",
    "00000000",
    "00100010",
    "00000000",
    "00001000",
    "00000000",
    "00001000",
    "00001000",
    "00001000",
    "00001000",
    "00011100",
    "00011100",
    "00111110",
    "00111110",
    "01111111",
    "01111111",
    "11111111",
    "11111111",
    "11111111",
    "00000000",
    "11111111",
    "00000000",
    "11111111",
    "00000000",
    "00001000",
    "00000000",
    "00010100",
    "00000000",
    "00100010",
    "00000000",
    "01000001",
    "01000001",
    "01000001",
    "00000000",
    "00010100",
    "00010100",
    "00001000",
    "00000000",
    "00001000",
    "00001000",
    "00001000",
    "00010000",
    "00100000",
    "01000000",
    "10000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "11000001",
    "11000001",
    "11110111",
    "11110111",
    "11111111",
    "11111111",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "11111111",
    "00000000",
    "11111111",
    "00000000",
    "11111111",
    "11111111",
    "11111111",
    "11111111",
    "11111111",
    "11111111",
    "11111111",
    "11111111",
    "11111111",
    "11111111",
    "11110111",
    "11110111",
    "11100011",
    "11100011",
    "11000001",
    "11000001",
    "10000000",
    "10000000",
	"00000000"
]

// function drawDots(stepString) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for (let i = 0; i < stepString.length; i++) {
//         ctx.beginPath();
//         ctx.arc(dotSpacing * (i + 1), canvas.height / 2, dotRadius, 0, Math.PI * 2);
//         ctx.fillStyle = stepString[i] === '1' ? 'red' : 'gray';
//         ctx.fill();
//     }
// }
function drawDots(stepString) {
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const radius = Math.min(canvas.width, canvas.height) / 3; // Adjust radius as needed

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < stepString.length; i++) {
		// Calculate angle for each dot, starting from the bottom (Math.PI / 2 radians)
		const angle = (Math.PI / 2) + (Math.PI * 2 * i / stepString.length);
		const dotX = centerX + radius * Math.cos(angle);
		const dotY = centerY + radius * Math.sin(angle);

		ctx.beginPath();
		ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
		ctx.fillStyle = stepString[i] === '1' ? 'red' : 'gray';
		ctx.fill();
	}
}


function updateStep(step) {
	currentStep = step;
	stepDisplay.textContent = currentStep + 1; // Display is 1-indexed

	if (currentStep + 1 < 8) {
		barDisplay.textContent = 0;
	} else {
		const bar = (currentStep - 8) / 16;
		barDisplay.textContent = `${Math.floor(bar) + 1} (${(bar - Math.floor(bar)) * 16 + 1})`;
	}
	drawDots(animationArray[currentStep]);
}

function playAnimation() {
	playing = !playing;
	if (playing) {
		document.getElementById('playButton').textContent = 'Pause';
		let playInterval = setInterval(() => {
			if (!playing || currentStep >= totalSteps - 1) {
				clearInterval(playInterval);
				playing = false;
				document.getElementById('playButton').textContent = 'Play';
				return;
			}
			updateStep(currentStep + 1);
		}, delay);
	} else {
		document.getElementById('playButton').textContent = 'Play';
	}
}

document.getElementById('playButton').addEventListener('click', playAnimation);
document.getElementById('nextStep').addEventListener('click', () => {
	if (currentStep < totalSteps - 1) updateStep(currentStep + 1);
});
document.getElementById('prevStep').addEventListener('click', () => {
	if (currentStep > 0) updateStep(currentStep - 1);
});

// Initialize
canvas.width = dotSpacing * 9; // 8 dots plus margins
canvas.height = 300;
updateStep(0);

// canvas.addEventListener('click', function(event) {
// 	const rect = canvas.getBoundingClientRect();
// 	const x = event.clientX - rect.left;
// 	const y = event.clientY - rect.top;

// 	for (let i = 0; i < 8; i++) {
// 		const dotX = dotSpacing * (i + 1);
// 		const dotY = canvas.height / 2;
// 		const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2);

// 		if (distance < dotRadius) {
// 			let stepString = animationArray[currentStep].split('');
// 			stepString[i] = stepString[i] === '0' ? '1' : '0';
// 			animationArray[currentStep] = stepString.join('');
// 			drawDots(animationArray[currentStep]);
// 			break;
// 		}
// 	}
// });

canvas.addEventListener('click', function(event) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const radius = Math.min(canvas.width, canvas.height) / 3; // Ensure this matches the radius used in drawDots

	for (let i = 0; i < 8; i++) {
		// Calculate angle for each dot, starting from the bottom (Math.PI / 2 radians)
		const angle = (Math.PI / 2) + (Math.PI * 2 * i / 8);
		const dotX = centerX + radius * Math.cos(angle);
		const dotY = centerY + radius * Math.sin(angle);

		// Check if the click is within the dot's area
		const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2);
		
		if (distance < dotRadius) {
			// Toggle dot state
			let stepString = animationArray[currentStep].split('');
			stepString[i] = stepString[i] === '0' ? '1' : '0';
			animationArray[currentStep] = stepString.join('');
			drawDots(animationArray[currentStep]);
			break;
		}
	}
});



const totalStepsInput = document.getElementById('totalStepsInput');

totalStepsInput.addEventListener('change', function() {
	const newTotalSteps = parseInt(totalStepsInput.value);
	if (newTotalSteps > animationArray.length) {
		for (let i = animationArray.length; i < newTotalSteps; i++) {
			animationArray.push("00000000");
		}
	} else if (newTotalSteps < animationArray.length) {
		animationArray.length = newTotalSteps;
	}
	if (currentStep >= newTotalSteps) {
		updateStep(newTotalSteps - 1);
	}
});

document.getElementById('rewindButton').addEventListener('click', function() {
	if (playing) {
		playing = false;
		document.getElementById('playButton').textContent = 'Play';
	}
	updateStep(0);
});

document.getElementById('exportButton').addEventListener('click', function() {
	const reversedAnimationArray = animationArray.map(step => 
		'B' + step.split('').reverse().join('')
	);
	const exportString = `const byte cherryVisual[] PROGMEM = {${reversedAnimationArray.join(', ')}};`;
	
	// Create a Blob with the export string
	const blob = new Blob([exportString], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);
	
	// Create a link and trigger the download
	const downloadLink = document.createElement('a');
	downloadLink.href = url;
	downloadLink.download = 'animationData.txt';
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink); // Remove the link when done
	
	// Revoke the blob URL to free up resources
	URL.revokeObjectURL(url);
});




