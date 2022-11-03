<script>
  import { createDjotConverter } from './djot'
  import PreviewIframe from './PreviewIframe.svelte'

  let status = 'Initializing Djot...'
  let value = `# Try djot

You can try out djot's {=syntax=} with this
live "playground."[^1]

\$\$\` P(E)   = {n \\choose k} p^k (1-p)^{ n-k} \`

1. one :smiley:

 - sub
 - sub

2. two

[^1]: By @dtinth.
`
  let output = "preview"
  const convertPromise = createDjotConverter(
    (logText) => (status = logText),
  )
  const pretty = (s) =>
    JSON.stringify(JSON.parse(s), null, 2)
</script>

<main class="absolute inset-4 flex gap-4">
  <div class="w-1/2 flex flex-col gap-2">
    <h1>
      <a class="font-bold hover:text-sky-700" href="https://github.com/jgm/djot"
        >Djot</a
      >
      <a
        class="hover:text-sky-700"
        href="https://github.com/jgm/djot-playground">Playground</a
      >
      (<a href="https://htmlpreview.github.io/?https://github.com/jgm/djot/blob/master/doc/syntax.html">syntax reference</a>)
    </h1>
    <div class="relative flex-1">
      <textarea
        class="font-mono absolute inset-0 w-full h-full rounded border border-slate-400 p-4"
        bind:value
      />
    </div>
  </div>
  <div class="w-1/2 flex flex-col gap-2">
    <h1 class="flex flex-row flex-wrap gap-5">
      <label>
        <input type="radio" bind:group="{output}" name="output" value="preview" /> Preview
      </label>
      <label>
        <input type="radio" bind:group="{output}" name="output" value="html" /> HTML
      </label>
      <label>
        <input type="radio" bind:group="{output}" name="output" value="ast" /> AST
      </label>
      <label>
        <input type="radio" bind:group="{output}" name="output" value="jsonast" /> JSON AST
      </label>
      <label>
        <input type="radio" bind:group="{output}" name="output" value="matches" /> Matches
      </label>
      <label>
        <input type="radio" bind:group="{output}" name="output" value="jsonmatches" /> JSON Matches
      </label>
    </h1>
    <div class="relative flex-1">
      {#await convertPromise}
        <div
          class="absolute inset-0 rounded border border-slate-400 overflow-auto bg-slate-200 p-4"
        >
          {status}
        </div>
      {:then convert}
        {#if output === "preview"}
          <div
            class="absolute inset-0 rounded border border-slate-400 overflow-hidden"
          >
            <PreviewIframe html={convert(value, "html")} />
          </div>
        {:else if output === "html"}
          <div
            class="absolute inset-0 rounded border border-slate-400 overflow-auto p-4"
          >
            <pre class="whitespace-pre-wrap">{convert(value, "html")}</pre>
          </div>
        {:else if output === "ast"}
          <div
            class="absolute inset-0 rounded border border-slate-400 overflow-auto p-4"
          >
            <pre class="whitespace-pre-wrap">{convert(value, "ast")}</pre>
          </div>
        {:else if output === "jsonast"}
          <div
            class="absolute inset-0 rounded border border-slate-400 overflow-auto p-4"
          >
            <pre class="whitespace-pre-wrap">{pretty(convert(value, "jsonast"))}</pre>
          </div>
        {:else if output === "matches"}
          <div
            class="absolute inset-0 rounded border border-slate-400 overflow-auto p-4"
          >
            <pre class="whitespace-pre-wrap">{convert(value, "matches")}</pre>
          </div>
        {:else if output === "jsonmatches"}
          <div
            class="absolute inset-0 rounded border border-slate-400 overflow-auto p-4"
          >
            <pre class="whitespace-pre-wrap">{pretty(convert(value, "jsonmatches"))}</pre>
          </div>
        {/if}
      {:catch error}
        <div
          class="absolute inset-0 rounded border border-red-400 overflow-auto bg-red-200 p-4"
        >
          Unable to initialize Djot: {String(error)}
        </div>
      {/await}
    </div>
  </div>
</main>
