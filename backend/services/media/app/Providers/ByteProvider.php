<?php

namespace App\Providers;

 use App\Helpers\Bytes\BytesUnitInterface;
 use App\Helpers\Bytes\ByteUnit;

use Illuminate\Support\ServiceProvider;


class ByteProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        
        $this->app->bind('App\Helpers\Bytes\BytesUnitInterface', 'App\Helpers\Bytes\ByteUnit');
        
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

    }
}