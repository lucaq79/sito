/* =====================================================================
   GESTIONE DEL CONSENSO AI COOKIE — Studio Legale Avv. Luca Quartapelle
   ---------------------------------------------------------------------
   Testo del banner e delle categorie: come disposto dal titolare.
   Pulsanti: Accettare · Rifiutare · Scegliere.

   COME SI INSERISCE IL BANNER IN UNA PAGINA — due sole righe prima di </body>:

       <div id="ck-avviso" hidden></div>
       <script src="consenso.js" defer></script>

   (nella cartella /en/ il percorso è ../consenso.js)

   La preferenza è conservata nella memoria locale del dispositivo per sei
   mesi ed è revocabile in ogni momento dal collegamento con attributo
   data-ck="preferenze" presente nel piè di pagina di ciascuna pagina.

   CONTENUTI DI TERZI incorporati nelle pagine:
       <div data-terzi
            data-fonte="https://indirizzo-fornito-dal-servizio"
            data-titolo="Descrizione del contenuto"
            data-alto="420"
            data-pagina="https://indirizzo-pubblico-del-contenuto"></div>
   Sono subordinati all'unica categoria soggetta a consenso ("contenuti di
   terzi"), poiché i fornitori terzi installano di regola cookie propri.
   Perché siano visibili occorre inoltre ammetterne il dominio in frame-src
   nel file _headers.
   (18 ago. 2026: testi e categorie riallineati alla realtà del sito su
   ordine del titolare — niente Analytics, niente profilazione.)
   ===================================================================== */
(function () {
  'use strict';

  var CHIAVE = 'lq_consenso_v3';
  var SEI_MESI = 182 * 24 * 36e5;
  var CATEGORIE = ['terzi'];

  var avviso = document.getElementById('ck-avviso');
  var pannello = null;

  function leggi() {
    try {
      var s = JSON.parse(localStorage.getItem(CHIAVE));
      return (s && s.t && (Date.now() - s.t) <= SEI_MESI) ? s : null;
    } catch (e) { return null; }
  }
  function ammesso(cat) { var s = leggi(); return !!(s && s.c && s.c[cat]); }
  window.consensoCookie = ammesso;

  var EN = document.documentElement.lang === 'en';

  /* ---------------- stile ---------------- */
  var CSS = ''
  + '#ck-avviso[hidden],#ck-pannello[hidden]{display:none}'
  + '#ck-avviso{position:fixed;left:0;right:0;bottom:0;z-index:2000;background:#0a1a33;'
  +   'color:#f3efe8;border-top:2px solid #b99354;box-shadow:0 -8px 40px rgba(0,0,0,.4);'
  +   'font-family:var(--sans);font-size:.83rem;line-height:1.62;max-height:88vh;overflow-y:auto}'
  + '.ck-in{max-width:1200px;margin:0 auto;padding:26px 28px}'
  + '#ck-avviso h2{font-family:var(--display);font-weight:400;font-size:1.3rem;color:#fff;'
  +   'margin:0 0 12px;letter-spacing:-.012em}'
  + '#ck-avviso p{margin:0 0 20px;color:rgba(243,239,232,.8);max-width:110ch}'
  + '#ck-avviso a{color:#d4b479;text-decoration:underline}'
  + '.ck-righe{display:flex;gap:10px;flex-wrap:wrap;align-items:center}'
  + '.ck-b{font-family:inherit;font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;'
  +   'padding:12px 24px;border:1px solid #b99354;background:#b99354;color:#0a1a33;cursor:pointer;'
  +   'display:inline-block;text-align:center;text-decoration:none;font-weight:600}'
  + '.ck-b:hover{background:#d4b479;border-color:#d4b479}'
  + '.ck-bv{background:transparent;color:#f3efe8;border-color:rgba(243,239,232,.45)}'
  + '.ck-bv:hover{background:rgba(243,239,232,.08);border-color:#f3efe8}'
  + '#ck-pannello{position:fixed;inset:0;z-index:2100;background:rgba(10,26,51,.76);display:flex;'
  +   'align-items:center;justify-content:center;padding:22px;overflow-y:auto;font-family:var(--sans)}'
  + '.ck-box{background:#faf8f4;color:#252a33;max-width:660px;width:100%;padding:34px 36px;'
  +   'max-height:88vh;overflow-y:auto;border-top:2px solid #b99354}'
  + '.ck-box h2{font-family:var(--display);font-weight:400;font-size:1.55rem;color:#0a1a33;margin:0 0 8px}'
  + '.ck-box>p{font-size:.87rem;color:#4f5663;margin:0 0 22px}'
  + '.ck-cat{border-top:1px solid #e3ddd2;padding:18px 0}'
  + '.ck-ct{display:flex;justify-content:space-between;align-items:center;gap:18px;margin-bottom:6px}'
  + '.ck-ct strong{font-family:var(--serif,Georgia,serif);font-weight:600;font-size:1rem;color:#0a1a33}'
  + '.ck-ct label{cursor:pointer;margin:0}'
  + '.ck-sempre{font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;color:#8f6f3c;'
  +   'font-weight:700;flex-shrink:0}'
  + '.ck-ct input{width:40px;height:22px;flex-shrink:0;cursor:pointer;accent-color:#8f6f3c;margin:0}'
  + '.ck-cat p{margin:0;color:#4f5663;font-size:.85rem;line-height:1.6}'
  + '.ck-azioni{border-top:1px solid #e3ddd2;padding-top:20px;display:flex;gap:10px;flex-wrap:wrap}'
  + '.ck-b2{background:transparent;color:#0a1a33;border-color:#c9c1b2}'
  + '.ck-b2:hover{background:#0a1a33;border-color:#0a1a33;color:#f3efe8}'
  + '.ck-fermo{background:#f3efe8;border:1px dashed #e3ddd2;padding:32px 26px;text-align:center}'
  + '.ck-fermo p{max-width:52ch;margin:0 auto 16px;color:#4f5663;font-size:.9rem}'
  + '[data-terzi]{margin:2em 0}'
  + '@media(max-width:700px){.ck-in{padding:22px 20px}#ck-avviso{font-size:.79rem}'
  +   '.ck-righe{flex-direction:column;align-items:stretch}.ck-righe .ck-b{width:100%}'
  +   '.ck-box{padding:26px 22px}.ck-azioni{flex-direction:column}.ck-azioni .ck-b{width:100%}}';

  /* ---------------- testi ---------------- */
  var T = EN ? {
    titolo: "Privacy on this website",
    corpo: "This website uses no profiling cookies and no advertising tools; visits are measured anonymously, without cookies. The only category subject to consent is that of content published on third-party sites: loading it discloses your IP address to the provider hosting it, which may set cookies of its own. You may accept, refuse or choose; refusing does not limit your use of the site in any way. Your preference is kept on your device for six months and may be changed at any time from the ‘Preferences’ link in the footer. Further details are in the cookie policy.",
    policy: "cookie policy",
    hrefPolicy: "../cookie-policy.html", /* le pagine inglesi stanno in /en/ */
    accetta: "Accept",
    personalizza: "Choose",
    solo: "Refuse",
    pTitolo: "Preferences",
    pIntro: "Select what you allow, then confirm. Your choice may be changed at any time from the ‘Preferences’ link in the footer.",
    sempre: "Always active",
    conferma: "Confirm",
    tutti: "Accept",
    nessuno: "Refuse",
    cat: {
      necessari: ["Technical tools", "The site stores on your device, in local storage, only the preference expressed through this notice, together with its date. The data contains no identifiers, is transmitted to no one and expires after six months; visits are measured anonymously, without cookies. No consent is required."],
      terzi: ["Third-party content", "Some pages may embed content published on third-party sites: social buttons and content (for example the Facebook 'Like' button), documents, recordings, reference materials. Loading it discloses your IP address to the provider hosting it, which may set cookies of its own under its own policy. Without consent, nothing is loaded: a notice appears instead, with the option of opening the content on its original site."]
    },
    bloccato: "This content is published on a third-party site and is loaded only with your consent.",
    consenti: "Allow and view",
    apri: "Open on the original site"
  } : {
    titolo: "La riservatezza su questo sito",
    corpo: "Questo sito non utilizza cookie di profilazione né strumenti pubblicitari; gli accessi sono misurati in forma anonima, senza cookie. L’unica categoria soggetta a consenso è quella dei contenuti pubblicati su siti di terzi: il loro caricamento comporta la comunicazione dell’indirizzo IP al fornitore che li ospita, il quale può installare cookie propri. È possibile accettare, rifiutare o scegliere; il rifiuto non limita in alcun modo la consultazione del sito. La preferenza resta sul dispositivo per sei mesi ed è modificabile in ogni momento dal collegamento ‘Preferenze’ nel piè di pagina. I dettagli sono nella cookie policy.",
    policy: "cookie policy",
    hrefPolicy: "cookie-policy.html",
    accetta: "Accettare",
    personalizza: "Scegliere",
    solo: "Rifiutare",
    pTitolo: "Preferenze",
    pIntro: "Selezionare ciò che si intende consentire, poi confermare. La scelta è modificabile in ogni momento dal collegamento ‘Preferenze’ nel piè di pagina.",
    sempre: "Sempre attivi",
    conferma: "Confermare",
    tutti: "Accettare",
    nessuno: "Rifiutare",
    cat: {
      necessari: ["Strumenti tecnici", "Il sito conserva sul dispositivo, in local storage, soltanto la preferenza espressa con questo avviso, con la relativa data. Il dato non contiene identificatori, non è trasmesso ad alcun destinatario e si cancella decorsi sei mesi; gli accessi sono misurati in forma anonima, senza cookie. Non è richiesto consenso."],
      terzi: ["Contenuti di terzi", "Talune pagine possono richiamare contenuti pubblicati su siti di terzi: pulsanti e contenuti social (per esempio il pulsante «Mi piace» di Facebook), documenti, registrazioni, materiali di consultazione. Il caricamento comporta la comunicazione dell’indirizzo IP al fornitore che li ospita, il quale può installare cookie propri secondo la propria informativa. In difetto di consenso nessun contenuto viene caricato: compare un riquadro che consente, in alternativa, di aprirlo sul sito di origine."]
    },
    bloccato: "Il contenuto è pubblicato su un sito di terzi e viene caricato soltanto previo consenso.",
    consenti: "Consentire e visualizzare",
    apri: "Aprire sul sito di origine"
  };

  /* ---------------- costruzione ---------------- */
  var stile = document.createElement('style');
  stile.textContent = CSS;
  document.head.appendChild(stile);

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function corpoConLink() {
    return esc(T.corpo).replace(new RegExp(T.policy + '(?![^<]*>)', 'g'),
      '<a href="' + T.hrefPolicy + '">' + T.policy + '</a>');
  }

  if (avviso) {
    avviso.innerHTML = '<div class="ck-in">'
      + '<h2 id="ck-avt">' + esc(T.titolo) + '</h2>'
      + '<p>' + corpoConLink() + '</p>'
      + '<div class="ck-righe">'
      + '<button type="button" class="ck-b" data-ck="accetta">' + esc(T.accetta) + '</button>'
      + '<button type="button" class="ck-b ck-bv" data-ck="personalizza">' + esc(T.personalizza) + '</button>'
      + '<button type="button" class="ck-b ck-bv" data-ck="soloNecessari">' + esc(T.solo) + '</button>'
      + '</div></div>';
    avviso.setAttribute('role', 'dialog');
    avviso.setAttribute('aria-labelledby', 'ck-avt');
  }

  function riga(id, dati, sempre) {
    return '<div class="ck-cat"><div class="ck-ct">'
      + (sempre ? '<strong>' + esc(dati[0]) + '</strong><span class="ck-sempre">' + esc(T.sempre) + '</span>'
                : '<label for="ck-' + id + '"><strong>' + esc(dati[0]) + '</strong></label>'
                  + '<input type="checkbox" id="ck-' + id + '">')
      + '</div><p>' + esc(dati[1]) + '</p></div>';
  }

  function creaPannello() {
    if (pannello) return pannello;
    pannello = document.createElement('div');
    pannello.id = 'ck-pannello';
    pannello.hidden = true;
    pannello.setAttribute('role', 'dialog');
    pannello.setAttribute('aria-modal', 'true');
    pannello.setAttribute('aria-labelledby', 'ck-pt');
    pannello.innerHTML = '<div class="ck-box">'
      + '<h2 id="ck-pt">' + esc(T.pTitolo) + '</h2>'
      + '<p>' + esc(T.pIntro) + '</p>'
      + riga('necessari', T.cat.necessari, true)
      + riga('terzi', T.cat.terzi)
      + '<div class="ck-azioni">'
      + '<button type="button" class="ck-b" data-ck="conferma">' + esc(T.conferma) + '</button>'
      + '<button type="button" class="ck-b ck-b2" data-ck="accetta">' + esc(T.tutti) + '</button>'
      + '<button type="button" class="ck-b ck-b2" data-ck="soloNecessari">' + esc(T.nessuno) + '</button>'
      + '</div></div>';
    document.body.appendChild(pannello);
    return pannello;
  }

  /* ---------------- contenuti di terzi ---------------- */
  function mostraTerzo(b) {
    if (b.dataset.reso) return;
    var f = document.createElement('iframe');
    f.src = b.dataset.fonte;
    f.title = b.dataset.titolo || T.bloccato;
    f.loading = 'lazy';
    f.setAttribute('allowfullscreen', '');
    f.style.cssText = 'width:100%;height:' + (b.dataset.alto || '420') + 'px;border:0;display:block';
    b.innerHTML = ''; b.appendChild(f); b.dataset.reso = '1';
  }
  function bloccaTerzo(b) {
    if (b.dataset.reso) return;
    b.innerHTML = '<div class="ck-fermo"><p>' + esc(b.dataset.nota || T.bloccato) + '</p>'
      + '<button type="button" class="ck-b" data-ck="ammetti">' + esc(T.consenti) + '</button>'
      + (b.dataset.pagina ? ' <a class="ck-b ck-b2" href="' + b.dataset.pagina + '" target="_blank" rel="noopener">' + esc(T.apri) + '</a>' : '')
      + '</div>';
  }
  /* (18 ago. 2026: rimosso il blocco Google Analytics 4, mai attivato —
     il sito non usa strumenti di analisi con cookie. Le statistiche restano
     affidate a GoatCounter, senza cookie, caricato dalle singole pagine.) */

  function applica() {
    var ok = ammesso('terzi');
    Array.prototype.forEach.call(document.querySelectorAll('[data-terzi]'), function (b) {
      ok ? mostraTerzo(b) : bloccaTerzo(b);
    });
  }

  function scrivi(c) {
    try { localStorage.setItem(CHIAVE, JSON.stringify({ v: 3, t: Date.now(), c: c })); } catch (e) {}
    applica();
    if (avviso) avviso.hidden = true;
    if (pannello) pannello.hidden = true;
  }
  function tutte(v) { var c = {}; CATEGORIE.forEach(function (k) { c[k] = v; }); return c; }

  /* ---------------- avvio ---------------- */
  applica();
  if (avviso && !leggi()) avviso.hidden = false;

  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-ck]') : null;
    if (!t) return;
    var a = t.getAttribute('data-ck');
    if (a === 'accetta') scrivi(tutte(true));
    else if (a === 'soloNecessari') scrivi(tutte(false));
    else if (a === 'ammetti') { var c = leggi() ? leggi().c : tutte(false); c.terzi = true; scrivi(c); }
    else if (a === 'conferma') {
      var s = {};
      CATEGORIE.forEach(function (k) { var i = document.getElementById('ck-' + k); s[k] = !!(i && i.checked); });
      scrivi(s);
    } else if (a === 'personalizza' || a === 'preferenze') {
      e.preventDefault();
      creaPannello();
      CATEGORIE.forEach(function (k) { var i = document.getElementById('ck-' + k); if (i) i.checked = ammesso(k); });
      if (avviso) avviso.hidden = true;
      pannello.hidden = false;
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pannello && !pannello.hidden) {
      pannello.hidden = true;
      if (avviso && !leggi()) avviso.hidden = false;
    }
  });
})();
