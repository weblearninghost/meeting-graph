import { NextResponse } from 'next/server';
const  OLLAMA_URL = "http://127.0.0.1:11434";
import { logger } from '@/app/lib/logger';


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
try {
  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'phi3',
      prompt,
      stream: false,
      options: {
      temperature: 0,  
      top_p: 1,
      top_k: 1,
    },
    }),
  });

  const data = await res.json();
  logger.info("Data recieved from Ollama server. ")

  let graph;
  try {
    graph = JSON.parse(data.response);
  } catch {
    graph = { nodes: [], edges: [] };
  }
  return NextResponse.json(graph);
} catch (error) {
  logger.error({error},"Failed to fetch data from Ollama server.");
}

  
}
