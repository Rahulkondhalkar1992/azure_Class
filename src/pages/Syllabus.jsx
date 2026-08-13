import SyllabusAccordion from '../components/SyllabusAccordion.jsx'
import { syllabus } from '../data/syllabus.js'

export default function Syllabus() {
  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Syllabus
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">The full program, one module at a time.</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        Main modules stay visible. Open a module for topics. Nested items (Storage Account, Unity Catalog,
        Copy Activity, and the rest) expand only when you click them.
      </p>
      <div className="mt-8">
        <SyllabusAccordion modules={syllabus} />
      </div>
    </div>
  )
}
