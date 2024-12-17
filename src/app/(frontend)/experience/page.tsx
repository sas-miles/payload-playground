import React from 'react'
import Canvas from '@/components/Canvas/Canvas'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

export const revalidate = 600

async function ExperiencePage() {
  try {
    const payload = await getPayload({ config: configPromise })
    const experience = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'experience',
        },
      },
    })

    // If no page is found, show 404
    if (!experience.docs.length) {
      notFound()
    }

    const pageData = experience.docs[0]

    return (
      <main>
        <div className="fixed inset-0 h-screen w-screen">
          <Canvas data={pageData} />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Failed to load experience page:', error)
    throw error // This will trigger the closest error boundary
  }
}

export default ExperiencePage
