document.addEventListener('DOMContentLoaded', () => {
    // ページ内リンクをクリックしたときにAJAXでコンテンツだけロードしてみるイメージ
    // 実際には路径解決やHistory APIの管理などもう少し実装が必要
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
  
        fetch(url)
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('#main-content');
            if (newContent) {
              document.querySelector('#main-content').innerHTML = newContent.innerHTML;
              history.pushState({}, '', url);
            }
          })
          .catch(err => {
            console.error(err);
            // リンク先取得失敗時は通常の遷移
            window.location.href = url;
          });
      });
    });
  });
  