import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Award, Heart } from "lucide-react";

interface ResidentNominationFormProps {
  organizationType: 'osp' | 'ohu' | 'ohs';
  onNominationSubmitted?: () => void;
}

const orgConfig = {
  osp: {
    name: "Organisation de la Symbiose Planétaire",
    color: "bg-green-500",
    skills: ["Écologie", "Gouvernance", "Science climatique", "Développement durable", "Biodiversité"],
    positions: [
      { value: "council", label: "Conseil OSP" },
      { value: "director", label: "Direction OSP" },
      { value: "specialist", label: "Spécialiste Environnemental" }
    ]
  },
  ohu: {
    name: "Organisation de l'Humanité Unie",
    color: "bg-blue-500",
    skills: ["Droits humains", "Gouvernance", "Justice sociale", "Diplomatie", "Éthique"],
    positions: [
      { value: "council", label: "Conseil OHU" },
      { value: "director", label: "Direction OHU" },
      { value: "specialist", label: "Spécialiste Humanitaire" }
    ]
  },
  ohs: {
    name: "Organisation Humaine de la Santé",
    color: "bg-red-500",
    skills: ["Médecine", "Santé publique", "Recherche", "Bioéthique", "Épidémiologie"],
    positions: [
      { value: "council", label: "Conseil OHS" },
      { value: "director", label: "Direction OHS" },
      { value: "specialist", label: "Spécialiste Médical" }
    ]
  }
};

export const ResidentNominationForm = ({ organizationType, onNominationSubmitted }: ResidentNominationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nominated_person_name: "",
    nominated_person_email: "",
    nominated_person_bio: "",
    position_type: "",
    nomination_reason: "",
    supporting_evidence: "",
    suggested_skills: [] as string[]
  });

  const config = orgConfig[organizationType];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      suggested_skills: prev.suggested_skills.includes(skill)
        ? prev.suggested_skills.filter(s => s !== skill)
        : [...prev.suggested_skills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour nominer un habitant",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("resident_nominations").insert({
        nominator_id: user.id,
        nominated_person_name: formData.nominated_person_name,
        nominated_person_email: formData.nominated_person_email,
        nominated_person_bio: formData.nominated_person_bio,
        organization_type: organizationType,
        position_type: formData.position_type,
        nomination_reason: formData.nomination_reason,
        supporting_evidence: formData.supporting_evidence
      });

      if (error) throw error;

      toast({
        title: "Nomination soumise !",
        description: `${formData.nominated_person_name} a été nominé(e) pour ${config.name}`,
      });

      // Reset form
      setFormData({
        nominated_person_name: "",
        nominated_person_email: "",
        nominated_person_bio: "",
        position_type: "",
        nomination_reason: "",
        supporting_evidence: "",
        suggested_skills: []
      });

      onNominationSubmitted?.();
    } catch (error) {
      console.error("Erreur lors de la nomination:", error);
      toast({
        title: "Erreur",
        description: "Impossible de soumettre la nomination. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.color} text-white`}>
            <Users className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>Nominer un Habitant</CardTitle>
            <CardDescription>{config.name}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet de la personne nominée *</Label>
              <Input
                id="name"
                value={formData.nominated_person_name}
                onChange={(e) => setFormData(prev => ({ ...prev, nominated_person_name: e.target.value }))}
                placeholder="Ex: Marie Dupont"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (optionnel)</Label>
              <Input
                id="email"
                type="email"
                value={formData.nominated_person_email}
                onChange={(e) => setFormData(prev => ({ ...prev, nominated_person_email: e.target.value }))}
                placeholder="marie.dupont@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Poste visé *</Label>
            <Select value={formData.position_type} onValueChange={(value) => setFormData(prev => ({ ...prev, position_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un poste" />
              </SelectTrigger>
              <SelectContent>
                {config.positions.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biographie et parcours de la personne</Label>
            <Textarea
              id="bio"
              value={formData.nominated_person_bio}
              onChange={(e) => setFormData(prev => ({ ...prev, nominated_person_bio: e.target.value }))}
              placeholder="Décrivez le parcours, l'expérience et les qualifications de cette personne..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Compétences suggérées</Label>
            <div className="flex flex-wrap gap-2">
              {config.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant={formData.suggested_skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                  {formData.suggested_skills.includes(skill) && (
                    <Award className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Raison de la nomination *</Label>
            <Textarea
              id="reason"
              value={formData.nomination_reason}
              onChange={(e) => setFormData(prev => ({ ...prev, nomination_reason: e.target.value }))}
              placeholder="Expliquez pourquoi vous pensez que cette personne serait excellente pour ce poste..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidence">Preuves et références (optionnel)</Label>
            <Textarea
              id="evidence"
              value={formData.supporting_evidence}
              onChange={(e) => setFormData(prev => ({ ...prev, supporting_evidence: e.target.value }))}
              placeholder="Liens vers des travaux, témoignages, réalisations concrètes..."
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
            <Heart className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Votre nomination contribue à identifier les talents de notre communauté pour le tirage au sort démocratique.
            </p>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Soumission en cours..." : "Soumettre la nomination"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};