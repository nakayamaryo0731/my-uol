# Week 15: Differentiation - Comprehensive Study Guide

## 1. Introduction to Differentiation

### What is Differentiation?
- The study of **rates of change**
- Measures how a function changes as its input changes
- Derivative f'(x) = **instantaneous rate of change** = slope of tangent line

### Derivative vs Average Rate of Change
| Concept | Formula | Geometric Meaning |
|---------|---------|-------------------|
| Average rate of change | [f(b) - f(a)] / (b - a) | Slope of **secant line** |
| Instantaneous rate of change | f'(x) = lim(h→0) [f(x+h) - f(x)] / h | Slope of **tangent line** |

---

## 2. Limit Definition of Derivative

### Definition
```
f'(x) = lim(h→0) [f(x+h) - f(x)] / h
```

### How to Use (Step by Step)
1. Calculate f(x+h)
2. Calculate f(x+h) - f(x)
3. Divide by h
4. Take the limit as h → 0

### Examples Using Limit Definition

**Example 1: f(x) = x²**
- f(x+h) = (x+h)² = x² + 2xh + h²
- f(x+h) - f(x) = 2xh + h²
- Divide by h: 2x + h
- Limit: f'(x) = **2x**

**Example 2: f(x) = x³**
- f(x+h) = (x+h)³ = x³ + 3x²h + 3xh² + h³
- f(x+h) - f(x) = 3x²h + 3xh² + h³
- Divide by h: 3x² + 3xh + h²
- Limit: f'(x) = **3x²**

**Example 3: f(x) = 1/x**
- f(x+h) - f(x) = 1/(x+h) - 1/x = -h / [x(x+h)]
- Divide by h: -1 / [x(x+h)]
- Limit: f'(x) = **-1/x²**

---

## 3. Binomial Theorem

### Formula
```
(a + b)ⁿ = Σ C(n,k) · a^(n-k) · b^k
```

### Expansion Examples
- (x+h)² = x² + 2xh + h²
- (x+h)³ = x³ + 3x²h + 3xh² + h³
- (x+h)⁴ = x⁴ + 4x³h + 6x²h² + 4xh³ + h⁴

### Role in Differentiation
- Used to **prove the power rule** for general polynomials
- Essential for expanding (x+h)ⁿ in limit definition proofs

---

## 4. Differentiation Rules

### Power Rule
```
If f(x) = xⁿ, then f'(x) = n·x^(n-1)
```

Examples:
- f(x) = x⁵ → f'(x) = 5x⁴
- f(x) = x^(1/2) → f'(x) = (1/2)x^(-1/2)
- f(x) = x^(-1) → f'(x) = -x^(-2)

### Constant Rule
```
If f(x) = c, then f'(x) = 0
```

### Constant Multiple Rule
```
[c·f(x)]' = c·f'(x)
```

### Sum/Difference Rule
```
[f(x) ± g(x)]' = f'(x) ± g'(x)
```

### Product Rule
```
(u·v)' = u'·v + u·v'
```

Example: f(x) = x²·sin(x)
- u = x², u' = 2x
- v = sin(x), v' = cos(x)
- f'(x) = 2x·sin(x) + x²·cos(x)

### Quotient Rule
```
(u/v)' = (u'·v - u·v') / v²
```

Example: f(x) = sin(x)/x
- f'(x) = [cos(x)·x - sin(x)·1] / x²
- f'(x) = [x·cos(x) - sin(x)] / x²

### Chain Rule
```
[f(g(x))]' = f'(g(x))·g'(x)
```

Example: f(x) = sin(x²)
- Outer: sin(u), derivative = cos(u)
- Inner: u = x², derivative = 2x
- f'(x) = cos(x²)·2x = 2x·cos(x²)

### Rules NOT Used in Differentiation
- **Pythagorean theorem** (a² + b² = c²) - geometry, not calculus

---

## 5. Common Derivatives Table

| Function f(x) | Derivative f'(x) |
|---------------|------------------|
| c (constant) | 0 |
| x | 1 |
| xⁿ | n·x^(n-1) |
| √x = x^(1/2) | 1/(2√x) |
| 1/x = x^(-1) | -1/x² |
| sin(x) | cos(x) |
| cos(x) | -sin(x) |
| tan(x) | sec²(x) |
| eˣ | eˣ |
| aˣ | aˣ·ln(a) |
| ln(x) | 1/x |
| log_a(x) | 1/(x·ln(a)) |

---

## 6. Continuity

### Definition
A function f(x) is continuous at x = a if:
1. **f(a) is defined**
2. **lim(x→a) f(x) exists**
3. **lim(x→a) f(x) = f(a)**

### Types of Discontinuities

| Type | Description | Example |
|------|-------------|---------|
| **Removable** | Limit exists, but f(a) undefined or ≠ limit | (x²-1)/(x-1) at x=1 |
| **Jump** | Left and right limits exist but differ | Step functions |
| **Infinite** | Limit is ±∞ | 1/x at x=0 |

### Removable Discontinuity Example
f(x) = (x²-1)/(x-1) at x = 1
- f(1) = 0/0 → undefined
- Factor: (x²-1)/(x-1) = (x+1)(x-1)/(x-1) = x+1 (for x≠1)
- lim(x→1) f(x) = 2
- The "hole" can be removed by defining f(1) = 2

---

## 7. Applications of Differentiation

### In Mathematics
- Finding slopes of curves
- Finding rates of change
- Optimization (finding max/min)
- Related rates problems

### In Machine Learning
**Gradient Descent** - directly uses differentiation
```
θ = θ - α·∂L/∂θ
```
- θ: parameters
- α: learning rate
- ∂L/∂θ: gradient (partial derivative of loss function)

Uses derivatives to iteratively minimize the loss function.

---

## 8. Higher Order Derivatives

### Notation
- First derivative: f'(x) or dy/dx
- Second derivative: f''(x) or d²y/dx²
- Third derivative: f'''(x) or d³y/dx³
- nth derivative: f⁽ⁿ⁾(x) or dⁿy/dxⁿ

### Example
f(x) = x⁴
- f'(x) = 4x³
- f''(x) = 12x²
- f'''(x) = 24x
- f⁽⁴⁾(x) = 24
- f⁽⁵⁾(x) = 0

---

## 9. Key Concepts Summary

1. **Differentiation** = study of rates of change
2. **Derivative** = slope of tangent line = instantaneous rate of change
3. **Limit definition** is the foundation for proving derivative rules
4. **Binomial theorem** helps prove the power rule
5. **Continuity** requires: defined, limit exists, limit equals function value
6. **Removable discontinuity** = hole that can be filled
7. **Gradient descent** in ML uses derivatives for optimization

---

## 10. Practice Checklist

- [ ] Derive f(x) = xⁿ using limit definition
- [ ] Apply product rule to f(x) = x²·sin(x)
- [ ] Apply quotient rule to f(x) = sin(x)/x
- [ ] Apply chain rule to f(x) = sin(x²)
- [ ] Check continuity at a point
- [ ] Identify types of discontinuities
- [ ] Understand how gradient descent uses derivatives
