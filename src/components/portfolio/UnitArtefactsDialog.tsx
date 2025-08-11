import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Artefact } from "./ArtefactDialog";

interface UnitArtefactsDialogProps {
  unit: number | null;
  artefacts: Artefact[];
  onClose: () => void;
  onSelect: (a: Artefact) => void;
}

export const UnitArtefactsDialog: React.FC<UnitArtefactsDialogProps> = ({ unit, artefacts, onClose, onSelect }) => {
  const open = unit !== null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Unit {unit ?? ""} Artefacts</DialogTitle>
          <DialogDescription>Click an artefact to open it for review.</DialogDescription>
        </DialogHeader>

        {artefacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No artefacts added for this unit yet.</p>
        ) : (
          <div className="grid gap-2">
            {artefacts.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => { onSelect(a); }}
                className="text-left rounded-lg border p-3 hover:bg-muted/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium leading-tight">{a.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{a.summary || a.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</span>
                    <Badge variant={a.reviewed ? "outline" : "secondary"}>{a.reviewed ? "Reviewed" : "New"}</Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
