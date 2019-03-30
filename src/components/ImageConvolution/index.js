const getPixelPos = (x, y, width) => {
    return ((y * width) + x) * 4;
}

export const convolute = (imageData, kernel, size) => {
    const newImageData = new ImageData(new Uint8ClampedArray(imageData.data), size, size);
    const pixels = newImageData.data;
    const originalPixels = imageData.data;

    const klen = kernel[0].length;
    const halfKLen = klen >> 1;
    let i, r, g, b, tempRow, tempCol;

    for(let row = 0; row < size; ++row){
        for(let col = 0; col < size; ++col){
            i = getPixelPos(col, row, size);
            r = g = b = 0;
            for(let kr = row - halfKLen, m = 0; kr <= (row + halfKLen); ++kr, ++m){
                for(let kc = col - halfKLen, n = 0; kc <= (col + halfKLen); ++kc, ++n){
                    tempRow = kr;
                    tempCol = kc;
                    if(tempRow < 0)
                        tempRow = 0;
                    if(tempCol < 0)
                        tempCol = 0;
                    if(tempRow > (size - 1))
                        tempRow = size - 1;
                    if(tempCol > (size - 1))
                        tempCol = size - 1;

                    let tempPos = getPixelPos(tempCol, tempRow, size);
                    r += originalPixels[tempPos] * kernel[m][n];
                    g += originalPixels[tempPos + 1] * kernel[m][n];
                    b += originalPixels[tempPos + 2] * kernel[m][n];
                }
            }
            pixels[i] = r;
            pixels[i + 1] = g;
            pixels[i + 2] = b;
        }
    }
    return newImageData;
}