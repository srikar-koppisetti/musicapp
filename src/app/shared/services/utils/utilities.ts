export function chunk(inputArray: any[], chunkSize: number): any[] {
    let index = 0;
    const arrayLength = inputArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
        const myChunk = inputArray.slice(index, index + chunkSize);
        tempArray.push(myChunk);
    }

    return tempArray;
}
