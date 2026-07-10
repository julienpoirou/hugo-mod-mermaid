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
      // Config is injected on the shortcode wrapper to avoid inline config JS.
      const wrapper = document.querySelector("[data-hugo-mod-mermaid]");
      const iconsUrl = wrapper?.dataset.iconsUrl;

      // securityLevel defaults to "strict": mermaid sanitizes labels and
      // disables raw HTML, which prevents diagram source from injecting
      // scripts. Only an explicit opt-in on a shortcode can loosen it.
      // mermaid.initialize is page-global, so the first wrapper that sets a
      // valid level wins for the whole page.
      const allowed = ["strict", "loose", "antiscript", "sandbox"];
      const requested = document.querySelector("[data-hugo-mod-mermaid][data-security-level]")?.dataset.securityLevel;
      const securityLevel = allowed.includes(requested) ? requested : "strict";
      const htmlLabels = securityLevel === "loose";

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
        securityLevel,
        startOnLoad: false,
        flowchart: {
          htmlLabels,
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
