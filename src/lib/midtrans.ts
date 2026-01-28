import Midtrans from "midtrans-client";
import { env } from "~/env";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: env.MIDTRANS_SERVER_KEY,
  clientKey: env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export default snap;

