"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MissmealentinePage() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const [yesScale, setYesScale] = useState(1)

  const noTexts = [
    "Nein",
    "Are you damn sure?",
    "Again?",
    "You little prick!",
    "Biggest wanker in the universe",
    "Really?? WOW",
    "Men...",
    "Still testing how long would it go till you hit the yes button, aren't you",
    "Oh it fucking goes",
    "See? I wasn't lying",
    "Right, I see...",
    "You don't love me anymore...",
    ":((((((",
    "FUCK OFF NOW",
  ]

  // Calculate random position OUTSIDE the card
  const getNoButtonStyle = () => {
    if (noCount === 0) return {}; // Initial centered position
    
    // Function to get random position outside the card
    const getRandomOutsidePosition = () => {
      const cardWidth = 650; // matches w-[650px]
      const cardHeight = 600; // approximate card height
      const buttonWidth = 120; // increased for longer text
      const buttonHeight = 40; // approximate button height
      const padding = 20; // padding from viewport edges
      
      // Define the safe zones outside the card
      const zones = [
        // Above card
        { 
          x: [padding, window.innerWidth - buttonWidth - padding],
          y: [padding, (window.innerHeight - cardHeight) / 2 - buttonHeight - padding]
        },
        // Below card
        {
          x: [padding, window.innerWidth - buttonWidth - padding],
          y: [(window.innerHeight + cardHeight) / 2 + padding, window.innerHeight - buttonHeight - padding]
        },
        // Left of card
        {
          x: [padding, (window.innerWidth - cardWidth) / 2 - buttonWidth - padding],
          y: [padding, window.innerHeight - buttonHeight - padding]
        },
        // Right of card
        {
          x: [(window.innerWidth + cardWidth) / 2 + padding, window.innerWidth - buttonWidth - padding],
          y: [padding, window.innerHeight - buttonHeight - padding]
        }
      ];

      // Pick a random zone
      const zone = zones[Math.floor(Math.random() * zones.length)];
      
      // Ensure we have valid coordinates
      const x = Math.min(Math.max(zone.x[0], Math.random() * (zone.x[1] - zone.x[0]) + zone.x[0]), zone.x[1]);
      const y = Math.min(Math.max(zone.y[0], Math.random() * (zone.y[1] - zone.y[0]) + zone.y[0]), zone.y[1]);
      
      return {
        left: `${x}px`,
        top: `${y}px`,
      };
    };
    
    return {
      position: 'fixed' as const,
      ...getRandomOutsidePosition(),
    };
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1)
    // First fill the card, then the screen
    if (noCount < 8) {
      // Scale to gradually fill the card
      setYesScale(scale => scale * 1.4)
    } else if (noCount < 16) {
      // Scale to fill the entire screen
      setYesScale(scale => scale * 2)
    }
  }

  // Hide no button when yes button gets too big
  const shouldShowNoButton = yesScale < 30 && !yesPressed;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 
  bg-gradient-to-b from-blue-50 via-blue-800 to-blue-50">
      <Card className="w-[650px] relative overflow-visible bg-yellow-100">
        <CardHeader>
          <CardTitle className="text-center">GF appreciation page</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-[300px] h-[300px] relative mb-8">
             <Image
              src="/penpen.gif"
              alt="penguin"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <CardDescription className="text-center">Miss me please?</CardDescription>
          <div className="flex items-center justify-center w-full relative" style={{ minHeight: '150px' }}>
            <div className="flex gap-4 items-center justify-center">
              <motion.div 
                style={{ scale: yesScale }}
                className="rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
              >
                <Button 
                  variant="default" 
                  className="px-8 bg-transparent hover:bg-transparent"
                  onClick={() => setYesPressed(true)}
                >
                  Ja
                </Button>
              </motion.div>
              {shouldShowNoButton && (
                <Button
                  variant="default"
                  style={noCount === 0 ? {} : getNoButtonStyle()}
                  className={`px-8 bg-red-500 hover:bg-red-600 ${noCount > 0 ? 'fixed' : ''}`}
                  onClick={handleNoClick}
                >
                  {noTexts[Math.min(noCount, noTexts.length - 1)]}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <p>Made by F with love ❤️</p>
      
      {yesPressed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle className="text-center">Fianlly, you bastard 🙄</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <p className="text-center">Yes, I miss you too if you're wondering heehee 🦭🦆🦉🐰🐮🦥😇</p>
              <Link 
                href="/flower"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                Here's a little bonquet for you!🌷
              </Link>
              <p>There's somthing I want to let you know...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}