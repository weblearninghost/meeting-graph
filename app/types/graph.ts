export type GraphNode = {
  id: string;
  type: "task" | "person" | "decision";
  label: string;
};

export type GraphEdge = {
  source: string;
  target: string;
  relation: "assigned_to" | "depends_on" | "blocks";
};

export type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};
