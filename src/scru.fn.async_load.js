/* scru.js, (c) Przemek Sobstel 2011, License: MIT */

$scru.fn.async_load = function(src) {
  return function(id) {
    var script = document.createElement('script'), loaded = false
    script.onload = script.onreadystatechange = function() {
      if ((this.readyState && this.readyState != 'loaded' && this.readyState != 'complete') || loaded) return;
      this.onload = this.onreadystatechange = null
      loaded = true
      $scru.ready(id)
    }
    script.src = src
    script.type = 'text/javascript'
    script.async = true
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}
