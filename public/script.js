

const pusher = new Pusher("32360ed1be476bc06d0e", { cluster: "mt1" });
const channel = pusher.subscribe("partido");
let golesN = 0, golesA = 0;

function vibrar(ms=500){ if(navigator.vibrate) navigator.vibrate(ms); }

function mostrar(texto, tipo){
  const div = document.createElement("div"); div.className = "alerta";

  if(tipo === "gol") {
    const img = document.createElement("img");
   img.src = texto.includes("Nacional")
  ? "img/nacional.png"
  : "img/america.png";
    img.style.width = "60px";
    div.append(img);
    vibrar(800);
  }

  div.innerHTML += `<div>${texto}</div>`;
  document.getElementById("notificaciones").prepend(div);
}

channel.bind("evento", (data) => {
  const { tipo, detalle, jugador } = data;

  if (tipo === "gol") {
    if (detalle === "Nacional") {
      golesN++;
    } else if (detalle === "América") {
      golesA++;
    }

    document.getElementById("marcador").innerText = `${golesN} - ${golesA}`;

    mostrar(
      `⚽ ¡Gol de ${detalle}!<br/>👟 Lo hizo: ${jugador || "Desconocido"}`,
      "gol"
    );
  } else {
    mostrar(`🔔 ${detalle}`, "evento");
  }
});


let s = 0;
setInterval(() => {
  s++;
  const m = String(Math.floor(s / 60)).padStart(2, "0"),
        sg = String(s % 60).padStart(2, "0");
  document.getElementById("reloj").innerText = `${m}:${sg}`;
}, 1000);
