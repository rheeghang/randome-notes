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

// index.html에서 현재 페이지의 제목을 가져오는 함수
async function loadTitleFromIndex() {
    try {
        const currentFileName = window.location.pathname.split('/').pop();
        const indexPath = window.location.pathname.includes('/notes/') 
            ? '../index.html' 
            : 'index.html';
        
        const response = await fetch(indexPath);
        if (!response.ok) return;
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 현재 파일명을 가리키는 링크 찾기
        const link = doc.querySelector(`a[href*="${currentFileName}"]`);
        if (link) {
            const title = link.textContent.trim();
            document.title = `${title} - Random Notes`;
        }
    } catch (error) {
        console.error('Error loading title from index:', error);
    }
}

// 페이지 로드 시 컴포넌트 로드
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 경로에 따라 상대 경로 결정
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                        window.location.pathname.endsWith('/') ||
                        window.location.pathname.endsWith('/random-notes/');
    
    // 노트 페이지인 경우 index.html에서 제목 가져오기
    if (!isIndexPage && window.location.pathname.includes('/notes/')) {
        loadTitleFromIndex();
    }
    
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

