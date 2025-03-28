---
layout: default
title: YouTube動画一覧
# lang: ja
# title_i18n: page_titles.videos
---

<h1>{% t page_titles.videos %}</h1> {# i18n対応例 #}

<div class="video-list">
{% assign video_urls = site.static_files | where: "path", "url-list.txt" | first %}
{% if video_urls %}
  {% assign lines = video_urls.content | split: "
" %}
  {% for line in lines reversed %} {# 新しいものが上に来るように reversed #}
    {% assign stripped_line = line | strip %}
    {% unless stripped_line == "" or stripped_line startswith "#" %} {# 空行とコメント行を除外 #}
      {% assign video_id = "" %}
      {% if stripped_line contains "youtube.com/watch?v=" %}
        {% assign video_id = stripped_line | split: "v=" | last | split: "&" | first %}
      {% elsif stripped_line contains "youtu.be/" %}
        {% assign video_id = stripped_line | split: "/" | last | split: "?" | first %}
      {% endif %}

      {% if video_id != "" %}
        <div class="video-item">
          <div class="youtube-embed-wrapper">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/{{ video_id }}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy">
            </iframe>
          </div>
          <p><a href="{{ stripped_line }}" target="_blank" rel="noopener noreferrer">{{ stripped_line }}</a></p>
        </div>
      {% endif %}
    {% endunless %}
  {% endfor %}
{% else %}
  <p>動画リストが見つかりません。</p>
{% endif %}
</div>

<style>
/* レスポンシブな埋め込み動画のためのCSS */
.youtube-embed-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  margin-bottom: 1em;
}
.youtube-embed-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.video-item {
  margin-bottom: 2em;
}
</style>