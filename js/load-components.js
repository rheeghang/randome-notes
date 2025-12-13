// 헤더와 푸터를 동적으로 로드하는 함수
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// 페이지 로드 시 컴포넌트 로드
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 경로에 따라 상대 경로 결정
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                        window.location.pathname.endsWith('/') ||
                        window.location.pathname.endsWith('/random-notes/');
    
    // 헤더 로드
    if (document.getElementById('header-container')) {
        const headerPath = isIndexPage ? 'components/header.html' : '../components/header-note.html';
        loadComponent('header-container', headerPath);
    }
    
    // 푸터 로드
    if (document.getElementById('footer-container')) {
        const footerPath = isIndexPage ? 'components/footer.html' : '../components/footer.html';
        loadComponent('footer-container', footerPath);
    }
});

