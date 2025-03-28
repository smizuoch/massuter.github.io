---
layout: default
title: "画像ギャラリー"
---

<div class="page-gallery">
  <h1>VRChat 画像ギャラリー</h1>
  <p>※「秘密の言葉」を入力しないと閲覧できません。</p>

  <!-- 画像一覧サンプル -->
  <div class="gallery-grid">
  {% assign sorted_images = site.static_files | where_exp:"file","file.path contains 'vrc-images'" | sort: 'path' | reverse %}
  {% for img in sorted_images %}
    <div class="gallery-item">
      <img src="{{ img.path | relative_url }}" loading="lazy" alt="VRChat Image" />
    </div>
  {% endfor %}
  </div>

</div>
