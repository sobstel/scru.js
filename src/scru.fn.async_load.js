/* scru.js, (c) Przemek Sobstel 2011, License: MIT */

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
