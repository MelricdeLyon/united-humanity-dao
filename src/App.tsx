import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import HumaniteUnieHome from "./pages/HumaniteUnieHome";
import NotFound from "./pages/NotFound";
import Treasury from "./pages/Treasury";
import TreasuryVaults from "./pages/TreasuryVaults";
import TreasuryVaultDetail from "./pages/TreasuryVaultDetail";
import Governance from "./pages/Governance";
import Proposals from "./pages/Proposals";
import Council from "./pages/Council";
import Explorer from "./pages/Explorer";
import Wallet from "./pages/Wallet";
import Assets from "./pages/Assets";
import Nominations from "./pages/Nominations";
import NominationDetail from "./pages/NominationDetail";
import OHSHome from "./pages/OHSHome";
import OHSNominations from "./pages/OHSNominations";
import OHSNominationDetail from "./pages/OHSNominationDetail";
import OHSCouncil from "./pages/OHSCouncil";
import OHSGovernance from "./pages/OHSGovernance";
import OHSConsultation from "./pages/OHSConsultation";
import OHSAssemblee from "./pages/OHSAssemblee";
import OSPHome from "./pages/OSPHome";
import OSPGovernance from "./pages/OSPGovernance";
import OSPVotePlanetaire from "./pages/OSPVotePlanetaire";
import OSPAssembleeMondiale from "./pages/OSPAssembleeMondiale";
import OSPCouncil from "./pages/OSPCouncil";
import OSPNominations from "./pages/OSPNominations";
import NominateResidents from "./pages/NominateResidents";
import RandomSelection from "./pages/RandomSelection";
import TreasuryNation from "./pages/TreasuryNation";
import OperationPiecesOr from "./pages/OperationPiecesOr";
import FriendlyOPA from "./pages/FriendlyOPA";
import TerritorialGovernance from "./pages/TerritorialGovernance";
import DeclarationDroitsVivant from "./pages/DeclarationDroitsVivant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/accueil" element={<HumaniteUnieHome />} />
          <Route path="/univers-jerr" element={<Home />} />
          <Route path="/tresor" element={<Treasury />} />
          <Route path="/tresor-nation" element={<TreasuryNation />} />
          <Route path="/tresor/cofres" element={<TreasuryVaults />} />
          <Route path="/tresor/vault/:id" element={<TreasuryVaultDetail />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/propositions" element={<Proposals />} />
          <Route path="/conseil" element={<Council />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/actifs" element={<Assets />} />
          <Route path="/nominations" element={<Nominations />} />
          <Route path="/nominations/:id" element={<NominationDetail />} />
          <Route path="/ohs" element={<OHSHome />} />
          <Route path="/ohs/nominations" element={<OHSNominations />} />
          <Route path="/ohs/nominations/:id" element={<OHSNominationDetail />} />
          <Route path="/ohs/council" element={<OHSCouncil />} />
          <Route path="/ohs/governance" element={<OHSGovernance />} />
          <Route path="/ohs/consultation" element={<OHSConsultation />} />
          <Route path="/ohs/assemblee" element={<OHSAssemblee />} />
          <Route path="/osp" element={<OSPHome />} />
          <Route path="/osp/governance" element={<OSPGovernance />} />
          <Route path="/osp/vote-planetaire" element={<OSPVotePlanetaire />} />
          <Route path="/osp/assemblee-mondiale" element={<OSPAssembleeMondiale />} />
          <Route path="/osp/conseil" element={<OSPCouncil />} />
          <Route path="/osp/nominations" element={<OSPNominations />} />
          <Route path="/nominate-residents" element={<NominateResidents />} />
          <Route path="/random-selection" element={<RandomSelection />} />
          <Route path="/operation-pieces-or" element={<OperationPiecesOr />} />
          <Route path="/friendly-opa" element={<FriendlyOPA />} />
          <Route path="/territorial-governance" element={<TerritorialGovernance />} />
          <Route path="/declaration-droits-vivant" element={<DeclarationDroitsVivant />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
