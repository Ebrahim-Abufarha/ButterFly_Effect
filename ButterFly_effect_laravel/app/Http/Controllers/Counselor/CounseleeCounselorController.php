<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Models\Counselee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\HasMany;


class CounseleeCounselorController extends Controller
{
//     public function index()
//     {
//        $counselor = Auth::user();

// if ($counselor->role !== 'counselor') {
//     return response()->json(['message' => 'Unauthorized'], 403);
// }

// $counselees = $counselor->counselees()->with(['user', 'parent'])->get();
// return response()->json($counselees);
//     }

    public function store(Request $request)
{
    $counselor = Auth::user();

    if ($counselor->role !== 'counselor') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $validated = $request->validate([
        'user_id' => 'required|exists:users,id',
        'birth_date' => 'required|date',
        'parent_name' => 'sometimes|required|string',
        'parent_email' => 'sometimes|required|email|unique:users,email',
        'parent_phone' => 'sometimes|required|string',
    ]);

    $birthDate = \Carbon\Carbon::parse($validated['birth_date']);
    $age = $birthDate->age;

    $parentId = null;

    if ($age < 18) {
        $parent = User::create([
            'name' => $request->input('parent_name'),
            'email' => $request->input('parent_email'),
            'phone' => $request->input('parent_phone'),
            'password' => bcrypt('default_password'), 
            'role' => 'parent',
        ]);

        $parentId = $parent->id;
    }

    $counselee = Counselee::create([
        'user_id' => $validated['user_id'],
        'birth_date' => $validated['birth_date'],
        'parent_id' => $parentId,
        'counselor_id' => $counselor->id,
    ]);

    if ($parentId) {
        $parent->update(['counselee_id_if_parent' => $counselee->id]);
    }

    return response()->json([
        'message' => 'Counselee created successfully.',
        'counselee' => $counselee,
    ], 201);
}


    public function show(string $id)
    {
        $counselor = Auth::user();

        $counselee = Counselee::with(['user', 'parent'])
            ->where('counselor_id', $counselor->id)
            ->findOrFail($id);

        return response()->json($counselee);
    }

    public function update(Request $request, string $id)
    {
        $counselor = Auth::user();

        $counselee = Counselee::where('counselor_id', $counselor->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'parent_id' => 'nullable|exists:users,id',
            'birth_date' => 'required|date',
        ]);

        $counselee->update([
            'parent_id' => $validated['parent_id'] ?? null,
            'birth_date' => $validated['birth_date'],
        ]);

        return response()->json([
            'message' => 'Counselee updated successfully.',
            'counselee' => $counselee,
        ]);
    }

    public function destroy(string $id)
    {
        $counselor = Auth::user();

        $counselee = Counselee::where('counselor_id', $counselor->id)
            ->findOrFail($id);

        $counselee->delete();

        return response()->json(['message' => 'Counselee deleted successfully.']);
    }
}
