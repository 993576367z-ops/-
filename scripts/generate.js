import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generate() {
  const prompt = process.env.PROMPT || "做一个简单网页，显示Hello AI";

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "生成纯JS网页代码，写入src/index.js"
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const code = res.choices[0].message.content;

  fs.mkdirSync("src", { recursive: true });
  fs.writeFileSync("src/index.js", code);

  console.log("✅ AI代码已生成");
}

generate();
