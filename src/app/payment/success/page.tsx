"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";

const Page = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const statusCode = searchParams.get("status_code");
  const transactionStatus = searchParams.get("transaction_status");

  let title = "Terimakasih sudah melakukan pembayaran";
  let message = `Pembayaran untuk Order ID: ${orderId} telah berhasil.`;

  if (transactionStatus === "settlement" || transactionStatus === "capture") {
    title = "Pembayaran Berhasil!";
    message = `Pembayaran untuk Order ID: ${orderId} telah berhasil diproses.`;
  } else if (transactionStatus === "pending") {
    title = "Pembayaran Tertunda";
    message = `Pembayaran untuk Order ID: ${orderId} sedang menunggu konfirmasi.`;
  } else if (
    transactionStatus === "deny" ||
    transactionStatus === "cancel" ||
    transactionStatus === "expire" ||
    statusCode !== "200"
  ) {
    title = "Pembayaran Gagal";
    message = `Pembayaran untuk Order ID: ${orderId} gagal. Silakan coba lagi atau hubungi dukungan.`;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center">
      <div className="text-center mb-5">
        <h3 className="text-6xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">
          {message}
        </p>
        {orderId && (
          <p className="mt-4 text-sm text-gray-500">Order ID: {orderId}</p>
        )}
      </div>
      <Button asChild>
        <Link href={"/"}>
          <Home className="mr-2 h-4 w-4" />
          Kembali ke dashboard
        </Link>
      </Button>
    </div>
  );
};

export default Page;
