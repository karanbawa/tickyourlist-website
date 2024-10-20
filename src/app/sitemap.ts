import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD

  return [
    // High Priority Pages
    {
      url: 'https://www.tickyourlist.com/',
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://www.tickyourlist.com/things-to-do-in-dubai/',
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/things-to-do-in-abu-dhabi/',
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Weekly Updated Pages
    // Add all your weekly pages here
    {
      url: 'https://www.tickyourlist.com/img-world-tickets/img-worlds-of-adventure-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/burj-khalifa-tickets/burj-khalifa-at-the-top-tickets-level-124-125',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/seaworld-abu-dhabi/tickets-to-seaworld-abu-dhabi',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/museum-of-the-future-tickets/museum-of-the-future-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-miracle-garden-tickets/dubai-miracle-garden',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/ferrari-world-tickets/ferrari-world-abu-dhabi-tickets-free-shuttle',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/aquaventure-waterpark-tickets/aquaventure-waterpark-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Medium Priority Pages
    // Weekly Updated Pages with Priority 0.8
    {
      url: 'https://www.tickyourlist.com/ski-dubai-tickets/ski-dubai',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/real-madrid-park-tickets/real-madrid-world-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/motiongate-dubai-tickets/motiongate-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/legoland-dubai-tickets/legoland-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/the-green-planet-dubai-tickets/green-planet-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/wild-wadi-tickets/wild-wadi-water-park-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-legoland-waterpark-tickets/legoland-waterpark-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-butterfly-garden-tickets/dubai-butterfly-garden-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/kidzania-dubai-tickets/kidzania-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/trick-art-museum-dubai-tickets/3d-world-dubai-trick-art-selfie-museum',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/warner-bros-world-abu-dhabi-tickets/warner-bros-worldtm-abu-dhabi-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-parks-and-resorts-tickets/dubai-parks-resorts-2-parks-pass',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/yas-waterworld-tickets/yas-waterworld-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/exclusive-aya-universe-tickets-save-25-TickYourList/tickets-to-aya-universe',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-frame-tickets/dubai-frame-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/skydiving/skydive-dubai-tandem-skydiving-at-desert-drop-zone',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/ekart-dubai-mall-tickets/ekart-zabeel-karting-zone-dubai-mall',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/jebel-jais-zipline-tickets-TickYourList/jebel-jais-flight-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-desert-safari/dubai-desert-safari-with-sandboarding-camel-ride-bbq-dinner',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/xline-dubai-zipline-tickets-TickYourList/xline-dubai-marina-zip-line',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-desert-safari/desert-safari-with-unlimited-bbq-buffet-dinner-live-shows',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/skydiving/skydive-dubai-palm',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/outdoor-activities/paramotor-tour-in-dubai',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/sky-views-observatory-tickets/sky-views-dubai-tickets-edge-walk-experience',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/helicopter-tours/skyhub-gyrocopter-flight-experience-at-the-palm-drop-zone',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/hot-air-balloon-dubai/hot-air-balloon-ride-in-dubai-with-transfers',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/hot-air-balloon-dubai/the-dubai-balloon-at-atlantis-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/museum-of-illusions-tickets/museum-of-illusions-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/arte-museum-tickets/arte-museum-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/madame-tussauds-dubai-tickets/madame-tussauds-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/sky-views-observatory-tickets/sky-views-observatory-ticket-with-glass-slide',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/burj-al-arab-tour/guided-tour-of-inside-burj-al-arab',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-lifestyle-and-entertainment/dubai-opera-house-tour',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/emirates-dubai-7s/emirates-dubai-sevens-one-day-pass',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/la-perle-dubai-tickets/la-perle-by-dragone-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-crocodile-park/tickets-to-dubai-crocodile-park',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/aquaventure-waterpark-tickets/atlantis-the-lost-chambers-aquarium-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/helicopter-tours/iconic-helicopter-tour-12-minutes',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/jet-skiing/jet-ski-in-dubai',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/aquaventure-waterpark-tickets/scuba-dive-at-atlantis-aquaventure',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/aquaventure-waterpark-tickets/kayak-or-paddle-dolphin-experience-at-atlantis-the-palm',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/kayaking/kayaking-experience-in-dubai',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/deep-dive-dubai-tickets/deep-dive-dubai-discover-scuba-diving',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/jet-skiing/jetpack-experience-in-dubai',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Lower Priority Pages
    {
      url: 'https://www.tickyourlist.com/about',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://www.tickyourlist.com/contact',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://www.tickyourlist.com/blog',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    }
  ]
}