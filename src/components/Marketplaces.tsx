type Props = { className?: string; productName?: string };

const links = [
  { name: "Flipkart", url: "#", color: "#2874f0" },
  { name: "Amazon", url: "#", color: "#ff9900" },
  { name: "Meesho", url: "#", color: "#9f2089" },
];

export function Marketplaces({ className = "", productName }: Props) {
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
        Also available on
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy ${productName ?? "shoe"} on ${l.name}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-full text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: l.color }}
              aria-hidden
            />
            {l.name}
          </a>
        ))}
      </div>
    </div>
  );
}
