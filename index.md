---
layout: default
title: ホーム
# lang: ja # 多言語プラグイン使用時
---

# ようこそ！

ここはVRChat配信者「まっすたー (massuter)」の公式サイトです。

最新情報はこちらでチェック！

## 最新のNote記事

{% if site.data.notes.size > 0 %}
<ul>
  {% for note in site.data.notes limit:3 %}
  <li>
    <a href="{{ note.url }}" target="_blank" rel="noopener noreferrer">{{ note.title }}</a>
    <small>({{ note.published_at | date: "%Y年%m月%d日" }})</small>
  </li>
  {% endfor %}
</ul>
<p><a href="{{ '/note/' | relative_url }}">もっと見る...</a></p>
{% else %}
<p>まだ記事がありません。</p>
{% endif %}

## 最近の動画

{% comment %} url-list.txt を読み込んで表示するロジックが必要 {% endcomment %}
<p><a href="{{ '/videos/' | relative_url }}">動画一覧へ...</a></p>

## ギャラリー

<p>VRChatでの活動写真はこちらから。</p>
<p><a href="{{ '/gallery/' | relative_url }}">画像ギャラリーへ...</a></p>