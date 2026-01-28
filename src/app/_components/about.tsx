import { Calendar, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description:
      "Reserve your spot in just a few clicks with our intuitive booking system.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description:
      "Choose from multiple time slots that fit your busy lifestyle.",
  },
  {
    icon: Heart,
    title: "Comfortable Courts",
    description:
      "Practice in our spacious, well-equipped studios designed for your comfort.",
  },
];

const About = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-20">
      {/* title */}
      <div className="flex max-w-3xl flex-col gap-7 text-center">
        <h1 className="text-6xl font-bold">Why Zen Pilates ?</h1>
        <span className="text-foreground/50 text-lg">
          Experience the perfect blend of convenience and quality in your
          pilates journey.
        </span>
      </div>

      {/* Card  */}
      <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feat, i) => (
          <div
            className="group border-border/60 bg-card rounded-3xl border p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            key={i}
          >
            <div className="bg-primary/10 text-primary group-hover:bg-primary/15 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
              <feat.icon className="h-8 w-8" />
            </div>
            <h3 className="text-foreground mb-3 text-xl font-semibold">
              {feat.title}
            </h3>
            <p className="text-muted-foreground">{feat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
