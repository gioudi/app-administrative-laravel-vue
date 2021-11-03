<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class AdminCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // \Log::info("entro al middleware");
        /*  if ($request->path() == "api/login") {
            return $next($request);
        }
        if (!Auth::check()) {
            return response()->json(['msg' => 'No tienes acceso a esta ruta ...'], 403);
        }

        $user = Auth::user();
        if ($user->userType == 'User') {
            return response()->json(['msg' => 'No tienes acceso a esta ruta ...'], 403);
        }
        return $next($request); */
    }
}