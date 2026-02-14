import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverable = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(styles.card, hoverable && styles.hoverable, className)}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card };
