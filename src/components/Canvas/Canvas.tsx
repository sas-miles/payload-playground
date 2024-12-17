'use client'

import { OrbitControls } from '@react-three/drei'
import { Stage } from '@react-three/drei'
import React from 'react'
import { Canvas as CanvasThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export default function Canvas({ data }: { data: Page }) {
  console.log(data.layout[0])
  return (
    <CanvasThree camera={{ position: [0, 0, -4] }}>
      <OrbitControls />
      <Stage environment="sunset" intensity={0.5} adjustCamera={false}>
        <Html>
          <div className="text-white">{data.title}</div>
          <div className="max-h-[10vh] select-none">
            {data.layout[0].blockType === 'mediaBlock' &&
              data.layout[0].media &&
              typeof data.layout[0].media === 'object' && (
                <Media
                  imgClassName="-z-10 object-cover"
                  priority={false}
                  loading="lazy"
                  resource={data.layout[0].media}
                />
              )}
          </div>
          {data.hero.richText && (
            <RichText className="mb-6" data={data.hero.richText} enableGutter={false} />
          )}
        </Html>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </Stage>
    </CanvasThree>
  )
}
