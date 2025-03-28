---
layout: default
title: ギャラリー
permalink: /gallery/
gallery: true
---

# VRChat ギャラリー

<div class="gallery-container" style="display: none;">
  <div class="gallery-grid">
    {% for image in site.static_files %}
      {% if image.path contains 'vrc-images' %}
        <div class="gallery-item" data-src="{{ site.baseurl }}{{ image.path }}">
          <img src="{{ site.baseurl }}{{ image.path }}" alt="VRChat Image" loading="lazy">
        </div>
      {% endif %}
    {% endfor %}
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // ギャラリーアイテムのクリック処理
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-src');
        
        // モーダルを作成
        const modal = document.createElement('div');
        modal.className = 'modal image-modal active';
        
        // モーダルの内容
        modal.innerHTML = `
          <div class="modal-image-container">
            <img src="${imgSrc}" alt="VRChat Image (Large)">
            <button class="close-modal">×</button>
          </div>
        `;
        
        // bodyに追加
        document.body.appendChild(modal);
        
        // 閉じるボタンのイベント
        modal.querySelector('.close-modal').addEventListener('click', function() {
          modal.classList.add('fade-out');
          setTimeout(() => {
            modal.remove();
          }, 300);
        });
        
        // モーダル背景クリックで閉じる
        modal.addEventListener('click', function(e) {
          if (e.target === modal) {
            modal.classList.add('fade-out');
            setTimeout(() => {
              modal.remove();
            }, 300);
          }
        });
      });
    });
  });
</script>

<style>
  .gallery-container {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .gallery-container.visible {
    opacity: 1;
    display: block !important;
  }
  
  .image-modal {
    z-index: 2100;
  }
  
  .modal-image-container {
    max-width: 90vw;
    max-height: 90vh;
    margin: 0 auto;
    position: relative;
  }
  
  .modal-image-container img {
    max-width: 100%;
    max-height: 90vh;
    display: block;
    margin: 0 auto;
  }
  
  .close-modal {
    position: absolute;
    top: -30px;
    right: -30px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
  }
  
  .fade-out {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
</style>
