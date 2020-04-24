<?php

namespace App\Providers;
use App\Repository\Eloquent\UserRepository as UserRepository;
use App\Repository\UserRepositoryInterface as UserRepositoryInterface;

use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register() 
    {
        $this->app->bind('App\Repository\DatabaseRepositoryInterface', 'App\Repository\Eloquent\BaseRepository');
        $this->app->bind('App\Repository\UserRepositoryInterface', 'App\Repository\Eloquent\UserRepository');
           //
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
