// Costruisce le schede del Programma a partire da dati/eventi.json e dati/sedi.json.

const stato = document.getElementById("stato-eventi");
const griglia = document.getElementById("griglia-eventi");

const formatoGiorno = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "numeric",
  month: "long"
});

function mostraStato(testo) {
  stato.textContent = testo;
  stato.hidden = false;
}

async function leggiJSON(percorso) {
  const risposta = await fetch(percorso);
  if (!risposta.ok) {
    throw new Error(`${percorso}: risposta ${risposta.status}`);
  }
  return risposta.json();
}

// "2026-06-12" diventa "Venerdì 12 giugno". La data è creata in ora locale,
// così il fuso orario non la sposta al giorno prima.
function formattaGiorno(data) {
  const [anno, mese, giorno] = String(data).split("-").map(Number);
  const quando = new Date(anno, mese - 1, giorno);
  if (Number.isNaN(quando.getTime())) {
    return data;
  }
  const testo = formatoGiorno.format(quando);
  return testo.charAt(0).toUpperCase() + testo.slice(1);
}

function creaParagrafo(classe, testo) {
  const paragrafo = document.createElement("p");
  if (classe) {
    paragrafo.className = classe;
  }
  paragrafo.textContent = testo;
  return paragrafo;
}

function creaScheda(evento, sedi) {
  const sede = sedi.get(evento.sede_id);

  const scheda = document.createElement("article");
  scheda.className = "event-card";

  const immagine = document.createElement("img");
  immagine.src = evento.immagine;
  immagine.alt = evento.immagine_alt;
  immagine.width = 900;
  immagine.height = 600;

  const corpo = document.createElement("div");
  corpo.className = "event-body";

  const titolo = document.createElement("h3");
  titolo.textContent = evento.titolo;

  const luogo = creaParagrafo("event-place", "");
  const etichetta = document.createElement("strong");
  etichetta.textContent = "Sede:";
  luogo.append(etichetta, " ", sede ? sede.nome : "Sede da definire");

  corpo.append(
    creaParagrafo("event-meta", `${formattaGiorno(evento.data)} · ${evento.orario} · ${evento.categoria}`),
    titolo,
    creaParagrafo("", evento.descrizione),
    luogo
  );
  scheda.append(immagine, corpo);
  return scheda;
}

async function caricaProgramma() {
  let eventi;
  let elencoSedi;
  try {
    [eventi, elencoSedi] = await Promise.all([
      leggiJSON("dati/eventi.json"),
      leggiJSON("dati/sedi.json")
    ]);
  } catch (errore) {
    console.error("Programma non caricato:", errore);
    mostraStato("Non è stato possibile leggere i dati del programma. Riprova più tardi.");
    return;
  }

  if (!Array.isArray(eventi) || eventi.length === 0) {
    mostraStato("Al momento non ci sono eventi in programma.");
    return;
  }

  const sedi = new Map((Array.isArray(elencoSedi) ? elencoSedi : []).map((sede) => [sede.id, sede]));
  eventi.sort((a, b) => `${a.data} ${a.orario}`.localeCompare(`${b.data} ${b.orario}`));

  griglia.append(...eventi.map((evento) => creaScheda(evento, sedi)));
  stato.hidden = true;
}

caricaProgramma();
