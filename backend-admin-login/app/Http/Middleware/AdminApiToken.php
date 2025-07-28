<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminApiToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('X-Admin-Token');
        if ($token !== env('VITE_ADMIN_API_TOKEN')) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }
        return $next($request);
    }
}
