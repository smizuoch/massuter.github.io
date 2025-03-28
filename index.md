---
layout: default
title: ホーム
permalink: /
---

# まっすたー

VRChat参加型配信者（Vstreamer）として活動しています。

## ようこそ！

このサイトでは、VRChatでの活動や配信、各種SNS、関連コンテンツなどを紹介しています。
気軽に覗いてみてください！

## 最近の活動

<div class="recent-content">
  <div class="recent-section">
    <h3>最新の動画</h3>
    <div class="video-preview">
      {% assign first_video = site.data.videos | first %}
      {% if first_video %}
        <div class="video-embed">
          <iframe width="560" height="315" src="{{ first_video.embed_url }}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="video-info">
          <h4>{{ first_video.title }}</h4>
          <p class="video-date">{{ first_video.date | date: "%Y年%m月%d日" }}</p>
        </div>
        <a href="/videos/" class="more-link">もっと見る →</a>
      {% else %}
        <p>動画がありません</p>
      {% endif %}
    </div>
  </div>
  
  <div class="recent-section">
    <h3>最新のNote</h3>
    <div class="note-preview">
      {% assign first_note = site.data.notes | first %}
      {% if first_note %}
        <div class="note-item">
          <div class="note-thumb">
            <img src="{{ first_note.thumb }}" alt="{{ first_note.title }}">
          </div>
          <div class="note-content">
            <p class="note-date">{{ first_note.date | date: "%Y年%m月%d日" }}</p>
            <h4 class="note-title">
              <a href="{{ first_note.url }}" target="_blank" rel="noopener">{{ first_note.title }}</a>
            </h4>
            <p class="note-excerpt">{{ first_note.excerpt }}</p>
          </div>
        </div>
        <a href="/notes/" class="more-link">もっと見る →</a>
      {% else %}
        <p>記事がありません</p>
      {% endif %}
    </div>
  </div>
</div>

## SNSでフォロー

<div class="social-grid">
  {% for link in site.data.sns-links %}
  <a href="{{ link.url }}" target="_blank" rel="noopener noreferrer" class="social-card">
    <span class="icon icon-{{ link.icon }}"></span>
    <span class="social-name">{{ link.name }}</span>
  </a>
  {% endfor %}
</div>
