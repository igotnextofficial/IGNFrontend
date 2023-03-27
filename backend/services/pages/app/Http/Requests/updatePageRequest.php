<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updatePageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'max:60|min:5|unique:pages',
            'slug' => 'max:120|min:10',
            'description' => 'max:400|min:5',
            'display' => 'bool'
        ];
    }
}
