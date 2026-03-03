# Q2 プログレスレポート ドラフト

## ルーブリック要件

### Rubric 1: Progress Report（中間 5/6）
- 6点: プロジェクトの進捗が十分に説明されている

### Rubric 2: Design Work（中間 2/4 → 目標 3-4/4）
- 2点（現在）: アイデアの一般的な議論があるが、技術的実装はあまり考慮されていない
- 3点: 技術的実装を考慮した**詳細な**アイデア。デザインが**反復・検討**されている
- 4点: **詳細な思考と開発過程**。技術的課題が考慮され、選択が**思慮深い**

---

## 中間提出の問題点分析

中間の Q2 は以下のような「事実の羅列」だった：

> 1. Data Analysis: Analysed 168 activity records...
> 2. Template Study: Examined the structure of the provided PieChart constructor...
> 3. UI Sketches: Sketched layouts for each visualisation on paper...
> - bar-chart.js (~100 lines) ...
> Total: approximately 1,000 lines of new code created.

**欠けていたもの:**
- ❌ 反復プロセス（v1→v2→改善の流れ）
- ❌ 技術的課題と解決策
- ❌ 設計判断の根拠（なぜその方法を選んだか）
- ❌ 代替案の検討

---

## 改善ドラフト（400語以内）

Since the midterm, I have completed three additional visualisations and refined the existing code through iterative design, testing, and debugging.

**Design Iterations and Technical Challenges**

The Heart Rate vs Pace scatter plot required implementing Pearson's correlation coefficient and least-squares linear regression from mathematical formulae. The initial version displayed only data points, making trends invisible. I added a regression line and correlation value (r = −0.67), revealing that lower heart rates correlate with faster paces. A key challenge was parsing pace data from "6:30" string format into decimal minutes (6.5), which I debugged using Chrome DevTools breakpoints to trace the data flow through `paceToMinutes()`. After the midterm, I further refined the scatter plot by mapping point size to running distance, creating a bubble chart that communicates three data dimensions simultaneously.

For Pace Progress, raw pace values produced a noisy graph. I implemented a trailing moving average (window = 10 runs) to smooth fluctuations while preserving the downward trend. I also added colour-coded pace zone backgrounds (Fast, Moderate, Easy) to provide immediate visual context for each data point.

The Goal Tracker uses a semicircular gauge rather than a bar chart, because a gauge better communicates percentage progress toward a target. The implementation required trigonometric calculations (`cos`/`sin`) for polar coordinate positioning along a 270-degree arc.

**Code Quality and Testing**

Reviewer feedback identified three issues I addressed: I extracted tooltip rendering into a reusable Tooltip class (separation of concerns), fixed implicit global variables from missing `let` declarations, and consolidated duplicate `paceToMinutes()` into `helper-functions.js` (DRY principle). All visualisations use asynchronous callbacks in `loadTable()` with a `loaded` flag, ensuring the UI remains responsive during CSV loading.

I wrote unit tests (`tests.js`) for key functions — validating `paceToMinutes()`, `formatPace()`, Pearson's correlation, linear regression, moving average, and colour mapping — using black-box testing with known inputs and expected outputs. I also created system test cases to verify each visualisation's rendering, interaction, and data integrity across all seven extensions.

**New Visualisations**

I developed two novel chart types: a Training Heatmap adapting GitHub's contribution graph to display daily distances on a calendar grid (nested loops, colour mapping), and a Marathon Readiness Radar plotting five normalised metrics on a spider chart (trigonometry at 72-degree intervals). Both were built from scratch without external libraries.

These additions transform the project from individual metric displays into an integrated analytical dashboard for marathon preparation.

(344 words)

---

## ドラフト分析

### ルーブリック対応チェック

| 要件 | 対応箇所 | 評価 |
|--|--|--|
| 反復プロセス | scatter plot: dots → regression line, pace: raw → moving average | ✅ 明確 |
| 技術的課題 | pace parsing "6:30"→6.5, tooltip coupling, global scope leak, DRY violation | ✅ 具体的 |
| 設計判断の根拠 | gauge vs bar chart（ゲージの方がターゲットに対する進捗を表現しやすい） | ✅ 思慮深い |
| 代替案の検討 | bar chart → gauge, raw data → moving average | ✅ あり |
| コード品質改善 | Tooltip分離、let修正、DRY修正 | ✅ レビューア対応 |
| 新機能 | Heatmap + Radar | ✅ 詳細な技術説明 |
| 全体の進捗 | midterm以降の3つ + コード改善 + 新規2つ | ✅ 十分 |

### 強み
1. **「なぜ」が書いてある**: ゲージを選んだ理由、移動平均を入れた理由
2. **問題→解決の構造**: ノイジーなグラフ → 移動平均、文字列パース → 変換関数
3. **レビューア指摘への対応**: フィードバックを受けて改善した証拠
4. **技術的深み**: 相関係数、三角関数、正規化、ネストループ

### 注意点
- 399語以内に収まっているが、PDFに図を含めることでさらに説得力が増す
- PDFには以下のスクリーンショット/スケッチを含めるべき：
  1. scatter plot の v1（点のみ）→ v2（回帰線付き）の比較
  2. pace progress の生データ → 移動平均の比較
  3. Goal Tracker のゲージデザインスケッチ
  4. Training Heatmap と Marathon Radar の完成画面

---

## PDF構成の推奨

Q2 は PDF 提出なので、テキスト + ビジュアルの組み合わせが可能。

### 推奨レイアウト:

**ページ 1: テキスト本文**（上記ドラフトの内容、400語以内）

**ページ 2: Design Iteration Evidence（図）**
- Figure 1: Heart Rate vs Pace — v1 (scatter only) vs v2 (with regression line)
- Figure 2: Pace Progress — raw data vs moving average overlay
- Figure 3: Goal Tracker — sketch → final implementation

**ページ 3: New Visualisations（図）**
- Figure 4: Training Heatmap screenshot
- Figure 5: Marathon Readiness Radar screenshot

→ 図があることで「反復・検討」の証拠が視覚的に示せる = Rubric 2 で 3-4/4 を狙える
