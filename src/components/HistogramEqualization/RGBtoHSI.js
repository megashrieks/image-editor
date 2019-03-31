import getPixelPos from "./getPixelPos";

const computeH = (r, g, b, delta) => {
    // method 1
    // let numerator = 0.5 * ((r - g) + (r - b));
    // let denominator = Math.sqrt(((r - g) * (r - g)) + ((r - b) * (g - b)));
    // let theta = Math.acos(numerator / denominator) * (180 / Math.PI);
    // console.log(numerator, denominator, theta);
    // if(b <= g)
    //     return theta;
    // else
    //     return (360 - theta);

    // method 2
    // if(delta === 0)
    //     return 0;
    // else if(max === r) 
    //     return (60 * (((g - b) / delta) % 6));
    // else if(max === g)
    //     return (60 * ((((b - r) / delta)) + 2));
    // else if(max === b)
    //     return (60 * ((((r - g) / delta)) + 4));

    // method 3
    if(delta === 0)
        return 0;
    else {
        let numerator = 0.5 * ((r - g) + (r - b));
        let denominator = Math.sqrt(((r - g) * (r - g)) + ((r - b) * (g - b)));
        let theta = Math.acos(numerator / denominator) * (180 / Math.PI);
        if(b <= g)
            return theta;
        else
            return (360 - theta);
    }
}

const computeI = (r, g, b) => {
    return ((r + g + b) / 3);
}

const computeS = (r, g, b, min) => {
    // return (1 - ((3 * min) / (r + g + b)));
    return (1 - (min / computeI(r, g, b)));
}

export const convertRGBtoHSI = (pixels, size) => {
    for(let row = 0; row < size; ++row){
        for(let col = 0; col < size; ++col){
            let p = getPixelPos(row, col, size);
            let r = pixels[p] / 255;
            let g = pixels[p + 1] / 255;
            let b = pixels[p + 2] / 255;
            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);
            let delta = max - min;
            let h = computeH(r, g, b, delta);
            let s = computeS(r, g, b, min) * 255;
            let i = computeI(r, g, b) * 255;
            pixels[p] = h;
            pixels[p + 1] = s;
            pixels[p + 2] = i;
        }
    }
    // console.log(computeH(10 / 255, 70 / 255, 20 / 255, 10 / 255), computeS(10 / 255, 70 / 255, 20 / 255, 10 / 255), computeI(10 / 255, 70 / 255, 20 / 255));
}