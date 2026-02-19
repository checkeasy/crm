"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { QuickReplyTemplates } from "./QuickReplyTemplates";
import type { Template, Lead } from "@/lib/types/database";

interface ComposeReplyProps {
  templates: Template[];
  lead?: Lead;
}

export function ComposeReply({ templates, lead }: ComposeReplyProps) {
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (!content.trim()) return;
    toast.success("Message envoye", {
      description: "Votre reponse a ete envoyee avec succes.",
    });
    setContent("");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <QuickReplyTemplates
          templates={templates}
          lead={lead}
          onSelect={setContent}
        />
        <span className="text-xs text-muted-foreground">
          Utilisez un template ou ecrivez votre reponse
        </span>
      </div>
      <Textarea
        className="min-h-[120px] resize-y"
        placeholder="Redigez votre reponse..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        <Button size="sm" disabled={!content.trim()} onClick={handleSend}>
          <Send className="h-3.5 w-3.5 mr-1.5" />
          Envoyer
        </Button>
      </div>
    </div>
  );
}
