<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function index(Request $request)
    {
        // Ensure we have the API key from the environment
        $apiKey = env('WEATHER_API_KEY');
        if (!$apiKey) {
            return response()->json([
                'message' => 'API key is missing from environment settings',
            ], 500);
        }

        $url = "https://api.openweathermap.org/data/2.5/weather";

        // Get query parameters default to Nairobi for city and Celsius for unit
        $city = $request->input('city') ?? 'Nairobi';
        $unit = $request->input('unit') ?? 'metric';

        // Make the request to API
        $response = Http::get($url, [
            'q' => $city,
            'units' => $unit,  // 'metric' for Celsius, 'imperial' for Fahrenheit
            'APPID' => $apiKey
        ]);

        // Handling failed responses
        if ($response->failed()) {
            $status = $response->status();
            $errorMessage = match ($status) {
                404 => 'City not found',
                401 => 'Invalid API key',
                default => 'An error occurred',
            };

            return response()->json([
                'message' => 'failed',
                'error' => $errorMessage,
                'details' => $response->json(),
            ], $status);
        }

        // Return success message and data
        return response()->json([
            'message' => 'success',
            'data' => $response->json(),
        ]);
    }
}
