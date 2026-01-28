import BookingCard from "../_components/_booking-components/booking-card";

const BookPage = () => {
  return (
    <div className="mx-auto mt-10 flex min-h-screen w-full max-w-6xl flex-col justify-center">
      <div className="space-y-2 text-left">
        <div className="mt-5">
          <BookingCard />
        </div>
      </div>
    </div>
  );
};

export default BookPage;
