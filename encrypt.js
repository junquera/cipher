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


function protect_key(password, salt){

  // 1000 iterations takes a couple seconds in the browser. Wouldn't want to go much higher if this is a browser implementation
  var iterations = 1000;

  // make your own hash if you don't know this one
  return CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations }).toString();
}

console.log("Starting");
// TODO Avoid password fields
// TODO https://www.npmjs.com/package/crypto-js
// TODO Prompt for password
// TODO Encrypt / Decrypt
var original_value = document.activeElement.value;

var password = prompt("Set password");

var salt = CryptoJS.lib.WordArray.random(128/8).toString();

console.log("Protecting key");
var key = protect_key(password, salt);
console.log(key);

var ciphertext = CryptoJS.AES.encrypt(original_value, key);

// TODO Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);
document.activeElement.value = salt + ciphertext;
