import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ModelKey, Hotspot } from '../../types';
import { createLRVModel } from './models/LRVModel';
import { createSojournerModel } from './models/SojournerModel';
import { createIngenuityModel } from './models/IngenuityModel';
import { createLunarModuleModel } from './models/LunarModuleModel';
import { createRetroreflectorModel } from './models/RetroreflectorModel';
import { 
  Rotate3d, 
  Eye, 
  ZoomIn, 
  Compass, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Info,
  Maximize2
} from 'lucide-react';
import { spaceAudio } from '../../utils/audio';

interface ThreeViewerProps {
  modelKey: ModelKey;
  objectName: string;
  missionName: string;
  hotspots?: Hotspot[];
  onSelectHotspot?: (hotspot: Hotspot) => void;
  selectedHotspotId?: string | null;
  className?: string;
}

export const ThreeViewer: React.FC<ThreeViewerProps> = ({
  modelKey,
  objectName,
  missionName,
  hotspots = [],
  onSelectHotspot,
  selectedHotspotId,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [currentCameraView, setCurrentCameraView] = useState<'iso' | 'front' | 'top' | 'side'>('iso');
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [microgravityFloat, setMicrogravityFloat] = useState<boolean>(true);

  // References for Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);
  const microgravityFloatRef = useRef<boolean>(true);

  useEffect(() => {
    microgravityFloatRef.current = microgravityFloat;
  }, [microgravityFloat]);

  useEffect(() => {
    if (selectedHotspotId) {
      const match = hotspots.find(h => h.id === selectedHotspotId);
      if (match) {
        setActiveHotspot(match);
      }
    }
  }, [selectedHotspotId, hotspots]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to balance performance
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene & Camera Setup
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060710);
    scene.fog = new THREE.FogExp2(0x060710, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 1.8, 3.2);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Reflections (PMREMGenerator & RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 8;
    controls.minDistance = 0.8;
    controls.maxPolarAngle = Math.PI / 2 + 0.08; // Allow slightly below horizon
    controls.target.set(0, 0.4, 0);
    controlsRef.current = controls;

    // When user drags, stop automated camera tweening
    controls.addEventListener('start', () => {
      targetCamPosRef.current = null;
    });

    // 5. Studio Lighting Rig
    // Warm Sun Key Light
    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    sunLight.position.set(4, 5, 3);
    sunLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.camera.near = 0.5;
      sunLight.shadow.camera.far = 15;
      sunLight.shadow.bias = -0.0005;
      const d = 3;
      sunLight.shadow.camera.left = -d;
      sunLight.shadow.camera.right = d;
      sunLight.shadow.camera.top = d;
      sunLight.shadow.camera.bottom = -d;
    }
    scene.add(sunLight);

    // Cool Sky/Regolith Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e1b4b, 0.7);
    scene.add(hemiLight);

    // Subtle Rim Light for silhouette edge
    const rimLight = new THREE.DirectionalLight(0xc084fc, 1.0);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // 6. Ground Shadow Plane & Surface Grid
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x090a16,
      roughness: 0.9,
      metalness: 0.1,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.002;
    groundMesh.receiveShadow = !isSoftwareGl;
    scene.add(groundMesh);

    // Delicate circular coordinate grid
    const gridHelper = new THREE.PolarGridHelper(5, 12, 8, 32, 0x312e81, 0x1e1e38);
    gridHelper.position.y = 0.001;
    scene.add(gridHelper);

    // Starfield particles in the background
    const starGeo = new THREE.BufferGeometry();
    const starCount = 350;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40;
      starPositions[i + 1] = Math.random() * 25 + 2;
      starPositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 7. Instantiate Procedural 3D Model
    let model: THREE.Group;
    switch (modelKey) {
      case 'lrv':
        model = createLRVModel();
        break;
      case 'sojourner':
        model = createSojournerModel();
        break;
      case 'ingenuity':
        model = createIngenuityModel();
        break;
      case 'lunar_module':
        model = createLunarModuleModel();
        break;
      case 'retroreflector':
        model = createRetroreflectorModel();
        break;
      default:
        model = createLRVModel();
    }
    modelGroupRef.current = model;
    scene.add(model);

    // 8. Add 3D Hotspot Rings if defined
    const hotspotObjects: THREE.Group[] = [];
    if (hotspots && hotspots.length > 0) {
      hotspots.forEach((hs) => {
        const hsGroup = new THREE.Group();
        hsGroup.position.set(...hs.position);
        hsGroup.name = `hotspot-${hs.id}`;

        // Pulsing outer beacon ring
        const ringGeo = new THREE.RingGeometry(0.04, 0.06, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        hsGroup.add(ring);

        // Center bright sphere dot
        const dotGeo = new THREE.SphereGeometry(0.02, 12, 12);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        hsGroup.add(dot);

        scene.add(hsGroup);
        hotspotObjects.push(hsGroup);
      });
    }

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Tick with THREE.Timer
    const timer = typeof (THREE as any).Timer !== 'undefined'
      ? new (THREE as any).Timer()
      : new THREE.Clock();

    if ('connect' in timer && typeof (timer as any).connect === 'function') {
      (timer as any).connect(document);
    }

    const animate = (timestamp?: number) => {
      if ('update' in timer && typeof (timer as any).update === 'function') {
        (timer as any).update(timestamp);
      }
      const delta = timer.getDelta();
      const elapsed = 'getElapsed' in timer && typeof (timer as any).getElapsed === 'function'
        ? (timer as any).getElapsed()
        : ('getElapsedTime' in timer ? (timer as any).getElapsedTime() : 0);

      // Rotor animation for Ingenuity
      if (modelKey === 'ingenuity' && modelGroupRef.current) {
        const lowerRotor = modelGroupRef.current.getObjectByName('lower-rotor');
        const upperRotor = modelGroupRef.current.getObjectByName('upper-rotor');
        if (lowerRotor) lowerRotor.rotation.y += delta * 6.0;
        if (upperRotor) upperRotor.rotation.y -= delta * 6.0;
      }

      // Smooth camera interpolation toward target preset
      if (targetCamPosRef.current && cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, delta * 3.5);
        if (targetLookAtRef.current) {
          controlsRef.current.target.lerp(targetLookAtRef.current, delta * 3.5);
        }
        if (cameraRef.current.position.distanceTo(targetCamPosRef.current) < 0.04) {
          targetCamPosRef.current = null;
        }
      }

      // Hotspot subtle hover bobbing
      hotspotObjects.forEach((hs) => {
        hs.rotation.y += delta * 1.5;
      });

      // Microgravity gentle hover float
      if (microgravityFloatRef.current && modelGroupRef.current) {
        const t = elapsed * 1.5;
        modelGroupRef.current.position.y = Math.sin(t) * 0.02;
      } else if (modelGroupRef.current) {
        modelGroupRef.current.position.y = 0;
        modelGroupRef.current.rotation.z = 0;
      }

      // Auto rotation when enabled and user not interacting
      if (autoRotate && controlsRef.current && !targetCamPosRef.current) {
        controlsRef.current.autoRotate = true;
        controlsRef.current.autoRotateSpeed = 0.8;
      } else if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
      }

      controls.update();
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if ('dispose' in timer && typeof (timer as any).dispose === 'function') {
        (timer as any).dispose();
      }
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelKey, hotspots, autoRotate]);

  // Handle Wireframe Toggle
  useEffect(() => {
    if (!modelGroupRef.current) return;
    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const toggleWireframe = (mat: THREE.Material) => {
          if ('wireframe' in mat) {
            (mat as THREE.MeshStandardMaterial).wireframe = wireframeMode;
          }
        };
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(toggleWireframe);
        } else if (mesh.material) {
          toggleWireframe(mesh.material);
        }
      }
    });
  }, [wireframeMode]);

  // Camera Presets
  const setCameraPreset = (view: 'iso' | 'front' | 'top' | 'side') => {
    setCurrentCameraView(view);
    spaceAudio.playBeep(980);

    let targetPos: THREE.Vector3;
    const targetCenter = new THREE.Vector3(0, 0.4, 0);

    switch (view) {
      case 'front':
        targetPos = new THREE.Vector3(0, 0.6, 3.4);
        break;
      case 'top':
        targetPos = new THREE.Vector3(0, 4.2, 0.05);
        break;
      case 'side':
        targetPos = new THREE.Vector3(3.6, 0.6, 0);
        break;
      case 'iso':
      default:
        targetPos = new THREE.Vector3(2.8, 1.8, 3.0);
        break;
    }

    targetCamPosRef.current = targetPos;
    targetLookAtRef.current = targetCenter;
  };

  const focusHotspot = (hs: Hotspot) => {
    setActiveHotspot(hs);
    spaceAudio.playTelemetryChirp();
    if (onSelectHotspot) onSelectHotspot(hs);

    // Zoom camera toward hotspot
    const hsPos = new THREE.Vector3(...hs.position);
    targetCamPosRef.current = new THREE.Vector3(
      hsPos.x + 0.9,
      hsPos.y + 0.5,
      hsPos.z + 0.9
    );
    targetLookAtRef.current = hsPos;
  };

  return (
    <div className={`relative w-full h-full min-h-[460px] bg-[#060710] rounded-2xl overflow-hidden select-none border border-slate-800/80 shadow-2xl ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Badge (Spec & Mission Info) */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-code uppercase tracking-wider rounded-md bg-blue-950/80 text-blue-300 border border-blue-500/30">
            Interactive 3D Telemetry
          </span>
          <span className="px-2 py-0.5 text-xs font-code text-slate-400 bg-slate-900/60 rounded border border-slate-800">
            {missionName}
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-bold font-space text-white drop-shadow-md">
          {objectName}
        </h3>
        <p className="text-xs text-slate-400 hidden sm:block">
          Click & drag to rotate • Scroll to zoom • Select components below
        </p>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => {
            setMicrogravityFloat(!microgravityFloat);
            spaceAudio.playClick();
          }}
          title={microgravityFloat ? "Pause Microgravity Hover" : "Enable Microgravity Hover"}
          className={`p-2 rounded-xl text-xs font-code font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
            microgravityFloat
              ? 'bg-cyan-600/30 text-cyan-200 border-cyan-400/50 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-white'
          }`}
        >
          <span className="text-sm">🛰️</span>
          <span className="hidden md:inline">{microgravityFloat ? 'Float: ON' : 'Float: OFF'}</span>
        </button>

        <button
          onClick={() => {
            setAutoRotate(!autoRotate);
            spaceAudio.playClick();
          }}
          title={autoRotate ? "Pause Orbit Rotation" : "Start Orbit Rotation"}
          className={`p-2 rounded-xl text-xs font-code border transition-colors flex items-center gap-1.5 cursor-pointer ${
            autoRotate
              ? 'bg-blue-600/30 text-blue-200 border-blue-500/50'
              : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-white'
          }`}
        >
          <Rotate3d className="w-4 h-4 text-cyan-400" />
          <span className="hidden md:inline">{autoRotate ? 'Orbit: ON' : 'Orbit: OFF'}</span>
        </button>

        <button
          onClick={() => {
            setWireframeMode(!wireframeMode);
            spaceAudio.playClick();
          }}
          title="Toggle Wireframe CAD Mesh"
          className={`p-2 rounded-xl text-xs font-code border transition-colors flex items-center gap-1.5 cursor-pointer ${
            wireframeMode
              ? 'bg-purple-600/30 text-purple-200 border-purple-500/50'
              : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-purple-400" />
          <span className="hidden md:inline">Wireframe</span>
        </button>
      </div>

      {/* Active Hotspot Inspector Card (when a component is selected) */}
      {activeHotspot && !isCinemaMode && (
        <div className="absolute top-20 right-4 z-20 max-w-xs p-4 rounded-xl glass-panel border border-blue-500/40 text-left shadow-2xl animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-code tracking-wider uppercase">Component Inspection</span>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
            >
              ✕
            </button>
          </div>
          <h4 className="font-space font-bold text-white text-sm mb-1">{activeHotspot.name}</h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">{activeHotspot.description}</p>
          <div className="flex items-center justify-between text-[11px] font-code text-slate-400 border-t border-slate-800 pt-2">
            <span>Spatial Coord:</span>
            <span>[{activeHotspot.position.join(', ')}]</span>
          </div>
        </div>
      )}

      {/* Collapsible Unified Bottom Dock (Zero Viewport Occlusion Discipline) */}
      <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl transition-all duration-300 ${
        isCinemaMode ? 'translate-y-[calc(100%-2.2rem)]' : 'translate-y-0'
      }`}>
        {/* Toggle Dock Handle */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => {
              setIsCinemaMode(!isCinemaMode);
              spaceAudio.playBeep(650);
            }}
            className="px-3 py-1 text-[11px] font-code tracking-wider text-slate-300 bg-slate-900/90 border border-slate-700/80 rounded-full hover:bg-slate-800 flex items-center gap-1.5 shadow-lg backdrop-blur-none"
          >
            {isCinemaMode ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
                <span>Show Telemetry Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
                <span>Cinema Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Control Console Surface */}
        <div className="p-3 rounded-xl bg-slate-950/95 border border-slate-800 shadow-2xl flex flex-col gap-2.5">
          {/* Top Row: Camera Angle Presets */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-code">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>Camera Angles:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {(['iso', 'front', 'top', 'side'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setCameraPreset(view)}
                  className={`px-2.5 py-1 text-xs rounded-md font-code transition-all ${
                    currentCameraView === view
                      ? 'bg-blue-600 text-white font-medium shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {view.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Highlighted Structural Hotspots */}
          {hotspots && hotspots.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto pb-0.5">
              <span className="text-[11px] text-slate-400 font-code whitespace-nowrap flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-400" />
                Inspect Subsystem:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                {hotspots.map((hs) => {
                  const isSelected = activeHotspot?.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => focusHotspot(hs)}
                      className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-all border ${
                        isSelected
                          ? 'bg-cyan-950 text-cyan-200 border-cyan-400 font-medium'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {hs.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
