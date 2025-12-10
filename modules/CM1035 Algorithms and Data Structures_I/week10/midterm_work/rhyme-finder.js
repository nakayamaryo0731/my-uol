const fs = require('fs');
const readline = require('readline');

/**
 * BUILD-SUFFIX-INDEX(words)
 * Builds an array of [suffix, word] pairs from the word list.
 *
 * Pseudocode:
 *  1  suffixPairs = new Array
 *  2  for i = 1 to words.length
 *  3      word = words[i]
 *  4      for j = 1 to word.length
 *  5          suffix = SUBSTRING(word, word.length - j + 1, word.length)
 *  6          APPEND(suffixPairs, [suffix, word])
 *  7  return suffixPairs
 */
function buildSuffixIndex(words) {
    // Line 1: Initialize empty array
    const suffixPairs = [];

    // Line 2-3: Loop through each word
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // Line 4-6: Extract all suffixes and store as pairs
        for (let j = 1; j <= word.length; j++) {
            // Line 5: Extract suffix (ending) of length j
            const suffix = word.substring(word.length - j);
            // Line 6: Append [suffix, word] pair to array
            suffixPairs.push([suffix, word]);
        }
    }

    // Line 7: Return the suffix pairs array
    return suffixPairs;
}

/**
 * FIND-RHYMES(suffixPairs, inputWord, minSuffixLength)
 * Finds all words that rhyme with the input word using linear search.
 *
 * Pseudocode:
 *  1  results = new Array
 *  2  for j = minSuffixLength to inputWord.length
 *  3      targetSuffix = SUBSTRING(inputWord, inputWord.length - j + 1, inputWord.length)
 *  4      for i = 1 to suffixPairs.length
 *  5          [suffix, word] = suffixPairs[i]
 *  6          if suffix == targetSuffix and word ≠ inputWord
 *  7              if not LINEAR-SEARCH(results, word)
 *  8                  APPEND(results, word)
 *  9  return results
 */
function findRhymes(suffixPairs, inputWord, minSuffixLength = 2) {
    // Line 1: Initialize empty results array
    const results = [];
    const normalizedInput = inputWord.toLowerCase();

    // Line 2: Loop through each suffix length
    for (let j = minSuffixLength; j <= normalizedInput.length; j++) {
        // Line 3: Extract target suffix from input word
        const targetSuffix = normalizedInput.substring(normalizedInput.length - j);

        // Line 4-5: Linear search through all suffix pairs
        for (let i = 0; i < suffixPairs.length; i++) {
            const [suffix, word] = suffixPairs[i];

            // Line 6: Check if suffix matches and word is not the input
            if (suffix === targetSuffix && word !== normalizedInput) {
                // Line 7: Use LINEAR-SEARCH to check for duplicates
                let isDuplicate = false;
                for (let k = 0; k < results.length; k++) {
                    if (results[k] === word) {
                        isDuplicate = true;
                        break;
                    }
                }
                // Line 8: If not duplicate, append to results
                if (!isDuplicate) {
                    results.push(word);
                }
            }
        }
    }

    // Line 9: Return results array
    return results;
}

/**
 * LINEAR-SEARCH(A, target)
 * Note: This is implemented inline in findRhymes() above.
 *
 * Pseudocode:
 *  1  for i = 1 to A.length
 *  2      if A[i] == target
 *  3          return true
 *  4  return false
 */

// Load words from file
function loadWords(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split('\n').filter(word => word.trim().length > 0);
}

// Main function
async function main() {
    const wordListPath = './wordlist.txt';

    console.log('Poetry Assistant - Rhyme Finder');
    console.log('Using Arrays and Linear Search');
    console.log('================================\n');
    console.log('Loading word list...');

    const words = loadWords(wordListPath);
    console.log(`Loaded ${words.length} words.\n`);

    console.log('Building suffix index (Array of pairs)...');
    const startBuild = Date.now();
    const suffixPairs = buildSuffixIndex(words);
    const buildTime = Date.now() - startBuild;
    console.log(`Index built: ${suffixPairs.length} suffix-word pairs`);
    console.log(`Build time: ${buildTime}ms\n`);

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

            console.log('Searching...');
            const startSearch = Date.now();
            const rhymes = findRhymes(suffixPairs, trimmedInput);
            const searchTime = Date.now() - startSearch;

            if (rhymes.length === 0) {
                console.log(`\nNo rhymes found for "${trimmedInput}".`);
            } else {
                const sortedRhymes = rhymes.sort();
                console.log(`\nFound ${rhymes.length} rhymes for "${trimmedInput}":`);
                console.log(sortedRhymes.join(', '));
            }
            console.log(`Search time: ${searchTime}ms\n`);

            askQuestion();
        });
    };

    askQuestion();
}

main();
