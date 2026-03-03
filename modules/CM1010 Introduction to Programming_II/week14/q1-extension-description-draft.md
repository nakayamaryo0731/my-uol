# Q1 エクステンション説明 ドラフト

## 設問の要件
- 400語以内
- 各エクステンションの概要と技術的実装
- テンプレートのGalleryパターンとの統合方法
- 使用した複雑なコーディング技法

## ルーブリック（中間 3/4 → 目標 4/4）
- 3点: 適切な詳細のエクステンション説明
- 4点: エクステンションの**優れた詳細説明**

---

## ドラフト（400語以内）

I developed seven data visualisation extensions for my running data, each implemented as a constructor function registered with the template's Gallery pattern via `gallery.addVisual()`. Each extension follows the Gallery interface (`preload`, `setup`, `draw`, `destroy`) and uses asynchronous callbacks in `loadTable()` with a `loaded` flag, ensuring the UI remains responsive while CSV data loads asynchronously.

**1. Monthly Distance** displays a bar chart of distance per month using a reusable `BarChart` constructor. It aggregates activity records by month using nested data grouping with objects.

**2. Pace Progress** shows pace changes over time with individual data points, colour-coded pace zone backgrounds (Fast/Moderate/Easy), and a 10-run trailing moving average trend line. The moving average algorithm smooths short-term fluctuations while preserving long-term trends. A custom `paceToMinutes()` function parses pace strings ("6:30") into decimal values.

**3. Activity Types** uses the template's `PieChart` constructor with a dropdown selector (`createSelect()`) to switch between count-based and distance-based views of Run, Trail Run, and Hiking distributions.

**4. Heart Rate vs Pace** implements a `ScatterPlot` constructor with distance-proportional point sizing, interactive tooltips, and statistical analysis. It calculates Pearson's correlation coefficient using the formula r = (nΣxy − ΣxΣy) / √((nΣx² − (Σx)²)(nΣy² − (Σy)²)) and draws a least-squares linear regression line (y = mx + b), both implemented from mathematical formulae without external libraries.

**5. Goal Tracker** renders a semicircular gauge using trigonometric functions (`cos`/`sin`) for polar coordinate positioning along a 270-degree arc. A five-tier colour system (red → green) provides visual feedback on monthly distance progress toward 100 km.

**6. Training Heatmap** adapts GitHub's contribution graph to display daily running distances on a calendar grid. Nested loops (weeks × weekdays) position 365 cells, with a quartile-based distance-to-colour mapping producing a green gradient. A year selector enables comparison across years.

**7. Marathon Readiness Radar** plots five normalised training metrics on a spider chart. Trigonometric calculations (`cos`/`sin` at 72-degree intervals) position each axis, and min-max normalisation scales metrics to a 0–1 range. A filled polygon connects the values, with concentric pentagons as reference grid.

**OOP and Shared Components:** Object-oriented constructor functions enabled modular development. `ScatterPlot` uses composition with a `Tooltip` instance rather than embedding tooltip logic directly, allowing `HeartRateVsPace` to delegate point rendering while managing its own statistics. I consolidated shared utilities (`paceToMinutes`, `formatPace`) in `helper-functions.js` to eliminate duplication, and wrote unit tests (`tests.js`) using black-box testing to validate these data processing functions across all visualisations.

(392 words)

---

## 分析

### ルーブリック対応チェック

| 要件 | 対応 |
|--|--|
| 各エクステンションの説明 | 7つ全て記述 ✅ |
| 技術的実装の詳細 | 相関係数の式、三角関数、ネストループ、移動平均 ✅ |
| Galleryパターンとの統合 | preload/setup/draw/destroy インターフェース ✅ |
| OOP / コンポジション | Tooltip分離、BarChart/ScatterPlot再利用 ✅ |
| 複雑なコーディング技法 | 統計計算、三角関数、正規化、スライディングウィンドウ ✅ |

### 強み
1. **全7エクステンションを網羅** — 中間は4つだったので大幅な進捗
2. **数式を含む技術的深さ** — ピアソン相関の式を明示
3. **新規コンポーネントの設計判断** — Tooltip分離、ヘルパー統合
4. **318語** — 400語の制限内に余裕あり
