import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import {
  convertToExcalidrawElements,
  Excalidraw,
  exportToBlob,
  exportToSvg,
} from '@excalidraw/excalidraw'
import '@excalidraw/excalidraw/index.css'
import { diagramToExcalidrawSkeleton, lakehouseDiagrams } from '../data/diagrams.js'

const services = [
  ['🔄  Azure Data Factory', '#0078D4', '#e8f4fc'],
  ['💾  ADLS Gen2', '#0078D4', '#e8f4fc'],
  ['🗄️  Azure SQL', '#2563eb', '#dbeafe'],
  ['🔐  Azure Key Vault', '#7c3aed', '#ede9fe'],
  ['🔥  Databricks', '#dc2626', '#fee2e2'],
  ['△  Delta Lake', '#16a34a', '#dcfce7'],
  ['📊  Power BI', '#ca8a04', '#fef9c3'],
  ['◉  Source System', '#475569', '#f1f5f9'],
]

const architectureLibrary = services.map(([name, strokeColor, backgroundColor], index) => ({
  id: `az-learning-${index}`,
  status: 'published',
  created: 1,
  name,
  elements: convertToExcalidrawElements([
    {
      type: 'rectangle',
      x: 0,
      y: 0,
      width: 190,
      height: 76,
      strokeColor,
      backgroundColor,
      fillStyle: 'solid',
      roundness: { type: 3 },
      label: {
        text: name,
        fontSize: 18,
        textAlign: 'center',
        verticalAlign: 'middle',
      },
    },
  ]),
}))

function download(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function ExcalidrawCanvas({ diagramId = null }) {
  const { theme } = useTheme()
  const shellRef = useRef(null)
  const apiRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const initialElements = useMemo(() => {
    if (!diagramId) return undefined
    const diagram = lakehouseDiagrams.find((d) => d.id === diagramId)
    if (!diagram) return undefined
    try {
      return convertToExcalidrawElements(diagramToExcalidrawSkeleton(diagram))
    } catch {
      return undefined
    }
  }, [diagramId])

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === shellRef.current)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const scene = () => ({
    elements: apiRef.current?.getSceneElements() ?? [],
    appState: apiRef.current?.getAppState() ?? {},
    files: apiRef.current?.getFiles() ?? null,
  })

  const exportImage = async (type) => {
    if (!apiRef.current || apiRef.current.getSceneElements().length === 0) return

    if (type === 'svg') {
      const svg = await exportToSvg(scene())
      download(new Blob([svg.outerHTML], { type: 'image/svg+xml' }), 'az-learning-whiteboard.svg')
      return
    }

    const mimeType = type === 'jpg' ? 'image/jpeg' : 'image/png'
    const blob = await exportToBlob({ ...scene(), mimeType, quality: 0.92 })
    download(blob, `az-learning-whiteboard.${type}`)
  }

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await shellRef.current?.requestFullscreen()
    }
  }

  return (
    <div ref={shellRef} className="whiteboard-shell overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-ink-950">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-3 py-2 dark:border-white/10">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Architecture blocks are preloaded in the Library tool.
        </p>
        <div className="flex flex-wrap gap-2">
          {['png', 'jpg', 'svg'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => exportImage(type)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold uppercase hover:border-azure-500 dark:border-white/15"
            >
              Save {type}
            </button>
          ))}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-lg bg-azure-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-azure-600"
          >
            {isFullscreen ? 'Exit full screen' : 'Full screen'}
          </button>
        </div>
      </div>
      <div className="whiteboard-canvas">
        <Excalidraw
          theme={theme === 'dark' ? 'dark' : 'light'}
          name="AZ Learning Whiteboard"
          excalidrawAPI={(api) => {
            apiRef.current = api
          }}
          initialData={{
            libraryItems: architectureLibrary,
            ...(initialElements ? { elements: initialElements, scrollToContent: true } : {}),
          }}
          UIOptions={{
            canvasActions: {
              export: { saveFileToDisk: true },
              saveAsImage: true,
              saveToActiveFile: true,
            },
          }}
        />
      </div>
    </div>
  )
}
