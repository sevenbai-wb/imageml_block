//https: //blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#ckpupe
Blockly.Blocks['deeplearn_classifier'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("模型名稱：")
      .appendField(new Blockly.FieldTextInput(""), "modelName");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['deeplearn_label'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("imageClassifier"), "name")
      .appendField("對影像進行分類，當分類編號為")
      .appendField(new Blockly.FieldTextInput("0"), "idx")
      .appendField("時");
    this.appendStatementInput("name")
      .setCheck(null)
      .appendField("執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
