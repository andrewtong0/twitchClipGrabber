getImage.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code:"try {" +
              "clipURL = document.getElementsByTagName('video')[0].src;" +
            "}" +
            "catch(error) {" +
              "clipURL = null" +
            "}" +
            "clipURL"},
      function (result) {
        let url = result[0];
        if (url === null){
          let error = document.getElementById('errorMsg');
          error.innerHTML = "No clip found";
        }
        else {
          chrome.tabs.create({url: url});
        }
      });
  });
};