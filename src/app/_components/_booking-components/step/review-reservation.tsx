import { useFormContext } from "react-hook-form";
import { packages } from "~/constant/package";
import type { BookingFormSchema } from "~/forms/booking";
import { toRupiah } from "~/lib/toRupiah";

const ReviewPage = () => {
  const { getValues } = useFormContext<BookingFormSchema>();
  const data = getValues();

  const getPackageData = (id: string) => {
    const pkgData = packages.find((pkg) => pkg.id === id);
    return pkgData;
  };

  const locationMap: Record<string, string> = {
    downtown: 'Downtown Studio',
    midtown: 'Midtown Studio',
    westside: 'Westside Studio',
  }; 

  const displayLocation = locationMap[data.location] 

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <h2 className="text-foreground mb-2 text-3xl font-bold">
          Review Your Reservation
        </h2>
        <p className="text-muted-foreground mb-8">
          Please verify all details before proceeding to payment
        </p>
      </div>
      <div className="space-y-6">
        {/* Customer Information */}
        <div className="border-border border-b pb-6">
          <h3 className="text-foreground mb-4 text-lg font-bold">
            Your Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-semibold">
                Name
              </p>
              <p className="text-foreground font-medium">{data.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-semibold">
                Phone
              </p>
              <p className="text-foreground font-medium">{data.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground mb-1 text-sm font-semibold">
                Email
              </p>
              <p className="text-foreground font-medium">{data.email}</p>
            </div>
          </div>
        </div>

        {/* Package Information */}
        <div className="border-border border-b pb-6">
          <h3 className="text-foreground mb-4 text-lg font-bold">
            Package Details
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-semibold">
                Package
              </p>
              <p className="text-foreground font-medium">{getPackageData(data.packageId)?.name}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground mb-1 text-sm font-semibold">
                Price
              </p>
              <p className="text-primary text-2xl font-bold">{toRupiah(getPackageData(data.packageId)?.fixedPrice ?? 0)}</p>
            </div>
          </div>
        </div>

        {/* Session Information */}
        <div className="border-border border-b pb-6">
          <h3 className="text-foreground mb-4 text-lg font-bold">
            Session Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-semibold">
                Date
              </p>
              <p className="text-foreground font-medium">
                {new Date(data.date)?.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-semibold">
                Time
              </p>
              <p className="text-foreground font-medium">{data.time} WIB</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-semibold">
                Location
              </p>
              <p className="text-foreground font-medium">
                {displayLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-primary/10 border-primary/20 rounded-lg border p-4">
          <p className="text-muted-foreground mb-2 text-sm">
            <span className="font-semibold">Cancellation Policy:</span> Free
            cancellations up to 24 hours before your session.
          </p>
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold">Confirmation:</span> You will
            receive a confirmation email at {data.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
