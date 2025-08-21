import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet as WalletIcon, Send, Receipt, TrendingUp, Eye, Shield, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Wallet() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex justify-start mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="hover:bg-accent/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 rounded-full">
              <WalletIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
            Portefeuille Numérique
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gérez vos JerrCoins, consultez votre historique et effectuez des transactions sécurisées
          </p>
        </div>

        {/* Wallet Status */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Portefeuille Non Connecté</h3>
                  <p className="text-sm text-muted-foreground">
                    Connectez votre portefeuille pour accéder à vos fonds
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-primary/80">
                Connecter le Portefeuille
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-5 w-5" />
                Solde Principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">0 JerrCoin</div>
                  <p className="text-muted-foreground">≈ €0.00</p>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" disabled>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                  </Button>
                  <Button variant="outline" className="flex-1" disabled>
                    <Receipt className="mr-2 h-4 w-4" />
                    Recevoir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">+0% (24h)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valeur totale</span>
                    <span>€0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gain/Perte</span>
                    <span className="text-green-600">+€0.00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="bg-blue-500/20 p-3 rounded-full w-fit mx-auto">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Envoyer</h3>
                <p className="text-sm text-muted-foreground">Transférer des JerrCoins</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="bg-green-500/20 p-3 rounded-full w-fit mx-auto">
                  <Receipt className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Recevoir</h3>
                <p className="text-sm text-muted-foreground">Obtenir une adresse</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="bg-purple-500/20 p-3 rounded-full w-fit mx-auto">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Échanger</h3>
                <p className="text-sm text-muted-foreground">Trading de tokens</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="bg-orange-500/20 p-3 rounded-full w-fit mx-auto">
                  <Eye className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold">Explorer</h3>
                <p className="text-sm text-muted-foreground">Voir les transactions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Historique des Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Receipt className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune transaction</h3>
              <p className="text-muted-foreground">
                Vos transactions apparaîtront ici une fois votre portefeuille connecté.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sécurité du Portefeuille
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">Mesures de Sécurité</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">🔒</Badge>
                    <span className="text-sm">Cryptage end-to-end</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">🔐</Badge>
                    <span className="text-sm">Clés privées sécurisées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">✅</Badge>
                    <span className="text-sm">Vérification 2FA</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Bonnes Pratiques</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Gardez vos clés privées secrètes</li>
                  <li>• Vérifiez toujours les adresses</li>
                  <li>• Utilisez des réseaux sécurisés</li>
                  <li>• Sauvegardez votre phrase de récupération</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}