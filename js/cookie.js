document.addEventListener('DOMContentLoaded', () => {
  // Hilfsfunktionen für Cookies
  function setCookie(name, value, days) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }
  function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
  }

  const alreadyAccepted =
    localStorage.getItem('cookiesAccepted') === 'true' || getCookie('cookieConsent') === 'true';

  if (alreadyAccepted) return; // Banner nicht einblenden

  // Banner einfügen
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <p>
      Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern.
      <a href="/pages/datenschutz.html">Mehr erfahren</a>
    </p>
    <button id="cookie-accept">OK</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', () => {
    // Beides setzen: localStorage + Cookie (wirkt auf Server unter allen Pfaden)
    localStorage.setItem('cookiesAccepted', 'true');
    setCookie('cookieConsent', 'true', 365);
    banner.remove();
  });
});
