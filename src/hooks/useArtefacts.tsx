import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Artefact } from "@/components/portfolio/ArtefactDialog";
import { useToast } from "@/hooks/use-toast";

export const useArtefacts = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: artefacts = [], isLoading } = useQuery({
    queryKey: ["artefacts", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("artefacts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return (data || []).map((item) => ({
        id: item.id,
        unit: item.unit,
        title: item.title,
        type: item.type,
        link: item.link || undefined,
        summary: item.summary,
        createdAt: item.created_at,
        reviewed: item.reviewed || false,
        reviewedAt: item.reviewed_at || undefined,
        reviewNotes: item.review_notes || "",
      })) as Artefact[];
    },
    enabled: !!userId,
  });

  const saveArtefact = useMutation({
    mutationFn: async (artefact: Artefact) => {
      if (!userId) throw new Error("Not authenticated");

      const { error } = await supabase.from("artefacts").insert({
        id: artefact.id,
        user_id: userId,
        unit: artefact.unit,
        title: artefact.title,
        type: artefact.type,
        link: artefact.link,
        summary: artefact.summary,
        reviewed: artefact.reviewed || false,
        reviewed_at: artefact.reviewedAt,
        review_notes: artefact.reviewNotes,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artefacts", userId] });
      toast({
        title: "Success",
        description: "Artefact saved successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const updateArtefact = useMutation({
    mutationFn: async (artefact: Artefact) => {
      const { error } = await supabase
        .from("artefacts")
        .update({
          title: artefact.title,
          type: artefact.type,
          link: artefact.link,
          summary: artefact.summary,
          reviewed: artefact.reviewed,
          reviewed_at: artefact.reviewedAt,
          review_notes: artefact.reviewNotes,
        })
        .eq("id", artefact.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artefacts", userId] });
      toast({
        title: "Success",
        description: "Artefact updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return {
    artefacts,
    isLoading,
    saveArtefact: saveArtefact.mutate,
    updateArtefact: updateArtefact.mutate,
  };
};
