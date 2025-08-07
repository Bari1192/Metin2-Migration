<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class AdminAuthMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Token hiányzik!'
            ], 401);
        }

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            if ($decoded->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Nincs jogosultság!'
                ], 403);
            }

            // Ha kell, továbbíthatod a decoded adatokat is
            $request->attributes->set('jwt_user', $decoded);

            return $next($request);

        } catch (\Exception $e) {
            Log::warning("JWT error: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Érvénytelen vagy lejárt token!'
            ], 401);
        }
    }
}
