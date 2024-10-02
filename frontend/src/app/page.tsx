import Weather from "@/components/Weather";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
      <main className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
        <div className="text-4xl font-bold text-gray-800 mb-4">
          Weatherly
        </div>
        <p className="text-gray-600 mb-6">
          Get the latest weather updates instantly.
        </p>

        {/* Weather Component */}
        <Weather />

        <button className="btn">
          Get Weather Updates
        </button>
      </main>
    </div>
  );
}
