document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지의 경로를 확인하여 컴포넌트 경로 결정
    const isNotePage = window.location.pathname.includes('/notes/') || window.location.pathname.includes('notes/');
    const basePath = isNotePage ? '../' : '';
    
    // Header 로드
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        const headerPath = isNotePage ? `${basePath}components/header-note.html` : `${basePath}components/header.html`;
        fetch(headerPath)
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Header를 로드하는 중 오류가 발생했습니다:', error);
            });
    }
    
    // Footer 로드
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        const footerPath = `${basePath}components/footer.html`;
        fetch(footerPath)
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Footer를 로드하는 중 오류가 발생했습니다:', error);
            });
    }
});

