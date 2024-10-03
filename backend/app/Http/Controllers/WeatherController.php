<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    public function index(Request $request)
    {
        // Log the incoming request
        Log::info('Incoming weather request:', [
            'city' => $request->input('city'),
            'unit' => $request->input('unit'),
        ]);

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

        // Log the actual parameters used in the request to OpenWeatherMap
        Log::info('Making request to OpenWeatherMap API:', [
            'city' => $city,
            'unit' => $unit,
        ]);

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

            // Log the error response from the API
            Log::error('Failed request to OpenWeatherMap API:', [
                'status' => $status,
                'error' => $errorMessage,
                'response' => $response->json(),
            ]);

            // Return error message and status
            return response()->json([
                'message' => 'failed',
                'error' => $errorMessage,
                'details' => $response->json(),
            ], $status);
        }

        // Log successful API response
        Log::info('Successful response from OpenWeatherMap API:', [
            'data' => $response->json(),
        ]);

        // Return success message and data
        return response()->json([
            'message' => 'success',
            'data' => $response->json(),
        ]);
    }
}
