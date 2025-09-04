interface SongCardProps {
  title: string;
  meta: string;
  note: string;
  href?: string;
  aspectRatio?: 'square' | '4/3';
  placeholderText?: string;
}

export default function SongCard({
  title,
  meta,
  note,
  href = "#",
  aspectRatio = 'square',
  placeholderText = "fArt placeholder"
}: SongCardProps) {
  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/3]';

  return (
    <article className="border border-black/15">
      <div className={`${aspectClass} bg-neutral-50 border-b border-black/15 grid place-items-center`}>
        <div className="text-[11px] uppercase tracking-wide opacity-60">
          {placeholderText}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="text-[11px] uppercase tracking-wide opacity-60">
          {meta}
        </div>
        <h4 className="font-semibold leading-tight">{title}</h4>
        <p className="text-sm opacity-70">{note}</p>
        <a href={href} className="text-sm underline pt-2">
          Open
        </a>
      </div>
    </article>
  );
}