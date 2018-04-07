browser.contextMenus.create({
  id: "encrypt",
  title: "Encrypt", //browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  // contexts: ["selection"]
  contexts: ["editable", "selection"]
});


browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "encrypt":
      browser.tabs.executeScript(tab.id, {
        file: "encrypt.js",
      });
      // alert(info.selectionText);
      break;
  }
})
