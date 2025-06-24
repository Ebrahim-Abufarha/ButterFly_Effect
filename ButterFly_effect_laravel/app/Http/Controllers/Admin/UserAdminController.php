<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Counselee;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


class UserAdminController extends Controller
{
    public function index()
    {
        $users = User::with('institution', 'counselee')->get();
        return response()->json($users);
    }

    public function create()
    {
        return view('admin.users.create');
    }    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|unique:users',
            'phone'        => 'nullable|string|max:20',
            'password'     => 'required|string|min:6|confirmed',
            'role'         => ['required', Rule::in(['counselee', 'counselor', 'parent', 'institution', 'super_admin'])],
            'institution_name' => 'required_if:role,institution',
            'birth_date'   => 'required_if:role,counselee|date',
        ]);

        $user = User::create([
            'name'         => $validated['name'],
            'email'        => $validated['email'],
            'phone'        => $validated['phone'] ?? null,
            'password'     => Hash::make($validated['password']),
            'role'         => $validated['role'],
        ]);

        if ($user->role === 'institution') {
            $institution = Institution::create([
                'name'         => $validated['institution_name'],
                'contact_info' => $user->email,
            ]);
            $user->institution_id = $institution->id;
            $user->save();
        }

        if ($user->role === 'counselee') {
            Counselee::create([
                'user_id'   => $user->id,
                'birth_date'=> $validated['birth_date'],
            ]);
        }

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }

    public function show(string $id)
    {
        $user = User::with('institution', 'counselee')->findOrFail($id);
        return response()->json($user);
    }
    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        return view('admin.users.edit', compact('user'));
    }
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => ['required','email', Rule::unique('users')->ignore($user->id)],
            'phone'        => 'nullable|string|max:20',
            'password'     => 'nullable|string|min:6|confirmed',
        ]);

        $user->update([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'phone'    => $validated['phone'] ?? null,
            'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
        ]);

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
