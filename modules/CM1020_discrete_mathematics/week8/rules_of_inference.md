# Rules of Inference

Rules of inference are fundamental logical principles that outline the valid ways to derive conclusions from premises. They serve as the building blocks of logical reasoning, enabling the construction of valid arguments and proofs. Here is a summary of rules of inference we have seen in this topic.

---

## 1. **Modus Ponens**

If \( P \rightarrow Q \) and \( P \) are both true, then \( Q \) is true.

```
P → Q  
P  
∴ Q
```

---

## 2. **Modus Tollens**

If \( P \rightarrow Q \) and \( \neg Q \) are both true, then \( \neg P \) is true.

```
P → Q  
¬Q  
∴ ¬P
```

---

## 3. **Hypothetical Syllogism**

If \( P \rightarrow Q \) and \( Q \rightarrow R \) are both true, then \( P \rightarrow R \) is true.

```
P → Q  
Q → R  
∴ P → R
```

---

## 4. **Disjunctive Syllogism**

If \( P \lor Q \) and \( \neg P \) are both true, then \( Q \) is true.

```
P ∨ Q  
¬P  
∴ Q
```

---

## 5. **Conjunction**

If \( P \) and \( Q \) are both true, then \( P \land Q \) is true.

```
P  
Q  
∴ P ∧ Q
```

---

## 6. **Simplification**

If \( P \land Q \) is true, then \( P \) is true.

```
P ∧ Q  
∴ P
```

---

## 7. **Addition**

If \( P \) is true, then \( P \lor Q \) is true.

```
P  
∴ P ∨ Q
```

---

## 8. **Existential Instantiation**

If \( \exists x\, P(x) \) is true, then \( P(c) \) is true for some particular \( c \).

```
∃x P(x)  
∴ P(c)
```

---

## 9. **Universal Generalisation**

If \( P(c) \) is true for any arbitrary \( c \), then \( \forall x\, P(x) \) is true.

```
P(c) for any arbitrary c  
∴ ∀x P(x)
```

---

## 10. **Existential Generalisation**

If \( P(c) \) is true for some particular \( c \), then \( \exists x\, P(x) \) is true.

```
P(c) for some particular c  
∴ ∃x P(x)
```

---

# Examples

## Example 1

**Given:**

1. \( P \lor Q \)  
2. \( \neg P \)

We need to prove that \( Q \) is true.

**Solution:**

1. \( P \lor Q \) (Premise)  
2. \( \neg P \) (Premise)  
3. \( Q \) (From 1 and 2 using Disjunctive Syllogism)  

\[
∴ Q
\]

---

## Example 2

**Given:**

1. \( \forall x (P(x) \rightarrow R(x)) \)  
2. \( \forall x (Q(x) \rightarrow S(x)) \)  
3. \( P(a) \)  
4. \( Q(a) \)

We need to prove: \( R(a) \land S(a) \)

**Solution:**

5. \( P(a) \rightarrow R(a) \) (From 1 using Universal Instantiation)  
6. \( Q(a) \rightarrow S(a) \) (From 2 using Universal Instantiation)  
7. \( R(a) \) (From 3 and 5 using Modus Ponens)  
8. \( S(a) \) (From 4 and 6 using Modus Ponens)  
9. \( R(a) \land S(a) \) (From 7 and 8 using Conjunction)  

\[
∴ R(a) ∧ S(a)
\]
