<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Category;
use PHPUnit\Util\Json;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();

        if ($categories) {
            return response()->json(['categories' => $categories], 200);
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
        // validate request

        $this->validate($request, [
            'iconImage' => 'required',
            'categoryName' => 'required'
        ]);

        Category::create([
            'categoryName' => $request->categoryName,
            'iconImage' => $request->iconImage
        ]);

        return response()->json([
            'message' => 'Nueva categoria creada'
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
        $this->validate($request, [
            'iconImage' => 'required',
            'categoryName' => 'required'
        ]);


        return Category::where('id', $request->id)->update([
            'categoryName' => $request->categoryName,
            'iconImage' => $request->iconImage
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
        $this->deleteFileFromServer($request->iconImage);
        $this->validate($request, [
            'id' => 'required',
        ]);
        return Category::where('id', $request->id)->delete();
    }

    /**
     * Upload the specified resource file.
     *
     */
    public function upload(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'file' => 'required|image|jpg,png,jpeg'
        ]);

        if ($validation) {
            $picName = time() . '.' . $request->file->extension();
            $request->file->move(public_path('uploads'), $picName);
            return response()->json([
                'success' => true,
                'message' => 'Imagen ',
                'data' => $picName
            ]);
        }
    }
    public function destroy_img(Request $request)
    {

        $fileName = $request->imageName;
        $this->deleteFileFromServer($fileName, false);
        return response()->json([
            'success' => true,
            'message' => 'Imagen eliminada',

        ]);
    }


    public function deleteFileFromServer($fileName, $hasFullPath = false)
    {
        if (!$hasFullPath) {
            $filePath = public_path() . '/uploads/' . $fileName;
        }


        if (file_exists($filePath)) {
            @unlink($filePath);
        }
        return;
    }
}