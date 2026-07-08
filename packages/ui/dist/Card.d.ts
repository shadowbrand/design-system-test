export interface CardProps {
    /** Heading text (rendered with the Heading type style). Defaults to "Card Title". */
    title?: string;
    /** Body copy (rendered with the Body type style). Defaults to "Card body text.". */
    body?: string;
    /** Call-to-action button label. Defaults to "Card CTA". */
    cta?: string;
    /** Click handler for the CTA button. */
    onCtaClick?: () => void;
}
export declare function Card({ title, body, cta, onCtaClick, }: CardProps): import("react").JSX.Element;
