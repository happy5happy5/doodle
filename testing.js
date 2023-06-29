let canvas = document.getElementById('canvas');
let img = document.getElementById('image');
let ctx = canvas.getContext('2d');
let synth = window.speechSynthesis;


let erasing = false;
ctx.strokeStyle = 'black';
ctx.lineWidth = 6;

let isDrawing = false;
let lastX, lastY;
let strokes = [[]]; // 각 그림의 좌표를 하위 리스트로 저장
let showPreparedImage = false;

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('contextmenu', toggleEraser); // 마우스 오른쪽 버튼 클릭 이벤트

// 캔버스의 클릭이벤트에 터치이벤트 추가
// event.preventDefault() 추가해서 그림 그려지도록 변경
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startPaintingM(e);
}, { passive: false });
canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopPainting();
}, { passive: false });
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    drawM(e);
}, { passive: false });


// 모바일 터치로 그림을 그릴 수 있도록 하는 함수 startPaintingM 추가
function startPaintingM(e) {
    e.preventDefault()
    // console.log("startPaintingM");
    isDrawing = true;
    // e.touches[0].clientX, e.touches[0].clientY 를 캔버스위의 좌표로 변환
    [lastX, lastY] = [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
    strokes[strokes.length - 1].push([lastX, lastY]);
}
// 모바일 터치로 그림을 그릴 수 있도록 하는 함수 drawM 추가
function drawM(e) {
    e.preventDefault()
    if (!isDrawing) return;
    // console.log("drawM");
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    // e.touches[0].clientX, e.touches[0].clientY 를 캔버스위의 좌표로 변환
    ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
    // console.log(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop)
    ctx.stroke();
    [lastX, lastY] = [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
    strokes[strokes.length - 1].push([lastX, lastY]);
}


function startPainting(e) {
    // console.log("startPainting");
    isDrawing=true
        [lastX, lastY] = [e.offsetX, e.offsetY];
    strokes[strokes.length - 1].push([lastX, lastY]);
}

function stopPainting() {
    // console.log("stopPainting");
    isDrawing = false;
    [lastX, lastY]=[]
    strokes.push([]); // 새로운 그림의 좌표를 저장할 하위 리스트 추가
    scalingImage().then(r => {

    })
}

function draw(e) {
    if (!isDrawing) return;
    // console.log("drawString")
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX,e.offsetY);
    // console.log(e.offsetX,e.offsetY)
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    strokes[strokes.length - 1].push([lastX, lastY]);
}

function toggleEraser(e) {
    e.preventDefault();
    erasing=!erasing;
    [canvas.style.cursor,ctx.globalCompositeOperation]=erasing?['crosshair',"destination-out"]:['default','source-out']
}

function showImage(text) {
    // text 에 해당하는 이미지를 #image 에 보여준다
    // text 에 빈칸이 있으면 빈칸을 제거 해준다
    text = text.replace(/\s/gi, "");
    // images 폳더에서 불러온 이미지 파일의 크기를 300x300 으로 맞춰준다
    img.width = 300;
    img.height = 300;
    // images 폴더에 text.png 파일이 있다면 보여준다
    img.src = `images/${text}.png`;
}

function translate(text) {
    // text 를 한글로 번역 해서 리턴 해준다
    // text 에 빈칸이 있으면 빈칸을 제거 해준다
    text = text.replace(/\s/gi, "");
    let translatedText = "";
    switch (text) {
        // 한글로 번역
        case "guitar":
            translatedText = "기타";
            break;
        case "bee":
            translatedText = "벌";
            break;
        case "candle":
            translatedText = "양초";
            break;
        case "car":
            translatedText = "자동차";
            break;
        case "clock":
            translatedText = "시계";
            break;
        case "fish":
            translatedText = "물고기";
            break;
        case "octopus":
            translatedText = "문어";
            break;
        case "snowman":
            translatedText = "눈사람";
            break;
        case "tree":
            translatedText = "나무";
            break;
        case "umbrella":
            translatedText = "우산";
            break;
        case "bear":
            translatedText = "곰";
            break;
        case "cat":
            translatedText = "고양이";
            break;
        case "cow":
            translatedText = "소";
            break;
        case "dog":
            translatedText = "개";
            break;
        case "fish":
            translatedText = "물고기";
            break;
        case "snake":
            translatedText = "뱀";
            break;
        case "duck":
            translatedText = "오리";
            break;
        case "lion":
            translatedText = "사자";
            break;
        case "tiger":
            translatedText = "호랑이";
            break;
        case "crocodile":
            translatedText = "악어";
            break;
        case "bird":
            translatedText = "새";
            break;
        case "butterfly":
            translatedText = "나비";
            break;
        case "monkey":
            translatedText = "원숭이";
            break;
        case "pig":
            translatedText = "돼지";
            break;
        case "elephant":
            translatedText = "코끼리";
            break;
        case "horse":
            translatedText = "말";
            break;
        case "sheep":
            translatedText = "양";
            break;
        case "rabbit":
            translatedText = "토끼";
            break;
        case "fox":
            translatedText = "여우";
            break;
        case "giraffe":
            translatedText = "기린";
            break;
        case "penguin":
            translatedText = "펭귄";
            break;
        case "zebra":
            translatedText = "얼룩말";
            break;
        case "mouse":
            translatedText = "쥐";
            break;
        case "deer":
            translatedText = "사슴";
            break;
        case "wolf":
            translatedText = "늑대";
            break;
        case "squirrel":
            translatedText = "다람쥐";
            break;
        case "hedgehog":
            translatedText = "고슴도치";
            break;
        case "hamster":
            translatedText = "햄스터";
            break;
        case "turtle":
            translatedText = "거북이";
            break;
        case "chicken":
            translatedText = "닭";
            break;
        case "frog":
            translatedText = "개구리";
            break;
        case "dolphin":
            translatedText = "돌고래";
            break;
        case "whale":
            translatedText = "고래";
            break;
        case "shark":
            translatedText = "상어";
            break;
        case "octopus":
            translatedText = "문어";
            break;
        case "jellyfish":
            translatedText = "해파리";
            break;
        default:
            translatedText = "번역 실패";
            break;
    }
    return translatedText;

}
function speak(text) {
    // 영어를 한글로 번역
    let translatedText = translate(text);
    // 한글의 소리를 재생
    const utterThis = new SpeechSynthesisUtterance(translatedText);
    utterThis.lang = "ko-KR";
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
}


function  speak2(text) {
    // 영어의 소리를 재생
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = "en-US";
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
    const result = document.getElementById('result');
    while (result.hasChildNodes()) {
        result.removeChild(result.firstChild);
    }
}



function undo() {
    console.log("undoString");
    strokes.pop();
    if(strokes.length===0) strokes.push([])
    else strokes[strokes.length - 1]=[];

    clearCanvas();

    for (let i = 0; i < strokes.length-1; i++) {
        ctx.beginPath();
        ctx.moveTo(strokes[i][0][0], strokes[i][0][1]);
        for (let j = 1; j < strokes[i].length; j++) {
            ctx.lineTo(strokes[i][j][0], strokes[i][j][1]);
            ctx.stroke();
        }
    }
}
function clearCanvas(flag) {
    if(flag==="real-clear"){
        strokes=[[]]
        //document.body.querySelector('#input_image')의 자식요소를 모두 삭제
        const input_image = document.getElementById('input_image');
        while (input_image.hasChildNodes()) {
            input_image.removeChild(input_image.firstChild);
        }
        //document.body.querySelector('#image') 의 src를 삭제
        const image = document.getElementById('image');
        image.src = "";
        //document.body.querySelector('#result') 자식 요소를 모두 삭제
        const result = document.getElementById('result');
        while (result.hasChildNodes()) {
            result.removeChild(result.firstChild);
        }
    }
    console.log("clearCanvas");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


async function scalingImage(event) {
    // 이미지를 캔버스 크기에 맞게 그리고,
    const scaledImage = document.getElementById("image");
    // new 폴더에서 my-model.json 모델을 불러온다
    const model = await tf.loadLayersModel('/new/my-model.json');

    // let model =await tf.loadLayersModel();
    // // <img id="image">
    scaledImage.src = canvas.toDataURL(); // 캔버스에 그려진 이미지를 28 by 28 크기로 다운스케일링하고,
    scaledImage.onload = async function () {
        const scaledCanvas = document.createElement("canvas");
        scaledCanvas.width = 28;
        scaledCanvas.height = 28;
        const scaledCtx = scaledCanvas.getContext("2d");
        scaledCtx.drawImage(scaledImage, 0, 0, scaledImage.width, scaledImage.height, 0, 0, 28, 28);
        // 정규화된 이미지 데이터를 얻기 위해 픽셀 데이터를 추출합니다.
        const imageData = scaledCtx.getImageData(0, 0, 28, 28);
        const pixelData = imageData.data;
        const normalizedData = new Array(pixelData.length / 4);
        for (let i = 3; i < pixelData.length; i += 4) {
            normalizedData[(i - 3) / 4] = pixelData[i];
        }
        let input = tf.tensor(normalizedData).reshape([-1, 28, 28, 1]);
        // 만약에 input이 비어있는 경우 예외처리하고 inputImageChecker(input)를 실행하지 않는다.
        if(input.dataSync().length===!0){
            inputImageChecker(input)
        }


        input=input.div(255.0).asType('float32');



        const predictions = await model.predict(input).data();
        // class_names.txt 파일을 불러옵니다.
        // classNames 라는 리스트에 클래스 이름을 저장합니다.
        // const classNames = await fetch("new/class_names.txt")
        //     .then((response) => response.text())
        //     .then((text) => text.split("\n"));
        //
        // console.log(classNames);
        let classNames = ['bee', 'candle', 'car', 'clock', 'fish', 'guitar', 'octopus', 'snowman', 'tree', 'umbrella'];

        // const classNames = [
        //     "bear",
        //     "cat",
        //     "cow",
        //     "dog",
        //     "fish",
        //     "snake",
        //     "duck",
        //     "lion",
        //     "tiger",
        //     "crocodile",
        //     "bird",
        //     "butterfly",
        //     "monkey",
        //     "pig",
        //     "elephant"
        // ];
        //
        const sortedPredictions = Array.from(predictions)
            .map((prediction, i) => ({ className: classNames[i], probability: prediction }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 5);
        const resultElement = document.getElementById("result");
        // 해당 결과를 클릭하면 해당 결과의 한글과 영어 소리가 재생됩니다.
        // resultElement에 sortedPredictions를 map을 이용하여 button을 생성합니다.
        // button을 클릭하면 speak와 speak2를 실행합니다.
        // speak는 한글의 소리를 재생하고, speak2는 영어의 소리를 재생합니다.
        // speak와 speak2는 각각의 text를 매개변수로 받습니다.
        // button을 클릭하면 showImage 함수가 실행됩니다.
        // resultClick 함수는 해당 버튼의 text를 매개변수로 받습니다.
        resultElement.innerHTML = sortedPredictions.map(p => `<button class="resultButton" onclick="speak('${p.className}'); speak2('${p.className}'); showImage('${p.className}')">${p.className} (${p.probability.toFixed(4)})</button>`).join(", ");




    }
}


function inputImageChecker(input){
    //test start
    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    document.body.querySelector('#input_image').appendChild(canvas);

    const pixels = input.dataSync();
    // 이곳에서 pixels 배열에 데이터를 할당합니다.

    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(28, 28);

    for (let i = 0; i < pixels.length; i++) {
        imgData.data[i * 4] = pixels[i] * 255;
        imgData.data[i * 4 + 1] = pixels[i] * 255;
        imgData.data[i * 4 + 2] = pixels[i] * 255;
        imgData.data[i * 4 + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);
    //test end
}

