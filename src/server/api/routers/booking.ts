import z from "zod";
// import { packages } from "~/app/_components/_booking-components/step/package-form";
import { packages } from "~/constant/package";
import snap from "~/lib/midtrans";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({
  createReservation: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
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
          orderId: input.orderId,
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

  createToken: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        packageId: z.string(),
        price: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const pkg = packages.find((pk) => pk.id === input.packageId);

      if (!pkg) {
        throw new Error("Package not found");
      }

      const parameter = {
        items_details: {
          name: pkg?.name,
          amount: pkg?.fixedPrice,
        },
        transaction_details: {
          order_id: input.id,
          gross_amount: pkg?.fixedPrice,
        },
        customer_details: {
          first_name: input.name,
          last_name: " ",
          email: input.email,
          phone: input.phone,
        },
      };

      const token = await snap.createTransaction(parameter);
      return token;
    }),
});
