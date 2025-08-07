<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/admin/check', [AdminAuthController::class, 'check']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);

Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{id}', [ItemController::class, 'show']);

Route::middleware('admin.auth')->group(function () {
    Route::post('/items', [ItemController::class, 'store']);
    Route::put('/items/{name}', [ItemController::class, 'update']);
    Route::delete('/items/{name}', [ItemController::class, 'destroy']);


    Route::get('/download-backup/{filename}', [BackupController::class, 'download']);
    Route::get('/download-backups', [BackupController::class, 'latest']);
});
