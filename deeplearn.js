+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(function (scope) {
  'use strict';
  var self;
  var proto;
  var Module = scope.Module;

  function loadJS(filePath) {
    var req = new XMLHttpRequest();
    req.open("GET", filePath, false); // 'false': synchronous.
    req.send(null);

    var headElement = document.getElementsByTagName("head")[0];
    var newScriptElement = document.createElement("script");
    newScriptElement.type = "text/javascript";
    newScriptElement.text = req.responseText;
    headElement.appendChild(newScriptElement);
  }


  function deeplearn(cameraURL, modelURL) {
    Module.call(this);
    loadJS('https://marty5499.github.io/webduino-module-deeplearn/videoClassifier.js');
    console.log("create deeplearn...");
    this.canvas = createCanvas();
    this.status = createStatus();
    this.imageDL = new ImageDL();
    this.modelURL = modelURL;
    this.cameraURL = cameraURL;
    this.startDetect();
    this.labels = {};
  }

  function createStatus() {
    var elem = document.createElement('div');
    elem.id = 'status';
    document.body.appendChild(elem);
    return elem;
  }

  function createCanvas() {
    var elem = document.createElement('canvas');
    elem.id = 'c1';
    elem.width = '224';
    elem.height = '224';
    document.body.appendChild(elem);
    return elem;
  }

  deeplearn.prototype = proto =
    Object.create(Module.prototype, {
      constructor: {
        value: deeplearn
      }
    });

  proto.onLabel = function (label, callback) {
    this.labels[label] = callback;
  }

  proto.startDetect = function () {
    var self = this;
    var url = '';

    self.predict = function () {}
    self.imageDL.load(self.modelURL, function () {
      console.log("start...");
      self.predict = async function (img, callback) {
        self.imageDL.predict(img, callback);
      }
    });
    self.camera = new Camera(self.cameraURL).onCanvas('c1', function (canvas) {
      //new Camera('ws://192.168.0.199:8889/rws/ws').onCanvas('c1', function (canvas) {
      //new Camera('ws://192.168.43.204:8889/rws/ws').onCanvas('c1', function (canvas) {
      var img = new Image(); //document.getElementById("image");
      img.src = canvas.toDataURL();
      img.onload = function () {
        self.predict(img, function (idx, c) {
          if (typeof self.labels[idx] === "function") {
            self.labels[idx](idx);
          }
          self.status.innerHTML = "辨識標籤為..." + idx + ",信心水準：" + parseInt(c * 1000000) / 10000.0 + " %";
        });
      };
    });
  }

  scope.module.deeplearn = deeplearn;
}));