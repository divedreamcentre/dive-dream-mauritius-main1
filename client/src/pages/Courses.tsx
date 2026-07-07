import Layout from '@/components/Layout';
import { Globe, BookOpen, Waves, Award, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useCoursesPage } from '@/hooks/useCoursesPage';
import { combineAsyncStates } from '@/hooks/useAsyncData';
import { CourseCard, PageLoader, PageError } from '@/components/common';

export default function Courses() {
  const pageResult = useCoursesPage();
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

      {/* Languages Offered */}
      <section className="py-20 border-b border-border">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">{page.languagesSection.title}</h2>
          </div>
          <p className="text-muted-foreground mb-8">{page.languagesSection.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.languagesSection.languages.map((lang) => (
              <div key={lang} className="glass-panel p-6 text-center">
                <p className="text-xl font-semibold text-foreground">{lang}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Courses */}
      <section className="py-20 border-b border-border">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-12">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">{page.coreCoursesHeading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {page.coreCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Courses */}
      <section className="py-20 border-b border-border">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">{page.specialtyCoursesHeading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {page.specialtyCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Courses */}
      <section className="py-20 border-b border-border">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-12">
            <Waves className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">{page.additionalCoursesHeading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {page.additionalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Training Dives */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-12">
            <Waves className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">{page.specialtyDivesHeading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.specialtyDives.map((dive) => (
              <div key={dive.name} className="glass-panel p-8 text-center hover:border-primary/40 transition-all duration-300">
                <div className="text-4xl mb-4">{dive.icon}</div>
                <p className="text-lg font-semibold text-foreground">{dive.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">{page.ctaSection.title}</h2>
          <p className="text-muted-foreground mb-8">
            {page.ctaSection.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservations" className="btn-premium-primary px-8 py-3 text-base">
              {page.ctaSection.primaryCtaLabel}
            </Link>
            <Link href="/contact" className="btn-premium-secondary px-8 py-3 text-base flex items-center justify-center gap-2">
              {page.ctaSection.secondaryCtaLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
