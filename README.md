# Void Atelier — Dark Obsidian & Royal Violet (Motyw Margonem NI)

Kompletny, mroczno-fioletowy motyw do Nowego Interfejsu Margonem (wraz z obsługą dodatków **Lootlog, Yuuki Pack, Gargonem, Maddonz, DAD** oraz odznakami rang NPC).

## Struktura repozytorium
```text
Void-Atelier/
├── assets/                     # Folder na 197 grafik .png oraz czcionkę .woff2
├── css/
│   └── void-atelier.css        # Główny arkusz stylów (używa względnych ścieżek ../assets/)
├── scripts/
│   └── palette-bindings.js     # Kolorowanie rang Elit/Herosów/Tytanów, graczy i timerów
├── install/
│   └── void-atelier.user.js    # Lekki skrypt instalacyjny do Tampermonkey
├── tools/
│   └── build_void_assets.py    # Skrypt Python automatycznie pobierający i przemalowujący wszystkie 197 grafik na fiolet/obsydian
└── release.json                # Metadane wydania
```

## Instrukcja krok po kroku (GitHub + jsDelivr CDN)

### Krok 1: Wygenerowanie przemalowanych grafik (`assets/`)
1. Rozpakuj paczkę `Void-Atelier-GitHub-Repo.zip` na swoim komputerze.
2. Otwórz terminal (PowerShell / CMD) w folderze `Void-Atelier` i zainstaluj biblioteki do obróbki obrazów:
   ```bash
   pip install pillow requests numpy
   ```
3. Uruchom skrypt budujący assety:
   ```bash
   python tools/build_void_assets.py
   ```
   *Skrypt w kilkanaście sekund pobierze wszystkie 197 plików z bazowego CDN i automatycznie przemaluje jasnoszare paski góra/dół na głęboki obsydian, a czerwone wstęgi i kryształy na królewski ametyst, zapisując je w folderze `assets/`.*
   *(Co więcej: każdy pojedynczy plik `.png` w folderze `assets/`, np. `belka-gora-dol.png` czy `hud-decoration.png`, możesz teraz dowolnie edytować w Photoshopie/GIMP-ie!)*

### Krok 2: Wrzucenie na GitHuba
1. Utwórz nowe **publiczne** repozytorium na swoim GitHubie o nazwie np. `Void-Atelier`.
2. Wrzuć wszystkie foldery (`assets/`, `css/`, `scripts/`, `install/`, `release.json`) do repozytorium:
   ```bash
   git init
   git add .
   git commit -m "Void Atelier v1.0"
   git branch -M main
   git remote add origin https://github.com/TWOJ_NICK_GITHUB/Void-Atelier.git
   git push -u origin main
   ```

### Krok 3: Podpięcie w Tampermonkey
1. Otwórz plik `install/void-atelier.user.js` i wpisz swój nick z GitHuba w zmiennej:
   ```javascript
   const GITHUB_USER = 'TWOJ_NICK_GITHUB';
   const GITHUB_REPO = 'Void-Atelier';
   const GIT_BRANCH  = 'main';
   ```
2. Wklej zawartość `void-atelier.user.js` do Tampermonkey i odśwież grę (`Ctrl + F5`).
3. Darmowy CDN **jsDelivr** (`https://cdn.jsdelivr.net/gh/TWOJ_NICK_GITHUB/Void-Atelier@main/css/void-atelier.css`) załaduje cały motyw natywnie z błyskawicznym cache'owaniem i bez ani jednego rozjechanego piksela!
