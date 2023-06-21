chrome.runtime.onConnect.addListener(function(port) {
  if(port.name === "highlightedTextPort") {
    port.onMessage.addListener(async function(message) {
      console.log(message);
      const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: generatePrompt(message.title, message.surroundingText, message.highlighted),
        temperature: 0.6,
      });
      console.log(completion);
    });
  }
});

function generatePrompt(subjectText, paragraphText, highlightedText) {
    return `

    You are a virtual assistant that generates a message every time a user highlights 
    text in an online course aimed at adults. In order to provide intelligent commentary
    on the highlighted text, I will provide the topic of the course, the entire paragraph
    in which the next was highlighted as well as the text itself that was highlighted.
    Provide a definition, or an interesting message to help the user understand whatever
    the highlighted text may be.

    Subject of lesson: ${subjectText}
    Paragraph: ${paragraphText}
    Highlighted text: ${highlightedText}
    `;
}
