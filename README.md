# Deravel

名古屋の魅力を発信する多言語対応観光情報プラットフォーム

<br>

## チームメンバー、開発期間

期間：<br>
2025年11月中旬 ~ (要件定義から開発、プレゼンまで五日間程度)

チームメンバー:<br>
リーダー １名<br>
Webデザイン 2名<br>
アプリ開発 ３名

<br>

## 制作背景

【制作背景をここに記載】<br>
例：2025年○月 ~ ○月にかけて、【目的・きっかけ】として開発を行いました。<br>
【アプリの特徴やコンセプトなど】<br>

<br>

## 技術スタック

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

<br>

## アプリ画面・機能

<br>

### 1. ログインページ

<p float="left">
  <img src="readme-images/auth-login.png" width="45%">
  <img src="readme-images/auth-login-validate.png" width="45%">
</p>

#### できること

- 登録済みのメールアドレスとパスワードでログインできます
- Googleアカウントを使って簡単にログインすることもできます
- 入力フォームやバリデーションエラーについては全て多言語対応しています。

<br>

---

<br>

### 2. 新規登録ページ

<p float="left">
  <img src="readme-images/auth-register.png" width="45%">
  <img src="readme-images/auth-register-validate.png" width="45%">
</p>

#### できること

- ユーザー名、メールアドレス、パスワードを入力して新規登録ができます
- Googleアカウントによって登録することもできます。
- パスワードは確認のため2回入力します
- 入力フォームやバリデーションエラーについては全て多言語対応しています。
<br>

---

<br>

### 3. TOPページ

<p float="left">
  <img src="readme-images/top-page-1.png" width="45%">
  <img src="readme-images/top-page-2.png" width="45%">
</p>

#### できること

- 名古屋をイメージしたビジュアルでアプリの世界観を体感できます
- カテゴリ別の人気記事をチェックできます
- 最新の投稿記事を一覧で確認できます
- 閲覧数の多い人気記事ランキングを見ることができます
- 名古屋の魅力についての紹介文を読むことができます

<br>

---

<br>

### 4. カテゴリページ

<p float="left">
  <img src="readme-images/divided-category-1.png" width="45%">
  <img src="readme-images/divided-category-2.png" width="45%">
</p>

#### できること

- 6つのカテゴリ（グルメ / カフェ / 文化 / ガイド / ショッピング / ストーリー）から興味のあるジャンルを選べます
- 選んだカテゴリに絞って記事を探すことができます
- 各カテゴリに関するQ&A（よくある質問）を確認できます
- 記事が多い場合はページを切り替えて閲覧できます

<br>

---

<br>

### 5. 記事投稿ページ

<p float="left">
  <img src="readme-images/create-post-1.png" width="45%">
  <img src="readme-images/create-post-2.png" width="45%">
</p>

#### できること

- ユーザー登録をした方は、自分の記事を投稿できます
- 投稿には以下の項目を設定します：
  - **サムネイル画像** - 記事の顔となる画像をアップロード
  - **カテゴリ** - 6つのカテゴリから選択
  - **タイトル** - 記事のタイトルを入力
  - **記事本文** - Notionライクなエディターで自由に執筆
- 記事本文はマークダウン形式で、見出し・リスト・画像など好きなように書けます

<br>

---

<br>

### 6. 記事詳細ページ

<p float="left">
  <img src="readme-images/post-detail-1.png" width="45%">
  <img src="readme-images/post-detail-2.png" width="45%">
</p>

#### できること

- 投稿された記事の全文を読むことができます
- 記事を書いた投稿者の情報を確認できます
- 記事の閲覧数が表示され、人気度がわかります
- 自分が投稿した記事の場合は、編集ページへ移動できます

<br>

---

<br>

### 7. プロフィールページ

<p float="left">
  <img src="readme-images/profile.png" width="45%">
  <img src="readme-images/drower.png" width="45%">
</p>

#### できること

- 自分のユーザー名とプロフィールメッセージを確認できます
- 自分が投稿した記事の一覧を見ることができます
- ドロワーメニューから各ページへ簡単にアクセスできます
- ログアウトしてアカウントを切り替えることができます

<br>

---

<br>

### 8. 多言語対応

#### 対応言語

- 🇯🇵 日本語 (ja-JP)
- 🇺🇸 英語 (en-US)
- 🇰🇷 韓国語 (ko-KR)
- 🇨🇳 中国語簡体字 (zh-CN)
- 🇹🇼 中国語繁体字 (zh-TW)

#### できること

- 画面上部の言語切り替えボタンから、好きな言語に切り替えられます
- 日本語がわからない観光客の方でも、母国語でアプリを利用できます

<br>

---

<br>

### 制作上の工夫点

#### 多言語対応

next-intlを活用し、5言語に対応。訪日外国人観光客でも利用しやすいアプリ設計

#### 型安全性の確保

TypeScriptとPrismaを活用し、コンパイル時にエラーを検出できる型安全な設計

#### リッチテキストエディター

BlockNoteを採用し、直感的な記事作成が可能。画像の挿入やフォーマット機能を実装

#### ユーザー体験の向上

- react-hot-toastによる直感的なエラー・成功通知
- SWRによる効率的なデータフェッチとキャッシュ管理
- React Hook Form + Zodによるバリデーション

#### 開発環境の整備

Docker・Makefileによる環境構築の簡易化、チーム開発の効率化

<br>

### できなかったこと、振り返り

<br>

---

<br>
