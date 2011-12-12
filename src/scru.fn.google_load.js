/* scru.js, (c) Przemek Sobstel 2011, License: MIT */

$scru.fn.google_load = function(moduleName, version, optionalSettings) {
  optionalSettings = optionalSettings || []
  var org_callback = optionalSettings['callback'] || function(){}
  return function(id) {
    optionalSettings['callback'] = function() {
      $scru.ready(id)
      org_callback()
    }
    google.load(moduleName, version, optionalSettings)
  }
}
