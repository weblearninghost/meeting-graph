import { NextResponse } from 'next/server';
const OLLAMA_URL = "http://localhost:11434";
export async function POST(req: Request) {
  const { transcript } = await req.json();

 const prompt = `
You extract a dependency graph from a meeting transcript.

Extract:
- Tasks (work items)
- People
- Dependencies explicitly mentioned

Return ONLY valid JSON in this format:
{
  "nodes": [{ "id": "", "type": "task|person", "label": "" }],
  "edges": [{ "source": "", "target": "", "relation": "assigned_to|depends_on" }]
}

Rules:
- Be liberal in extraction
- If a task or person is mentioned, extract it
- If any person or task is mentioned, you MUST extract it.
- Do NOT return empty arrays unless absolutely nothing is mentioned
- No explanation
- No markdown

Transcript:
${transcript}
`;


  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'tinyllama',
      prompt,
      stream: false,
      options: {
      temperature: 0,   // 👈 MOST IMPORTANT
      top_p: 1,
      top_k: 1,
    },
    }),
  });

  const data = await res.json();
 

  let graph;
  try {
    graph = JSON.parse(data.response);
  } catch {
    graph = { nodes: [], edges: [] };
  }
  console.log(graph);
  return NextResponse.json(graph);
}
