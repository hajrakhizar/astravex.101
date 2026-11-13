import * as THREE from 'three';

export function createRetroreflectorModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Apollo-Laser-Retroreflector';

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0xcfd4dc,
    metalness: 0.9,
    roughness: 0.2,
  });

  const quartzMat = new THREE.MeshStandardMaterial({
    color: 0xe0f2fe,
    metalness: 0.95,
    roughness: 0.05,
  });

  const baseTrayMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.7,
    roughness: 0.4,
  });

  // 1. Triangular Ground Base & Leveling Legs
  const baseLegs = new THREE.Group();
  const legCoords = [
    [0, 0.4],
    [-0.35, -0.3],
    [0.35, -0.3],
  ];

  legCoords.forEach(([lx, lz]) => {
    const foot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 0.02, 12),
      baseTrayMat
    );
    foot.position.set(lx, 0.01, lz);
    baseLegs.add(foot);

    const legPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.16, 8),
      aluminumMat
    );
    legPole.position.set(lx, 0.09, lz);
    baseLegs.add(legPole);
  });
  group.add(baseLegs);

  // 2. Angled Panel Array Pallet (Tilted toward Earth)
  const panelGroup = new THREE.Group();
  panelGroup.position.set(0, 0.22, 0);
  panelGroup.rotation.x = -0.45; // ~26 degree tilt

  const tray = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.08, 0.72),
    aluminumMat
  );
  tray.castShadow = true;
  panelGroup.add(tray);

  // 3. Grid of Corner Cube Cavities (10x10 array represented cleanly)
  const rows = 8;
  const cols = 8;
  const spacing = 0.075;
  const startX = -((cols - 1) * spacing) / 2;
  const startZ = -((rows - 1) * spacing) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cubePrism = new THREE.Mesh(
        new THREE.CylinderGeometry(0.024, 0.024, 0.03, 6),
        quartzMat
      );
      cubePrism.position.set(
        startX + c * spacing,
        0.045,
        startZ + r * spacing
      );
      panelGroup.add(cubePrism);
    }
  }

  // 4. Sun Shadow Compass / Gnomon Post
  const gnomon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8),
    aluminumMat
  );
  gnomon.position.set(0.3, 0.1, -0.3);
  panelGroup.add(gnomon);

  group.add(panelGroup);

  return group;
}
