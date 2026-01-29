"use client";

import ReactFlow, { Background, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { GraphData } from "../types/graph";
export default function GraphView({ graph }: { graph: GraphData }) {
  const nodes: Node[] = graph.nodes.map((n) => ({
  id: `node-${n.id}`, 
  data: { label: `${n.label} (${n.type})` },
  position: { x: 0, y: 0 },
  style: {
    border: "1px solid #333",
    padding: 10,
    borderRadius: 8,
    background: n.type === "person" ? "#E3F2FD" : "#E8F5E9",
  },
 
  
}));


 const edges: Edge[] = graph.edges.map((e) => ({
  id: `edge-${e.source}-${e.target}-${e.relation}`, 
  source: `node-${e.source}`,
  target: `node-${e.target}`,
  label: e.relation,
  animated: true,
}));
   console.log({nodes});

  return (
    <div style={{ height: 500, border: "1px solid #ddd", marginTop: 20 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
