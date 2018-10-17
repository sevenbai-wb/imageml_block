Blockly.JavaScript['deeplearn_camera'] = function (block) {
  var text_cameraurl = block.getFieldValue('cameraURL');
  var code = 'new Camera("' + text_cameraurl + '")';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['deeplearn_classifier'] = function (block) {
  var text_cameraurl = block.getFieldValue('cameraURL');
  var text_modelurl = block.getFieldValue('modelURL');
  var code = 'getVideoClassifier("' + text_cameraurl + '","' + text_modelurl + '")';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['deeplearn_label'] = function (block) {
  var text_label = block.getFieldValue('label');
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
  var statements_name = Blockly.JavaScript.statementToCode(block, 'name');
  var code = variable_name + '.onLabel(' + text_label + ',function(label){\n';
  code += statements_name + '\n';
  code += '});\n';
  return code;
};


Blockly.JavaScript['deeplearn_objectDetect'] = function (block) {
  var text_cameraurl = block.getFieldValue('cameraURL');
  var text_modelurl = block.getFieldValue('modelURL');
  var code = 'getObjectDetect("' + text_cameraurl + '","' + text_modelurl + '")';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['deeplearn_detect'] = function (block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
  var text_objectname = block.getFieldValue('objectName');
  var statements_objname = Blockly.JavaScript.statementToCode(block, 'objName');
  var code = variable_name + '.onName("' + text_objectname + '" , function(className, classProb, top, left, width, height){\n';
  code += statements_objname + '\n';
  code += '});\n';
  return code;
};


Blockly.JavaScript['deeplearn_objinfo'] = function (block) {
  var variable_objdetect = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('objDetect'), Blockly.Variables.NAME_TYPE);
  var text_objectname = block.getFieldValue('objectName');
  var dropdown_objinfo = block.getFieldValue('objInfo');
  var code = variable_objdetect + '.objInfo("' + text_objectname + '","' + dropdown_objinfo + '")';
  return [code, Blockly.JavaScript.ORDER_NONE];
};