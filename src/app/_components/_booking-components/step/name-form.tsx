"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { BookingFormSchema } from "~/forms/booking";

export function NameForm() {
  const { control } = useFormContext<BookingFormSchema>();
  return (
    <div className="space-y-5">
      <div className="text-2xl font-bold">Step 1: Fill your Information</div>
      {/* Form Nama */}
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Jhon Doe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Form Email */}
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                placeholder="youremail@example.om"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Form Nomor Telp */}
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="(+62) 9xx xxxx xxx"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
