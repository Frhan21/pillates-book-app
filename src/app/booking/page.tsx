'use client'

import { useEffect } from "react";
import BookPage from "../pages/book-page";

const Page = () => {
  useEffect(() => {
    // render midtrans snap token
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.MIDTRANS_CLIENT_KEY;
    const script = document.createElement("script");

    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey!);
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <BookPage />
    </>
  );
};

export default Page;
