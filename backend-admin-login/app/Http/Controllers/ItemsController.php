<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemsController extends Controller
{
    public function index()
    {
        $path = storage_path('app/private/ItemStore_Hungary.json');
        $items = json_decode(file_get_contents($path), true);
        return response()->json($items);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        $path = storage_path('app/private/ItemStore_Hungary.json');
        $items = json_decode(file_get_contents($path), true);
        foreach ($items as &$item) {
            if ($item['id'] == $id) {
                $item = array_merge($item, $request->all());
                break;
            }
        }
        file_put_contents($path, json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
