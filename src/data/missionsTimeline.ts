import { MissionMilestone } from '../types';

export const MISSION_TIMELINE: MissionMilestone[] = [
  {
    id: 'apollo-11',
    year: 1969,
    date: 'July 20, 1969',
    title: 'Apollo 11 — First Human Footsteps',
    mission: 'Apollo 11',
    celestialBody: 'Moon',
    brief: 'Neil Armstrong and Buzz Aldrin set foot upon Tranquility Base, leaving the descent stage of LM Eagle, commemorative plaque, silicon goodwill disc, solar wind composition experiment, and laser retroreflector.',
    keyArtifactsLeft: [
      'Lunar Module Eagle Descent Stage',
      'Laser Ranging Retroreflector (LRRR)',
      'Commemorative Plaque ("We Came in Peace")',
      'Silicon Goodwill Disc with 73 world leaders\' messages',
      'Discarded Hasselblad Cameras & PLSS backpacks'
    ],
    historicalAchievement: 'First manned landing on another celestial body in human history.',
    crewOrPrincipal: 'Neil Armstrong, Buzz Aldrin, Michael Collins',
    coordinates: '0°40\'26" N, 23°28\'22" E (Tranquility Base)',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'apollo-15',
    year: 1971,
    date: 'July 30, 1971',
    title: 'Apollo 15 — Wheels on the Moon & Hadley Rille',
    mission: 'Apollo 15',
    celestialBody: 'Moon',
    brief: 'The first "J-mission" with extended scientific stay and the debut of the Lunar Roving Vehicle. Astronauts David Scott and James Irwin drove 27.9 km and discovered the primordial Genesis Rock.',
    keyArtifactsLeft: [
      'Lunar Roving Vehicle (LRV-001)',
      'Lunar Module Falcon Descent Stage',
      'Fallen Astronaut Memorial Statuette & Plaque',
      'ALSEP Nuclear Station & Heat Flow Probes',
      'Laser Ranging Retroreflector (300 corner cubes)'
    ],
    historicalAchievement: 'First automobile driven on extraterrestrial soil, expanding exploration radius tenfold.',
    crewOrPrincipal: 'David Scott, James Irwin, Alfred Worden',
    coordinates: '26°07\'56" N, 3°38\'02" E (Hadley-Apennine)',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'apollo-17',
    year: 1972,
    date: 'December 11, 1972',
    title: 'Apollo 17 — The Last Human Footprints of the 20th Century',
    mission: 'Apollo 17',
    celestialBody: 'Moon',
    brief: 'Eugene Cernan and professional geologist Harrison Schmitt conducted the longest lunar surface stay (75 hours) and recovered orange volcanic soil at Shorty Crater.',
    keyArtifactsLeft: [
      'Lunar Roving Vehicle (LRV-003 with taped duct-tape fender map repair!)',
      'Challenger Descent Stage',
      'Taurus-Littrow ALSEP Station',
      'Lunar Atmospheric Composition Experiment (LACE)',
      'Apollo 17 Goodwill Rock plinth base'
    ],
    historicalAchievement: 'Longest total lunar EVA duration (22 hrs 4 min) and largest returned sample mass (110.5 kg).',
    crewOrPrincipal: 'Eugene Cernan, Harrison Schmitt, Ronald Evans',
    coordinates: '20°11\'27" N, 30°46\'18" E (Taurus-Littrow)',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'viking-1',
    year: 1976,
    date: 'July 20, 1976',
    title: 'Viking 1 — The Red Planet Pioneer',
    mission: 'Viking 1',
    celestialBody: 'Mars',
    brief: 'Touched down in Chryse Planitia and transmitted humanity\'s first clear panoramic photographs of Mars\' rocky orange surface, testing soil samples for signs of carbon and biological metabolism.',
    keyArtifactsLeft: [
      'Viking 1 Lander Chassis & RTGs',
      'Aeroshell & Heat Shield Debris',
      'Parachute Canopy and Jettison Hardware',
      'Surface Sampler Robotic Trenching Arm'
    ],
    historicalAchievement: 'First successful American landing and continuous multi-year surface mission on Mars.',
    crewOrPrincipal: 'NASA Langley / JPL Project Directorate',
    coordinates: '22°29\' N, 47°58\' W (Chryse Planitia)',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'mars-pathfinder',
    year: 1997,
    date: 'July 4, 1997',
    title: 'Mars Pathfinder & Sojourner — Mobility Unleashed',
    mission: 'Mars Pathfinder',
    celestialBody: 'Mars',
    brief: 'Landed using an airbag cocoon cushion, opening like a flower petal to release Sojourner—the first wheeled rover on Mars—which rolled down ramps onto ancient catastrophic flood deposits.',
    keyArtifactsLeft: [
      'Sojourner Microrover',
      'Carl Sagan Memorial Base Station Lander',
      'Airbag Cluster & Petal Assemblies',
      'Backshell & Parachute Impact Site'
    ],
    historicalAchievement: 'Proved the Rocker-Bogie kinematic suspension on alien terrain, pioneering mobile planetary robotics.',
    crewOrPrincipal: 'JPL Mars Exploration Program',
    coordinates: '19°20\' N, 33°33\' W (Ares Vallis)',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'mer-twins',
    year: 2004,
    date: 'January 2004',
    title: 'Spirit & Opportunity — Following the Water',
    mission: 'Mars Exploration Rovers',
    celestialBody: 'Mars',
    brief: 'Twin robotic geologists touched down on opposite sides of Mars. Designed for 90 days, Spirit explored Gusev Crater for 6 years and Opportunity drove a marathon 45 km over 14 years.',
    keyArtifactsLeft: [
      'Spirit Rover at Home Plate (Columbia Hills)',
      'Opportunity Rover at Perseverance Valley (Endeavour Crater)',
      'Twin Airbag Landers (Columbia Memorial & Challenger Memorial Stations)',
      'Heat Shield Impact Sites and Fragment Fields'
    ],
    historicalAchievement: 'Found hematite "blueberries" and hot-spring silica deposits proving past liquid water environments.',
    crewOrPrincipal: 'Steve Squyres (Principal Investigator), JPL',
    coordinates: 'Spirit: 14°34\' S, 175°28\' E | Opportunity: 2°17\' S, 5°14\' W',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'curiosity-msl',
    year: 2012,
    date: 'August 6, 2012',
    title: 'Curiosity — The Nuclear Mega-Lab & Sky Crane',
    mission: 'Mars Science Laboratory',
    celestialBody: 'Mars',
    brief: 'A 1-ton car-sized rover lowered onto the floor of Gale Crater by a rocket-powered Sky Crane tether system. Still climbing Mount Sharp today to read billions of years of sedimentary strata.',
    keyArtifactsLeft: [
      'Curiosity Rover (Currently Operational)',
      'Rocket Descent Stage (Sky Crane) Impact Site',
      'Supersonic Parachute & Backshell Debris',
      'Discarded Tungsten Balance Masses'
    ],
    historicalAchievement: 'Proved ancient Mars possessed habitable freshwater lakes, neutral pH water, and complex organic molecules.',
    crewOrPrincipal: 'JPL / NASA Science Mission Directorate',
    coordinates: '4°35\'22" S, 137°26\'30" E (Gale Crater)',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'perseverance-ingenuity',
    year: 2021,
    date: 'February 18, 2021',
    title: 'Perseverance & Ingenuity — The First Aerial Explorer',
    mission: 'Mars 2020',
    celestialBody: 'Mars',
    brief: 'Perseverance touched down in Jezero Crater to core rock samples and search for biosignatures, while deploying Ingenuity to achieve the first powered, controlled flight on another world.',
    keyArtifactsLeft: [
      'Perseverance Rover (Currently Operational)',
      'Ingenuity Mars Helicopter (Valinor Hills, 72 historic flights)',
      'Crumpled Backshell & Parachute Field (photographed by Ingenuity)',
      '10 Sealed Titanium Sample Tubes cached on the Jezero delta floor',
      'Sky Crane Descent Stage Impact Debris'
    ],
    historicalAchievement: 'First powered flight on another planet; first sample depot cached for interplanetary return.',
    crewOrPrincipal: 'JPL Mars 2020 Team / MiMi Aung (Ingenuity Lead)',
    coordinates: '18°26\'41" N, 77°27\'03" E (Jezero Crater)',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80'
  }
];
