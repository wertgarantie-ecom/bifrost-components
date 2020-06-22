export default function getWertgarantieCookieValue(cookieName) {
    return document.cookie.match('(^|[^;]+)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
}