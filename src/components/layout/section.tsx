import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    variant?: 'default' | 'alternate';
}

const Section = forwardRef<HTMLElement, SectionProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn(
                    "py-16 md:py-24",
                    variant === 'alternate' && "bg-gray-100",
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
