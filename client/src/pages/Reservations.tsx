import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Shield, CheckCircle2, AlertTriangle, Calendar, Users, CheckCircle, Mail, HelpCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { usePackages } from '@/hooks/usePackages';
import { useCourses } from '@/hooks/useCourses';
import { useServices } from '@/hooks/useServices';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { combineAsyncStates } from '@/hooks/useAsyncData';
import { PageLoader, PageError } from '@/components/common';

type ServiceCategory = '' | 'packages' | 'courses' | 'services';

export default function Reservations() {
  const [location] = useLocation();
  const packagesResult = usePackages();
  const coursesResult = useCourses();
  const servicesResult = useServices();
  const settingsResult = useWebsiteSettings();
  const { data: packages } = packagesResult;
  const { data: courses } = coursesResult;
  const { data: services } = servicesResult;
  const { data: settings } = settingsResult;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('');
  const [selectedOption, setSelectedOption] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitted, setIsExpanded] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkgId = params.get('package');
    const courseId = params.get('course');
    const serviceId = params.get('service');

    if (pkgId) {
      setServiceCategory('packages');
      setSelectedOption(pkgId);
    } else if (courseId) {
      setServiceCategory('courses');
      setSelectedOption(courseId);
    } else if (serviceId) {
      setServiceCategory('services');
      setSelectedOption(serviceId);
    }
  }, [location]);

  const handleCategoryChange = (cat: ServiceCategory) => {
    setServiceCategory(cat);
    setSelectedOption('');
  };

  const getSelectionLabel = () => {
    if (!serviceCategory || !selectedOption) return null;
    if (serviceCategory === 'packages') {
      return `Package: ${packages?.find(p => p.id === selectedOption)?.name}`;
    }
    if (serviceCategory === 'courses') {
      return `Course: ${courses?.find(c => c.id === selectedOption)?.name}`;
    }
    if (serviceCategory === 'services') {
      return `Service: ${services?.find(s => s.id === selectedOption)?.title}`;
    }
    return null;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !preferredDate) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const client = supabase;
    if (!client) {
      toast.error('Booking system is not configured yet. Please email us directly.');
      return;
    }

    setIsSubmitting(true);

    try {
      const ref = 'DD-' + Math.random().toString(36).substring(2, 11).toUpperCase();

      const { error } = await client.from('reservations').insert({
        booking_ref: ref,
        full_name: fullName,
        email,
        phone: phone || null,
        preferred_date: preferredDate,
        people_count: peopleCount,
        service_category: serviceCategory || null,
        selected_option: selectedOption || null,
        selection_label: getSelectionLabel() || null,
        special_requests: specialRequests || null,
      }).select();
      if (error) throw error;

      setBookingRef(ref);
      setIsExpanded(true);

      toast.success('Reservation Request Received!', {
        description: `A secure confirmation email has been dispatched to ${email}.`,
      });
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPreferredDate('');
    setPeopleCount(1);
    setServiceCategory('');
    setSelectedOption('');
    setSpecialRequests('');
    setIsExpanded(false);
  };

  const { isLoading, error } = combineAsyncStates(packagesResult, coursesResult, servicesResult, settingsResult);
  if (isLoading) return <PageLoader />;
  if (error) return <PageError />;

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-20 border-b border-border">
        <div className="container text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Expedition Planning</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-2 mb-4">Secure Online Booking</h1>
          <p className="text-muted-foreground">
            Plan your next underwater adventure. Complete our secure reservation form below, and our dive operations coordinator will verify and confirm your itinerary.
          </p>
        </div>
      </section>

      {/* Main Reservation Layout */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left/Middle Column: Form or Confirmation */}
            <div className="lg:col-span-2 text-left">
              {isSubmitted ? (
                /* Success Confirmation State */
                <div className="glass-panel p-8 md:p-10 space-y-8 animate-fadeIn">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4 animate-glow">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-foreground">Reservation Initiated!</h2>
                    <p className="text-muted-foreground max-w-md mx-auto text-sm">
                      Your reservation request has been registered in our secure system. A confirmation and invoice details have been dispatched to your email.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-secondary/60 border border-border rounded-xl p-6 space-y-4 text-sm">
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-muted-foreground">Booking Reference:</span>
                      <span className="text-foreground font-mono font-bold tracking-wider">{bookingRef}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground block text-xs">Primary Diver</span>
                        <span className="text-foreground font-semibold mt-0.5 block">{fullName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs">Email Address</span>
                        <span className="text-foreground font-semibold mt-0.5 block">{email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs">Preferred Date</span>
                        <span className="text-foreground font-semibold mt-0.5 block flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" /> {preferredDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs">Number of People</span>
                        <span className="text-foreground font-semibold mt-0.5 block flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-primary" /> {peopleCount}
                        </span>
                      </div>
                    </div>

                    {/* Selected service summary */}
                    <div className="border-t border-border pt-3 mt-3">
                      <span className="text-muted-foreground block text-xs mb-1">Itinerary Selection</span>
                      {getSelectionLabel() ? (
                        <span className="text-primary font-semibold">{getSelectionLabel()}</span>
                      ) : (
                        <span className="text-foreground font-semibold">Custom Guided Dive Expedition</span>
                      )}
                    </div>
                  </div>

                  {/* Action links */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                    <button
                      onClick={handleReset}
                      className="btn-premium-secondary py-3 px-6 text-sm"
                    >
                      Make Another Booking
                    </button>
                    <a
                      href={`mailto:${settings?.contact.email ?? ''}`}
                      className="btn-premium-primary py-3 px-6 text-sm flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" /> Email Operations Desk
                    </a>
                  </div>
                </div>
              ) : (
                /* Interactive Booking Form */
                <div className="glass-panel p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">Reservation Details</h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Personal Info */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-primary pb-2 border-b border-border">Personal Info</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5 md:col-span-2">
                          <label className="text-xs text-muted-foreground font-semibold">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs text-muted-foreground font-semibold">Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+230 5XXX XXXX"
                            className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs text-muted-foreground font-semibold">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Itinerary */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-primary pb-2 border-b border-border">Itinerary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs text-muted-foreground font-semibold">Date *</label>
                          <input
                            type="date"
                            required
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs text-muted-foreground font-semibold">Number of People</label>
                          <input
                            type="number"
                            min={1}
                            max={20}
                            value={peopleCount}
                            onChange={(e) => setPeopleCount(parseInt(e.target.value) || 1)}
                            className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5 md:col-span-2">
                          <label className="text-xs text-muted-foreground font-semibold">Type of Service</label>
                          <select
                            value={serviceCategory}
                            onChange={(e) => handleCategoryChange(e.target.value as ServiceCategory)}
                            className="bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="">-- Select a Category --</option>
                            <option value="packages">Dive Packages</option>
                            <option value="courses">Dive Courses</option>
                            <option value="services">Other Services</option>
                          </select>
                        </div>

                        {/* Dynamic secondary dropdown */}
                        <div
                          className={`md:col-span-2 flex flex-col space-y-1.5 transition-all duration-300 ease-in-out ${
                            serviceCategory
                              ? 'max-h-24 opacity-100'
                              : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
                          }`}
                        >
                          <label className="text-xs text-muted-foreground font-semibold">
                            {serviceCategory === 'packages' && 'Select Dive Package'}
                            {serviceCategory === 'courses' && 'Select Dive Course'}
                            {serviceCategory === 'services' && 'Select Service'}
                          </label>
                          {serviceCategory === 'packages' && (
                            <select
                              value={selectedOption}
                              onChange={(e) => setSelectedOption(e.target.value)}
                              className="bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                            >
                              <option value="">-- Choose a Package --</option>
                              {(packages ?? []).map(p => (
                                <option key={p.id} value={p.id}>{p.name} — ${p.price}</option>
                              ))}
                            </select>
                          )}
                          {serviceCategory === 'courses' && (
                            <select
                              value={selectedOption}
                              onChange={(e) => setSelectedOption(e.target.value)}
                              className="bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                            >
                              <option value="">-- Choose a Course --</option>
                              {(courses ?? []).map(c => (
                                <option key={c.id} value={c.id}>{c.name} — ${c.price}</option>
                              ))}
                            </select>
                          )}
                          {serviceCategory === 'services' && (
                            <select
                              value={selectedOption}
                              onChange={(e) => setSelectedOption(e.target.value)}
                              className="bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                            >
                              <option value="">-- Choose a Service --</option>
                              {(services ?? []).map(s => (
                                <option key={s.id} value={s.id}>{s.title} — {s.price}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs text-muted-foreground font-semibold">Special Requests or Medical Disclosures</label>
                      <textarea
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="E.g., Dietary requirements for onboard buffet, medical history, preferred gear sizes..."
                        className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={isSubmitting} className="btn-premium-primary w-full py-3.5 text-sm font-semibold uppercase tracking-widest">
                      {isSubmitting ? 'Submitting...' : 'Request a Booking'}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Right Column: Policies & Trust Information */}
            <div className="space-y-6 text-left">
              {/* Trust Badge */}
              <div className="glass-panel p-6 space-y-4">
                <h3 className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> Safety & Trust Standards
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  As an elite SDI/TDI 5-Star Dive Facility, we operate under the absolute highest safety protocols. All equipment undergoes daily inspection, and our custom vessel is fitted with medical oxygen, radar, and full VHF marine telemetry.
                </p>
                <div className="flex flex-col gap-2.5 text-xs text-foreground/80 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Secure 256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Free Booking Modifications via Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>No Hidden Environmental Taxes</span>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="glass-panel p-6 space-y-3 border-amber-500/20 bg-amber-500/5">
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4.5 h-4.5" /> Cancellation Policy
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We understand travel plans can shift. Our cancellation guidelines are:
                </p>
                <ul className="space-y-1.5 text-xs text-muted-foreground list-disc pl-4">
                  <li><strong className="text-foreground">48+ Hours Notice:</strong> 100% full refund or rescheduling.</li>
                  <li><strong className="text-foreground">24-48 Hours Notice:</strong> 50% refund.</li>
                  <li><strong className="text-foreground">Less than 24 Hours:</strong> Non-refundable (subject to medical exceptions).</li>
                </ul>
              </div>

              {/* FAQs accordion teaser */}
              <div className="glass-panel p-6 space-y-3">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Need Booking Help?</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Have questions about medical clearances, certification mapping, or accommodation recommendations?
                </p>
                <a href="/faq" className="text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                  Read Reservation FAQs <HelpCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
