import React, { useState } from "react";
import "./Chatbot.css";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true,
});

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    const prompt = `You were hired as part of Deloitte Auditor team that specializes in development of Audit for commercial companies and individuals As part of the auditor's day to day job, they need to study US Tax law to file appropriate tax deductions to benefit the clients. 
      The auditor needs to study the US Tax law and understand the tax deductions that can be applied to the client's case.
      You are a specialist in US Tax Law. Please provide answers only related to US Tax Law queries. If the question is not related to US Tax Law, do not provide an answer.';
        if question is not related to US Tax law, then provide answer as 'I am not sure about this question. Please ask another question related to US Tax Law.'
      `;
    // Push user message to chat
    setMessages([...messages, { type: "user", text: userInput }]);

    // Make an API call to get the bot response

    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt + userInput }],
      model: "gpt-3.5-turbo",
    });
    console.log(response);

    const data = response.choices[0].message;

    // Push bot message to chat
    setMessages([
      ...messages,
      { type: "user", text: userInput },
      { type: "bot", text: data.content },
    ]);

    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="chat-history">
          {messages.map((message, index) => (
            <div key={index} className={message.type}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <textarea
            rows={3}
            cols={35}
            placeholder={"Enter Questions Related to US Tax Law"}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></textarea>

          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Chatbot;
