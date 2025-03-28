---
layout: default
title: "プロフィール"
---

# まっすたー (massuter) プロフィール

- VRChat配信・参加型配信を中心に活動中。
- SNSやプラットフォームのリンクは以下からどうぞ！

<ul>
{% for item in site.data["sns-links"] %}
  <li>
    <a href="{{ item.url }}" target="_blank" rel="noopener">
      {{ item.name }}
    </a>
  </li>
{% endfor %}
</ul>

## 活動内容
- VRChat内で定期的にイベントを開催
- YouTubeチャンネルで動画投稿・生配信
- Noteで活動レポート・考察記事などを公開
