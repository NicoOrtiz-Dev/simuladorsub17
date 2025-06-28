import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export async function POST(request) {
  try {
    const body = await request.json();

    await pusher.trigger("partido", "evento", {
      tipo: body.tipo,
      detalle: body.detalle,
      jugador: body.jugador || "Desconocido"
    });

    return new Response("Evento enviado", { status: 200 });
  } catch (error) {
    console.error("Error en sendEvent.js:", error);
    return new Response("Error interno", { status: 500 });
  }
}
