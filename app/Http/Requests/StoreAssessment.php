<?php

namespace App\Http\Requests;

use App\Models\Criteria;
use Illuminate\Foundation\Http\FormRequest;

class StoreAssessment extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;

        // Only authorize the request if the user is adding an Assessment for a valid Criterion.
        $criterion = Criteria::find($this->input('criterion_id'));
        return $criterion !== null
            && $this->authorize('updateAssessmentPlan', $criterion->job_poster);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'criterion_id' => 'required|exists:criteria,id',
            'assessment_type_id' => 'required|exists:assessment_types,id',
        ];
    }
}
