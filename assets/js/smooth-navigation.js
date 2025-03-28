document.addEventListener('DOMContentLoaded', function() {
  // 内部リンクのスムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // ヘッダーの高さを考慮
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ページのロード時にURLのハッシュを確認して該当箇所にスクロール
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
  });
});
