require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testAI() {
  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Hello, please respond with a short greeting." }
      ]
    });

    console.log("=== AI RAW RESPONSE ===");
    console.log(res);

    console.log("=== AI MESSAGE CONTENT ===");
    console.log(res.choices?.[0]?.message?.content || "No content returned");

  } catch (err) {
    console.log("=== AI ERROR ===");
    console.error(err);
  }
}

testAI();