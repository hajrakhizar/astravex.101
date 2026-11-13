export interface MindBlownTrivia {
  id: string;
  badge: string;
  headline: string;
  statNumber: string;
  statLabel: string;
  fact: string;
  whyItMatters: string;
  iconName: string;
}

export const MIND_BLOWN_TRIVIA: MindBlownTrivia[] = [
  {
    id: 'mb-lasers',
    badge: 'STILL ACTIVE TODAY',
    headline: 'You Can Shoot Lasers at the Moon Right Now',
    statNumber: '2.56 sec',
    statLabel: 'Laser Round-Trip Time',
    fact: 'The corner-cube retroreflectors placed by Apollo 11, 14, and 15 require zero electricity. Scientists at McDonald Observatory in Texas fire high-powered green lasers at them to measure the distance between Earth and Moon down to millimeters!',
    whyItMatters: 'It proved the Moon is spiraling away from Earth at 3.8 cm (1.5 inches) per year—about the exact speed human fingernails grow!',
    iconName: 'Zap'
  },
  {
    id: 'mb-golf',
    badge: 'LUNAR AERODYNAMICS',
    headline: 'Alan Shepard\'s "Miles and Miles" Moon Shot',
    statNumber: '400 yards',
    statLabel: 'Estimated Real Drive',
    fact: 'On Apollo 14, astronaut Alan Shepard smuggled a modified 6-iron club head attached to a soil sampling handle and two golf balls. Because the Moon has no atmosphere and only 1/6th Earth gravity, there is zero air resistance (no drag)!',
    whyItMatters: 'Recent digital photographic analysis in 2021 proved the first ball flew 24 yards (into a crater), and the second flew roughly 40 yards—not quite miles, but in a pressurized spacesuit with one hand, it was a legendary physics demo.',
    iconName: 'Target'
  },
  {
    id: 'mb-family',
    badge: 'SPACE ARCHAEOLOGY',
    headline: 'A Family Photo Sitting on Lunar Soil Since 1972',
    statNumber: '-130°C to +120°C',
    statLabel: 'Thermal Swings',
    fact: 'Apollo 16 astronaut Charlie Duke dropped a laminated photo of himself, his wife Dorothy, and his two sons Charles and Thomas on the Moon\'s Descartes Highlands, where it has sat for over 50 years.',
    whyItMatters: 'Due to harsh unfiltered ultraviolet radiation, micro-meteoroid impacts, and wild 250-degree temperature swings, scientists believe the photo has been completely bleached pure white by the sun!',
    iconName: 'Image'
  },
  {
    id: 'mb-ingenuity',
    badge: 'MARTIAN AVIATION',
    headline: 'The Little Drone That Flew in 1% Atmosphere',
    statNumber: '72 flights',
    statLabel: 'Planned for only 5!',
    fact: 'Mars has an atmosphere less than 1% as dense as Earth\'s—the equivalent of flying at 100,000 feet on Earth! To get lift, Ingenuity\'s carbon-fiber blades had to spin at an insane 2,400 RPM (5x faster than a normal Earth helicopter).',
    whyItMatters: 'Ingenuity was meant as a 30-day technology demonstration with 5 flights. It ended up serving as an aerial scout for Perseverance for almost 3 years across 72 epic sorties before retiring on Mars!',
    iconName: 'Wind'
  },
  {
    id: 'mb-boots',
    badge: 'THE ROCKET EQUATION',
    headline: 'Why NASA Dumped 96 Bags of Human Waste & Boots',
    statNumber: '50 kg',
    statLabel: 'Ascent Weight Limit',
    fact: 'Before lifting off from the Moon, Neil Armstrong and Buzz Aldrin opened the hatch and threw out their heavy 38-kg life-support backpacks, overshoe moon boots, cameras, and waste bags. Why?',
    whyItMatters: 'Every kilogram left behind on the surface meant they could safely lift off with precious kilograms of lunar rock samples without risking running out of rocket propellant!',
    iconName: 'Scale'
  }
];

export interface PayloadItem {
  id: string;
  name: string;
  weightKg: number;
  scienceValue: number;
  category: 'rock_sample' | 'flight_gear' | 'commemorative' | 'trash';
  icon: string;
  description: string;
  nasaHistoricalChoice: 'kept_on_moon' | 'brought_to_earth';
  proTip: string;
}

export const PAYLOAD_ITEMS: PayloadItem[] = [
  {
    id: 'genesis-rock',
    name: 'Apollo 15 "Genesis Rock" Sample',
    weightKg: 8.5,
    scienceValue: 120,
    category: 'rock_sample',
    icon: 'Gem',
    description: '4.5-billion-year-old primordial anorthosite crust sample. Essential for understanding how the Moon solidified!',
    nasaHistoricalChoice: 'brought_to_earth',
    proTip: 'Must bring! Proved the magma ocean hypothesis.'
  },
  {
    id: 'deep-core-soil',
    name: 'Deep-Core Drill Soil Tubes',
    weightKg: 12.0,
    scienceValue: 95,
    category: 'rock_sample',
    icon: 'Layers',
    description: 'Layered regolith drilled from 3 meters deep, preserving ancient solar wind particles from billions of years ago.',
    nasaHistoricalChoice: 'brought_to_earth',
    proTip: 'Crucial for studying cosmic ray history.'
  },
  {
    id: 'basalt-rocks',
    name: 'Mare Imbrium Volcanic Basalt Rocks',
    weightKg: 14.5,
    scienceValue: 85,
    category: 'rock_sample',
    icon: 'Mountain',
    description: 'Heavy ancient volcanic lava rocks that filled the giant impact basins.',
    nasaHistoricalChoice: 'brought_to_earth',
    proTip: 'High scientific value for dating lunar volcanic activity.'
  },
  {
    id: 'film-magazines',
    name: 'Hasselblad 70mm Exposed Film Packs',
    weightKg: 2.2,
    scienceValue: 70,
    category: 'commemorative',
    icon: 'Camera',
    description: 'Contains high-resolution film photos of the lunar surface. The cameras themselves were tossed out!',
    nasaHistoricalChoice: 'brought_to_earth',
    proTip: 'Smart move: Only take the film roll, ditch the metal camera body!'
  },
  {
    id: 'camera-bodies',
    name: 'Hasselblad Heavy Aluminum Camera Bodies',
    weightKg: 6.0,
    scienceValue: 10,
    category: 'flight_gear',
    icon: 'Video',
    description: 'The cameras are made of heavy precision metal. If you take them, you lose weight for rocks.',
    nasaHistoricalChoice: 'kept_on_moon',
    proTip: 'Leave them on the Moon! You already have the film rolls.'
  },
  {
    id: 'plss-backpacks',
    name: 'Spacesuit PLSS Life Support Backpacks (x2)',
    weightKg: 38.0,
    scienceValue: 0,
    category: 'flight_gear',
    icon: 'Shield',
    description: 'Each backpack weighed 38 kg on Earth (6.3 kg on Moon). Once inside the cabin, astronauts breathe cabin oxygen.',
    nasaHistoricalChoice: 'kept_on_moon',
    proTip: 'DUMP THEM! Keeping these will instantly blow your ascent weight budget.'
  },
  {
    id: 'lunar-overshoes',
    name: 'Astronaut Lunar Overshoes & Gloves',
    weightKg: 4.8,
    scienceValue: 0,
    category: 'flight_gear',
    icon: 'Footprints',
    description: 'Heavy silicone and titanium mesh boots coated in razor-sharp abrasive lunar dust.',
    nasaHistoricalChoice: 'kept_on_moon',
    proTip: 'Jettison onto the porch! They take up volume and add unnecessary weight.'
  },
  {
    id: 'waste-jettison',
    name: 'Jettison Defecation & Urine Bags',
    weightKg: 6.5,
    scienceValue: -10,
    category: 'trash',
    icon: 'Trash2',
    description: 'Biological waste generated during the multi-day lunar stay. Neil & Buzz tossed 96 of these bags out the hatch.',
    nasaHistoricalChoice: 'kept_on_moon',
    proTip: 'Definitely leave behind! Biology experiments can study how microbes survive in vacuum later.'
  },
  {
    id: 'secret-golf-club',
    name: 'Alan Shepard\'s Modified 6-Iron Club',
    weightKg: 0.8,
    scienceValue: 25,
    category: 'commemorative',
    icon: 'Crosshair',
    description: 'Lightweight commemorative sports history artifact.',
    nasaHistoricalChoice: 'brought_to_earth',
    proTip: 'Shepard brought the club head back; the balls stayed on the Moon!'
  }
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  didYouKnow: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Why did Apollo astronauts toss their spacesuit backpacks and moon boots right outside the Lunar Module door before lifting off?',
    options: [
      'They were contaminated with alien space germs',
      'To save mass so they could lift off with heavy moon rocks without running out of fuel',
      'The boots melted from the extreme heat of the lunar daytime',
      'NASA ordered them to leave gear as a monument for alien visitors'
    ],
    correctIndex: 1,
    explanation: 'Correct! The Apollo rocket equation had razor-thin margins. Every kilogram of gear left on the Moon allowed them to carry precious samples of moon rocks and soil back to Earth.',
    didYouKnow: 'Apollo 17 brought back 110.5 kg (243.6 lbs) of lunar rocks because they dumped almost all non-essential gear!'
  },
  {
    id: 'q2',
    question: 'Scientists on Earth STILL shoot laser beams at Apollo 11 and 14 landing sites every month. What is the laser bouncing off of?',
    options: [
      'The shiny gold foil on the Lunar Module legs',
      'Corner-cube prism retroreflectors that need zero electricity to reflect light',
      'A solar-powered mirror beacon that rotates automatically',
      'The glass lens of Neil Armstrong\'s abandoned camera'
    ],
    correctIndex: 1,
    explanation: 'Spot on! The Lunar Laser Ranging retroreflectors are clusters of 100 quartz corner-cubes that bounce light straight back to Earth regardless of the incoming angle.',
    didYouKnow: 'This ongoing experiment proved that the Moon is moving away from Earth at 3.8 cm per year!'
  },
  {
    id: 'q3',
    question: 'Why did the Lunar Roving Vehicle ("Moon Buggy") use woven steel wire mesh tires instead of normal rubber tires like your family car?',
    options: [
      'Rubber tires would freeze, turn brittle, and explode in the vacuum of space (-130°C)',
      'Steel wire looked cooler in TV broadcasts back to Houston',
      'Rubber weighs 100 times more than steel in zero gravity',
      'Rubber tires would float away in the Moon\'s low gravity'
    ],
    correctIndex: 0,
    explanation: 'Exactly! In the extreme vacuum and temperature extremes of the Moon (-130°C to +120°C), pressurized rubber tires would burst or freeze solid into glass-like shards.',
    didYouKnow: 'The tires were made of zinc-coated steel wire mesh with titanium chevrons riveted on for grip!'
  },
  {
    id: 'q4',
    question: 'NASA\'s Ingenuity Mars Helicopter completed 72 flights on Mars. Why is flying a drone on Mars so ridiculously hard compared to Earth?',
    options: [
      'Mars gravity is 10 times stronger than Earth',
      'Mars atmosphere is less than 1% as thick as Earth, so there is almost no air for the blades to push against',
      'Solar storms constantly burn out the helicopter batteries',
      'The Martian dust sticks magnetically to the rotors and weighs it down'
    ],
    correctIndex: 1,
    explanation: 'Bullseye! Mars atmospheric pressure is equivalent to flying at 100,000 feet on Earth—higher than any commercial jet or helicopter has ever flown.',
    didYouKnow: 'Ingenuity\'s blades spun at 2,400 RPM—roughly five times faster than an Earth passenger helicopter!'
  },
  {
    id: 'q5',
    question: 'Under international space law (The Outer Space Treaty), what happens if a private commercial space tourist lands at Tranquility Base?',
    options: [
      'They can legally claim the Apollo 11 descent stage and sell it on eBay',
      'NASA will send space police to arrest them immediately',
      'Tranquility Base is designated protected human heritage; touching or disturbing the site violates international agreements',
      'Anyone who touches the lunar module automatically owns the Moon'
    ],
    correctIndex: 2,
    explanation: 'Right on! NASA recommendations and the One Small Step Act establish a 75-100 meter buffer zone to protect historic artifacts and Neil Armstrong\'s bootprints from rocket blast damage.',
    didYouKnow: 'Space archaeology is now a recognized scientific field dedicated to preserving human history on other worlds!'
  }
];
