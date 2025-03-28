---
layout: default
title: Note記事
permalink: /notes/
---

# Note記事一覧

<div class="note-list">
  {% if site.data.notes %}
    {% for note in site.data.notes %}
      <div class="note-item">
        <div class="note-thumb">
          <img src="{{ note.thumb }}" alt="{{ note.title }}" loading="lazy">
        </div>
        <div class="note-content">
          <p class="note-date">{{ note.date | date: "%Y年%m月%d日" }}</p>
          <h3 class="note-title">
            <a href="{{ note.url }}" target="_blank" rel="noopener">{{ note.title }}</a>
          </h3>
          <p class="note-excerpt">{{ note.excerpt }}</p>
        </div>
      </div>
    {% endfor %}
  {% else %}
    <div class="empty-message">
      <p>Note記事はまだありません。</p>
    </div>
  {% endif %}
</div>
