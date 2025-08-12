import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Artefact } from "./ArtefactDialog";

interface ArtefactReviewDialogProps {
  artefact: Artefact | null;
  onClose: () => void;
  onSaveNotes: (notes: string) => void;
  onMarkReviewed: (notes: string) => void;
}

export const ArtefactReviewDialog: React.FC<ArtefactReviewDialogProps> = ({ artefact, onClose, onSaveNotes, onMarkReviewed }) => {
  const open = !!artefact;
  const reviewed = artefact?.reviewed ?? false;
  const [notes, setNotes] = React.useState("");
  React.useEffect(() => {
    setNotes(artefact?.reviewNotes ?? "");
  }, [artefact]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Review Artefact</DialogTitle>
          <DialogDescription>Confirm details and mark as reviewed when done.</DialogDescription>
        </DialogHeader>

        {artefact && (
          <ScrollArea className="max-h-[70vh] pr-2">
            <div className="grid gap-3 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unit {artefact.unit}</p>
                  <h3 className="text-lg font-semibold leading-tight mt-1">{artefact.title}</h3>
                </div>
                <Badge variant={reviewed ? "outline" : "secondary"}>{reviewed ? "Reviewed" : "New"}</Badge>
              </div>

              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground">{artefact.type}</p>
              </div>

              {artefact.link && (
                <div>
                  <p className="text-sm font-medium">Link</p>
                  <a href={artefact.link} target="_blank" rel="noreferrer" className="text-sm underline">
                    Open evidence
                  </a>
                </div>
              )}

              <div>
                <p className="text-sm font-medium">Summary</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{artefact.summary || "No summary provided."}</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="review-notes">Review Notes</Label>
                <Textarea
                  id="review-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add feedback, actions, or follow-ups for this artefact"
                />
              </div>

              <p className="text-xs text-muted-foreground">Created {new Date(artefact.createdAt).toLocaleString()}</p>
            </div>
          </ScrollArea>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button variant="outline" onClick={() => onSaveNotes(notes)}>
            Save Notes
          </Button>
          <Button variant="hero" onClick={() => onMarkReviewed(notes)} disabled={reviewed}>
            {reviewed ? "Already reviewed" : "Mark as reviewed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
