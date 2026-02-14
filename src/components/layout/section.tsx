import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLSectionElement> {
    variant?: 'default' | 'alternate';
}

const Section = forwardRef<HTMLSectionElement, SectionProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn(
                    "py-16 md:py-24",
                    variant === 'alternate' && "bg-gray-100", // Fallback class, likely need global css for this
                    className
                )}
                style={{ padding: '4rem 0', position: 'relative' }}
                {...props}
            />
        );
    }
);
Section.displayName = "Section";

export { Section };
