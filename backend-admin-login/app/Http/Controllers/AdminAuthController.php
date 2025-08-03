<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminAuthController extends Controller
{
    private function getTokenFilePath(): string
    {
        return storage_path('admins.json');
    }

    private function loadActiveTokens(): array
    {
        $tokenFile = $this->getTokenFilePath();

        if (!file_exists($tokenFile)) {
            return [];
        }

        $tokens = json_decode(file_get_contents($tokenFile), true);
        return is_array($tokens) ? $tokens : [];
    }

    private function saveActiveTokens(array $tokens): void
    {
        $tokenFile = $this->getTokenFilePath();
        file_put_contents($tokenFile, json_encode($tokens));
    }

    public function login(Request $request): JsonResponse
    {
        Log::info('🚀 Login attempt started');

        $adminUser = env('ADMIN_USER');
        $adminPass = env('ADMIN_PASS');

        $inputUser = $request->input('username') ?? '';
        $inputPass = $request->input('password') ?? '';

        Log::info('👤 Attempting login for user: ' . $inputUser);

        if ($inputUser === $adminUser && $inputPass === $adminPass) {
            Log::info('✅ Credentials match - creating token');

            // Erős token generálás
            $token = bin2hex(random_bytes(32));

            // Aktív tokenek betöltése és új token hozzáadása
            $activeTokens = $this->loadActiveTokens();
            $activeTokens[] = $token;

            // Tokenek mentése
            $this->saveActiveTokens($activeTokens);

            Log::info('🎉 Token created and saved');

            return response()->json([
                'success' => true,
                'token' => $token,
                'role' => 'admin',
                'user' => [
                    'username' => $adminUser,
                    'role' => 'admin'
                ]
            ]);
        }

        Log::warning('❌ Login failed - credentials mismatch');
        return response()->json([
            'success' => false,
            'message' => 'Bejelentkezés sikertelen!'
        ], 401);
    }

    public function check(Request $request): JsonResponse
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'authenticated' => false,
                'message' => 'Token hiányzik!'
            ], 401);
        }

        $activeTokens = $this->loadActiveTokens();

        if (in_array($token, $activeTokens)) {
            return response()->json([
                'authenticated' => true,
                'role' => 'admin',
                'user' => [
                    'username' => env('ADMIN_USER'),
                    'role' => 'admin'
                ]
            ]);
        }

        return response()->json([
            'authenticated' => false,
            'message' => 'Érvénytelen token!'
        ], 401);
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->bearerToken();

        if ($token) {
            $activeTokens = $this->loadActiveTokens();
            $activeTokens = array_filter($activeTokens, fn($t) => $t !== $token);
            $this->saveActiveTokens(array_values($activeTokens));

            Log::info('🚪 Token removed from active tokens');
        }

        return response()->json([
            'success' => true,
            'message' => 'Sikeresen kijelentkeztél!'
        ]);
    }
}
