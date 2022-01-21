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

getRedditVideoUrl.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code:"try {" +
                    "vidURL = document.getElementsByTagName('video')[0].getElementsByTagName('source')[0].src;" +
                    "vidTitle = document.getElementsByTagName('h1')[0].innerText;" +
                    "concatResult = `${vidURL} ${vidTitle}`;" +
                    "}" +
                    "catch(error) {" +
                    "vidURL = null" +
                    "vidTitle = null" +
                    "}" +
                    "concatResult"},
            function (result) {
                let returnStringArray = result[0].toString().split(/\s(.+)/);
                let url = returnStringArray[0];
                let title = returnStringArray[1].replace(/[^\w\s]/gi, "");
                if (url === null){
                    let error = document.getElementById('errorMsg');
                    error.innerHTML = "No video clip found";
                }
                else {
                    let clipboardEl = document.createElement('textarea');
                    clipboardEl.textContent = `"${url}" ${title}`;
                    document.body.appendChild(clipboardEl);
                    clipboardEl.select();
                    document.execCommand('copy');
                    document.body.removeChild(clipboardEl);
                }
            });
    });
};