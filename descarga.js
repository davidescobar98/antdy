// Enlaza los botones de descarga con el instalador de la última versión publicada. Si GitHub no responde, el enlace a la página de versiones sigue sirviendo.
(async function () {
  try {
    const res = await fetch('https://api.github.com/repos/davidescobar98/FinANTcial-Buddy/releases/latest', { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return;
    const release = await res.json();
    const setup = (release.assets || []).find(function (a) { return /^Antdy-Setup-[\d.]+\.exe$/.test(a.name); });
    if (!setup) return;
    document.querySelectorAll('[data-descarga]').forEach(function (a) { a.href = setup.browser_download_url; });
    const version = document.getElementById('version');
    if (!version) return;
    // El texto «Versión» viene de la página (data-label), para que salga en su idioma.
    version.textContent = (version.dataset.label || 'Versión') + ' ' + String(release.tag_name).replace(/^v/, '') + ' · ' + Math.round(setup.size / 1048576) + ' MB';
    version.hidden = false;
  } catch (e) { /* sin conexión con GitHub: se queda el enlace a la página de versiones */ }
})();
