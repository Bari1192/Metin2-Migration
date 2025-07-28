<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $adminUser = env('ADMIN_USER');
        $adminPass = env('ADMIN_PASS');
        $inputUser = $request->input('username') ?? '';
        $inputPass = $request->input('password') ?? '';
        if ($inputUser === $adminUser && $inputPass === $adminPass) {
            return response()->json(['success' => true]);
        }
        // statikus .env-es token van, nem generáltatok neki! secret key-es env-es!
        return response()->json([
            'success' => false,
            'message' => 'Bejelentkezés sikertelen!'
        ], 401);
    }
}
