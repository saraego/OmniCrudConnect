<?php

namespace Database\Seeders;
use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TesteSeeds extends Seeder
{
    
    public function run(): void
    {
        $nomes = [
            'Ana', 'Beatriz', 'Carlos', 'Davi', 'Eduarda', 'Fernanda', 'Gabriel', 'Helena', 'Isabela',
            'João', 'Larissa', 'Mateus', 'Natália', 'Pedro', 'Quênia', 'Rafael', 'Sara', 'Thiago', 'Úrsula',
            'Valentina', 'Wagner', 'Xavier', 'Yasmin', 'Zeca'
        ];

        $cepAmazonas = [
            '69000-000', '69001-000', '69002-000', '69003-000', '69004-000', '69005-000', '69006-000', '69007-000',
            '69008-000', '69009-000', '69010-000', '69011-000', '69012-000', '69013-000', '69014-000', '69015-000'
        ];

        foreach ($nomes as $index => $nome) {
            if (array_key_exists($index, $cepAmazonas)) {
                User::create([
                    'name' => $nome,
                    'email' => strtolower($nome) . '@example.com',
                    'phone' => '123456789',
                    'age' => 25 + $index,
                    'cep' => $cepAmazonas[$index],
                    'state' => 'Amazonas',
                    'city' => 'Manaus',
                    'address' => 'Rua Exemplo, ' . ($index + 1),
                ]);
            }
        }


        $this->command->info('Seeder UsersTableSeeder Usuarios criados.');

    }
}
