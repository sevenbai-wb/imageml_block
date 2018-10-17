//https: //blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#ckpupe
Blockly.Blocks['deeplearn_camera'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("影像串流來源 :")
      .appendField(new Blockly.FieldTextInput("0"), "cameraURL");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};

Blockly.Blocks['deeplearn_classifier'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("影像串流來源 :")
      .appendField(new Blockly.FieldTextInput("ws://192.168.43.204:8889/rws/ws"), "cameraURL");
    this.appendDummyInput()
      .appendField("載入模型 URL:")
      .appendField(new Blockly.FieldTextInput("https://aiot.webduino.cc/download/model-1530722287793/model.json"), "modelURL");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('https://aiot.webduino.cc/videoTraining.html');
  }
};


Blockly.Blocks['deeplearn_label'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("imageClassifier"), "name")
      .appendField("對影像進行分類，當分類標籤為")
      .appendField(new Blockly.FieldTextInput("0"), "label")
      .appendField("時");
    this.appendStatementInput("name")
      .setCheck(null)
      .appendField("執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
    this.setTooltip('');
    this.setHelpUrl('https://aiot.webduino.cc/videoTraining.html');
  }
};


Blockly.Blocks['deeplearn_objectDetect'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("影像串流來源 :")
      .appendField(new Blockly.FieldTextInput("1"), "cameraURL");
    this.appendDummyInput()
      .appendField("載入模型 URL:")
      .appendField(new Blockly.FieldTextInput("/tfjs-model/model.json"), "modelURL");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};


//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ev9a52
Blockly.Blocks['deeplearn_detect'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("當")
      .appendField(new Blockly.FieldVariable("objectDetect"), "name")
      .appendField("偵測到物件名稱為")
      .appendField(new Blockly.FieldTextInput("person"), "objectName");
    this.appendStatementInput("objName")
      .setCheck(null)
      .appendField("執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['deeplearn_objinfo'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("objectDetect"), "objDetect")
      .appendField("取得")
      .appendField(new Blockly.FieldTextInput("person"), "objectName")
      .appendField("的")
      .appendField(new Blockly.FieldDropdown([
        ["準確率", "classProb"],
        ["左上角 x 座標", "left"],
        ["左上角 y 座標", "top"],
        ["寬度", "width"],
        ["高度", "height"]
      ]), "objInfo");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};