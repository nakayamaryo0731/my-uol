# Poetry Assistant - Demo Video Script

**Target Duration: 3-4 minutes**

---

## Introduction (30 seconds)

"Hello. I'm presenting my Poetry Assistant. This tool helps poets find rhyming words.

The problem is simple. Given a word like 'cat', find all words that rhyme with it. For example, 'bat', 'hat', 'rat', and 'acrobat'.

My solution uses arrays and linear search. These are fundamental data structures covered in this course."

---

## Algorithm Overview (45 seconds)

"Let me explain how the algorithm works.

First, an array of suffix-word pairs is built. For each word, all possible endings are extracted. For example, from 'cat', three endings are extracted: 't', 'at', and 'cat' itself. Each ending is stored with the original word.

When a user searches for rhymes, linear search finds all matching pairs. Linear search is also used to remove duplicates.

The key idea is simple. The data is organized once at startup. Then it is searched for each query."

---

## Data Structures (30 seconds)

"Two main components are used. Both are covered in this course.

The first is Arrays. Arrays store the suffix-word pairs and the results. This data structure allows sequential access.

The second is Linear Search. It finds matching suffixes and checks for duplicates. This algorithm scans the array element by element."

---

## Live Demo (1.5 minutes)

"Now let me demonstrate the program. As you can see, the source code has comments that correspond to each line of the pseudocode. I'll type 'node rhyme-finder.js'.

(実行中) The program loads over 200,000 words. It builds about 2 million suffix-word pairs.

Let's try 'cat'.

(結果表示後) We get over 500 rhymes. These include 'bat', 'hat', 'flat', and 'acrobat'. The search took about 20 milliseconds.

Now let's try 'night'.

(結果表示後) We get 'light', 'bright', 'sight', and 'midnight'.

Let's try 'love'.

(結果表示後) We see many matches. But 'move' and 'prove' appear here. They don't actually rhyme with 'love'. This is because the algorithm matches by spelling, not pronunciation."

---

## Limitations and Improvements (30 seconds)

"As I showed, the main limitation is spelling-based matching. A phonetic algorithm could fix this.

Another limitation is linear search. It is slower than hash-based methods.

Other improvements include ranking results by quality, or filtering by word frequency.

Thank you for watching."

---

## Notes for Recording

- Speak clearly and at a moderate pace
- Have terminal ready with the command prepared
- Test the demo words beforehand
- Keep total time under 5 minutes
- Resolution: 720p or higher
- Format: MP4
