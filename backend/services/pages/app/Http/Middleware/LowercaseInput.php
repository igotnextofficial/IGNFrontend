<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LowercaseInput
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {   if($data = $request->input('data')){
            $input = array_map(function($content){
                if(is_string($content)){
                    return strtolower($content);
                }
                return $content;
            }, $data);
            $request->merge(['data' => $input]);
        }


        return $next($request);
    }
}
