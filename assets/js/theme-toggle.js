(function() {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const htmlElement = document.documentElement;
  
    // 初期テーマ設定 (head.htmlのスクリプトで実行済みだが、念のため)
    const storedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = storedTheme || preferredTheme;
    htmlElement.setAttribute('data-theme', currentTheme);
  
    // ボタンクリックイベント
    themeToggleButton.addEventListener('click', () => {
      const current = htmlElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme); // 選択をlocalStorageに保存
    });
  
    // OSのテーマ変更を監視 (オプション)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // localStorageにユーザー設定がなければOS設定に追従
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
      }
    });
  })(); // 即時実行