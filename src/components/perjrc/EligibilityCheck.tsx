import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Calendar, Bell } from "lucide-react";
import { usePERJRC } from "@/hooks/use-perjrc";
import { supabase } from "@/integrations/supabase/client";

interface EligibilityCheckProps {
  onEligibilityResult: (eligible: boolean) => void;
}

const EligibilityCheck = ({ onEligibilityResult }: EligibilityCheckProps) => {
  const [birthDate, setBirthDate] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);
  const [userBirthDate, setUserBirthDate] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  
  const { checkEligibility, rules } = usePERJRC();

  // Charger la date de naissance du profil utilisateur si disponible
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('birth_date')
          .single();
          
        if (profile?.birth_date) {
          setUserBirthDate(profile.birth_date);
          setBirthDate(profile.birth_date);
        }
      } catch (error) {
        console.log("No profile found or error loading profile");
      }
    };

    loadUserProfile();
  }, []);

  const handleCheck = () => {
    if (!birthDate) return;
    
    setIsChecking(true);
    const result = checkEligibility(birthDate);
    setEligibilityResult(result);
    setIsChecking(false);
    
    // Informer le parent du résultat
    onEligibilityResult(result.eligible);
  };

  const handleNotifyMe = () => {
    // Dans une vraie application, ceci enverrait une notification
    alert("Nous vous préviendrons quand vous serez éligible au PER-JRC !");
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6" />
          Vérification d'éligibilité
        </CardTitle>
        <CardDescription>
          Le PER-JRC est réservé aux personnes nées en {rules?.eligibility_birthyear_max || 1985} ou avant
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Champ date de naissance */}
        <div className="space-y-2">
          <Label htmlFor="birthDate">Date de naissance</Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          {userBirthDate && (
            <p className="text-sm text-muted-foreground">
              Date chargée depuis votre profil
            </p>
          )}
        </div>

        {/* Bouton de vérification */}
        <Button 
          onClick={handleCheck} 
          disabled={!birthDate || isChecking}
          className="w-full"
          size="lg"
        >
          {isChecking ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Vérification...
            </>
          ) : (
            'Vérifier mon éligibilité'
          )}
        </Button>

        {/* Résultat de l'éligibilité */}
        {eligibilityResult && (
          <div className="space-y-4">
            {eligibilityResult.eligible ? (
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Félicitations !</strong> Vous êtes éligible au PER-JRC.
                  <br />
                  Vous avez {eligibilityResult.age} ans et pouvez bénéficier des taux préférentiels.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Non éligible.</strong> {eligibilityResult.reason}
                  <br />
                  Vous avez actuellement {calculateAge(birthDate)} ans.
                </AlertDescription>
              </Alert>
            )}

            {/* Informations sur l'âge */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Votre âge : {calculateAge(birthDate)} ans</p>
                  <p className="text-sm text-muted-foreground">
                    Né(e) en {new Date(birthDate).getFullYear()}
                  </p>
                </div>
                <Badge variant={eligibilityResult.eligible ? "default" : "secondary"}>
                  {eligibilityResult.eligible ? "Éligible" : "Non éligible"}
                </Badge>
              </div>
            </div>

            {/* CTA pour les non éligibles */}
            {!eligibilityResult.eligible && (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Vous pourrez bénéficier du PER-JRC quand vous aurez 40 ans.
                </p>
                <Button variant="outline" onClick={handleNotifyMe}>
                  <Bell className="mr-2 h-4 w-4" />
                  Me prévenir à mes 40 ans
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Informations sur les conditions */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Conditions d'éligibilité</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Être né(e) en {rules?.eligibility_birthyear_max || 1985} ou avant (avoir 40 ans minimum)</li>
            <li>• Montant minimum de {rules?.bronze_min_eur.toLocaleString() || '1 500'} € pour accéder aux taux préférentiels</li>
            <li>• Avantage unique : une seule fois par personne</li>
            <li>• Vérification d'identité requise (KYC light)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EligibilityCheck;