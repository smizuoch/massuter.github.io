(function() {
    const pageContainer = document.getElementById('page-container');
    const mainContent = document.getElementById('main-content');
  
    if (!pageContainer || !mainContent) return;
  
    // 内部リンクのクリックをインターセプト
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
  
      // 内部リンクか、新しいタブで開く指定がないか、ダウンロードリンクでないかなどをチェック
      if (link && link.href.startsWith(window.location.origin) &&
          link.target !== '_blank' && !link.hasAttribute('download') &&
          !link.href.match(/\.(pdf|zip|jpg|png|gif)$/i) && // ファイル拡張子を除外
          !event.ctrlKey && !event.metaKey) { // Ctrl/Cmdクリックを除外
        event.preventDefault();
        const url = link.href;
  
        // 現在のURLと同じなら何もしない
        if (url === window.location.href) return;
  
        // フェードアウトなどの開始アニメーション
        pageContainer.classList.add('page-transition-out');
  
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.getElementById('main-content');
            const newTitle = doc.querySelector('title').innerText;
  
            if (newContent) {
              // コンテンツを入れ替え
              mainContent.innerHTML = newContent.innerHTML;
              // ページタイトルを更新
              document.title = newTitle;
              // URL履歴を更新
              window.history.pushState({ path: url }, '', url);
  
              // フェードインなどの終了アニメーション
              pageContainer.classList.remove('page-transition-out');
              pageContainer.classList.add('page-transition-in');
  
              // アニメーション完了後にクラスを削除
              pageContainer.addEventListener('animationend', () => {
                pageContainer.classList.remove('page-transition-in');
              }, { once: true });
  
              // 新しいページで必要なJSを再初期化する必要がある場合がある
              // 例: initGallery() など、動的に読み込まれたコンテンツに対する処理
              if (url.includes('/gallery/')) {
                // ギャラリー関連のJSを再実行
                if (typeof initAuth === 'function') initAuth();
                if (typeof initGallery === 'function') initGallery();
              }
              // テーマボタンなどのイベントリスナーは通常再設定不要
  
            } else {
              // コンテンツが見つからない場合は通常遷移
              window.location.href = url;
            }
          })
          .catch(error => {
            console.error('Fetch error:', error);
            // エラー時は通常のページ遷移にフォールバック
            window.location.href = url;
          });
      }
    });
  
    // ブラウザの戻る/進むボタンに対応
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.path) {
        // ここでもFetchしてコンテンツを入れ替える処理が必要
        // 上記のfetchロジックと同様の処理を実装
        const url = event.state.path;
        pageContainer.classList.add('page-transition-out'); // 開始アニメーション
  
        fetch(url)
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.getElementById('main-content');
            const newTitle = doc.querySelector('title').innerText;
  
            if (newContent) {
              mainContent.innerHTML = newContent.innerHTML;
              document.title = newTitle;
              // アニメーションなど
              pageContainer.classList.remove('page-transition-out');
              pageContainer.classList.add('page-transition-in');
              pageContainer.addEventListener('animationend', () => {
                pageContainer.classList.remove('page-transition-in');
              }, { once: true });
              // JS再初期化
              if (url.includes('/gallery/')) {
                if (typeof initAuth === 'function') initAuth();
                if (typeof initGallery === 'function') initGallery();
              }
            } else {
              window.location.reload(); // 失敗したらリロード
            }
          })
          .catch(error => {
            console.error('Popstate fetch error:', error);
            window.location.reload();
          });
      }
    });
  
    // CSSでトランジションを定義
    /*
    .page-transition-out {
      opacity: 0;
      transition: opacity 0.3s ease-out;
    }
    .page-transition-in {
      animation: fadeIn 0.3s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    */
  
  })(); // 即時実行