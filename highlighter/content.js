function logHighlightedText() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    console.log(`Highlighted Text: ${selectedText}`);
  } else {
    console.log('No text selected');
  }
}

document.addEventListener('mouseup', logHighlightedText);
