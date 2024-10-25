## 『ふくログ!!』紹介記事

https://qiita.com/yuta-shacho/items/22ba32599601667dc038

# ふくログ!!の概要

服の購入状況を視覚化し、効果的に管理する WEB アプリです。このアプリでは、あなたが購入した服の「色」や「カテゴリ」（トップス、ボトムス、アウターなど）ごとの購入数や支出額をグラフで一目で確認できます。たとえば、カラーバリエーション、アイテムカテゴリ別の円グラフを使って、どの色の服が多いのか、どのカテゴリにお金をかけているのかが直感的に把握できるようになっています。

### ふくログ!!はこちら

https://outfitmanager-a9196.web.app/

### GitHub リポジトリ

https://github.com/yuta-shacho/Outfit-Manager-app

![スクリーンショット 2024-10-06 024415.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/13cc6f45-4dca-38f9-3440-8de80f2ff890.png)

## このサービスへの思い・制作した理由

### 自分が欲しい！

という理由がありました。具体的には、まず、自分が服が好きで、自分がどのようなアイテムに多くの出費をしているのか、どの色のアイテムを多く持っているのかを忘れてしまうことがありました。そのため、手持ちの服とのバランスを考えずに、似たようなアイテムを無意識に買ってしまうこともありました。そんな課題を解決するために、購入した服を「色」や「カテゴリ」ごとに整理し、視覚的に把握できるツールを作りたいという思いで、このアプリを開発しました。自分が欲しいという理由というのがモチベーションになり、1 ユーザーとしての視点で開発することができました。

## アプリの機能

**【メイン機能】**

- 服購入の「保存」「削除」「変更」機能（バックエンドには FireStore を利用）

  - 日付、「カテゴリ」「ジャンル」「カラー」、金額、内容を保存
  - React Hook Form を使用してユーザー入力を管理
  - Zod バリテーションチェックによるエラー

- カレンダー機能（FullCalendar を利用）

  - カレンダーの日付に収支を表示
  - 日付ごとの収支を表示

- 金額集計機能

  - 今年の服代を表示
  - 選択した月の服代を表示
  - 日付ごとの服代を表示

- グラフ表示

  - 「カテゴリ」「ジャンル」「カラー」ごとの合計購入数を表示した円グラフ
  - 円グラフの選択している月と年に切り替え可能
  - 選択している月の日別の服代の割合を表示した棒グラフ

- レスポンシブ対応

- ユーザー認証機能追加（2024/10/06）
  - Google と GitHub にてログイン可能
  - Firebase Authentication がユーザーを認証し、認証情報を取得
  - 認証情報は Redux を通じてアプリ全体で管理。

### 使い方イメージ

- ログイン画面
  ![スクリーンショット 2024-10-23 151442.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/e017c495-6a95-11ec-1116-7c8a14385751.png)
- ホーム画面
  ![スクリーンショット 2024-10-23 171259.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/fc7b83e5-fd24-381a-2799-f5efee03b2ab.png)
- 入力フォーム
  ![スクリーンショット 2024-10-23 171324.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/f941398b-76fb-d1a5-d3f0-3e048a24fc2d.png)
- レポート画面
![スクリーンショット 2024-10-23 171513.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/11bf5a54-bd45-9a1d-64d0-37d0ca54b27f.png)
![スクリーンショット 2024-10-23 171536.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/9760d4ef-bd25-4791-064c-7e1b0c14639c.png)
**【スマホ画面】**
<table>
<tr>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/d127ed89-144c-573b-53d7-e849c4aa88ed.jpeg"></td>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/775e6569-6270-cf16-4df6-b1e494b0611c.jpeg"></td>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/7f410b95-92e4-0c45-2aec-898a0860b418.jpeg"></td>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/afa4df10-6586-16d9-16fa-108d11dba9be.jpeg"></td>
</tr>
</table>

<table>
<tr>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/3ee4f240-0e3e-50bd-97c8-08f0f82e996f.jpeg"></td>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/04eccacf-b8e4-6bfd-458d-ddce312ae9b0.jpeg"></td>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/d2808543-8064-4d4e-74ef-a451dbb849ef.png"></td>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/e8a58b32-4c05-6bbb-7b5f-65d1448e6cdd.png"></td>
</tr>
</table>

## 使用技術、データ構造

### 技術スタック

1\. フロントエンド

- フレームワーク: React + TypeScript
- デザイン/UI ライブラリ: MUI (Material-UI)
- 状態管理: Redux + Redux Toolkit
- フォーム管理: React Hook Form
- バリデーション: Zod
- カレンダー表示: FullCalendar
- グラフ描画: react-chartjs-2
- 日付操作: date-fns
- モジュールバンドラー: Vite

2\. バックエンド

- バックエンドサービス: Firebase
  - データベース: Firestore
  - 認証機能: Firebase Authentication (Google および GitHub ログイン)
  - ホスティング: Firebase Hosting

これらの技術の選定理由はドキュメントがしっかりしているか、メンテナンスがされているかという点で決めています。自分自身、個人開発かつ開発経験が浅いということもあり、参考にできるものが多い方が嬉しかったり、React の進化がすごいので、それに対応していってくれるかどうかというのもありました。

### Firestore データ構造

```
users (コレクション)
│
├── user_uid_1 (ドキュメント)
│     ├── name: "ユーザーA"
│     ├── auth_provider: "Google"
│     └── purchases (サブコレクション)
│          ├── purchase_id_1 (ドキュメント)
│          │     ├── date: ""
│          │     ├── category: ""
│          │     ├── genre: ""
│          │     ├── color: ""
│          │     ├── amount: 0
│          │     └── description: ""
│          └── purchase_id_2 (ドキュメント)
│                └── ...
├── user_uid_2 (ドキュメント)
│     └── ...
```

## こだわった点

1\. グラフによるデータの視覚化
「色」や「カテゴリ」、「ジャンル」フィールドを作成し、react-chartjs-2 を使用して、円グラフや棒グラフで表示し、自分のファッションの傾向を一目で把握できるようにした。

2\. ユーザー目線での開発（ユーザーエクスペリエンスの向上）
フォームのバリデーションで入力ミスをなくしたり、レスポンシブデザインにしてデバイスの画面サイズに応じた最適なレイアウトを実現するなどユーザーに寄り添った開発を意識しました。例えば色に関しても以下のように直感的に分かりやすいように工夫したり、数字をフォーマットにかけて日本円表示にするなどしました。

<table>
<tr>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/6cf1ead4-808c-2e83-8cc1-5792cc4c334f.png"></td>
<td><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3809793/2590da19-65cf-6cae-a4e7-c3e95462edb3.png"></td>
</tr>
</table>

## 追加したい機能・改善点

- 服の画像保存・表示機能
  Firebase Storage を利用して画像を安全に保存。
- コーディネート提案機能
  AI とか使って実装できたらいいな
- 購入品の検索・フィルター機能
  カテゴリ、カラー、購入日、価格帯などで購入履歴を検索・フィルターできる機能を追加。
- SNS 連携・共有機能
  自分の購入履歴やグラフを SNS で共有できる機能を追加。
- テストコード
  開発中はテストコードがほとんど書けていないので、テストコードを追加します。
- React Native を使ってこのゲームをスマホアプリにしてみたい。

## 関連記事

https://qiita.com/yuta-shacho/items/d9fca2589934f840be0f

https://qiita.com/yuta-shacho/items/bc79e5f5e51f6185ad30

https://qiita.com/yuta-shacho/items/8da47cfd20c22c7f972c

## フィードバック、感想など

ご意見，感想，改善点，バグ，質問などなんでも大丈夫です！
なにかあれば以下のフォームに送ってくださると助かります。

https://forms.gle/pgtNc5zgrqQ11TMD6
