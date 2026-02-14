import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    fluid?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, fluid = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "w-full mx-auto px-4 sm:px-6 lg:px-8",
                    !fluid && "max-w-7xl",
                    className
                )}
                style={{ maxWidth: fluid ? '100%' : '1280px', margin: '0 auto', padding: '0 2rem' }} // Fallback/Basic styles since no Tailwind
                {...props}
            />
        );
    }
);
Container.displayName = "Container";

export { Container };
