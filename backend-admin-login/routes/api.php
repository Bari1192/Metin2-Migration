<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ItemsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::middleware('admin.token')->group(function () {
    Route::get('items', [ItemsController::class, 'index']);
    Route::post('items', [ItemsController::class, 'store']);
    Route::put('items/{id}', [ItemsController::class, 'update']);
    Route::delete('items/{id}', [ItemsController::class, 'destroy']);
});
