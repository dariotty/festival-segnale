# Resoconto del lavoro con l'AI

Strumento usato: Claude Code.

## Sessione 1 — 4 novembre 2026

- **Che cosa ho chiesto:** far funzionare menu e pulsante «Esplora il programma», colorare la linea dell'intestazione con il colore principale, disporre le schede del Programma con CSS Grid (1, 2 e 3 colonne), aggiungere i quattro eventi mancanti, personalizzare colori, caratteri e spaziature.
- **Che cosa ho usato:** le modifiche proposte ai collegamenti, la griglia con `gap` e media query a 600 e 1024 px, le quattro schede generate dai contenuti forniti.
- **Che cosa ho modificato o scelto io:** il colore principale (prima rosso), lo spazio sotto l'intestazione (ridotto due volte), il padding delle schede, la dimensione del sottotitolo; ho chiesto il logo nel carattere dei titoli ma non il sottotitolo.
- **Come ho verificato:** ho controllato le pagine a varie larghezze (numero di colonne, assenza di scorrimento orizzontale) e il contrasto dei colori rispetto al riferimento di 4,5:1.
- **Problemi e soluzioni:** all'inizio i font erano scaricati nella cartella del sito per non usare servizi esterni; la consegna successiva ha chiesto invece il collegamento a Google Fonts, che ho adottato.

## Sessione 2 — 11 novembre 2026

- **Che cosa ho chiesto:** la pagina Info e luoghi con galleria Swiper 14.4.0, mappa uMap, indirizzi e indicazioni per le tre sedi.
- **Che cosa ho usato:** la struttura della pagina, la galleria con pulsanti Precedente/Successiva e senza avanzamento automatico, i testi alternativi delle foto scritti a partire dalle immagini, le schede delle sedi con i collegamenti a Google Maps.
- **Come ho verificato:** ho provato i pulsanti della galleria con mouse e tastiera (focus visibile, Invio e Spazio cambiano foto) e ho controllato le pagine a 375, 768 e 1280 px.
- **Problemi e soluzioni:** nell'anteprima di VS Code la mappa mostrava «403 Forbidden». Con l'AI ho scoperto che uMap blocca le richieste dell'anteprima di VS Code (Electron) ma non quelle dei browser normali. Soluzione: controllare la mappa nel browser.

## Sessione 3 — 18 novembre 2026

- **Che cosa ho chiesto:** un moodboard, il carattere Instrument Serif per i titoli da Google Fonts, i colori #264653 e #2A9D8F, il menu in colonna sul telefono, l'intestazione sticky, titoli più grandi, il nome «Segnale» in corsivo.
- **Che cosa ho scartato:** il moodboard in PDF generato dall'AI: l'ho fatto annullare e ho realizzato il mio, poi salvato in `progettazione/moodboard.pdf`.
- **Che cosa ho usato o modificato:** il collegamento a Google Fonts (poi esteso al corsivo), #264653 come colore principale e #2A9D8F solo per elementi grafici, l'intestazione sticky resa più compatta sul telefono.
- **Come ho verificato:** ho controllato i contrasti, l'intestazione sticky durante lo scorrimento a larghezza di telefono e di computer e, dopo la pubblicazione, il sito pubblico, compreso il caricamento dei font nel pannello Network.
- **Problemi e soluzioni:** #2A9D8F non raggiunge il contrasto 4,5:1 con il testo, quindi è usato solo per bordi e decorazioni; Instrument Serif non ha il grassetto, quindi i titoli sono a peso normale; sul telefono l'intestazione sticky occupava il 36% dello schermo ed è stata compattata.

## Sessione 4 — 25 novembre 2026

- **Che cosa ho chiesto:** completare `dati/eventi.json` e `dati/sedi.json`, descriverli in `dati/SCHEMA.md` con lo schema Mermaid, generare il Programma con `fetch`, aggiungere il meteo di Torino da Open-Meteo in Info e luoghi.
- **Che cosa ho usato:** i dati presi dalle pagine del sito, la scheda dati, `js/programma.js` (schede costruite dai JSON, messaggi di caricamento, nessun evento ed errore, «Sede da definire») e `js/meteo.js`.
- **Che cosa ho modificato:** ho riportato il menu in riga a tutte le larghezze, perché la colonna sul telefono peggiorava la visualizzazione.
- **Come ho verificato:** con Live Preview ho fatto le cinque prove richieste, ripristinando ogni volta i file: nome di una sede cambiato, eventi vuoti, `sedi.json` rinominato, `sede_id` inesistente, `temperatura_2m` nell'indirizzo del meteo. Poi ho controllato il resto del sito a larghezza di telefono e di computer.
- **Problemi e soluzioni:** con il doppio clic `fetch` non funziona, serve Live Preview; nel test di errore del meteo comparivano riquadri vuoti perché `display: grid` scavalcava `hidden`, corretto con una regola CSS.
