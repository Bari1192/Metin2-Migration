<?php

namespace App\Observers;

use App\Models\Item;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Exception;

class ItemObserver
{
    public function updated(Item $item)
    {
        Log::info('🔥 ItemObserver::updated CALLED!', ['item' => $item->name]);

        try {
            $allItems = Item::all()->toArray();
            $timestamp = Carbon::now()->format('Y-m-d_H-i-s');

            $privatePath = storage_path('app/private');
            $mainFile = $privatePath . "/ItemStore_Hungary.json";
            $latestFile = $privatePath . "/ItemStore_Hungary_latest.json";
            $backupFile = $privatePath . "/ItemStore_Hungary_backup-{$timestamp}.json";

            if (!is_dir($privatePath)) {
                mkdir($privatePath, 0755, true);
            }

            $jsonContent = json_encode($allItems, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

            // Írása
            file_put_contents($mainFile, $jsonContent);
            file_put_contents($latestFile, $jsonContent);
            file_put_contents($backupFile, $jsonContent);

        } catch (Exception $e) {
            Log::error('🔥 ItemObserver ERROR:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}
