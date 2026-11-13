import * as THREE from 'three';

export function createLunarModuleModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Apollo-Lunar-Module-Descent-Stage';

  const goldFoilMat = new THREE.MeshStandardMaterial({
    color: 0xdfab35,
    metalness: 0.9,
    roughness: 0.35,
  });

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.85,
    roughness: 0.25,
  });

  const blackThermalMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.7,
    roughness: 0.4,
  });

  const engineBellMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.9,
    roughness: 0.3,
  });

  const plaqueMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.95,
    roughness: 0.1,
  });

  // 1. Octagonal Main Body (Descent Stage Core)
  const bodyHeight = 0.95;
  const bodyRadius = 1.1;
  const coreMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(bodyRadius, bodyRadius, bodyHeight, 8),
    goldFoilMat
  );
  coreMesh.position.y = 0.85;
  coreMesh.castShadow = true;
  group.add(coreMesh);

  // Black thermal blanket quadrant patches
  const patchMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, bodyHeight * 0.95, 0.05),
    blackThermalMat
  );
  patchMesh.position.set(0.65, 0.85, 0.75);
  patchMesh.rotation.y = Math.PI / 4;
  group.add(patchMesh);

  // 2. Descent Propulsion Engine Bell (TRW DPS)
  const engineBell = new THREE.Mesh(
    new THREE.ConeGeometry(0.55, 0.65, 24, 1, true),
    engineBellMat
  );
  engineBell.rotation.x = Math.PI;
  engineBell.position.y = 0.38;
  engineBell.castShadow = true;
  group.add(engineBell);

  // 3. Quad Landing Struts & Footpads
  const legAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
  legAngles.forEach((angle, idx) => {
    const legGroup = new THREE.Group();
    legGroup.position.set(0, 0.65, 0);

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    // Primary cantilever strut
    const primaryStrut = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.035, 1.6, 12),
      goldFoilMat
    );
    primaryStrut.position.set(cosA * 1.35, -0.28, sinA * 1.35);
    primaryStrut.rotation.z = sinA * 0.75;
    primaryStrut.rotation.x = -cosA * 0.75;
    primaryStrut.castShadow = true;
    legGroup.add(primaryStrut);

    // Circular footpad with crushable honeycomb core
    const footpad = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.28, 0.06, 16),
      goldFoilMat
    );
    footpad.position.set(cosA * 2.1, -0.62, sinA * 2.1);
    footpad.castShadow = true;
    legGroup.add(footpad);

    // Lunar surface contact sensor probe (thin wire probe pointing down on 3 of the 4 legs)
    if (idx !== 0) {
      const probe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.006, 0.006, 0.45, 6),
        aluminumMat
      );
      probe.position.set(cosA * 2.1, -0.85, sinA * 2.1);
      legGroup.add(probe);
    }

    // Forward landing gear ladder (Only on front +Z strut, for Armstrong & Aldrin!)
    if (idx === 1) {
      const ladder = new THREE.Group();
      ladder.position.set(cosA * 1.35, -0.25, sinA * 1.35);

      for (let r = 0; r < 9; r++) {
        const rung = new THREE.Mesh(
          new THREE.BoxGeometry(0.25, 0.015, 0.02),
          aluminumMat
        );
        rung.position.set(0, -0.45 + r * 0.12, 0.06);
        ladder.add(rung);
      }
      legGroup.add(ladder);

      // Plaque attached to forward ladder rungs
      const plaque = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.14, 0.01),
        plaqueMat
      );
      plaque.position.set(cosA * 1.35, -0.05, sinA * 1.35 + 0.08);
      plaque.rotation.y = -angle;
      legGroup.add(plaque);
    }

    group.add(legGroup);
  });

  // 4. MESA (Modular Equipment Stowage Assembly) - Folded TV Camera bay
  const mesa = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.35, 0.25),
    blackThermalMat
  );
  mesa.position.set(0.7, 0.7, 0.7);
  mesa.rotation.y = Math.PI / 4;
  group.add(mesa);

  // 5. Umbilical Cable Boom / Ascent Stage Sever Point
  const umbilicalPost = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.2, 12),
    aluminumMat
  );
  umbilicalPost.position.y = 1.38;
  group.add(umbilicalPost);

  return group;
}
