"use client";
import Image from "next/image";
import React from "react";

export default function RulesSection(): JSX.Element {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Rule.png"
        alt="Gothic City Background"
        fill
        priority
        className="absolute inset-0 object-cover"
        quality={100}
      />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto px-8">
        {/* Left Side - Rules Box */}
        <div className="w-1/2">
          <div className="bg-black/20 backdrop-blur-sm border-4 border-white/60 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-4 text-white font-mono">
              <div className="flex items-start space-x-3">
                <span className="text-red-400 text-xl">➤</span>
                <div>
                  <span className="text-red-400 font-bold">No Attacks:</span>
                  <span className="text-white ml-1">Participants must not engage in attacks against the competition's infrastructure, other players, or the organizers.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-red-400 text-xl">➤</span>
                <div>
                  <span className="text-red-400 font-bold">Flag Sharing:</span>
                  <span className="text-white ml-1">Maintain the confidentiality of flags, solutions, and hints; refrain from sharing them with others.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-red-400 text-xl">➤</span>
                <div>
                  <span className="text-red-400 font-bold">Prompt Submission:</span>
                  <span className="text-white ml-1">Flags should be submitted promptly once found; timely submission is key to earning points.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-red-400 text-xl">➤</span>
                <div>
                  <span className="text-red-400 font-bold">No External Collaboration:</span>
                  <span className="text-white ml-1">Participants are not allowed to collaborate with individuals outside of the competition during the event.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-red-400 text-xl">➤</span>
                <div>
                  <span className="text-red-400 font-bold">No Brute Force:</span>
                  <span className="text-white ml-1">Avoid using brute force techniques to solve challenges; focus on the intended methods.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-red-400 text-xl">➤</span>
                <div>
                  <span className="text-red-400 font-bold">No Automated Tools:</span>
                  <span className="text-white ml-1">The usage of automated vulnerability scanners or tools that generate excessive network traffic is strictly prohibited during the competition.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
}