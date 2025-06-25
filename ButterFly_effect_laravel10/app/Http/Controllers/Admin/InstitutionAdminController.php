<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class InstitutionAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $institutions = Institution::all();
        return response()->json($institutions);
    }

   
    public function create()
    {
        return response()->json(['message' => 'Use POST /institutions to create a new institution.']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'address'      => 'nullable|string|max:500',
            'contact_info' => 'nullable|string|max:255',
            'status'       => ['boolean'],
        ]);

        $institution = Institution::create([
            'name'         => $validated['name'],
            'address'      => $validated['address'] ?? null,
            'contact_info' => $validated['contact_info'] ?? null,
            'status'       => $validated['status'] ?? true,
        ]);

        return response()->json(['message' => 'Institution created successfully', 'institution' => $institution], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $institution = Institution::findOrFail($id);
        return response()->json($institution);
    }


    public function edit(string $id)
    {
        return response()->json(['message' => 'Use GET /institutions/{id} to retrieve institution details, and PUT /institutions/{id} to update.']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $institution = Institution::findOrFail($id);

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'address'      => 'nullable|string|max:500',
            'contact_info' => 'nullable|string|max:255',
            'status'       => ['boolean'],
        ]);

        $institution->update([
            'name'         => $validated['name'],
            'address'      => $validated['address'] ?? $institution->address,
            'contact_info' => $validated['contact_info'] ?? $institution->contact_info,
            'status'       => $validated['status'] ?? $institution->status,
        ]);

        return response()->json(['message' => 'Institution updated successfully', 'institution' => $institution]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $institution = Institution::findOrFail($id);
        $institution->delete();

        return response()->json(['message' => 'Institution deleted successfully']);
    }
}
