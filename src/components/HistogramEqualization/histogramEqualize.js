import { convertRGBtoHSI } from "./RGBtoHSI";
import { convertHSItoRGB } from "./HSItoRGB";
import getPixelPos from "./getPixelPos";

const computeHistogram  = (originalPixels, size) => {
    let iHist = new Array(256);
    iHist.fill(0);
    
    for(let row = 0; row < size; ++row){
        for(let col = 0; col < size; ++col){
            let p = getPixelPos(row, col, size);
            ++iHist[originalPixels[p + 2]];
        }
    }

    return iHist;
}

const computeCumulativeFrequency = (size, iHist) => {
    const totalPixels = size * size;
    let newILevels = new Array(256);
    newILevels.fill(0);
    let iCurr = 0;
    for(let i = 0; i < 256; ++i){
        iCurr += iHist[i];
        newILevels[i] = Math.round((iCurr * 255) / totalPixels);
    }
    return newILevels;
}

const equalize = (pixels, newILevels, size) => {
    for(let row = 0; row < size; ++row){
        for(let col = 0; col < size; ++col){
            let p = getPixelPos(row, col, size);
            pixels[p + 2] = newILevels[pixels[p + 2]];
        }
    }
}

export const histogramEqualize = (imageData, size) => {
    const newImageData = new ImageData(new Uint8ClampedArray(imageData.data), size, size);
    const pixels = newImageData.data;
    const originalPixels = imageData.data;
    convertRGBtoHSI(pixels, size);
    let iHist = computeHistogram(originalPixels, size);
    let newILevels = computeCumulativeFrequency(size, iHist);
    equalize(pixels, newILevels, size);
    convertHSItoRGB(pixels, size);
    return newImageData;
}