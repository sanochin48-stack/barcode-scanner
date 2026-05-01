# バーコードスキャナー → Google スプレッドシート

スマホのカメラでバーコードを読み取り、Googleスプレッドシートに送信するPWAアプリです。

## 機能

- 📷 カメラでバーコードをリアルタイム読み取り（QR・JAN・CODE128 など対応）
- 💾 読み取りデータをオフラインで端末に保存
- ⚠ 重複読み取りを検知してスキップ（メッセージ表示）
- 📤 まとめてGoogleスプレッドシートに送信
- 🚀 起動時にデータクリアするか選択可能
- 📱 PWA対応（ホーム画面に追加してアプリのように使える）

## 送信先スプレッドシート

https://docs.google.com/spreadsheets/d/1ZUH2zbQnTtnvYYYI5xtohjtDIfEWdmrNX9Hw3rUfLA0/edit

---

## セットアップ手順

### ステップ1：Google Apps Script を設定する

1. [送信先のスプレッドシート](https://docs.google.com/spreadsheets/d/1ZUH2zbQnTtnvYYYI5xtohjtDIfEWdmrNX9Hw3rUfLA0/edit) を開く
2. メニューから「**拡張機能**」→「**Apps Script**」を選ぶ
3. エディタが開いたら、`gas/Code.gs` の中身をまるごとコピーして貼り付け
4. 💾 保存（Ctrl+S）
5. 「**デプロイ**」→「**新しいデプロイ**」をクリック
6. 種類の選択で ⚙ アイコンをクリック→「**ウェブアプリ**」を選ぶ
7. 以下のように設定する：
   - 説明：（任意）
   - 次のユーザーとして実行：**自分**
   - アクセスできるユーザー：**全員**
8. 「**デプロイ**」をクリック
9. 権限の確認画面が出たら「許可」→Googleアカウントでログイン→「許可」
10. 表示された **ウェブアプリのURL** をコピーしておく

### ステップ2：アプリにURLを設定する

`index.html` の以下の行を編集する：

```js
const GAS_URL = 'YOUR_GAS_URL_HERE'; // ← ここをコピーしたURLに書き換える
```

例：
```js
const GAS_URL = 'https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec';
```

### ステップ3：GitHub Pages で公開する（推奨）

1. GitHubでリポジトリ `barcode-scanner` を作成（Public）
2. ファイルをプッシュ
3. リポジトリの「Settings」→「Pages」→ Branch: `main` / folder: `/ (root)` で保存
4. 数分後に `https://[ユーザー名].github.io/barcode-scanner/` でアクセス可能に

### ステップ4：スマホのホーム画面に追加する（任意）

**iPhone (Safari)**：共有ボタン → 「ホーム画面に追加」

**Android (Chrome)**：メニュー → 「アプリをインストール」または「ホーム画面に追加」

---

## ファイル構成

```
barcode-scanner/
├── index.html       # アプリ本体
├── manifest.json    # PWA設定
├── icon-192.png     # アプリアイコン（別途用意）
├── icon-512.png     # アプリアイコン（別途用意）
├── gas/
│   └── Code.gs      # Google Apps Script コード
└── README.md
```

## アイコンについて

`icon-192.png`（192×192px）と `icon-512.png`（512×512px）を用意してルートに置いてください。
PWAとしてインストールする際に使用されます。なければ動作に支障はありません。

---

## スプレッドシートの記録形式

| バーコード | 読取時刻 | 送信日時 |
|-----------|---------|---------|
| 4901234567890 | 10:32:15 | 2024/05/01 10:35:00 |
| ABC-12345 | 10:32:48 | 2024/05/01 10:35:00 |

シート名：`スキャンデータ`（初回送信時に自動作成）

---

## 対応バーコード形式

EAN-13 / EAN-8 / JAN / UPC-A / UPC-E / CODE-128 / CODE-39 / ITF / QR コード / Data Matrix

## 技術スタック

- HTML / CSS / JavaScript（フレームワークなし）
- [ZXing](https://github.com/zxing-js/library) — バーコード読み取りライブラリ
- Google Apps Script — スプレッドシートへの書き込み
- localStorage — オフライン保存
- PWA (Progressive Web App)
