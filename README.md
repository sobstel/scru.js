scru.js
=======

Lightweight execution dependency manager.

What for
--------

- as tiny as possible (less than 0.5KB gzipped!)
- lazy (on-demand) loading
- support for google.load out of the box
- any code (not only loaders) can be executed 

Files
-----

- scru.core.js - core file
- scru.js - core file + predefined callbacks (async_load and google_load)

API
---

- $scru.queue(id, fn, deps) - queue callback for later execution
- $scru.invoke(id) - invoke queued callback (delayed until all deps completed)
- $scru.execute(fn, deps) - execute fn (delayed until all deps completed)
- $scru.completed(id) - called from fn to indicate fn execution is completed

Usage
-----

Queue callback for later execution:

    $scru.queue('t1', $scru.fn.async_load('test1.js'));
    $scru.queue('t2', $scru.fn.async_load('test2.js'), ['t1']);
    $scru.queue('jsapi', $scru.fn.async_load('http://www.google.com/jsapi'));

Explictly invoke queued callback:

    $scru.invoke('t1');

Execute function (when all deps are completed):

    $scru.execute($scru.fn.async_load('test3.js'), ['t2', 't1']);
    $scru.execute($scru.fn.google_load('maps', '2'), ['jsapi']);

Custom callbacks
----------------

Custom callback must take 'id' as the only argument and inform $scru when it's
completed ($scru.completed(id)). See async_load and google_load for examples.

Name
----

scru name is formed from "SCRipt queUe". The way it sounds is intentional ;-)