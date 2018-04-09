browser.contextMenus.create({
  id: "encrypt",
  title: "Encrypt", //browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  // contexts: ["selection"]
  contexts: ["editable"]
});

browser.contextMenus.create({
  id: "decrypt",
  title: "Decrypt", //browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  // contexts: ["selection"]
  contexts: ["editable"]
});


browser.contextMenus.onClicked.addListener(function(info, tab) {

  browser.tabs.executeScript(tab.id, {
    file: "crypto-js.js",
  });
  
  switch (info.menuItemId) {
    case "encrypt":
      browser.tabs.executeScript(tab.id, {
        file: "encrypt.js",
      });
      // alert(info.selectionText);
      break;
    case "decrypt":
      browser.tabs.executeScript(tab.id, {
        file: "decrypt.js",
      });
      break;
  }
})
