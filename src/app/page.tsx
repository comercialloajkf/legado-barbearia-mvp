import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BookingFlow } from "@/components/BookingFlow";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const services = await prisma.service.findMany({
    orderBy: { price: "asc" }
  });

  return (
    <div className="min-h-screen bg-legado-black flex flex-col items-center font-sans">
      <Header />
      <main className="w-full max-w-md flex flex-col items-center flex-1 pb-24 relative">
        <Hero />
        <BookingFlow services={services} />
      </main>
    </div>
  );
}
