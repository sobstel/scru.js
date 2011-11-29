
function async_file_loader(src) {
	return function(id) {
		var script = document.createElement('script')
		script.src = src
		script.type = 'text/javascript'
		script.async = true
		script.onload = function() { $scru.completed(id) }
		document.getElementsByTagName('head')[0].appendChild(script)
	}
}

function google_loader(moduleName, version, optionalSettings) {
	var optionalSettings = optionalSettings || []
	var org_callback = optionalSettings['callback'] || function(){}
	return function(id) {
		optionalSettings['callback'] = function() { 
			$scru.completed(id)
			org_callback()
		}
  	google.load(moduleName, version, optionalSettings)
	}
}
