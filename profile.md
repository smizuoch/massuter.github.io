---
layout: default
title: プロフィール
permalink: /profile/
---

# まっすたーについて

## プロフィール

VRChat参加型配信者（Vstreamer）として活動しています。
パステルカラーの水色を基調とした世界観で、リスナーの皆さんと一緒に楽しい時間を過ごすことをモットーにしています。

## 活動内容

- VRChatでの参加型配信
- ゲーム実況
- 雑談配信
- バーチャル旅行

## 配信情報

主にTwitchで配信を行っています。配信スケジュールは[X (Twitter)](https://x.com/Massuter)で告知していますので、フォローよろしくお願いします。

## SNS

<div class="profile-social-links">
  {% for link in site.data.sns-links %}
  <div class="profile-social-item">
    <h3><span class="icon icon-{{ link.icon }}"></span> {{ link.name }}</h3>
    <p><a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.url }}</a></p>
  </div>
  {% endfor %}
</div>

<style>
  .profile-social-links {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .profile-social-item {
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: var(--shadow);
  }
  
  .profile-social-item h3 {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    color: var(--accent-color);
  }
  
  .profile-social-item .icon {
    margin-right: 0.5rem;
  }
  
  .profile-social-item a {
    color: var(--text-color);
    text-decoration: none;
    word-break: break-all;
  }
  
  .profile-social-item a:hover {
    color: var(--accent-color);
    text-decoration: underline;
  }
</style>
