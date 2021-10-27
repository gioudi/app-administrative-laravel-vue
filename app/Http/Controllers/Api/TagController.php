<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Tag;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tag::all();
        if ($tags) {
            return response()->json([
                'tags' => $tags,
                200
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Validate request
        $this->validate($request, [
            'tagName' => 'required|alpha'
        ]);

        Tag::create([
            'tagName' => $request->tagName
        ]);

        return response()->json([
            'message' => 'Nuevo tag creado'

        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //Validate request
        $this->validate($request, [
            'tagName' => 'required|alpha',
            'id' => 'required'
        ]);



        return Tag::where('id', $request->id)->update([
            'tagName' => $request->tagName
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        Tag::where('id', $request->id)->delete();
        return response()->json([
            'message' => 'Tag eliminado'
        ], 200);
    }
}