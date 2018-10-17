+(function (window, webduino) {

  'use strict';

  window.getVideoClassifier = function (cameraURL, modelURL) {
    return new webduino.module.deeplearn(cameraURL, modelURL);
  };

  window.getObjectDetect =  function (cameraURL, modelURL) {
    return new webduino.module.objectDetect(cameraURL, modelURL);
  };

  
}(window, window.webduino));