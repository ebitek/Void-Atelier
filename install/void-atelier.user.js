// ==UserScript==
// @name         Void Atelier (Dark Violet NI)
// @namespace    VoidAtelier/MotywyNI
// @version      1.6.1
// @author       ebitek
// @description  Mroczno-fioletowy motyw interfejsu Margonem. Alt+U: wł/wył.
// @match        https://*.margonem.pl/*
// @match        https://*.margonem.com/*
// @exclude      https://margonem.pl/*
// @exclude      https://www.margonem.pl/*
// @exclude      https://forum.margonem.pl/*
// @exclude      https://pomoc.margonem.pl/*
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';

    if (/^(www|forum|pomoc)\./i.test(location.hostname)) return;

    const GITHUB_USER = 'ebitek';
    const GITHUB_REPO = 'Void-Atelier';
    const GIT_BRANCH  = 'main';
    const VERSION     = '1.6.1';

    const BASE_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GIT_BRANCH}/`;
    const LINK_ID = 'motywy-ni-void-atelier-css';
    const PATCH_ID = 'motywy-ni-void-atelier-live-patch';
    const STORAGE_KEY = 'void_atelier_enabled';

    let isEnabled = localStorage.getItem(STORAGE_KEY) !== '0';

    const linkEl = document.createElement('link');
    linkEl.id = LINK_ID;
    linkEl.rel = 'stylesheet';
    linkEl.href = `${BASE_URL}css/void-atelier.css?v=${VERSION}`;

    const syncTheme = () => {
        if (isEnabled) {
            if (!document.getElementById(LINK_ID)) {
                document.head.appendChild(linkEl);
            }
        } else {
            linkEl.remove();
            const patchEl = document.getElementById(PATCH_ID);
            if (patchEl) patchEl.remove();
        }
        window.dispatchEvent(new CustomEvent('void-atelier-toggle'));
    };

    syncTheme();

    window.addEventListener('keydown', (e) => {
        if (e.altKey && !e.ctrlKey && !e.shiftKey && e.code === 'KeyU') {
            e.preventDefault();
            isEnabled = !isEnabled;
            localStorage.setItem(STORAGE_KEY, isEnabled ? '1' : '0');
            syncTheme();
            if (typeof window.message === 'function') {
                window.message(`Void Atelier: ${isEnabled ? 'Włączony' : 'Wyłączony'}`);
            }
        }
    });

    const scriptEl = document.createElement('script');
    scriptEl.src = `${BASE_URL}scripts/palette-bindings.js?v=${VERSION}`;
    scriptEl.onload = () => scriptEl.remove();
    document.head.appendChild(scriptEl);
})();
