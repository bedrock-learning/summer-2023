let port = chrome.runtime.connect({name: "highlightedTextPort"});

function sendHighlightedText() {
  const selectedText = window.getSelection();
  if (selectedText) {
    console.log(selectedText.anchorNode.parentElement.innerText);
    console.log(`Highlighted Text: ${selectedText}`);
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
