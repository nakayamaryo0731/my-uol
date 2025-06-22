# Argument Derivation using Rules of Inference

**Given Hypotheses:**

1. \( \forall x (P(x) \lor Q(x)) \)
2. \( \forall x (\neg Q(x) \lor S(x)) \)
3. \( \forall x (R(x) \rightarrow \neg S(x)) \)
4. \( \exists x \neg P(x) \)

**Conclusion to Prove:**

\( \exists x \neg R(x) \)

---

## Proof:

### Step 1: Existential Instantiation from Hypothesis 4

From:
\[
\exists x \neg P(x)
\]
We instantiate with a specific constant \( c \), giving:
\[
\neg P(c)
\]

---

### Step 2: Universal Instantiation from Hypothesis 1

From:
\[
\forall x (P(x) \lor Q(x))
\]
We instantiate \( x = c \):
\[
P(c) \lor Q(c)
\]

---

### Step 3: Disjunctive Syllogism on Step 2 and Step 1

From:
- \( P(c) \lor Q(c) \)
- \( \neg P(c) \)

We conclude:
\[
Q(c)
\]

---

### Step 4: Universal Instantiation from Hypothesis 2

From:
\[
\forall x (\neg Q(x) \lor S(x))
\]
Instantiate \( x = c \):
\[
\neg Q(c) \lor S(c)
\]

---

### Step 5: Disjunctive Syllogism on Step 4 and Step 3

From:
- \( \neg Q(c) \lor S(c) \)
- \( Q(c) \)

We conclude:
\[
S(c)
\]

---

### Step 6: Universal Instantiation from Hypothesis 3

From:
\[
\forall x (R(x) \rightarrow \neg S(x))
\]
Instantiate \( x = c \):
\[
R(c) \rightarrow \neg S(c)
\]

---

### Step 7: Modus Tollens on Step 6 and Step 5

From:
- \( R(c) \rightarrow \neg S(c) \)
- \( S(c) \)

We conclude:
\[
\neg R(c)
\]

---

### Step 8: Existential Generalisation

From:
\[
\neg R(c)
\]
We generalize:
\[
\exists x \neg R(x)
\]

---

### ✅ Conclusion:

\[
\boxed{\exists x \neg R(x)}
\]

is **validly derived** from the hypotheses.
