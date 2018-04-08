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
  alert("Error");
}

var original_value = document.activeElement[text_fields[text_field]];

var password = prompt("Set password");

var salt = original_value.substring(0,32);
original_value = original_value.substring(32);

var key = protect_key(password, salt);

var bytes = CryptoJS.AES.decrypt(original_value, key);

var plaintext = bytes.toString(CryptoJS.enc.Utf8);

var orig_hash = plaintext.substring(0, 64);
var result = plaintext.substring(64);

var result_hash = CryptoJS.SHA256(result).toString();

if(orig_hash == result_hash){
  document.activeElement[text_fields[text_field]] = result;
} else {
  alert("Error, bad decryption.");
}
