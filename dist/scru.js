/* scru.js, (c) Przemek Sobstel 2011, License: MIT */

$scru = (function(){
  var $public = {}
  var queue = [], deps = [], completed = [], delayed = [], called = []
  var func_i = 0;

  function depsCompleted(id) {
    var deps_completed = true
    if (deps[id] && deps[id].length) {
      for (var i in deps[id]) {
        var dep = deps[id][i]
        if (!completed[dep]) {
          deps_completed = false
          delayed[dep] = delayed[dep] || []
          delayed[dep].push(id)
          $public.invoke(dep)
        }
      }
    }
    return deps_completed
  }

  $public.queue = function(id, fn, fn_deps) {
    queue[id] = queue[id] || []
    queue[id] = fn
    deps[id] = fn_deps
  }

  $public.invoke = function(id) {
    if (!called[id] && !completed[id] && depsCompleted(id)) {
      called[id] = true
      queue[id](id)
    }
  }

  $public.execute = function(fn, fn_deps) {
    var id = '_fn_' + (func_i++) + '_'
    $public.queue(id, fn, fn_deps)
    $public.invoke(id)
  }

  $public.completed = function(id){
    if (!completed[id]) {
      completed[id] = true
      if (delayed[id] && delayed[id].length) {
        for (var i in delayed[id]) {
          $public.invoke(delayed[id][i])
        }
      }
    }
  }

  return $public;
})();

$scru.fn.async_load = function(src) {
  return function(id) {
    var script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    script.async = true
    script.onload = function() {
      $scru.completed(id)
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}

$scru.fn.google_load = function(moduleName, version, optionalSettings) {
  optionalSettings = optionalSettings || []
  var org_callback = optionalSettings['callback'] || function(){}
  return function(id) {
    optionalSettings['callback'] = function() {
      $scru.completed(id)
      org_callback()
    }
    google.load(moduleName, version, optionalSettings)
  }
}
