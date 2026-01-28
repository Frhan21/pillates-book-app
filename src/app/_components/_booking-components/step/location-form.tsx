"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "~/components/ui/form";
import type { BookingFormSchema } from "~/forms/booking";
import { cn } from "~/lib/utils";

interface Location {
  id: string;
  name: string;
  address: string;
  amenities: string[];
  icon: string;
}

const locations: Location[] = [
  {
    id: "downtown",
    name: "Downtown Studio",
    address: "123 Main Street, Downtown",
    amenities: ["Free parking", "Shower facilities", "Lounge area", "WiFi"],
    icon: "🏢",
  },
  {
    id: "midtown",
    name: "Midtown Studio",
    address: "456 Park Avenue, Midtown",
    amenities: ["Street parking", "Changing rooms", "Café", "Lockers"],
    icon: "🌃",
  },
  {
    id: "westside",
    name: "Westside Studio",
    address: "789 Oak Boulevard, Westside",
    amenities: [
      "Private lot parking",
      "Spa facilities",
      "Studio shop",
      "Juice bar",
    ],
    icon: "🌳",
  },
];
export function LocationForm() {
  const { control } = useFormContext<BookingFormSchema>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Step 5: Pilih Lokasi Studio</h2>
        <p className="text-muted-foreground">
          Pilih lokasi studio yang paling nyaman untuk Anda kunjungi.
        </p>
      </div>

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {locations.map((location) => {
                  const isSelected = field.value === location.id;

                  return (
                    <Card
                      key={location.id}
                      className={cn(
                        "flex flex-col overflow-hidden border-2 transition-all",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border",
                      )}
                    >
                      <div className="flex h-full flex-col p-6">
                        <div className="mb-4 text-4xl">{location.icon}</div>
                        <h3 className="mb-2 text-xl font-bold">
                          {location.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 flex-grow text-sm">
                          {location.address}
                        </p>

                        <div className="mb-6">
                          <p className="text-muted-foreground mb-3 text-[10px] font-bold tracking-wider uppercase">
                            Amenities
                          </p>
                          <ul className="space-y-2">
                            {location.amenities.map((amenity, idx) => (
                              <li
                                key={idx}
                                className="text-muted-foreground flex items-center gap-2 text-sm"
                              >
                                <span className="text-primary">•</span>
                                {amenity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => field.onChange(location.id)}
                          className="w-full font-semibold"
                        >
                          {isSelected ? "Terpilih" : "Pilih Lokasi"}
                        </Button>
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
}
