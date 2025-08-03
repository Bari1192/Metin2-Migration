<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        Log::info('🔐 Admin Auth Middleware - checking token');
        
        // Bearer token lekérése
        $token = $request->bearerToken();
        
        if (!$token) {
            Log::warning('❌ No token provided');
            return response()->json([
                'success' => false,
                'message' => 'Token hiányzik!'
            ], 401);
        }
        // Token ellenőrzése a tárolt tokenek között
        if (!$this->isValidAdminToken($token)) {
            Log::warning('❌ Invalid token: ' . substr($token, 0, 10) . '...');
            return response()->json([
                'success' => false,
                'message' => 'Érvénytelen vagy lejárt token!'
            ], 401);
        }
        Log::info('✅ Token valid - proceeding with request');
        return $next($request);
    }
    private function isValidAdminToken($token): bool
    {
        try {
            // Aktív tokenek betöltése (ugyanaz a logika mint a backend controller-ben)
            $tokenFile = storage_path('admins.json');
            
            if (!file_exists($tokenFile)) {
                return false;
            }
            $activeTokens = json_decode(file_get_contents($tokenFile), true);
            
            if (!is_array($activeTokens)) {
                return false;
            }
            return in_array($token, $activeTokens);
            
        } catch (\Exception $e) {
            Log::error('Token validation error: ' . $e->getMessage());
            return false;
        }
    }
}
