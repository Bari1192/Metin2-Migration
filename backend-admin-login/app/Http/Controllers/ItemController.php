<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }

    public function update(UpdateItemRequest $request)
    {
        $data = $request->validated();
        $item = Item::where('name', $data['name'])->first();
        if (!$item) {
            return response()->json([
                'success' => false,
                'msg' => 'Ez az Item nem található az adatbázisban ezzel a névvel!'
            ], 404);
        }
        $item->update($data);
        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }
    public function store(StoreItemRequest $request)
    {
        $data = $request->validated();

        try {
            $item = Item::create($data);
            $this->addItemToJsonFile($data);
            new ItemResource($item);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'msg' => 'Item létrehozása sikertelen: ' . $e->getMessage()
            ], 500);
        }
    }

    // DELETE - item törlése
    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        return response()->json(['success' => true]);
    }

    // Kiegészítő függvények, a clean-code miatt
    private function addItemToJsonFile($itemData)
    {
        $filePath = storage_path('app/private/ItemStore_Hungary.json');

        if (file_exists($filePath)) {
            $jsonContent = file_get_contents($filePath);
            $storeItems = json_decode($jsonContent, true);

            if (is_array($storeItems)) {
                $storeItems[] = $itemData;
                file_put_contents(
                    $filePath,
                    json_encode($storeItems, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
                );
            }
        }
    }
}
