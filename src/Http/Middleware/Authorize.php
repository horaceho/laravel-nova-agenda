<?php

namespace Horaceho\Agenda\Http\Middleware;

use Horaceho\Agenda\Agenda;

class Authorize
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, $next)
    {
        return resolve(Agenda::class)->authorize($request) ? $next($request) : abort(403);
    }
}
