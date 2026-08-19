import { useEffect, useState } from 'react'

const files = ['sales_001.json', 'sales_002.json', 'sales_003.json', 'sales_004.csv']

export default function AutoLoaderStreaming() {
  const [detected, setDetected] = useState(0)
  const [ingested, setIngested] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDetected((d) => {
        const next = (d + 1) % (files.length + 3)
        if (next === 0) setIngested(0)
        else if (next <= files.length) setTimeout(() => setIngested(next), 600)
        return next
      })
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  const features = [
    'Incremental data ingestion',
    'Handles millions of files efficiently',
    'Automatic schema inference & evolution',
    'Built-in data quality and error handling',
    'Exactly-once processing guarantee',
    'Checkpointing for fault tolerance',
  ]

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 8</p>
        <h3 className="font-display text-lg font-semibold">Auto Loader & Structured Streaming</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Auto Loader detects new files in cloud storage and ingests incrementally into Delta.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Cloud Storage */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Cloud Storage (ADLS Gen2)</p>
          <div className="space-y-1.5">
            {files.map((f, i) => {
              const isDetected = i < detected
              const isNew = i === detected - 1
              return (
                <div key={f} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 font-mono text-[11px] transition-all duration-400 ${
                  isNew ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' :
                  isDetected ? 'opacity-50' : 'opacity-100'
                }`}>
                  <span>{isDetected ? '✓' : '📄'}</span>
                  <span className={isNew ? 'font-bold text-azure-600 dark:text-azure-300' : 'text-slate-600 dark:text-slate-300'}>
                    {f}
                  </span>
                  {isNew && <span className="rounded bg-emerald-100 px-1.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">NEW</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Auto Loader flow */}
        <div className="flex flex-col items-center justify-center gap-3">
          <svg viewBox="0 0 140 120" className="h-24 w-32">
            <rect x="10" y="10" width="120" height="45" rx="10" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
            <text x="70" y="30" textAnchor="middle" className="fill-slate-700 text-[10px] font-semibold dark:fill-slate-200">Auto Loader</text>
            <text x="70" y="44" textAnchor="middle" className="fill-slate-400 text-[8px] dark:fill-slate-500">cloudFiles format</text>
            {detected > 0 && detected <= files.length && (
              <circle cx="70" cy="50" r="3" className="fill-azure-500">
                <animate attributeName="r" values="3;5;3" dur="0.6s" repeatCount="indefinite" />
              </circle>
            )}
            <rect x="10" y="70" width="120" height="40" rx="10" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
            <text x="70" y="88" textAnchor="middle" className="fill-emerald-600 text-[10px] font-bold dark:fill-emerald-400">Delta Lake</text>
            <text x="70" y="101" textAnchor="middle" className="fill-slate-400 text-[8px] dark:fill-slate-500">{ingested} files ingested</text>
            <line x1="70" y1="55" x2="70" y2="70" stroke="#0078D4" strokeWidth="1.5" strokeDasharray="3 3">
              {detected > 0 && <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.5s" repeatCount="indefinite" />}
            </line>
          </svg>
          <div className="rounded-lg bg-azure-50 px-3 py-2 text-center text-[10px] text-azure-700 dark:bg-azure-500/10 dark:text-azure-300">
            Schema evolution handled automatically
          </div>
        </div>

        {/* Features */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Key Features</p>
          <div className="space-y-1.5">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="mt-0.5 text-emerald-500">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-white/80 p-2 dark:bg-white/5">
            <pre className="font-mono text-[9px] leading-relaxed text-slate-500 dark:text-slate-400">
{`df = spark.readStream
  .format("cloudFiles")
  .option("cloudFiles.format","json")
  .load("/mnt/data/input/")`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
