<?php

namespace App\Http\Controllers\Institution;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsersInstitutionController extends Controller
{
    public function index()
    {
        $institution = Auth::user();

        if ($institution->role !== 'institution') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $counselors = User::with('counselees.user')
            ->where('institution_id', $institution->id)
            ->where('role', 'counselor')
            ->get();

        return response()->json($counselors);
    }

    public function store(Request $request)
    {
        $institution = Auth::user();

        if ($institution->role !== 'institution') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'phone'    => 'required|string|max:20',
            'password' => 'required|string|min:6',
        ]);

        $counselor = User::create([
            'name'           => $validated['name'],
            'email'          => $validated['email'],
            'phone'          => $validated['phone'],
            'password'       => Hash::make($validated['password']),
            'role'           => 'counselor',
            'institution_id' => $institution->id,
        ]);

        return response()->json(['message' => 'Counselor created successfully.', 'counselor' => $counselor], 201);
    }

    
    public function show(string $id)
    {
        $institution = Auth::user();

        if ($institution->role !== 'institution') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $counselor = User::with('counselees.user')
            ->where('institution_id', $institution->id)
            ->where('role', 'counselor')
            ->findOrFail($id);

        return response()->json($counselor);
    }

    public function update(Request $request, string $id)
    {
        $institution = Auth::user();

        if ($institution->role !== 'institution') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $counselor = User::where('institution_id', $institution->id)
            ->where('role', 'counselor')
            ->findOrFail($id);

        $validated = $request->validate([
            'name'     => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:users,email,' . $counselor->id,
            'phone'    => 'sometimes|string|max:20',
            'password' => 'sometimes|string|min:6',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $counselor->update($validated);

        return response()->json(['message' => 'Counselor updated successfully.', 'counselor' => $counselor]);
    }

    public function destroy(string $id)
    {
        $institution = Auth::user();

        if ($institution->role !== 'institution') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $counselor = User::where('institution_id', $institution->id)
            ->where('role', 'counselor')
            ->findOrFail($id);

        $counselor->delete();

        return response()->json(['message' => 'Counselor deleted successfully.']);
    }
}
