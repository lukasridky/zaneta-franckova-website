# Žanet Francková — osobní umělecký web

První česká verze portfolia, připravená jako dárek. Statické HTML, CSS a JavaScript bez instalace balíčků, frameworku, externích fontů či sledování. Zdrojová větev: `main`. Publikovat se má **jen složka `public`**.

## Co funguje

- Responzivní portfolio, galerie se třemi jasně označenými zástupnými kompozicemi, filtrování a detail v dialogu (Escape, návrat fokusu).
- Sekce o autorce bez vymyšleného životopisu, návrh procesu zakázek, kontakt.
- Pomocník připraví text poptávky ke zkopírování. **Nic neodesílá, neukládá ani neposílá na server.** Nežádá e-mail. Skutečný kontakt zatím není znám.
- Newsletter je pouze plán, bez přihlašování a sběru adres.
- Vlastní 404, bezpečnostní hlavičky pro Pages, omezení animací dle nastavení zařízení.

## Spuštění u sebe

Otevřete `public/index.html` v moderním prohlížeči. Základ funguje i bez serveru; kopírování do schránky může vyžadovat localhost nebo HTTPS (pak lze text označit a zkopírovat ručně). Máte-li Python, z kořene projektu spusťte:

```sh
python -m http.server 8080 --directory public
```

Potom otevřete http://localhost:8080. Žádný build není potřeba.

## Nasazení na Cloudflare Pages

1. V Cloudflare otevřete Workers & Pages, vytvořte projekt **Pages** s Git integrací.
2. Povolte přístup k `lukasridky/zaneta-franckova-website` a vyberte repozitář.
3. Produkční větev: `main`. Framework preset: **None**. Root directory: kořen repozitáře (nechte prázdné).
4. Build command: `exit 0`. Build output directory: `public`.
5. Uložte a nasaďte. Další změny na `main` se po úspěšném propojení automaticky nasazují.
6. Zkontrolujte přidělenou HTTPS adresu, skutečnou 404 a bezpečnostní hlavičky. Vlastní doménu připojte až po schválení obsahu autorkou.

Postup ověřen podle [Cloudflare: Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) a [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/). Tento repozitář neznamená, že už byl hosting propojen nebo web nasazen. Nejsou potřeba žádná tajemství ani proměnné prostředí.

## Jednoduchá údržba

| Co změnit | Kde |
| --- | --- |
| Obrazy, názvy, rozměry, popisy, filtr | `public/content.js` |
| Fotografie a obrázky | `public/assets/` |
| Úvodní obraz (nyní samostatná ukázka) | `public/index.html`, sekce `.hero-art` |
| Texty, kontakt, příběh autorky | `public/index.html` |
| Barvy, typografie, rozložení | `public/style.css`, proměnné na začátku |
| Chování galerie a pomocníka | `public/app.js` |

Pro nové dílo přidejte objekt do `window.ARTWORKS`, použijte jedinečné `id`, lokální cestu obrázku a kategorii `available` nebo `archive`. Texty jsou vkládány bezpečně přes `textContent`. Všechny stávající názvy, rozměry a stavy jsou **ukázkové**; současné SVG jsou vlastní technické placeholdery pro návrh, nikoli díla Žanet Franckové. Nemají být prodávány ani vydávány za její tvorbu. Po výměně upravte i štítky v `app.js`, alternativní texty, úvodní upozornění a metadata.

Fotografie připravte ideálně jako WebP/JPEG, kolem 1200–1600 px na delší straně; ověřte barvy, práva a velikost souboru. Poměr stran aktuálních ukázek je 4:5. Při odlišném poměru aktualizujte atributy `width` a `height` pro stabilní rozložení.

## Než web představíme veřejnosti

1. Se Žanet vyberte skutečné obrazy, fotografie, názvy, techniky, rozměry, ceny a ověřte dostupnost; nahraďte všechny ukázky.
2. Doplňte jí schválený osobní text a vlastní fotografii; ověřte, zda skutečně nabízí zakázky, a potvrďte podmínky.
3. Doplňte ověřený kontakt. Současný pomocník může zůstat přípravou textu; pro skutečné odesílání je nutný backend / služba, validace na serveru, ochrana proti spamu, práce s chybami a informace o zpracování osobních údajů. Až potom změňte text tlačítka a hlášení. CSP nyní záměrně zakazuje síťové požadavky a odeslání formulářů; při integraci povolte jen potřebné cíle.
4. Před prodejem doplňte skutečné podmínky objednávky, plateb, dopravy a relevantní právní informace. Nyní nejde o e-shop a nic se neobjednává.
5. Newsletter zapněte až s vybranou službou, potvrzováním přihlášení, odhlášením a informacemi o soukromí. Nyní žádné adresy nesbíráme.
6. Po schválení odstraňte `noindex, nofollow` z `index.html`, změňte `robots.txt`, doplňte kanonickou URL, sdílecí obrázek a sitemapu se skutečnou doménou. `noindex` není ochrana soukromí. GitHub repozitář je veřejný; pro utajení dárku použijte skutečné řízení přístupu k náhledu.

## Kontrola změn

Spusťte `powershell -File scripts/check.ps1` (nebo `pwsh -File scripts/check.ps1`). Kontrola hlídá lokální soubory, datové položky a základní ochrany prototypu; nenahrazuje prohlížeč. Ručně ověřte šířky 390 / 768 / 1440 px, filtry, detail, zavření Escape, tabulátor, poptávku i kopírování, klávesnici a čitelnost. Bez JavaScriptu funguje hlavní obsah a navigace, galerie zobrazuje vysvětlení.

## Další rozvoj

Nejbližší krok: získat 6–12 fotografií skutečných obrazů, krátký schválený text a kontaktní e-mail. Poté vyměnit ukázky a společně zkontrolovat barevnost. Následovat může skutečné odesílání poptávek a samostatné stránky obrazů; newsletter až podle zájmu. Administrační systém má smysl až tehdy, když úpravy v jednom datovém souboru přestanou stačit.

Autorská díla a osobní fotografie nejsou součástí této první verze. Licence k budoucím dílům se bez souhlasu autorky neuděluje.

