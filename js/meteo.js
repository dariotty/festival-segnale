// Meteo attuale a Torino da Open-Meteo (nessun account né chiave).
// Se la richiesta non riesce, compare un messaggio e il resto della pagina continua a funzionare.

const INDIRIZZO_METEO =
  "https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869" +
  "&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome";

const statoMeteo = document.getElementById("stato-meteo");
const datiMeteo = document.getElementById("meteo-dati");

const formatoNumero = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 1 });
const formatoData = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "numeric",
  month: "long"
});

// "2026-11-25T12:45" è già nell'ora di Roma: si separano data e ora senza
// passare dal fuso orario del browser.
function formattaOra(istante) {
  const [data, ora] = String(istante).split("T");
  const [anno, mese, giorno] = data.split("-").map(Number);
  const giornoTesto = formatoData.format(new Date(anno, mese - 1, giorno));
  return `${giornoTesto}, ore ${ora}`;
}

async function caricaMeteo() {
  try {
    const opzioni = "timeout" in AbortSignal ? { signal: AbortSignal.timeout(8000) } : {};
    const risposta = await fetch(INDIRIZZO_METEO, opzioni);
    if (!risposta.ok) {
      throw new Error(`risposta ${risposta.status}`);
    }
    const meteo = await risposta.json();
    const attuale = meteo.current;
    const unita = meteo.current_units;
    if (!attuale || typeof attuale.temperature_2m !== "number" || typeof attuale.wind_speed_10m !== "number") {
      throw new Error("dati meteo incompleti");
    }

    document.getElementById("meteo-temperatura").textContent =
      `${formatoNumero.format(attuale.temperature_2m)} ${unita.temperature_2m}`;
    document.getElementById("meteo-vento").textContent =
      `${formatoNumero.format(attuale.wind_speed_10m)} ${unita.wind_speed_10m}`;
    document.getElementById("meteo-ora").textContent = formattaOra(attuale.time);

    datiMeteo.hidden = false;
    statoMeteo.hidden = true;
  } catch (errore) {
    console.error("Meteo non caricato:", errore);
    statoMeteo.textContent = "Il meteo non è disponibile in questo momento. Riprova più tardi.";
  }
}

caricaMeteo();
