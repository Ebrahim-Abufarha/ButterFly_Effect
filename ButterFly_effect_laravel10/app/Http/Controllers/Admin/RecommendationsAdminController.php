<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Recommendation;
use Illuminate\Http\Request;

class RecommendationsAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recommendations = Recommendation::with(['counselee', 'counselor'])->get();
        return response()->json($recommendations);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $recommendation = Recommendation::with(['counselee', 'counselor'])->findOrFail($id);
        return response()->json($recommendation);
    }
}
