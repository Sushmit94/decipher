"use client";

import { useEffect } from "react";
import Image from "next/image";
import GlobeImg from "/public/images/globe.png";
import styles from "./sposers-glitch.module.css";
import { PowerGlitch } from "powerglitch";

export default function GlitchOrb() {
  useEffect(() => {
    const applyGlitch = () => {
      const isHorizontal = Math.random() > 0.4;
      const amplitudeX = isHorizontal ? Math.random() * 2 : 0;
      const amplitudeY = !isHorizontal ? Math.random() * 2 : 0;

      PowerGlitch.glitch(".piyush", {
  "playMode": "always",
  "optimizeSeo": true,
  "createContainers": true,
  "hideOverflow": false,
  "timing": {
    "duration": 2000
  },
  "glitchTimeSpan": {
    "start": 0.5,
    "end": 0.7
  },
  "shake": {
    "velocity": 15,
    "amplitudeX": 0.2,
    "amplitudeY": 0.2
  },
  "slice": {
    "count": 6,
    "velocity": 15,
    "minHeight": 0.01,
    "maxHeight": 0.15,
    "hueRotate": true
  },
  "pulse": false
});
    };

    applyGlitch(); 

    const interval = setInterval(() => {
      const element = document.querySelector(".piyush");
      if (element) {
        element.innerHTML = element.innerHTML; 
        applyGlitch();
      }
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute z-10 right-[7rem] top-[0vh] max-sm:right-4 max-sm:top-[2rem]">
      <div className="relative w-[9rem] h-[9rem] max-sm:w-[4rem] max-sm:h-[4rem] grayscale opacity-40">
     
        <Image
          src={GlobeImg}
          alt="Globe"
          fill
          className={`object-contain piyush ${styles.glitchBase}`}
        />
        <Image
          src={GlobeImg}
          alt="Glitch Red"
          fill
          className={`object-contain piyush ${styles.glitchRed}`}
        />
        <Image
          src={GlobeImg}
          alt="Glitch Green"
          fill
          className={`object-contain piyush ${styles.glitchGreen}`}
        />
        <Image
          src={GlobeImg}
          alt="Glitch Blue"
          fill
          className={`object-contain piyush ${styles.glitchBlue}`}
        />

      
       
      </div>
    </div>
  );
}
