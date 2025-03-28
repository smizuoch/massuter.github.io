---
layout: default
title: Note記事一覧
# lang: ja
# title_i18n: page_titles.notes
---

<h1>{% t page_titles.notes %}</h1> {# i18n対応例 #}

<ul class="note-list">
{% if site.data.notes and site.data.notes.size > 0 %}
  {% assign sorted_notes = site.data.notes | sort: "published_at" | reverse %}
  {% for note in sorted_notes %}
  <li class="note-item">
    <h2><a href="{{ note.url }}" target="_blank" rel="noopener noreferrer">{{ note.title }}</a></h2>
    {% if note.thumbnail %}
      <img src="{{ note.thumbnail }}" alt="{{ note.title }}" loading="lazy">
    {% endif %}
    {% if note.description %}
      <p>{{ note.description | strip_html | truncatewords: 50 }}</p>
    {% endif %}
    <small>公開日: {{ note.published_at | date: "%Y年%m月%d日 %H:%M" }}</small>
    <a href="{{ note.url }}" target="_blank" rel="noopener noreferrer">続きを読む {% t common.new_tab %}</a> {# i18n対応例 #}
  </li>
  {% endfor %}
{% else %}
  <p>現在、公開されている記事はありません。</p>
{% endif %}
</ul>