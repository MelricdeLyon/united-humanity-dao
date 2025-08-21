import React from 'react';
import { Briefcase, TrendingUp, PieChart, Building, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Assets() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 rounded-full">
              <Briefcase className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
            Gestion d'Actifs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez et investissez dans des actifs tokenisés de l'écosystème Humanité Unie
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portefeuille Total</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€0</div>
              <p className="text-xs text-muted-foreground">Valeur totale des actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+0%</div>
              <p className="text-xs text-muted-foreground">Variation sur 30j</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actifs Détenus</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Types d'actifs différents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€0</div>
              <p className="text-xs text-muted-foreground">Dividendes ce mois</p>
            </CardContent>
          </Card>
        </div>

        {/* Asset Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Immobilier Tokenisé</CardTitle>
                  <p className="text-sm text-muted-foreground">Propriétés fractionnées</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Actifs disponibles</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rendement moyen</span>
                  <span className="text-sm font-semibold text-green-600">8.5%</span>
                </div>
                <Button className="w-full" variant="outline">
                  Explorer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Actions DAO</CardTitle>
                  <p className="text-sm text-muted-foreground">Parts de gouvernance</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Projets actifs</span>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Droits de vote</span>
                  <span className="text-sm font-semibold">Actifs</span>
                </div>
                <Button className="w-full" variant="outline">
                  Participer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Coins className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Crypto-Actifs</CardTitle>
                  <p className="text-sm text-muted-foreground">Tokens et cryptos</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tokens listés</span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Volatilité</span>
                  <span className="text-sm font-semibold text-orange-600">Élevée</span>
                </div>
                <Button className="w-full" variant="outline">
                  Trader
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Portfolio */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Mon Portefeuille</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Portefeuille Vide</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore d'actifs. Commencez à investir pour construire votre portefeuille.
              </p>
              <Button className="bg-gradient-to-r from-primary to-primary/80">
                Découvrir les Actifs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Tendances du Marché</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Immobilier Paris 16ème</p>
                    <p className="text-sm text-muted-foreground">Appartement de luxe tokenisé</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+12.5%</p>
                  <p className="text-sm text-muted-foreground">30 jours</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <Building className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">DAO Token HU</p>
                    <p className="text-sm text-muted-foreground">Token de gouvernance principal</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">+8.2%</p>
                  <p className="text-sm text-muted-foreground">7 jours</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-full">
                    <Coins className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">JerrCoin (JC)</p>
                    <p className="text-sm text-muted-foreground">Monnaie utilitaire de l'écosystème</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">€0.10</p>
                  <p className="text-sm text-muted-foreground">Prix stable</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}