import React, { useState, useEffect } from 'react';
import './Article.css';
const { Configuration, OpenAIApi } = require("openai");

const Article = () => {
    const [popupText, setpopupText] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const text = document.querySelector('.container');
        text.onmouseup = text.onkeyup = async function() {
            const selectedText = window.getSelection().toString();
            
            if (selectedText.length > 0) {
                const titleText = document.querySelector('h1').innerText;
                const paragraphText = window.getSelection().anchorNode.parentNode.innerText;
                const prompt = `
                 You are a virtual assistant that generates a message every time a user highlights text in an online course aimed at adults. 
                 In order to provide intelligent commentary on the highlighted text, I will provide the topic of the course, the entire paragraph in which  
                 the next was highlighted as well as the text itself that was highlighted. Provide a definition, or an interesting message to help the user  
                 understand whatever the highlighted text may be. This definition or message should be 3 sentences at most and try to give the user only 
                 enough information to keep reading through the article. \n 
                 Subject of lesson: ${titleText} \n
                 Paragraph: ${paragraphText} \n
                 Highlighted text: ${selectedText}
                `;

                console.log(process.env.REACT_APP_OPENAI_API_KEY);  

                const configuration = new Configuration({
                    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
                    organizationId: "Personal",
                });

                const openai = new OpenAIApi(configuration);
                const chatCompletion = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [{role: "user", content: "Hello, tell me a fun fact."}],
                });
                const rep = chatCompletion.data.choices[0].message.content.toString() ;

                const popup = "You highlighted: " + selectedText + ".\n";
                
                const response = `
                    Your AI assistant responded with: \n 
                `
                if (selectedText.length > 0) {
                    setpopupText(rep);
                    setShowPopup(true);
                }
            }
        };
    }, []);

    return (
        <div className="layout">
            <div className="container">
                <h1> The Russian Annexation of Crimea</h1>
                
                <p>In 2014, the world watched in suspense as a major international crisis unfolded: the annexation of Crimea by the Russian Federation. This event, which involved the strategic Ukrainian peninsula of Crimea, located in the Black Sea, marked a significant turning point in world politics. The annexation followed a political crisis in Ukraine that saw its pro-Russian president, Viktor Yanukovych, ousted. The Russian government viewed the political change in Ukraine as a threat to its interests, particularly regarding the Russian naval base in Sevastopol, Crimea. As the situation escalated, Russia moved to annex Crimea, justifying this act by citing the protection of Russian-speaking populations in the region. However, this move was heavily criticized internationally, with many countries deeming it a breach of international law.</p>

                <p>The annexation process began in late February 2014. Following the ousting of Yanukovych, Russian troops moved into Crimea, effectively seizing control of key infrastructures. This military action was initially done covertly, with soldiers without insignias - later identified as Russian - occupying key sites. Simultaneously, pro-Russian sentiment was growing in Crimea. This sentiment, fuelled by Russia's longstanding influence and the presence of a large ethnic Russian population, eventually led to a controversial referendum. The referendum, held on March 16, 2014, saw an overwhelming majority vote in favor of joining Russia. However, the vote was deemed illegitimate by a large portion of the international community, with concerns about voting conditions and the overall legality of the process.</p>

                <p>The consequences of the annexation were wide-reaching and significant. On the international stage, Russia was widely condemned and faced several sanctions from the European Union, United States, and other countries. These sanctions targeted individuals, businesses, and entire sectors of the Russian economy, and have had a long-term impact on Russia's economic growth. Diplomatic relations between Russia and many Western countries also soured, contributing to a period of increased tensions and mistrust that continues to this day. Moreover, Russia's actions in Crimea were seen as undermining the post-World War II international order, which is predicated on the principle of sovereign equality and the inviolability of borders.</p>

                <p>Within Ukraine, the annexation led to a sharp escalation of tensions and conflict. The event essentially ignited the ongoing War in Donbass, a complex and deadly conflict in Eastern Ukraine between the Ukrainian government and pro-Russian separatists. This conflict has resulted in thousands of deaths and displacement of people, marking a tragic period in Ukraine's history. The annexation also left Ukraine in a state of political and economic uncertainty, from which it has struggled to recover. Despite these challenges, the crisis also fostered a sense of national unity and a push for reforms in many sectors of Ukrainian society.</p>

                <p>As for Crimea itself, the impact of the annexation has been profound and multifaceted. While some in the peninsula welcomed the change, others - notably the indigenous Crimean Tatar population - have faced persecution and human rights abuses under Russian rule. The economic impacts have been significant as well, with the region suffering from the effects of international sanctions and investment challenges. Access to reliable information has also been a concern, as Russian authorities exert tight control over media in the region. Moreover, the status of Crimea remains a contentious issue on the international stage, with many countries continuing to recognize it as part of Ukraine. The annexation of Crimea by Russia in 2014 was a momentous event that has had far-reaching consequences, altering the trajectory of Ukraine, Russia, and the international geopolitical landscape.</p>
        
                <p className="author">Author: John Doe</p>
                <p className="date">Published: June 22, 2023</p>
            </div>
            {showPopup && 
                <div className="highlight-container">
                    <div className="highlight-popup">{popupText}</div>
                </div>
            }
        </div>
    );
}




export default Article;
