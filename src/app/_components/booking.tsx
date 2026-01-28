import Link from "next/link";
import { Button } from "~/components/ui/button";

const Booking = () => {
  return (
    <div className="mx-auto mt-10 flex min-h-96 w-full max-w-6xl flex-col items-center justify-center gap-10">
      <div className="flex max-w-3xl flex-col gap-4 text-center">
        <h3 className="text-6xl font-bold">
          Ready for your <span className="text-primary">Pilates</span> ?
        </h3>
        <p className="text-muted-foreground text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
          vero veniam labore, fuga atque possimus dolorum dignissimos quaerat
          quis magnam, tempore qui, sit quod.
        </p>
      </div>
      <Button
        className="border-primary hover:bg-muted/5 hover:text-primary cursor-pointer border-2 px-8 py-6 text-xl font-extrabold transition-all duration-300 ease-in-out hover:scale-105 hover:drop-shadow-md"
        asChild
      >
        <Link href={"/booking"}>Book Now !</Link>
      </Button>
    </div>
  );
};

export default Booking;
