<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminAuthController extends Controller
{
   public function login(Request $request): JsonResponse
    {
        $adminUser = env('ADMIN_USER');
        $adminPass = env('ADMIN_PASS');

        $inputUser = $request->input('username') ?? '';
        $inputPass = $request->input('password') ?? '';

        if ($inputUser === $adminUser && $inputPass === $adminPass) {
            $payload = [
                'username' => $adminUser,
                'role' => 'admin',
                'iat' => time(),
                'exp' => time() + 60 * 60 * 24 // Token 24 óráig érvényes!
            ];

            $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

            return response()->json([
                'success' => true,
                'token' => $jwt,
                'role' => 'admin',
                'user' => [
                    'username' => $adminUser,
                    'role' => 'admin'
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Bejelentkezés sikertelen!'
        ], 401);
    }

    public function check(Request $request): JsonResponse
    {
        try {
            $token = $request->bearerToken();

            if (!$token) {
                return response()->json([
                    'authenticated' => false,
                    'message' => 'Token hiányzik!'
                ], 401);
            }

            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            return response()->json([
                'authenticated' => true,
                'role' => $decoded->role,
                'user' => [
                    'username' => $decoded->username,
                    'role' => $decoded->role
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'authenticated' => false,
                'message' => 'Érvénytelen vagy lejárt token!'
            ], 401);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        // JWT stateless → nincs mit törölni
        return response()->json([
            'success' => true,
            'message' => 'Sikeresen kijelentkeztél!'
        ]);
    }
}