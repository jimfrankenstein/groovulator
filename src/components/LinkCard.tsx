import Link from 'next/link';

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
  aspectRatio?: 'square' | '4/3';
}

export default function LinkCard({
  title,
  description,
  href,
  isExternal = false,
  aspectRatio = 'square'
}: LinkCardProps) {
  const linkProps = isExternal ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  const LinkComponent = isExternal ? 'a' : Link;

  return (
    <LinkComponent 
      href={href} 
      {...linkProps}
      className="block border border-black/15 dark:border-white/15 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-shadow"
    >
      <div className="flex h-24">
        <div className="w-24 h-24 bg-neutral-50 dark:bg-neutral-800 border-r border-black/15 dark:border-white/15 flex items-center justify-center flex-shrink-0">
          <div className="text-[11px] uppercase tracking-wide opacity-60 text-center px-2">
            {title}
          </div>
        </div>
        <div className="flex-1 h-24 p-4 flex flex-col justify-center gap-1">
          <h4 className="font-semibold leading-tight">{title}</h4>
          <p className="text-sm opacity-70">{description}</p>
          <div className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Open →
          </div>
        </div>
      </div>
    </LinkComponent>
  );
}