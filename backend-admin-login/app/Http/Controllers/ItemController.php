<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    // GET - összes item lekérése
    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }

    // PUT - item frissítése
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

        return response()->json(['success' => true, 'data' => $item]);
    }

    // POST - új item létrehozása
    public function store(Request $request)
    {
        $item = Item::create($request->validated());
        return response()->json(['success' => true, 'data' => $item]);
    }

    // DELETE - item törlése
    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        return response()->json(['success' => true]);
    }
}