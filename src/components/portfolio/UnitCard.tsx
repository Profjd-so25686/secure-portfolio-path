import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UnitCardProps {
  unitNumber: number;
  artifactsCount: number;
  reviewedCount: number;
  onAddClick: (unit: number) => void;
  onViewClick: (unit: number) => void;
}

export const UnitCard = ({ unitNumber, artifactsCount, reviewedCount, onAddClick, onViewClick }: UnitCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-xl border bg-card transition-transform hover:-translate-y-0.5 hover:shadow-lg">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-lg">
            <span>Unit {unitNumber}</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              {artifactsCount} artefact{artifactsCount === 1 ? "" : "s"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground">
            Add evidence of your learning for this unit: designs, code, notes, discussions, or feedback.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Reviewed: {reviewedCount}/{artifactsCount}</p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => onAddClick(unitNumber)}>
              Add Artefact
            </Button>
            <Button variant="secondary" className="rounded-full" onClick={() => onViewClick(unitNumber)}>
              View Artefacts
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100" aria-hidden>
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-brand/10 blur-2xl" />
      </div>
    </article>
  );
};
