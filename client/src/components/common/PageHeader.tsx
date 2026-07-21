interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Overrides the default `py-24` section padding (e.g. `py-20`). */
  paddingClassName?: string;
}

// The eyebrow + title + description block repeated at the top of every
// inner page (About, Contact, Courses, all 7 course detail pages, ...).
// Purely presentational — content always comes from props.
export function PageHeader({ eyebrow, title, description, paddingClassName = 'py-24' }: PageHeaderProps) {
  return (
    <section className={`relative border-b border-border ${paddingClassName}`}>
      <div className="container text-center max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-2 mb-4">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
