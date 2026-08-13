export const lakehouseDiagrams = [
  {
    id: 'ingest',
    title: 'Ingest Flow',
    summary: 'Sources → ADF Copy → ADLS landing zones with schedule/event triggers.',
    nodes: [
      { id: 'src', label: 'Sources', sub: 'SQL · Files · API', x: 40, y: 90 },
      { id: 'adf', label: 'ADF', sub: 'Copy · IR', x: 220, y: 90 },
      { id: 'adls', label: 'ADLS', sub: 'Landing', x: 400, y: 90 },
      { id: 'meta', label: 'Control', sub: 'Watermark', x: 220, y: 200 },
    ],
    edges: [
      ['src', 'adf'],
      ['adf', 'adls'],
      ['meta', 'adf'],
    ],
    accent: '#0078D4',
  },
  {
    id: 'medallion',
    title: 'Medallion Layers',
    summary: 'Bronze raw → Silver cleansed → Gold business models on Delta.',
    nodes: [
      { id: 'bronze', label: 'Bronze', sub: 'Raw Delta', x: 80, y: 140 },
      { id: 'silver', label: 'Silver', sub: 'Conformed', x: 280, y: 140 },
      { id: 'gold', label: 'Gold', sub: 'Star / marts', x: 480, y: 140 },
      { id: 'dq', label: 'DQ Gates', sub: 'Checks', x: 280, y: 40 },
    ],
    edges: [
      ['bronze', 'silver'],
      ['silver', 'gold'],
      ['dq', 'silver'],
    ],
    accent: '#0f766e',
  },
  {
    id: 'adf-databricks',
    title: 'ADF + Databricks',
    summary: 'ADF orchestrates ingest and triggers Databricks notebooks for transforms.',
    nodes: [
      { id: 'adf', label: 'ADF', sub: 'Orchestrate', x: 60, y: 110 },
      { id: 'adls', label: 'ADLS', sub: 'Files', x: 240, y: 40 },
      { id: 'dbx', label: 'Databricks', sub: 'PySpark · Delta', x: 240, y: 180 },
      { id: 'serve', label: 'Warehouse', sub: 'SQL · BI · DS', x: 440, y: 110 },
    ],
    edges: [
      ['adf', 'adls'],
      ['adf', 'dbx'],
      ['adls', 'dbx'],
      ['dbx', 'serve'],
    ],
    accent: '#FF3621',
  },
  {
    id: 'cdc',
    title: 'CDC Pattern',
    summary: 'Source CDC → staging → MERGE into Silver with deletes and late updates.',
    nodes: [
      { id: 'oltp', label: 'OLTP', sub: 'CDC feed', x: 50, y: 110 },
      { id: 'stage', label: 'Staging', sub: 'Change rows', x: 230, y: 110 },
      { id: 'merge', label: 'MERGE', sub: 'Delta Silver', x: 410, y: 110 },
      { id: 'audit', label: 'Audit', sub: 'Log · DQ', x: 230, y: 220 },
    ],
    edges: [
      ['oltp', 'stage'],
      ['stage', 'merge'],
      ['stage', 'audit'],
    ],
    accent: '#7c3aed',
  },
  {
    id: 'cicd',
    title: 'CI/CD Promotion',
    summary: 'Git branches promote ADF + Databricks assets across DEV → TEST → PROD.',
    nodes: [
      { id: 'dev', label: 'DEV', sub: 'Feature branch', x: 60, y: 110 },
      { id: 'test', label: 'TEST', sub: 'PR checks', x: 250, y: 110 },
      { id: 'prod', label: 'PROD', sub: 'Release', x: 440, y: 110 },
      { id: 'git', label: 'GitHub', sub: 'PR · Actions', x: 250, y: 220 },
    ],
    edges: [
      ['dev', 'test'],
      ['test', 'prod'],
      ['git', 'test'],
    ],
    accent: '#ca8a04',
  },
]

function nodeById(diagram, id) {
  return diagram.nodes.find((n) => n.id === id)
}

/** Build simple Excalidraw rectangle/arrow skeletons for a curated diagram. */
export function diagramToExcalidrawSkeleton(diagram) {
  const elements = []
  const idMap = {}

  diagram.nodes.forEach((n, i) => {
    const id = `n-${diagram.id}-${i}`
    idMap[n.id] = id
    elements.push({
      type: 'rectangle',
      id,
      x: n.x,
      y: n.y,
      width: 140,
      height: 64,
      strokeColor: diagram.accent,
      backgroundColor: '#ffffff',
      fillStyle: 'solid',
      roundness: { type: 3 },
      label: {
        text: `${n.label}\n${n.sub}`,
        fontSize: 16,
        textAlign: 'center',
        verticalAlign: 'middle',
      },
    })
  })

  diagram.edges.forEach(([from, to], i) => {
    const a = nodeById(diagram, from)
    const b = nodeById(diagram, to)
    if (!a || !b) return
    elements.push({
      type: 'arrow',
      id: `e-${diagram.id}-${i}`,
      x: a.x + 140,
      y: a.y + 32,
      width: b.x - (a.x + 140),
      height: b.y - a.y,
      strokeColor: diagram.accent,
      start: { id: idMap[from] },
      end: { id: idMap[to] },
    })
  })

  return elements
}
