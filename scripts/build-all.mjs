import { cp, mkdir, rm } from 'node:fs/promises'
import { execSync } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const output = path.join(root, 'combined-dist')

await rm(output, { recursive: true, force: true })
await rm(path.join(root, '.build'), { recursive: true, force: true })

execSync('npm run build:learning', { cwd: root, stdio: 'inherit', shell: true })
execSync('npm run build:vedx', { cwd: root, stdio: 'inherit', shell: true })

await mkdir(output, { recursive: true })
await cp(path.join(root, 'vedx', 'out'), output, { recursive: true })
await mkdir(path.join(output, 'azure-learning'), { recursive: true })
await cp(path.join(root, '.build', 'azure-learning'), path.join(output, 'azure-learning'), {
  recursive: true,
})

console.log('\nCombined static output ready in combined-dist/')
