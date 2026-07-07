interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** 'lg' = Home.tsx-style large sections; 'md' = the more compact inner-page style. */
  size?: 'md' | 'lg';
  align?: 'center' | 'left';
  /** Extra classes applied to the description paragraph (e.g. `mb-16` for spacing before the next block). */
  descriptionClassName?: string;
}

// The eyebrow + h2 + description pattern repeated at the top of nearly
// every content section across the site. Purely presentational.
export function SectionHeading({
  eyebrow,
  title,
  description,
  size = 'lg',
  align = 'center',
  descriptionClassName = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const titleClass =
    size === 'lg'
      ? 'text-3xl md:text-5xl font-serif mt-2 mb-4 text-foreground'
      : 'text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-3';
  const descriptionWidthClass = align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl';

  return (
    <div className={alignClass}>
      {eyebrow && <span className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</span>}
      <h2 className={titleClass}>{title}</h2>
      {description && (
        <p className={`text-muted-foreground ${descriptionWidthClass} ${descriptionClassName}`}>{description}</p>
      )}
    </div>
  );
}
