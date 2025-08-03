<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemsController extends Controller
{
    public function index()
    {
        $path = storage_path('app/private/ItemStore_Hungary.json');
        $items = json_decode(file_get_contents($path), true);
        return response()->json($items);
    }

    public function store()
    {
        // $data = $request->validated();
        // $path = storage_path('app/private/ItemStore_Hungary.json');
        // file_put_contents($path, json_encode($item, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        // return response()->json(['success' => true]);
    }

    public function show(string $id)
    {
        //
    }

    public function update(UpdateItemRequest $request)
    {
        $path = storage_path('app/private/ItemStore_Hungary.json');
        $LocalItemStorage = json_decode(file_get_contents($path), true);

        $data = $request->validated();
        $found = false;

        foreach ($LocalItemStorage as $i => $item) {
            if ($item['name'] === $data['name']) {
                $LocalItemStorage[$i] = array_merge($item, $data);
                $found = true;
                break;
            }
        }
        if (!$found) {
            return response()->json(['success' => false, 'msg' => 'Ez az Item nem talalhato az adatbazisban ezzel a nevvel!'], 404 );
        }
        file_put_contents($path, json_encode($LocalItemStorage, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return response()->json(['success' => true]);
    }

    public function destroy(string $id)
    {
        //
    }
}
