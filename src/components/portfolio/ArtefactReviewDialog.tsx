import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Artefact } from "./ArtefactDialog";

interface ArtefactReviewDialogProps {
  artefact: Artefact | null;
  onClose: () => void;
  onMarkReviewed: () => void;
}

export const ArtefactReviewDialog: React.FC<ArtefactReviewDialogProps> = ({ artefact, onClose, onMarkReviewed }) => {
  const open = !!artefact;
  const reviewed = artefact?.reviewed ?? false;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Artefact</DialogTitle>
          <DialogDescription>Confirm details and mark as reviewed when done.</DialogDescription>
        </DialogHeader>

        {artefact && (
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

            <p className="text-xs text-muted-foreground">Created {new Date(artefact.createdAt).toLocaleString()}</p>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button variant="hero" onClick={onMarkReviewed} disabled={reviewed}> 
            {reviewed ? "Already reviewed" : "Mark as reviewed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
