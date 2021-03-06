<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;

class JobBuilderController extends Controller
{
    /**
     * Show the Job Builder Intro page
     * @return \Illuminate\Http\Response
     */
    public function intro($jobId = null)
    {
        return view(
            'manager/job-builder-root',
            ['title' => Lang::get('manager/job_builder.intro_title'), 'jobId' => $jobId]
        );
    }

    /**
     * Show the Job Builder Details page
     * @return \Illuminate\Http\Response
     */
    public function details($jobId)
    {
        return view(
            'manager/job-builder-root',
            ['title' => Lang::get('manager/job_builder.details_title'), 'jobId' => $jobId]
        );
    }

    /**
     * Show the Job Builder Work Environment page
     * @return \Illuminate\Http\Response
     */
    public function environment($jobId)
    {
        return view(
            'manager/job-builder-root',
            ['title' => Lang::get('manager/job_builder.environment_title'), 'jobId' => $jobId]
        );
    }

    /**
     * Show the Job Builder Impact page
     * @return \Illuminate\Http\Response
     */
    public function impact($jobId)
    {
        return view(
            'manager/job-builder-root',
            ['title' => Lang::get('manager/job_builder.impact_title'), 'jobId' => $jobId]
        );
    }

    /**
     * Show the Job Builder Tasks page
     * @return \Illuminate\Http\Response
     */
    public function tasks($jobId)
    {
        return view(
            'manager/job-builder-root',
            ['title' => Lang::get('manager/job_builder.tasks_title'), 'jobId' => $jobId]
        );
    }

    /**
     * Show the Job Builder Skills page
     * @return \Illuminate\Http\Response
     */
    public function skills($jobId)
    {
        return view(
            'manager/job-builder-root',
            ['title' => Lang::get('manager/job_builder.skills_title'), 'jobId' => $jobId]
        );
    }

    /**
     * Show the Job Builder Review page
     * @return \Illuminate\Http\Response
     */
    public function review($jobId)
    {
        return view(
            'manager/job-builder-root',
            ['title' => Lang::get('manager/job_builder.review_title'), 'jobId' => $jobId]
        );
    }
}
