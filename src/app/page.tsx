import { HydrateClient } from "~/trpc/server";
import LandingPage from "./pages/landing-page";

export default async function Home() {


  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center">
        <LandingPage />
      </main>
    </HydrateClient>
  );
}
