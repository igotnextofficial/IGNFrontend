<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class createPageRequest extends FormRequest
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
            'data.title' => 'required|max:60|min:5|unique:pages,title',
            'data.slug' => 'required|max:120|min:10',
            'data.display' => 'required|bool'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();
        $newErrors = [];


        foreach ($errors->getMessages() as $key => $value) {
            $newKey = str_replace('data.', '', $key);
            $newErrors[$newKey] = str_replace('data.', '', $key);
        }
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $newErrors
        ], 422));
    }

}
