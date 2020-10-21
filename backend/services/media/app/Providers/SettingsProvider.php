<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Http\Controllers\ImageController;
use App\Http\Controllers\VideoController;
use App\Helpers\Bytes\Bytes;


use App\Settings\settings;
use App\Settings\ImageSettings;

class SettingsProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->when(ImageController::class)
        ->needs('App\Settings\Settings')
        ->give(function(){
            return new ImageSettings(new Bytes());
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
