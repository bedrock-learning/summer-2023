chrome.runtime.onConnect.addListener(function(port) {
  if(port.name === "highlightedTextPort") {
    port.onMessage.addListener(function(message) {
      console.log(message);
    });
  }
});
