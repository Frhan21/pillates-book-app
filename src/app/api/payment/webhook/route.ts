import crypto from "crypto";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

type MidtransNotificationPayload = {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status:
    | "capture"
    | "settlement"
    | "pending"
    | "deny"
    | "cancel"
    | "expire"
    | "failure";
  fraud_status?: "accept" | "challenge" | "deny";
};

export async function POST(req: Request) {
  const body = (await req.json()) as MidtransNotificationPayload;

  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
    fraud_status,
  } = body;

  // 1. Verifikasi signature
  const serverKey = process.env.MIDTRANS_SERVER_KEY!;

  const expectedSignature = crypto
    .createHash("sha512")
    .update(order_id + status_code + gross_amount + serverKey)
    .digest("hex");

  if (expectedSignature !== signature_key) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
  }

  // 2. Tentukan status pembayaran
  let paymentStatus: "PAID" | "FAILED" | "PENDING" = "PENDING";

  if (transaction_status === "settlement" || transaction_status === "capture") {
    if (fraud_status === "accept") {
      paymentStatus = "PAID";
    }
  }

  if (
    transaction_status === "cancel" ||
    transaction_status === "expire" ||
    transaction_status === "deny"
  ) {
    paymentStatus = "FAILED";
  }

  // 3. Update database
  await db.reservation.update({
    where: { orderId: order_id },
    data: { paid: paymentStatus, paidAt: new Date() },
  });

  // 4. Response WAJIB 200
  return NextResponse.json({ received: true });
}
