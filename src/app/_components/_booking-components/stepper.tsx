"use client";

import { cn } from "~/lib/utils";

type currentStepsProps = {
  currentSteps: number;
};

const steps = [
  { id: 1, label: "Data Pemesan" },
  { id: 2, label: "Paket Pesanan" },
  { id: 3, label: "Tanggal Reservasi" },
  { id: 4, label: "Waktu Reservasi" },
  { id: 5, label: "Lokasi" },
  { id: 6, label: "Review" },
];

const Stepper = ({ currentSteps }: currentStepsProps) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      {steps.map((step, idx) => {
        const isActive = step.id === currentSteps;
        const isComplete = step.id < currentSteps;

        return (
          <div key={idx} className="flex w-full items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium",
                  isComplete && "bg-primary border-primary text-white",
                  isActive && "border-primary text-primary",
                  !isActive &&
                    !isComplete &&
                    "border-muted text-muted-foreground",
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "mt-2 text-center text-xs",
                  isActive && "text-primary font-medium",
                )}
              >
                {step.label}
              </span>
            </div>

            {idx !== steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1",
                  step.id < currentSteps ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
