import fs from 'fs';
import readline from 'readline';

type NumberWordMapping = Record<'zero' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine', number>;

// Create a readline interface
const rl = readline.createInterface({
    input: fs.createReadStream('day1.txt'),
    output: process.stdout,
    terminal: false
});

const numberWordMap: NumberWordMapping = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9
};

let sum = 0;
const regex = /(zero|one|two|three|four|five|six|seven|eight|nine|\d)/gi;
interface Result {
    Line: string;
    Result: number;
    CurrentSum: number;
}

const results: Result[] = [];

rl.on('line', (line: string) => {
    const matches = line.match(regex);
    if (matches && matches.length > 0) {
        const firstNum = wordToNum(matches[0]);
        const lastNum = wordToNum(matches[matches.length - 1]);
        const result = parseInt(`${firstNum}${lastNum}`, 10);
        sum += result;
        results.push({ Line: line, Result: result, CurrentSum: sum });
    }
});

rl.on('close', () => {
    console.table(results);
    console.log('Finished reading file.');
    console.log('Final Result = ', sum);
});

function wordToNum(word: string): number {
    return numberWordMap[word.toLowerCase() as keyof NumberWordMapping] ?? parseInt(word, 10);
}