import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export type Artefact = {
  id: string;
  unit: number;
  title: string;
  type: string;
  link?: string;
  summary: string;
  createdAt: string;
};

interface ArtefactDialogProps {
  unit: number | null;
  onClose: () => void;
  onSave: (a: Artefact) => void;
}

export const ArtefactDialog: React.FC<ArtefactDialogProps> = ({ unit, onClose, onSave }) => {
  const [open, setOpen] = React.useState(!!unit);
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("Design");
  const [link, setLink] = React.useState("");
  const [summary, setSummary] = React.useState("");

  React.useEffect(() => setOpen(!!unit), [unit]);

  const handleSave = () => {
    if (!unit) return;
    const artefact: Artefact = {
      id: crypto.randomUUID(),
      unit,
      title: title.trim() || `Artefact for Unit ${unit}`,
      type,
      link: link.trim() || undefined,
      summary,
      createdAt: new Date().toISOString(),
    };
    onSave(artefact);
    setTitle("");
    setType("Design");
    setLink("");
    setSummary("");
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); setOpen(v); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Artefact {unit ? `— Unit ${unit}` : ""}</DialogTitle>
          <DialogDescription>
            Provide a title, select a type, add an optional link, and briefly describe the evidence.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Threat Model Draft" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" value={type} onChange={(e) => setType(e.target.value)} placeholder="Design / Code / Notes / Feedback" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="link">Link (optional)</Label>
            <Input id="link" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="What does this artefact show? What did you learn?" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="hero" onClick={handleSave}>Save Artefact</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
