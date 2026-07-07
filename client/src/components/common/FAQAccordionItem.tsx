import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQItem } from '@/types';

interface FAQAccordionItemProps {
  faq: FAQItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export function FAQAccordionItem({ faq, isExpanded, onToggle }: FAQAccordionItemProps) {
  return (
    <div className={`glass-panel overflow-hidden transition-all duration-300 ${isExpanded ? 'border-primary/40 shadow-lg shadow-primary/5' : ''}`}>
      <button onClick={onToggle} className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer">
        <h3 className="text-base md:text-lg font-serif font-bold text-foreground flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-primary shrink-0" />
          {faq.question}
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-primary shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-0 border-t border-border animate-fadeIn">
          <p className="text-sm text-muted-foreground leading-relaxed pl-8 pt-4">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}
