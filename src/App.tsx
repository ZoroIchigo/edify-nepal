import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockUserProvider } from "@/context/MockUserContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Checkout from "./pages/Checkout";
import BookingConfirmed from "./pages/BookingConfirmed";
import Account from "./pages/Account";
import Inbox from "./pages/Inbox";
import NotFound from "./pages/NotFound";
import InviteParent from "./pages/InviteParent";
import HouseholdDashboard from "./pages/HouseholdDashboard";
import PendingVerification from "./pages/PendingVerification";
import VerificationApproved from "./pages/VerificationApproved";
import LinkChild from "./pages/LinkChild";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MockUserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmed" element={<BookingConfirmed />} />
            <Route path="/account" element={<Account />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/invite-parent" element={<InviteParent />} />
            <Route path="/household" element={<HouseholdDashboard />} />
            <Route path="/pending-verification" element={<PendingVerification />} />
            <Route path="/verification-approved" element={<VerificationApproved />} />
            <Route path="/link-child" element={<LinkChild />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MockUserProvider>
  </QueryClientProvider>
);

export default App;
