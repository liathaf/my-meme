'use strict'

var gCanvas;
var gCtx;

var gRectStrokeColor;
var gElSelectdImg;

function onInit() {

    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.edit-box').style.display = 'none'
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderImgs();

}

function renderCanvas() {
    
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetWidth
    drawImg();
    drawTexts();
    if (getLenLines()) drawRect(gRectStrokeColor);

}


function renderImgs() {

    var imgs = getImgs();
    var strImgHTMLs = imgs.map(img => {
        return `<img class = "img-item ${img.id}" src="${img.url}" onclick="onSelectedImg(${img.id},this)">`
    });
    document.querySelector('.img-gallery').innerHTML = strImgHTMLs.join('');

}



function onSelectedImg(imgId , elImg) {

    gElSelectdImg = elImg;
    updateSelectedImg(findSelectedImg(imgId));
    clearLines();
    clearInputTxt();
    document.querySelector('.img-gallery').style.display = 'none';
    document.querySelector('.canvas-container').style.display = 'block'
    document.querySelector('.edit-box').style.display = 'block'
    renderCanvas();

}


function drawImg() {
    
    gCtx.drawImage(gElSelectdImg, 0, 0, gCanvas.width, gCanvas.height);

}

function drawTexts() {
    var lines = getListOfLines();
    lines.forEach(line => {
        return drawText(line.size, line.fontStyle, line.fontColor, line.stokeColor, line.position.y, line.txt, line.position.x)
    });
}


function drawText(fontSize, fontStyle, fontColor ,  strokeColor, positionYAxis, txt, positionXAxis) {

    gCtx.beginPath();
    gCtx.font = `${fontSize}px ${fontStyle}`;
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'top'
    gCtx.strokeStyle = strokeColor;
    gCtx.lineWidth = 2;
    gCtx.fillStyle = fontColor
    gCtx.fillText(txt, positionXAxis, positionYAxis);
    gCtx.strokeText(txt, positionXAxis, positionYAxis);
    gCtx.closePath();

}

function drawRect(strokeColor = 'rgba(0, 0, 0, 0)') {

    var positionLine = getPositionOfCurrLine();
    var txtWidth = gCtx.measureText(getCuurTextLine()).width;
    var textHeight = getFontSize();
    gCtx.beginPath();
    gCtx.strokeStyle = strokeColor;
    gCtx.lineWidth = 1;
    gCtx.rect(positionLine.x-30, positionLine.y, txtWidth+50, textHeight);
    gCtx.stroke();
    gCtx.closePath();
}

function onUpdateText() {
    
    if (!getLenLines()) {
        addTextBox(gCanvas.height);
        updateRectStrokeColor();
    }
    var text = document.querySelector('[name=txt-box]').value;
    updateText(text);
    renderCanvas();

}

function onChangingSizeFont(elIcon) {

    var fontSizeAdj = (elIcon.classList.contains('increase')) ? 5 : -5;
    updateSizeFont(fontSizeAdj);
    renderCanvas();
}

function onSwitchLine() {

    upadateCurrLine();
    updateRectStrokeColor();
    updateInputText();
    renderCanvas();
}

function onChangeStrokeColor() {

    var elInputColor = document.querySelector('[name=stokeColor]');
    elInputColor.click();

}

function setStrokeColor() {

    var chosenColor = document.querySelector('[name=stokeColor]').value;
    updateStrokeColor(chosenColor);
    renderCanvas();
}

function onChangeFontColor(){

    var elInputColor = document.querySelector('[name=fontColor]');
    elInputColor.click();
}

function setFontColor() {

    var chosenColor = document.querySelector('[name=fontColor]').value;
    updateFontColor(chosenColor);
    renderCanvas();
}


function onAddLine() {

    clearInputTxt();
    addTextBox(gCanvas.height);
    updateRectStrokeColor();
    renderCanvas()
}

function updateInputText() {

    var cuurInputText = getCuurTextLine();
    document.querySelector('[name=txt-box]').value = cuurInputText;
}

function onChangeFont() {

    var selectedFont = document.querySelector('.font-style').value;
    updateFontStyle(selectedFont);
    renderCanvas();

}


function onAlignVartical(elAlignImg) {
    
    var txtWidth = gCtx.measureText(getCuurTextLine()).width;
    var positionXAxis;

    if (elAlignImg.classList.contains('align-left')) {
        positionXAxis =  Math.abs((gCanvas.width*0.1) - (txtWidth/2));
    }
    if (elAlignImg.classList.contains('align-center')) {
        positionXAxis = Math.abs((gCanvas.width/2) - (txtWidth/2)) ;
    }
    if (elAlignImg.classList.contains('align-right')) {
        positionXAxis = Math.abs((gCanvas.width*0.9) - (txtWidth/2)) ;
    }
    updateTxtAlign(positionXAxis);
    renderCanvas();
}

function onDeleteLine() {

    deleteCurrLine();
    upadateCurrLine();
    clearInputTxt()
    renderCanvas();
}



function clearInputTxt() {
    document.querySelector('[name=txt-box]').value = '';
}


function updateRectStrokeColor() {
    gRectStrokeColor = 'white'
}

function onClearRect() {
    gRectStrokeColor = 'rgba(0, 0, 0, 0)'
    renderCanvas();
}

function onMoveLineUpOrDown(elMoveUpDownIcon) {

    var lineAjs = elMoveUpDownIcon.classList.contains('line-up') ? -5 : +5;
    updateLinePositionY(lineAjs);
    renderCanvas();
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}

window.addEventListener('resize', () => {

    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetWidth
    renderCanvas()

});

function onBackToGalery() {

    document.querySelector('.img-gallery').style.display = 'grid';
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.edit-box').style.display = 'none'

}

function onShowMenu() {

    var elNavBerMenu = document.querySelector('.header ul')
    if (elNavBerMenu.classList.contains('open-menu')) elNavBerMenu.classList.remove('open-menu');
    else elNavBerMenu.classList.add('open-menu');

    var elScreen = document.querySelector('.screen')
    if (elScreen.classList.contains('open-menu')) elScreen.classList.remove('open-menu');
    else elScreen.classList.add('open-menu');
}

