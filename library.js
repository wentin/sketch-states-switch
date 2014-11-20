
var prefix = 'wentin';

function getConfig(key) {
  var defaults = [NSUserDefaults standardUserDefaults];

  return [defaults objectForKey: '-' + prefix + '-' + key];
}

function setConfig(key, value) {
  var defaults = [NSUserDefaults standardUserDefaults],
      configs  = [NSMutableDictionary dictionary];

  [configs setObject: value forKey: '-' + prefix + '-' + key]

  return [defaults registerDefaults: configs];
}