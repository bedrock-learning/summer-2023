document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('mouseup', function() {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText !== '') {
        alert('You selected: ' + selectedText);
    }
    });
}); 