export default function getWertgarantieCookieValue(cookieName) {
    const cookieContent = document.cookie.match('(^|[^;]+)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
    return cookieContent ? JSON.parse(cookieContent.pop()) : undefined;
}