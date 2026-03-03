# Q3 タイム管理 ドラフト

## ルーブリック要件

- 2点（現在）: ガントチャートのバリエーション。いくつかの計画議論
- 3点: 丁寧なガントチャート + 残り時間でどう達成するかの議論
- 4点: タスクの**複雑さを考慮**し、どう達成するかまで**踏み込んだ計画**

---

## 中間提出の問題点分析

中間の Q3（2/4）は以下の内容だった：

> - Dec W3 - Jan W2 (4 weeks): Add 4 new visualisations. Approximately 1 week allocated per feature.
> - Jan W3 - Feb W1 (3 weeks): UI improvements and interaction enhancements.
> - Feb W2 - W3 (2 weeks): Testing, bug fixes, and documentation.

**欠けていたもの:**
- ❌ タスクの複雑さの評価（全部「1週間」）
- ❌ 計画 vs 実績のギャップ分析
- ❌ 予想外の困難への対処
- ❌ 達成するための具体的な方法論

### 計画 vs 実績の乖離

| 中間計画のタスク | 計画時期 | 実際の状況 |
|--|--|--|
| Goal Tracker | Dec W4-Jan W1 | ✅ 完了（ほぼ計画通り） |
| Pace Zones | Dec W4-Jan W1 | ❌ 中止（Pace Progressと類似のため） |
| Cumulative Distance | Jan W1-W2 | ❌ 中止（優先度変更） |
| Marathon Dashboard | Jan W2-W4 | ❌ → Marathon Readiness Radar に変更 |
| UI Polish | Jan W4-Feb W2 | △ 部分的（コード品質改善に変更） |

**乖離の原因:**
1. レビューアフィードバックで**コード品質の問題**が判明（Tooltip結合、let漏れ、DRY違反）→ 品質改善が先行
2. Pace Zones は Pace Progress と機能的に重複 → 独自性の低いものを中止し、**Training Heatmap** に変更
3. Marathon Dashboard（漠然とした「ダッシュボード」）→ **Marathon Readiness Radar**（具体的なレーダーチャート）に設計し直し
4. タスクの**複雑さを過小評価**していた（散布図の統計実装に予想の2倍の時間がかかった）

---

## 改善ドラフト（200語以内）

My midterm Gantt chart allocated roughly one week per feature without considering complexity. In practice, the Heart Rate vs Pace scatter plot took twice as long as expected because implementing Pearson's correlation and linear regression required careful mathematical research. Meanwhile, reviewer feedback identified code quality issues — tooltip coupling, missing `let` declarations, and DRY violations — which I had not anticipated in my original timeline.

I revised my plan in three ways. First, I replaced two planned visualisations (Pace Zones and Cumulative Distance) with more distinctive alternatives: a Training Heatmap and Marathon Readiness Radar. Pace Zones overlapped too closely with the existing Pace Progress chart, and the Radar provides a more original multi-dimensional view. Second, I added a dedicated code refactoring phase to address reviewer feedback before building new features. Third, I assigned complexity ratings to each remaining task: the Heatmap is medium complexity (nested date loops), while the Radar is high complexity (trigonometry + normalisation), and allocated time proportionally.

The updated Gantt chart reflects these changes, with buffer time included before the deadline. This revised approach prioritises code quality and originality over feature quantity.

(178 words)

---

## 更新版ガントチャート

gantt-chart.html に全期間（Dec W2 〜 Mar W2）のガントチャートを作成済み。
Chrome → 印刷 → PDFで出力し、Q3提出に添付する。

以下は gantt-chart.html の内容と一致するタイムライン要約:

```
MIDTERM PHASE (Dec W2–W3):
  Planning & Research          Medium   Dec W2
  Core 4 visualisations        High     Dec W2–W3
  Midterm submission           Low      Dec W2

REVISED PLAN — New Visualisations:
  Goal Tracker                 Medium   Dec W4–Jan W1
  Training Heatmap             Medium   Feb W1–W2
  Marathon Readiness Radar     High     Feb W2–W3

REVISED PLAN — Code Quality:
  Extract Tooltip              Medium   Jan W2–W3
  Fix missing let              Low      Jan W3
  Consolidate DRY              Low      Jan W3

REVISED PLAN — Documentation:
  Draft Q7, Q2, Q3 reports     Medium   Feb W1

REVISED PLAN — Testing & Final:
  Unit + System tests          Medium   Feb W4
  Finalise Q1, Q4, logs        Low      Feb W4
  Code PDF + review + ZIP      Low      Mar W1–W2
```

### 複雑さの根拠

| タスク | 複雑さ | 根拠 | 見積もり時間 |
|--|--|--|--|
| Tooltip分離 | Medium | 既存コードのリファクタ + 複数ファイルへの影響 | 3時間 |
| let修正 / DRY修正 | Low | 機械的な修正 | 1-2時間 |
| Training Heatmap | Medium | 日付→週番号計算がやや複雑、ネストループ | 2日 |
| Marathon Readiness Radar | **High** | 三角関数(sin/cos)、5指標の正規化、ポリゴン描画 | 3-4日 |
| システムテスト | Medium | 全7可視化に対してテストケース作成 | 1日 |

---

## ドラフト分析

### ルーブリック対応チェック

| 要件 | 対応箇所 | 評価 |
|--|--|--|
| 丁寧なガントチャート | 複雑さ列付きの更新版ガントチャート | ✅ |
| タスクの複雑さ考慮 | Low/Medium/High + 見積もり時間の根拠 | ✅ |
| 計画 vs 実績の分析 | scatter plotが予想の2倍、レビューア指摘の未予測 | ✅ |
| 計画の修正理由 | Pace Zones中止理由、Radar変更理由 | ✅ |
| どう達成するか | 品質優先→新機能→テストの段階的アプローチ | ✅ |
| バッファ時間 | deadline前に余裕あり | ✅ |

### 中間提出との主な違い

| | 中間 Q3 | 改善版 Q3 |
|--|--|--|
| 時間配分 | 「各機能に約1週間」（均一） | 複雑さに応じた傾斜配分 |
| 振り返り | なし | scatter plotの過小見積もり、レビューア指摘の未予測 |
| 計画修正 | なし | Pace Zones→Heatmap、Dashboard→Radar の変更理由 |
| 達成方法 | 「〇週間で〇〇する」 | 品質→新機能→テストの段階的優先順位 |

### 強み
1. **反省がある**: 「1週間/機能は甘かった」と認めている
2. **具体的な修正理由**: 機能重複、独自性、コード品質
3. **複雑さの定量評価**: High/Medium/Low + 時間見積もり
4. **段階的アプローチ**: ドキュメント→品質→新機能→テストの明確なフェーズ

### PDF構成の推奨

**ページ 1: テキスト本文**（上記178語ドラフト）
**ページ 2: 更新版ガントチャート**（複雑さ列付き）
**ページ 3（オプション）: 中間ガントチャートとの比較**（変更箇所をハイライト）
