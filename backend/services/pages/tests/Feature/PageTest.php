<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PageTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }


        /**
     * A basic feature test example.
     *
     * @test
     */
    public function valid_data_is_saved_to_database()
    {
        $data = ["data"=>[
            'title' => 'who got next',
            'slug' => 'who-got-next',
            'description' => 'this is the descriptions of the page.',
            'display' => false
        ]];
        $response = $this->post('/api',$data);
        $response->dump();

        $response->assertStatus(201);
        
    }


}
