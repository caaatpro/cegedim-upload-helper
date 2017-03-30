chrome.storage.sync.get({
  code: '',
  productName: ''
}, function(items) {
  console.log(items);
  document.getElementById('producntName').innerText = items.productName;
  document.getElementById('code').innerText = items.code;
});
