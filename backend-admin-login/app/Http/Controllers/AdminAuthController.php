<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $adminUser = 'Metin2MigrationAdminPanelLogin';               
        $adminPass = 'verytitkosítottjelszohash';  
        $inputUser = $request->input('username') ?? '';
        $inputPass = $request->input('password') ?? '';
        if ($inputUser === $adminUser && $inputPass === $adminPass) {
            $token = bin2hex(random_bytes(32));
            return response()->json([
                'success' => true,
                'token' => $token
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Bejelentkezés sikertelen!'
        ], 401);
    }
}
