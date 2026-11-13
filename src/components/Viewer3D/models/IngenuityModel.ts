import * as THREE from 'three';

export function createIngenuityModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Ingenuity-Helicopter';

  // Materials
  const carbonFiberMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.35,
    metalness: 0.6,
  });

  const goldThermalMat = new THREE.MeshStandardMaterial({
    color: 0xca8a04,
    roughness: 0.25,
    metalness: 0.85,
  });

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.2,
    metalness: 0.9,
  });

  const solarCellMat = new THREE.MeshStandardMaterial({
    color: 0x1e1b4b,
    roughness: 0.1,
    metalness: 0.9,
  });

  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.1,
    metalness: 0.95,
  });

  // 1. Fuselage (Avionics Cube)
  const fuselageHeight = 0.28;
  const fuselageCenterY = 0.38;

  const fuselage = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, fuselageHeight, 0.22),
    goldThermalMat
  );
  fuselage.position.y = fuselageCenterY;
  fuselage.castShadow = true;
  group.add(fuselage);

  // Bottom downward camera & laser altimeter
  const navCam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.04, 16),
    lensMat
  );
  navCam.position.set(0, fuselageCenterY - fuselageHeight / 2 - 0.015, 0.04);
  group.add(navCam);

  // 2. Landing Gear (4 Canted Carbon-Fiber Legs)
  const legAngles = [
    Math.PI * 0.25,
    Math.PI * 0.75,
    Math.PI * 1.25,
    Math.PI * 1.75,
  ];

  legAngles.forEach((angle) => {
    const legGroup = new THREE.Group();
    legGroup.position.set(0, fuselageCenterY - 0.08, 0);

    // Leg strut
    const legLength = 0.48;
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.006, legLength, 8),
      carbonFiberMat
    );
    leg.position.set(
      Math.cos(angle) * (legLength * 0.42),
      -legLength * 0.38,
      Math.sin(angle) * (legLength * 0.42)
    );
    leg.rotation.z = Math.sin(angle) * 0.55;
    leg.rotation.x = -Math.cos(angle) * 0.55;
    leg.castShadow = true;
    legGroup.add(leg);

    // Foot pad
    const footPad = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 10, 8),
      aluminumMat
    );
    footPad.position.set(
      Math.cos(angle) * (legLength * 0.75),
      -fuselageCenterY + 0.02,
      Math.sin(angle) * (legLength * 0.75)
    );
    legGroup.add(footPad);

    group.add(legGroup);
  });

  // 3. Central Mast
  const mastHeight = 0.52;
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, mastHeight, 16),
    aluminumMat
  );
  mast.position.y = fuselageCenterY + fuselageHeight / 2 + mastHeight / 2;
  mast.castShadow = true;
  group.add(mast);

  // 4. Counter-Rotating Rotors (Lower and Upper Hubs)
  const createRotorBlades = (yPos: number, rotationOffset: number) => {
    const rotorHub = new THREE.Group();
    rotorHub.position.y = yPos;

    // Hub mechanics
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.06, 16),
      carbonFiberMat
    );
    rotorHub.add(hub);

    // Swashplate link
    const swashplate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.02, 16),
      aluminumMat
    );
    swashplate.position.y = -0.04;
    rotorHub.add(swashplate);

    // Two blades (1.2m span in scale)
    const bladeSpan = 0.75;
    [-1, 1].forEach((dir) => {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(bladeSpan, 0.008, 0.09),
        carbonFiberMat
      );
      blade.position.x = dir * (bladeSpan / 2 + 0.04);
      blade.rotation.x = 0.12 * dir; // airfoil incidence angle
      blade.castShadow = true;
      rotorHub.add(blade);
    });

    rotorHub.rotation.y = rotationOffset;
    return rotorHub;
  };

  const lowerRotor = createRotorBlades(fuselageCenterY + 0.28, 0);
  lowerRotor.name = 'lower-rotor';
  group.add(lowerRotor);

  const upperRotor = createRotorBlades(fuselageCenterY + 0.46, Math.PI / 2);
  upperRotor.name = 'upper-rotor';
  group.add(upperRotor);

  // 5. Top Solar Panel Array
  const solarPanelGroup = new THREE.Group();
  solarPanelGroup.position.y = fuselageCenterY + mastHeight + 0.14;

  const solarPanel = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.012, 0.3),
    solarCellMat
  );
  solarPanel.castShadow = true;
  solarPanelGroup.add(solarPanel);

  const solarBorder = new THREE.Mesh(
    new THREE.BoxGeometry(0.39, 0.008, 0.31),
    carbonFiberMat
  );
  solarPanelGroup.add(solarBorder);

  // Top UHF Antenna Mast (beaming to Perseverance)
  const topAntenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.22, 8),
    aluminumMat
  );
  topAntenna.position.set(0.08, 0.12, 0.06);
  solarPanelGroup.add(topAntenna);

  group.add(solarPanelGroup);

  return group;
}
