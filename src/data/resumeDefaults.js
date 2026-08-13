const STORAGE_KEY = 'az-learning-resume-v1'

export const deSkillSuggestions = [
  'Azure Data Factory',
  'Azure Databricks',
  'ADLS Gen2',
  'Delta Lake',
  'PySpark',
  'SQL',
  'Python',
  'Unity Catalog',
  'Medallion Architecture',
  'Azure Key Vault',
  'Managed Identity',
  'RBAC',
  'Git / CI-CD',
  'Power BI',
]

export const defaultResume = {
  templateId: 'azure',
  basics: {
    fullName: 'Your Name',
    title: 'Azure Data Engineer',
    email: 'you@email.com',
    phone: '+91 90000 00000',
    location: 'India',
    linkedin: 'linkedin.com/in/your-profile',
    github: 'github.com/your-handle',
    summary:
      'Azure Data Engineer with hands-on experience building ADF pipelines, ADLS lakehouse layers, and Databricks/Delta transformations. Comfortable with incremental loads, data modeling, and production-ready SQL/PySpark.',
  },
  skills: [
    'Azure Data Factory',
    'Azure Databricks',
    'ADLS Gen2',
    'Delta Lake',
    'PySpark',
    'SQL',
    'Python',
    'Medallion Architecture',
    'Git / CI-CD',
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Data Engineer / Analyst',
      company: 'Company Name',
      period: '2023 — Present',
      location: 'Remote / India',
      bullets: [
        'Built ADF pipelines to ingest SQL and file sources into ADLS Gen2 with watermark-based incremental loads.',
        'Transformed Bronze to Silver/Gold layers in Databricks using PySpark and Delta Lake MERGE patterns.',
        'Modeled star-schema gold tables and partnered with analysts on trusted reporting datasets.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Azure Lakehouse Capstone',
      stack: 'ADF · ADLS · Databricks · Delta · SQL',
      period: '2025',
      bullets: [
        'Designed end-to-end medallion architecture from source systems to Gold facts and dimensions.',
        'Implemented metadata-driven ingestion, SCD Type 2 dimensions, and pipeline monitoring/alerts.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University / College',
      degree: 'B.E. / B.Tech / Equivalent',
      period: '2019 — 2023',
      details: 'Computer Science / Information Technology',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AZ Learning — Azure Data Engineering Master Program',
      issuer: 'AZ Learning',
      period: 'In progress',
    },
  ],
}

export function loadResume() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultResume)
    const parsed = JSON.parse(raw)
    return {
      ...structuredClone(defaultResume),
      ...parsed,
      templateId: parsed.templateId || 'azure',
      basics: { ...defaultResume.basics, ...(parsed.basics || {}) },
    }
  } catch {
    return structuredClone(defaultResume)
  }
}

export function saveResume(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}
