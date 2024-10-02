import Weather from "@/components/Weather";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
      <main className="bg-white p-8 rounded-xl shadow-xl max-w-3xl w-full text-center">
        <div className="text-3xl font-bold text-gray-800 mb-4">
          Weatherly
        </div>
        <p className="text-gray-600 mb-6">
          Get the latest weather updates instantly.
        </p>

        {/* Weather Component */}
        <Weather />

      </main>
    </div>
  );
}
