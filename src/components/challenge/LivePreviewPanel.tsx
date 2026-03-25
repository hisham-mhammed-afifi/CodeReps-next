"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw, Code, Eye } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useChallengeStore } from "@/stores/challengeStore";

interface LivePreviewPanelProps {
  starterHTML: string;
  starterCSS?: string;
  /** Whether this is challenge 1 of Track 2 (shows first-time tooltip) */
  isFirstChallenge?: boolean;
}

function buildPreviewSrcdoc(html: string, css?: string): string {
  const cssBlock = css ? `<style>${css}</style>` : "";
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body {
    margin: 0;
    padding: 16px;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #0F172A;
    background: #FAFAFA;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
</style>
${cssBlock}
</head>
<body>
${html}
</body>
</html>`;
}

export function LivePreviewPanel({
  starterHTML,
  starterCSS,
  isFirstChallenge = false,
}: LivePreviewPanelProps) {
  const previewHTML = useChallengeStore((s) => s.previewHTML);
  const previewError = useChallengeStore((s) => s.previewError);
  const resetPreview = useChallengeStore((s) => s.resetPreview);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showTooltip, setShowTooltip] = useState(isFirstChallenge);
  const [sourceKey, setSourceKey] = useState(starterHTML);
  const [showSource, setShowSource] = useState(false);

  // Reset to rendered preview when challenge changes
  if (sourceKey !== starterHTML) {
    setSourceKey(starterHTML);
    setShowSource(false);
  }

  // The HTML to render: either the post-execution result or the starter
  const displayHTML = previewHTML ?? starterHTML;

  // Update iframe content when displayHTML changes
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildPreviewSrcdoc(displayHTML, starterCSS);
    }
  }, [displayHTML, starterCSS]);

  const handleRefresh = useCallback(() => {
    resetPreview();
  }, [resetPreview]);

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false);
  }, []);

  const handleToggleSource = useCallback(() => {
    setShowSource((prev) => {
      const newView = !prev;
      // Analytics event: preview_html_toggled
      if (typeof window !== "undefined") {
        console.debug("[analytics] preview_html_toggled", {
          new_view: newView ? "source" : "preview",
        });
      }
      return newView;
    });
  }, []);

  return (
    <div
      className="flex flex-col border-t border-brand-slate-400/30 min-h-[150px] lg:min-h-[200px]"
      role="region"
      aria-label="Live preview of your code output"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#FAFAFA] border-b border-brand-slate-400/20">
        <span className="text-sm font-semibold text-brand-slate-600">
          Preview
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleSource}
            className={`gap-1.5 h-7 px-2 ${showSource ? "text-brand-indigo hover:text-brand-indigo/80" : "text-brand-slate-400 hover:text-brand-slate-600"}`}
            aria-pressed={showSource}
            aria-label={showSource ? "Switch to rendered preview" : "View HTML source"}
          >
            {showSource ? <Eye className="h-3.5 w-3.5" /> : <Code className="h-3.5 w-3.5" />}
            {showSource ? "View Preview" : "View HTML"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="text-brand-slate-400 hover:text-brand-slate-600 gap-1.5 h-7 px-2"
            aria-label="Refresh preview to starter HTML"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Screen reader announcement for toggle */}
      <div aria-live="polite" className="sr-only">
        {showSource ? "Showing HTML source" : "Showing rendered preview"}
      </div>

      {/* First-time tooltip for Challenge 1 */}
      {showTooltip && (
        <div className="mx-4 mt-2 mb-1 flex items-center gap-2 rounded-lg bg-brand-indigo/10 px-3 py-2 text-xs text-brand-indigo">
          <span>This is the page you&apos;ll modify with JavaScript.</span>
          <button
            onClick={dismissTooltip}
            className="ml-auto shrink-0 text-brand-indigo/60 hover:text-brand-indigo transition-colors"
            aria-label="Dismiss tooltip"
          >
            &times;
          </button>
        </div>
      )}

      {/* Preview error indicator */}
      {previewError && (
        <div className="mx-4 mt-2 mb-1 rounded-lg bg-brand-rose/10 px-3 py-1.5 text-xs text-brand-rose">
          Preview reverted to starter HTML due to an error in your code.
        </div>
      )}

      {/* Content: either rendered preview or HTML source */}
      {showSource ? (
        <div className="flex-1 min-h-[120px]">
          <Editor
            defaultLanguage="html"
            value={starterHTML}
            theme="vs-dark"
            options={{
              readOnly: true,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              lineHeight: 22,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              automaticLayout: true,
              wordWrap: "on",
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              renderLineHighlight: "none",
              domReadOnly: true,
              accessibilitySupport: "on",
            }}
          />
        </div>
      ) : (
        <div className="flex-1 bg-[#FAFAFA]">
          <iframe
            ref={iframeRef}
            title="Live preview of your code output"
            sandbox="allow-scripts"
            className="w-full h-full border-0"
            style={{ minHeight: 120 }}
          />
        </div>
      )}
    </div>
  );
}
