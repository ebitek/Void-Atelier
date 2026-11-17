// ==UserScript==
// @name         Void Atelier (Dark Violet NI) + Labkowy HUB
// @namespace    VoidAtelier/MotywyNI
// @version      2.0.0
// @author       ebitek
// @description  Mroczno-fioletowy motyw interfejsu Margonem (Alt+U) połączony z Labkowym zestawem dodatków (HUB).
// @icon         https://griinlab.pl/scripts/icon.png
// @match        https://*.margonem.pl/*
// @match        https://*.margonem.com/*
// @exclude      https://margonem.pl/*
// @exclude      https://www.margonem.pl/*
// @exclude      https://forum.margonem.pl/*
// @exclude      https://pomoc.margonem.pl/*
// @run-at       document-end
// @noframes
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      griinlab.pl
// @connect      nubes-margonem.pl
// ==/UserScript==

(function () {
    'use strict';

    if (/^(www|forum|pomoc)\./i.test(location.hostname)) return;

    const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

    // 1. MODUŁ MOTYWU: VOID ATELIER (DARK VIOLET NI)
    const GITHUB_USER = 'ebitek';
    const GITHUB_REPO = 'Void-Atelier';
    const GIT_BRANCH  = 'main';
    const VERSION     = '2.0.0';

    const BASE_URL    = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GIT_BRANCH}/`;
    const LINK_ID     = 'motywy-ni-void-atelier-css';
    const PATCH_ID    = 'motywy-ni-void-atelier-unified-patch';
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
        pageWindow.dispatchEvent(new CustomEvent('void-atelier-toggle'));
    };

    syncTheme();

    window.addEventListener('keydown', (e) => {
        if (e.altKey && !e.ctrlKey && !e.shiftKey && e.code === 'KeyU') {
            e.preventDefault();
            isEnabled = !isEnabled;
            localStorage.setItem(STORAGE_KEY, isEnabled ? '1' : '0');
            syncTheme();
            if (typeof pageWindow.message === 'function') {
                pageWindow.message(`Void Atelier: ${isEnabled ? 'Włączony' : 'Wyłączony'}`);
            }
        }
    });

    const themeScriptEl = document.createElement('script');
    themeScriptEl.src = `${BASE_URL}scripts/palette-bindings.js?v=${VERSION}`;
    themeScriptEl.onload = () => themeScriptEl.remove();
    document.head.appendChild(themeScriptEl);

    // 2. MODUŁ DODATKÓW: LABKOWY ZESTAW DODATKÓW (HUB)
    const CORE_URL = 'https://griinlab.pl/scripts/hub2/core.js';

    pageWindow.LabBridge = {
        request(opts) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: opts.method || 'GET',
                    url: opts.url,
                    headers: opts.headers || {},
                    data: opts.data,
                    onload: res => resolve(res),
                    onerror: err => reject(err)
                });
            });
        }
    };

    pageWindow.LAB_request = function (opts) {
        GM_xmlhttpRequest({
            method: opts.method || 'GET',
            url: opts.url,
            headers: opts.headers || {},
            data: opts.data,
            onload: res => opts.onload && opts.onload(res),
            onerror: err => opts.onerror && opts.onerror(err)
        });
    };

    GM_xmlhttpRequest({
        method: 'GET',
        url: `${CORE_URL}?v=${Date.now()}`,
        onload: res => {
            if (res.status >= 200 && res.status < 300) {
                const script = document.createElement('script');
                script.textContent = res.responseText;
                document.head.appendChild(script);
            }
        }
    });
})();
