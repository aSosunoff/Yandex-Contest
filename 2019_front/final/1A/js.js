module.exports = function promisify(api) {  
	let promisedApi = {};
	  let list = Object.entries(api);
	  for(let [key, value] of list){
		  let type = typeof api[key];
		  switch (type) {
			  case 'number':
			  case 'string':
			  case 'boolean':
				  promisedApi[key] = api[key];
				  break;
			  case 'object':
				  promisedApi[key] = promisify(api[key]);
				  break;
			  case 'function':
				  promisedApi[key] = function() {
					  let argUpLevel = Array.from(arguments);
					  return new Promise(function(resolve, reject) {
						  api[key](function(){
							  let arg = Array.from(arguments);
							  if(arg[0] == null){
								  resolve.apply(null, arg.slice(1));
							  } else {
								  reject.apply(null, arg);
							  }
						  },...argUpLevel);
					  })
				  };
				  break;
		  }
	  }
  
	  return promisedApi;
  };