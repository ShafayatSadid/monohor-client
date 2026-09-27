// src/components/admin/MarkdownEditor.jsx
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

const MarkdownEditor = ({
    value = "",
    onChange,
    placeholder = "Markdown এ লিখুন বা AI থেকে paste করুন...",
    minRows = 12,
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            {/* Editor */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                        Markdown
                    </span>
                    <span className="font-body text-[10px] text-text-muted">
                        AI থেকে paste করুন
                    </span>
                </div>
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={minRows}
                    spellCheck={false}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-text-muted font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-y"
                />
            </div>

            {/* Preview */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                        প্রিভিউ
                    </span>
                </div>
                <div className="w-full px-4 py-3 rounded-lg bg-surface border border-border min-h-[200px] max-h-[420px] overflow-y-auto">
                    {value && value.trim() ? (
                        <div className="markdown-body">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkBreaks]}
                            >
                                {value}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <p className="font-body text-sm text-text-muted italic">
                            প্রিভিউ এখানে দেখা যাবে...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;