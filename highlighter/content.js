let port = chrome.runtime.connect({name: "highlightedTextPort"});

function sendHighlightedText() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    console.log(`Highlighted Text: ${selectedText}`);
    port.postMessage({ text: selectedText });
  } else {
    console.log('No text selected');
  }
}

document.addEventListener('mouseup', sendHighlightedText);

// Listen for the unload event and disconnect the port when it fires.
window.addEventListener('unload', function() {
  port.disconnect();
});
