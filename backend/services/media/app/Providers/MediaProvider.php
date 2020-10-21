<?php

namespace App\Providers;

use App\Concrete\MediaInterface;
use App\ImageMedia;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\MediaController;

use Illuminate\Support\ServiceProvider;


class MediaProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->when(ImageController::class)
        ->needs('App\Concrete\MediaInterface')
        ->give(function(){
            return new ImageMedia();
        });

        $this->app->when(MediaController::class)
        ->needs('App\Concrete\MediaInterface')
        ->give(function(){
            return new ImageMedia();
        });
        // $this->app->bind('App\Concrete\MediaInterface', 'App\Concrete\MediaBase');
        
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

