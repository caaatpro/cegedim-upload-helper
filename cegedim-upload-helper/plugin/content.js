document.addEventListener("DOMNodeInserted", function() {
  if (document.getElementById('modal-dialog-iframe')) {
    document.getElementById('modal-dialog-iframe').onload = function() {
      injected_main();
    };
  }
}, false);

function injected_main() {
  var doc = document.getElementById('modal-dialog-iframe').contentDocument;
  var code = '';

  // update slide
  doc.getElementById('_uploadCtlSingle_Html5InputFile').addEventListener('change', function() {
    doc.getElementById('_uploadCtlSingle_UploadOrCancelButton').click();
  });

  // new slide
  doc.getElementById('_uploadCtl_Html5InputFile').addEventListener('change', function() {
    var name = doc.querySelector('.filename').innerText.replace('.zip', '');
    code = name.split('_')[0];
    name.replace(code + '_', '') + ' ' + code;
    doc.getElementById('_namePrefix').value = name.replace(code + '_', '') + ' ' + code;
    doc.getElementById('_uploadCtl_UploadOrCancelButton').click();
    if (localStorage['code'] == code) {
      code = localStorage['code'];
    } else {
      localStorage['code'] = '';
    }

    if (localStorage['productId'] && localStorage['code'] == code) {
      doc.getElementById("_productId").value = localStorage['productId'];
      doc.getElementById("ctl18").value = localStorage['productName'];
    }

    saveToStorage();
  });

  doc.getElementById("_productId").addEventListener('change', function() {
    localStorage['code'] = code;
    localStorage['productId'] = this.value;
    localStorage['productName'] = doc.querySelector('tr[drag_info="' + localStorage['productId'] + '"] nobr').innerText;

    saveToStorage();
  });
}

function saveToStorage() {
  chrome.storage.sync.set({
    code: localStorage['code'],
    productName: localStorage['productName']
  });

}
