'use strict'

const COUNT_IMG = 18;

var gNextId = 1;
var gImgs = creatImgs();
var gMeme = creatMeme();


function creatMeme() {
    return {
        selectedImgId: null,
        selectedLineIdx: 0,
        lines: [],
    }
}

function creatImgs() {

    var imgs = [];
    for (var i = 1; i <= COUNT_IMG; i++) {
        imgs.push(creatImg(`img/${i}.jpg`))
    }
    return imgs;

}

function creatImg(imgUrl) {
    return {
        id: gNextId++,
        url: imgUrl,
    }
}


function updateSelectedImg(img) {
    gMeme.selectedImgId = img.id;
}


function getSelectedImgUrl() {

    var img = gImgs.find(img => {
        return gMeme.selectedImgId === img.id;
    });
    return img.url;

}

function addTextBox(canvasHeight) {
    
    var postionOnYAxis = getEmptyPosY(canvasHeight);
    if (gMeme.lines.length) gMeme.selectedLineIdx += 1;
    gMeme.lines.push(
        {
            id: makeId(3),
            txt: '',
            size: 40,
            position: { x: 225, y: postionOnYAxis },
            fontStyle: 'Impact',
            stokeColor: 'black',
            fontColor : 'white',
        }
    );
}

function findSelectedImg(imgId){
    var selectedImg = gImgs.find(img => {
        return imgId===img.id;
    });
    return selectedImg;
}

function updateText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function updateSizeFont(fontSizeAdj) {
    gMeme.lines[gMeme.selectedLineIdx].size += fontSizeAdj
}

function upadateCurrLine() {

    var memeLen = gMeme.lines.length;
    var nextLineIndex = (gMeme.selectedLineIdx) + 1
    gMeme.selectedLineIdx = (nextLineIndex < memeLen) ? nextLineIndex : 0;

}

function updateStrokeColor(color) {
    if (gMeme.lines.length) gMeme.lines[gMeme.selectedLineIdx].stokeColor = color;
}

function updateFontColor(color) {
    if (gMeme.lines.length) gMeme.lines[gMeme.selectedLineIdx].fontColor = color;
}

function updateFontStyle(selectedFontStyle) {
    if (gMeme.lines.length) gMeme.lines[gMeme.selectedLineIdx].fontStyle = selectedFontStyle;
}


function updateTxtAlign(postionXAxis) {
    if (gMeme.lines.length) gMeme.lines[gMeme.selectedLineIdx].position.x = postionXAxis;
}

function deleteCurrLine() {
    var currLineIndex = gMeme.selectedLineIdx;
    gMeme.lines.splice(currLineIndex, 1);

}


function updateLinePositionY(ajsPos) {

    var posYcurrLine = gMeme.lines[gMeme.selectedLineIdx].position.y;
    var newPosYcurrLine = posYcurrLine + ajsPos;
    if (newPosYcurrLine > 55 && newPosYcurrLine < 405) {
        gMeme.lines[gMeme.selectedLineIdx].position.y += ajsPos;
    }
}


function clearLines() {
    gMeme.lines = [];
}

function getImgs(){
    return gImgs;
}


function getSelectdStrokeColor() {
    if (gMeme.lines.length) return gMeme.lines[gMeme.selectedLineIdx].stokeColor;

}

function getPositionOfCurrLine() {
    
    if (gMeme.lines.length) return gMeme.lines[gMeme.selectedLineIdx].position;
}

function getListOfLines() {
    return gMeme.lines;
}

function getCuurTextLine() {

    if (gMeme.lines.length) return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function getLenLines(){

    return gMeme.lines.length;
}

function getFontSize() {

    if (gMeme.lines.length) return gMeme.lines[gMeme.selectedLineIdx].size;
}

function getPosYList(){

    return gMeme.lines.map(line=>{
        return line.position.y;
    })
}

function getEmptyPosY(canvasHeight){

    var positionsY = getPosYList();
    var emptyPosY;
    if (!gMeme.lines.length) return canvasHeight * 0.1;
    if (gMeme.lines.length>4) return (canvasHeight * 0.5) - getFontSize();
    if ((positionsY.includes(canvasHeight * 0.1)) && (positionsY.includes(canvasHeight * 0.8))){
        emptyPosY = (canvasHeight * 0.5) - getFontSize();
    } else if (!(positionsY.includes(canvasHeight * 0.1))) emptyPosY = canvasHeight * 0.1
    else emptyPosY = canvasHeight * 0.8;
    return emptyPosY;
}