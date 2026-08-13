function contactLine(basics) {
  return [basics.email, basics.phone, basics.location, basics.linkedin, basics.github].filter(Boolean)
}

function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`mb-2 text-xs font-bold uppercase tracking-[0.16em] ${className}`}>{children}</h2>
  )
}

function Bullets({ items, className = 'mt-1 list-disc space-y-1 pl-5' }) {
  return (
    <ul className={className}>
      {(items || []).filter(Boolean).map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  )
}

function ExperienceBlocks({ experience, accentClass = 'text-slate-700', periodClass = 'text-xs text-slate-500' }) {
  return (
    <div className="space-y-4">
      {experience.map((job) => (
        <div key={job.id}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold">
              {job.role} · <span className={`font-medium ${accentClass}`}>{job.company}</span>
            </p>
            <p className={periodClass}>
              {job.period}
              {job.location ? ` · ${job.location}` : ''}
            </p>
          </div>
          <Bullets items={job.bullets} />
        </div>
      ))}
    </div>
  )
}

function ProjectBlocks({ projects, stackClass = 'text-xs font-medium text-[#0078D4]' }) {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <div key={p.id}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold">{p.name}</p>
            <p className="text-xs text-slate-500">{p.period}</p>
          </div>
          {p.stack && <p className={stackClass}>{p.stack}</p>}
          <Bullets items={p.bullets} />
        </div>
      ))}
    </div>
  )
}

function EducationBlocks({ education }) {
  return (
    <div className="space-y-3">
      {education.map((e) => (
        <div key={e.id} className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="font-semibold">{e.school}</p>
            <p className="text-slate-600">
              {e.degree}
              {e.details ? ` — ${e.details}` : ''}
            </p>
          </div>
          <p className="text-xs text-slate-500">{e.period}</p>
        </div>
      ))}
    </div>
  )
}

function CertBlocks({ certifications }) {
  return (
    <div className="space-y-2">
      {certifications.map((c) => (
        <div key={c.id} className="flex flex-wrap items-baseline justify-between gap-2">
          <p>
            <span className="font-semibold">{c.name}</span>
            {c.issuer ? ` · ${c.issuer}` : ''}
          </p>
          <p className="text-xs text-slate-500">{c.period}</p>
        </div>
      ))}
    </div>
  )
}

function AzureClassic({ data }) {
  return (
    <>
      <header className="border-b-4 border-[#0078D4] px-8 pb-5 pt-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">{data.basics.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-lg font-semibold text-[#0078D4]">{data.basics.title}</p>
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
          {contactLine(data.basics).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
      </header>
      <div className="space-y-5 px-8 py-6 text-sm leading-relaxed">
        {data.basics.summary && (
          <section>
            <SectionTitle className="border-b border-slate-200 pb-1 text-slate-500">Professional Summary</SectionTitle>
            <p>{data.basics.summary}</p>
          </section>
        )}
        {data.skills?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-slate-200 pb-1 text-slate-500">Technical Skills</SectionTitle>
            <p>{data.skills.filter(Boolean).join(' · ')}</p>
          </section>
        )}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-slate-200 pb-1 text-slate-500">Experience</SectionTitle>
            <ExperienceBlocks experience={data.experience} />
          </section>
        )}
        {data.projects?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-slate-200 pb-1 text-slate-500">Projects</SectionTitle>
            <ProjectBlocks projects={data.projects} />
          </section>
        )}
        {data.education?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-slate-200 pb-1 text-slate-500">Education</SectionTitle>
            <EducationBlocks education={data.education} />
          </section>
        )}
        {data.certifications?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-slate-200 pb-1 text-slate-500">Certifications</SectionTitle>
            <CertBlocks certifications={data.certifications} />
          </section>
        )}
      </div>
    </>
  )
}

function LakehouseSplit({ data }) {
  return (
    <div className="grid min-h-[1120px] grid-cols-[240px_1fr]">
      <aside className="bg-[#134e4a] px-5 py-8 text-white">
        <h1 className="font-display text-2xl font-bold leading-tight">{data.basics.fullName || 'Your Name'}</h1>
        <p className="mt-2 text-sm font-semibold text-teal-100">{data.basics.title}</p>
        <div className="mt-6 space-y-2 text-[11px] leading-relaxed text-teal-50/90">
          {contactLine(data.basics).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        {data.skills?.length > 0 && (
          <div className="mt-8">
            <SectionTitle className="text-teal-200">Skills</SectionTitle>
            <div className="mt-3 flex flex-col gap-1.5">
              {data.skills.filter(Boolean).map((skill) => (
                <span key={skill} className="rounded-md bg-white/10 px-2 py-1 text-[11px]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.certifications?.length > 0 && (
          <div className="mt-8">
            <SectionTitle className="text-teal-200">Certifications</SectionTitle>
            <div className="mt-3 space-y-3 text-[11px]">
              {data.certifications.map((c) => (
                <div key={c.id}>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-teal-100/80">
                    {c.issuer}
                    {c.period ? ` · ${c.period}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
      <div className="space-y-5 px-7 py-8 text-sm leading-relaxed text-slate-800">
        {data.basics.summary && (
          <section>
            <SectionTitle className="border-b border-teal-200 pb-1 text-teal-700">Summary</SectionTitle>
            <p>{data.basics.summary}</p>
          </section>
        )}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-teal-200 pb-1 text-teal-700">Experience</SectionTitle>
            <ExperienceBlocks experience={data.experience} accentClass="text-teal-800" />
          </section>
        )}
        {data.projects?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-teal-200 pb-1 text-teal-700">Projects</SectionTitle>
            <ProjectBlocks projects={data.projects} stackClass="text-xs font-medium text-teal-700" />
          </section>
        )}
        {data.education?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-teal-200 pb-1 text-teal-700">Education</SectionTitle>
            <EducationBlocks education={data.education} />
          </section>
        )}
      </div>
    </div>
  )
}

function DatabricksEmber({ data }) {
  return (
    <>
      <header className="bg-[#111827] px-8 py-7 text-white">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF3621]">Data Engineering</p>
            <h1 className="mt-2 font-display text-3xl font-bold">{data.basics.fullName || 'Your Name'}</h1>
            <p className="mt-1 text-lg text-slate-200">{data.basics.title}</p>
          </div>
          <div className="max-w-xs text-right text-[11px] leading-relaxed text-slate-300">
            {contactLine(data.basics).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </header>
      <div className="space-y-5 px-8 py-6 text-sm leading-relaxed">
        {data.basics.summary && (
          <section className="rounded-xl border border-red-100 bg-red-50/40 p-4">
            <SectionTitle className="text-[#FF3621]">Profile</SectionTitle>
            <p>{data.basics.summary}</p>
          </section>
        )}
        {data.skills?.length > 0 && (
          <section>
            <SectionTitle className="text-[#FF3621]">Stack</SectionTitle>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.filter(Boolean).map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-slate-200 pb-1 text-[#FF3621]">Experience</SectionTitle>
            <ExperienceBlocks experience={data.experience} accentClass="text-[#b91c1c]" />
          </section>
        )}
        {data.projects?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-slate-200 pb-1 text-[#FF3621]">Projects</SectionTitle>
            <ProjectBlocks projects={data.projects} stackClass="text-xs font-medium text-[#FF3621]" />
          </section>
        )}
        {(data.education?.length > 0 || data.certifications?.length > 0) && (
          <div className="grid gap-5 sm:grid-cols-2">
            {data.education?.length > 0 && (
              <section>
                <SectionTitle className="border-b border-slate-200 pb-1 text-[#FF3621]">Education</SectionTitle>
                <EducationBlocks education={data.education} />
              </section>
            )}
            {data.certifications?.length > 0 && (
              <section>
                <SectionTitle className="border-b border-slate-200 pb-1 text-[#FF3621]">Certifications</SectionTitle>
                <CertBlocks certifications={data.certifications} />
              </section>
            )}
          </div>
        )}
      </div>
    </>
  )
}

function AtsAtlas({ data }) {
  return (
    <div className="px-8 py-8 text-sm leading-relaxed text-slate-800">
      <header className="border-b border-slate-300 pb-4 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{data.basics.fullName || 'Your Name'}</h1>
        <p className="mt-1 font-semibold">{data.basics.title}</p>
        <p className="mt-2 text-xs text-slate-600">{contactLine(data.basics).join(' | ')}</p>
      </header>
      <div className="mt-5 space-y-4">
        {data.basics.summary && (
          <section>
            <SectionTitle className="text-slate-700">Summary</SectionTitle>
            <p>{data.basics.summary}</p>
          </section>
        )}
        {data.skills?.length > 0 && (
          <section>
            <SectionTitle className="text-slate-700">Skills</SectionTitle>
            <p>{data.skills.filter(Boolean).join(', ')}</p>
          </section>
        )}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle className="text-slate-700">Experience</SectionTitle>
            <ExperienceBlocks experience={data.experience} accentClass="text-slate-800" />
          </section>
        )}
        {data.projects?.length > 0 && (
          <section>
            <SectionTitle className="text-slate-700">Projects</SectionTitle>
            <ProjectBlocks projects={data.projects} stackClass="text-xs font-medium text-slate-700" />
          </section>
        )}
        {data.education?.length > 0 && (
          <section>
            <SectionTitle className="text-slate-700">Education</SectionTitle>
            <EducationBlocks education={data.education} />
          </section>
        )}
        {data.certifications?.length > 0 && (
          <section>
            <SectionTitle className="text-slate-700">Certifications</SectionTitle>
            <CertBlocks certifications={data.certifications} />
          </section>
        )}
      </div>
    </div>
  )
}

function PipelineTimeline({ data }) {
  return (
    <>
      <header className="px-8 pb-4 pt-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5 text-white">
          <h1 className="font-display text-3xl font-bold">{data.basics.fullName || 'Your Name'}</h1>
          <p className="mt-1 text-lg font-medium text-blue-50">{data.basics.title}</p>
          <p className="mt-3 text-xs text-blue-50/90">{contactLine(data.basics).join('  ·  ')}</p>
        </div>
      </header>
      <div className="space-y-5 px-8 pb-8 text-sm leading-relaxed">
        {data.basics.summary && (
          <section>
            <SectionTitle className="text-blue-700">Summary</SectionTitle>
            <p>{data.basics.summary}</p>
          </section>
        )}
        {data.skills?.length > 0 && (
          <section>
            <SectionTitle className="text-blue-700">Pipeline Skills</SectionTitle>
            <p className="rounded-xl bg-blue-50 px-3 py-2 text-slate-700">{data.skills.filter(Boolean).join(' → ')}</p>
          </section>
        )}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle className="text-blue-700">Experience Flow</SectionTitle>
            <div className="relative ml-2 space-y-4 border-l-2 border-blue-200 pl-5">
              {data.experience.map((job) => (
                <div key={job.id} className="relative">
                  <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-600" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold">
                      {job.role} · {job.company}
                    </p>
                    <p className="text-xs text-slate-500">{job.period}</p>
                  </div>
                  <Bullets items={job.bullets} />
                </div>
              ))}
            </div>
          </section>
        )}
        {data.projects?.length > 0 && (
          <section>
            <SectionTitle className="text-blue-700">Projects</SectionTitle>
            <ProjectBlocks projects={data.projects} stackClass="text-xs font-medium text-blue-700" />
          </section>
        )}
        {(data.education?.length > 0 || data.certifications?.length > 0) && (
          <div className="grid gap-5 sm:grid-cols-2">
            {data.education?.length > 0 && (
              <section>
                <SectionTitle className="text-blue-700">Education</SectionTitle>
                <EducationBlocks education={data.education} />
              </section>
            )}
            {data.certifications?.length > 0 && (
              <section>
                <SectionTitle className="text-blue-700">Certifications</SectionTitle>
                <CertBlocks certifications={data.certifications} />
              </section>
            )}
          </div>
        )}
      </div>
    </>
  )
}

function GoldLayer({ data }) {
  return (
    <>
      <header className="bg-[#0b1020] px-8 py-8 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d4a017]">Gold Layer Profile</p>
        <h1 className="mt-2 font-display text-3xl font-bold">{data.basics.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-lg text-slate-200">{data.basics.title}</p>
        <div className="mt-4 h-px w-24 bg-[#d4a017]" />
        <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-300">
          {contactLine(data.basics).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
      </header>
      <div className="space-y-5 px-8 py-6 text-sm leading-relaxed">
        {data.basics.summary && (
          <section>
            <SectionTitle className="text-[#a16207]">Executive Summary</SectionTitle>
            <p>{data.basics.summary}</p>
          </section>
        )}
        {data.skills?.length > 0 && (
          <section>
            <SectionTitle className="text-[#a16207]">Core Competencies</SectionTitle>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
              {data.skills.filter(Boolean).map((skill) => (
                <p key={skill} className="text-sm">
                  • {skill}
                </p>
              ))}
            </div>
          </section>
        )}
        {data.experience?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-amber-200 pb-1 text-[#a16207]">Experience</SectionTitle>
            <ExperienceBlocks experience={data.experience} accentClass="text-amber-900" />
          </section>
        )}
        {data.projects?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-amber-200 pb-1 text-[#a16207]">Projects</SectionTitle>
            <ProjectBlocks projects={data.projects} stackClass="text-xs font-medium text-[#a16207]" />
          </section>
        )}
        {data.education?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-amber-200 pb-1 text-[#a16207]">Education</SectionTitle>
            <EducationBlocks education={data.education} />
          </section>
        )}
        {data.certifications?.length > 0 && (
          <section>
            <SectionTitle className="border-b border-amber-200 pb-1 text-[#a16207]">Certifications</SectionTitle>
            <CertBlocks certifications={data.certifications} />
          </section>
        )}
      </div>
    </>
  )
}

const templates = {
  azure: AzureClassic,
  lakehouse: LakehouseSplit,
  ember: DatabricksEmber,
  atlas: AtsAtlas,
  pipeline: PipelineTimeline,
  nocturne: GoldLayer,
}

export default function ResumePreview({ data, templateId = 'azure' }) {
  const Template = templates[templateId] || AzureClassic
  return (
    <article
      id="resume-print-root"
      className="resume-sheet mx-auto w-full max-w-[794px] overflow-hidden bg-white text-slate-900 shadow-xl"
    >
      <Template data={data} />
    </article>
  )
}
