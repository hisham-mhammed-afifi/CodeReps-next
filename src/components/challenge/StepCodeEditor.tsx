"use client";

import { useCallback, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChallengeStore } from "@/stores/challengeStore";

interface StepCodeEditorProps {
  starterCode: string;
}

export function StepCodeEditor({ starterCode }: StepCodeEditorProps) {
  const { userCode, setUserCode, resetCode } = useChallengeStore();
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const handleEditorDidMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.focus();
  }, []);

  const handleChange = useCallback(
    (value: string | undefined) => {
      setUserCode(value ?? "");
    },
    [setUserCode],
  );

  const handleReset = useCallback(() => {
    resetCode();
    if (editorRef.current) {
      editorRef.current.setValue(starterCode);
      editorRef.current.focus();
    }
  }, [resetCode, starterCode]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-brand-navy">
        <span className="text-sm font-semibold text-brand-slate-400">
          Code Editor
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-brand-slate-400 hover:text-brand-white gap-1.5"
          aria-label="Reset to starter code"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      </div>
      <div className="flex-1 min-h-[200px] lg:min-h-[300px]">
        <Editor
          defaultLanguage="javascript"
          value={userCode}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            lineHeight: 22,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            autoClosingBrackets: "always",
            autoIndent: "full",
            tabSize: 2,
            wordWrap: "on",
            suggest: { showKeywords: true, showSnippets: true },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            accessibilitySupport: "on",
          }}
        />
      </div>
    </div>
  );
}
