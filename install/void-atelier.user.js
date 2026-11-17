// ==UserScript==
// @name         Void Atelier (Dark Violet NI)
// @namespace    VoidAtelier/MotywyNI
// @version      1.0.0
// @author       TwójNick
// @description  Mroczno-fioletowy motyw interfejsu Margonem (Obsidian & Amethyst). Alt+U włącza/wyłącza motyw.
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

    // =========================================================================
    // KONFIGURACJA TWOJEGO REPOZYTORIUM GITHUB:
    // Zamień "TWOJ_NICK_GITHUB" oraz "NAZWA_REPO" na swoje dane po wrzuceniu plików!
    // Możesz też użyć konkretnego commita zamiast "@main", np. "@a1b2c3d..."
    // =========================================================================
    const GITHUB_USER = 'TWOJ_NICK_GITHUB';
    const GITHUB_REPO = 'Void-Atelier';
    const GIT_BRANCH  = 'main';

    const BASE_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GIT_BRANCH}/`;
    const LINK_ID = 'motywy-ni-void-atelier-css';
    const STORAGE_KEY = 'void_atelier_enabled';

    let isEnabled = localStorage.getItem(STORAGE_KEY) !== '0';

    const linkEl = document.createElement('link');
    linkEl.id = LINK_ID;
    linkEl.rel = 'stylesheet';
    linkEl.href = `${BASE_URL}css/void-atelier.css`;

    const syncTheme = () => {
        if (isEnabled) {
            if (!document.getElementById(LINK_ID)) {
                document.head.appendChild(linkEl);
            }
        } else {
            linkEl.remove();
        }
    };

    syncTheme();

    // Skrót klawiszowy Alt + U (włącz / wyłącz)
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

    // Załadowanie skryptu bindowania palety (odznaki Elit/Herosów/Tytanów i Timery)
    const scriptEl = document.createElement('script');
    scriptEl.src = `${BASE_URL}scripts/palette-bindings.js`;
    scriptEl.onload = () => scriptEl.remove();
    document.head.appendChild(scriptEl);

    // Podmiana znacznika ruchu (X) na mapie
    try {
        const res = await fetch(`${BASE_URL}assets/move-marker.png`);
        if (res.ok) {
            const blob = await res.blob();
            const dataUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
            for (let i = 0; i < 150; i++) {
                const cross = window.Engine?.imgLoader?.checkExist?.('/img/cross.gif', false);
                if (cross && typeof cross.src === 'string') {
                    cross.src = dataUrl;
                    break;
                }
                await new Promise(r => setTimeout(r, 200));
            }
        }
    } catch (e) {}
})();
