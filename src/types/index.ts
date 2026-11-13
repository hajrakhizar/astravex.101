export type CelestialBody = 'Moon' | 'Mars';

export type ObjectStatus = 'operational' | 'inactive' | 'discarded_hardware';

export type ObjectCategory = 
  | 'rover'
  | 'lander_descent'
  | 'scientific_instrument'
  | 'aerial_vehicle'
  | 'commemorative'
  | 'discarded_equipment';

export type ModelKey = 'lrv' | 'sojourner' | 'ingenuity' | 'lunar_module' | 'retroreflector';

export interface Hotspot {
  id: string;
  name: string;
  description: string;
  position: [number, number, number]; // 3D coordinates
  details?: string;
}

export interface SpaceObject {
  id: string;
  name: string;
  subtitle: string;
  designation: string;
  celestialBody: CelestialBody;
  mission: string;
  launchYear: number;
  arrivalYear: number;
  missionDurationDays?: number | string;
  originalPurpose: string;
  whyLeftBehind: string;
  currentLocation: string;
  coordinates: {
    lat: number;
    lng: number;
    latFormatted: string;
    lngFormatted: string;
    craterOrRegion: string;
  };
  status: ObjectStatus;
  category: ObjectCategory;
  massKg: string | number;
  dimensions?: string;
  historicalSignificance: string;
  scientificImpact: string;
  imageUrl: string;
  imageCaption: string;
  has3DModel: boolean;
  modelKey?: ModelKey;
  // Narrative & Curiosity Layers for Accessible Storytelling
  storyTitle: string;
  storyTagline: string;
  curiosityHook: string;
  narrativeStory: string;
  whyLeftBehindSimple: string;
  funFact: string;
  whatNow: string;
  structuralHighlights: Array<{
    feature: string;
    description: string;
  }>;
  hotspots?: Hotspot[];
  sources: Array<{
    title: string;
    url: string;
    org: string;
  }>;
}

export interface MissionMilestone {
  id: string;
  year: number;
  date: string;
  title: string;
  mission: string;
  celestialBody: CelestialBody;
  brief: string;
  keyArtifactsLeft: string[];
  historicalAchievement: string;
  crewOrPrincipal?: string;
  coordinates: string;
  imageUrl: string;
}

export interface LandingSite {
  id: string;
  name: string;
  mission: string;
  celestialBody: CelestialBody;
  lat: number;
  lng: number;
  latFormatted: string;
  lngFormatted: string;
  year: number;
  status: ObjectStatus;
  primaryObject: string;
  description: string;
}
