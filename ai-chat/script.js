async function askAI(question) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: question }]
      })
    });
    const data = await response.json();
    document.getElementById("answer").textContent = data.choices[0].message.content;
  } catch (error) {
    document.getElementById("answer").textContent = "Something went wrong.";
  }
}

document.getElementById("askBtn").addEventListener("click", () => {
  const question = document.getElementById("question").value;
  askAI(question);
});