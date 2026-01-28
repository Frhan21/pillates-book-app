import z from "zod";

export const bookingFormSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Nomor tidak valid"),

  packageId: z.string().min(1, "Paket wajib dipilih"),

  date: z.string().min(1, "Tanggal wajib diisi"),
  time: z.string().min(1, "Waktu wajib diisi"),

  location: z.string().min(1, "Lokasi wajib diisi"),
});

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
