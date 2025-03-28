document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // OSのカラーモード設定を確認
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // ローカルストレージから保存されたテーマを取得
  const savedTheme = localStorage.getItem('theme');
  
  // 初期テーマを設定
  if (savedTheme) {
    body.className = savedTheme === 'dark' ? 'theme-dark' : 'theme-light';
  } else {
    body.className = prefersDarkMode ? 'theme-dark' : 'theme-light';
  }
  
  // テーマ切り替えボタンのクリック処理
  themeToggle.addEventListener('click', function() {
    if (body.classList.contains('theme-light')) {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
    }
  });
});
