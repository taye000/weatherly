<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function index(Request $request)
    {
        $URL = "https://api.openweathermap.org/data/2.5/weather";
        $response = Http::get($URL, [
            'q' => $request->input('city') ?? 'Nairobi',
            'APPID' => env('WEATHER_API_KEY')
        ]);
        if ($response->failed()) {
            return response()->json([
                'message' => 'failed',
                'error' => $response->json(),
            ], 500);
        }
        return response()->json([
            'message' => 'success',
            'data' => $response->json(),
        ]);
    }
}
