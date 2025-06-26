<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UserAdminController extends Controller
{
    public function index()
    {
        $users = User::with('institution')->get();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'email'             => 'required|email|unique:users',
            'phone'             => 'nullable|string|max:20',
            'password'          => 'required|string|min:6|confirmed',
            'role'              => ['required', Rule::in(['counselee', 'counselor', 'parent', 'institution', 'super_admin'])],
            'institution_name'   => 'required_if:role,institution|string|max:255',
            'institution_address'=> 'nullable|string|max:255',
            'institution_contact_info' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'phone'      => $validated['phone'] ?? null,
            'password'   => Hash::make($validated['password']),
            'role'       => $validated['role'],
        ]);

        if ($user->role === 'institution') {
            $institution = Institution::create([
                'name'          => $validated['institution_name'],
                'address'       => $validated['institution_address'] ?? null,
                'contact_info'  => $validated['institution_contact_info'] ?? $user->email,
            ]);
            $user->institution_id = $institution->id;
            $user->save();
        }

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }

    public function show(string $id)
    {
        $user = User::with('institution')->findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, string $id)
    {
        $user = User::with('institution')->findOrFail($id);

        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'email'             => ['required','email', Rule::unique('users')->ignore($user->id)],
            'phone'             => 'nullable|string|max:20',
            'password'          => 'nullable|string|min:6|confirmed',
            'institution_name'  => 'required_if:role,institution|string|max:255',
            'institution_address' => 'nullable|string|max:255',
            'institution_contact_info' => 'nullable|string|max:255',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->phone = $validated['phone'] ?? null;
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        $user->save();

        if ($user->role === 'institution') {
            $institution = $user->institution;
            if (!$institution) {
                $institution = new Institution();
             
            }
            $institution->name = $validated['institution_name'];
            $institution->address = $validated['institution_address'] ?? null;
            $institution->contact_info = $validated['institution_contact_info'] ?? null;
            $institution->save();
        }

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

   public function profile()
{
    $user = Auth::user();
    return response()->json($user);
}

public function updateProfile(Request $request)
{
    $user = Auth::user();

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,'.$user->id,
        'phone' => 'nullable|string|max:20',
        'password' => 'nullable|string|min:6|confirmed',
    ]);

    $user->name = $validated['name'];
    $user->email = $validated['email'];
    $user->phone = $validated['phone'] ?? null;

    if (!empty($validated['password'])) {
        $user->password = Hash::make($validated['password']);
    }

    $user->save();

    return response()->json([
        'message' => 'Profile updated successfully.',
        'user' => $user,
    ]);
}
}
