<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\Department;

/**
 * Validates that value is a valid department id
 */
class DepartmentRule implements Rule
{
    public function passes($attribute, $value)
    {
        return Department::where('id', $value)->exists();
    }

    public function message()
    {
        return Lang::get('validation.invalid_id');
    }
}
