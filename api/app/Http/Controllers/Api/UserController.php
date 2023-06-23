<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UserController extends Controller
{
    public function index()
    {
        $users =  User::all();
        return $users;
    }

    
    public function store(Request $request)
    {
        try {

            $existinUser = User::where('email', $request->email)->first();
            if($existinUser){
                return response()->json([
                    'message' => 'Erro ao criar usuário',
                    'error' => 'O email já está em uso.'
                ],409);
            }

            $request->validate([
                'name'      => 'required|string',
                'email'     => 'required|string|unique:users',
                'phone'     => 'required|string',
                'age'       => 'required|integer|min:18',
                'cep'       => 'required|string|size:8',
                'state'     => 'required|string',
                'city'      => 'required|string',
                'address'   => 'required|string'

            ],[
                'required' => 'O campo :attribute é obrigatório.',
                'email' => 'O campo :attribute deve ser um endereço de email válido.',
                'unique' => 'O campo :attribute já está em uso.',
                'integer' => 'O campo :attribute deve ser um número inteiro.',
                'min' => 'A idade deve ser maior ou iagual a :min.',
                'size' => 'O campo :attribute deve ter exatamente :size caracteres.',
            ]);

            $response = Http::get("https://viacep.com.br/ws/{$request->cep}/json/");
            $cepInfor = $response->json();

            if(isset($cepInfor['erro']) || $cepInfor['uf'] !== 'AM'){
                return response()->json([
                    'message' => 'Erro ao criar usuário',
                    'error' => 'O cep informado nao pertence ao estado do Amazonas'
                ],400);
            }

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->age = $request->age;
            $user->cep = $request->cep;
            $user->state = $request->state;
            $user->city = $request->city;
            $user->address = $request->address;
            
            $user->save();

        return response()->json([
            'message' => 'Usuario criado com sucesso!',
            'user' => $user
        ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao criar usuário',
                'error' => $e->getMessage()
            ],500);
        }

    }

    
    public function show(string $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'message' => 'Usuário não encontrado'
            ],404);
        }

        return $user;
    }

   
    public function update(Request $request, string $id)
    {
      try {
        $user = User::findOrFail($id);

        if(!$user){
            return response()->json([
                'message' => 'Usuário não encontrado'
            ],404);
        }

        $request->validate([
            'name'      => 'required|string',
            'email'     => 'required|string|unique:users,email,' . $user->id,
            'phone'     => 'required|string',
            'age'       => 'required|integer|min:18',
            'cep'       => 'required|string|size:8',
            'state'     => 'required|string',
            'city'      => 'required|string',
            'address'   => 'required|string'
        ], [
            'required' => 'O campo :attribute é obrigatório.',
            'email' => 'O campo :attribute deve ser um endereço de email válido.',
            'unique' => 'O campo :attribute já está em uso.',
            'integer' => 'O campo :attribute deve ser um número inteiro.',
            'min' => 'O campo :attribute deve ter um valor igual ou maior que :min.',
            'size' => 'O campo :attribute deve ter exatamente :size caracteres.',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->age = $request->age;
        $user->cep = $request->cep;
        $user->state = $request->state;
        $user->city = $request->city;
        $user->address = $request->address;

        $user->save();

        return response()->json([

            'message' => 'Usuario atualizado com sucesso!',
            'user' => $user
            
        ],200);
      }catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
        return response()->json([
            'message' => 'Usuario não encontrado'
        ],404);
      }
       catch (\Exception $e) {
        return response ()->json([
            'message' => 'Erro ao atulizar usário',
            'error' => $e->getMessage()
        ],500);
      }
    }

    
    public function destroy(string $id)
    {
       try {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'Usuário excluido com sucesso !'
        ],200);
       } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erro ao excluir usuário',
            'error' => $e->getMessage()
        ],500);
       }
    }
}
