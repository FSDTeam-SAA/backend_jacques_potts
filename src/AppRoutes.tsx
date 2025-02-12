import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import ListingDetails from "./pages/ListingDetails";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import SavedListings from "./pages/SavedListings";
import DueDiligence from "./pages/DueDiligence";
import EmailSupport from "./pages/EmailSupport";
import HelpCenter from "./pages/HelpCenter";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EULA from "./pages/EULA";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import Onboarding from "./pages/Onboarding";
import FindBroker from "./pages/FindBroker";
import BrokerProfile from "./pages/BrokerProfile";
import RealEstate from "./pages/RealEstate";
import CreateAd from "./pages/CreateAd";
import AdManagement from "./pages/AdManagement";
import CreateAsset from "./pages/CreateAsset";
import AssetMarketplace from "./pages/AssetMarketplace";
import LOIManagement from "./pages/LOIManagement";
import Sell from "./pages/Sell";
import SupportRequests from "./pages/SupportRequests";
import EscrowServices from "./pages/resources/EscrowServices";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth/callback" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/create-listing" element={<CreateListing />} />
      <Route path="/edit-listing/:id" element={<EditListing />} />
      <Route path="/listings/:id" element={<ListingDetails />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/saved-listings" element={<SavedListings />} />
      <Route path="/due-diligence" element={<DueDiligence />} />
      <Route path="/email-support" element={<EmailSupport />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/eula" element={<EULA />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/find-broker" element={<FindBroker />} />
      <Route path="/broker/:id" element={<BrokerProfile />} />
      <Route path="/real-estate" element={<RealEstate />} />
      <Route path="/create-ad" element={<CreateAd />} />
      <Route path="/ad-management" element={<AdManagement />} />
      <Route path="/create-asset" element={<CreateAsset />} />
      <Route path="/asset-marketplace" element={<AssetMarketplace />} />
      <Route path="/loi-management" element={<LOIManagement />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/support-requests" element={<SupportRequests />} />
      <Route path="/resources/escrow-services" element={<EscrowServices />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;