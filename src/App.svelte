<script>
  import { createDjotToHtmlConverter } from './djot'
  import PreviewIframe from './PreviewIframe.svelte'

  let status = 'Initializing Djot...'
  let value = ''
  let preview = false
  const toHtmlPromise = createDjotToHtmlConverter(
    (logText) => (status = logText),
  )
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
      (<a href="syntax.html">syntax reference</a>)
    </h1>
    <div class="relative flex-1">
      <textarea
        class="font-mono absolute inset-0 w-full h-full rounded border border-slate-400 p-4"
        bind:value
      />
    </div>
  </div>
  <div class="w-1/2 flex flex-col gap-2">
    <h1>
      HTML
      <label>
        <input type="checkbox" bind:checked={preview} /> Preview
      </label>
    </h1>
    <div class="relative flex-1">
      {#await toHtmlPromise}
        <div
          class="absolute inset-0 rounded border border-slate-400 overflow-auto bg-slate-200 p-4"
        >
          {status}
        </div>
      {:then toHtml}
        {#if preview}
          <div
            class="absolute inset-0 rounded border border-slate-400 overflow-hidden"
          >
            <PreviewIframe html={toHtml(value)} />
          </div>
        {:else}
          <div
            class="absolute inset-0 rounded border border-slate-400 overflow-auto p-4"
          >
            <pre class="whitespace-pre-wrap">{toHtml(value)}</pre>
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
