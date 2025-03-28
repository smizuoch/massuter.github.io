---
layout: default
title: "YouTube動画一覧"
---

<h1>YouTube動画一覧</h1>

{% assign lines = site.static_files | where:"path","/url-list.txt" %}
{% comment %}
  static_files から txtファイルの内容をそのまま取得することはJekyll標準だと難しい場合があります。
  代わりにプラグインやカスタムスクリプトで処理する、あるいは _data/ に手動でまとめておく方法もあります。
  以下はあくまで擬似的な例。
{% endcomment %}

<ul>
<!-- ここでは、手動で _data/youtube_urls.yml を作る方法の例を示します -->
{% for url in site.data.youtube_urls %}
  <li>
    <iframe width="560" height="315" src="{{ url | replace: 'watch?v=', 'embed/' }}" frameborder="0" allowfullscreen></iframe>
  </li>
{% endfor %}
</ul>
