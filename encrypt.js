function revertSelection(){
  console.log("Reverting");
  if(window.getSelection) {
    var sel, range;
    sel = window.getSelection();
    if (sel.rangeCount) {
      console.log(sel);
      var text = sel.toString();
      range = sel.getRangeAt(0);
      range.deleteContents();
      var reverted = text.toString().split('').reverse().join('');
      console.log(reverted);
      range.insertNode(document.createTextNode(reverted));
    } else {
      console.log("Noting selected");
    }
  } else {
    range = document.selection.createRange();
    range.text = range.text.toString().split('').reverse().join('')
  }
}

// TODO Avoid password fields
// TODO https://www.npmjs.com/package/crypto-js
// TODO Prompt for password
// TODO Encrypt / Decrypt
var original_value = document.activeElement.value;
var password = prompt("Set password");
var ciphertext = CryptoJS.AES.encrypt(original_value, password);
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
document.activeElement.value = original_value.toString().split('').reverse().join('');
