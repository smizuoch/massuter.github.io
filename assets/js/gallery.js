// Lazy Load と モーダル表示
function initGallery() {
    console.log('Initializing Gallery...');
    // Lazy Loading (Intersection Observer API を使用する例)
    const lazyImages = document.querySelectorAll('.lazy-load');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  
    // モーダル表示 (簡易的な例)
    const galleryItems = document.querySelectorAll('.gallery-item a'); // サムネイルのリンク
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
  
    if (!modal || !modalImage || !closeModal) return; // 要素がなければ何もしない
  
    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const imageUrl = item.href;
        modalImage.src = imageUrl;
        modal.style.display = 'flex'; // または 'block'
        modal.classList.add('fade-in'); // アニメーション用クラス
      });
    });
  
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      modal.classList.remove('fade-in');
      modalImage.src = ''; // 画像をクリア
    });
  
    // モーダル外クリックで閉じる
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal.click();
      }
    });
  }
  
  // 認証成功後に呼び出されるか、認証不要なギャラリーならDOMContentLoadedで呼び出す
  // initGallery(); // auth.js または main.js から呼び出す