export function getMapFromArrayByPropertyKey(origArray, propertyKey) {
    
    if (!origArray || !origArray.length) return;

    const mappedObject = {};

    origArray.forEach((arrayMember) => {
        const arrayMemberKey = arrayMember[propertyKey];
        if (arrayMemberKey) {
            mappedObject[arrayMemberKey] = arrayMember;
        }
    })

    return mappedObject;
}

export function getSortedArrayFromMap(origMap, propertyKey) {
    if (!origMap || typeof(origMap) !== 'object') return;

    const arrayOutput = Object.keys(origMap).map((mapKey) => origMap[mapKey]);

    arrayOutput.sort((arrMemberA, arrMemberB) => {
        const propertyA = arrMemberA[propertyKey];
        const propertyB = arrMemberB[propertyKey];

        return (propertyA < propertyB) ? -1 : (propertyA > propertyB) ? 1 : 0;
    });

    return arrayOutput;
}