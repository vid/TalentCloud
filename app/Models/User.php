<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Notifications\Notifiable;
use App\Events\UserCreated;
use App\Events\UserUpdated;
use App\Notifications\ResetPasswordNotification;
use App\CRUD\TalentCloudCrudTrait as CrudTrait;

/**
 * Class User
 *
 * @property int $id
 * @property string $email
 * @property string $name
 * @property string $password
 * @property boolean $is_confirmed
 * @property boolean $is_priority
 * @property int $user_role_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Manager $manager
 * @property \App\Models\ProfilePic $profile_pic
 * @property \App\Models\UserRole $user_role
 */
class User extends BaseModel implements
    // Laravel contracts for native login.
    AuthenticatableContract,
    CanResetPasswordContract,
    // Contract for use with Gates and Policies.
    AuthorizableContract
    // Custom contract for use with openid login.
    // \App\Services\Auth\Contracts\OidcAuthenticatable.
{

    // Traits for Laravel basic authentication.
    use Authenticatable, CanResetPassword;
    // Trait for working with Gates and Policies.
    use Authorizable;
    // Trait for notifications.
    use Notifiable;
    // Trait for Backpack.
    use CrudTrait;

    protected $casts = [
        'is_confirmed' => 'boolean',
        'is_priority' => 'boolean',
        'user_role_id' => 'int',
        'email' => 'string',
    ];

    protected $fillable = [
        'name', 'email', 'password', 'is_priority'
    ];

    protected $with = ['user_role'];

    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => UserCreated::class,
        'updated' => UserUpdated::class,
    ];

    public function applicant() //phpcs:ignore
    {
        return $this->hasOne(\App\Models\Applicant::class);
    }

    public function manager() //phpcs:ignore
    {
        return $this->hasOne(\App\Models\Manager::class);
    }

    public function profile_pic() //phpcs:ignore
    {
        return $this->hasOne(\App\Models\ProfilePic::class);
    }

    public function user_role() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\UserRole::class);
    }

    // Role related functions

    /**
    * Check one role
    * @param string $role
    * @return boolean
    */
    public function hasRole($role)
    {
        return $this->user_role->name == $role;
        // return null !== $this->roles()->where(‘name’, $role)->first();
    }

    public function setRole($role)
    {
        $this->user_role()->associate(UserRole::where('name', $role)->firstOrFail());
    }

    /**
     * OVERRIDE
     * Send the password reset notification.
     *
     * @param  string  $token
     *
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
