# Poetry Assistant - Design Document

## 1. Overview

This poetry assistant helps poets find rhyming words. Given an input word, the assistant returns a list of words that rhyme with it based on matching word endings (suffixes).

**Example:**
- Input: `cat`
- Output: `bat, hat, rat, acrobat, thermostat, ...`

---

## 2. Original Algorithm

### Rhyme Finding Algorithm

This algorithm was designed from scratch without using any existing rhyme-finding libraries or APIs. The suffix-matching approach is my own design choice for finding rhyming words.

The algorithm finds rhymes by matching the suffix (ending) of the input word with other words in the dictionary.

**How it works (non-technical explanation):**

1. When the program starts, it reads all words from the word list and creates pairs of (suffix, word) for each word. For example, from "cat", it creates pairs: ("t", "cat"), ("at", "cat"), ("cat", "cat").

2. When a user enters a word like "cat", the program looks at different possible endings of that word: "t", "at", "cat".

3. For each ending, the program searches through all the suffix-word pairs to find words that share the same ending.

4. The program combines these results, removes duplicates, and returns them to the user, excluding the original input word.

This approach uses only arrays and linear search, which are fundamental data structures covered in this course.

---

## 3. Pseudocode

Following the conventions of Cormen et al., Chapter 2:

### 3.1 Build Suffix Index

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

### 3.2 Find Rhymes

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

### 3.3 Linear Search (for duplicate checking)

```
LINEAR-SEARCH(A, target)
 1  for i = 1 to A.length
 2      if A[i] == target
 3          return true
 4  return false
```

---

## 4. Data Structures

### 4.1 Array (Dynamic Array)

**Structure:** Ordered list used for storing suffix-word pairs and results.

**Suffix-word pairs array:**
```
[
    ["t", "cat"],
    ["at", "cat"],
    ["cat", "cat"],
    ["t", "bat"],
    ["at", "bat"],
    ["bat", "bat"],
    ...
]
```

**Why suitable:**
- **Covered in course:** Arrays are a fundamental data structure taught in this course.
- **Simple storage:** Holds all suffix-word pairs in a straightforward manner.
- **Easy iteration:** Allows sequential processing using linear search.
- **Dynamic sizing:** Can grow as needed when building the index.

### 4.2 Linear Search

**Algorithm:** Sequential search through an array to find a target value.

**Why suitable:**
- **Covered in course:** Linear search is a fundamental algorithm taught in this course.
- **Simple implementation:** Easy to understand and implement correctly.
- **Works with unsorted data:** No need to sort the suffix pairs beforehand.

---

## 5. Time and Space Complexity

### Time Complexity

- **Preprocessing (Build Index):** O(n × m) where n = number of words, m = average word length
- **Query (Find Rhymes):** O(m × p × r) where m = input word length, p = number of suffix pairs, r = number of results (for duplicate checking)

### Space Complexity

- **Suffix Pairs Array:** O(n × m) as each word contributes m suffix-word pairs

---

## 6. Program Flow

```
1. Load word list from file
2. Build suffix pairs array (preprocessing)
3. Accept user input
4. Find rhymes using linear search
5. Display results
6. Repeat from step 3 until user exits
```

---

## 7. Limitations and Possible Improvements

### Current Limitations

1. **Spelling-based rhymes only:** The algorithm matches word endings by spelling, not by pronunciation. Words like "love" and "move" look similar but don't rhyme.

2. **No ranking:** Results are not ranked by rhyme quality (perfect rhyme vs. near rhyme).

3. **Large result sets:** Common suffixes like "-ing" may return thousands of matches.

4. **Linear search overhead:** Using linear search for both finding rhymes and checking duplicates adds overhead compared to hash-based approaches.

### Possible Improvements

1. **Phonetic matching:** Use a phonetic algorithm (like Soundex or CMU Pronouncing Dictionary) to find true rhymes based on pronunciation.

2. **Result ranking:** Rank results by suffix length (longer matches = better rhymes) or word frequency.

3. **Result limiting:** Allow users to specify maximum number of results or filter by word length.

4. **Use hash-based data structures:** For larger datasets, using HashMap and Set would provide O(1) lookup time instead of O(n) linear search.
