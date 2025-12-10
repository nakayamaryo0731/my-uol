# CM1035 Midterm - Submission Answers

## Question 1: Essence of Solution (10 pts)

My Poetry Assistant finds rhyming words using a **suffix-based matching algorithm**. Given an input word like "cat", it returns words that share the same ending, such as "bat", "hat", "rat", and "acrobat".

The solution works by:
1. **Preprocessing**: Building an array of suffix-word pairs from all words
2. **Query**: Using linear search to find words that share suffixes with the input word

This approach uses only arrays and linear search, which are fundamental data structures and algorithms covered in this course.

---

## Question 2: Algorithm Explanation (10 pts)

### Originality Statement

This algorithm was designed from scratch without using any existing rhyme-finding libraries or APIs. The suffix-matching approach is my own design choice for finding rhyming words.

### How the Algorithm Works (Non-technical Explanation)

1. When the program starts, it reads all words from a word list and creates pairs of (suffix, word) for each word. For example, from "cat", it creates pairs: ("t", "cat"), ("at", "cat"), ("cat", "cat").

2. When a user enters a word like "cat", the program examines different possible endings of that word: "t", "at", "cat".

3. For each ending, the program searches through all the suffix-word pairs to find words that share the same ending.

4. The program combines these results, removes duplicates using linear search, and returns them to the user, excluding the original input word.

This approach uses only arrays and linear search, which are fundamental data structures covered in this course.

---

## Question 3: Pseudocode (20 pts)

Following the conventions of Cormen et al., Chapter 2:

### Build Suffix Index

```
BUILD-SUFFIX-INDEX(words)
 1  suffixPairs = new Array
 2  for i = 1 to words.length
 3      word = words[i]
 4      for j = 1 to word.length
 5          suffix = SUBSTRING(word, word.length - j + 1, word.length)
 6          APPEND(suffixPairs, [suffix, word])
 7  return suffixPairs
```

### Find Rhymes

```
FIND-RHYMES(suffixPairs, inputWord, minSuffixLength)
 1  results = new Array
 2  for j = minSuffixLength to inputWord.length
 3      targetSuffix = SUBSTRING(inputWord, inputWord.length - j + 1, inputWord.length)
 4      for i = 1 to suffixPairs.length
 5          [suffix, word] = suffixPairs[i]
 6          if suffix == targetSuffix and word ≠ inputWord
 7              if not LINEAR-SEARCH(results, word)
 8                  APPEND(results, word)
 9  return results
```

### Linear Search

```
LINEAR-SEARCH(A, target)
 1  for i = 1 to A.length
 2      if A[i] == target
 3          return true
 4  return false
```

---

## Question 4: Data Structures (20 pts)

### 4.1 Array (Dynamic Array)

**Structure:** Ordered list used for storing suffix-word pairs and results.

```javascript
[
    ["t", "cat"],
    ["at", "cat"],
    ["cat", "cat"],
    ["t", "bat"],
    ["at", "bat"],
    ...
]
```

**Why suitable:**
- **Covered in course:** Arrays are a fundamental data structure taught in this course
- **Simple storage:** Holds all suffix-word pairs in a straightforward manner
- **Easy iteration:** Allows sequential processing using linear search
- **Dynamic sizing:** Can grow as needed when building the index

### 4.2 Linear Search

**Algorithm:** Sequential search through an array to find a target value.

**Why suitable:**
- **Covered in course:** Linear search is a fundamental algorithm taught in this course
- **Simple implementation:** Easy to understand and implement correctly
- **Works with unsorted data:** No need to sort the suffix pairs beforehand

---

## Question 5: JavaScript Implementation (20 pts)

See the attached file: `rhyme-finder.js`

Key implementation details:
- Uses Node.js with `fs` for file reading and `readline` for interactive input
- `buildSuffixIndex()`: Creates array of [suffix, word] pairs
- `findRhymes()`: Uses linear search to find matching words and check for duplicates
- Interactive CLI loop for continuous queries

---

## Question 6: Demo Video (10 pts)

See the attached video file demonstrating:
1. Program startup and word list loading
2. Searching for rhymes with various words (e.g., "cat", "love", "night")
3. Displaying results with search time
4. Exiting the program

---

## Question 7: Defects and Improvements (10 pts)

### Current Defects/Limitations

1. **Spelling-based rhymes only:** The algorithm matches word endings by spelling, not pronunciation. Words like "love" and "move" look similar but don't actually rhyme.

2. **No ranking:** Results are not ranked by rhyme quality (perfect rhyme vs. near rhyme) or usefulness.

3. **Large result sets:** Common suffixes like "-ing" return thousands of matches, which can overwhelm users.

4. **Linear search overhead:** Using linear search for both finding rhymes and checking duplicates adds overhead compared to hash-based approaches.

### Possible Improvements

1. **Phonetic matching:** Use a phonetic algorithm (like Soundex or CMU Pronouncing Dictionary) to find true rhymes based on pronunciation rather than spelling.

2. **Result ranking:** Rank results by suffix length (longer matches = better rhymes) or by word frequency to prioritize common words.

3. **Result limiting:** Allow users to specify a maximum number of results or filter by word length to make the output more manageable.

4. **Use hash-based data structures:** For larger datasets, using HashMap and Set would provide O(1) lookup time instead of O(n) linear search.

---

## Time and Space Complexity

### Time Complexity
- **Preprocessing (Build Index):** O(n × m) where n = number of words, m = average word length
- **Query (Find Rhymes):** O(m × p × r) where m = input word length, p = number of suffix pairs, r = number of results

### Space Complexity
- **Suffix Pairs Array:** O(n × m) as each word contributes m suffix-word pairs
