import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  minutesToRead?: number;
  coverImageUrl?: string;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  date,
  minutesToRead,
  coverImageUrl,
}: BlogCardProps) {
  return (
    <Link href={`/fitnessblog/${slug}`} className="group block h-full">
      <article className="h-full overflow-hidden border border-garage-border bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-soft">
        {coverImageUrl ? (
          <div className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImageUrl}
              alt={title}
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : null}

        <div className="p-6">
          <div className="mb-3 flex items-center gap-2 text-xs text-garage-gray">
            <time>{date}</time>
            {minutesToRead ? (
              <>
                <span>&middot;</span>
                <span>{minutesToRead} min read</span>
              </>
            ) : null}
          </div>

          <h3 className="font-display text-2xl text-garage-black transition-colors group-hover:text-garage-blue">
            {title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-garage-gray">
            {excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-garage-blue">
            Read more
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
