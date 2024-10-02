import Weather from "@/components/Weather";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
      <main className="bg-white p-6 rounded-xl shadow-xl max-w-3xl w-full text-center">
        <div className="text-3xl font-bold text-gray-800 mb-2">
          Weatherly
        </div>

        {/* Weather Component */}
        <Weather />

      </main>
    </div>
  );
}
