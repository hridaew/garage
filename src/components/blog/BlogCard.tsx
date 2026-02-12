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
    <Link href={`/fitnessblog/${slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 h-full flex flex-col">
        {coverImageUrl && (
          <div className="img-hover-zoom aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImageUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-sm text-garage-gray mb-3">
            <time>{date}</time>
            {minutesToRead && (
              <>
                <span>&middot;</span>
                <span>{minutesToRead} min read</span>
              </>
            )}
          </div>
          <h3 className="text-lg font-semibold text-garage-black group-hover:text-garage-blue transition-colors mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-garage-gray text-sm line-clamp-3 flex-1">
            {excerpt}
          </p>
          <span className="text-garage-blue text-sm font-medium mt-4 inline-flex items-center gap-1">
            Read more
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
