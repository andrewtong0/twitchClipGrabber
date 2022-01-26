downloadTwitchClip.onclick = function() {
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

chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    let url = tabs[0].url;
    if (url.includes("reddit")) {
        console.log("WEE REDDIT");
        document.getElementById("getRedditVideoUrl").style.display = "block";
        document.getElementById("downloadTwitchClip").style.display = "none";
    } else if (url.includes("twitch")) {
        document.getElementById("getRedditVideoUrl").style.display = "none";
        document.getElementById("downloadTwitchClip").style.display = "block";
    } else {
        document.getElementById("getRedditVideoUrl").style.display = "none";
        document.getElementById("downloadTwitchClip").style.display = "none";
        let error = document.getElementById('errorMsg');
        error.innerHTML = "No matching domain found";
        error.style.width = "200px";
    }
});