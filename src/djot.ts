import { LuaFactory } from 'wasmoon'
import glue from 'wasmoon/dist/glue.wasm?url'

export async function createDjotConverter(
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
    'djot/match.lua',
    'djot/json.lua',
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
      function convert(input, format, sourcepos)
        local parser = djot.Parser:new(input, {sourcepos = sourcepos})
        parser:parse()
        if format == "html" then
          local html = parser:render_html()
          return html
        elseif format == "ast" then
          local ast = parser:render_ast()
          return ast
        elseif format == "jsonast" then
          local jsonast = parser:render_ast(nil, true)
          return jsonast
        elseif format == "matches" then
          local matches = parser:render_matches(nil)
          return matches
        elseif format == "jsonmatches" then
          local matches = parser:render_matches(nil, true)
          return matches
        end
      end
    `)

  const convert = engine.global.get('convert')
  return convert
}
