(() => {
  if (window.__hugoModMermaidInit) return;
  window.__hugoModMermaidInit = true;

  // Shortcodes pass source through base64 so Hugo does not mangle diagram text.
  const decodeBase64Utf8 = (value) => {
    const binary = window.atob(value || "");
    if (typeof TextDecoder !== "undefined") {
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder("utf-8").decode(bytes);
    }

    let escaped = "";
    for (let index = 0; index < binary.length; index += 1) {
      escaped += `%${binary.charCodeAt(index).toString(16).padStart(2, "0")}`;
    }
    return decodeURIComponent(escaped);
  };

  const ensureReady = async () => {
    if (window.__hugoModMermaidReadyPromise) return window.__hugoModMermaidReadyPromise;

    window.__hugoModMermaidReadyPromise = (async () => {
      // The icon pack URL is injected on the shortcode wrapper to avoid inline config JS.
      const iconsUrl = document.querySelector("[data-hugo-mod-mermaid]")?.dataset.iconsUrl;

      if (window.zenuml && window.mermaid.registerExternalDiagrams) {
        await window.mermaid.registerExternalDiagrams([window.zenuml]);
      }

      if (window.mermaid.registerIconPacks && iconsUrl) {
        window.mermaid.registerIconPacks([
          {
            name: "logos",
            loader: () => fetch(iconsUrl).then((response) => response.json())
          }
        ]);
      }

      window.mermaid.initialize({
        securityLevel: "loose",
        startOnLoad: false,
        flowchart: {
          htmlLabels: true,
          useMaxWidth: true
        },
        sequence: {
          useMaxWidth: true,
          showSequenceNumbers: true
        }
      });
    })();

    return window.__hugoModMermaidReadyPromise;
  };

  const renderElement = async (element, index) => {
    if (element.dataset.rendered === "true" || !window.mermaid) return;

    const output = element.querySelector("[data-mermaid-output]");
    if (!output) return;

    try {
      const source = decodeBase64Utf8(element.dataset.source || "").trim();
      if (!source) {
        throw new Error("Mermaid source is empty");
      }

      await ensureReady();
      // Mermaid requires a unique id per render call.
      const id = `hugo-mod-mermaid-${index}-${Date.now()}`;
      const rendered = await window.mermaid.render(id, source);
      output.innerHTML = rendered.svg;
      output.classList.remove("is-error");
      element.dataset.rendered = "true";
    } catch (error) {
      output.textContent = error.message;
      output.classList.add("is-error");
    }
  };

  const renderAll = (root = document) => {
    root.querySelectorAll("[data-hugo-mod-mermaid]").forEach((element, index) => {
      renderElement(element, index);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderAll(), { once: true });
  } else {
    renderAll();
  }

  window.HugoModMermaid = { renderAll };
})();
