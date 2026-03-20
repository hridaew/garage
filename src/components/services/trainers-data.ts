export interface TrainerProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  certs: string;
  objectPosition?: string;
}

// Snapshot of live roster copy from garage1880.com/about-us on February 12, 2026.
export const trainers: TrainerProfile[] = [
  {
    id: "veronica-attanasio",
    name: "Veronica Attanasio",
    role: "Personal Training Director",
    image: "/images/trainers/veronica.jpg",
    bio: "Veronica specializes in muscular endurance, strength, and hypertrophy training. Originally from Miami, FL, Veronica trained at Equinox as a Tier3+ trainer. Veronica's favorite part of strength training is when her clients realize how rewarding and fun weightlifting can be. Regeneration is just as important to the human body as is strength training. She will make sure you're getting sufficient enough rest, sleep, and nutrition to hit your goals. On her days off, you can find her at the gym, local brewery, reading, or most likely taking a nap.",
    certs: "AFPA, NASM, PNL1, PPSC, FKT, AED, CPR",
    objectPosition: "top",
  },
  {
    id: "rebekah-mclain",
    name: "Rebekah Mclain",
    role: "Lead Trainer",
    image: "/images/trainers/rebekah.jpg",
    bio: "With nearly ten years of experience, Rebekah specializes in strength and hypertrophy training. She also has experience helping endurance athletes optimize their gym workouts. Rebekah is all about cheering on the little victories and making sure you realize just how capable you truly are. She's not just about creating healthy habits; she's all about helping you make real, lasting changes. Rebekah will be your guide to becoming the strongest, fittest version of yourself! In her free time, she enjoys being at the gym, running, reading, or netflix and chilling.",
    certs: "PNL1, AFPA, Strength & Conditioning Specialist, LPSC, AED, CPR",
  },
  {
    id: "allie",
    name: "Allie",
    role: "Trainer",
    image: "/images/trainers/allie.jpg",
    bio: "Allie is a dedicated fitness trainer focused on empowering women through strength training. She found her passion when she sought to debunk wellness misinformation online. Shifting away from quick fixes and weight-centered goals, she discovered sustainable practices that led to both improved well-being and physical results. Now, Allie helps women move beyond appearance-focused fitness and emphasizes positive relationships with food and exercise. Specializing in women's strength, pre and post-natal, and mobility training, she aims to inspire confidence and resilience in her clients.",
    certs: "AFPA, NASM, PNL1, AED, CPR",
    objectPosition: "top",
  },
  {
    id: "lillie",
    name: "Lillie",
    role: "Trainer",
    image: "/images/trainers/Lillie.jpg",
    bio: "Lillie, originally from Louisiana, holds a degree in kinesiology and is a former pilates instructor who has a deep passion for health and fitness. She is dedicated to inspiring others to become the healthiest versions of themselves and to embrace the journey towards their goals. Lillie excels at meeting clients where they are and guiding them to achieve their personal best. When she's not at the gym, you might find her enjoying the outdoors, hiking, cooking, attending concerts, or traveling!",
    certs: "AFPA, NASM, AED, CPR, Holistic Health Coach",
  },
  {
    id: "walter",
    name: "Walter",
    role: "Trainer",
    image: "/images/trainers/Walter (2).jpeg",
    bio: "Originally from Bakersfield, California, Walter attended Ripon College in Wisconsin, where he played football for five years. During his time at Ripon, he achieved a Midwest Conference Championship in the 2023 season. He earned a bachelor's degree in Human Performance with minors in Coaching and Strength and Conditioning. After college, Walter returned to Bakersfield to obtain his NSCA personal training certification in July. Walter is deeply passionate about sports and physical fitness and is committed to helping others achieve their goals.",
    certs: "NSCA, FKT, AED, CPR, Coaching & Strength & Conditioning",
    objectPosition: "top",
  },
  {
    id: "madison",
    name: "Madison (Madi)",
    role: "Trainer",
    image: "/images/trainers/madison.jpg",
    bio: "Madi, originally from Texas, attended Stephen F. Austin State University where she earned her degree in Kinesiology. She has a passion for functional fitness and loves helping others move more easily and confidently in their day-to-day lives. Madi believes that lasting success in the gym isn't just about working hard—it's about learning to enjoy the process. When you can do both, healthy habits become sustainable. In her free time, you can find Madi in the gym, out for a run, or spending time with her dogs.",
    certs: "Kinesiology B.S., CrossFit Level 2 Trainer, AED, CPR",
  },
  {
    id: "derrick",
    name: "Derrick",
    role: "Trainer",
    image: "/images/trainers/derrick.jpg",
    bio: "Derrick specializes in strength and hypertrophy training and is passionate about helping clients build confidence through movement. His own journey with past injuries and chronic discomfort has shaped his belief in the power of resistance training to improve strength, function, and overall well-being. Derrick is committed to creating safe, effective programs that support clients in moving better and feeling stronger in their daily lives. Outside the gym, you'll find Derrick hiking, playing basketball, cooking with friends, or relaxing with a good Netflix series.",
    certs: "PNL1, NASM, AED, CPR",
  },
];
