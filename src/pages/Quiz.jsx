import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PASS_PERCENT,
  QUESTION_SECONDS,
  experienceTiers,
  getBank,
  quizModules,
} from '../data/quizQuestions.js'

const phases = {
  setup: 'setup',
  running: 'running',
  result: 'result',
}

export default function Quiz() {
  const [phase, setPhase] = useState(phases.setup)
  const [experienceId, setExperienceId] = useState(experienceTiers[0].id)
  const [moduleId, setModuleId] = useState(quizModules[0].id)
  const [index, setIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS)
  const [answers, setAnswers] = useState([]) // { selected, correct, timedOut }
  const [locked, setLocked] = useState(false)

  const tier = experienceTiers.find((t) => t.id === experienceId)
  const mod = quizModules.find((m) => m.id === moduleId)
  const bank = useMemo(() => getBank(moduleId, experienceId), [moduleId, experienceId])
  const current = bank[index]

  const correctCount = answers.filter((a) => a?.correct).length
  const wrongCount = answers.filter((a) => a && !a.correct).length
  const scorePercent = bank.length ? Math.round((correctCount / bank.length) * 100) : 0
  const passed = scorePercent >= PASS_PERCENT

  const topInterview = useMemo(() => {
    if (phase !== phases.result) return []
    return bank
      .map((q, i) => ({ q, result: answers[i] }))
      .filter((row) => !row.result?.correct)
      .map((row) => ({
        question: row.q.q,
        tip: row.q.interviewTip,
        explanation: row.q.explanation,
      }))
      .concat(
        bank
          .filter((_, i) => answers[i]?.correct)
          .slice(0, 3)
          .map((q) => ({ question: q.q, tip: q.interviewTip, explanation: q.explanation })),
      )
      .slice(0, 8)
  }, [phase, bank, answers])

  useEffect(() => {
    if (phase !== phases.running || locked) return undefined
    if (secondsLeft <= 0) {
      commitAnswer(null, true)
      return undefined
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsLeft, locked, index])

  const startQuiz = () => {
    setAnswers([])
    setIndex(0)
    setSecondsLeft(QUESTION_SECONDS)
    setLocked(false)
    setPhase(phases.running)
  }

  const commitAnswer = (selected, timedOut = false) => {
    if (locked || !current) return
    setLocked(true)
    const correct = !timedOut && selected === current.answer
    const nextAnswers = [...answers]
    nextAnswers[index] = { selected, correct, timedOut }
    setAnswers(nextAnswers)

    setTimeout(() => {
      if (index >= bank.length - 1) {
        setPhase(phases.result)
        setLocked(false)
      } else {
        setIndex((i) => i + 1)
        setSecondsLeft(QUESTION_SECONDS)
        setLocked(false)
      }
    }, 450)
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Tools · Self-assessment
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Timed module quiz</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        Pick your experience band first — question difficulty changes. Each module has 10 questions,
        30 seconds each. Pass mark is {PASS_PERCENT}%. Missed items become your top interview drill list.
      </p>

      {phase === phases.setup && (
        <div className="mt-8 space-y-6">
          <section className="card p-5">
            <h2 className="font-display text-lg font-semibold">1. Experience level</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {experienceTiers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setExperienceId(t.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    experienceId === t.id
                      ? 'border-azure-500 bg-azure-500/5 ring-2 ring-azure-500/20'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <p className="font-semibold">{t.label}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-azure-600 dark:text-azure-400">
                    {t.levelLabel}
                  </p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-lg font-semibold">2. Choose module</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quizModules.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModuleId(m.id)}
                  className={`rounded-2xl border p-4 text-left ${
                    moduleId === m.id
                      ? 'border-azure-500 bg-azure-500/5 ring-2 ring-azure-500/20'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <p className="text-xl">{m.emoji}</p>
                  <p className="mt-2 font-semibold">{m.title}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{m.blurb}</p>
                </button>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn-primary" onClick={startQuiz}>
              Start assessment · {tier?.levelLabel}
            </button>
            <p className="text-sm text-slate-500">
              {mod?.title} · 10 questions · {QUESTION_SECONDS}s each · pass {PASS_PERCENT}%
            </p>
          </div>
        </div>
      )}

      {phase === phases.running && current && (
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold">
              {mod?.emoji} {mod?.title} · Q{index + 1}/{bank.length}
            </p>
            <div
              className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                secondsLeft <= 8 ? 'bg-red-500/15 text-red-600' : 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
              }`}
            >
              {secondsLeft}s
            </div>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div
              className="h-full bg-azure-500 transition-all"
              style={{ width: `${((index + 1) / bank.length) * 100}%` }}
            />
          </div>
          <article className="card p-6">
            <h2 className="font-display text-xl font-semibold leading-snug">{current.q}</h2>
            <div className="mt-5 grid gap-3">
              {current.options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  disabled={locked}
                  onClick={() => commitAnswer(i)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium transition hover:border-azure-500 disabled:opacity-60 dark:border-white/10"
                >
                  <span className="mr-2 text-azure-600 dark:text-azure-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </article>
        </div>
      )}

      {phase === phases.result && (
        <div className="mt-8 space-y-6">
          <section className="card p-6">
            <p className={`text-sm font-bold uppercase tracking-wide ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {passed ? 'Passed' : 'Keep practicing'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              Score {scorePercent}% · {correctCount}/{bank.length} correct
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {mod?.title} · {tier?.label} ({tier?.levelLabel}) · Wrong / timed out: {wrongCount}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-emerald-500/10 p-4">
                <p className="text-xs font-semibold text-emerald-700">Right</p>
                <p className="mt-1 font-display text-2xl font-bold">{correctCount}</p>
              </div>
              <div className="rounded-xl bg-red-500/10 p-4">
                <p className="text-xs font-semibold text-red-700">Wrong / timeout</p>
                <p className="mt-1 font-display text-2xl font-bold">{wrongCount}</p>
              </div>
              <div className="rounded-xl bg-azure-500/10 p-4">
                <p className="text-xs font-semibold text-azure-700">Pass mark</p>
                <p className="mt-1 font-display text-2xl font-bold">{PASS_PERCENT}%</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={startQuiz}>
                Retake same set
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setPhase(phases.setup)}
              >
                Change module / level
              </button>
              <Link to="/interview" className="btn-ghost">
                Open interview bank
              </Link>
            </div>
          </section>

          <section className="card p-6">
            <h3 className="font-display text-xl font-semibold">Top interview questions for you</h3>
            <p className="mt-1 text-sm text-slate-500">
              Generated from missed answers first, then high-value tips from this module.
            </p>
            <div className="mt-4 space-y-3">
              {topInterview.map((item, i) => (
                <article key={item.question} className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                  <p className="font-medium">
                    <span className="mr-2 text-azure-600">{i + 1}.</span>
                    {item.question}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-semibold">Answer focus:</span> {item.explanation}
                  </p>
                  <p className="mt-1 text-sm text-azure-700 dark:text-azure-400">
                    <span className="font-semibold">Interview tip:</span> {item.tip}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
