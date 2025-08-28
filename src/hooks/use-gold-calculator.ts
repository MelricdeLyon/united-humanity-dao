import { useState, useEffect } from 'react';

// Constants pour le calcul
const GOLD_DENSITY = 19.32; // g/cm³
const LABOR_COST = 3000; // € par pièce
const STAND_COST = 400; // € pour le socle
const LOGISTICS_MARGIN = 0.15; // 15% pour frais de port, assurance, etc.

// Dimensions de la pièce en cm
const COIN_DIMENSIONS = {
  length: 6.5,
  width: 5.5,
  height: 1.5
};

interface GoldPrice {
  pricePerGram: number;
  currency: string;
  lastUpdated: Date;
}

interface CoinCalculation {
  volume: number; // cm³
  mass: number; // grammes
  goldValue: number; // €
  laborCost: number; // €
  standCost: number; // €
  subtotal: number; // €
  logisticsMargin: number; // €
  finalPrice: number; // €
}

export const useGoldCalculator = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice>({
    pricePerGram: 93.9, // Prix par défaut
    currency: 'EUR',
    lastUpdated: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simulation de l'API du cours de l'or (remplacer par vraie API)
  const fetchGoldPrice = async () => {
    setIsLoading(true);
    try {
      // Simulation - à remplacer par une vraie API comme Metal-API ou similar
      const mockPrice = 93.9 + (Math.random() - 0.5) * 2; // Variation de ±1€
      
      setGoldPrice({
        pricePerGram: parseFloat(mockPrice.toFixed(2)),
        currency: 'EUR',
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du cours de l\'or:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcul du volume de la pièce (parallélépipède)
  const calculateVolume = (): number => {
    return COIN_DIMENSIONS.length * COIN_DIMENSIONS.width * COIN_DIMENSIONS.height;
  };

  // Calcul de la masse en or
  const calculateMass = (volume: number): number => {
    return volume * GOLD_DENSITY;
  };

  // Calcul complet du prix
  const calculateCoinPrice = (): CoinCalculation => {
    const volume = calculateVolume();
    const mass = calculateMass(volume);
    const goldValue = mass * goldPrice.pricePerGram;
    const subtotal = goldValue + LABOR_COST + STAND_COST;
    const logisticsMargin = subtotal * LOGISTICS_MARGIN;
    const finalPrice = subtotal + logisticsMargin;

    return {
      volume: parseFloat(volume.toFixed(2)),
      mass: parseFloat(mass.toFixed(1)),
      goldValue: parseFloat(goldValue.toFixed(2)),
      laborCost: LABOR_COST,
      standCost: STAND_COST,
      subtotal: parseFloat(subtotal.toFixed(2)),
      logisticsMargin: parseFloat(logisticsMargin.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2))
    };
  };

  // Mise à jour automatique du cours toutes les 5 minutes
  useEffect(() => {
    fetchGoldPrice();
    const interval = setInterval(fetchGoldPrice, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    goldPrice,
    calculation: calculateCoinPrice(),
    isLoading,
    refreshPrice: fetchGoldPrice,
    dimensions: COIN_DIMENSIONS
  };
};