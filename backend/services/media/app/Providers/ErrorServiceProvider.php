<?php
namespace App\Providers;
use App\Errors\Errors;
use App\Errors\ApplicationErrors;
use Illuminate\Support\ServiceProvider;



class ErrorServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
      $this->app->bind('App\Errors\Errors','App\Errors\ApplicationErrors');
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}



?>