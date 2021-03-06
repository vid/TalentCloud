<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class JobTerm
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \Illuminate\Database\Eloquent\Collection $job_term_translations
 *
 * Localized Properties:
 * @property string $value
 */
class JobTerm extends BaseModel
{
    use Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function job_posters() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }

    public function job_term_translations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\JobTermTranslation::class);
    }
}
