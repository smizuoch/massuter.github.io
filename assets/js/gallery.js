document.addEventListener('DOMContentLoaded', () => {
    const galleryPage = document.querySelector('.page-gallery');
    if (!galleryPage) return;
  
    // Cookieに認証フラグがあればOK
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('vrc_access='));
    if (!authCookie) {
      // 未認証 → ポップアップでパスワード入力
      const secret = prompt('秘密の言葉を入力してください');
      if (secret === 'YOUR_SECRET_WORD') {
        // 正解 → Cookieに記録（1ヶ月有効）
        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 1);
        document.cookie = `vrc_access=1; expires=${expiry.toUTCString()}; path=/;`;
        alert('ようこそ！');
      } else {
        // 間違い → ホームへリダイレクト
        alert('違いますよ！');
        window.location.href = '/';
      }
    }
  });
  