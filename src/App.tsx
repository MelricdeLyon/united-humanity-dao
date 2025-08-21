import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
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
import Elections from "./pages/Elections";
import ElectionDetail from "./pages/ElectionDetail";
import OHSHome from "./pages/OHSHome";
import OHSElections from "./pages/OHSElections";
import OHSCouncil from "./pages/OHSCouncil";
import OHSGovernance from "./pages/OHSGovernance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/accueil" element={<Home />} />
          <Route path="/tresor" element={<Treasury />} />
          <Route path="/tresor/cofres" element={<TreasuryVaults />} />
          <Route path="/tresor/vault/:id" element={<TreasuryVaultDetail />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/propositions" element={<Proposals />} />
          <Route path="/conseil" element={<Council />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/actifs" element={<Assets />} />
          <Route path="/elections" element={<Elections />} />
          <Route path="/elections/:id" element={<ElectionDetail />} />
          <Route path="/ohs" element={<OHSHome />} />
          <Route path="/ohs/elections" element={<OHSElections />} />
          <Route path="/ohs/council" element={<OHSCouncil />} />
          <Route path="/ohs/governance" element={<OHSGovernance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
