<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\Models\Institution;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class InstitutionController extends Controller
{
public function index(Request $request)
{
    $query = Institution::with('user');

    if ($request->has('name') && $request->name != '') {
        $query->where('name', 'like', '%' . $request->name . '%');
    }

    if ($request->has('sector') && $request->sector != '') {
        $query->where('sector', $request->sector);
    }

   if ($request->has('nationality') && $request->nationality != '') {
    $query->whereHas('user', function($q) use ($request) {
        $q->where('nationality', 'like', '%' . $request->nationality . '%');
    });
}


    $institutions = $query->get();

    return response()->json($institutions);
}


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'sector' => 'required|in:public,private,school,non_profit',
            'mental_health_policy' => 'nullable|string',
            'user.name' => 'required|string|max:255',
            'user.email' => 'required|email|unique:users,email',
            'user.password' => 'required|string|min:6|confirmed',
            'user.nationality' => 'nullable|string|max:255',
            'user.user_type' => 'required|in:institution_admin',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }



        $userData = $request->input('user');
        \Log::info('User Data:', $userData);

        $user = User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => Hash::make($userData['password']),
            'user_type' => 'institution_admin',
            'nationality' => $userData['nationality'] ?? null,        ]);

        $institution = Institution::create([
            'name' => $request->name,
            'sector' => $request->sector,
            'mental_health_policy' => $request->mental_health_policy,
            'user_id' => $user->id,
        ]);

        return response()->json($institution->load('user'), 201);
    }

    public function update(Request $request, $id)
    {
        $institution = Institution::findOrFail($id);
        $user = $institution->user;

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'sector' => 'required|in:public,private,school,non_profit',
            'mental_health_policy' => 'nullable|string',
            'user.name' => 'required|string|max:255',
            'user.email' => 'required|email|unique:users,email,' . $user->id,
            'user.password' => 'nullable|string|min:6|confirmed',
            'user.nationality' => 'nullable|string|max:255',
            'user.user_type' => 'required|in:institution_admin',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $institution->update([
            'name' => $request->name,
            'sector' => $request->sector,
            'mental_health_policy' => $request->mental_health_policy,
        ]);

        $userData = $request->input('user');

        $user->name = $userData['name'];
        $user->email = $userData['email'];
        $user->nationality = $userData['nationality'] ?? null; 
        if (!empty($userData['password'])) {
            $user->password = Hash::make($userData['password']);
        }

        $user->save();

        return response()->json($institution->load('user'));
    }

public function destroy($id)
{
    $institution = Institution::with('user')->findOrFail($id);

    $user = $institution->user;

    $institution->delete();

    if ($user) {
        $user->delete();
    }

    return response()->json(['message' => 'Institution and user deleted']);
}
public function show($id)
{
    $institution = Institution::with('user')->findOrFail($id);
    return response()->json($institution);
}

}
