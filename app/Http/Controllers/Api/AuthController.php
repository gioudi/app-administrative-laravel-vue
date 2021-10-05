<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
       $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)) {
          return response([
            'message'=> ['Las credenciales ingresadas son erroneas!!']
          ], 401);
        }


       //$token = $user->createToken('my-app-token')->accessToken;

        $response = [
          'user'=>$user

        ];
        return response()->json([$response,
            'message' => 'Logueo Exitoso',
            200
        ]);


    }

    public function register(Request $request){


        $validator= Validator::make( $request->all(),[
            'username'=>'required|string|max:255',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6|same:password',
        ]);




        if($validator->fails()){
            return response()->json(['error'=>$validator->errors(),'message' => 'Error al crear el usuario !'],401);
        }

        $user= $request->all();
        $user['password'] = Hash::make($user['password']);
        $success = User::create($user);

        //$accessToken = $user->createToken('MyApp')->accessToken;
        return response()->json(['success'=>   $success, 'access_token'=>null,'message' => 'Usuario Creado!'],
        201);

    }


    public function test(Request $request)
    {

        return response()->json([
            'message' => 'Working',
            200
        ]);


    }



}
