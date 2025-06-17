// src/components/MascotCanvas.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import gsap from 'gsap';

// Create a simple 3D mascot (robot character)
function RobotMascot({ emotion, theme }: { emotion: 'happy' | 'sad' | 'neutral', theme: 'light' | 'dark' }) {
  const group = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  // Add these refs near top of RobotMascot:
  const torsoRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  // Update the mascot based on emotion
  useEffect(() => {
    if (
      !group.current || !sphereRef.current || !eyeLeftRef.current ||
      !eyeRightRef.current || !mouthRef.current
    ) return;
  
    const headMaterial = sphereRef.current.material as THREE.MeshStandardMaterial;
    const leftEyeMaterial = eyeLeftRef.current.material as THREE.MeshStandardMaterial;
    const rightEyeMaterial = eyeRightRef.current.material as THREE.MeshStandardMaterial;
  
    let mainColor: string;
    let eyeColor: string;
  
    // Reset bounce animation if switching away from happy
    gsap.killTweensOf(group.current.position);
  
    if (theme === 'light') {
      switch (emotion) {
        case 'happy':
          mainColor = '#4ade80';
          eyeColor = '#60a5fa';
  
          // Arms up
          gsap.to(leftArmRef.current?.rotation || {}, { z: 1.2, duration: 0.5 });
          gsap.to(rightArmRef.current?.rotation || {}, { z: -1.2, duration: 0.5 });
  
          // Slight backward lean
          gsap.to(torsoRef.current?.rotation || {}, { x: -0.2, duration: 0.5 });
          gsap.to(group.current.rotation, { x: -0.3, duration: 0.5 });
  
          // Bounce loop
          gsap.to(group.current.position, {
            y: "+=0.5",
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
          break;
  
        case 'sad':
          mainColor = '#f87171';
          eyeColor = '#94a3b8';
  
          // Arms down
          gsap.to(leftArmRef.current?.rotation || {}, { z: -0.8, duration: 0.5 });
          gsap.to(rightArmRef.current?.rotation || {}, { z: 0.8, duration: 0.5 });
  
          // Slouch forward
          gsap.to(torsoRef.current?.rotation || {}, { x: 0.3, duration: 0.5 });
          gsap.to(group.current.rotation, { x: 0.4, duration: 0.5 });
  
          // Slump down
          gsap.to(group.current.position, { y: -0.2, duration: 0.5 });
          break;
  
        default:
          mainColor = '#94a3b8';
          eyeColor = '#60a5fa';
  
          // Neutral arm pose
          gsap.to(leftArmRef.current?.rotation || {}, { z: 0.2, duration: 0.5 });
          gsap.to(rightArmRef.current?.rotation || {}, { z: -0.2, duration: 0.5 });
  
          // Reset posture
          gsap.to(torsoRef.current?.rotation || {}, { x: 0, duration: 0.5 });
          gsap.to(group.current.rotation, { x: 0, duration: 0.5 });
          gsap.to(group.current.position, { y: 0, duration: 0.5 });
          break;
      }
    } else {
      switch (emotion) {
        case 'happy':
          mainColor = '#a855f7';
          eyeColor = '#60a5fa';
  
          gsap.to(leftArmRef.current?.rotation || {}, { z: 1.2, duration: 0.5 });
          gsap.to(rightArmRef.current?.rotation || {}, { z: -1.2, duration: 0.5 });
  
          gsap.to(torsoRef.current?.rotation || {}, { x: -0.2, duration: 0.5 });
          gsap.to(group.current.rotation, { x: -0.3, duration: 0.5 });
  
          gsap.to(group.current.position, {
            y: "+=0.5",
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
          break;
  
        case 'sad':
          mainColor = '#ef4444';
          eyeColor = '#94a3b8';
  
          gsap.to(leftArmRef.current?.rotation || {}, { z: -0.8, duration: 0.5 });
          gsap.to(rightArmRef.current?.rotation || {}, { z: 0.8, duration: 0.5 });
  
          gsap.to(torsoRef.current?.rotation || {}, { x: 0.3, duration: 0.5 });
          gsap.to(group.current.rotation, { x: 0.4, duration: 0.5 });
          gsap.to(group.current.position, { y: -0.2, duration: 0.5 });
          break;
  
        default:
          mainColor = '#64748b';
          eyeColor = '#60a5fa';
  
          gsap.to(leftArmRef.current?.rotation || {}, { z: 0.2, duration: 0.5 });
          gsap.to(rightArmRef.current?.rotation || {}, { z: -0.2, duration: 0.5 });
  
          gsap.to(torsoRef.current?.rotation || {}, { x: 0, duration: 0.5 });
          gsap.to(group.current.rotation, { x: 0, duration: 0.5 });
          gsap.to(group.current.position, { y: 0, duration: 0.5 });
          break;
      }
    }
  
    // Animate color changes smoothly
    gsap.to(headMaterial.color, {
      r: new THREE.Color(mainColor).r,
      g: new THREE.Color(mainColor).g,
      b: new THREE.Color(mainColor).b,
      duration: 0.5
    });
  
    gsap.to(leftEyeMaterial.color, {
      r: new THREE.Color(eyeColor).r,
      g: new THREE.Color(eyeColor).g,
      b: new THREE.Color(eyeColor).b,
      duration: 0.5
    });
  
    gsap.to(rightEyeMaterial.color, {
      r: new THREE.Color(eyeColor).r,
      g: new THREE.Color(eyeColor).g,
      b: new THREE.Color(eyeColor).b,
      duration: 0.5
    });
  
    const currentGroup = group.current;
    const currentMouth = mouthRef.current;
    const currentEyeLeft = eyeLeftRef.current;
    const currentEyeRight = eyeRightRef.current;
  
    return () => {
      gsap.killTweensOf(currentGroup?.position);
      gsap.killTweensOf(currentGroup?.rotation);
      gsap.killTweensOf(currentMouth?.scale);
      gsap.killTweensOf([currentEyeLeft?.scale, currentEyeRight?.scale]);
      gsap.killTweensOf([currentEyeLeft?.position, currentEyeRight?.position]);
      gsap.killTweensOf([leftArmRef.current?.rotation, rightArmRef.current?.rotation]);
      gsap.killTweensOf([torsoRef.current?.rotation]);
    };
  }, [emotion, theme]);
  
  // Add subtle rotation for more lifelike appearance
  useFrame((state) => {
    if (!group.current) return;
    
    // Add subtle swaying based on time
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) * 0.3;
  });

  // Determine material color based on theme
  const bodyMaterialProps = {
    metalness: 0.5,
    roughness: 0.3,
    color: theme === 'light' 
      ? (emotion === 'happy' ? '#4ade80' : emotion === 'sad' ? '#f87171' : '#94a3b8')
      : (emotion === 'happy' ? '#a855f7' : emotion === 'sad' ? '#ef4444' : '#64748b')
  };

  const eyeMaterialProps = {
    metalness: 0.8,
    roughness: 0.2,
    color: theme === 'light' ? '#60a5fa' : '#60a5fa',
    emissive: theme === 'light' ? '#60a5fa' : '#3b82f6',
    emissiveIntensity: 0.5
  };
  
  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Main sphere (head) */}
      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial {...bodyMaterialProps} />
      </mesh>
      
      {/* Left eye */}
      <mesh ref={eyeLeftRef} position={[-0.4, 0.3, 0.8]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial {...eyeMaterialProps} />
      </mesh>
      
      {/* Right eye */}
      <mesh ref={eyeRightRef} position={[0.4, 0.3, 0.8]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial {...eyeMaterialProps} />
      </mesh>
      
      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, -0.2, 0.8]}>
        <boxGeometry args={[0.5, 0.1, 0.1]} />
        <meshStandardMaterial color={theme === 'light' ? '#1e293b' : '#e2e8f0'} />
      </mesh>

      {/* Antennas */}
      <mesh position={[-0.3, 1, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial {...bodyMaterialProps} />
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial {...eyeMaterialProps} emissiveIntensity={1} />
        </mesh>
      </mesh>

      {/* Torso */}
      <mesh ref={torsoRef} position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
        <meshStandardMaterial {...bodyMaterialProps} />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.7, -0.6, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 12]} />
        <meshStandardMaterial {...bodyMaterialProps} />
      </mesh>

      <mesh ref={rightArmRef} position={[0.7, -0.6, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 12]} />
        <meshStandardMaterial {...bodyMaterialProps} />
      </mesh>

      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.3, -2.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 12]} />
        <meshStandardMaterial {...bodyMaterialProps} />
      </mesh>

      <mesh ref={rightLegRef} position={[0.3, -2.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 12]} />
        <meshStandardMaterial {...bodyMaterialProps} />
      </mesh>
      
      <mesh position={[0.3, 1, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial {...bodyMaterialProps} />
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial {...eyeMaterialProps} emissiveIntensity={1} />
        </mesh>
      </mesh>
    </group>
  );
}

interface MascotCanvasProps {
  emotion: 'happy' | 'sad' | 'neutral';
  theme: 'light' | 'dark';
}

export function MascotCanvas({ emotion, theme }: MascotCanvasProps) {
  return (
    <div className="w-40 h-40">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          intensity={1.5}
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <RobotMascot emotion={emotion} theme={theme} />
      </Canvas>
    </div>
  );
}

export function MascotWithText({ emotion, theme }: MascotCanvasProps) {
  const messageColor = 
    theme === 'light'
      ? emotion === 'happy' 
        ? '#4ade80' 
        : emotion === 'sad' 
          ? '#f87171' 
          : '#94a3b8'
      : emotion === 'happy' 
        ? '#a855f7' 
        : emotion === 'sad' 
          ? '#ef4444' 
          : '#64748b';

  return (
    <div className="flex flex-col items-center">
      <MascotCanvas emotion={emotion} theme={theme} />
    </div>
  );
}