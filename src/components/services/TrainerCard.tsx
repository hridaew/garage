import { TrainerProfile } from "@/components/services/trainers-data";

interface TrainerCardProps {
  trainer: TrainerProfile;
  onOpen: (trainer: TrainerProfile) => void;
}

export default function TrainerCard({ trainer, onOpen }: TrainerCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(trainer)}
      className="group flex h-full w-full flex-col items-center border border-garage-border bg-white px-5 py-7 text-center transition-all hover:-translate-y-1 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-garage-lilac"
      aria-label={`Read more about ${trainer.name}`}
    >
      <div className="h-32 w-32 overflow-hidden rounded-full border border-garage-border bg-garage-panel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={trainer.image}
          alt={trainer.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="mt-5 type-h3 text-garage-black">{trainer.name}</h3>
      <p className="mt-2 type-label text-garage-blue">{trainer.role}</p>
      <span className="mt-4 text-sm font-semibold text-garage-gray transition-colors group-hover:text-garage-black">
        View Profile
      </span>
    </button>
  );
}
