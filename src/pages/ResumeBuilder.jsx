import { useEffect, useMemo, useState } from 'react'
import ResumePreview from '../components/ResumePreview.jsx'
import { defaultResume, deSkillSuggestions, loadResume, saveResume, uid } from '../data/resumeDefaults.js'
import { resumeTemplates } from '../data/resumeTemplates.js'

function Field({ label, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-600 dark:text-slate-300">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-azure-500 dark:border-white/10 dark:bg-white/5'

export default function ResumeBuilder() {
  const [data, setData] = useState(() => loadResume())
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    saveResume(data)
    setSavedAt(new Date())
  }, [data])

  const skillsText = useMemo(() => data.skills.join(', '), [data.skills])
  const selectedTemplate = resumeTemplates.find((t) => t.id === data.templateId) || resumeTemplates[0]

  const setBasics = (key, value) =>
    setData((d) => ({ ...d, basics: { ...d.basics, [key]: value } }))

  const updateListItem = (section, id, patch) =>
    setData((d) => ({
      ...d,
      [section]: d[section].map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }))

  const removeListItem = (section, id) =>
    setData((d) => ({ ...d, [section]: d[section].filter((item) => item.id !== id) }))

  const addExperience = () =>
    setData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        {
          id: uid('exp'),
          role: 'Azure Data Engineer',
          company: 'Company',
          period: 'Year — Present',
          location: 'India',
          bullets: ['Describe an ADF / Databricks outcome with tools and impact.'],
        },
      ],
    }))

  const addProject = () =>
    setData((d) => ({
      ...d,
      projects: [
        ...d.projects,
        {
          id: uid('proj'),
          name: 'Lakehouse Project',
          stack: 'ADF · Databricks · Delta · SQL',
          period: '2025',
          bullets: ['Summarize Bronze → Silver → Gold work and business outcome.'],
        },
      ],
    }))

  const addEducation = () =>
    setData((d) => ({
      ...d,
      education: [
        ...d.education,
        { id: uid('edu'), school: 'Institution', degree: 'Degree', period: 'Year', details: '' },
      ],
    }))

  const addCertification = () =>
    setData((d) => ({
      ...d,
      certifications: [
        ...d.certifications,
        { id: uid('cert'), name: 'Certification', issuer: 'Issuer', period: 'Year' },
      ],
    }))

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(data.basics.fullName || 'resume').replace(/\s+/g, '-').toLowerCase()}-az-learning.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadPdf = () => window.print()

  const resetTemplate = () => {
    if (window.confirm('Reset content to the Azure Data Engineer starter, keeping your selected layout?')) {
      setData((d) => ({ ...structuredClone(defaultResume), templateId: d.templateId || 'azure' }))
    }
  }

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Module 16 · Resume Builder
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Pick a template. Add your details.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Choose a unique layout made for Azure Data Engineering resumes, then fill in your experience,
            projects, and skills. Preview updates live and downloads as PDF.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={downloadPdf} className="btn-primary">
            Download PDF
          </button>
          <button type="button" onClick={downloadJson} className="btn-ghost">
            Export JSON
          </button>
          <button type="button" onClick={resetTemplate} className="btn-ghost">
            Reset content
          </button>
        </div>
      </div>
      {savedAt && (
        <p className="mt-3 text-xs text-slate-400">
          Auto-saved locally · {selectedTemplate.name} · {savedAt.toLocaleTimeString()}
        </p>
      )}

      <section className="card mt-6 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold">Choose a template</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Select a look first, then edit your details below.
            </p>
          </div>
          <p className="text-xs font-semibold text-azure-600 dark:text-azure-400">
            Active: {selectedTemplate.name}
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {resumeTemplates.map((template) => {
            const active = data.templateId === template.id
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => setData((d) => ({ ...d, templateId: template.id }))}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? 'border-azure-500 bg-azure-500/5 shadow-sm ring-2 ring-azure-500/30'
                    : 'border-slate-200 hover:border-azure-400 dark:border-white/10'
                }`}
              >
                <div className="flex h-14 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
                  {template.swatch.map((color) => (
                    <span key={color} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <p className="mt-3 font-display font-semibold">{template.name}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{template.tagline}</p>
              </button>
            )
          })}
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="space-y-4">
          <section className="card p-5">
            <h2 className="font-display text-lg font-semibold">Basics</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Full name">
                <input className={inputClass} value={data.basics.fullName} onChange={(e) => setBasics('fullName', e.target.value)} />
              </Field>
              <Field label="Target title">
                <input className={inputClass} value={data.basics.title} onChange={(e) => setBasics('title', e.target.value)} />
              </Field>
              <Field label="Email">
                <input className={inputClass} value={data.basics.email} onChange={(e) => setBasics('email', e.target.value)} />
              </Field>
              <Field label="Phone">
                <input className={inputClass} value={data.basics.phone} onChange={(e) => setBasics('phone', e.target.value)} />
              </Field>
              <Field label="Location">
                <input className={inputClass} value={data.basics.location} onChange={(e) => setBasics('location', e.target.value)} />
              </Field>
              <Field label="LinkedIn">
                <input className={inputClass} value={data.basics.linkedin} onChange={(e) => setBasics('linkedin', e.target.value)} />
              </Field>
              <Field label="GitHub">
                <input className={inputClass} value={data.basics.github} onChange={(e) => setBasics('github', e.target.value)} />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Professional summary">
                <textarea
                  rows={4}
                  className={inputClass}
                  value={data.basics.summary}
                  onChange={(e) => setBasics('summary', e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-lg font-semibold">Skills</h2>
            <p className="mt-1 text-xs text-slate-500">Comma-separated. Click a suggestion to add it.</p>
            <textarea
              rows={3}
              className={`${inputClass} mt-3`}
              value={skillsText}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  skills: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {deSkillSuggestions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-xs dark:border-white/10"
                  onClick={() =>
                    setData((d) =>
                      d.skills.includes(skill) ? d : { ...d, skills: [...d.skills, skill] },
                    )
                  }
                >
                  + {skill}
                </button>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">Experience</h2>
              <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={addExperience}>
                Add role
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {data.experience.map((job) => (
                <div key={job.id} className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Role">
                      <input className={inputClass} value={job.role} onChange={(e) => updateListItem('experience', job.id, { role: e.target.value })} />
                    </Field>
                    <Field label="Company">
                      <input className={inputClass} value={job.company} onChange={(e) => updateListItem('experience', job.id, { company: e.target.value })} />
                    </Field>
                    <Field label="Period">
                      <input className={inputClass} value={job.period} onChange={(e) => updateListItem('experience', job.id, { period: e.target.value })} />
                    </Field>
                    <Field label="Location">
                      <input className={inputClass} value={job.location} onChange={(e) => updateListItem('experience', job.id, { location: e.target.value })} />
                    </Field>
                  </div>
                  <Field label="Bullets (one per line)">
                    <textarea
                      rows={4}
                      className={`${inputClass} mt-3`}
                      value={(job.bullets || []).join('\n')}
                      onChange={(e) =>
                        updateListItem('experience', job.id, {
                          bullets: e.target.value.split('\n'),
                        })
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    className="mt-2 text-xs font-semibold text-red-500"
                    onClick={() => removeListItem('experience', job.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">Projects</h2>
              <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={addProject}>
                Add project
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {data.projects.map((p) => (
                <div key={p.id} className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Name">
                      <input className={inputClass} value={p.name} onChange={(e) => updateListItem('projects', p.id, { name: e.target.value })} />
                    </Field>
                    <Field label="Period">
                      <input className={inputClass} value={p.period} onChange={(e) => updateListItem('projects', p.id, { period: e.target.value })} />
                    </Field>
                    <Field label="Stack">
                      <input className={inputClass} value={p.stack} onChange={(e) => updateListItem('projects', p.id, { stack: e.target.value })} />
                    </Field>
                  </div>
                  <Field label="Bullets (one per line)">
                    <textarea
                      rows={3}
                      className={`${inputClass} mt-3`}
                      value={(p.bullets || []).join('\n')}
                      onChange={(e) => updateListItem('projects', p.id, { bullets: e.target.value.split('\n') })}
                    />
                  </Field>
                  <button type="button" className="mt-2 text-xs font-semibold text-red-500" onClick={() => removeListItem('projects', p.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">Education</h2>
              <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={addEducation}>
                Add
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {data.education.map((e) => (
                <div key={e.id} className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-2 dark:border-white/10">
                  <Field label="School">
                    <input className={inputClass} value={e.school} onChange={(ev) => updateListItem('education', e.id, { school: ev.target.value })} />
                  </Field>
                  <Field label="Degree">
                    <input className={inputClass} value={e.degree} onChange={(ev) => updateListItem('education', e.id, { degree: ev.target.value })} />
                  </Field>
                  <Field label="Period">
                    <input className={inputClass} value={e.period} onChange={(ev) => updateListItem('education', e.id, { period: ev.target.value })} />
                  </Field>
                  <Field label="Details">
                    <input className={inputClass} value={e.details} onChange={(ev) => updateListItem('education', e.id, { details: ev.target.value })} />
                  </Field>
                  <button type="button" className="text-left text-xs font-semibold text-red-500" onClick={() => removeListItem('education', e.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">Certifications</h2>
              <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={addCertification}>
                Add
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {data.certifications.map((c) => (
                <div key={c.id} className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-3 dark:border-white/10">
                  <Field label="Name">
                    <input className={inputClass} value={c.name} onChange={(e) => updateListItem('certifications', c.id, { name: e.target.value })} />
                  </Field>
                  <Field label="Issuer">
                    <input className={inputClass} value={c.issuer} onChange={(e) => updateListItem('certifications', c.id, { issuer: e.target.value })} />
                  </Field>
                  <Field label="Period">
                    <input className={inputClass} value={c.period} onChange={(e) => updateListItem('certifications', c.id, { period: e.target.value })} />
                  </Field>
                  <button type="button" className="text-left text-xs font-semibold text-red-500" onClick={() => removeListItem('certifications', c.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Live preview · {selectedTemplate.name}</p>
            <p className="text-xs text-slate-500">Download PDF → Save as PDF</p>
          </div>
          <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-100 p-3 dark:border-white/10 dark:bg-ink-900">
            <ResumePreview data={data} templateId={data.templateId} />
          </div>
        </div>
      </div>
    </div>
  )
}
