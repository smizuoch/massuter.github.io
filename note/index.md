---
layout: default
title: "Note記事一覧"
---

<h1>Note記事一覧</h1>

<ul>
{% for article in site.data.notes %}
  <li>
    <a href="{{ article.url }}" target="_blank" rel="noopener">
      <img src="{{ article.thumb }}" alt="サムネ" style="width:100px; vertical-align:middle;">
      <strong>{{ article.title }}</strong>
    </a>
    <p>{{ article.description }}</p>
  </li>
{% endfor %}
</ul>
