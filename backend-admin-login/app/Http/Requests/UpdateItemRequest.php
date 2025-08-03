<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ['required', 'string', 'min:5', 'max:255', function ($attribute, $value, $fail) {
                $path = storage_path('app/private/ItemStore_Hungary.json');
                $items = json_decode(file_get_contents($path), true);

                $exists = collect($items)->contains('name', $value);
                if (!$exists) { 
                    $fail('A módosítani kívánt termék nem található!');
                }
            }],
            "price_yang" => ['integer', 'min:0', 'max:999999999'],
            "group" => ['string', Rule::in(['fejlesztés', 'láda', 'ékszer', 'virág', 'italok', 'talizmánok', 'kohó', 'egyéb', 'fegyver', 'tárgypiac', 'alkimia'])],
            "icon" => ['string', 'max:255'],
        ];
    }
}
