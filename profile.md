---
layout: default
title: プロフィール
# lang: ja
# title_i18n: page_titles.profile
---

<h1>{% t page_titles.profile %}</h1> {# i18n対応例 #}

<div class="profile-info">
  <h2>{{ site.data.sns-links.name }} ({{ site.data.sns-links.id }})</h2>
  <p>VRChat配信や参加型配信をしています！</p>
  <!-- 他の自己紹介文 -->
</div>

<div class="profile-links">
  <h3>各種リンク</h3>
  <ul>
    {% for link in site.data.sns-links.links %}
      <li>
        <a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">
          <!-- アイコン (CSSで設定) -->
          <span class="icon icon-{{ link.icon | default: 'link' }}"></span>
          {{ link.name }} {% t common.new_tab %} {# i18n対応例 #}
        </a>
      </li>
    {% endfor %}
  </ul>
</div>