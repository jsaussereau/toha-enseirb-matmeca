if (process.env.FEATURE_FLOWCHART_MERMAID === '1') {
  import('./mermaid')
}

if (process.env.FEATURE_FLOWCHART_WAVEDROM === '1') {
  import('./wavedrom')
}
