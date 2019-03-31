import getPixelPos from "./getPixelPos";

const convertToRadian = (x) => {
    return ((Math.PI / 180) * x);
}

const rgSector = (h, s, i) => {
    let b = i * (1 - s);
    let radianH = convertToRadian(h);
    let radian60_h = convertToRadian(60 - h);
    let r = i * (1 + ((s * Math.cos(radianH)) / (Math.cos(radian60_h))));
    let g = (3 * i) - (r + b);
    return [r * 255, g * 255, b * 255];
}

const gbSector = (h, s, i) => {
    let r = i * (1 - s);
    let radianH_120 = convertToRadian(h - 120);
    let radian60_h_120 = convertToRadian(60 - (h - 120));
    let g = i * (1 + ((s * Math.cos(radianH_120)) / (Math.cos(radian60_h_120))));
    let b = (3 * i) - (r + g);
    return [r * 255, g * 255, b * 255];
}

const brSector = (h, s, i) => {
    let g = i * (1 - s);
    let radianH_240 = convertToRadian(h - 240);
    let radian60_h_240 = convertToRadian(60 - (h - 240));
    let b = i * (1 + ((s * Math.cos(radianH_240)) / (Math.cos(radian60_h_240))));
    let r = (3 * i) - (b + g);
    return [r * 255, g * 255, b * 255];
}

export const convertHSItoRGB = (pixels, size) => {
    for(let row = 0; row < size; ++row){
        for(let col = 0; col < size; ++col){
            let p = getPixelPos(row, col, size);
            let rgb;
            if(pixels[p] >= 0 && pixels[p] < 120)
                rgb = rgSector(pixels[p], pixels[p + 1] / 255, pixels[p + 2] / 255);
            else if(pixels[p] >= 120 && pixels[p] < 240)
                rgb = gbSector(pixels[p], pixels[p + 1] / 255, pixels[p + 2] / 255);
            else if(pixels[p] >= 240 && pixels[p] < 360)
                rgb = brSector(pixels[p], pixels[p + 1] / 255, pixels[p + 2] / 255);
            pixels[p] = rgb[0];
            pixels[p + 1] = rgb[1];
            pixels[p + 2] = rgb[2];
        }
    }
    // console.log(gbSector(128.94827556462707, 0.7, 0.13071895424836602));
    console.log(rgSector(100, 0.33, 0.014));
}