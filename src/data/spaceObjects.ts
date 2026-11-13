import { SpaceObject } from '../types';

export const SPACE_OBJECTS: SpaceObject[] = [
  // =================== MOON OBJECTS ===================
  {
    id: 'lrv-apollo-15',
    name: 'Apollo Lunar Roving Vehicle (LRV-001)',
    subtitle: 'The First Manned Vehicle Driven on Another World',
    storyTitle: 'The Cosmic Dune Buggy',
    storyTagline: 'Parked at the canyon edge to film its own astronauts flying home',
    curiosityHook: 'Why did astronauts leave an electric car parked on the Moon?',
    narrativeStory: 'Imagine driving an open-top electric buggy across the dusty plains of the Moon! Astronauts Dave Scott and Jim Irwin loved driving it so much they called it their "grand prix." When it was time to head home, they parked it 300 feet away, pointed its color TV camera at the spaceship, and let mission control back on Earth film their rocket blasting back into space.',
    whyLeftBehindSimple: 'To bring 170 pounds of precious moon rocks home, every single ounce mattered. Leaving the 460-pound car behind gave them the fuel margin to safely lift off and escape the Moon\'s gravity.',
    funFact: 'Its tires have zero rubber! Normal rubber would freeze rock-hard and shatter like glass in the -130°C lunar night, so engineers wove the tires out of zinc-coated steel piano wire with titanium treads for grip.',
    whatNow: 'Standing quietly at the edge of Hadley Rille gorge, completely untouched by wind or rain, waiting for future astronauts to visit.',
    designation: 'NASA LRV-001 / Apollo 15 LRV',
    celestialBody: 'Moon',
    mission: 'Apollo 15',
    launchYear: 1971,
    arrivalYear: 1971,
    missionDurationDays: 3,
    originalPurpose: 'Vastly expanded astronaut exploration radius across Hadley Rille and the Apennine mountains, carrying scientific drills and rock samples.',
    whyLeftBehind: 'Mass margins on the Ascent Stage were razor-thin. The 210 kg rover was parked 300 feet away to broadcast liftoff on television and left permanently.',
    currentLocation: 'Hadley-Apennine, Mare Imbrium (Station 9/10 parking site)',
    coordinates: {
      lat: 26.1322,
      lng: 3.6339,
      latFormatted: '26°07\'56" N',
      lngFormatted: '3°38\'02" E',
      craterOrRegion: 'Hadley-Apennine / Mare Imbrium'
    },
    status: 'inactive',
    category: 'rover',
    massKg: 210,
    dimensions: '3.1 m long × 2.3 m wide × 1.1 m high',
    historicalSignificance: 'Driven for 27.9 km (17.3 miles), transforming lunar exploration from short walking tours into wide-ranging field geology.',
    scientificImpact: 'Allowed collection of the famous "Genesis Rock" (sample 15415, dating back 4.5 billion years), proving the magma ocean hypothesis.',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Apollo 15 Lunar Roving Vehicle parked near Hadley Rille with Mount Hadley in the background. (NASA photo AS15-88-11901)',
    has3DModel: true,
    modelKey: 'lrv',
    structuralHighlights: [
      {
        feature: 'Woven Piano-Wire Mesh Tires',
        description: 'Zinc-coated steel wire mesh with titanium chevron cleats for traction in sharp lunar dust.'
      },
      {
        feature: 'High-Gain Dish Antenna & Color TV',
        description: 'Captured the first live lunar liftoff broadcast directly to Earth television screens.'
      },
      {
        feature: 'Foldable Aluminum Chassis',
        description: 'Folded into a tight triangular bay on the lander and unfolded with lanyards on the Moon.'
      },
      {
        feature: 'Independent DC Traction Motors',
        description: 'Each wheel had its own 0.25-horsepower electric motor powered by 36-volt batteries.'
      }
    ],
    hotspots: [
      {
        id: 'hs-lrv-antenna',
        name: 'High-Gain Dish Antenna',
        description: 'Beamed live color video, voice, and telemetry directly back to Earth ground dishes.',
        position: [0.3, 1.2, 0.6]
      },
      {
        id: 'hs-lrv-wheels',
        name: 'Wire-Mesh Tires',
        description: 'Could not pop because there was no air inside. Flexible steel mesh soaked up lunar bumps.',
        position: [0.9, -0.2, 0.8]
      },
      {
        id: 'hs-lrv-joystick',
        name: 'T-Handle Joystick',
        description: 'Drives the rover like a video game controller—easy to use even with thick pressurized space gloves.',
        position: [0.0, 0.4, 0.0]
      },
      {
        id: 'hs-lrv-camera',
        name: 'Remote Controlled TV Camera',
        description: 'Operated by Edward Fendell at mission control in Houston, panning and zooming from 240,000 miles away.',
        position: [0.5, 0.8, 0.8]
      }
    ],
    sources: [
      {
        title: 'NASA Lunar Roving Vehicle Documentation',
        url: 'https://history.nasa.gov/SP-4214/ch8-4.html',
        org: 'NASA History Division'
      },
      {
        title: 'NSSDC Master Catalog: Apollo 15 LRV',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
        org: 'NASA Goddard'
      }
    ]
  },
  {
    id: 'apollo-11-descent-stage',
    name: 'Apollo 11 Lunar Module Descent Stage "Eagle"',
    subtitle: 'The Historic Foundation of Tranquility Base',
    storyTitle: 'The World\'s Loneliest Launchpad',
    storyTagline: 'The golden platform where humanity first touched another world',
    curiosityHook: 'Why is the bottom half of a spaceship standing all alone in the dust?',
    narrativeStory: 'The Apollo Moon lander was actually two spaceships stacked together! The bottom half had the landing legs, rocket engine, and the ladder where Neil Armstrong took his "one small step." When it was time to head home, the bottom half served as a launchpad, the top half blasted off, and this golden base stayed behind forever.',
    whyLeftBehindSimple: 'Splitting the spaceship in two meant astronauts didn\'t have to drag heavy landing legs and empty fuel tanks back into orbit. Leaving it behind saved thousands of pounds of rocket fuel.',
    funFact: 'Bolted to the front ladder is a stainless steel plaque signed by the astronauts and President Nixon with a timeless message: "Here men from the planet Earth first set foot upon the Moon. We came in peace for all mankind."',
    whatNow: 'Standing completely intact at Tranquility Base. Because the Moon has no wind, rain, or atmosphere, Neil Armstrong and Buzz Aldrin\'s bootprints around it are still stamped in the dust today.',
    designation: 'LM-5 Descent Stage',
    celestialBody: 'Moon',
    mission: 'Apollo 11',
    launchYear: 1969,
    arrivalYear: 1969,
    missionDurationDays: 1,
    originalPurpose: 'Carried the descent rocket engine, landing gear, water tanks, and the TV camera that beamed Neil Armstrong\'s first step to Earth.',
    whyLeftBehind: 'Designed specifically to serve as a launch pad. Once surface tasks were completed, the ascent cabin fired its rocket and blasted away.',
    currentLocation: 'Mare Tranquillitatis (Tranquility Base)',
    coordinates: {
      lat: 0.67408,
      lng: 23.47297,
      latFormatted: '0°40\'26.69" N',
      lngFormatted: '23°28\'22.69" E',
      craterOrRegion: 'Mare Tranquillitatis (Sea of Tranquility)'
    },
    status: 'inactive',
    category: 'lander_descent',
    massKg: 2034,
    dimensions: '4.22 m high × 9.4 m wide across landing gear pads',
    historicalSignificance: 'The very first human-made vehicle to touch down on another world with humans inside.',
    scientificImpact: 'Demonstrated controlled powered descent and precision landing on an extraterrestrial surface.',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The Apollo 11 Lunar Module Eagle descent stage standing alone on the lunar surface. (NASA photo AS11-40-5922)',
    has3DModel: true,
    modelKey: 'lunar_module',
    structuralHighlights: [
      {
        feature: 'Gold Kapton Thermal Blankets',
        description: 'Multi-layer metallic foils wrapped like a space thermos to deflect the brutal 120°C solar heat.'
      },
      {
        feature: 'Quad Crushable Honeycomb Landing Struts',
        description: 'Each footpad contained crushable aluminum honeycomb cartridges to soften the touchdown shock.'
      },
      {
        feature: 'Descent Rocket Engine Bell',
        description: 'A revolutionary throttleable rocket that decelerated the craft from orbital speeds down to zero.'
      },
      {
        feature: 'Apollo 11 Commemorative Plaque',
        description: 'Bolted to the ladder rungs: "We came in peace for all mankind."'
      }
    ],
    hotspots: [
      {
        id: 'hs-lm-plaque',
        name: 'Historic Plaque',
        description: 'Stainless steel plaque bearing maps of Earth and signatures of the Apollo 11 crew.',
        position: [0.0, 0.4, 1.1]
      },
      {
        id: 'hs-lm-engine',
        name: 'Descent Engine Bell',
        description: 'Fired downward to gently set the lander down onto the lunar dust without creating a crater.',
        position: [0.0, -0.6, 0.0]
      },
      {
        id: 'hs-lm-footpad',
        name: 'Dish Footpad with Contact Probe',
        description: '5-foot long wire probes hanging below the pads lit a blue "CONTACT LIGHT" in the cockpit.',
        position: [1.8, -1.0, 1.8]
      }
    ],
    sources: [
      {
        title: 'NASA Apollo 11 Lunar Module Documentation',
        url: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html',
        org: 'NASA'
      },
      {
        title: 'Smithsonian NASM: Lunar Module',
        url: 'https://airandspace.si.edu/collection-objects/lunar-module-2/nasm_A19711598000',
        org: 'Smithsonian'
      }
    ]
  },
  {
    id: 'lrrr-apollo-11',
    name: 'Apollo 11 Laser Ranging Retroreflector (LRRR)',
    subtitle: 'The Only Apollo Experiment Still Continuously Active Today',
    storyTitle: 'The Forever Mirror',
    storyTagline: 'Zero wires, zero batteries—still returning laser beams after 55 years',
    curiosityHook: 'Did you know you can bounce a laser beam off the Moon tonight?',
    narrativeStory: 'Before leaving the Moon, Buzz Aldrin placed a small suitcase-sized tray on the ground containing 100 quartz crystal reflectors. It has no batteries, no computer, and no moving parts. To this day, scientists in Texas and France shoot green laser pulses at it to measure the distance to the Moon down to the thickness of a coin!',
    whyLeftBehindSimple: 'It was designed to stay on the Moon forever! Because it needs zero electricity, it never runs out of power, making it the only Apollo science experiment still operating after 55+ years.',
    funFact: 'Thanks to this little mirror, scientists proved that the Moon is slowly spiraling away from Earth at 3.8 centimeters (1.5 inches) per year—about the exact speed your fingernails grow!',
    whatNow: 'Bouncing back laser pulses fired from Earth observatories every month, completely unaffected by space radiation.',
    designation: 'Apollo 11 EASEP Retroreflector Array',
    celestialBody: 'Moon',
    mission: 'Apollo 11',
    launchYear: 1969,
    arrivalYear: 1969,
    missionDurationDays: 'Ongoing (55+ Years Active)',
    originalPurpose: 'To reflect high-intensity laser pulses fired from Earth observatories, enabling millimeter-precision distance measurement.',
    whyLeftBehind: 'An entirely passive optical array requiring zero power. Designed to sit permanently on the lunar soil and withstand 250°C temperature swings.',
    currentLocation: 'Mare Tranquillitatis, ~14 meters south of the Eagle LM',
    coordinates: {
      lat: 0.67337,
      lng: 23.47306,
      latFormatted: '0°40\'24.13" N',
      lngFormatted: '23°28\'23.02" E',
      craterOrRegion: 'Tranquility Base'
    },
    status: 'operational',
    category: 'scientific_instrument',
    massKg: 29.5,
    dimensions: '0.46 m × 0.46 m aluminum pallet',
    historicalSignificance: 'Deployed by Buzz Aldrin on July 21, 1969. Continues returning data over 55 years later without a single degradation of its optical prisms.',
    scientificImpact: 'Proved the Moon is drifting away from Earth and verified Einstein\'s General Theory of Relativity to extreme precision.',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The Apollo 11 Laser Ranging Retroreflector deployed on the lunar regolith. (NASA photo AS11-40-5952)',
    has3DModel: true,
    modelKey: 'retroreflector',
    structuralHighlights: [
      {
        feature: '100 Corner-Cube Quartz Prisms',
        description: 'Special 90-degree internal angle mirrors that bounce light straight back to its sender, no matter the angle.'
      },
      {
        feature: 'Teflon-Insulated Invar Tray',
        description: 'Holds the prisms rigidly in place despite swinging from -170°C at night to +120°C in the sun.'
      },
      {
        feature: 'Sun Angle Gnomon Compass',
        description: 'A small shadow stick that allowed Aldrin to aim the reflector directly toward Earth.'
      }
    ],
    hotspots: [
      {
        id: 'hs-lrrr-cubes',
        name: 'Quartz Corner-Cube Prisms',
        description: 'Pure fused silica glass cubes. Light enters, bounces off three inner mirrors, and exits parallel to its entry path.',
        position: [0.0, 0.2, 0.0]
      },
      {
        id: 'hs-lrrr-gnomon',
        name: 'Sun Angle Gnomon',
        description: 'Cast a shadow against tick marks so the astronaut could point the face accurately toward planet Earth.',
        position: [0.35, 0.3, -0.35]
      }
    ],
    sources: [
      {
        title: 'NASA Science: Apollo Laser Ranging Experiment',
        url: 'https://science.nasa.gov/resource/apollo-laser-ranging-experiment/',
        org: 'NASA Science'
      },
      {
        title: 'McDonald Observatory Lunar Laser Ranging',
        url: 'https://mcdonaldobservatory.org/research/programs/lunar-laser-ranging',
        org: 'McDonald Observatory'
      }
    ]
  },
  {
    id: 'apollo-alsep-instruments',
    name: 'Apollo Lunar Surface Experiments Package (ALSEP)',
    subtitle: 'Nuclear-Powered Geophysics Station Left to Monitor Moonquakes',
    storyTitle: 'The Moonquake Detective',
    storyTagline: 'A nuclear-powered station that discovered the Moon rings like a bell',
    curiosityHook: 'Did you know the Moon rings like a bell during moonquakes?',
    narrativeStory: 'Apollo astronauts set up mini science stations powered by small nuclear batteries that generated heat and electricity for 8 straight years. These sensors detected over 12,000 moonquakes, meteor crashes, and even the thump of discarded rocket boosters intentionally crashed into the surface.',
    whyLeftBehindSimple: 'Built as automated permanent outposts to transmit radio signals back to Earth long after the astronauts flew home.',
    funFact: 'Because the Moon is completely dry and has no soft mud or oceans to absorb vibrations, major moonquakes caused the entire Moon to vibrate and "ring like a giant tuning fork" for hours!',
    whatNow: 'Resting silently—NASA turned off the radio receivers in 1977 to save money, but the sensors and nuclear generator remain in pristine condition.',
    designation: 'ALSEP Arrays (Apollo 12–17)',
    celestialBody: 'Moon',
    mission: 'Apollo 12–17',
    launchYear: 1969,
    arrivalYear: 1969,
    missionDurationDays: 2894,
    originalPurpose: 'To continuously measure lunar interior heat flow, moonquakes, solar wind, and magnetic fields.',
    whyLeftBehind: 'Designed as automated permanent observatories. Powered by plutonium-238 heat batteries, they sent data until receivers were switched off in 1977.',
    currentLocation: 'Multiple landing sites across Mare Cognitum, Hadley-Apennine, and Taurus-Littrow',
    coordinates: {
      lat: 20.1908,
      lng: 30.7717,
      latFormatted: '20°11\'27" N',
      lngFormatted: '30°46\'18" E',
      craterOrRegion: 'Taurus-Littrow (Apollo 17 Site)'
    },
    status: 'inactive',
    category: 'scientific_instrument',
    massKg: 135,
    historicalSignificance: 'Formed a planetological seismic network that recorded over 12,000 seismic events.',
    scientificImpact: 'Revealed that the Moon has a layered crust, a mantle, and a partially molten iron metallic core.',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Apollo 12 astronaut Alan Bean carrying the ALSEP package across Oceanus Procellarum. (NASA photo AS12-46-6813)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'SNAP-27 Radioisotope Generator',
        description: 'Decaying plutonium-238 produced 73 watts of electricity day and night without solar panels.'
      },
      {
        feature: 'Ultra-Sensitive Seismometer',
        description: 'Could detect vibrations as tiny as the thickness of a single atom.'
      }
    ],
    sources: [
      {
        title: 'NSSDC ALSEP Experiments Overview',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_alsep.html',
        org: 'NASA Goddard'
      }
    ]
  },
  {
    id: 'fallen-astronaut-memorial',
    name: 'The "Fallen Astronaut" Memorial & Plaque',
    subtitle: 'The Sole Work of Art and Solemn Tribute on Another Celestial Body',
    storyTitle: 'The Secret Lunar Tribute',
    storyTagline: 'A 3-inch aluminum hero honoring explorers from both sides of the Cold War',
    curiosityHook: 'Why is there a tiny 3-inch metal human lying in the lunar dust?',
    narrativeStory: 'During the tense Cold War space race, Apollo 15 Commander Dave Scott carried a tiny 3-inch aluminum statue made by Belgian artist Paul Van Hoeydonck. Before lifting off, Scott placed it in the dust next to a plaque listing 14 American astronauts and Soviet cosmonauts who had died exploring space.',
    whyLeftBehindSimple: 'Placed intentionally as a timeless, solemn memorial for brave explorers from all nations, meant to last forever in the quiet vacuum of space.',
    funFact: 'Commander Scott kept the memorial a complete secret until after returning to Earth so it wouldn\'t become a political distraction. Both American and Soviet heroes are listed side by side as equals.',
    whatNow: 'Lying peacefully in the lunar soil near the rim of Hadley Rille, exactly where Dave Scott placed it in August 1971.',
    designation: 'Apollo 15 Fallen Astronaut Memorial',
    celestialBody: 'Moon',
    mission: 'Apollo 15',
    launchYear: 1971,
    arrivalYear: 1971,
    originalPurpose: 'A quiet, solemn memorial commemorating 14 American astronauts and Soviet cosmonauts who lost their lives in the pursuit of space exploration.',
    whyLeftBehind: 'Intentionally placed on the lunar soil to remain in pristine perpetuity, free from wind, water, or terrestrial erosion.',
    currentLocation: 'Hadley-Apennine, near the rim of Hadley Rille',
    coordinates: {
      lat: 26.13,
      lng: 3.63,
      latFormatted: '26°07\'48" N',
      lngFormatted: '3°38\'00" E',
      craterOrRegion: 'Hadley Rille'
    },
    status: 'inactive',
    category: 'commemorative',
    massKg: 0.15,
    dimensions: '8.5 cm (3.3 in) tall statuette',
    historicalSignificance: 'Created by Paul Van Hoeydonck and placed on August 1, 1971, listing Yuri Gagarin, Gus Grissom, Vladimir Komarov, and 11 others.',
    scientificImpact: 'Represents humanity\'s cultural, artistic, and philosophical expansion into space, transcending geopolitical rivalry.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The Fallen Astronaut aluminum figurine placed in the lunar regolith at Hadley Rille. (NASA photo AS15-88-11893)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'Solid Cast Aluminum Figurine',
        description: 'Abstract spacesuit figure; lightweight and immune to solar UV radiation fading.'
      },
      {
        feature: 'Engraved Aluminum Plaque',
        description: 'Lists 14 fallen space explorers in alphabetical order.'
      }
    ],
    sources: [
      {
        title: 'NASA History: The Fallen Astronaut Monument',
        url: 'https://www.nasa.gov/feature/the-fallen-astronaut',
        org: 'NASA'
      }
    ]
  },
  {
    id: 'jettisoned-cameras-backpacks',
    name: 'Jettisoned Hasselblad Cameras & PLSS Backpacks',
    subtitle: 'The Calculated Weight-Sacrifice for Bringing Moon Rocks Home',
    storyTitle: 'The Great Weight Sacrifice',
    storyTagline: 'Why astronauts tossed million-dollar cameras out the front door like trash',
    curiosityHook: 'Why did Neil Armstrong toss his boots and camera into the dirt?',
    narrativeStory: 'Minutes before blasting off from the Moon, astronauts opened the door and literally tossed their heavy spacesuit backpacks, moon boots, and camera bodies onto the ground! It looked like trash, but it was a calculated trade: every single pound dumped meant they could carry home another pound of priceless Moon rocks.',
    whyLeftBehindSimple: 'The ascent rocket engine had a razor-thin fuel budget. If the lander was too heavy, they wouldn\'t have enough rocket fuel to reach orbit and meet the mother ship.',
    funFact: 'Astronauts popped off the film magazines with all their famous photos to keep, but threw the heavy metal camera bodies out the door! About 12 high-end Swedish Hasselblad cameras still sit in the dust today.',
    whatNow: 'Lying beneath Apollo landers, serving as an accidental 50-year test of how optical glass, lubricants, and fabrics survive harsh space vacuum.',
    designation: 'Apollo 11–17 Jettisoned Gear',
    celestialBody: 'Moon',
    mission: 'Apollo 11–17',
    launchYear: 1969,
    arrivalYear: 1969,
    originalPurpose: 'Precision cameras captured history; life-support backpacks supplied oxygen, cooling water, and radio during moonwalks.',
    whyLeftBehind: 'Strict mass limits forced astronauts to jettison camera bodies, backpacks, overshoes, and waste before ascent to accommodate 382 kg of rock samples.',
    currentLocation: 'Immediate perimeter around Apollo landing sites',
    coordinates: {
      lat: 0.674,
      lng: 23.473,
      latFormatted: '0°40\'26" N',
      lngFormatted: '23°28\'22" E',
      craterOrRegion: 'Tranquility Base & Subsequent Sites'
    },
    status: 'discarded_hardware',
    category: 'discarded_equipment',
    massKg: 180,
    historicalSignificance: 'Represents the stark physics of space exploration, where scientific samples were prized above expensive engineering hardware.',
    scientificImpact: 'Provides long-term data on how optical coatings, silicone seals, and metals endure 50+ years of solar radiation and micrometeoroids.',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'PLSS backpacks and gear tossed onto the regolith beneath the Lunar Module ladder. (NASA photo)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'Modified Hasselblad 500EL Cameras',
        description: 'Custom silver-coated bodies fitted with Zeiss lenses and crosshair grid plates.'
      },
      {
        feature: 'Hamilton Standard PLSS Backpacks',
        description: 'Contained oxygen tanks, ice sublimation cooling systems, and emergency radios.'
      }
    ],
    sources: [
      {
        title: 'NASA ALSJ: Jettisoning Equipment on the Moon',
        url: 'https://www.hq.nasa.gov/alsj/a11/a11.jettison.html',
        org: 'NASA ALSJ'
      }
    ]
  },
  {
    id: 'surveyor-3-hardware',
    name: 'Surveyor 3 Robotic Lander Hardware',
    subtitle: 'The Only Extraterrestrial Probe Visited and Examined by Later Humans',
    storyTitle: 'The Robot That Got a Visitor',
    storyTagline: 'The lonely probe that waited 2 years until human astronauts dropped by',
    curiosityHook: 'What happens when human astronauts walk up to a robotic probe on another world?',
    narrativeStory: 'In 1967, NASA landed an unmanned probe called Surveyor 3 to test if lunar dirt was solid enough for astronauts to walk on without sinking. Two years later, the crew of Apollo 12 pulled off a pinpoint landing just 500 feet away, walked over to the lonely robot, snapped photos, and used bolt cutters to bring its TV camera back to Earth!',
    whyLeftBehindSimple: 'Surveyor 3 was a one-way scout with no return engine. It finished its job once it proved the Moon had solid ground.',
    funFact: 'When scientists opened Surveyor\'s returned camera back on Earth, they found common bacteria from Earth inside the lens casing! It proved microbes could potentially survive sleeping in space vacuum for years.',
    whatNow: 'Standing inside Surveyor Crater on the Ocean of Storms, with astronaut footprints still stamped around its landing feet.',
    designation: 'Surveyor III Spacecraft',
    celestialBody: 'Moon',
    mission: 'Surveyor 3 / Apollo 12',
    launchYear: 1967,
    arrivalYear: 1967,
    missionDurationDays: 14,
    originalPurpose: 'Proved the lunar surface could support a manned lander without sinking into deep dust, and dug trenches with a robotic scoop.',
    whyLeftBehind: 'Stationary probe that ended operations in May 1967. Visited in November 1969 by Apollo 12 astronauts Pete Conrad and Alan Bean.',
    currentLocation: 'Oceanus Procellarum (Ocean of Storms)',
    coordinates: {
      lat: -3.015,
      lng: -23.418,
      latFormatted: '3°00\'54" S',
      lngFormatted: '23°25\'05" W',
      craterOrRegion: 'Surveyor Crater, Oceanus Procellarum'
    },
    status: 'inactive',
    category: 'lander_descent',
    massKg: 297,
    historicalSignificance: 'The only extraterrestrial robotic probe ever visited, inspected, and partially retrieved by human astronauts.',
    scientificImpact: 'Showed that spacecraft surfaces are sandblasted by lunar dust during nearby rocket landings, sparking modern planetary protection rules.',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Apollo 12 astronaut Pete Conrad examining the Surveyor 3 robotic lander. (NASA photo AS12-48-7134)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'Surface Sampler Robotic Scoop',
        description: 'Excavated 4 trenches up to 18 cm deep to measure lunar soil shear strength.'
      },
      {
        feature: 'Planar Solar Array Antenna',
        description: 'Generated 85 watts during the two-week lunar daytime.'
      }
    ],
    sources: [
      {
        title: 'NASA Analysis of Surveyor 3 Samples',
        url: 'https://curator.jsc.nasa.gov/lunar/surveyor.cfm',
        org: 'NASA Johnson Space Center'
      }
    ]
  },

  // =================== MARS OBJECTS ===================
  {
    id: 'sojourner-rover',
    name: 'Sojourner Mars Rover',
    subtitle: 'Humanity\'s First Robotic Wheels on the Red Planet',
    storyTitle: 'The Brave Little Microwave',
    storyTagline: 'The tiny 6-wheeled trailblazer that started humanity\'s driving spree on Mars',
    curiosityHook: 'How did a robot the size of a microwave oven conquer Mars?',
    narrativeStory: 'In 1997, Sojourner became the first wheeled vehicle ever to drive on Mars. It was tiny—about the size of a microwave oven and weighing only 25 pounds! It crept along at a top speed of 1 centimeter per second, rolling up to rocks with nicknames like "Barnacle Bill" and "Yogi" to sniff what minerals they were made of.',
    whyLeftBehindSimple: 'It was an experimental technology tester with no return propulsion. It explored for 83 days until its base station battery finally froze in the brutal Martian winter.',
    funFact: 'Sojourner used a special bendy "rocker-bogie" wheel suspension that let it climb over rocks bigger than its own wheels without flipping over. Every Mars rover since has copied this exact design!',
    whatNow: 'Resting frozen and silent in the Ares Vallis floodplain, surrounded by the rocks it analyzed.',
    designation: 'Mars Pathfinder Microrover / MESUR Pathfinder',
    celestialBody: 'Mars',
    mission: 'Mars Pathfinder',
    launchYear: 1996,
    arrivalYear: 1997,
    missionDurationDays: 83,
    originalPurpose: 'Demonstrated that low-cost mobile robotic exploration of Mars was feasible and analyzed rock chemistry with an onboard spectrometer.',
    whyLeftBehind: 'Pathfinder and Sojourner were solar-powered and had no return propulsion. On September 27, 1997, the base station battery expired.',
    currentLocation: 'Ares Vallis (Carl Sagan Memorial Station)',
    coordinates: {
      lat: 19.33,
      lng: -33.55,
      latFormatted: '19°20\' N',
      lngFormatted: '33°33\' W',
      craterOrRegion: 'Carl Sagan Memorial Station / Ares Vallis'
    },
    status: 'inactive',
    category: 'rover',
    massKg: 11.5,
    dimensions: '65 cm long × 48 cm wide × 30 cm high',
    historicalSignificance: 'The very first robotic rover to successfully drive on Mars. Named after civil rights abolitionist Sojourner Truth.',
    scientificImpact: 'Traveled 100 meters, took 550 photos, and proved that Ares Vallis had been shaped by catastrophic ancient megafloods of liquid water.',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Sojourner rover examining the rock named Yogi on the Martian surface. (NASA/JPL-Caltech photo)',
    has3DModel: true,
    modelKey: 'sojourner',
    structuralHighlights: [
      {
        feature: '6-Wheel Rocker-Bogie Suspension',
        description: 'Mechanical linkage that lets the wheels climb over tall boulders without tipping the body.'
      },
      {
        feature: 'Alpha Particle X-Ray Spectrometer (APXS)',
        description: 'Sensor head pressed against rocks to identify elemental chemistry.'
      },
      {
        feature: 'Gallium Arsenide Solar Array',
        description: 'Small roof panel producing 16 watts of peak power in bright Martian midday.'
      }
    ],
    hotspots: [
      {
        id: 'hs-sojourner-apxs',
        name: 'APXS Rock Sensor',
        description: 'Contact sensor placed against rocks to read elemental signatures.',
        position: [0.0, 0.2, -0.45]
      },
      {
        id: 'hs-sojourner-rocker',
        name: 'Rocker-Bogie Differential',
        description: 'Mechanical joint that keeps all six wheels firmly on the ground over rugged rocks.',
        position: [0.35, 0.1, 0.0]
      },
      {
        id: 'hs-sojourner-solar',
        name: 'Top Solar Panel',
        description: 'Captured sunlight to power the rover\'s tiny computer and electric wheel motors.',
        position: [0.0, 0.32, 0.0]
      }
    ],
    sources: [
      {
        title: 'NASA JPL Mars Pathfinder & Sojourner Archive',
        url: 'https://mars.nasa.gov/mars-pathfinder/',
        org: 'NASA / JPL'
      },
      {
        title: 'NASA 3D Resources: Sojourner Rover',
        url: 'https://nasa3d.arc.nasa.gov/detail/sojourner',
        org: 'NASA Ames'
      }
    ]
  },
  {
    id: 'ingenuity-helicopter',
    name: 'Ingenuity Mars Helicopter',
    subtitle: 'The Wright Brothers Moment on an Alien Atmosphere',
    storyTitle: 'The Wright Brothers\' Martian Heir',
    storyTagline: 'Built for 5 flights—it completed 72 flights across alien skies',
    curiosityHook: 'How do you fly a helicopter in an atmosphere that barely exists?',
    narrativeStory: 'Mars has an atmosphere less than 1% as thick as Earth\'s. Flying a drone there is like trying to fly at 100,000 feet on Earth—higher than any passenger jet! To stay airborne, Ingenuity\'s carbon-fiber blades spun at 2,400 RPM (5 times faster than an Earth helicopter). Designed to attempt 5 quick hops, it stunned the world by flying 72 missions over 3 years!',
    whyLeftBehindSimple: 'On its 72nd flight over featureless sandy dunes, a rotor blade tip grazed the ground on landing. It can no longer fly, but it remains upright as a stationary weather station.',
    funFact: 'Taped underneath its tiny solar panel is a postage-stamp-sized scrap of fabric from the wing of the 1903 Wright Flyer—the first airplane ever flown on Earth!',
    whatNow: 'Standing proudly on its four spindly legs at "Valinor Hills" in Jezero Crater, still logging daily weather data.',
    designation: 'Mars 2020 Scout / Ingenuity',
    celestialBody: 'Mars',
    mission: 'Mars 2020 / Perseverance',
    launchYear: 2020,
    arrivalYear: 2021,
    missionDurationDays: 1042,
    originalPurpose: 'A pure technology demonstration to test whether controlled powered aerodynamic flight was possible in the thin atmosphere of Mars.',
    whyLeftBehind: 'Rotor blade tips were damaged during landing on Flight 72 in January 2024. It can no longer take off, but remains stationed at Valinor Hills.',
    currentLocation: 'Jezero Crater ("Valinor Hills" site)',
    coordinates: {
      lat: 18.4447,
      lng: 77.4508,
      latFormatted: '18°26\'41" N',
      lngFormatted: '77°27\'03" E',
      craterOrRegion: 'Valinor Hills, Jezero Crater'
    },
    status: 'inactive',
    category: 'aerial_vehicle',
    massKg: 1.8,
    dimensions: '0.49 m high × 1.2 m rotor span',
    historicalSignificance: 'The first aircraft to achieve powered, controlled flight on another world. Completed 128.8 flight minutes and flew 17.0 km.',
    scientificImpact: 'Scouted paths for the Perseverance rover, photographed steep delta cliffs, and proved aerial exploration for future Mars missions.',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Ingenuity Mars Helicopter hovering above the Jezero Crater floor. (NASA/JPL-Caltech)',
    has3DModel: true,
    modelKey: 'ingenuity',
    structuralHighlights: [
      {
        feature: 'Counter-Rotating Carbon-Fiber Blades',
        description: 'Two coaxial rotors spinning in opposite directions at 2,400 RPM to bite the razor-thin air.'
      },
      {
        feature: 'Solar Mast & Li-Ion Batteries',
        description: 'Solar panel charging six lithium-ion batteries inside a heated, insulated fuselage.'
      },
      {
        feature: 'Lightweight Carbon-Composite Legs',
        description: 'Four canted legs weighing mere grams that absorb touchdown impact.'
      }
    ],
    hotspots: [
      {
        id: 'hs-ing-rotors',
        name: 'Coaxial Carbon-Fiber Blades',
        description: 'Specially shaped airfoils spinning five times faster than an Earth passenger helicopter.',
        position: [0.0, 0.45, 0.0]
      },
      {
        id: 'hs-ing-solar',
        name: 'Top Solar Array',
        description: 'Catches sunlight between flights and shelters the Wright Flyer fabric underneath.',
        position: [0.0, 0.72, 0.0]
      },
      {
        id: 'hs-ing-body',
        name: 'Insulated Avionics Cube',
        description: 'Smartphone processor with heaters wrapped in aerogel to survive -90°C Martian nights.',
        position: [0.0, 0.0, 0.0]
      },
      {
        id: 'hs-ing-legs',
        name: 'Landing Struts',
        description: 'Featherlight springy legs that keep the body elevated above rocks and dust.',
        position: [0.35, -0.3, 0.35]
      }
    ],
    sources: [
      {
        title: 'NASA JPL Ingenuity Helicopter Logs',
        url: 'https://mars.nasa.gov/technology/helicopter/',
        org: 'NASA / JPL'
      },
      {
        title: 'NASA 3D Resources: Ingenuity Helicopter',
        url: 'https://nasa3d.arc.nasa.gov/detail/ingenuity',
        org: 'NASA Ames'
      }
    ]
  },
  {
    id: 'perseverance-rover',
    name: 'Perseverance Mars Rover',
    subtitle: 'The Astrobiology Lab Seeking Ancient Microbial Life',
    storyTitle: 'The Alien Life Hunter',
    storyTagline: 'A car-sized roving laboratory collecting rock cores for Earth',
    curiosityHook: 'What kind of machine creates breathable oxygen on Mars?',
    narrativeStory: 'Perseverance (nicknamed "Percy") is the most advanced robotic laboratory ever built. It landed in an ancient dried-up lakebed called Jezero Crater that was flooded with river water billions of years ago. Percy has a robotic arm that drills pencil-sized rock cores and seals them inside sterile titanium tubes, dropping them in a "depot" on the ground for a future mission to fly to Earth!',
    whyLeftBehindSimple: 'It weighs over 2,200 pounds and has an open-ended mission to explore. It carries no rocket to lift off from Mars.',
    funFact: 'Percy carried an experimental device called MOXIE that successfully inhaled Martian carbon dioxide and exhaled pure breathable oxygen—just like a mechanical tree!',
    whatNow: 'Actively driving across ancient river delta cliffs, hunting for fossil signs of ancient microscopic life.',
    designation: 'Mars 2020 Rover / Perseverance (Percy)',
    celestialBody: 'Mars',
    mission: 'Mars 2020',
    launchYear: 2020,
    arrivalYear: 2021,
    missionDurationDays: 'Ongoing (Active)',
    originalPurpose: 'To seek biosignatures of ancient microbial life in Jezero Crater, cache rock cores for return to Earth, and test oxygen generation.',
    whyLeftBehind: 'Actively exploring Mars with no return rocket. Permanently stationed on the Martian surface.',
    currentLocation: 'Jezero Crater (Western Delta)',
    coordinates: {
      lat: 18.4446,
      lng: 77.4509,
      latFormatted: '18°26\'41" N',
      lngFormatted: '77°27\'03" E',
      craterOrRegion: 'Jezero Crater Delta'
    },
    status: 'operational',
    category: 'rover',
    massKg: 1025,
    dimensions: '3 m long × 2.7 m wide × 2.2 m tall',
    historicalSignificance: 'The most advanced mobile scientific laboratory sent to another world, caching sample tubes for Mars Sample Return.',
    scientificImpact: 'Confirmed that Jezero Crater was once an ancient river delta fed by liquid water, discovering organic carbon molecules in lakebed rocks.',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Self-portrait of Perseverance and Ingenuity at "Van Zyl Overlook" in Jezero Crater. (NASA/JPL-Caltech)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'Plutonium Nuclear Battery (MMRTG)',
        description: 'Converts heat from radioactive decay into steady electricity day and night, even during dust storms.'
      },
      {
        feature: 'Coring Drill & Sample Cache Carousel',
        description: 'Gathers sterile chalk-sized rock samples and locks them inside hermetic titanium tubes.'
      },
      {
        feature: 'SuperCam Rock-Zapping Laser',
        description: 'Fires laser pulses at rocks 20 feet away to vaporize microscopic points and read their chemical glow.'
      }
    ],
    sources: [
      {
        title: 'NASA Mars 2020 Official Portal',
        url: 'https://mars.nasa.gov/mars2020/',
        org: 'NASA / JPL'
      }
    ]
  },
  {
    id: 'curiosity-rover',
    name: 'Curiosity Mars Rover',
    subtitle: 'Pioneering Gale Crater and Mount Sharp for Over a Decade',
    storyTitle: 'The Mountain Climber',
    storyTagline: 'The nuclear-powered geologist that drove up a 3-mile mountain',
    curiosityHook: 'Why did a robot sing "Happy Birthday" to itself on Mars?',
    narrativeStory: 'Curiosity landed on Mars in 2012 by being lowered from a rocket-powered "sky crane" on nylon ropes! For over a decade, it has been slowly climbing Mount Sharp, a mountain taller than the Canadian Rockies rising from the center of a giant crater. Along the way, it found mudstones and clay that proved Mars once had drinkable freshwater lakes.',
    whyLeftBehindSimple: 'Powered by a nuclear heat generator that lasts for decades, Curiosity was built to keep driving until its wheels or computers wear out.',
    funFact: 'On its first anniversary on Mars, Curiosity used its soil-vibrating motors to play the tune of "Happy Birthday" to itself in the empty red desert. Its metal wheels also have holes cut in them that stamp "J-P-L" in Morse code into the Martian sand!',
    whatNow: 'Still driving uphill on Mount Sharp, snapping gorgeous self-portraits and sniffing rocks with its onboard laser and oven.',
    designation: 'Mars Science Laboratory (MSL) / Curiosity',
    celestialBody: 'Mars',
    mission: 'Mars Science Laboratory',
    launchYear: 2011,
    arrivalYear: 2012,
    missionDurationDays: 'Ongoing (12+ Years Active)',
    originalPurpose: 'To determine whether Mars ever had an environment capable of supporting microbial life, examining water history and geology.',
    whyLeftBehind: 'Carries no ascent or return rocket. Continues climbing Mount Sharp inside Gale Crater.',
    currentLocation: 'Gale Crater (Mount Sharp)',
    coordinates: {
      lat: -4.5895,
      lng: 137.4417,
      latFormatted: '4°35\'22" S',
      lngFormatted: '137°26\'30" E',
      craterOrRegion: 'Aeolis Mons / Gale Crater'
    },
    status: 'operational',
    category: 'rover',
    massKg: 899,
    dimensions: '2.9 m long × 2.7 m wide × 2.2 m high',
    historicalSignificance: 'Pioneered the audacious "Sky Crane" landing maneuver on August 6, 2012. Has driven over 32 km and taken more than 600,000 images.',
    scientificImpact: 'Conclusively proved ancient Mars possessed habitable conditions: freshwater lakes with neutral pH, carbon, nitrogen, phosphorus, and sulfur.',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Curiosity self-portrait at the Namib Dune in Gale Crater. (NASA/JPL-Caltech/MSSS)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'CheMin & SAM Internal Chemistry Labs',
        description: 'Internal analytical ovens that bake powdered rock samples to detect organic molecules.'
      },
      {
        feature: 'Machined Aluminum Wheels with Morse Code',
        description: 'Holes spell "JPL" in Morse code (•--- •--. •-..) into the sand to track wheel slippage visually.'
      }
    ],
    sources: [
      {
        title: 'NASA Science: Curiosity Mars Rover',
        url: 'https://science.nasa.gov/mission/msl-curiosity/',
        org: 'NASA Science'
      }
    ]
  },
  {
    id: 'opportunity-rover',
    name: 'Opportunity Rover (MER-B)',
    subtitle: 'The Marathon Runner of Another World',
    storyTitle: 'The 15-Year Marathon Runner',
    storyTagline: 'Built for 90 days, it explored Mars for 15 years until the great storm',
    curiosityHook: 'How did a 3-month mission turn into an Olympic marathon on Mars?',
    narrativeStory: 'Opportunity (affectionately called "Oppy") was supposed to explore for just 90 Martian days. But Martian dust devils occasionally swept over its solar panels and cleaned off the dust, giving it unexpected bursts of fresh power. Oppy kept driving and driving for 15 years, covering 28.1 miles—longer than an official Olympic marathon!',
    whyLeftBehindSimple: 'In 2018, a monstrous planet-wide dust storm blotted out the Sun for months. With no sunlight to recharge its batteries, Oppy sent its final signal and peacefully went to sleep.',
    funFact: 'Oppy discovered tiny gray mineral spheres nicknamed "blueberries" scattered across the plains—iron-rich rocks that only form in warm, soaking groundwater!',
    whatNow: 'Resting quietly in Perseverance Valley on the rim of Endeavour Crater, honoring one of the greatest feats of robotic exploration in history.',
    designation: 'Mars Exploration Rover - B / Opportunity (Oppy)',
    celestialBody: 'Mars',
    mission: 'Mars Exploration Rover',
    launchYear: 2003,
    arrivalYear: 2004,
    missionDurationDays: 5352,
    originalPurpose: 'Designed for a 90-sol mission to search for geological evidence that liquid water once flowed across Meridiani Planum.',
    whyLeftBehind: 'A catastrophic planet-wide dust storm in June 2018 coated its solar panels. Batteries drained and it fell into permanent hibernation.',
    currentLocation: 'Meridiani Planum (Endeavour Crater)',
    coordinates: {
      lat: -2.28,
      lng: 354.77,
      latFormatted: '2°17\' S',
      lngFormatted: '5°14\' W',
      craterOrRegion: 'Perseverance Valley, Endeavour Crater'
    },
    status: 'inactive',
    category: 'rover',
    massKg: 185,
    dimensions: '1.6 m wide × 2.3 m long × 1.5 m high',
    historicalSignificance: 'Traveled 45.16 kilometers (28.06 miles)—the longest distance ever driven by any wheeled vehicle on another world.',
    scientificImpact: 'Discovered hematite-rich spherical concretions dubbed "blueberries", proving beyond doubt that acidic groundwater once soaked Mars.',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Opportunity rover looking back at its tracks on the rim of Endurance Crater. (NASA/JPL-Caltech)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'Triple-Junction Solar Wings',
        description: 'Unfolded solar panels repeatedly dusted off by spontaneous Martian mini-tornadoes.'
      },
      {
        feature: 'Rock Abrasion Tool (RAT)',
        description: 'Diamond-tipped grinder that shaved away weathered rock rinds to inspect fresh minerals inside.'
      }
    ],
    sources: [
      {
        title: 'NASA Mars Exploration Rovers: Spirit and Opportunity',
        url: 'https://mars.nasa.gov/mer/',
        org: 'NASA / JPL'
      }
    ]
  },
  {
    id: 'spirit-rover',
    name: 'Spirit Rover (MER-A)',
    subtitle: 'The Resilient Geologist of Gusev Crater',
    storyTitle: 'The Lucky Stuck Wheel',
    storyTagline: 'How a jammed wheel dragged in the sand and stumbled upon ancient alien hot springs',
    curiosityHook: 'How did breaking a wheel turn into one of Mars\' biggest scientific discoveries?',
    narrativeStory: 'Spirit was Opportunity\'s twin rover, exploring the rocky floor of Gusev Crater. Two years into the mission, its front-right wheel jammed solid. The rover team had to drive Spirit backward, dragging the dead wheel like an anchor. But as the stuck wheel scraped a trench into the soil, it churned up bright white powder: 90% pure silica, proof that boiling hot volcanic springs once bubbled here!',
    whyLeftBehindSimple: 'In 2009, Spirit\'s wheels broke through a crust into soft powder sand and got hopelessly bogged down. Unable to angle its solar panels toward the sun for warmth during the harsh Martian winter, it froze.',
    funFact: 'If the wheel hadn\'t jammed and dragged like a plow, scientists would have driven right past the silica and never discovered the ancient hydrothermal hot springs!',
    whatNow: 'Standing permanently parked at a spot called "Home Plate" in Gusev Crater, covered in a thin dusting of red sand.',
    designation: 'Mars Exploration Rover - A / Spirit',
    celestialBody: 'Mars',
    mission: 'Mars Exploration Rover',
    launchYear: 2003,
    arrivalYear: 2004,
    missionDurationDays: 2210,
    originalPurpose: 'To investigate the history of water inside Gusev Crater, a massive impact basin suspected of once holding an extraterrestrial lake.',
    whyLeftBehind: 'Became trapped in soft iron sulfate sands at "Troy" with a stuck wheel. Unable to tilt its solar panels for winter warmth, it went silent in 2010.',
    currentLocation: 'Gusev Crater (Home Plate)',
    coordinates: {
      lat: -14.5684,
      lng: 175.4726,
      latFormatted: '14°34\'06" S',
      lngFormatted: '175°28\'21" E',
      craterOrRegion: 'Home Plate, Gusev Crater'
    },
    status: 'inactive',
    category: 'rover',
    massKg: 185,
    historicalSignificance: 'Operated for more than 20 times its original design lifespan, climbing the steep Columbia Hills.',
    scientificImpact: 'Its jammed wheel churned up 90% pure silica deposits—evidence of ancient hot springs, a prime environment for life.',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Spirit\'s view from the summit of Husband Hill looking across Gusev Crater. (NASA/JPL-Caltech)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'Mössbauer Spectrometer',
        description: 'Analyzed iron-bearing mineralogy on rocks and soil.'
      },
      {
        feature: 'Heated Rover Electronics Box',
        description: 'Aerogel-insulated thermal box keeping computer chips above freezing.'
      }
    ],
    sources: [
      {
        title: 'NASA JPL Spirit Rover Mission Updates',
        url: 'https://mars.nasa.gov/mer/mission/status_spirit.html',
        org: 'NASA / JPL'
      }
    ]
  },
  {
    id: 'perseverance-parachute-backshell',
    name: 'Perseverance Parachute & Backshell Debris',
    subtitle: 'The Jettisoned Armor That Conquered the "Seven Minutes of Terror"',
    storyTitle: 'The Supersonic Armor',
    storyTagline: 'The crumpled shield that survived the "Seven Minutes of Terror" with a secret code',
    curiosityHook: 'What secret riddle was hidden in the red-and-white stripes of a Mars parachute?',
    narrativeStory: 'To drop a 1-ton rover through the Martian sky at 12,000 miles per hour, NASA built a massive 70-foot supersonic parachute and a protective cone backshell. Once the parachute slowed the capsule down, explosive bolts fired, dropping the backshell to the desert floor so the rocket crane could gently lower the rover.',
    whyLeftBehindSimple: 'These parts were entry armor designed to be discarded once their job was finished. They impacted the surface at 78 miles per hour.',
    funFact: 'Engineers secretly encoded the phrase "DARE MIGHTY THINGS" into the parachute\'s red and white concentric pattern using computer binary code! In April 2022, the Ingenuity helicopter flew over the crash site and snapped stunning aerial photos of the crumpled armor.',
    whatNow: 'Lying stretched out across the dusty plains of Jezero Crater, studied by engineers to build even safer landers for future human crews.',
    designation: 'Mars 2020 EDL Hardware',
    celestialBody: 'Mars',
    mission: 'Mars 2020',
    launchYear: 2020,
    arrivalYear: 2021,
    originalPurpose: 'Braked the spacecraft from 20,000 km/h down to subsonic velocity, protecting the rover with a cone heat shield and a 21.5-meter parachute.',
    whyLeftBehind: 'After decelerating the craft, the parachute and backshell were pyrotechnically severed so the rocket crane could lower the rover.',
    currentLocation: 'Jezero Crater Plains (8 km from touchdown site)',
    coordinates: {
      lat: 18.452,
      lng: 77.429,
      latFormatted: '18°27\'07" N',
      lngFormatted: '77°25\'44" E',
      craterOrRegion: 'Jezero Crater Plains'
    },
    status: 'discarded_hardware',
    category: 'discarded_equipment',
    massKg: 850,
    historicalSignificance: 'Ingenuity photographed the crash site on Flight 26, providing close-up photos of the parachute that encoded "DARE MIGHTY THINGS."',
    scientificImpact: 'Engineers studied the wreckage photos to evaluate how suspension lines and structural tiles deformed, improving future sample return landers.',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Ingenuity helicopter\'s aerial photo of Perseverance\'s backshell and supersonic parachute on Mars. (NASA/JPL-Caltech)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: '21.5-Meter Supersonic Parachute',
        description: 'Made of Kevlar, Nomex, and nylon; deployed in 0.4 seconds under 32,000 kg of drag force.'
      },
      {
        feature: 'Composite Honeycomb Backshell',
        description: 'Shielded the rover from intense heat during supersonic atmospheric entry.'
      }
    ],
    sources: [
      {
        title: 'NASA Ingenuity Spots Perseverance Parachute & Backshell',
        url: 'https://www.nasa.gov/image-article/nasas-ingenuity-spots-perseverances-parachute-backshell/',
        org: 'NASA / JPL'
      }
    ]
  },
  {
    id: 'insight-lander',
    name: 'InSight Mars Lander',
    subtitle: 'The Planetary Heartbeat Monitor & Marsquake Station',
    storyTitle: 'The Planetary Stethoscope',
    storyTagline: 'A stationary listener that felt the heartbeat and rumblings of Mars',
    curiosityHook: 'Can you feel an earthquake on another planet?',
    narrativeStory: 'Unlike rovers with wheels, InSight never moved an inch. It sat completely still on a flat plain, gently placing an ultra-sensitive dome-covered seismometer onto the Martian soil. It listened for the subtle creaks and thumps inside the planet, detecting over 1,300 marsquakes and tracking meteorites crashing into the surface!',
    whyLeftBehindSimple: 'InSight had large solar panels that gradually became covered in layers of red Martian dust. Without wheels to seek out wind devils, its batteries slowly drained until it sent its poignant farewell in December 2022.',
    funFact: 'InSight proved that Mars still has magma moving beneath its crust, and recorded a monster magnitude 4.7 quake that made the whole planet shake for 10 hours straight!',
    whatNow: 'Sitting silently in Elysium Planitia under a blanket of fine red dust, with its robotic arm resting beside its dome sensor.',
    designation: 'InSight Mars Lander',
    celestialBody: 'Mars',
    mission: 'InSight',
    launchYear: 2018,
    arrivalYear: 2018,
    missionDurationDays: 1489,
    originalPurpose: 'Conducted the first deep medical checkup of Mars: measuring internal seismic activity (marsquakes), heat flow, and core size.',
    whyLeftBehind: 'Stationary lander powered by twin solar panels. Dust steadily accumulated over 4 years, draining power until its final message in December 2022.',
    currentLocation: 'Elysium Planitia ("The Biggest Parking Lot on Mars")',
    coordinates: {
      lat: 4.5024,
      lng: 135.6234,
      latFormatted: '4°30\'09" N',
      lngFormatted: '135°37\'24" E',
      craterOrRegion: 'Elysium Planitia'
    },
    status: 'inactive',
    category: 'lander_descent',
    massKg: 358,
    dimensions: '6.0 m wide with solar arrays deployed',
    historicalSignificance: 'Detected more than 1,300 marsquakes, including a magnitude 4.7 quake that shook the planet for ten hours.',
    scientificImpact: 'Proved Mars is seismically active, mapped crust thickness, and determined that Mars possesses a liquid metallic core.',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'InSight\'s selfie on Mars showing dust-covered solar panels and seismometer dome. (NASA/JPL-Caltech)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'SEIS Seismometer Vacuum Dome',
        description: 'French sensor shielded under a wind-and-thermal vacuum dome to detect ground motions as small as a hydrogen atom.'
      },
      {
        feature: 'Twin Circular Solar Arrays',
        description: '2.15-meter unfolding circular panels that powered the lander.'
      }
    ],
    sources: [
      {
        title: 'NASA InSight Mission Highlights',
        url: 'https://mars.nasa.gov/insight/',
        org: 'NASA / JPL'
      }
    ]
  },
  {
    id: 'viking-1-lander',
    name: 'Viking 1 Lander',
    subtitle: 'The First American Foothold on the Surface of Mars',
    storyTitle: 'The First Martian Postcard',
    storyTagline: 'The historic lander that showed Earth the red surface for the very first time',
    curiosityHook: 'What did humans see the very first time a camera turned on at Mars?',
    narrativeStory: 'In July 1976—exactly seven years after Apollo 11 landed on the Moon—Viking 1 touched down on Mars and sent back the first clear photographs in history of the Martian ground. People gathered around TV sets on Earth to see a rocky desert with reddish sand and a pinkish sky, proving Mars was a real, breathtaking world.',
    whyLeftBehindSimple: 'A stationary laboratory with no return thrusters. It operated faithfully for over 6 years until an accidental human computer command in 1982 broke its antenna link.',
    funFact: 'Viking scooped up Martian soil with a tiny robotic shovel and tested it for alien bacteria. While it didn\'t find living microbes, it showed the soil is so rich in rusted iron that the whole planet glows red!',
    whatNow: 'Standing on its three footpads in Chryse Planitia ("The Plains of Gold"), an untouched monument to humanity\'s first successful landing on Mars.',
    designation: 'Viking 1 Lander (Thomas Mutch Memorial Station)',
    celestialBody: 'Mars',
    mission: 'Viking 1',
    launchYear: 1975,
    arrivalYear: 1976,
    missionDurationDays: 2307,
    originalPurpose: 'Captured the first clear surface panoramas of Mars, tested for microbial life, and measured atmospheric composition and weather.',
    whyLeftBehind: 'A stationary lander with no return rocket. Operated for 6 years until an uplink command in 1982 accidentally overwrote antenna parameters.',
    currentLocation: 'Chryse Planitia (Plains of Gold)',
    coordinates: {
      lat: 22.48,
      lng: -47.97,
      latFormatted: '22°29\' N',
      lngFormatted: '47°58\' W',
      craterOrRegion: 'Chryse Planitia'
    },
    status: 'inactive',
    category: 'lander_descent',
    massKg: 572,
    historicalSignificance: 'On July 20, 1976, Viking 1 made history with the first successful touchdown and operational surface transmission from Mars by the US.',
    scientificImpact: 'Transmitted the first color surface photos showing red iron-oxide dust and pinkish sky; proved atmosphere is 95% carbon dioxide.',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The first color photograph taken on the surface of Mars by Viking 1 Lander. (NASA photo 76-H-671)',
    has3DModel: false,
    structuralHighlights: [
      {
        feature: 'Dual SNAP-19 Nuclear RTGs',
        description: 'Fueled with plutonium-238 generating 70 watts of continuous electrical power.'
      },
      {
        feature: 'Extendable Surface Sampler Arm',
        description: 'Telescoping scoop that gathered soil and delivered it to biological test chambers.'
      }
    ],
    sources: [
      {
        title: 'NASA Viking Mission to Mars Overview',
        url: 'https://www.nasa.gov/mission_pages/viking/',
        org: 'NASA'
      }
    ]
  }
];
