import React from 'react';
import Layout from '@/components/Layout';
import { useServices } from '@/hooks/useServices';
import { useServicesPage } from '@/hooks/useServicesPage';
import { combineAsyncStates } from '@/hooks/useAsyncData';
import { ServiceCard, PageLoader, PageError } from '@/components/common';

export default function Services() {
  const servicesResult = useServices();
  const pageResult = useServicesPage();
  const { data: services } = servicesResult;
  const { data: page } = pageResult;

  const { isLoading, error } = combineAsyncStates(servicesResult, pageResult);
  if (isLoading) return <PageLoader />;
  if (error || !services || !page) return <PageError />;

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

      {/* Services Grid */}
      <section className="py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="full" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
