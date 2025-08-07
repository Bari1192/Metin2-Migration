<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreItemRequest extends FormRequest
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
                'max:255'
            ],
            "price_yang" => ['integer', 'min:0', 'max:999999999'],
            "group" => ['string', Rule::in(['fejlesztes', 'lada', 'ekszer', 'virag', 'italok', 'talizmanok', 'koho', 'egyeb', 'fegyver', 'vert', 'targypiac', 'alkimia'])],
            "icon" => ['string', 'max:255'],
            "quantity" => ['nullable', 'integer', 'min:0'],
            "price" => ['nullable', 'integer', 'min:0'],
        ];
    }
}
