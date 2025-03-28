// このファイルは gallery.html など、認証が必要なページでのみ読み込む
(function() {
    const galleryContent = document.getElementById('gallery-content'); // ギャラリー本体
    const authModal = document.getElementById('auth-modal'); // 認証モーダル
    const authForm = document.getElementById('auth-form');
    const passwordInput = document.getElementById('secret-word');
    const errorMessage = document.getElementById('auth-error-message');
    const correctPasswordHash = 'YOUR_HASHED_SECRET_WORD'; // ★重要: 実際の秘密の言葉をハッシュ化して設定
    const cookieName = 'gallery_auth';
  
    // 簡単なハッシュ化関数 (例: SHA-256 - 要ライブラリ or ネイティブAPI)
    // async function sha256(message) {
    //   const msgBuffer = new TextEncoder().encode(message);
    //   const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    //   const hashArray = Array.from(new Uint8Array(hashBuffer));
    //   const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    //   return hashHex;
    // }
  
    // クッキーチェック関数
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  
    // クッキー設定関数 (有効期限1ヶ月)
    function setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax"; // SameSite属性を追加
    }
  
    // --- 初期化処理 ---
    const isAuthenticated = getCookie(cookieName) === 'true';
  
    if (isAuthenticated) {
      // 認証済みならギャラリー表示
      if (galleryContent) galleryContent.style.display = 'block';
      if (authModal) authModal.style.display = 'none';
    } else {
      // 未認証ならモーダル表示
      if (galleryContent) galleryContent.style.display = 'none';
      if (authModal) authModal.style.display = 'flex'; // または 'block'
    }
  
    // フォーム送信イベント
    if (authForm) {
      authForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const enteredPassword = passwordInput.value;
  
        // ★重要: 入力されたパスワードをサーバーサイドと同じ方法でハッシュ化して比較する
        // const enteredPasswordHash = await sha256(enteredPassword);
        // if (enteredPasswordHash === correctPasswordHash) {
  
        // --- 簡易比較 (セキュリティは低い) ---
        // 実際の運用ではハッシュ化比較を強く推奨
        if (enteredPassword === "実際の秘密の言葉") { // ← 本番では使わない！
          setCookie(cookieName, 'true', 30); // 30日間有効なクッキーを設定
          if (authModal) authModal.style.display = 'none';
          if (galleryContent) galleryContent.style.display = 'block';
          if (errorMessage) errorMessage.style.display = 'none';
          // 必要ならギャラリー初期化処理をここで行う (Lazy Loadなど)
          if (typeof initGallery === 'function') {
              initGallery();
          }
        } else {
          if (errorMessage) {
            errorMessage.textContent = "違いますよ！"; // i18n対応するなら {% t gallery.auth_error %}
            errorMessage.style.display = 'block';
          }
          // ホームページへリダイレクト (オプション)
          // window.location.href = '/';
          passwordInput.value = ''; // 入力フィールドをクリア
        }
      });
    }
  
  })(); // 即時実行