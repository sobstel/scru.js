/* scru.js, (c) Przemek Sobstel 2011, License: MIT */

$scru = (function(){
  var $public = {}
  var queue = [], deps = [], completed = [], delayed = [], called = []
  var func_i = 0;

  function depsCompleted(id) {
    var deps_completed = true
    for (var i in deps[id]) {
      var dep = deps[id][i]
      if (!completed[dep]) {
        deps_completed = false
        delayed[dep] = delayed[dep] || []
        delayed[dep][id] = true
        $public.invoke(dep)
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

  $public.completed = function(id) {
    if (!completed[id]) {
      completed[id] = true
      for (var delayed_id in delayed[id]) {
        $public.invoke(delayed_id)
      }
    }
  }

  $public.fn = {}

  return $public;
})();
