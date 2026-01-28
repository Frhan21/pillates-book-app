"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { bookingFormSchema, type BookingFormSchema } from "~/forms/booking";
import { api } from "~/trpc/react";
import CalendarForm from "./step/calendar-form";
import { LocationForm } from "./step/location-form";
import { NameForm } from "./step/name-form";
import PackageForm, { packages } from "./step/package-form";
import ReviewPage from "./step/review-reservation";
import { TimeForm } from "./step/time-form";
import Stepper from "./stepper";

const BookingCard = () => {
  const [step, setStep] = useState(1);

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
  const data = getValues();

  const { mutate: createReservatement, isPending: createLoading } =
    api.booking.createReservation.useMutation({
      onSuccess: () => {
        alert("Kamu berhasil membuat reservasi!");
        form.reset();
      },
    });

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

  const onSubmit = () => {
    createReservatement({
      name: data.name,
      email: data.email,
      phone: data.phone,
      packageId: data.packageId,
      price: packages.find((pkg) => pkg.id === data.packageId)?.fixedPrice ?? 0,
      date: data.date,
      time: data.time,
      location: data.location,
    });
  };
  return (
    <>
      <FormProvider {...form}>
        <div className="ml-[8rem]">
          <Stepper currentSteps={step} />
        </div>
        <Card className="mx-auto w-full max-w-4xl rounded-xl px-10 py-8 drop-shadow-lg">
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Button type="submit">Konfirmasi</Button>
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
