#!/usr/bin/env python3
"""
Automatyczny generator i konwerter grafik dla motywu Void Atelier (Dark Obsidian & Royal Violet).
Pobiera wszystkie 197 plików z CDN bazowego motywu i przemalowuje grafiki PNG piksel-po-pikselu:
- Jasnoszare/białe tła belek (belka-gora-dol.png, widget-extension.png) -> Głęboki Ciemny Obsydian (#0d0618)
- Czerwone/rdzawe wstęgi i rubinowe kryształy -> Królewski Ametyst i Magenta (#a855f7 / #d946ef)
- Lodowo-błękitne tła okien i slotów (shop-interior.png, frost-surface.png) -> Ciemny Fioletowy Onyks

Wymagania:
    pip install pillow requests numpy
Uruchomienie:
    python build_void_assets.py
"""

import os
import io
import colorsys
from concurrent.futures import ThreadPoolExecutor
import requests
from PIL import Image
import numpy as np

ASSET_REF = "0456a467a1c164f6d09794bc042e349ea5ab8bcd"
BASE_URL = f"https://cdn.jsdelivr.net/gh/Doiua97/MotywyNI@{ASSET_REF}/Winter-Atelier/assets/"
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets")

ASSETS = [
    "auction-categories.png",
    "battle-compact-frame.png",
    "battle-pass-badge-free-banner.png",
    "battle-pass-badge-free-reward.png",
    "battle-pass-badge-premium-banner.png",
    "battle-pass-badge-premium-reward.png",
    "battle-pass-free-banner.png",
    "battle-pass-premium-banner.png",
    "battle-skill-tray.png",
    "battle-timer-fill.png",
    "belka-gora-dol.png",
    "bubble-bottom-joined.png",
    "bubble-bottom-left-joined.png",
    "bubble-left-joined.png",
    "bubble-right-joined.png",
    "bubble-top-joined.png",
    "build-index-frame.png",
    "c021ffec3.png",
    "c04d73750.png",
    "c0e5cc29d.png",
    "c11377b33.png",
    "c12960f03.png",
    "c13be630c.png",
    "c16232e20.png",
    "c1a0c565f.png",
    "c1aca8145.png",
    "c1c0a5035.png",
    "c1c1d47ae.png",
    "c1e4a8fee.png",
    "c24f4bef0.png",
    "c256b1e9c.png",
    "c258ab34c.png",
    "c27de1668.png",
    "c2c57b2bf.png",
    "c32624c45.png",
    "c356995b5.png",
    "c3cf646cf.png",
    "c404f8b94.png",
    "c41eced34.png",
    "c42419864.png",
    "c42c377fd.png",
    "c436dc709.png",
    "c498fd1b3.png",
    "c5323416e.png",
    "c53d73563.png",
    "c5999a827.png",
    "c5b5ea059.png",
    "c610527d8.png",
    "c6267fa73.png",
    "c64fab291.png",
    "c65150fd4.png",
    "c666e4db6.png",
    "c67e74b33.png",
    "c795c5dab.png",
    "c7a8e4762.png",
    "c800d4fcb.png",
    "c818dd515.png",
    "c819c6721.png",
    "c8e8c5ad0.png",
    "c8fa15547.png",
    "c92461850.png",
    "c94090deb.png",
    "c95589817.png",
    "c97bf7a64.png",
    "c9fb2afac.png",
    "ca0ca78de.png",
    "ca3d19b76.png",
    "ca52c314e.png",
    "cac721ba0.png",
    "cad4b2761.png",
    "caf92174e.png",
    "cb0dbfad1.png",
    "ccac86ffa.png",
    "cd8258d6c.png",
    "cda70a783.png",
    "cdad6e80d.png",
    "cdb7c95f3.png",
    "cdc327a1f.png",
    "ce518b9c1.png",
    "ce6ddb4ef.png",
    "ce8ca2127.png",
    "ce96b344c.png",
    "cefda68db.png",
    "cf2c04f14.png",
    "cf7f16293.png",
    "cf8580c30.png",
    "cff6893cc.png",
    "chat-icons.png",
    "clan-outfit-scene.png",
    "control-left-22x22.png",
    "control-lock-20x20.png",
    "control-message-25x24.png",
    "control-reset-14x14.png",
    "control-right-22x22.png",
    "control-star-12x16.png",
    "control-star-24x34.png",
    "cost-gold.png",
    "crafting-progress-track.png",
    "credits-gem.png",
    "cursor-1n.png",
    "cursor-2n.png",
    "cursor-3n.png",
    "cursor-4n.png",
    "cursor-5n.png",
    "dialogue-attack.png",
    "dialogue-auction.png",
    "dialogue-barter.png",
    "dialogue-bonus_reselect.png",
    "dialogue-cont_quest.png",
    "dialogue-depo.png",
    "dialogue-exit.png",
    "dialogue-game.png",
    "dialogue-heal.png",
    "dialogue-mail.png",
    "dialogue-motel.png",
    "dialogue-new_quest.png",
    "dialogue-next.png",
    "dialogue-shop.png",
    "equipment-empty-icons.png",
    "event-calendar.png",
    "field-material.png",
    "friend-header.png",
    "frost-surface.png",
    "gold-offers-light.png",
    "gold-offers.png",
    "hp-mask.png",
    "hp-zero.png",
    "hpStateSprite.png",
    "hud-decoration.png",
    "hud-rail-mask-0.png",
    "hud-rail-mask-1.png",
    "hud-top.png",
    "item-field-decor.png",
    "item-field.png",
    "krew-klatki.png",
    "loading-logo.png",
    "map-status-green.png",
    "map-status-orange.png",
    "map-status-red.png",
    "map-status-yellow.png",
    "matchmaking-card.png",
    "middle_graphics.png",
    "mission-label.png",
    "mission-next-hover.png",
    "mission-next.png",
    "mission-prev-hover.png",
    "mission-prev.png",
    "mission-reward.png",
    "mission-tile.png",
    "mission-time.png",
    "move-marker.png",
    "panel-material.png",
    "premium-categories.png",
    "profession-tracker.png",
    "pvp-states.png",
    "quest_bar.png",
    "search-glass.png",
    "shop-canopy.png",
    "shop-chests.png",
    "shop-interior.png",
    "shop-item-cell.png",
    "shop-scene.png",
    "slot-extraction.png",
    "title-left-hd.png",
    "title-right-hd.png",
    "ui-attack-19x19.png",
    "ui-collapse-13x13.png",
    "ui-control-atlas.png",
    "ui-defence-19x19.png",
    "ui-down-22x22.png",
    "ui-eye-12x12.png",
    "ui-gear-13x13.png",
    "ui-gear-24x24.png",
    "ui-gold-21x21.png",
    "ui-hourglass-14x16.png",
    "ui-info-17x17.png",
    "ui-matchmaking-history-96x96.png",
    "ui-matchmaking-queue-96x96.png",
    "ui-matchmaking-statistick-96x96.png",
    "ui-opacity-13x13.png",
    "ui-pin-20x16.png",
    "ui-profession-b-20x20.png",
    "ui-profession-h-20x20.png",
    "ui-profession-m-20x20.png",
    "ui-profession-p-20x20.png",
    "ui-profession-w-20x20.png",
    "ui-resist-19x19.png",
    "ui-resize-12x12.png",
    "ui-speed-19x19.png",
    "widget-extension.png",
    "width-card-button-active.png",
    "width-card-button.png",
    "window-close.png",
    "window-mode-silver-frame.png",
    "window-outer-frame.png",
    "winter-atelier-icon.png",
    "winter-atelier.woff2"
]

# Klasyfikacja trybu przemalowywania dla poszczególnych plików
BANNER_FILES = {"belka-gora-dol.png", "widget-extension.png", "quest_bar.png", "friend-header.png"}
SURFACE_FILES = {"shop-interior.png", "frost-surface.png", "panel-material.png", "field-material.png", "middle_graphics.png"}
SLOT_FILES = {"shop-item-cell.png", "item-field.png", "item-field-decor.png", "slot-extraction.png"}
HUD_FILES = {"hud-decoration.png", "hud-top.png", "window-outer-frame.png", "battle-compact-frame.png", "battle-skill-tray.png", "title-left-hd.png", "title-right-hd.png"}


def recolor_png_to_void(img: Image.Image, filename: str) -> Image.Image:
    rgba = img.convert("RGBA")
    arr = np.array(rgba, dtype=np.float32) / 255.0
    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    l = (max_c + min_c) / 2.0
    d = max_c - min_c

    s = np.zeros_like(l)
    mask_d = d > 1e-6
    mask_l = l > 0.5
    s[mask_d & mask_l] = d[mask_d & mask_l] / (2.0 - max_c[mask_d & mask_l] - min_c[mask_d & mask_l])
    s[mask_d & ~mask_l] = d[mask_d & ~mask_l] / (max_c[mask_d & ~mask_l] + min_c[mask_d & ~mask_l])

    h = np.zeros_like(l)
    idx_r = mask_d & (max_c == r)
    idx_g = mask_d & (max_c == g) & ~idx_r
    idx_b = mask_d & (max_c == b) & ~idx_r & ~idx_g

    h[idx_r] = ((g[idx_r] - b[idx_r]) / d[idx_r]) % 6.0
    h[idx_g] = ((b[idx_g] - r[idx_g]) / d[idx_g]) + 2.0
    h[idx_b] = ((r[idx_b] - g[idx_b]) / d[idx_b]) + 4.0
    h = (h * 60.0) % 360.0

    # Wykrywanie czerwonych/rdzawych wstęg oraz rubinowych klejnotów
    is_crimson = ((h < 50.0) | (h > 325.0)) & (s > 0.20)

    if filename in BANNER_FILES:
        # Jasnoszare tło belek -> Ciemny obsydian, wstęga -> żywy fiolet/ametyst
        new_h = np.where(is_crimson, 282.0, 266.0)
        new_s = np.where(is_crimson, np.clip(s * 1.2 + 0.12, 0.0, 1.0), np.clip(0.35 + (1.0 - l) * 0.25, 0.0, 0.68))
        new_l = np.where(is_crimson, np.clip((l ** 1.05) * 0.95, 0.08, 0.68), (l ** 2.35) * 0.44 + 0.03)
    elif filename in SURFACE_FILES:
        # Tła okien i paneli -> Bardzo głęboki mroczny fiolet
        new_h = 266.0
        new_s = np.clip(s * 1.1 + 0.28, 0.25, 0.65)
        new_l = (l ** 1.85) * 0.36 + 0.02
    elif filename in SLOT_FILES:
        # Gniazda przedmiotów -> Ciemne obsydianowe sloty z fioletową ramką
        new_h = 266.0
        new_s = np.clip(s * 1.15 + 0.25, 0.25, 0.65)
        new_l = (l ** 1.95) * 0.42 + 0.02
    elif filename in HUD_FILES:
        # Kula HP, dekoracje HUD, ramki okien -> Ciemny metaliczny fiolet + ametystowe kryształy
        new_h = np.where(is_crimson, 284.0, 268.0)
        new_s = np.where(is_crimson, np.clip(s * 1.25 + 0.15, 0.0, 1.0), np.clip(s * 1.3 + 0.20, 0.28, 0.75))
        new_l = np.where(is_crimson, np.clip((l ** 1.05) * 0.95, 0.10, 0.72), (l ** 1.80) * 0.56 + 0.03)
    else:
        # Pozostałe ikony, kursory, przyciski: przesunięcie zimowego błękitu (180-230) i czerwieni w stronę fioletu
        is_ice_blue = (h >= 175.0) & (h <= 235.0) & (s > 0.10)
        new_h = np.where(is_crimson, 282.0, np.where(is_ice_blue, 268.0, h))
        new_s = np.where(is_crimson | is_ice_blue, np.clip(s * 1.2 + 0.10, 0.0, 0.95), s)
        new_l = np.where(is_ice_blue, (l ** 1.35) * 0.78 + 0.02, l)

    # Konwersja powrotna HSL -> RGB (wektorowo)
    h_norm = (new_h % 360.0) / 60.0
    c = (1.0 - np.abs(2.0 * new_l - 1.0)) * new_s
    x = c * (1.0 - np.abs((h_norm % 2.0) - 1.0))
    m = new_l - c / 2.0

    r_out = np.zeros_like(new_l)
    g_out = np.zeros_like(new_l)
    b_out = np.zeros_like(new_l)

    s0 = (h_norm >= 0) & (h_norm < 1)
    s1 = (h_norm >= 1) & (h_norm < 2)
    s2 = (h_norm >= 2) & (h_norm < 3)
    s3 = (h_norm >= 3) & (h_norm < 4)
    s4 = (h_norm >= 4) & (h_norm < 5)
    s5 = (h_norm >= 5) & (h_norm < 6)

    r_out[s0], g_out[s0], b_out[s0] = c[s0], x[s0], 0
    r_out[s1], g_out[s1], b_out[s1] = x[s1], c[s1], 0
    r_out[s2], g_out[s2], b_out[s2] = 0, c[s2], x[s2]
    r_out[s3], g_out[s3], b_out[s3] = 0, x[s3], c[s3]
    r_out[s4], g_out[s4], b_out[s4] = x[s4], 0, c[s4]
    r_out[s5], g_out[s5], b_out[s5] = c[s5], 0, x[s5]

    out = np.stack([
        np.clip((r_out + m) * 255.0, 0, 255),
        np.clip((g_out + m) * 255.0, 0, 255),
        np.clip((b_out + m) * 255.0, 0, 255),
        np.clip(a * 255.0, 0, 255)
    ], axis=-1).astype(np.uint8)

    return Image.fromarray(out, "RGBA")


def process_one_asset(filename: str):
    url = BASE_URL + filename
    out_path = os.path.join(OUT_DIR, filename)
    try:
        resp = requests.get(url, timeout=20)
        resp.raise_for_status()
        if filename.lower().endswith(".png"):
            img = Image.open(io.BytesIO(resp.content))
            void_img = recolor_png_to_void(img, filename)
            void_img.save(out_path, format="PNG", optimize=True)
            print(f"[OK - PRZEMALOWANO] {filename}")
        else:
            with open(out_path, "wb") as f:
                f.write(resp.content)
            print(f"[OK - SKOPIOWANO]   {filename}")
    except Exception as e:
        print(f"[BŁĄD] {filename}: {e}")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    print(f"Rozpoczynam pobieranie i konwersję {len(ASSETS)} assetów do: {OUT_DIR}...")
    with ThreadPoolExecutor(max_workers=8) as pool:
        pool.map(process_one_asset, ASSETS)
    print("\nGotowe! Wszystkie assety zostały zapisane w folderze 'assets/'.")
    print("Teraz możesz wykonać: git add . && git commit -m 'Void Atelier 1.0' && git push")


if __name__ == "__main__":
    main()
