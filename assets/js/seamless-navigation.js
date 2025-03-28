document.addEventListener('DOMContentLoaded', function() {
  // 内部リンクをクリックした時の処理
  document.addEventListener('click', function(e) {
    // リンクでなければ何もしない
    if (!e.target.matches('a') || e.target.closest('.social-links')) {
      return;
    }
    
    const link = e.target.closest('a');
    const url = link.getAttribute('href');
    
    // 外部リンクや特殊なリンクの場合は通常の動作
    if (url.startsWith('http') || 
        url.startsWith('mailto:') || 
        url.startsWith('tel:') || 
        link.hasAttribute('target')) {
      return;
    }
    
    // 同一ドメイン内のリンクの場合
    e.preventDefault();
    
    // 現在のページをフェードアウト
    document.querySelector('.main-content').style.opacity = '0';
    
    // 少し待ってから新しいページに遷移
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  });
  
  // ページ読み込み時のフェードイン
  window.addEventListener('load', function() {
    document.querySelector('.main-content').style.opacity = '1';
  });
  
  // スタイルを追加
  const style = document.createElement('style');
  style.textContent = `
    .main-content {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(style);
});
