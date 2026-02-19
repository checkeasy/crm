"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { toast } from "sonner";
import { QuickReplyTemplates } from "./QuickReplyTemplates";
import type { Template, Lead } from "@/lib/types/database";
import { cn } from "@/lib/utils";

interface ComposeReplyProps {
  templates: Template[];
  lead?: Lead;
}

export function ComposeReply({ templates, lead }: ComposeReplyProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (!content.trim()) return;
    toast.success("Message envoye", {
      description: "Votre reponse a ete envoyee avec succes.",
    });
    setContent("");
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to send
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-2">
      {/* Toolbar row */}
      <div className="flex items-center gap-2 flex-wrap">
        <QuickReplyTemplates
          templates={templates}
          lead={lead}
          onSelect={(text) => {
            setContent(text);
            setIsFocused(true);
          }}
        />
        <span className="text-xs text-muted-foreground hidden sm:inline">
          ou redigez votre reponse
        </span>
        {content && (
          <button
            className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors min-h-[32px] px-2"
            onClick={() => setContent("")}
            type="button"
          >
            <X className="h-3.5 w-3.5" />
            Effacer
          </button>
        )}
      </div>

      {/* Textarea */}
      <div
        className={cn(
          "rounded-xl border transition-colors overflow-hidden",
          isFocused || content
            ? "border-primary/40 ring-1 ring-primary/20"
            : "border-border"
        )}
      >
        <Textarea
          className="min-h-[100px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm leading-relaxed"
          placeholder="Redigez votre reponse... (Ctrl+Entree pour envoyer)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />

        {/* Footer bar inside the textarea container */}
        <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-t border-border/50">
          <span className="text-[10px] text-muted-foreground hidden sm:inline">
            Ctrl+Entree pour envoyer
          </span>
          <div className="flex items-center gap-2 ml-auto">
            {content.trim() && (
              <span className="text-[10px] text-muted-foreground">
                {content.length} car.
              </span>
            )}
            <Button
              size="sm"
              className="min-h-[36px] gap-1.5"
              disabled={!content.trim()}
              onClick={handleSend}
            >
              <Send className="h-3.5 w-3.5" />
              <span>Envoyer</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
