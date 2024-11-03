import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  return [
    // High Priority Pages
    {
      url: 'https://www.tickyourlist.com/',
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Weekly Updated Pages with Priority 0.9
    {
      url: 'https://www.tickyourlist.com/tickets/book-img-worlds-of-adventure-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/tickets/book-ski-dubai-snow-park-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/tickets/book-motiongate-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/aquaventure-waterpark-tickets/book-aquaventure-waterpark-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/warner-bros-world-abu-dhabi-tickets/book-warner-bros-world-abu-dhabi-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-parks-and-resorts-tickets/book-dubai-parks-resorts-2-parks-pass',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/yas-waterworld-tickets/book-yas-waterworld-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/seaworld-abu-dhabi/book-seaworld-abu-dhabi',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/ferrari-world-tickets/book-ferrari-world-abu-dhabi-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/yas-island-tickets/book-yas-island-multi-park-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-miracle-garden-tickets/book-dubai-miracle-garden-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/aya-universe-tickets/book-aya-universe-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/museum-of-the-future-tickets/book-museum-of-the-future-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-desert-safari/book-premium-dubai-desert-safari',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-desert-safari/book-dubai-desert-safari-with-unlimited-bbq-buffet-dinner-live-shows',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-frame-tickets/book-dubai-frame-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-aquarium-tickets/book-dubai-aquarium-underwater-zoo-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Weekly Updated Pages with Priority 0.8
    {
      url: 'https://www.tickyourlist.com/tickets/book-real-madrid-world-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/legoland-dubai-tickets/book-legoland-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/the-green-planet-dubai-tickets/book-green-planet-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/wild-wadi-tickets/book-wild-wadi-water-park-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-legoland-waterpark-tickets/book-legoland-waterpark-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-butterfly-garden-tickets/book-dubai-butterfly-garden-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/kidzania-dubai-tickets/book-kidzania-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/trick-art-museum-dubai-tickets/book-3d-world-dubai-trick-art-selfie-museum',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/global-village-dubai-tickets/book-global-village-dubai',
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
      url: 'https://www.tickyourlist.com/jebel-jais-zipline-tickets/jebel-jais-flight-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/xline-dubai-zipline-tickets/book-xline-dubai-marina-zip-line',
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
      url: 'https://www.tickyourlist.com/helicopter-tours/book-gyrocopter-flight-dubai-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/hot-air-balloon-dubai/book-hot-air-balloon-flight-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
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
      url: 'https://www.tickyourlist.com/arte-museum-tickets/book-arte-museum-tickets',
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
      priority: 0.9,
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
      url: 'https://www.tickyourlist.com/la-perle-dubai-tickets/book-la-perle-by-dragone-tickets',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.tickyourlist.com/dubai-crocodile-park/book-dubai-crocodile-park-tickets',
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
      url: 'https://www.tickyourlist.com/dubai-safari-park-tickets/dubai-safari-park',
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
      url: 'https://www.tickyourlist.com/contact',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.tickyourlist.com/about',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://www.tickyourlist.com/careers',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.tickyourlist.com/blog',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];
}
