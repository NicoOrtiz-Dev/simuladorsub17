import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { clave, tipo, detalle } = req.body;
  if (clave !== "Ortiz245") return res.status(403).json({ error: "Clave incorrecta" });

  await pusher.trigger("partido", "evento", { tipo, detalle });
  res.status(200).json({ success: true });
}