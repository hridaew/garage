"use client";

import { useState } from "react";
import TrainerCard from "@/components/services/TrainerCard";
import TrainerModal from "@/components/services/TrainerModal";
import { TrainerProfile, trainers } from "@/components/services/trainers-data";

export default function TrainerGrid() {
  const [activeTrainer, setActiveTrainer] = useState<TrainerProfile | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} onOpen={setActiveTrainer} />
        ))}
      </div>
      <TrainerModal trainer={activeTrainer} onClose={() => setActiveTrainer(null)} />
    </>
  );
}
