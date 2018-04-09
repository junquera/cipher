var iface;

if(chrome){
  iface = chrome;
} else if (browser) {
  iface = browser;
}

iface.contextMenus.create({
  id: "encrypt",
  title: "Encrypt", //browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  // contexts: ["selection"]
  contexts: ["editable"]
});

iface.contextMenus.create({
  id: "decrypt",
  title: "Decrypt", //browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  // contexts: ["selection"]
  contexts: ["editable"]
});


iface.contextMenus.onClicked.addListener(function(info, tab) {

  iface.tabs.executeScript(tab.id, {
    file: "/crypto-js.js",
  });

  switch (info.menuItemId) {
    case "encrypt":
      iface.tabs.executeScript(tab.id, {
        file: "/encrypt.js",
      });
      // alert(info.selectionText);
      break;
    case "decrypt":
      iface.tabs.executeScript(tab.id, {
        file: "/decrypt.js",
      });
      break;
  }
})
