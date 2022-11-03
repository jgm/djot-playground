import { LuaFactory } from 'wasmoon'
import glue from 'wasmoon/dist/glue.wasm?url'

export async function createDjotToHtmlConverter(
  log = (text: string) => console.log(text),
) {
  log('Creating Lua factory')
  const factory = new LuaFactory(glue)
  const filesToMount = [
    'djot.lua',
    'djot/ast.lua',
    'djot/attributes.lua',
    'djot/block.lua',
    'djot/emoji.lua',
    'djot/html.lua',
    'djot/inline.lua',
    'djot/json.lua',
    'djot/match.lua',
  ]
  const baseUrl = 'https://raw.githubusercontent.com/jgm/djot/main/'
  for (const file of filesToMount) {
    log(`Mounting ${file}`)
    const response = await fetch(baseUrl + file)
    if (!response.ok) {
      throw new Error(`Unable to fetch ${file}: Error ${response.status}`)
    }
    const text = await response.text()
    await factory.mountFile(file, text)
  }

  log('Creating Lua engine')
  const engine = await factory.createEngine()

  log('Loading preamble code')
  await engine.doString(`
    local djot = require("djot")
    function toHtml(input)
      local parser = djot.Parser:new(input)
      parser:parse()
      local html = parser:render_html()
      return html
    end
  `)

  const toHtml = engine.global.get('toHtml')
  return toHtml
}
