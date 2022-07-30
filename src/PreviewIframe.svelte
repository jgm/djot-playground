<!-- from https://github.com/showdownspace/codeinthewind-live/blob/main/src/PreviewIframe.svelte -->
<script lang="ts">
  import PreviewIframeContent from './PreviewIframeContent'
  export let html: string
  let iframe: HTMLIFrameElement
  const srcdoc = PreviewIframeContent
  function onload() {
    inject(html)
  }
  function inject(html: string) {
    const doc = iframe?.contentDocument
    if (doc) {
      const body = doc.querySelector('#htmlbody')
      if (body) body.innerHTML = html
      document.getElementById('preview').contentWindow.MathJax.typeset();
    }
  }
  $: inject(html)
</script>

<iframe
  id="preview"
  bind:this={iframe}
  on:load={onload}
  sandbox="allow-same-origin allow-scripts"
  {srcdoc}
  class="absolute top-0 left-0 w-full h-full bg-white"
  title="Preview"
/>
