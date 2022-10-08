import { fileURLToPath } from 'url'
import { readdirSync } from 'fs'
import path from 'path'

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const files = readdirSync(_dirname).filter((file) => file.includes('Models'))

export default await files.map(async (file: string) => {
  const service = await import(`./${file}`)
  return service.default
})
