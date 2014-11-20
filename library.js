
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

function setAllLayers (layers, level) {
    for (var n=0; n<layers.count();n++){

      var layer = layers.objectAtIndex(n);
      var visible = getConfig('layerVisibility' + level + index);
      [layer setIsVisible:visible];
      // log(layer.name() + ' should be visible? ' + 
      //   'layerVisibility' + level + index + layer.isVisible());
      index++;  
      if (layer.isKindOfClass(MSLayerGroup) && !layer.isKindOfClass(MSShapeGroup)) {
          setAllLayers(layer.layers(), level);
      } else {

      }
    } 
}

function readAllLayers (layers, level) {
    for (var n=0; n<layers.count();n++){

      var layer = layers.objectAtIndex(n);
      setConfig('layerVisibility' + level + index, [layer isVisible]);
      // log(layer.name() + ' is visible? ' + 
      //   'layerVisibility' + level + index + layer.isVisible());
      index++;  
      if (layer.isKindOfClass(MSLayerGroup) && !layer.isKindOfClass(MSShapeGroup)) {
          readAllLayers(layer.layers(), level);
      } else {

      }
    } 
}

function saveAsStateN (level) {
  var pages = [doc pages];
  for (var a=0; a<pages.count();a++){

    var currentPage = pages[a];
    var artboards = [currentPage artboards];
    for (var i=0; i<artboards.count(); i++) {
      var artboard = artboards[i];
      var layergroups = [artboard layers];
      readAllLayers(layergroups, level);
    } 
    
  }
}

function switchToStateN (level) {
  var pages = [doc pages];
  for (var a=0; a<pages.count();a++){
    var currentPage = pages[a];
    var artboards = [currentPage artboards];

    for (var i=0; i<artboards.count(); i++) {
      var artboard = artboards[i];
      var layergroups = [artboard layers];
      setAllLayers(layergroups, level);
    } 
    
  }
}

