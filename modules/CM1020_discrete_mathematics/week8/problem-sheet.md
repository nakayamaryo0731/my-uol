### Question 1 — Predicate Logic Evaluation

Let \( P(x) \) be the predicate \( x^2 > x \), with domain \( \mathbb{R} \).

Evaluate:

1. \( P(2) \): \( 2^2 > 2 \Rightarrow 4 > 2 \) → ✅ **True**
2. \( P\left(\frac{1}{2}\right) \): \( \frac{1}{4} > \frac{1}{2} \) → ❌ **False**
3. \( P\left(-\frac{1}{2}\right) \): \( \frac{1}{4} > -\frac{1}{2} \) → ✅ **True**

### Question 2 — Logical Evaluation

Let \( P(x) = x^2 > x \), with domain \( \mathbb{R} \).

Known values:
- \( P(2) = \text{True} \)
- \( P\left(\frac{1}{2}\right) = \text{False} \)

Evaluations:
1. \( P(2) \wedge P\left(\frac{1}{2}\right) = \text{False} \)
2. \( P(2) \vee P\left(\frac{1}{2}\right) = \text{True} \)

### Question 3 — Universal Quantifier & Truth Analysis

#### 1. Statement:  
Let \( D = \{1, 2, 3, 4\} \). Consider the statement:  
\[
\forall x \in D, x^2 \geq x
\]

**Natural Language Reading:**  
"For all values of \( x \) in the set \( D = \{1, 2, 3, 4\} \), the square of \( x \) is greater than or equal to \( x \)."

**Verification:**  
Check each \( x \in D \):

- \( x = 1 \): \( 1^2 = 1 \geq 1 \) ✅  
- \( x = 2 \): \( 2^2 = 4 \geq 2 \) ✅  
- \( x = 3 \): \( 3^2 = 9 \geq 3 \) ✅  
- \( x = 4 \): \( 4^2 = 16 \geq 4 \) ✅  

**Conclusion:**  
The statement is **true**.

---

#### 2. Statement:  
\[
\forall x \in \mathbb{R}, x^2 \geq x
\]

**To Prove False:**  
Find a counterexample in \( \mathbb{R} \) such that \( x^2 < x \).

**Counterexample:**  
Let \( x = \frac{1}{2} \)

- \( \left(\frac{1}{2}\right)^2 = \frac{1}{4} < \frac{1}{2} \) ❌

**Conclusion:**  
Because a counterexample exists, the universal statement is **false**.

### Question 4 — Existential Quantifiers and Truth

#### 1. Statement:
\[
\exists n \in \mathbb{Z}^+ \text{ such that } n^2 = n
\]

**Reading:**  
"There exists a positive integer \( n \) such that \( n^2 = n \)."

**Verification:**
- Try \( n = 1 \): \( 1^2 = 1 \) ✅

**Conclusion:** True

---

#### 2. Statement:
Let \( E = \{5, 6, 7, 8\} \), and consider:

\[
\exists n \in E,\ n^2 = n
\]

**Verification:**

- \( 5^2 = 25 \neq 5 \) ❌  
- \( 6^2 = 36 \neq 6 \) ❌  
- \( 7^2 = 49 \neq 7 \) ❌  
- \( 8^2 = 64 \neq 8 \) ❌  

**Conclusion:** False

### Question 5 — Formal Logic Translation

#### 1. All triangles have three sides.

**Natural language meaning:**  
Every object that is a triangle must have three sides.

**Formal expression:**  
\[
\forall x\ ( \text{Triangle}(x) \rightarrow \text{HasThreeSides}(x) )
\]

---

#### 2. No dogs have wings.

**Natural language meaning:**  
There does not exist a dog that has wings.

**Formal expression:**  
\[
\forall x\ ( \text{Dog}(x) \rightarrow \neg \text{HasWings}(x) )
\]

（または同等に：）  
\[
\neg \exists x\ ( \text{Dog}(x) \land \text{HasWings}(x) )
\]

---

#### 3. Some programs are structured.

**Natural language meaning:**  
There exists at least one program that is structured.

**Formal expression:**  
\[
\exists x\ ( \text{Program}(x) \land \text{Structured}(x) )
\]

### Question 6 — Rewrite in the form of: ∀______ if ______ then ______  

#### 1. If a real number is an integer, then it is a rational number.

**Formal statement:**  
\[
\forall x\ (\text{RealNumber}(x) \rightarrow (\text{Integer}(x) \rightarrow \text{Rational}(x)))
\]

または指定形式で書くと：  
**"For all real numbers \( x \), if \( x \) is an integer, then \( x \) is a rational number."**

---

#### 2. All bytes have eight bits.

**Formal statement:**  
\[
\forall x\ (\text{Byte}(x) \rightarrow \text{HasEightBits}(x))
\]

**"For all \( x \), if \( x \) is a byte, then \( x \) has eight bits."**

---

#### 3. No fire trucks are green.

**Formal statement (contrapositive of existence):**  
\[
\forall x\ (\text{FireTruck}(x) \rightarrow \neg \text{Green}(x))
\]

**"For all \( x \), if \( x \) is a fire truck, then \( x \) is not green."**

### Question 7 — Formal Predicate Logic

**Natural Language Statement:**  
"There is an integer that is both prime and even."

**Formal Predicate Logic Expression:**  
\[
\exists n\ (\text{Prime}(n) \land \text{Even}(n))
\]

**Explanation:**  
This expression states that there exists some integer \( n \) such that \( n \) is both prime and even.

### Question 8 — Truth Value of Predicate Logic Expressions

Let \( P(x, y) : y < x^2 \), with \( x, y \in \mathbb{R} \)

---

1. \( (\forall x)(\forall y)\ P(x, y) \)  
**False**  
Counterexample: \( x = 1, y = 2 \) → \( 2 < 1 \) is false

---

2. \( (\exists x)(\exists y)\ P(x, y) \)  
**True**  
Example: \( x = 2, y = 3 \) → \( 3 < 4 \)

---

3. \( (\forall y)(\exists x)\ P(x, y) \)  
**True**  
For any \( y \), choose \( x \) such that \( x^2 > y \)

---

4. \( (\exists x)(\forall y)\ P(x, y) \)  
**False**  
No fixed \( x \) such that \( x^2 > y \) for all real \( y \)

### Question 9 — Translate Predicate Logic to Words

Let \( P(x) \): “\( x \) is taking a discrete mathematics course”  
Domain: all students

---

1. \( \forall x\ P(x) \)  
**English:** Every student is taking a discrete mathematics course.

---

2. \( \forall x\ \neg P(x) \)  
**English:** No student is taking a discrete mathematics course.  
（= Every student is **not** taking the course）

---

3. \( \neg (\forall x\ P(x)) \)  
**English:** Not all students are taking a discrete mathematics course.  
（= At least one student is **not** taking the course）

---

4. \( \exists x\ P(x) \)  
**English:** There exists at least one student who is taking a discrete mathematics course.  
（= Some student is taking the course）

---

5. \( \exists x\ \neg P(x) \)  
**English:** There exists at least one student who is **not** taking a discrete mathematics course.

---

6. \( \neg (\exists x\ P(x)) \)  
**English:** No student is taking a discrete mathematics course.  
（= There does **not exist** any student taking the

### Question 10 — Translate Predicate Logic to Words

Let:
- \( P(x) \): “\( x \) is a professional athlete”
- \( Q(x) \): “\( x \) plays football”

---

1. \( \forall x (P(x) \rightarrow Q(x)) \)

**English:**  
"All professional athletes play football."

**Explanation:**  
For every person \( x \), if \( x \) is a professional athlete, then \( x \) plays football.

---

2. \( \exists x (Q(x) \rightarrow P(x)) \)

**English:**  
"There is someone such that if they play football, then they are a professional athlete."

**Explanation:**  
There exists at least one person for whom playing football implies being a professional athlete.  
(⚠️ Note: this does **not** mean all football players are professionals — just one such person exists.)

---

3. \( \forall x (P(x) \land Q(x)) \)

**English:**  
"Every person is a professional athlete and plays football."

**Explanation:**  
For all people \( x \), \( x \) is both a professional athlete **and** plays football.  
(This is a very strong statement — it means **everyone** fits both conditions.)

### Question 11 — Write the Negation (Symbolically & in Words)

#### 1. Original: \( \forall x (P(x) \rightarrow Q(x)) \)

**Negation (symbolically):**  
\[
\neg \forall x (P(x) \rightarrow Q(x)) \equiv \exists x \neg (P(x) \rightarrow Q(x)) \equiv \exists x (P(x) \land \neg Q(x))
\]

**In words:**  
"There is at least one person who is a professional athlete and does not play football."

---

#### 2. Original: \( \exists x (Q(x) \rightarrow P(x)) \)

**Negation (symbolically):**  
\[
\neg \exists x (Q(x) \rightarrow P(x)) \equiv \forall x \neg (Q(x) \rightarrow P(x)) \equiv \forall x (Q(x) \land \neg P(x))
\]

**In words:**  
"Every person plays football and is not a professional athlete."

---

#### 3. Original: \( \forall x (P(x) \land Q(x)) \)

**Negation (symbolically):**  
\[
\neg \forall x (P(x) \land Q(x)) \equiv \exists x \neg (P(x) \land Q(x)) \equiv \exists x (\neg P(x) \lor \neg Q(x))
\]

**In words:**  
"There is at least one person who is not a professional athlete or does not play football."

### Question 12 — Formalization and Logical Variants

#### 1. Formalization

**Original Statement:**  
"If a real number is greater than 2, then its square is greater than 4."

**Formal (using quantifiers and logical operators):**

\[
\forall x \in \mathbb{R},\ P(x) \rightarrow Q(x)
\quad \text{or} \quad
\forall x \in \mathbb{R},\ x > 2 \rightarrow x^2 > 4
\]

---

#### 2. Contrapositive, Converse, Inverse

##### ✅ Contrapositive

**Formal:**  
\[
\forall x \in \mathbb{R},\ \neg Q(x) \rightarrow \neg P(x)
\quad \text{or} \quad
x^2 \leq 4 \rightarrow x \leq 2
\]

**Informal:**  
"If a number's square is not greater than 4, then the number is not greater than 2."

---

##### 🔁 Converse

**Formal:**  
\[
\forall x \in \mathbb{R},\ Q(x) \rightarrow P(x)
\quad \text{or} \quad
x^2 > 4 \rightarrow x > 2
\]

**Informal:**  
"If a number’s square is greater than 4, then the number is greater than 2."  
❗Note: This is **not always true**, because \( x = -3 \) satisfies \( x^2 > 4 \) but \( x \not> 2 \)

---

##### 🔄 Inverse

**Formal:**  
\[
\forall x \in \mathbb{R},\ \neg P(x) \rightarrow \neg Q(x)
\quad \text{or} \quad
x \leq 2 \rightarrow x^2 \leq 4
\]

**Informal:**  
"If a number is not greater than 2, then its square is not greater than 4."  
✅ This is **true**, but not logically equivalent to the original — only the contrapositive is.

### Question 13 — Natural Language and Negation

---

#### (a)
- **Original**: Every color is the color of some animal.
- **Negation**: There is a color that no animal has.

---

#### (b)
- **Original**: There is a book that every person has read.
- **Negation**: Every book has at least one person who has not read it.

---

#### (c)
- **Original**: Every odd integer can be written as 2k + 1.
- **Negation**: There is an odd integer that cannot be written as 2k + 1.

---

#### (d)
- **Original**: Every real number has an additive inverse.
- **Negation**: There is a real number that has no additive inverse.

### Question 14 — Validity of Arguments

**Given statement:**  
"No good cars are cheap"  
Formalized as:  
\[
\forall x,\ P(x) \rightarrow \neg Q(x)
\]
Where:
- \( P(x) \): \( x \) is a good car
- \( Q(x) \): \( x \) is cheap

---

#### 1. Argument:

- Premise: A Ferrari is a good car → \( P(\text{Ferrari}) \)
- From the statement: \( P(x) \rightarrow \neg Q(x) \)
- Conclusion: A Ferrari is not cheap → \( \neg Q(\text{Ferrari}) \)

**Form:**  
Modus Ponens → Valid

✅ **Conclusion: Valid**

---

#### 2. Argument:

- Premise: A BMW is not cheap → \( \neg Q(\text{BMW}) \)
- From the statement: \( P(x) \rightarrow \neg Q(x) \)
- Conclusion: A BMW is not a good car → \( \neg P(\text{BMW}) \)

**Form:**  
Fallacy (converse error) → Invalid

❌ **Conclusion: Invalid**

### Question 15 — Symbolic Translation and Validity Check

#### Predicates:
- \( C(x) \): \( x \) is in this class
- \( B(x) \): \( x \) has read the book
- \( P(x) \): \( x \) has passed the first exam

---

### Premises:

1. A student in this class has not read the book  
\[
\exists x (C(x) \land \neg B(x))
\]

2. Everyone in this class passed the first exam  
\[
\forall x (C(x) \rightarrow P(x))
\]

---

### Conclusion:

Someone who passed the first exam has not read the book  
\[
\exists x (P(x) \land \neg B(x))
\]

---

### Validity Justification:

Let \( x \) be such that \( C(x) \land \neg B(x) \).  
From (2): \( C(x) \rightarrow P(x) \) ⇒ \( P(x) \) must hold.  
Now we have both: \( P(x) \) and \( \neg B(x) \) ⇒ \( P(x) \land \neg B(x) \)

✅ Therefore, the argument is **valid**.
