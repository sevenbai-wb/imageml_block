+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(function (scope) {
  'use strict';
  var self = this;
  var proto;
  var Module = scope.Module;
  const HOST_URL = 'https://imageml.webduino.io';
  

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

  async function start(modelName) {
    Module.call(this);
    loadJS('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.12.5');

    // load models
    try {
      const mobilenet = await tf.loadModel(HOST_URL + '/mobilenet/v1_0.25_224/model.json');
      const layer = mobilenet.getLayer('conv_pw_13_relu');
      this.mobilenet = tf.model({inputs: mobilenet.inputs, outputs: layer.output});
      this.secondmodel = await tf.loadModel(HOST_URL + '/ml_models/' + modelName + '/model.json');
    } catch (e) {
      alert('Load model error!');
    }

    // create video element
    this.vid = document.createElement('video');
    this.vid.width = 224;
    this.vid.height = 224;
    this.vid.autoplay = true;
    document.body.appendChild(this.vid);
    // start webcam
    try {
      navigator.mediaDevices.getUserMedia({
        video: {
          width: 224,
          height: 224,
          facingMode: "environment"
        }
      })
      .then(stream => {
        this.vid.srcObject = stream;
        this.vid.play();
      });
    } catch (e) {
      alert('WebCam is not available!');
    }

    // create status message
    this.status = document.createElement('div');
    this.status.id = 'status';
    document.body.appendChild(this.status);

    this.labels = {};
    await this.startDetect();
  }

  function deeplearn(modelName) {
    setTimeout(async ()=>{
      await start(modelName);
    }, 1);
  }

  deeplearn.prototype = proto =
    Object.create(Module.prototype, {
      constructor: {
        value: deeplearn
      }
    });

  proto.onLabel = function (idx, callback) {
    this.labels[idx] = callback;
  }

  proto.startDetect = async function () {
    const resultTensor = tf.tidy(() => {
      const webcamImage = tf.fromPixels(this.vid);
      const batchedImage = webcamImage.expandDims(0);
      const img = batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      const activation = this.mobilenet.predict(img).flatten().expandDims(0);
      const predictions = this.secondmodel.predict(activation);
      return predictions.as1D();
    });
    let classTensor = resultTensor.argMax();
    let confidenceTensor = resultTensor.max();
    let result = {
      class: (await classTensor.data())[0],
      confidence: (await confidenceTensor.data())[0]
    }
    classTensor.dispose();
    confidenceTensor.dispose();
    resultTensor.dispose();
    this.status.innerHTML = "辨識類別編號為：" + result.class + ",信心水準：" + parseInt(result.confidence * 1000000) / 10000.0 + " %";
    if (typeof this.labels[idx] === "function") {
      this.labels[idx](idx);
    }
    setTimeout(async ()=>{await this.startDetect()}, 1);
  }

  scope.module.deeplearn = deeplearn;
}));