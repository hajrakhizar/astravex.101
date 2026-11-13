import * as THREE from 'three';

export function createSojournerModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Sojourner-Rover';

  // Materials
  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.8,
    roughness: 0.3,
  });

  const goldThermalMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.85,
    roughness: 0.25,
  });

  const solarPanelMat = new THREE.MeshStandardMaterial({
    color: 0x1e1b4b,
    roughness: 0.15,
    metalness: 0.9,
  });

  const wheelMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.35,
  });

  const cameraLensMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.9,
    roughness: 0.1,
  });

  const apxsSensorMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.95,
    roughness: 0.2,
  });

  // 1. Warm Electronics Box (Chassis)
  const chassis = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.22, 0.48),
    goldThermalMat
  );
  chassis.position.y = 0.32;
  chassis.castShadow = true;
  group.add(chassis);

  // 2. Solar Panel Array (Flat top cover with grid markings)
  const solarPanel = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.02, 0.52),
    solarPanelMat
  );
  solarPanel.position.set(0, 0.44, 0);
  solarPanel.castShadow = true;
  group.add(solarPanel);

  // Solar panel frame border
  const frameBorder = new THREE.Mesh(
    new THREE.BoxGeometry(0.70, 0.015, 0.54),
    chassisMat
  );
  frameBorder.position.set(0, 0.435, 0);
  group.add(frameBorder);

  // 3. Rocker-Bogie Suspension & 6 Wheels
  const wheelRadius = 0.13;
  const wheelWidth = 0.09;

  // 6 wheel positions: [x, z] relative to chassis
  // Front pair, Middle pair, Rear pair
  const wheelPositions = [
    [-0.38, 0.28, 'front-left'],
    [0.38, 0.28, 'front-right'],
    [-0.40, 0.0, 'mid-left'],
    [0.40, 0.0, 'mid-right'],
    [-0.38, -0.28, 'rear-left'],
    [0.38, -0.28, 'rear-right'],
  ] as const;

  wheelPositions.forEach(([x, z]) => {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(x, wheelRadius, z);

    // Cleated aluminum wheel
    const wheelMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 20),
      wheelMat
    );
    wheelMesh.rotation.z = Math.PI / 2;
    wheelMesh.castShadow = true;
    wheelGroup.add(wheelMesh);

    // Wheel hub
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, wheelWidth * 1.2, 12),
      chassisMat
    );
    hub.rotation.z = Math.PI / 2;
    wheelGroup.add(hub);

    // Tread ribs (cleats)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const cleat = new THREE.Mesh(
        new THREE.BoxGeometry(wheelWidth * 0.9, 0.015, 0.02),
        chassisMat
      );
      cleat.position.set(0, Math.sin(angle) * wheelRadius, Math.cos(angle) * wheelRadius);
      wheelGroup.add(cleat);
    }

    group.add(wheelGroup);
  });

  // Rocker-Bogie structural arms (Left & Right)
  [-1, 1].forEach((side) => {
    const armGroup = new THREE.Group();
    const xPos = side * 0.35;

    // Rocker arm
    const rocker = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.03, 0.55),
      chassisMat
    );
    rocker.position.set(xPos, 0.26, -0.05);
    rocker.rotation.x = -0.1 * side;
    armGroup.add(rocker);

    // Bogie arm
    const bogie = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.025, 0.32),
      chassisMat
    );
    bogie.position.set(xPos, 0.2, 0.15);
    armGroup.add(bogie);

    // Pivot differential link
    const pivot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.08, 12),
      chassisMat
    );
    pivot.rotation.z = Math.PI / 2;
    pivot.position.set(xPos, 0.26, 0.02);
    armGroup.add(pivot);

    group.add(armGroup);
  });

  // 4. Alpha Particle X-Ray Spectrometer (APXS) Deployment Mechanism
  const apxsGroup = new THREE.Group();
  apxsGroup.position.set(0, 0.25, -0.28);

  const apxsArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.04, 0.15),
    chassisMat
  );
  apxsArm.position.z = -0.06;
  apxsGroup.add(apxsArm);

  const apxsSensor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.08, 16),
    apxsSensorMat
  );
  apxsSensor.rotation.x = Math.PI / 2;
  apxsSensor.position.z = -0.15;
  apxsSensor.castShadow = true;
  apxsGroup.add(apxsSensor);

  group.add(apxsGroup);

  // 5. Forward Dual Stereo Cameras (Nose)
  const camGroup = new THREE.Group();
  camGroup.position.set(0, 0.38, 0.25);

  const camBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.05, 0.06),
    chassisMat
  );
  camGroup.add(camBar);

  [-0.08, 0.08].forEach((cx) => {
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.04, 12),
      cameraLensMat
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.set(cx, 0, 0.04);
    camGroup.add(lens);
  });

  group.add(camGroup);

  // 6. UHF Radio Modem Antenna (Whip antenna)
  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.008, 0.38, 8),
    chassisMat
  );
  antenna.position.set(0.18, 0.63, -0.16);
  antenna.rotation.x = -0.1;
  group.add(antenna);

  return group;
}
