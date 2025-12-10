const fs = require('fs');
const readline = require('readline');

// Build suffix index from word list
function buildSuffixIndex(words) {
    const suffixMap = new Map();

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        for (let j = 1; j <= word.length; j++) {
            const suffix = word.substring(word.length - j);
            if (!suffixMap.has(suffix)) {
                suffixMap.set(suffix, []);
            }
            suffixMap.get(suffix).push(word);
        }
    }

    return suffixMap;
}

// Find rhymes for a given word
function findRhymes(suffixMap, inputWord, minSuffixLength = 2) {
    const results = new Set();
    const normalizedInput = inputWord.toLowerCase();

    for (let j = minSuffixLength; j <= normalizedInput.length; j++) {
        const suffix = normalizedInput.substring(normalizedInput.length - j);
        if (suffixMap.has(suffix)) {
            for (const word of suffixMap.get(suffix)) {
                if (word !== normalizedInput) {
                    results.add(word);
                }
            }
        }
    }

    return results;
}

// Load words from file
function loadWords(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split('\n').filter(word => word.trim().length > 0);
}

// Main function
async function main() {
    const wordListPath = './wordlist.txt';

    console.log('Poetry Assistant - Rhyme Finder');
    console.log('================================\n');
    console.log('Loading word list...');

    const words = loadWords(wordListPath);
    console.log(`Loaded ${words.length} words.\n`);

    console.log('Building suffix index...');
    const startBuild = Date.now();
    const suffixMap = buildSuffixIndex(words);
    const buildTime = Date.now() - startBuild;
    console.log(`Index built successfully. Build time: ${buildTime}ms\n`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askQuestion = () => {
        rl.question('Enter a word to find rhymes (or "quit" to exit): ', (input) => {
            const trimmedInput = input.trim().toLowerCase();

            if (trimmedInput === 'quit' || trimmedInput === 'exit') {
                console.log('\nGoodbye!');
                rl.close();
                return;
            }

            if (trimmedInput.length === 0) {
                console.log('Please enter a valid word.\n');
                askQuestion();
                return;
            }

            const startSearch = Date.now();
            const rhymes = findRhymes(suffixMap, trimmedInput);
            const searchTime = Date.now() - startSearch;

            if (rhymes.size === 0) {
                console.log(`\nNo rhymes found for "${trimmedInput}".`);
            } else {
                const rhymeArray = Array.from(rhymes).sort();
                console.log(`\nFound ${rhymes.size} rhymes for "${trimmedInput}":`);
                console.log(rhymeArray.join(', '));
            }
            console.log(`Search time: ${searchTime}ms\n`);

            askQuestion();
        });
    };

    askQuestion();
}

main();
