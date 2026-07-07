import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DiveSites from "./pages/DiveSites";
import Courses from "./pages/Courses";
import Packages from "./pages/Packages";
import Reservations from "./pages/Reservations";
import Promotions from "./pages/Promotions";
import Services from "./pages/Services";
import Crew from "./pages/Crew";
import Equipment from "./pages/Equipment";
import DiveCenter from "./pages/DiveCenter";
import Diving from "./pages/Diving";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OpenWater from "./pages/courses/OpenWater";
import AdvancedOpenWater from "./pages/courses/AdvancedOpenWater";
import RescueDiver from "./pages/courses/RescueDiver";
import ExtendedRange from "./pages/courses/ExtendedRange";
import DeepDiver from "./pages/courses/DeepDiver";
import EnrichedAirNitrox from "./pages/courses/EnrichedAirNitrox";
import WreckDiver from "./pages/courses/WreckDiver";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dive-sites" component={DiveSites} />
      <Route path="/courses" component={Courses} />
      <Route path="/packages" component={Packages} />
      <Route path="/reservations" component={Reservations} />
      <Route path="/promotions" component={Promotions} />
      <Route path="/services" component={Services} />
      <Route path="/crew" component={Crew} />
      <Route path="/equipment" component={Equipment} />
      <Route path="/dive-center" component={DiveCenter} />
      <Route path="/diving" component={Diving} />
      <Route path="/faq" component={FAQ} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/courses/open-water" component={OpenWater} />
      <Route path="/courses/advanced-open-water" component={AdvancedOpenWater} />
      <Route path="/courses/rescue-diver" component={RescueDiver} />
      <Route path="/courses/extended-range" component={ExtendedRange} />
      <Route path="/courses/deep-diver" component={DeepDiver} />
      <Route path="/courses/nitrox" component={EnrichedAirNitrox} />
      <Route path="/courses/wreck-diver" component={WreckDiver} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
