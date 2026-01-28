"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { packages } from "~/constant/package";
import { env } from "~/env";
import { bookingFormSchema, type BookingFormSchema } from "~/forms/booking";
import { api } from "~/trpc/react";
import CalendarForm from "./step/calendar-form";
import { LocationForm } from "./step/location-form";
import { NameForm } from "./step/name-form";
import PackageForm from "./step/package-form";
import ReviewPage from "./step/review-reservation";
import { TimeForm } from "./step/time-form";
import Stepper from "./stepper";

const BookingCard = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Midtrans script loading
  const midtransScriptLoaded = useRef(false);
  useEffect(() => {
    if (midtransScriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY);
    script.async = true;

    document.body.appendChild(script);
    midtransScriptLoaded.current = true;

    return () => {
      document.body.removeChild(script);
      midtransScriptLoaded.current = false;
    };
  }, []);

  const form = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      packageId: "",
      date: "",
      location: "",
      time: "",
    },
  });
  const { getValues } = form;

  const { mutateAsync: createToken, isPending: tokenLoading } =
    api.booking.createToken.useMutation();

  const { mutateAsync: createReservation, isPending: createLoading } =
    api.booking.createReservation.useMutation();

  const isProcessing = tokenLoading || createLoading;

  const stepFields: Record<number, (keyof BookingFormSchema)[]> = {
    1: ["name", "email", "phone"],
    2: ["packageId"],
    3: ["date"],
    4: ["time"],
    5: ["location"],
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => async () => {
    const fields = stepFields[step];
    if (!fields) return setStep(step + 1);

    const valid = await form.trigger(fields);
    if (valid) setStep(step + 1);
  };

  const handlePay = async () => {
    if (!window.snap) {
      alert("Midtrans script not loaded yet.");
      return;
    }

    const data = getValues();
    const selectedPrice =
      packages.find((pkg) => pkg.id === data.packageId)?.fixedPrice ?? 0;
    const orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      // 1. Create reservation in DB
      await createReservation({
        orderId: orderId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        packageId: data.packageId,
        price: selectedPrice,
        date: new Date(data.date),
        time: data.time,
        location: data.location,
      });

      // 2. Create Midtrans token
      const token = await createToken({
        id: orderId,
        email: data.email,
        phone: data.phone,
        name: data.name,
        price: selectedPrice,
        packageId: data.packageId,
      });

      // 3. Open Midtrans payment popup
      window.snap.pay(token.token, {
        onSuccess: function () {
          router.push(`/payment/success?order_id=${orderId}`);
        },
        onPending: function () {
          router.push(`/payment/pending?order_id=${orderId}`);
        },
        onError: function () {
          // TODO: maybe create a failure page?
          alert("Payment failed!");
          router.push(`/booking`);
        },
        onClose: function () {
          console.log(
            "customer closed the popup without finishing the payment",
          );
        },
      });
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan, silakan coba lagi.");
    }
  };
  return (
    <>
      <FormProvider {...form}>
        <div className="ml-[8rem]">
          <Stepper currentSteps={step} />
        </div>
        <Card className="mx-auto w-full max-w-4xl rounded-xl px-10 py-8 drop-shadow-lg">
          <form>
            <CardContent>
              {step === 1 && <NameForm />}
              {step === 2 && <PackageForm />}
              {step === 3 && <CalendarForm />}
              {step === 4 && <TimeForm />}
              {step === 5 && <LocationForm />}
              {step === 6 && <ReviewPage />}
              <div className="mt-10 flex items-start gap-2">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Kembali
                  </Button>
                )}

                {step < 6 ? (
                  <Button type="button" onClick={nextStep()}>
                    Lanjut
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePay}
                  >
                    {isProcessing ? "Memproses..." : "Bayar"}
                  </Button>
                )}
              </div>
            </CardContent>
          </form>
        </Card>
      </FormProvider>
    </>
  );
};

export default BookingCard;
