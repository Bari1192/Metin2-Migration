<?php

namespace App\Providers;

use App\Http\Middleware\AdminAuthMiddleware;
use App\Models\Item;
use App\Observers\ItemObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict();
        $this->ensureStorageDirectories();
        Item::observe(ItemObserver::class);
    }
    private function ensureStorageDirectories()
    {
        $directories = [
            storage_path('app/private'),
            storage_path('app/backups'),
        ];
        foreach ($directories as $directory) {
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
                Log::info('Storage directory created', ['path' => $directory]);
            }
        }
    }
}
