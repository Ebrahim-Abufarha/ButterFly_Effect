<?php

namespace App\Http\Controllers\Counselee;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Carbon\Carbon;

class UserCounseleeController extends Controller
{
    
    public function showMySupport()
    {
        $user = Auth::user();

        if (!$user->counselee) {
            return response()->json(['message' => 'User is not a counselee.'], 403);
        }

        $counselee = $user->counselee;

        $data = [];

        $counselor = User::find($counselee->counselor_id);
        if ($counselor) {
            $data['counselor'] = $counselor;
        }

        $age = Carbon::parse($counselee->birth_date)->age;
        if ($age < 18) {
            $parent = User::find($counselee->parent_id);
            if ($parent) {
                $data['parent'] = $parent;
            }
        }

        return response()->json($data);
    }
}
