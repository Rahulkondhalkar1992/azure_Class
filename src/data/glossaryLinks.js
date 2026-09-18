/**
 * Connects glossary terms → Interview Hub tabs / scenario conceptIds.
 * Reuses existing scenario + assignment content (no duplicated question banks).
 */
export const glossaryConnections = {
  'SCD Type 2': {
    practical:
      'In gold dimensions you close the old row (end_date / is_current) and insert a new version so history stays queryable.',
    relatedConcepts: ['SCD Type 1', 'Surrogate Key', 'MERGE', 'Watermark'],
    conceptId: 'scd',
    hubLinks: [
      { tab: 'questions', label: 'Interview scenarios (SCD)' },
      { tab: 'adf', label: 'ADF assignment pack' },
      { tab: 'quiz', label: 'Self-assessment quiz' },
    ],
  },
  'SCD Type 1': {
    practical: 'Overwrite the attribute — use when history is not required (e.g. fixing a typo).',
    relatedConcepts: ['SCD Type 2', 'MERGE'],
    conceptId: 'scd',
    hubLinks: [{ tab: 'questions', label: 'Interview scenarios (SCD)' }],
  },
  'Star Schema': {
    practical: 'Facts hold measures + keys; dimensions hold descriptive attributes for slicing.',
    relatedConcepts: ['Fact Table', 'Dimension Table', 'Granularity', 'SCD Type 2'],
    conceptId: 'star-schema',
    hubLinks: [
      { tab: 'questions', label: 'Modeling interview questions' },
      { tab: 'quiz', label: 'Self-assessment quiz' },
    ],
  },
  'Medallion Architecture': {
    practical: 'Bronze lands raw, Silver cleans/conforms, Gold serves business models and KPIs.',
    relatedConcepts: ['Delta Lake', 'Lakehouse', 'Curated Data'],
    conceptId: 'etl-architecture',
    hubLinks: [
      { tab: 'questions', label: 'Architecture scenarios' },
      { tab: 'databricks', label: 'Databricks assignment' },
    ],
  },
  'Delta Lake': {
    practical: 'ACID tables on object storage — MERGE, time travel, OPTIMIZE/VACUUM for production lakes.',
    relatedConcepts: ['MERGE', 'Time Travel', 'OPTIMIZE / Z-ORDER', 'VACUUM'],
    conceptId: 'delta-lake',
    hubLinks: [
      { tab: 'questions', label: 'Databricks interview questions' },
      { tab: 'databricks', label: 'Databricks assignment' },
    ],
  },
  'Unity Catalog': {
    practical: 'Central governance: catalogs, schemas, tables, and grants — say this in every security answer.',
    relatedConcepts: ['External Location', 'RBAC', 'Lakehouse'],
    hubLinks: [
      { tab: 'questions', label: 'Databricks interview questions' },
      { tab: 'quiz', label: 'Self-assessment quiz' },
    ],
  },
  'Watermark': {
    practical: 'Store last successful high-water mark; next run pulls only newer rows for incremental ADF/SQL loads.',
    relatedConcepts: ['CDC', 'Idempotent Pipeline', 'Metadata-driven Pipeline'],
    hubLinks: [
      { tab: 'adf', label: 'ADF assignment pack' },
      { tab: 'questions', label: 'Incremental-load scenarios' },
    ],
  },
  'Metadata-driven Pipeline': {
    practical: 'One generic pipeline + config table of sources — scales better than one pipeline per table.',
    relatedConcepts: ['Parameterization', 'Watermark', 'Azure Data Factory (ADF)'],
    hubLinks: [
      { tab: 'adf', label: 'ADF assignment pack' },
      { tab: 'questions', label: 'ADF interview questions' },
    ],
  },
  'Azure Data Factory (ADF)': {
    practical: 'Orchestrate copy, control flow, and Databricks notebooks — interviewers expect IR, triggers, and parameterization.',
    relatedConcepts: ['Linked Service', 'Integration Runtime (IR)', 'Pipeline'],
    hubLinks: [
      { tab: 'adf', label: 'ADF assignments' },
      { tab: 'questions', label: 'Interview questions' },
      { tab: 'quiz', label: 'Self-assessment' },
    ],
  },
  MERGE: {
    practical: 'Upsert pattern for SCD and incremental gold — match keys, then update/insert/delete branches.',
    relatedConcepts: ['SCD Type 2', 'Delta Lake', 'Watermark'],
    conceptId: 'scd',
    hubLinks: [
      { tab: 'questions', label: 'Related scenarios' },
      { tab: 'databricks', label: 'Databricks assignment' },
    ],
  },
  CTE: {
    practical: 'Name intermediate result sets for readable window/top-N logic — common in SQL interview whiteboards.',
    relatedConcepts: ['Execution Plan', 'Index'],
    conceptId: 'sql-latest-row',
    hubLinks: [
      { tab: 'questions', label: 'SQL scenarios' },
      { tab: 'sql', label: 'SQL assignment' },
      { tab: 'quiz', label: 'Self-assessment' },
    ],
  },
  Shuffle: {
    practical: 'Cross-executor data movement — reduce with broadcast joins, salting, and better partition keys.',
    relatedConcepts: ['Broadcast Join', 'Skew', 'AQE'],
    hubLinks: [
      { tab: 'questions', label: 'Spark performance scenarios' },
      { tab: 'databricks', label: 'Databricks assignment' },
    ],
  },
}

export function getGlossaryConnection(term) {
  return glossaryConnections[term] || null
}
