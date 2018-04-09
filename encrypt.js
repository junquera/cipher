function protect_key(password, salt){

  // 1000 iterations takes a couple seconds in the browser. Wouldn't want to go much higher if this is a browser implementation
  var iterations = 10000;

  // make your own hash if you don't know this one
  return CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations }).toString();
}

var text_fields = ['value', 'textContent'];
var text_field = -1;

for(let field in text_fields){
  if(document.activeElement[text_fields[field]]) {
    text_field = field;
    break;
  }
}

if(text_field < 0){
  alert("Error, no value found.");
}

var original_value = document.activeElement[text_fields[text_field]];

if(original_value.length <= 0){
  alert("Error, empty value.");
}

var hash = CryptoJS.SHA256(original_value).toString();
var to_encrypt = hash + original_value;

var password = prompt("Set password");

var salt = CryptoJS.lib.WordArray.random(128/8).toString();

var key = protect_key(password, salt);

var ciphertext = CryptoJS.AES.encrypt(to_encrypt, key);

document.activeElement[text_fields[text_field]] = salt + ciphertext;
