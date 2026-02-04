# Week 16: Limits, Continuity, and Applications of Derivatives

## 1. Limits

### Evaluating Limits

**Direct Substitution:**
If f(a) is defined and continuous, then lim(x→a) f(x) = f(a)

**0/0 Indeterminate Form:**
Factor and cancel, then evaluate

### Examples

**Example 1:** lim(x→2) [(x² - 4)/(x - 2)]
- Factor: (x² - 4) = (x + 2)(x - 2)
- Cancel: (x + 2)(x - 2)/(x - 2) = x + 2
- Evaluate: 2 + 2 = **4**

**Example 2:** lim(x→-5) [(x² + 3x - 10)/(x + 5)]
- Factor: x² + 3x - 10 = (x + 5)(x - 2)
- Cancel: (x + 5)(x - 2)/(x + 5) = x - 2
- Evaluate: -5 - 2 = **-7**

**Example 3:** lim(x→5) [(x³ - 6x² + 25)/(x - 5)]
- Use synthetic division to factor
- Result: x² - x - 5
- Evaluate: 25 - 5 - 5 = **15**

---

## 2. Continuity

### Definition
A function f(x) is continuous at x = a if:
1. f(a) is defined
2. lim(x→a) f(x) exists
3. lim(x→a) f(x) = f(a)

### Piecewise Functions - Finding n for Continuity

For limit to exist: Left-hand limit = Right-hand limit

**Example:**
```
f(x) = { nx + 2,  if x ≥ 2
       { x² + 8,  if x < 2
```

- Left limit: 2² + 8 = 12
- Right limit: 2n + 2
- Set equal: 2n + 2 = 12 → n = **5**

---

## 3. Discontinuity

### Types of Discontinuities

| Type | Description | Example |
|------|-------------|---------|
| **Removable** | Limit exists, but f(a) undefined or ≠ limit | (x²-1)/(x-1) at x=1 |
| **Jump** | Left and right limits exist but differ | Step functions |
| **Infinite** | Limit is ±∞ | 1/x at x=0 |

### Sign Function Example
```
f(x) = |2x+7| / (2x+7)
```
- Point of discontinuity: x = -7/2
- f(x) = 1 if x > -7/2
- f(x) = -1 if x < -7/2

### Analyzing Piecewise Function Continuity

**Example:**
```
f(x) = { x³ + 2,  if x < 2
       { 5,       if x = 2
       { x² + 6,  if x > 2
```
- Left limit: 2³ + 2 = 10
- Right limit: 2² + 6 = 10
- f(2) = 5
- Limit exists (= 10) but ≠ f(2), so **discontinuous**

---

## 4. Derivative Rules Review

### Power Rule
```
d/dx[xⁿ] = n·x^(n-1)
```

### Sum/Difference Rule
```
d/dx[f(x) ± g(x)] = f'(x) ± g'(x)
```

**Proof steps:**
1. Δy = f(x+Δx) + g(x+Δx) - f(x) - g(x)
2. Δy = [f(x+Δx) - f(x)] + [g(x+Δx) - g(x)]
3. Divide by Δx and take limit
4. dy/dx = f'(x) + g'(x)

### Product Rule
```
d/dx[u·v] = u'·v + u·v'
```

**Example:** y = (x³ - 6x)(2 - 4x³)
- u = x³ - 6x, u' = 3x² - 6
- v = 2 - 4x³, v' = -12x²
- y' = (3x² - 6)(2 - 4x³) + (x³ - 6x)(-12x²)
- y' = **-24x⁵ + 96x³ + 6x² - 12**

### Quotient Rule
```
d/dx[u/v] = (u'·v - u·v') / v²
```

**Example:** f(x) = (x² + x)/(3x - 1)
- g = x² + x, g' = 2x + 1
- h = 3x - 1, h' = 3
- f'(x) = [(2x+1)(3x-1) - (x²+x)(3)] / (3x-1)²
- f'(x) = **(3x+1)(x-1) / (3x-1)²**

### Chain Rule
```
d/dx[f(g(x))] = f'(g(x))·g'(x)
```

**Example:** f(x) = e^(3x²)
- Outer: e^u, derivative = e^u
- Inner: u = 3x², derivative = 6x
- f'(x) = **6x·e^(3x²)**

---

## 5. Composite Functions

### Definition
(g∘f)(x) = g(f(x))

**Example:** f(x) = 1/x, g(x) = x³ + 2

g∘f(x) = g(f(x)) = g(1/x) = (1/x)³ + 2 = **1/x³ + 2**

Or equivalently: **(2x³ + 1)/x³**

---

## 6. Local Maxima and Minima

### Finding Critical Points
1. Find f'(x)
2. Set f'(x) = 0 and solve

### Second Derivative Test
- f''(c) > 0 → **Local minimum**
- f''(c) < 0 → **Local maximum**
- f''(c) = 0 → Test inconclusive

### Example
f(x) = x³ - 6x² + 9x

1. f'(x) = 3x² - 12x + 9 = 3(x-1)(x-3)
2. Critical points: x = 1, x = 3
3. f''(x) = 6x - 12
   - f''(1) = -6 < 0 → **Local max at (1, 4)**
   - f''(3) = 6 > 0 → **Local min at (3, 0)**

---

## 7. Concavity

### Definition
- **Concave up (∪):** f''(x) > 0 - curve opens upward
- **Concave down (∩):** f''(x) < 0 - curve opens downward
- **Inflection point:** where concavity changes (f''(x) = 0)

### Example
y = x⁵ - x

1. y' = 5x⁴ - 1
2. y'' = 20x³
3. Analysis:
   - x < 0: y'' < 0 → Concave **down**
   - x > 0: y'' > 0 → Concave **up**
   - x = 0: Inflection point

---

## 8. Tangent Line and Secant Line

### Definitions
- **Secant line:** Connects two points on a curve (average rate of change)
- **Tangent line:** Touches curve at one point (instantaneous rate of change)

### Gradient of Chord AP
For f(x) = x³ with A(1,1) and P(1+h, (1+h)³):

Gradient = [(1+h)³ - 1] / h = 3 + 3h + h²

As h → 0: lim = **3** (slope of tangent at A)

---

## 9. Key Concepts Summary

| Topic | Key Point |
|-------|-----------|
| Limits | Factor to resolve 0/0 forms |
| Continuity | Three conditions must hold |
| Discontinuity | Check if limit ≠ function value |
| Product Rule | u'v + uv' |
| Quotient Rule | (u'v - uv')/v² |
| Chain Rule | Outer' × Inner' |
| Critical Points | f'(x) = 0 |
| Concavity | Determined by f''(x) sign |

---

## 10. Common Mistakes to Avoid

1. **Quotient Rule:** Don't mix up the order (u'v - uv', not uv' - u'v)
2. **Chain Rule:** Don't forget to multiply by the inner derivative
3. **Continuity:** Limit existing ≠ function being continuous
4. **Concavity:** Concave up means f'' > 0, not f' > 0
5. **Piecewise functions:** Check ALL conditions for continuity

---

## 11. Practice Checklist

- [ ] Evaluate limits with factoring
- [ ] Find n for piecewise continuity
- [ ] Identify types of discontinuities
- [ ] Apply product, quotient, and chain rules
- [ ] Find composite functions
- [ ] Locate local max/min using second derivative test
- [ ] Determine concavity from second derivative
- [ ] Calculate gradient of chord approaching tangent
