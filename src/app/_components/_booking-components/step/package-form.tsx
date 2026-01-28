import { useFormContext } from "react-hook-form";
import { Card } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import type { BookingFormSchema } from "~/forms/booking";
import { toRupiah } from "~/lib/toRupiah";
import { cn } from "~/lib/utils";

interface Package {
  id: string;
  name: string;
  description: string;
  duration: string;
  features: string[];
  fixedPrice: number;
}

export const packages: Package[] = [
  {
    id: "single-session",
    name: "Single Session",
    description: "Perfect for trying pilates",
    duration: "60 minutes",
    features: [
      "Full session with instructor",
      "All equipment included",
      "Access to locker room",
    ],
    fixedPrice: 35000,
  },
  {
    id: "class-pack-5",
    name: "Class Pack (5 Sessions)",
    description: "Great value, valid for 3 months",
    duration: "60 minutes each",
    features: [
      "5 sessions included",
      "All equipment provided",
      "Flexible scheduling",
      "Save $35 total",
    ],
    fixedPrice: 135000,
  },
  {
    id: "monthly-unlimited",
    name: "Monthly Unlimited",
    description: "Best value for regular practice",
    duration: "Unlimited access",
    features: [
      "Unlimited sessions",
      "Priority booking",
      "Guest passes included",
      "Member benefits",
    ],
    fixedPrice: 119000,
  },
];

const PackageForm = () => {
  const { control, watch } = useFormContext<BookingFormSchema>();
  const selected = watch("packageId");

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-4xl font-bold">Paket Pesanan</h2>
        <p className="text-muted-foreground text-sm">
          Pilih paket yang kamu inginkan
        </p>
      </div>
      <FormField
        control={control}
        name="packageId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {packages.map((pack, idx) => {
                  const active = field.value === pack.id;
                  return (
                    <Card
                      key={idx}
                      onClick={() => field.onChange(pack.id)}
                      className={cn(
                        "cursor-pointer border-2 transition-all",
                        active
                          ? "border-primary ring-primary ring-1"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <div className="flex h-full flex-col p-6">
                        <h3 className="text-xl font-bold">{pack.name}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          {pack.description}
                        </p>
                        <div className="mb-4">
                          <p className="text-primary text-2xl font-bold">
                            {toRupiah(pack.fixedPrice)}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {pack.duration}
                          </p>
                        </div>
                        <ul className="text-muted-foreground flex-grow space-y-2 text-sm">
                          {pack.features.map((f, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-primary">✓</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
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
};

export default PackageForm;
