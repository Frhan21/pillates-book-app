import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({
  createReservation: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        packageId: z.string(),
        date: z.coerce.date(),
        time: z.string(), 
        price: z.number(),
        location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const reservation = await db.reservation.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          packageId: input.packageId,
          date: input.date,
          time: input.time,
          price: input.price,
          location: input.location,
        },
      });

      return reservation;
    }),
});
