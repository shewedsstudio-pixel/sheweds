import { Container } from '@/components/ui/Container';
import { TypographyConfig, getTypographyClasses, getTypographyStyles } from '@/lib/typography';
import { cn } from '@/components/ui/Button';

interface RichTextProps {
    title?: string;
    titleStyle?: TypographyConfig;
    content?: string;
    align?: 'left' | 'center' | 'right';
    backgroundColor?: string;
}

export const RichText = ({
    title = "Talk about your brand",
    titleStyle,
    content = "Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.",
    align = 'center',
    backgroundColor = 'white'
}: RichTextProps) => {
    return (
        <section className={cn(
            "py-16",
            backgroundColor === 'cream' ? 'bg-[#FEF8E6]' : 'bg-white'
        )}>
            <Container>
                <div className={cn(
                    "max-w-3xl mx-auto",
                    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                )}>
                    {title && (
                        <h2
                            className={cn(
                                "font-serif mb-6",
                                getTypographyClasses(titleStyle) || "text-3xl text-[#3C1E10]"
                            )}
                            style={getTypographyStyles(titleStyle)}
                        >
                            {title}
                        </h2>
                    )}
                    {content && (
                        <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {content}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};
