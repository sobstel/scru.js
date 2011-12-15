scru.js
=======

Lightweight execution dependency manager.

Core features
-------------

- lightweight (less than 0.5KB gzipped)
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
- $scru.invoke(id) - invoke queued callback (delayed until all deps ready)
- $scru.execute(fn, deps) - execute fn (delayed until all deps ready)
- $scru.ready(id) - called from fn to indicate fn execution is completed (ready)

Usage
-----

Queue callback for later execution:

``` js
$scru.queue('t1', $scru.fn.async_load('test1.js'));
$scru.queue('t2', $scru.fn.async_load('test2.js'), ['t1']);
$scru.queue('jsapi', $scru.fn.async_load('http://www.google.com/jsapi'));
```

Explictly invoke queued callback (first ensures all deps are ready):

``` js
$scru.invoke('t1');
```

Execute function (first ensures all deps are ready):

``` js
    $scru.execute($scru.fn.async_load('test3.js'), ['t2', 't1']);
    $scru.execute($scru.fn.google_load('maps', '2'), ['jsapi']);
    $scru.execute(function(id){
      do_something();
      $scru.ready(id);
    }, ['t1']);
```

Custom callbacks
----------------

Custom callback must take 'id' as the only argument and inform $scru when it's
ready ($scru.ready(id)). See async_load and google_load for examples.

Name
----

scru name is formed from "SCRipt queUe". The way it sounds is intentional ;-)
