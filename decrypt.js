function protect_key(password, salt){

  // 1000 iterations takes a couple seconds in the browser. Wouldn't want to go much higher if this is a browser implementation
  var iterations = 10000;

  // make your own hash if you don't know this one
  return CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations }).toString();
}

var original_value = document.activeElement.value;

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
  document.activeElement.value = result;
} else {
  alert("Error, bad decryption.");
}
