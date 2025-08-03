<?php

namespace App\Http\Requests;

use App\Models\Item;
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
            "name" => [
                'required',
                'string',
                'min:5',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (!Item::where('name', $value)->exists()) {
                        $fail('A módosítani kívánt termék nem található!');
                    }
                }
            ],
            "price_yang" => ['integer', 'min:0', 'max:999999999'],
            "group" => ['string', Rule::in(['fejlesztés', 'láda', 'ékszer', 'virág', 'italok', 'talizmánok', 'kohó', 'egyéb', 'fegyver', 'tárgypiac', 'alkimia'])],
            "icon" => ['string', 'max:255'],
            "quantity" => ['nullable', 'integer', 'min:0'],
            "price" => ['nullable', 'integer', 'min:0'],
        ];
    }
}
