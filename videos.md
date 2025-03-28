---
layout: default
title: 動画一覧
permalink: /videos/
---

# YouTube動画一覧

<div class="video-list">
  {% if site.data.videos %}
    {% for video in site.data.videos %}
      <div class="video-item">
        <div class="video-embed">
          <iframe src="{{ video.embed_url }}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="video-info">
          <h3 class="video-title">{{ video.title }}</h3>
          <p class="video-date">{{ video.date | date: "%Y年%m月%d日" }}</p>
        </div>
      </div>
    {% endfor %}
  {% else %}
    <div class="empty-message">
      <p>動画はまだありません。</p>
    </div>
  {% endif %}
</div>
