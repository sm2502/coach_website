document.addEventListener('DOMContentLoaded', () => {
  function setCookie(name, value, days) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }

  function getCookie(name) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
  }

  const alreadyAccepted =
    localStorage.getItem('cookiesAccepted') === 'true' ||
    getCookie('cookieConsent') === 'true';

  if (alreadyAccepted) return;

  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const privacyLink = isInPagesFolder ? 'datenschutz.html' : 'pages/datenschutz.html';

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <p>
      Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern.
      <a href="${privacyLink}">Mehr erfahren</a>
    </p>
    <button id="cookie-accept">OK</button>
  `;

  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookie('cookieConsent', 'true', 365);
    banner.remove();
  });
});