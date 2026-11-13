import * as THREE from 'three';

export function createLRVModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Apollo-LRV';

  // Materials with authentic physical properties
  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0xd0d5dd,
    metalness: 0.85,
    roughness: 0.25,
  });

  const goldFoilMat = new THREE.MeshStandardMaterial({
    color: 0xdfab35,
    metalness: 0.9,
    roughness: 0.35,
  });

  const seatMeshMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.1,
    roughness: 0.8,
  });

  const tireMeshMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    wireframe: true,
    metalness: 0.7,
    roughness: 0.3,
  });

  const tireHubMat = new THREE.MeshStandardMaterial({
    color: 0xb91c1c, // NASA red hub cover
    metalness: 0.8,
    roughness: 0.3,
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.4,
  });

  const cameraLensMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.95,
    roughness: 0.1,
  });

  // 1. Chassis Frame (Center, Forward, Aft)
  const chassisBase = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.08, 2.6),
    aluminumMat
  );
  chassisBase.position.y = 0.55;
  chassisBase.castShadow = true;
  group.add(chassisBase);

  // Tubular rails
  const railGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.6, 8);
  const leftRail = new THREE.Mesh(railGeo, darkMetalMat);
  leftRail.rotation.x = Math.PI / 2;
  leftRail.position.set(-0.78, 0.65, 0);
  group.add(leftRail);

  const rightRail = new THREE.Mesh(railGeo, darkMetalMat);
  rightRail.rotation.x = Math.PI / 2;
  rightRail.position.set(0.78, 0.65, 0);
  group.add(rightRail);

  // 2. Wheels & Suspension (4 wire mesh wheels)
  const wheelRadius = 0.41;
  const wheelThickness = 0.23;
  const wheelOffsets = [
    [-0.95, wheelRadius, 0.95],  // front left
    [0.95, wheelRadius, 0.95],   // front right
    [-0.95, wheelRadius, -0.95], // rear left
    [0.95, wheelRadius, -0.95],  // rear right
  ];

  wheelOffsets.forEach(([x, y, z], index) => {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(x, y, z);

    // Wire mesh tire outer
    const tire = new THREE.Mesh(
      new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelThickness, 24, 4, true),
      tireMeshMat
    );
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Inner rim
    const innerRim = new THREE.Mesh(
      new THREE.CylinderGeometry(wheelRadius * 0.55, wheelRadius * 0.55, wheelThickness * 0.9, 16),
      aluminumMat
    );
    innerRim.rotation.z = Math.PI / 2;
    wheelGroup.add(innerRim);

    // Wheel hub cap (Red motor housing)
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, wheelThickness * 1.15, 12),
      tireHubMat
    );
    hub.rotation.z = Math.PI / 2;
    wheelGroup.add(hub);

    // Fender / Mudguard (Fiberglass fender)
    const fender = new THREE.Mesh(
      new THREE.CylinderGeometry(wheelRadius * 1.12, wheelRadius * 1.12, wheelThickness * 1.15, 16, 1, false, 0, Math.PI * 0.85),
      aluminumMat
    );
    fender.rotation.z = Math.PI / 2;
    fender.rotation.x = index < 2 ? -0.2 : 0.2;
    fender.position.y = 0.05;
    wheelGroup.add(fender);

    // Suspension wishbone arm
    const strut = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8),
      darkMetalMat
    );
    strut.rotation.z = x > 0 ? -Math.PI / 4 : Math.PI / 4;
    strut.position.set(x > 0 ? -0.12 : 0.12, 0.1, 0);
    wheelGroup.add(strut);

    group.add(wheelGroup);
  });

  // 3. Astronaut Seats (Foldable Lawn-Chair style)
  const seatPositions = [-0.35, 0.35];
  seatPositions.forEach((sx) => {
    const seatGroup = new THREE.Group();
    seatGroup.position.set(sx, 0.6, -0.15);

    // Bottom seat pan
    const seatPan = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.04, 0.45),
      seatMeshMat
    );
    seatPan.castShadow = true;
    seatGroup.add(seatPan);

    // Seat back
    const seatBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.6, 0.04),
      seatMeshMat
    );
    seatBack.position.set(0, 0.32, -0.2);
    seatBack.rotation.x = -0.15;
    seatBack.castShadow = true;
    seatGroup.add(seatBack);

    // Seat frame tubular legs
    const frame = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.45, 8),
      aluminumMat
    );
    frame.position.set(0, 0.15, -0.2);
    seatGroup.add(frame);

    // Footrest below
    const footrest = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.02, 0.3),
      aluminumMat
    );
    footrest.position.set(0, -0.05, 0.4);
    seatGroup.add(footrest);

    group.add(seatGroup);
  });

  // 4. Center Console & T-Handle Joystick
  const consoleGroup = new THREE.Group();
  consoleGroup.position.set(0, 0.7, 0.15);

  const consoleBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.3, 0.35),
    darkMetalMat
  );
  consoleGroup.add(consoleBox);

  // T-Handle steering controller
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8),
    aluminumMat
  );
  stem.position.set(0, 0.22, 0);
  consoleGroup.add(stem);

  const tBar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.18, 8),
    aluminumMat
  );
  tBar.rotation.z = Math.PI / 2;
  tBar.position.set(0, 0.34, 0);
  consoleGroup.add(tBar);

  group.add(consoleGroup);

  // 5. High-Gain Dish Antenna (Pointed to Earth)
  const antennaGroup = new THREE.Group();
  antennaGroup.position.set(0.4, 0.6, 1.05);

  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8),
    aluminumMat
  );
  mast.position.y = 0.4;
  antennaGroup.add(mast);

  // Parabolic mesh dish
  const dish = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.35),
    tireMeshMat
  );
  dish.rotation.x = -Math.PI / 3;
  dish.rotation.y = 0.3;
  dish.position.set(0, 0.85, 0);
  antennaGroup.add(dish);

  // Feed horn
  const feedHorn = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.15, 8),
    aluminumMat
  );
  feedHorn.rotation.x = -Math.PI / 3;
  feedHorn.position.set(0, 0.95, 0.12);
  antennaGroup.add(feedHorn);

  group.add(antennaGroup);

  // 6. RCA Color TV Ground-Controlled Camera
  const tvCamGroup = new THREE.Group();
  tvCamGroup.position.set(0.65, 0.6, 0.95);

  const camPost = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8),
    aluminumMat
  );
  camPost.position.y = 0.22;
  tvCamGroup.add(camPost);

  const camBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.15, 0.25),
    goldFoilMat
  );
  camBody.position.set(0, 0.45, 0);
  camBody.castShadow = true;
  tvCamGroup.add(camBody);

  const camLens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.045, 0.12, 16),
    cameraLensMat
  );
  camLens.rotation.x = Math.PI / 2;
  camLens.position.set(0, 0.45, 0.16);
  tvCamGroup.add(camLens);

  group.add(tvCamGroup);

  // 7. LCRU (Lunar Communications Relay Unit) with Gold Kapton foil
  const lcru = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.35, 0.4),
    goldFoilMat
  );
  lcru.position.set(-0.35, 0.75, 1.0);
  lcru.castShadow = true;
  group.add(lcru);

  // 8. Rear Science Tool Rack & Core Sample Carrier
  const rackGroup = new THREE.Group();
  rackGroup.position.set(0, 0.65, -1.05);

  const rackFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.4, 0.45),
    aluminumMat
  );
  rackFrame.castShadow = true;
  rackGroup.add(rackFrame);

  // Sample collection rock bags / canisters
  const sampleCan = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.3, 12),
    darkMetalMat
  );
  sampleCan.position.set(-0.35, 0.2, 0);
  rackGroup.add(sampleCan);

  const sampleBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.25, 0.25),
    aluminumMat
  );
  sampleBox.position.set(0.25, 0.15, 0);
  rackGroup.add(sampleBox);

  group.add(rackGroup);

  // Contact shadow / floor plane grounding
  group.position.y = 0; // ensure ground is at y=0

  return group;
}
