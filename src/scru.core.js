/* scru.js, (c) Przemek Sobstel 2011, License: MIT */

var $scru = (function(){
  var that = {}

  var queue = {}, deps = {}, delayed = {}, invoked = {}, ready = {}
  var func_i = 0

  function all_deps_ready(id) {
    var all_deps_ready = true
    for (var key in deps[id]) {
      var dep = deps[id][key]
      if (!ready[dep]) {
        all_deps_ready = false
        delayed[dep] = delayed[dep] || {}
        delayed[dep][id] = true
        that.invoke(dep)
      }
    }
    return all_deps_ready
  }

  that.queue = function(id, fn, fn_deps) {
    queue[id] = queue[id] || {}
    queue[id] = fn
    deps[id] = fn_deps || {}
  }

  that.invoke = function(id) {
    if (!invoked[id] && !ready[id] && all_deps_ready(id)) {
      invoked[id] = true
      queue[id](id)
    }
  }

  that.execute = function(fn, fn_deps) {
    var id = '_fn_' + (func_i++) + '_'
    that.queue(id, fn, fn_deps)
    that.invoke(id)
  }

  that.ready = function(id) {
    if (!ready[id]) {
      ready[id] = true
      for (var key in delayed[id]) {
        that.invoke(key)
      }
    }
  }

  that.fn = {}

  return that
})()
