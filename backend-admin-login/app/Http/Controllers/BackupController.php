<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

class BackupController extends Controller
{
    public function latest()
    {
        $directory = storage_path('app/private');
        $files = File::files($directory);

        $backups = collect($files)
            ->filter(fn($file) => str_contains($file->getFilename(), 'ItemStore_Hungary_backup-'))
            ->sortByDesc(fn($file) => $file->getMTime());

        if ($backups->isEmpty()) {
            return response()->json(['error' => 'Nincs elérhető backup!'], 404);
        }

        $filename = $backups->first()->getFilename();

        return response()->json([
            'filename' => $filename,
            'download_url' => url("/api/download-backup/{$filename}") 
        ]);
    }
    public function download($filename)
    {
        $path = storage_path("app/private/{$filename}");

        if (!file_exists($path)) {
            return response()->json(['error' => 'Fájl nem található!'], 404);
        }

        return response()->download($path, $filename);
    }
}
