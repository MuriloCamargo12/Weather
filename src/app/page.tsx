import CardWeather from "@/components/CardWeather";

export default function Home() {
  return (
    <div className="bg-[url('/foto.jpg')] bg-cover bg-center bg-no-repeat flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <CardWeather></CardWeather>
    </div>
  );
}
