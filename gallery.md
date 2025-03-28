---
layout: default
title: 画像ギャラリー
# lang: ja
# title_i18n: page_titles.gallery # 多言語プラグイン使用時
---

<h1>{% t gallery.title %}</h1> {# i18n対応例 #}

<!-- 認証モーダル -->
<div id="auth-modal" class="modal" style="display: none;">
  <div class="modal-content">
    <p>{% t gallery.auth_prompt %}</p> {# i18n対応例 #}
    <form id="auth-form">
      <input type="password" id="secret-word" required>
      <button type="submit">{% t gallery.auth_button %}</button> {# i18n対応例 #}
    </form>
    <p id="auth-error-message" style="color: red; display: none;"></p>
  </div>
</div>

<!-- ギャラリーコンテンツ (認証後に表示) -->
<div id="gallery-content" style="display: none;">
  <p>VRChatでの思い出の写真たちです。</p>
  <div class="gallery-grid">
    {% assign image_files = site.static_files | where: "image", true %}
    {% assign vrc_images = "" | split: "," %}
    {% for file in image_files %}
      {% if file.path contains '/vrc-images/' %}
        {% assign vrc_images = vrc_images | push: file %}
      {% endif %}
    {% endfor %}

    {% assign sorted_images = vrc_images | sort: 'name' | reverse %} {# ファイル名(YYYYMMDD)でソート #}

    {% for image in sorted_images %}
      <div class="gallery-item">
        <a href="{{ image.path | relative_url }}">
          <img data-src="{{ image.path | relative_url }}" alt="VRChat Image {{ image.basename }}" class="lazy-load" loading="lazy">
        </a>
      </div>
    {% endfor %}
  </div>
</div>

<!-- 画像拡大用モーダル -->
<div id="image-modal" class="modal image-viewer" style="display: none;">
  <span id="close-modal" class="close-button">×</span>
  <img id="modal-image" src="" alt="拡大画像">
</div>

<noscript>
  <p style="color: red;">{% t gallery.auth_required %}</p> {# i18n対応例 #}
  <p>JavaScriptを有効にして再度アクセスしてください。</p>
</noscript>