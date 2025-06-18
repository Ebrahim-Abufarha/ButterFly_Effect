<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'institution_id',
        'counselee_id_if_parent',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relations

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    // If user is a counselee
    public function counselee()
    {
        return $this->hasOne(Counselee::class);
    }

    // If user is a parent, this points to counselee child
    public function counseleeChild()
    {
        return $this->belongsTo(Counselee::class, 'counselee_id_if_parent');
    }

    // If user is counselor, get counselees assigned to him
    public function counselees()
    {
        return $this->hasMany(Counselee::class, 'counselor_id');
    }

    // Messages sent by this user
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'from_user_id');
    }

    // Messages received by this user
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'to_user_id');
    }

    // Recommendations by this user (if counselor)
    public function recommendations()
    {
        return $this->hasMany(Recommendation::class, 'counselor_id');
    }

    // Sessions as counselor
    public function sessions()
    {
        return $this->hasMany(Session::class, 'counselor_id');
    }

    // Notifications for this user
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
