---
created: 2025-12-09T21:09
updated: 2025-12-09T21:17
---
# CM1015 Computational Mathematics 公式・定理 完全まとめ

---

# Part 1: 数と基数 (Numbers and Bases)

## 1.1 基数変換 (Base Conversion)

### 展開法 (Expansion Method)
任意の基数 b における数 `(dₙdₙ₋₁...d₁d₀.d₋₁d₋₂...)_b` を10進数に変換：

```
dₙ×bⁿ + dₙ₋₁×bⁿ⁻¹ + ... + d₁×b¹ + d₀×b⁰ + d₋₁×b⁻¹ + d₋₂×b⁻² + ...
```

### 10進数から他の基数への変換
**整数部**: 基数で繰り返し割り、余りを逆順に並べる
**小数部**: 基数で繰り返し掛け、整数部を順に並べる

### 2進数の位取り

**整数部**:
| 位置 | 2³ | 2² | 2¹ | 2⁰ |
|------|----|----|----|----|
| 値 | 8 | 4 | 2 | 1 |

**小数部**:
| 位置 | 2⁻¹ | 2⁻² | 2⁻³ | 2⁻⁴ |
|------|-----|-----|-----|-----|
| 値 | 0.5 | 0.25 | 0.125 | 0.0625 |

### 2進数の算術演算
```
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 10 (繰り上がり)
1 + 1 + 1 = 11
```

### 16進数 (Hexadecimal)
| 10進 | 0 | 1 | ... | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|------|---|---|-----|---|----|----|----|----|----|-----|
| 16進 | 0 | 1 | ... | 9 | A | B | C | D | E | F |

### 8進数 (Octal)
桁: 0, 1, 2, 3, 4, 5, 6, 7

---

## 1.2 補数 (Complements)

### 1の補数 (One's Complement)
各ビットを反転（0→1, 1→0）

### 2の補数 (Two's Complement)
1の補数 + 1
負の数の表現に使用

```
例: -5 を8ビット2の補数で表す
5 = 00000101
1の補数 = 11111010
2の補数 = 11111011
```

---

# Part 2: 数列と級数 (Sequences and Series)

## 2.1 等差数列 (Arithmetic Sequence/Progression)

### 定義
連続する項の差が一定：`aₙ₊₁ - aₙ = d`

### 一般項 (n-th term)
```
aₙ = a + (n-1)d
```
または
```
aₙ = a₁ + (n-1)d
```

### 初項から第n項までの和 (Sum)
```
Sₙ = n/2 × (2a + (n-1)d)
   = n/2 × (a + aₙ)
   = n × (初項 + 末項) / 2
```

### 等差中項
a, b, c が等差数列 ⟺ `2b = a + c`

---

## 2.2 等比数列 (Geometric Sequence/Progression)

### 定義
連続する項の比が一定：`aₙ₊₁ / aₙ = r`

### 一般項 (n-th term)
```
aₙ = a × r^(n-1)
```

### 初項から第n項までの和 (Sum)
```
Sₙ = a(rⁿ - 1) / (r - 1)    (r ≠ 1)
   = a(1 - rⁿ) / (1 - r)    (r ≠ 1)
```

r = 1 のとき：`Sₙ = na`

### 無限等比級数の和 (Infinite Series)
|r| < 1 のとき収束：
```
S∞ = a / (1 - r)
```

### 等比中項
a, b, c が等比数列 ⟺ `b² = ac`

---

## 2.3 その他の数列

### 階差数列
数列 {aₙ} の階差数列 {bₙ}：`bₙ = aₙ₊₁ - aₙ`

### フィボナッチ数列
```
F₁ = 1, F₂ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂ (n ≥ 3)
1, 1, 2, 3, 5, 8, 13, 21, 34, ...
```

### シグマ記法 (Sigma Notation)
```
Σᵢ₌₁ⁿ i = 1 + 2 + 3 + ... + n = n(n+1)/2
Σᵢ₌₁ⁿ i² = n(n+1)(2n+1)/6
Σᵢ₌₁ⁿ i³ = [n(n+1)/2]²
```

---

# Part 3: 指数と対数 (Exponents and Logarithms)

## 3.1 指数法則 (Laws of Exponents)

```
aᵐ × aⁿ = aᵐ⁺ⁿ
aᵐ ÷ aⁿ = aᵐ⁻ⁿ
(aᵐ)ⁿ = aᵐⁿ
(ab)ⁿ = aⁿbⁿ
(a/b)ⁿ = aⁿ/bⁿ
a⁰ = 1 (a ≠ 0)
a⁻ⁿ = 1/aⁿ
a^(1/n) = ⁿ√a
a^(m/n) = ⁿ√(aᵐ)
```

---

## 3.2 対数法則 (Laws of Logarithms)

### 定義
```
logₐx = y ⟺ aʸ = x
```

### 基本法則
```
logₐ(xy) = logₐx + logₐy
logₐ(x/y) = logₐx - logₐy
logₐ(xⁿ) = n logₐx
logₐa = 1
logₐ1 = 0
```

### 底の変換公式 (Change of Base)
```
logₐx = logᵦx / logᵦa = ln x / ln a = log x / log a
```

### 特殊な対数
- 常用対数 (Common log): log₁₀x = log x
- 自然対数 (Natural log): logₑx = ln x (e ≈ 2.71828)

---

## 3.3 指数関数的成長・減衰 (Exponential Growth/Decay)

### 成長モデル
```
N(t) = N₀ × eᵏᵗ (k > 0)
```

### 減衰モデル
```
N(t) = N₀ × e⁻ᵏᵗ (k > 0)
```

### 倍増時間 (Doubling Time)
```
N(t) = N₀ × 2^(t/T)
```
T = 倍増時間

### 半減期 (Half-life)
```
N(t) = N₀ × (1/2)^(t/T)
```
T = 半減期

---

# Part 4: 合同式と剰余演算 (Modular Arithmetic)

## 4.1 基本概念

### 合同の定義
```
a ≡ b (mod m) ⟺ m | (a - b)
```
「a と b を m で割った余りが等しい」

### 合同式の性質
```
a ≡ b (mod m), c ≡ d (mod m) のとき：
  a + c ≡ b + d (mod m)
  a - c ≡ b - d (mod m)
  a × c ≡ b × d (mod m)
  aⁿ ≡ bⁿ (mod m)
```

---

## 4.2 線形合同式 (Linear Congruence)

### 解法
`ax ≡ b (mod m)` の解：

1. d = gcd(a, m) を計算
2. d ∤ b → 解なし
3. d | b → d 個の解が存在
4. 両辺を d で割る：`(a/d)x ≡ (b/d) (mod m/d)`
5. (a/d) の逆元を求めて解く

### 逆元 (Modular Inverse)
```
a × a⁻¹ ≡ 1 (mod m)
```
gcd(a, m) = 1 のとき逆元が存在

---

## 4.3 中国剰余定理 (Chinese Remainder Theorem)

### 定理
gcd(m₁, m₂) = 1 のとき、連立合同式
```
x ≡ a₁ (mod m₁)
x ≡ a₂ (mod m₂)
```
は mod (m₁ × m₂) で一意の解を持つ

### 解法（2つの場合）
1. 第1式より x = a₁ + m₁k
2. 第2式に代入して k を求める
3. x を計算

---

## 4.4 ユークリッドの互除法 (Euclidean Algorithm)

### GCD の計算
```
gcd(a, b) = gcd(b, a mod b)
```
b = 0 になるまで繰り返す

### 例
```
gcd(48, 18):
48 = 18 × 2 + 12
18 = 12 × 1 + 6
12 = 6 × 2 + 0
∴ gcd(48, 18) = 6
```

### LCM との関係
```
lcm(a, b) = ab / gcd(a, b)
```

---

## 4.5 フェルマーの小定理 (Fermat's Little Theorem)

p が素数、gcd(a, p) = 1 のとき：
```
a^(p-1) ≡ 1 (mod p)
```

---

# Part 5: 三角関数 (Trigonometry)

## 5.1 基本定義

### 直角三角形における定義
```
sin θ = 対辺 / 斜辺
cos θ = 隣辺 / 斜辺
tan θ = 対辺 / 隣辺 = sin θ / cos θ
```

### 逆三角関数
```
csc θ = 1 / sin θ
sec θ = 1 / cos θ
cot θ = 1 / tan θ = cos θ / sin θ
```

---

## 5.2 単位円と特殊角

### 特殊角の値
| θ | 0° | 30° | 45° | 60° | 90° | 120° | 135° | 150° | 180° |
|---|-----|------|------|------|------|-------|-------|-------|-------|
| sin | 0 | 1/2 | √2/2 | √3/2 | 1 | √3/2 | √2/2 | 1/2 | 0 |
| cos | 1 | √3/2 | √2/2 | 1/2 | 0 | -1/2 | -√2/2 | -√3/2 | -1 |
| tan | 0 | √3/3 | 1 | √3 | ∞ | -√3 | -1 | -√3/3 | 0 |

| θ | 210° | 225° | 240° | 270° | 300° | 315° | 330° | 360° |
|---|-------|-------|-------|-------|-------|-------|-------|-------|
| sin | -1/2 | -√2/2 | -√3/2 | -1 | -√3/2 | -√2/2 | -1/2 | 0 |
| cos | -√3/2 | -√2/2 | -1/2 | 0 | 1/2 | √2/2 | √3/2 | 1 |

### ラジアン変換
```
180° = π rad
1° = π/180 rad
1 rad = 180°/π ≈ 57.3°
```

---

## 5.3 三角関数の恒等式 (Identities)

### ピタゴラスの恒等式
```
sin²θ + cos²θ = 1
1 + tan²θ = sec²θ
1 + cot²θ = csc²θ
```

### 余角・補角の関係
```
sin(90° - θ) = cos θ
cos(90° - θ) = sin θ
sin(180° - θ) = sin θ
cos(180° - θ) = -cos θ
```

### 負角の公式
```
sin(-θ) = -sin θ
cos(-θ) = cos θ
tan(-θ) = -tan θ
```

---

## 5.4 加法定理 (Addition Formulas)

```
sin(A ± B) = sin A cos B ± cos A sin B
cos(A ± B) = cos A cos B ∓ sin A sin B
tan(A ± B) = (tan A ± tan B) / (1 ∓ tan A tan B)
```

---

## 5.5 倍角・半角公式

### 倍角公式 (Double Angle)
```
sin 2θ = 2 sin θ cos θ
cos 2θ = cos²θ - sin²θ = 1 - 2sin²θ = 2cos²θ - 1
tan 2θ = 2tan θ / (1 - tan²θ)
```

### 3倍角公式
```
sin 3θ = 3sin θ - 4sin³θ
cos 3θ = 4cos³θ - 3cos θ
```

### 半角公式 (Half Angle)
```
sin²(θ/2) = (1 - cos θ) / 2
cos²(θ/2) = (1 + cos θ) / 2
tan(θ/2) = sin θ / (1 + cos θ) = (1 - cos θ) / sin θ
```

---

## 5.6 和積・積和公式

### 和積公式 (Sum-to-Product)
```
sin A + sin B = 2 sin((A+B)/2) cos((A-B)/2)
sin A - sin B = 2 cos((A+B)/2) sin((A-B)/2)
cos A + cos B = 2 cos((A+B)/2) cos((A-B)/2)
cos A - cos B = -2 sin((A+B)/2) sin((A-B)/2)
```

### 積和公式 (Product-to-Sum)
```
sin A cos B = (1/2)[sin(A+B) + sin(A-B)]
cos A sin B = (1/2)[sin(A+B) - sin(A-B)]
cos A cos B = (1/2)[cos(A+B) + cos(A-B)]
sin A sin B = (1/2)[cos(A-B) - cos(A+B)]
```

---

## 5.7 三角形の公式

### 正弦定理 (Law of Sines)
```
a/sin A = b/sin B = c/sin C = 2R
```
R = 外接円の半径

### 余弦定理 (Law of Cosines)
```
a² = b² + c² - 2bc cos A
b² = a² + c² - 2ac cos B
c² = a² + b² - 2ab cos C
```

逆に：
```
cos A = (b² + c² - a²) / 2bc
```

### 三角形の面積
```
Area = (1/2) × a × b × sin C
     = (1/2) × b × c × sin A
     = (1/2) × a × c × sin B
```

### ヘロンの公式 (Heron's Formula)
```
s = (a + b + c) / 2 (半周長)
Area = √[s(s-a)(s-b)(s-c)]
```

---

## 5.8 三角方程式の解法

### 基本形
| 方程式 | 一般解 |
|--------|--------|
| sin x = k | x = sin⁻¹(k) + 360°n または x = 180° - sin⁻¹(k) + 360°n |
| cos x = k | x = ±cos⁻¹(k) + 360°n |
| tan x = k | x = tan⁻¹(k) + 180°n |

### 特殊な場合
```
sin x = 0 → x = 0°, 180°, 360°, ...
cos x = 0 → x = 90°, 270°, ...
sin x = 1 → x = 90°
cos x = 1 → x = 0°, 360°
```

---

# Part 6: 関数 (Functions)

## 6.1 基本概念

### 定義域 (Domain)
関数 f(x) が定義される x の集合

**注意点**:
- 分数関数：分母 ≠ 0
- 平方根：根号内 ≥ 0
- 対数：真数 > 0

### 値域 (Range)
関数 f(x) が取りうる値 y の集合

### 写像の性質

**単射 (Injective / One-to-One)**:
```
f(x₁) = f(x₂) → x₁ = x₂
```
水平線テスト：どの水平線もグラフと高々1点で交わる

**全射 (Surjective / Onto)**:
すべての y に対して f(x) = y となる x が存在

**全単射 (Bijective)**:
単射かつ全射 → 逆関数が存在

---

## 6.2 逆関数 (Inverse Function)

### 定義
```
f(f⁻¹(x)) = f⁻¹(f(x)) = x
```

### 求め方
1. y = f(x) を x について解く
2. x と y を入れ替える

### グラフの関係
f(x) と f⁻¹(x) のグラフは y = x に関して対称

---

## 6.3 合成関数 (Composite Function)

### 定義
```
(f ∘ g)(x) = f(g(x))
(g ∘ f)(x) = g(f(x))
```

**注意**: 一般に f ∘ g ≠ g ∘ f

---

## 6.4 有理関数 (Rational Function)

### 形式
```
f(x) = P(x) / Q(x)
```
P(x), Q(x) は多項式

### 漸近線 (Asymptotes)

**垂直漸近線**: Q(x) = 0 の解
**水平漸近線**:
- 次数(P) < 次数(Q) → y = 0
- 次数(P) = 次数(Q) → y = (Pの最高次係数)/(Qの最高次係数)
- 次数(P) > 次数(Q) → 水平漸近線なし（斜め漸近線の可能性）

### 切片 (Intercepts)
- x切片：分子 = 0 を解く
- y切片：f(0) を計算

---

## 6.5 多項式関数 (Polynomial Functions)

### 因数定理 (Factor Theorem)
```
f(a) = 0 ⟺ (x - a) は f(x) の因数
```

### 剰余定理 (Remainder Theorem)
```
f(x) を (x - a) で割った余り = f(a)
```

### 二次関数
```
f(x) = ax² + bx + c = a(x - h)² + k
```
- 頂点: (h, k) = (-b/2a, f(-b/2a))
- 軸: x = -b/2a

### 判別式 (Discriminant)
```
D = b² - 4ac
```
- D > 0：異なる2つの実数解
- D = 0：重解
- D < 0：実数解なし（2つの複素数解）

### 解の公式 (Quadratic Formula)
```
x = (-b ± √D) / 2a = (-b ± √(b² - 4ac)) / 2a
```

### 解と係数の関係 (Vieta's Formulas)
ax² + bx + c = 0 の解を α, β とすると：
```
α + β = -b/a
αβ = c/a
```

---

# Part 7: ベクトルと行列 (Vectors and Matrices)

## 7.1 ベクトル (Vectors)

### 表記
```
a⃗ = (a₁, a₂) または a⃗ = (a₁, a₂, a₃)
```

### ベクトルの演算
```
a⃗ + b⃗ = (a₁ + b₁, a₂ + b₂)
ka⃗ = (ka₁, ka₂)
```

### 大きさ (Magnitude)
```
|a⃗| = √(a₁² + a₂²)
|a⃗| = √(a₁² + a₂² + a₃²) (3次元)
```

### 単位ベクトル
```
â = a⃗ / |a⃗|
```

### 内積 (Dot Product)
```
a⃗ · b⃗ = a₁b₁ + a₂b₂ + a₃b₃ = |a⃗||b⃗| cos θ
```

### 外積 (Cross Product) - 3次元
```
a⃗ × b⃗ = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)
|a⃗ × b⃗| = |a⃗||b⃗| sin θ
```

---

## 7.2 行列 (Matrices)

### 基本演算
```
[a b]   [e f]   [a+e b+f]
[c d] + [g h] = [c+g d+h]

    [a b]   [ka kb]
k × [c d] = [kc kd]
```

### 行列の積
```
[a b]   [e f]   [ae+bg af+bh]
[c d] × [g h] = [ce+dg cf+dh]
```

### 単位行列
```
I = [1 0]
    [0 1]
```

### 行列式 (Determinant) - 2×2
```
det[a b] = ad - bc
   [c d]
```

### 逆行列 (Inverse Matrix) - 2×2
```
[a b]⁻¹     1    [ d -b]
[c d]   = ―――― × [-c  a]
          ad-bc
```
ad - bc ≠ 0 のとき存在

---

# Part 8: 運動学 (Kinematics)

## 8.1 等加速度直線運動

### 基本公式 (SUVAT Equations)
```
v = u + at
s = ut + (1/2)at²
v² = u² + 2as
s = (u + v)t / 2
s = vt - (1/2)at²
```

記号：
- s = 変位 (displacement)
- u = 初速度 (initial velocity)
- v = 終速度 (final velocity)
- a = 加速度 (acceleration)
- t = 時間 (time)

---

## 8.2 自由落下・鉛直投射

### 重力加速度
```
g ≈ 9.8 m/s² (≈ 10 m/s²)
```

### 鉛直投げ上げ
- 上向きを正とすると a = -g
- 最高点で v = 0（加速度は g のまま）
- 最高到達点：h = u²/2g
- 最高点到達時間：t = u/g

### 自由落下
- 初速度 u = 0
- v = gt
- s = (1/2)gt²

---

## 8.3 速度と加速度の関係

| 運動の種類 | 速度 | 加速度 |
|-----------|------|--------|
| 静止 | 0 | 0 |
| 等速直線運動 | 一定 | 0 |
| 等加速度運動 | 変化 | 一定 |
| 等速円運動 | 速さ一定、向き変化 | ≠ 0（向心加速度）|
| 最高点（投げ上げ）| 0 | -g ≠ 0 |

**重要**: 等速 (constant speed) ≠ 等速度 (constant velocity)

---

## 8.4 相対速度

```
v_AB = v_A - v_B
```
「B から見た A の速度」

---

# Part 9: 微積分の基礎 (Introduction to Calculus)

## 9.1 極限 (Limits)

### 定義
```
lim[x→a] f(x) = L
```

### 重要な極限
```
lim[x→0] (sin x)/x = 1
lim[x→0] (1 - cos x)/x = 0
lim[x→∞] (1 + 1/x)ˣ = e
lim[x→0] (eˣ - 1)/x = 1
```

---

## 9.2 導関数 (Derivatives)

### 定義
```
f'(x) = lim[h→0] [f(x+h) - f(x)] / h
```

### 基本的な導関数
| f(x) | f'(x) |
|------|-------|
| c (定数) | 0 |
| xⁿ | nxⁿ⁻¹ |
| eˣ | eˣ |
| ln x | 1/x |
| sin x | cos x |
| cos x | -sin x |
| tan x | sec²x |

### 微分法則
```
(cf)' = cf'
(f + g)' = f' + g'
(fg)' = f'g + fg'        (積の法則)
(f/g)' = (f'g - fg')/g²  (商の法則)
(f(g(x)))' = f'(g(x)) × g'(x)  (連鎖律)
```

---

## 9.3 積分 (Integrals)

### 不定積分
```
∫xⁿ dx = x^(n+1)/(n+1) + C  (n ≠ -1)
∫1/x dx = ln|x| + C
∫eˣ dx = eˣ + C
∫sin x dx = -cos x + C
∫cos x dx = sin x + C
```

### 定積分
```
∫[a to b] f(x) dx = F(b) - F(a)
```
F(x) は f(x) の原始関数

---

# Part 10: 確率と統計の基礎 (Basic Probability and Statistics)

## 10.1 順列と組み合わせ

### 階乗 (Factorial)
```
n! = n × (n-1) × (n-2) × ... × 2 × 1
0! = 1
```

### 順列 (Permutation)
```
P(n, r) = nPr = n! / (n-r)!
```

### 組み合わせ (Combination)
```
C(n, r) = nCr = (n r) = n! / [r!(n-r)!]
```

### 二項定理
```
(a + b)ⁿ = Σ[k=0 to n] C(n,k) × aⁿ⁻ᵏ × bᵏ
```

---

## 10.2 基本的な確率

### 確率の定義
```
P(A) = (Aが起こる場合の数) / (全ての場合の数)
```

### 確率の性質
```
0 ≤ P(A) ≤ 1
P(確実) = 1
P(不可能) = 0
P(A') = 1 - P(A)  (補事象)
```

### 加法定理
```
P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
```
互いに排反のとき：P(A ∪ B) = P(A) + P(B)

### 乗法定理
```
P(A ∩ B) = P(A) × P(B|A) = P(B) × P(A|B)
```
独立のとき：P(A ∩ B) = P(A) × P(B)

---

# 付録: 重要な数値と定数

## 定数
```
π ≈ 3.14159
e ≈ 2.71828
√2 ≈ 1.41421
√3 ≈ 1.73205
```

## 重要なLCM
```
lcm(2,3,4,5,6,7,8,9,10) = 2520
lcm(1,2,3,...,10) = 2520
```

## 2のべき乗
| n | 2ⁿ |
|---|-----|
| 0 | 1 |
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 5 | 32 |
| 6 | 64 |
| 7 | 128 |
| 8 | 256 |
| 9 | 512 |
| 10 | 1024 |

## 3のべき乗
| n | 3ⁿ |
|---|-----|
| 0 | 1 |
| 1 | 3 |
| 2 | 9 |
| 3 | 27 |
| 4 | 81 |
| 5 | 243 |
| 6 | 729 |
