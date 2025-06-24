<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Counselee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CounseleesAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $counselees = Counselee::with(['user', 'parent', 'counselor'])->get();
        return response()->json($counselees);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'       => 'required|exists:users,id',
            'parent_id'     => 'nullable|exists:users,id',
            'counselor_id'  => 'nullable|exists:users,id',
            'birth_date'    => 'required|date',
        ]);

        $counselee = Counselee::create($validated);

        return response()->json([
            'message' => 'Counselee created successfully',
            'counselee' => $counselee
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $counselee = Counselee::with(['user', 'parent', 'counselor'])->findOrFail($id);
        return response()->json($counselee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $counselee = Counselee::findOrFail($id);

        $validated = $request->validate([
            'parent_id'     => 'nullable|exists:users,id',
            'counselor_id'  => 'nullable|exists:users,id',
            'birth_date'    => 'required|date',
        ]);

        $counselee->update($validated);

        return response()->json([
            'message' => 'Counselee updated successfully',
            'counselee' => $counselee
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $counselee = Counselee::findOrFail($id);
        $counselee->delete();

        return response()->json(['message' => 'Counselee deleted successfully']);
    }
}
