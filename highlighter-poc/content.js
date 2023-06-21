let port = chrome.runtime.connect({name: "highlightedTextPort"});

function sendHighlightedText() {
  const selectedText = window.getSelection();
  if (selectedText) {
    port.postMessage({
      'title': document.title,
      'highlighted': selectedText.toString(),
      'surroundingText': selectedText.anchorNode.parentElement.innerText,
    });
  } else {
    console.log('No text selected');
  }
}

document.addEventListener('mouseup', sendHighlightedText);
