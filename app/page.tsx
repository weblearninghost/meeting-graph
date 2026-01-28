"use client";
import { useState } from "react";
import GraphView from "./components/GraphView";
import { GraphData } from "./types/graph";

export default function Home() {
  const [text, setText] = useState("");
  const [graph, setGraph] = useState<GraphData | null>(null);

  async function handleClick() {
    const res = await fetch("/api/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript: text }),
    });

    const data = await res.json();
    setGraph(data);
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Meeting Transcript → Dependency Graph</h2>

      <textarea
        rows={8}
        style={{ width: "100%" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste meeting transcript..."
      />

      <button onClick={handleClick}>Generate Graph</button>

      {graph && <GraphView graph={graph} />}
    </main>
  );
}
