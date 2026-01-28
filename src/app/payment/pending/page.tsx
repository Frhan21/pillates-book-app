import Link from "next/link";
import { Button } from "~/components/ui/button";

const Page = () => {
  return (
    <div className="bg-primary/5 mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-1/2 space-y-4 text-center">
        <h3 className="text-7xl font-bold">Terimakasih</h3>
        <p className="text-muted-foreground">
          Semoga kamu bisa menikmati layanan ini.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button className="text-md px-6 py-3 hover:shadow-md" asChild>
            <Link href={"/"}>Kembali ke Dashboard</Link>
          </Button>
          <Button className="text-md px-6 py-3" variant={"outline"} asChild>
            <Link href={"/booking"}>Booking lagi ?</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
