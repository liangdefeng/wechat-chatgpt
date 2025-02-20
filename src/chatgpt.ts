import {config} from "./config.js";

let apiKey = config.openai_api_key;
let model = config.model;
const sendMessage = async (message: string) => {
  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            "role": "user",
            "content": message
          }
        ],
        temperature: 0.6
      }),
    });
    return response.json()
      .then((data) => {
        if (Array.isArray(data.choices)) {
          return data.choices[0].message.content;
        } else {
          return "Something went wrong! data is " + data;
          console.log("data is" + data)
        }
      });
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}

export {sendMessage};
