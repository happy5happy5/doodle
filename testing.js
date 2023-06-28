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

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('contextmenu', toggleEraser); // 마우스 오른쪽 버튼 클릭 이벤트

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
    let img = document.getElementById("image");
    // text 에 해당하는 이미지를 https://kor.pngtree.com/so/text 로 검색한다
    // xpath를 이용해서 검색의 첫번째 이미지를 가져온다
    let xpath = '//*[@id="v2-content"]/div[2]/div/div[1]/div/ul/li[1]/div[2]/a';
    let url = "https://kor.pngtree.com/so/" + text;
    // 검색한 내용에서 xpath를 이용해서 첫번째 이미지를 찾는다
    let result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    // 검색한 내용에서 첫번째 이미지의 src를 가져온다
    let src = result.getElementsByTagName("img")[0].src;
    // 가져온 src를 img에 보여준다
    img.src = src;
}

function showResult(text) {
    // text 에 해당하는 한글을 #result 에 보여준다
    // text 에 빈칸이 있으면 빈칸을 제거 해준다
    text = text.replace(/\s/gi, "");
    // text 에 해당하는 한글을 #result 에 보여준다
    document.getElementById("result").innerText = text;
}

// id result 의 결과를 클릭하면 실행되는 함수
// function resultClick() {
//     // 분류 결과를 클릭하면 해당 하는 글자의 한글과 영어의 소리를 재생
//     // 분류 결과 텍스트에서 괄호를 삭제하고 앞부분의 글자만 읽게 한다
//     let text = document.getElementById("result").innerText;
//     let text2 = text.split("(")[0];
//     console.log(text2);
//     // 한글과 영어의 소리를 재생
//     speak(text2);
//     speak2(text2);
//     // 해당 동물의 이미지를 #image에 보여준다
//     showImage(text2);
//     // 해당 동물의 한글을 #result 에 보여준다
//     showResult(text2);
// }
function translate(text) {
    // text 를 한글로 번역 해서 리턴 해준다
    // text 에 빈칸이 있으면 빈칸을 제거 해준다
    text = text.replace(/\s/gi, "");
    let translatedText = "";
    switch (text) {
        // 한글로 번역
        case "bear":
            translatedText = "곰";
            return translatedText;
        case "cat":
            translatedText = "고양이";
            return translatedText;
        case "cow":
            translatedText = "소";
            return translatedText;
        case "dog":
            translatedText = "개";
            return translatedText;
        case "fish":
            translatedText = "물고기";
            return translatedText;
        case "snake":
            translatedText = "뱀";
            return translatedText;
        case "duck":
            translatedText = "오리";
            return translatedText;
        case "lion":
            translatedText = "사자";
            return translatedText;
        case "tiger":
            translatedText = "호랑이";
            return translatedText;
        case "crocodile":
            translatedText = "악어";
            return translatedText;
        case "bird":
            translatedText = "새";
            return translatedText;
        case "butterfly":
            translatedText = "나비";
            return translatedText;
        case "monkey":
            translatedText = "원숭이";
            return translatedText;
        case "pig":
            translatedText = "돼지";
            return translatedText;
        case "elephant":
            translatedText = "코끼리";
            return translatedText;
        default:
            translatedText = "번역 실패";
            return translatedText;

    }

}
function speak(text) {
    // 영어를 한글로 번역
    let translatedText = translate(text);

    // 한글의 소리를 재생
    // 한글 목소리 설정
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
    }
    console.log("clearCanvas");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


async function scalingImage(event) {
    // 이미지를 캔버스 크기에 맞게 그리고,
    const scaledImage = document.getElementById("image");
    let model =await tf.loadLayersModel("new/model.json")
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
        const classNames = ['ant', 'bat', 'bear', 'bee', 'bird', 'butterfly', 'camel', 'cat', 'cow', 'crab', 'crocodile', 'dog', 'dolphin', 'duck', 'elephant', 'fish', 'frog', 'giraffe', 'horse', 'kangaroo', 'lion', 'monkey', 'mouse', 'octopus', 'panda', 'penguin', 'pig', 'shark', 'sheep', 'snail', 'snake', 'spider', 'squirrel', 'swan', 'tiger', 'whale', 'zebra'];
        // console.log(predictions)
        const sortedPredictions = Array.from(predictions)
            .map((prediction, i) => ({ className: classNames[i], probability: prediction }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 5);
        const resultElement = document.getElementById("result");
        // 해당 결과를 클릭하면 해당 결과의 한글과 영어 소리가 재생됩니다.

        resultElement.innerHTML = sortedPredictions.map(p => `<button onclick="speak('${p.className}'); speak2('${p.className}')">${p.className} (${p.probability.toFixed(4)})</button>`).join(", ");


        // id image에 해당 결과의 이미지가 출력됩니다.

        // const imageElement = document.getElementById("image");
        // // imageElement.src = `images/${sortedPredictions[0].className}.jpg`;
        // // 지금은 테스트 코드이기때문에 doodle-4181783.png를 출력하도록 했습니다.
        // imageElement.src = `images/doodle-4181783.png`;
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