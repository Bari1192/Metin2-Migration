<?php
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ItemsController;
use Illuminate\Support\Facades\Route;



Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/admin/check', [AdminAuthController::class, 'check']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);

// Public items endpoints - olvasás mindenki számára
Route::get('/items', [ItemsController::class, 'index']);
Route::get('/items/{id}', [ItemsController::class, 'show']);

// Admin-only protected routes - token ellenőrzéssel
Route::middleware('admin.auth')->group(function () {
    Route::post('/items', [ItemsController::class, 'store']);
    Route::put('/items/{id}', [ItemsController::class, 'update']);
    Route::delete('/items/{id}', [ItemsController::class, 'destroy']);
});