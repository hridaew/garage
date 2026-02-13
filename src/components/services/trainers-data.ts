export interface TrainerProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  certs: string;
}

// Snapshot of live roster copy from garage1880.com/about-us on February 12, 2026.
export const trainers: TrainerProfile[] = [
  {
    id: "veronica-attanasio",
    name: "Veronica Attanasio",
    role: "Personal Training Director",
    image:
      "https://static.wixstatic.com/media/eefe7f_e9d32c00c2a04378a910101aa5653630~mv2.jpg/v1/fill/w_327,h_327,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/eefe7f_e9d32c00c2a04378a910101aa5653630~mv2.jpg",
    bio: "Veronica specializes in muscular endurance, strength, and hypertrophy training. Originally from Miami, FL, Veronica trained at Equinox as a Tier3+ trainer. Veronica's favorite part of strength training is when her clients realize how rewarding and fun weightlifting can be. Regeneration is just as important to the human body as is strength training. She will make sure you're getting sufficient enough rest, sleep, and nutrition to hit your goals. On her days off, you can find her at the gym, local brewery, reading, or most likely taking a nap.",
    certs: "AFPA, NASM, PNL1, PPSC, AED, CPR",
  },
  {
    id: "rebekah-mclain",
    name: "Rebekah Mclain",
    role: "Lead Trainer",
    image:
      "https://static.wixstatic.com/media/eefe7f_7cadeb014fa64b4fbc5c124e397f8770~mv2.jpeg/v1/fill/w_378,h_283,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7F401866-7211-46D2-85A2-37DE6F6CD684_1_102_o.jpeg",
    bio: "With nearly ten years of experience, Rebekah specializes in strength and hypertrophy training. She also has experience helping endurance athletes optimize their gym workouts. Rebekah is all about cheering on the little victories and making sure you realize just how capable you truly are. She's not just about creating healthy habits; she's all about helping you make real, lasting changes. Rebekah will be your guide to becoming the strongest, fittest version of yourself! In her free time, she enjoys being at the gym, running, reading, or netflix and chilling.",
    certs: "PNL1, AFPA, Strength & Conditioning Specialist, AED, CPR",
  },
  {
    id: "aaron-earley",
    name: "Aaron Earley",
    role: "Trainer",
    image:
      "https://static.wixstatic.com/media/eefe7f_3e78febcaf414c838b5d5031326834e9~mv2.jpg/v1/fill/w_352,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC00150_edited.jpg",
    bio: "Aaron brings an emphasis in movement based training, specializing in functional workouts to improve athletic performance for everyday life and reducing risk of injury. Transitioning from a career in social work, Aaron aspires to create an approachable, judgement free space where clients can feel empowered to challenge themselves and reach their fitness goals. In his free time, Aaron enjoys adventuring in the mountains, live music, and as a Kansas City transplant, celebrating Super Bowls (Sorry, Broncos' fans).",
    certs: "NASM, AED, CPR",
  },
  {
    id: "lillie",
    name: "Lillie",
    role: "Trainer",
    image:
      "https://static.wixstatic.com/media/614088_077e72150ea94b7db0f6da9059fa6f54~mv2.jpg/v1/fill/w_378,h_283,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/_edited.jpg",
    bio: "Lillie, originally from Louisiana, holds a degree in kinesiology and is a former pilates instructor who has a deep passion for health and fitness. She is dedicated to inspiring others to become the healthiest versions of themselves and to embrace the journey towards their goals. Lillie excels at meeting clients where they are and guiding them to achieve their personal best. When she's not at the gym, you might find her enjoying the outdoors, hiking, cooking, attending concerts, or traveling!",
    certs: "NASM, AED, CPR, Holistic Health Coach",
  },
  {
    id: "walter",
    name: "Walter",
    role: "Trainer",
    image:
      "https://static.wixstatic.com/media/eefe7f_b0f6686c427d4573afd01f73cef3c512~mv2.jpg/v1/fill/w_352,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Walter_edited_edited_edited_edited.jpg",
    bio: "Originally from Bakersfield, California, Walter attended Ripon College in Wisconsin, where he played football for five years. During his time at Ripon, he achieved a Midwest Conference Championship in the 2023 season. He earned a bachelor's degree in Human Performance with minors in Coaching and Strength and Conditioning. After college, Walter returned to Bakersfield to obtain his NSCA personal training certification in July. Walter is deeply passionate about sports and physical fitness and is committed to helping others achieve their goals.",
    certs: "NSCA, Coaching & Strength & Conditioning",
  },
  {
    id: "joan",
    name: "Joan",
    role: "Trainer",
    image:
      "https://static.wixstatic.com/media/614088_f0c6cd86d63b4faab57779d01f3e65d7~mv2.jpg/v1/fill/w_378,h_283,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Jaon%20Personal%20Trainer%20Denver.jpg",
    bio: "Joan's fitness journey began as a competitive gymnast and evolved into a passion for health and wellness. She took up weightlifting seven years ago, initially to support her mental wellbeing during a challenging time. Over the years, it has transformed her mind, health, and confidence. Joan champions a sustainable, holistic approach to fitness, steering clear of industry gimmicks and quick fixes. Outside the gym, Joan loves exploring new restaurants, enjoying live music, and reconnecting with her gymnastics roots through aerial dancing. She's also an outdoor enthusiast, whether relaxing in the park with friends or soaking in nature's beauty.",
    certs: "NASM, AED, CPR",
  },
  {
    id: "derrick",
    name: "Derrick",
    role: "Trainer",
    image:
      "https://static.wixstatic.com/media/eefe7f_60d52205fe324921b320311b6d9c88a4~mv2.png/v1/crop/x_0,y_733,w_3023,h_2263/fill/w_378,h_283,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9F765952-3495-4CDE-8408-76A91A4AEF9A_1_201_a_heic.png",
    bio: "Derrick specializes in strength and hypertrophy training and is passionate about helping clients build confidence through movement. His own journey with past injuries and chronic discomfort has shaped his belief in the power of resistance training to improve strength, function, and overall well-being. Derrick is committed to creating safe, effective programs that support clients in moving better and feeling stronger in their daily lives. Outside the gym, you'll find Derrick hiking, playing basketball, cooking with friends, or relaxing with a good Netflix series.",
    certs: "NASM, AED, CPR",
  },
];
