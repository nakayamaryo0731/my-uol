# Q7 独自性ステートメント ドラフト

## 設問の4つのポイント
1. What novel features have you developed?
2. How you have applied complex coding techniques?
3. How have you adapted and evolved inspiration from other sources?
4. Can you justify your ideas in terms of a use case where existing solutions aren't available?

---

## Draft A: Creative（創造性）重視

My project features two novel visualisations not found in standard charting libraries or the course template. The Training Heatmap adapts GitHub's contribution graph to display daily running distances on a calendar grid, using nested loops (weeks x weekdays) and colour mapping to reveal training consistency at a glance. The Marathon Readiness Radar uses trigonometry (sin/cos) to plot five normalised training metrics on a spider chart, providing a multi-dimensional readiness assessment in a single view. I built these entirely from scratch using p5.js primitives, without any external charting library. No existing running app, including Garmin Connect, offers this combined analytical perspective — making the dashboard a unique tool for marathon preparation that goes beyond simple activity logging.

(97 words)

---

## Draft B: Exceptional（卓越性）重視

My project implements statistical analysis techniques beyond the module's scope. The Heart Rate vs Pace scatter plot calculates Pearson's correlation coefficient and draws a least-squares linear regression line, both coded from mathematical formulae without libraries. The Marathon Readiness Radar employs trigonometric functions to position five normalised metrics on a spider chart, requiring coordinate geometry (sin/cos at 72-degree intervals) and min-max normalisation. The Training Heatmap adapts GitHub's contribution calendar using nested date calculations and distance-to-colour mapping. These techniques were self-researched and implemented to answer a genuine need: existing running apps like Garmin Connect provide individual metrics but lack integrated analytical views that correlate multiple performance indicators.

(103 words — 要調整)

---

## Draft C: バランス型（Creative + Original + Exceptional）

My project introduces two novel chart types built entirely from scratch: a Training Heatmap inspired by GitHub's contribution graph, displaying daily running distances on a weekly calendar grid through nested loops and colour mapping; and a Marathon Readiness Radar using trigonometry to plot five normalised metrics on a spider chart. I also implemented Pearson's correlation coefficient and least-squares regression for the scatter plot — statistical techniques beyond the module's curriculum, self-researched from mathematical formulae. These features address a genuine gap: while Garmin Connect displays individual metrics, it cannot correlate heart rate efficiency with pace trends or assess overall marathon readiness in a single integrated view.

(104 words — 要調整)

---

## 各ドラフトの比較

| | Draft A | Draft B | Draft C |
|--|--|--|--|
| Novel features (設問1) | ヒートマップ + レーダー | 散布図統計 + レーダー + ヒートマップ | ヒートマップ + レーダー + 散布図統計 |
| Complex techniques (設問2) | ネストループ、三角関数、色マッピング | 相関係数、回帰、三角関数、正規化 | ネストループ、三角関数、相関係数、回帰 |
| Adapted inspiration (設問3) | GitHub Contributions の転用 | 数学的公式からの自主実装 | GitHub + 数学的公式 |
| Use case (設問4) | Garminにない分析視点 | 統合的分析ビューの不在 | Garminにない統合ビュー |
| 強み | ビジュアルの創造性が際立つ | 技術力の高さが際立つ | 全方位カバー |

## 推奨: Draft C

設問の4ポイント全てに対応しており、creative（ヒートマップ/レーダー）+ exceptional（統計手法）+ original（Garminにないユースケース）のバランスが良い。100語に収める調整が必要。

---

## Draft C 調整版（100語以内）

My project introduces two novel chart types built from scratch: a Training Heatmap inspired by GitHub's contribution graph, displaying daily distances on a calendar grid through nested loops and colour mapping; and a Marathon Readiness Radar using trigonometry to plot five normalised metrics on a spider chart. I also implemented Pearson's correlation coefficient and least-squares linear regression — statistical techniques beyond the module curriculum, self-researched from mathematical formulae. These features address a genuine gap: Garmin Connect displays individual metrics but cannot correlate heart rate with pace trends or assess overall marathon readiness in a single integrated view.

(93 words)
