function revertSelection(){
  console.log("Reverting");
  if(window.getSelection) {
    var sel, range;
    sel = window.getSelection();
    if (sel.rangeCount) {

      range = sel.getRangeAt(0);
      range.deleteContents();
      var reverted = sel.toString().split('').reverse().join('');
      console.log(reverted);
      range.insertNode(document.createTextNode(reverted));
    }
  } else {
    range = document.selection.createRange();
    range.text = range.text.toString().split('').reverse().join('')
  }
}

revertSelection();
