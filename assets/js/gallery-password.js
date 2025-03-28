document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.querySelector('.gallery-container');
  const passwordModal = document.getElementById('password-modal');
  const passwordForm = document.getElementById('password-form');
  const passwordInput = document.getElementById('gallery-password');
  const passwordError = document.getElementById('password-error');
  
  const COOKIE_NAME = 'gallery_access';
  const PASSWORD = 'vrcsecret'; // これは本番環境では別の方法で管理した方が良いです
  
  // クッキー取得関数
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
  
  // クッキー設定関数
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }
  
  // アクセス権限の確認
  function checkAccess() {
    const hasAccess = getCookie(COOKIE_NAME) === 'true';
    
    if (hasAccess) {
      showGallery();
    } else {
      showPasswordModal();
    }
  }
  
  // ギャラリーを表示
  function showGallery() {
    if (galleryContainer) {
      galleryContainer.classList.add('visible');
    }
    if (passwordModal) {
      passwordModal.classList.remove('active');
    }
  }
  
  // パスワードモーダルを表示
  function showPasswordModal() {
    if (passwordModal) {
      passwordModal.classList.add('active');
    }
  }
  
  // パスワードフォームの送信処理
  if (passwordForm) {
    passwordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const password = passwordInput.value.trim();
      
      if (password === PASSWORD) {
        setCookie(COOKIE_NAME, 'true', 30); // 30日間有効
        showGallery();
      } else {
        passwordError.textContent = '秘密の言葉が違います。';
        passwordInput.value = '';
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    });
  }
  
  // ページ読み込み時に実行
  if (galleryContainer) {
    checkAccess();
  }
});
