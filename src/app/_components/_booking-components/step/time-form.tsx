"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import type { BookingFormSchema } from "~/forms/booking";
import { cn } from "~/lib/utils"; // Utilitas shadcn untuk class merger

export function TimeForm() {
  const { control, watch } = useFormContext<BookingFormSchema>();

  // Kita bisa memantau tanggal yang dipilih untuk ditampilkan di teks
  const selectedDate = watch("date");

  const timeslots = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: false },
    { time: "16:00", available: true },
    { time: "17:00", available: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Step 4: Pilih Jam</h2>
        <p className="text-muted-foreground">
          {selectedDate 
            ? `Slot tersedia untuk ${new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}`
            : "Silahkan pilih tanggal terlebih dahulu"}
        </p>
      </div>

      <FormField
        control={control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {timeslots.map((slot) => {
                  const isSelected = field.value === slot.time;

                  return (
                    <button
                      key={slot.time}
                      type="button" // Penting agar tidak trigger submit form
                      disabled={!slot.available}
                      onClick={() => field.onChange(slot.time)}
                      className={cn(
                        "rounded-xl border-2 p-4 text-center font-semibold transition-all",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : slot.available
                            ? "border-border bg-card hover:border-primary/50 text-foreground hover:bg-primary/5"
                            : "border-border bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50",
                      )}
                    >
                      <span className="block">{slot.time}</span>
                      {!slot.available && (
                        <span className="text-[10px] tracking-wider uppercase">
                          Booked
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
