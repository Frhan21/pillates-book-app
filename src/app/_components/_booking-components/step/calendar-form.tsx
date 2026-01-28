import { useFormContext } from "react-hook-form";
import { Calendar } from "~/components/ui/calendar";
import { FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import type { BookingFormSchema } from "~/forms/booking";

const CalendarForm = () => {
  const { control, } = useFormContext<BookingFormSchema>();
  return (
    <div className="space-y-5">
      <div className="">
        <h3 className="text-2xl font-bold">
          Step 3: Pilih Tanggal Reservasi mu
        </h3>
        <p className="text-muted-foreground text-sm">
          Pilih tanggal yang tersedia untuk sesi Anda.
        </p>
      </div>
      <FormField
        name="date"
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-center justify-center space-y-4">
            <FormControl>
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                // Membatasi pilihan: Tidak bisa pilih hari kemarin & maksimal 14 hari ke depan
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const fourteenDaysLater = new Date();
                  fourteenDaysLater.setDate(today.getDate() + 14);

                  // Disable weekend (Sabtu=6, Minggu=0) dan tanggal di luar range
                  return (
                    date < today ||
                    date > fourteenDaysLater ||
                    date.getDay() === 0 ||
                    date.getDay() === 6
                  );
                }}
                className="rounded-md border shadow"
                initialFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CalendarForm;
