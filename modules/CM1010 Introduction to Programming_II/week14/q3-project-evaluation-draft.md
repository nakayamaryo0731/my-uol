# Q3 プロジェクト評価 ドラフト

## 講義で求められていること

> - How effective is it as a final product?
> - Self evaluation of how effectively you completed the project
> - Go back to your original project plan — what would you do differently next time?
> - NOT about how good you are at code, but the PROCESS
> - Have you performed any user or system testing?
> - Did testing help uncover errors?
> - How did different users respond?
> - What might you add, remove or change in a future version?

---

## ドラフト（250語版 — Coursera Q5用）

**Effectiveness as a Final Product**

The application visualises running activities across seven interactive chart types, providing analytical views not available in tools like Garmin Connect. Statistical analysis (correlation, regression), temporal patterns (heatmap), and multi-dimensional assessment (radar chart) create an integrated dashboard beyond simple activity logging.

**Process Evaluation**

My midterm plan underestimated task complexity — I allocated one week per feature regardless of difficulty. The scatter plot's statistical implementation took twice as long as expected, and reviewer feedback revealed code quality issues I had not anticipated. In retrospect, I would assign complexity ratings from the start and include dedicated time for code review. Replacing Pace Zones and Cumulative Distance with the Training Heatmap and Marathon Readiness Radar improved originality, though this pivot cost time.

**Testing**

I implemented both unit and system testing. Unit tests (`tests.js`) validate data processing functions — `paceToMinutes()`, `formatPace()`, Pearson's correlation, linear regression, moving average, and colour mapping — using black-box testing with known inputs. System test cases verify each visualisation's rendering and interaction. Testing revealed a tooltip boundary issue where tooltips near the right edge rendered off-screen, which I fixed with repositioning logic. The heatmap colour mapping also produced incorrect gradients when all distances were zero, leading me to add a guard condition.

**Future Improvements**

I would add a date range filter for specific training periods, implement data export to save charts as images, and conduct formal user testing with fellow runners. Earlier user testing would help identify unclear labels or confusing interactions before submission.

(218 words)

---

## ルーブリック対応チェック

| 講義の要件 | 対応箇所 |
|--|--|
| Effective as final product? | ✅ 7つの可視化、Garminにない統合ビュー |
| Self-evaluation of process | ✅ 複雑さ過小評価、DRY原則の遅れ、計画変更 |
| What would you do differently? | ✅ 複雑さ評価を最初から、コードレビュー時間確保 |
| User or system testing? | ✅ ユニットテスト(tests.js) + システムテスト |
| Did testing uncover errors? | ✅ tooltip境界問題、ヒートマップのゼロ距離バグ |
| Future version improvements? | ✅ 日付フィルタ、エクスポート、ユーザーテスト |
