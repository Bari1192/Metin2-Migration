<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Item;

class ImportItemsFromJson extends Command
{
    // importáláshoz írd be, hogy: 'php artisan items:import-json'
    // Ugyanilyen commands majd mehet a ItemStore_Polska.json-re is. ~4.5 kB volt az adatmennyiség :D 

    protected $signature = 'items:import-json {--file=storage/app/private/ItemStore_Hungary.json}';
    protected $description = 'Import items from JSON file to Turso database';

    public function handle()
    {
        $filePath = $this->option('file');
        $fullPath = base_path($filePath);

        if (!file_exists($fullPath)) {
            $this->error("JSON file not found at: {$fullPath}");
            return 1;
        }

        $this->info("Reading JSON file: {$fullPath}");

        $jsonContent = file_get_contents($fullPath);
        $items = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error('Invalid JSON format: ' . json_last_error_msg());
            return 1;
        }

        if (!is_array($items)) {
            $this->error('JSON should contain an array of items');
            return 1;
        }

        $this->info("Found " . count($items) . " items to import");

        $imported = 0;
        $updated = 0;

        foreach ($items as $itemData) {
            if (!isset($itemData['name'])) {
                $this->warn('Skipping item without name: ' . json_encode($itemData));
                continue;
            }

            // Ellenőrizzük hogy létezik-e már
            $existingItem = Item::where('name', $itemData['name'])->first();

            if ($existingItem) {
                // Meglévő frissítése
                $existingItem->update($itemData);
                $updated++;
                $this->line("Updated: {$itemData['name']}");
            } else {
                // Új item létrehozása
                Item::create($itemData);
                $imported++;
                $this->line("Imported: {$itemData['name']}");
            }
        }

        $this->info("Import completed!");
        $this->info("Imported: {$imported} new items");
        $this->info("Updated: {$updated} existing items");

        return 0;
    }
}
