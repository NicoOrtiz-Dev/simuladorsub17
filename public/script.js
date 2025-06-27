const pusher = new Pusher("TU_PUSHER_KEY", { cluster: "TU_CLUSTER" });
const channel = pusher.subscribe("partido");
let golesN = 0, golesA = 0;

function vibrar(ms=500){ if(navigator.vibrate) navigator.vibrate(ms) }
function mostrar(texto, tipo){
  const div = document.createElement("div"); div.className = "alerta";
  if(tipo==="gol") {
    const img = document.createElement("img");
    img.src = texto.includes("Nacional")
      ? "https://upload.wikimedia.org/wikipedia/commons/5/5f/Escudo_Atl%C3%A9tico_Nacional.png"
      : "https://upload.wikimedia.org/wikipedia/commons/0/0f/Escudo_Am%C3%A9rica_de_Cali.png";
    img.style.width="60px"; div.append(img); vibrar(800);
  }
  div.innerHTML += `<div>${texto}</div>`;
  document.getElementById("notificaciones").prepend(div);
}

channel.bind("evento", ({ tipo, detalle }) => {
  if(tipo==="gol") {
    detalle==="Nacional"?++golesN:++golesA;
    document.getElementById("marcador").innerText = `${golesN} - ${golesA}`;
    mostrar(`⚽ ¡Gol de ${detalle}!`,"gol");
  } else mostrar(`🔔 ${detalle}`,"evento");
});

let s=0; setInterval(()=>{
  s++;
  const m = String(Math.floor(s/60)).padStart(2,"0"),
        sg=String(s%60).padStart(2,"0");
  document.getElementById("reloj").innerText = `${m}:${sg}`;
},1000);