# Plantmetingen

Een eenvoudige app voor je telefoon om wekelijks de bladgroei van potplanten in de kwekerij te meten. Je loopt elke week langs een vaste set meetplanten en meet het jongste blad. Zo zie je wat remmen, belichting en klimaat doen met de ontwikkeling van het gewas.

De app lijkt qua opzet en kleuren op de Scoutronde-app. Het is één webpagina die op je telefoon draait, ook zonder internet in de kas. Er is geen account of server nodig.

## Werkwijze

1. **Meetplanten vastleggen** (tabblad *Planten*): per plant de naam/code, de soort/cultivar, de oppotweek en het oppotjaar, de afdeling en de baan. Je kunt ook een startbladnummer en een notitie invullen.
2. **Wekelijkse ronde** (tabblad *Meten*):
   - De app kiest automatisch de volgende plant die deze week nog niet gemeten is.
   - Meet de **lengte** en **breedte** van het jongste blad in cm. De knoppen −½ / +½ beginnen bij de vorige meting, en je ziet direct de groei ten opzichte van vorige week.
   - Groeit het blad nauwelijks meer (minder dan 0,3 cm/week)? Dan geeft de app een hint. Het blad is dan uitgegroeid: zet **Wissel naar nieuw blad** aan en meet het volgende nieuwe blad.
   - Zet aan wat er deze week speelde: **Geremd**, **Belichting aan** of **Klimaatwijziging**. De app onthoudt dit per afdeling.
   - In de notitie zet je bijzonderheden, zoals het middel en de dosering, temperaturen of afwijkingen.
   - Onderaan zie je de voortgang van de ronde. Tik op een plant om ernaartoe te springen.
3. **Grafieken**:
   - *Per plant*: de bladlengte en -breedte per week (elke kleur is een blad) en de groei in cm/week. Weken met remmen, belichting of een klimaatwijziging zijn gemarkeerd. Daaronder staat een tabel met alle metingen, waarin je foute metingen kunt verwijderen.
   - *Vergelijken*: de gemiddelde groei per week per afdeling, soort of plant, met een samenvatting van de groei **geremd vs. niet geremd**.
4. **Export**:
   - Metingen en de plantenlijst als CSV. Die opent direct goed in Nederlandse Excel (puntkomma's, komma als decimaalteken). De export bevat de berekende groei, de weken na oppotten en de omstandigheden.
   - Een back-up (JSON) maken en terugzetten, bijvoorbeeld om over te stappen naar een nieuwe telefoon of om data samen te voegen.

### Hoe wordt groei berekend?

Groei is het verschil met de vorige meting **van hetzelfde blad**, omgerekend naar cm per 7 dagen. De eerste meting van een nieuw blad heeft dus nog geen groeiwaarde.

## Installeren op je telefoon

De app draait via **GitHub Pages**:

1. Ga in deze repository naar **Settings → Pages**.
2. Kies bij *Source* voor **Deploy from a branch**, branch `main`, map `/ (root)`, en klik op **Save**.
3. Na een minuut staat de app op `https://<jouw-gebruikersnaam>.github.io/Plantmetingen/`.
4. Open die link op je telefoon:
   - **Android (Chrome)**: menu ⋮ → *App installeren* / *Toevoegen aan startscherm*
   - **iPhone (Safari)**: deelknop → *Zet op beginscherm*
5. Open de app één keer met internet. Daarna werkt hij ook offline in de kas.

## Waar staan mijn gegevens?

Alle gegevens staan **alleen op je eigen telefoon**, in de opslag van de browser/app. Er gaat niets naar GitHub of een server.

- Maak regelmatig een **back-up** (tabblad *Export*), bijvoorbeeld na elke ronde, en zet die op OneDrive of Google Drive.
- Wis je de browsergegevens of verwijder je de app? Dan zijn de metingen weg als je geen back-up hebt.
- Op een iPhone kan Safari de gegevens van een website opruimen die je lang niet gebruikt. Installeer de app daarom op het beginscherm.

## Bestanden

| Bestand | Functie |
|---|---|
| `index.html` | De hele app (opmaak, logica, grafieken) |
| `manifest.json` | Maakt de app installeerbaar op je telefoon |
| `sw.js` | Service worker, zorgt dat de app offline werkt |
| `icon.svg`, `icon-192.png`, `icon-512.png` | App-icoon |

## Een nieuwe versie uitbrengen

Pas je `index.html` aan? Verhoog dan het versienummer in `sw.js` (`plantmetingen-v1` → `plantmetingen-v2`). Telefoons halen de nieuwe versie dan op bij de volgende keer openen met internet. Je gegevens blijven bewaard.
