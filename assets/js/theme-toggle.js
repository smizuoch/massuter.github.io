(function() {
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    // ローカルストレージにテーマ選択があるかチェック
    const savedTheme = localStorage.getItem('theme');
  
    if (savedTheme) {
      // 保存されたテーマを反映
      body.classList.toggle('dark-theme', savedTheme === 'dark');
      body.dataset.theme = savedTheme;
    } else {
      // OSの設定を初回だけ反映
      if (userPrefersDark) {
        body.classList.add('dark-theme');
        body.dataset.theme = 'dark';
      } else {
        body.classList.remove('dark-theme');
        body.dataset.theme = 'light';
      }
    }
  
    // ボタンクリックで切り替え
    toggleBtn.addEventListener('click', () => {
      const isDark = body.classList.contains('dark-theme');
      if (isDark) {
        body.classList.remove('dark-theme');
        body.dataset.theme = 'light';
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.add('dark-theme');
        body.dataset.theme = 'dark';
        localStorage.setItem('theme', 'dark');
      }
    });
  })();
  