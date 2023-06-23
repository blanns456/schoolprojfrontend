<?php

namespace App\Http\Controllers;

use App\Models\User;
// use Exception;
// use Dotenv\Validator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class userController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = User::all();
        return response($user, 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'email' => 'required | max:255 | unique:users',
        //     'name' => 'required',
        //     'password' => 'required ',
        // ]);
        $validate = Validator::make($request->all(), [
            'email' => 'required | max:255 | unique:users',
            'name' => 'required|',
            'password' => 'required ',

        ]);

        if ($validate->fails()) {
            return response([["message" => "ERROR", "error" => $validate->errors()]], 201);
        }

        $user = User::create($request->all());
        return response([["message" => "Success", "user" => $user]], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::find($id);
        return response([["user" => $user, "message" => "success"], 201]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        $user = User::find($request->id);
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();
        return response(["message" => "Updated"], 201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        User::destroy($id);
        return response(["message" => "Success"], 201);
    }
}
