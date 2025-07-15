<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Session;
use App\Models\Institution;
use App\Models\ParentM;
use App\Models\FinancialTransaction;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_seekers' => User::where('user_type', 'seeker')->count(),
            'total_counselors' => User::where('user_type', 'counselor')->count(),
            'total_parents' => User::where('user_type', 'parent')->count(),
            'total_institutions' => Institution::count(),
            'total_sessions' => Session::count(),
            'completed_sessions' => Session::where('session_date', '<', now())->count(),
            'upcoming_sessions' => Session::where('session_date', '>', now())->count(),
            'total_financial_transactions' => FinancialTransaction::count(),
            'total_income' => FinancialTransaction::sum('amount'),
        ]);
    }
}

