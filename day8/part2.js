const fs = require('fs');

const splitAndSortDigitStr = (str) =>
    str
        .split(' ')
        .map(str => [...str]
            .sort()
            .join(''));

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '')
        .map(line => {
            const [digitStr, outputStr] = line.split(' | ');
            return {
                digits: splitAndSortDigitStr(digitStr),
                output: splitAndSortDigitStr(outputStr)
            }
        });

    return inputArr;
}


const findUniqLengthMap = (digits) => {
    const lengthMap = {
        '2': 1,
        '4': 4,
        '3': 7,
        '7': 8
    };

    const mappings = {};

    const remainingDigits = digits.filter(digit => {
        const lengthMapping = lengthMap[digit.length];
        if (lengthMapping) {
            mappings[lengthMapping] = digit;
        }
        return !lengthMapping;
    });
    return [mappings, remainingDigits];
}


const intersecLength = (str1, str2) => {
    const set2 = new Set(str2);
    const intersection = [...str1].filter(val => set2.has(val));
    return intersection.length;
}

const findSixSegmentMap = (mappings, remainingDigits) => {
    const one = mappings['1'];
    const four = mappings['4'];
    const seven = mappings['7'];

    const sixSegmentDigits = remainingDigits.filter(digit => digit.length === 6);
    const zero = sixSegmentDigits.find(digit =>
        intersecLength(digit, one) === 2 &&
        intersecLength(digit, four) === 3 &&
        intersecLength(digit, seven) === 3);

    const nine = sixSegmentDigits.find(digit =>
        digit !== zero &&
        intersecLength(digit, one) === 2);

    const six = sixSegmentDigits.find(digit => digit !== zero && digit !== nine);

    const newMappings = {
        ...mappings,
        '0': zero,
        '9': nine,
        '6': six
    }

    const newRemainingDigits = remainingDigits.filter(digit => digit.length !== 6);

    return [newMappings, newRemainingDigits];
};

const findFiveSegmentMap = (mappings, remainingDigits) => {
    const one = mappings['1'];
    const three = remainingDigits.find(digit => intersecLength(digit, one) === 2);

    const six = mappings['6'];
    const five = remainingDigits.find(digit =>
        digit !== three &&
        intersecLength(digit, six) === 5);

    const two = remainingDigits.find(digit =>
        digit !== three &&
        digit !== five);


    return {
        ...mappings,
        '3': three,
        '5': five,
        '2': two
    }

}

const invertMap = (map) => {
    const inverseMap = {};
    for (const [key, val] of Object.entries(map)) {
        inverseMap[val] = key;
    }
    return inverseMap;
}


const decodeOutput = (output, mapping) => {
    const digitMap = invertMap(mapping);
    const outputStr = output.reduce((totalStr, currStr) => totalStr + digitMap[currStr], '');
    return parseInt(outputStr);
}

const findSolution = (input) => {
    let total = 0;
    input.forEach(entry => {
        let [mappings, remainingDigits] = findUniqLengthMap(entry.digits);
        [mappings, remainingDigits] = findSixSegmentMap(mappings, remainingDigits);
        mappings = findFiveSegmentMap(mappings, remainingDigits);
        total += decodeOutput(entry.output, mappings);
    });
    return total;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();