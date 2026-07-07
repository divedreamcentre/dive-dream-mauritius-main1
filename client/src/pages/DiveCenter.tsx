import React from 'react';
import Layout from '@/components/Layout';
import { MapPin, CheckCircle2, Compass } from 'lucide-react';
import { useDiveCenterPage } from '@/hooks/useDiveCenterPage';
import { combineAsyncStates } from '@/hooks/useAsyncData';
import { PageLoader, PageError } from '@/components/common';

export default function DiveCenter() {
  const pageResult = useDiveCenterPage();
  const { data: page } = pageResult;

  const { isLoading, error } = combineAsyncStates(pageResult);
  if (isLoading) return <PageLoader />;
  if (error || !page) return <PageError />;

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-24 border-b border-border">
        <div className="container text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.hero.eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-2 mb-4">{page.hero.title}</h1>
          <p className="text-muted-foreground">
            {page.hero.description}
          </p>
        </div>
      </section>

      {/* Facility Showcase - Virtual Tour style */}
      <section className="py-24">
        <div className="container max-w-5xl space-y-16">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.tourSection.eyebrow}</span>
            <h2 className="text-3xl font-serif font-bold text-foreground mt-2">{page.tourSection.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              {page.tourSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {page.facilityAreas.map((area) => (
              <div key={area.id} className="glass-panel overflow-hidden group flex flex-col h-full">
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-6 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Premium Standard Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-24 bg-secondary/40">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Location Details */}
            <div className="text-left space-y-6 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.locationSection.eyebrow}</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">{page.locationSection.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {page.locationSection.description}
              </p>

              <div className="space-y-4 text-xs text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block text-sm mb-0.5">Physical Address</strong>
                    <span>{page.locationSection.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block text-sm mb-0.5">Parking & Valet</strong>
                    <span>{page.locationSection.parkingNote}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glass-panel overflow-hidden min-h-[350px] relative bg-secondary">
              <iframe
                src={page.mapEmbedUrl}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dive Dream Divers Location"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
