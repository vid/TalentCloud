<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssessment;
use App\Models\Assessment;
use Illuminate\Support\Facades\Log;

class AssessmentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAssessment $request)
    {
        $this->authorize('create', Assessment::class);

        Log::debug("creating an assessment");

        $data = $request->validated();
        $criterion_id = (int)$data['criterion_id'];
        $assessment_type_id = (int)$data['assessment_type_id'];

        $assessment = new Assessment([
            'criterion_id' => $criterion_id,
            'assessment_type_id' => $assessment_type_id
        ]);

        $assessment->save();
        $assessment->refresh();

        return response()->json($assessment->toArray());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Assessment $assessment Incoming object.
     * @return \Illuminate\Http\Response
     */
    public function show(Assessment $assessment)
    {
        $this->authorize('view', $assessment);
        return response()->json($assessment->toArray());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request    Incoming request.
     * @param  \App\Models\Assessment   $assessment Incoming object.
     * @return \Illuminate\Http\Response
     */
    public function update(StoreAssessment $request, Assessment $assessment)
    {
        $this->authorize('update', $assessment);

        Log::debug("updating an assessment");

        $data = $request->validated();
        $criterion_id = (int)$data['criterion_id'];
        $assessment_type_id = (int)$data['assessment_type_id'];

        $assessment->fill([
            'criterion_id' => $criterion_id,
            'assessment_type_id' => $assessment_type_id
        ]);

        $assessment->save();
        $assessment->refresh();

        return response()->json($assessment->toArray());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Assessment $assessment Incoming object.
     * @return \Illuminate\Http\Response
     */
    public function destroy(Assessment $assessment)
    {
        $this->authorize('delete', $assessment);
        $assessment->delete();

        return [
            'success' => "Successfully deleted assessment $assessment->id"
        ];
    }
}
