// ─── ADMIN CONFIG ───────────────────────────────────────────
export const ADMIN_EMAILS = ["leemuchiri175@gmail.com", "martztush@gmail.com"];
export const ADMIN_PASSWORD = "RoyalAdmin2024!Secure";

// ─── FORMATTING ─────────────────────────────────────────────
export const formatKES = (n) => `KES ${Number(n).toLocaleString("en-KE")}`;
export const formatDate = (d) => new Date(d).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
export const formatDateShort = (d) => new Date(d).toLocaleDateString("en-KE", { day: "numeric", month: "short" });
export const calcNights = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 864e5));

export const PRICE_CAT = (p) => {
  if (p <= 3500) return { label: "Budget", color: "#16a34a", bg: "#dcfce7" };
  if (p <= 8000) return { label: "Mid-range", color: "#2563eb", bg: "#dbeafe" };
  if (p <= 15000) return { label: "Premium", color: "#7c3aed", bg: "#ede9fe" };
  if (p <= 50000) return { label: "Luxury", color: "#d97706", bg: "#fef3c7" };
  return { label: "Ultra-luxury", color: "#dc2626", bg: "#fee2e2" };
};

export const STATUS_CFG = {
  pending_payment:  { label: "Awaiting Payment",  color: "#d97706", bg: "#fef3c7", dot: "#f59e0b" },
  payment_uploaded: { label: "Proof Submitted",   color: "#2563eb", bg: "#dbeafe", dot: "#3b82f6" },
  payment_verified: { label: "Payment Verified",  color: "#7c3aed", bg: "#ede9fe", dot: "#8b5cf6" },
  confirmed:        { label: "Confirmed",          color: "#16a34a", bg: "#dcfce7", dot: "#22c55e" },
  cancelled:        { label: "Cancelled",          color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
  completed:        { label: "Completed",          color: "#4b5563", bg: "#f3f4f6", dot: "#6b7280" },
  refunded:         { label: "Refunded",           color: "#ea580c", bg: "#ffedd5", dot: "#f97316" },
  no_show:          { label: "No Show",            color: "#7c3aed", bg: "#ede9fe", dot: "#a78bfa" },
};

export const AMENITY_ICONS = {
  "WiFi": "📶", "TV": "📺", "Kitchen": "🍳", "Air Conditioning": "❄️",
  "Heating": "🔥", "Pool": "🏊", "Gym": "🏋️", "Breakfast": "🥞",
  "Parking": "🅿️", "BBQ Grill": "🪵", "Pet Allowed": "🐾",
  "Hot Tub": "🛁", "Work Space": "💼", "Washer": "🫧",
  "Security": "🔐", "Balcony": "🌅", "Garden": "🌿",
  "Fireplace": "🔥", "Elevator": "🛗", "EV Charging": "⚡",
};

// ─── PROPERTIES ─────────────────────────────────────────────
export const MOCK_PROPERTIES = [
  {
    id: "p1", slug: "serene-villa-diani-beach", name: "Serene Beach Villa",
    city: "Diani Beach", county: "Kwale", property_type: "villa",
    price_per_night: 12500, bedrooms: 4, bathrooms: 3, max_guests: 8,
    featured_image: "https://images.unsplash.com/photo-1602343168117-bb8afa9aceae?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602343168117-bb8afa9aceae?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],
    average_rating: 4.8, total_reviews: 32, total_bookings: 48, status: "approved",
    amenities: ["WiFi", "Pool", "Kitchen", "Breakfast", "BBQ Grill", "Air Conditioning", "Balcony", "Security", "Parking"],
    description: "A stunning beachfront villa with breathtaking Indian Ocean views. Wake up to the sound of waves and enjoy direct beach access. The villa features a stunning infinity pool, fully equipped gourmet kitchen, and generous outdoor terraces.\n\nPerfect for families and groups seeking ultimate relaxation in a luxurious coastal setting. Our team is on hand 24/7 to ensure your stay exceeds every expectation.",
    short_description: "Luxury beachfront villa with infinity pool & ocean views",
    highlights: ["Direct beach access", "Infinity pool", "Gourmet kitchen", "24/7 staff"],
    cancellation_policy: "moderate", minimum_stay: 2, checkin_time: "14:00", checkout_time: "11:00",
    cleaning_fee: 2000, security_deposit: 10000,
    owner_id: "u2", owner_name: "James Mwangi", owner_since: "2022", owner_superhost: true,
    latitude: -4.2833, longitude: 39.5833,
    nearby: ["Diani Beach (2 min walk)", "Forty Thieves Bar (10 min)", "Shimba Hills Reserve (45 min)", "Wasini Island (1 hr)"],
    reviews: [
      { user: "Mary W.", rating: 5, date: "Mar 2024", comment: "Absolutely stunning! The views are breathtaking and James was incredibly responsive. The infinity pool at sunset is unforgettable.", avatar: "M" },
      { user: "Peter K.", rating: 5, date: "Feb 2024", comment: "Best vacation we've ever had. Pool is immaculate, beach is pristine, and the kitchen is stocked with everything you need. Will definitely be back!", avatar: "P" },
      { user: "Aisha A.", rating: 4, date: "Jan 2024", comment: "Beautiful property, great location. The cleaning fee was worth it for how clean everything was. Minor issue with AC in one room but James fixed it immediately.", avatar: "A" },
      { user: "Tom R.",   rating: 5, date: "Dec 2023", comment: "Celebrated our anniversary here. The staff set up a surprise dinner on the beach — absolutely magical. 10/10 would recommend.", avatar: "T" },
    ]
  },
  {
    id: "p2", slug: "nairobi-skyline-apartment", name: "Nairobi Skyline Apartment",
    city: "Nairobi", county: "Nairobi", property_type: "apartment",
    price_per_night: 5500, bedrooms: 2, bathrooms: 2, max_guests: 4,
    featured_image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
    ],
    average_rating: 4.6, total_reviews: 58, total_bookings: 94, status: "approved",
    amenities: ["WiFi", "TV", "Kitchen", "Air Conditioning", "Gym", "Work Space", "Parking", "Security", "Elevator"],
    description: "Modern apartment in the heart of Nairobi with panoramic city views from the 18th floor. Designed for the discerning business traveler and urban explorer.\n\nHigh-speed fibre WiFi, a fully equipped home office, and a building gym make this the ideal base for work trips. Minutes from the CBD, Westgate, and top restaurants.",
    short_description: "Modern 18th-floor apartment with panoramic city views",
    highlights: ["18th floor views", "High-speed fibre WiFi", "Building gym", "5 min to CBD"],
    cancellation_policy: "strict", minimum_stay: 1, checkin_time: "15:00", checkout_time: "11:00",
    cleaning_fee: 1000, security_deposit: 5000,
    owner_id: "u3", owner_name: "Amina Hassan", owner_since: "2021", owner_superhost: true,
    latitude: -1.2921, longitude: 36.8219,
    nearby: ["CBD (5 min)", "Westgate Mall (15 min)", "KICC (10 min)", "JKIA (35 min)"],
    reviews: [
      { user: "David O.", rating: 5, date: "Mar 2024", comment: "Perfect for work trips. Fast WiFi, great views, and super central. The gym is a nice bonus.", avatar: "D" },
      { user: "Grace N.", rating: 4, date: "Feb 2024", comment: "Clean and modern. Views of Nairobi at night are spectacular. Would stay again.", avatar: "G" },
      { user: "Kevin M.", rating: 5, date: "Jan 2024", comment: "Amina is a fantastic host. Apartment is exactly as described. Very secure building.", avatar: "K" },
    ]
  },
  {
    id: "p3", slug: "maasai-mara-luxury-lodge", name: "Mara Safari Lodge",
    city: "Maasai Mara", county: "Narok", property_type: "luxury_lodge",
    price_per_night: 28000, bedrooms: 1, bathrooms: 1, max_guests: 2,
    featured_image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
    average_rating: 4.9, total_reviews: 21, total_bookings: 29, status: "approved",
    amenities: ["WiFi", "Breakfast", "BBQ Grill", "Hot Tub", "Balcony", "Garden"],
    description: "Experience the magic of the Maasai Mara from your private luxury lodge. Wake up to lions roaring, elephants at the waterhole, and an endless golden savanna stretching to the horizon.\n\nYour stay includes a guided morning game drive with an expert Maasai guide, full breakfast, and sundowner cocktails overlooking the Mara River.",
    short_description: "Exclusive private safari lodge at the Maasai Mara",
    highlights: ["Guided game drive included", "Big 5 viewing", "Private hot tub", "Mara River views"],
    cancellation_policy: "strict", minimum_stay: 2, checkin_time: "14:00", checkout_time: "10:00",
    cleaning_fee: 3000, security_deposit: 15000,
    owner_id: "u4", owner_name: "David Kipchoge", owner_since: "2020", owner_superhost: true,
    latitude: -1.5, longitude: 35.1333,
    nearby: ["Mara River (20 min)", "Maasai Village (5 min)", "Hot Air Balloon Launch (30 min)", "Mara Triangle (1 hr)"],
    reviews: [
      { user: "Sophie M.", rating: 5, date: "Feb 2024", comment: "A once-in-a-lifetime experience. Woke up to elephants right outside. David is an extraordinary host.", avatar: "S" },
      { user: "Luca B.",   rating: 5, date: "Jan 2024", comment: "We saw all Big 5 in one morning! The lodge is incredibly comfortable and the food is excellent.", avatar: "L" },
    ]
  },
  {
    id: "p4", slug: "lamu-old-town-house", name: "Lamu Heritage House",
    city: "Lamu", county: "Lamu", property_type: "holiday_home",
    price_per_night: 7800, bedrooms: 3, bathrooms: 2, max_guests: 6,
    featured_image: "https://images.unsplash.com/photo-1587382901867-5b9a58c7bc6d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587382901867-5b9a58c7bc6d?w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    ],
    average_rating: 4.7, total_reviews: 14, total_bookings: 21, status: "approved",
    amenities: ["WiFi", "Kitchen", "Breakfast", "TV", "Balcony", "Garden", "Security"],
    description: "An authentic Swahili house in Lamu Old Town, a UNESCO World Heritage Site. 400 years of history breathes through hand-carved Zanzibari doors, coral stone walls, and ornate plasterwork.\n\nThe rooftop terrace offers sweeping views of the harbour and the call to prayer at dusk is an unforgettable soundtrack to sundowners.",
    short_description: "Authentic 400-year-old Swahili house in UNESCO World Heritage town",
    highlights: ["UNESCO heritage location", "Hand-carved Zanzibari doors", "Rooftop harbour views", "Dhow trips arranged"],
    cancellation_policy: "moderate", minimum_stay: 3, checkin_time: "14:00", checkout_time: "11:00",
    cleaning_fee: 1500, security_deposit: 6000,
    owner_id: "u2", owner_name: "James Mwangi", owner_since: "2022", owner_superhost: true,
    latitude: -2.2694, longitude: 40.9022,
    nearby: ["Lamu Fort (5 min walk)", "Old Town Market (2 min walk)", "Shela Beach (20 min dhow)", "Manda Island (30 min)"],
    reviews: [
      { user: "Thomas L.", rating: 5, date: "Jan 2024", comment: "An extraordinary place. Totally unique. The rooftop at sunset is magical. We took a dhow to Shela beach and it was perfect.", avatar: "T" },
      { user: "Priya S.",  rating: 5, date: "Nov 2023", comment: "Magical. The house is full of character and history. James arranged everything perfectly.", avatar: "P" },
    ]
  },
  {
    id: "p5", slug: "naivasha-lake-cottage", name: "Lake Naivasha Cottage",
    city: "Lake Naivasha", county: "Nakuru", property_type: "cottage",
    price_per_night: 4200, bedrooms: 2, bathrooms: 1, max_guests: 4,
    featured_image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    ],
    average_rating: 4.5, total_reviews: 29, total_bookings: 47, status: "approved",
    amenities: ["WiFi", "Kitchen", "BBQ Grill", "Pet Allowed", "Parking", "Garden", "Fireplace"],
    description: "A cozy lakeside cottage surrounded by acacia trees and flowering bougainvillea. Watch hippos graze from your veranda, enjoy spectacular birdwatching, and take boat rides across Lake Naivasha at sunset.\n\nPet-friendly, family-friendly, and budget-conscious — this is the perfect weekend escape from Nairobi.",
    short_description: "Cozy lakeside cottage with hippo sightings at your doorstep",
    highlights: ["Hippos at the shore", "Boat rides on the lake", "Pet-friendly", "2 hrs from Nairobi"],
    cancellation_policy: "flexible", minimum_stay: 1, checkin_time: "13:00", checkout_time: "11:00",
    cleaning_fee: 800, security_deposit: 3000,
    owner_id: "u5", owner_name: "Grace Wanjiru", owner_since: "2023", owner_superhost: false,
    latitude: -0.7833, longitude: 36.4167,
    nearby: ["Hell's Gate NP (20 min)", "Lake Naivasha (50m)", "Crescent Island (10 min boat)", "Elsamere (15 min)"],
    reviews: [
      { user: "Kevin M.", rating: 5, date: "Mar 2024", comment: "Woke up to hippos at the shore! The cottage is cozy and Grace is a wonderful host. Brought our dog and he loved it.", avatar: "K" },
      { user: "Lily C.",  rating: 4, date: "Feb 2024", comment: "Peaceful, beautiful, and great value. The fireplace at night is magical. The birdwatching is incredible.", avatar: "L" },
      { user: "John P.",  rating: 5, date: "Jan 2024", comment: "Best weekend getaway from Nairobi. Everything you need and nothing you don't.", avatar: "J" },
    ]
  },
  {
    id: "p6", slug: "mombasa-old-town-boutique", name: "Mombasa Old Town Boutique",
    city: "Mombasa", county: "Mombasa", property_type: "boutique_hotel",
    price_per_night: 6200, bedrooms: 1, bathrooms: 1, max_guests: 2,
    featured_image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    ],
    average_rating: 4.4, total_reviews: 41, total_bookings: 62, status: "approved",
    amenities: ["WiFi", "Breakfast", "Air Conditioning", "TV", "Security"],
    description: "Boutique hotel blending Swahili and Arabic architecture in historic Mombasa Old Town. Walking distance to Fort Jesus, the Old Harbour, and the best biryani in East Africa.\n\nA genuinely unique stay that puts you in the heart of 500 years of Swahili coastal culture.",
    short_description: "Historic boutique in Mombasa's 500-year-old old town",
    highlights: ["Fort Jesus (5 min walk)", "Swahili cuisine nearby", "Old Harbour views", "Fully air-conditioned"],
    cancellation_policy: "moderate", minimum_stay: 1, checkin_time: "14:00", checkout_time: "11:00",
    cleaning_fee: 500, security_deposit: 4000,
    owner_id: "u3", owner_name: "Amina Hassan", owner_since: "2021", owner_superhost: true,
    latitude: -4.0435, longitude: 39.6682,
    nearby: ["Fort Jesus (5 min walk)", "Old Harbour (10 min)", "Nyali Beach (20 min)", "Haller Park (30 min)"],
    reviews: [
      { user: "Rachel T.", rating: 4, date: "Mar 2024", comment: "Dripping with character and history. The breakfast is outstanding — fresh mandazi and chai.", avatar: "R" },
      { user: "Ahmed K.",  rating: 5, date: "Feb 2024", comment: "Perfect location. The owner is very knowledgeable about the history of the old town.", avatar: "A" },
    ]
  },
  {
    id: "p7", slug: "samburu-treehouse-retreat", name: "Samburu Treehouse",
    city: "Samburu", county: "Samburu", property_type: "treehouse",
    price_per_night: 19500, bedrooms: 1, bathrooms: 1, max_guests: 2,
    featured_image: "https://images.unsplash.com/photo-1510525009512-ad7fc9e61bc1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1510525009512-ad7fc9e61bc1?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    ],
    average_rating: 5.0, total_reviews: 9, total_bookings: 11, status: "approved",
    amenities: ["WiFi", "Breakfast", "Hot Tub", "Balcony", "Garden"],
    description: "Sleep among the acacia trees in this elevated treehouse with 360° views of the Samburu National Reserve. Fall asleep to the sounds of the African bush — lions calling, elephants splashing in the Ewaso Nyiro river below.\n\nThe rarest kind of stay: utterly unique, deeply comfortable, and genuinely wild.",
    short_description: "Elevated treehouse above Samburu National Reserve — rated 5★ by all guests",
    highlights: ["360° bush views", "Private hot tub", "River below", "Grevy's zebra sightings"],
    cancellation_policy: "strict", minimum_stay: 2, checkin_time: "15:00", checkout_time: "10:00",
    cleaning_fee: 2500, security_deposit: 12000,
    owner_id: "u4", owner_name: "David Kipchoge", owner_since: "2020", owner_superhost: true,
    latitude: 0.5833, longitude: 37.5333,
    nearby: ["Samburu NR (direct access)", "Ewaso Nyiro River (100m)", "Buffalo Springs (15 min)", "Shaba NR (45 min)"],
    reviews: [
      { user: "Nina B.", rating: 5, date: "Mar 2024", comment: "Unlike anything I've ever experienced. Woke up to a giraffe outside the window. Absolute perfection.", avatar: "N" },
      { user: "Chris E.", rating: 5, date: "Jan 2024", comment: "The most remarkable stay of my life. The hot tub at night with stars overhead is something I'll never forget.", avatar: "C" },
    ]
  },
  {
    id: "p8", slug: "nyeri-mountain-guesthouse", name: "Mt Kenya Forest Guesthouse",
    city: "Nyeri", county: "Nyeri", property_type: "guesthouse",
    price_per_night: 3800, bedrooms: 3, bathrooms: 2, max_guests: 6,
    featured_image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    ],
    average_rating: 4.3, total_reviews: 17, total_bookings: 24, status: "approved",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Parking", "Garden", "Breakfast"],
    description: "A charming forest guesthouse on the slopes of Mt Kenya. Start your day with fresh highland air, tea from a nearby plantation, and views of snow-capped peaks on a clear morning.\n\nGreat base for Mt Kenya trekkers, birdwatchers, and anyone craving cool highland air after Nairobi.",
    short_description: "Cozy forest guesthouse at the foot of Mount Kenya",
    highlights: ["Mt Kenya trekking base", "Fresh highland tea", "Snow-peak views", "World-class birdwatching"],
    cancellation_policy: "flexible", minimum_stay: 1, checkin_time: "13:00", checkout_time: "11:00",
    cleaning_fee: 700, security_deposit: 2500,
    owner_id: "u5", owner_name: "Grace Wanjiru", owner_since: "2023", owner_superhost: false,
    latitude: -0.4167, longitude: 37.1333,
    nearby: ["Mt Kenya NP gate (10 min)", "Nyeri Town (20 min)", "Treetops Hotel (30 min)", "Aberdare NP (1 hr)"],
    reviews: []
  },
];

// ─── BOOKINGS ────────────────────────────────────────────────
export const MOCK_BOOKINGS = [
  {
    id: "b1", booking_number: "RYS-20240315-AB1234", property_id: "p1",
    property_name: "Serene Beach Villa", property_city: "Diani Beach",
    property_image: "https://images.unsplash.com/photo-1602343168117-bb8afa9aceae?w=400&q=80",
    checkin_date: "2024-04-10", checkout_date: "2024-04-14",
    status: "confirmed", total_amount: 52000, nights_count: 4, price_per_night: 12500,
    cleaning_fee: 2000, platform_fee: 4000, cashback_amount: 1000, owner_payout: 45000,
    guests_adults: 3, guests_children: 1, guest_email: "user@test.com",
    special_requests: "Early check-in if possible, baby cot needed", reviewed: false,
  },
  {
    id: "b2", booking_number: "RYS-20240301-CD5678", property_id: "p2",
    property_name: "Nairobi Skyline Apartment", property_city: "Nairobi",
    property_image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
    checkin_date: "2024-03-20", checkout_date: "2024-03-23",
    status: "completed", total_amount: 17500, nights_count: 3, price_per_night: 5500,
    cleaning_fee: 1000, platform_fee: 1320, cashback_amount: 330, owner_payout: 14850,
    guests_adults: 2, guests_children: 0, guest_email: "user@test.com",
    reviewed: false,
  },
  {
    id: "b3", booking_number: "RYS-20240215-EF9012", property_id: "p5",
    property_name: "Lake Naivasha Cottage", property_city: "Lake Naivasha",
    property_image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80",
    checkin_date: "2024-05-01", checkout_date: "2024-05-03",
    status: "pending_payment", total_amount: 9200, nights_count: 2, price_per_night: 4200,
    cleaning_fee: 800, platform_fee: 672, cashback_amount: 168, owner_payout: 7560,
    guests_adults: 2, guests_children: 2, guest_email: "user@test.com",
    reviewed: false,
  },
  {
    id: "b4", booking_number: "RYS-20231201-GH3456", property_id: "p3",
    property_name: "Mara Safari Lodge", property_city: "Maasai Mara",
    property_image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80",
    checkin_date: "2023-12-20", checkout_date: "2023-12-23",
    status: "completed", total_amount: 89600, nights_count: 3, price_per_night: 28000,
    cleaning_fee: 3000, platform_fee: 6720, cashback_amount: 1680, owner_payout: 75600,
    guests_adults: 2, guests_children: 0, guest_email: "user@test.com",
    reviewed: true,
  },
];

// ─── ADMIN: PENDING PAYMENTS ─────────────────────────────────
export const MOCK_PENDING_PAYMENTS = [
  {
    id: "pay1", booking_id: "b3", booking_number: "RYS-20240215-EF9012",
    user_name: "John Kamau", user_email: "john@test.com", amount: 9200,
    transaction_code: "QL9K2J3N5P", payment_method: "mpesa_paybill",
    phone_number: "254712345678", status: "pending",
    created_at: "2024-03-01T10:30:00Z", property_name: "Lake Naivasha Cottage",
  },
  {
    id: "pay2", booking_id: "b5", booking_number: "RYS-20240310-GH3456",
    user_name: "Sarah Njeri", user_email: "sarah@test.com", amount: 56000,
    transaction_code: "XP8M1L4K7Q", payment_method: "mpesa_till",
    phone_number: "254723456789", status: "pending",
    created_at: "2024-03-10T14:15:00Z", property_name: "Serene Beach Villa",
  },
  {
    id: "pay3", booking_id: "b6", booking_number: "RYS-20240311-IJ7890",
    user_name: "Brian Otieno", user_email: "brian@test.com", amount: 15600,
    transaction_code: "MN3P9Q2RT4", payment_method: "mpesa_paybill",
    phone_number: "254733456789", status: "pending",
    created_at: "2024-03-11T09:00:00Z", property_name: "Mombasa Old Town Boutique",
  },
];

// ─── ADMIN: PENDING PROPERTIES ───────────────────────────────
export const MOCK_PENDING_PROPS = [
  {
    id: "pp1", name: "Nyali Beach House", city: "Mombasa", county: "Mombasa",
    property_type: "holiday_home", price_per_night: 8500, bedrooms: 3, bathrooms: 2, max_guests: 6,
    owner_name: "Robert Omondi", owner_email: "robert@test.com",
    status: "pending", created_at: "2024-03-12T09:00:00Z",
    featured_image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
    description: "Beautiful beachfront home in Nyali with pool and direct beach access. 3 bedrooms, sleeps 6. Perfect for families.",
  },
  {
    id: "pp2", name: "Karura Forest Retreat", city: "Nairobi", county: "Nairobi",
    property_type: "guesthouse", price_per_night: 3200, bedrooms: 2, bathrooms: 1, max_guests: 4,
    owner_name: "Alice Wambua", owner_email: "alice@test.com",
    status: "pending", created_at: "2024-03-11T11:30:00Z",
    featured_image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=400&q=80",
    description: "Peaceful retreat near Karura Forest with organic garden, hammocks, and incredible birdwatching.",
  },
  {
    id: "pp3", name: "Watamu Eco-Lodge", city: "Watamu", county: "Kilifi",
    property_type: "villa", price_per_night: 11000, bedrooms: 3, bathrooms: 3, max_guests: 6,
    owner_name: "Hassan Ali", owner_email: "hassan@test.com",
    status: "pending", created_at: "2024-03-10T08:00:00Z",
    featured_image: "https://images.unsplash.com/photo-1602343168117-bb8afa9aceae?w=400&q=80",
    description: "Sustainable eco-lodge near Watamu Marine Park. Solar power, rainwater harvesting, coral reef snorkeling.",
  },
];

// ─── MESSAGES ────────────────────────────────────────────────
export const MOCK_CONVERSATIONS = [
  {
    id: "conv1", with_name: "James Mwangi", with_id: "u2",
    property: "Serene Beach Villa", avatar: "J",
    last_message: "Looking forward to your arrival!", last_time: "2h ago", unread: 2,
    messages: [
      { id: "m1", sender: "u2", text: "Welcome! Your booking is confirmed. Let me know if you need anything before arrival.", time: "10:00 AM", mine: false },
      { id: "m2", sender: "me", text: "Thank you! Can we arrange early check-in around noon?", time: "10:15 AM", mine: true },
      { id: "m3", sender: "u2", text: "Of course! I'll make sure the property is ready by 12pm. Is there anything special you'd like arranged?", time: "10:30 AM", mine: false },
      { id: "m4", sender: "me", text: "Maybe a bottle of champagne chilling? It's our anniversary 🥂", time: "10:45 AM", mine: true },
      { id: "m5", sender: "u2", text: "Absolutely! And I'll arrange a surprise on the beach terrace 😊 Looking forward to your arrival!", time: "11:00 AM", mine: false },
    ]
  },
  {
    id: "conv2", with_name: "Grace Wanjiru", with_id: "u5",
    property: "Lake Naivasha Cottage", avatar: "G",
    last_message: "The hippos are especially active this season!", last_time: "1d ago", unread: 0,
    messages: [
      { id: "m6", sender: "u5", text: "Hi! Thanks for booking. Any questions about the cottage?", time: "Yesterday", mine: false },
      { id: "m7", sender: "me", text: "Yes! Should we be careful around the hippos?", time: "Yesterday", mine: true },
      { id: "m8", sender: "u5", text: "The hippos are especially active this season! Just don't walk near the lakeshore after dark 😊 They graze on the lawn but are generally calm.", time: "Yesterday", mine: false },
    ]
  },
];

// ─── NOTIFICATIONS ───────────────────────────────────────────
export const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "payment_approved", title: "Payment Approved! ✅", message: "Your booking RYS-20240315-AB1234 is now confirmed. Check-in Apr 10.", time: "2h ago", read: false, icon: "✅" },
  { id: "n2", type: "cashback_earned", title: "Cashback Credited 💰", message: "KES 330 cashback added from your Nairobi stay.", time: "3d ago", read: false, icon: "💰" },
  { id: "n3", type: "booking_reminder", title: "Upcoming Stay 🏖️", message: "Diani Beach villa check-in in 3 days. Pack your swimwear!", time: "1d ago", read: true, icon: "🏖️" },
  { id: "n4", type: "review_request", title: "How was your stay? ⭐", message: "Please rate your Nairobi Skyline Apartment experience.", time: "5d ago", read: true, icon: "⭐" },
  { id: "n5", type: "promo", title: "Weekend Deal 🎉", message: "Extra 5% cashback on lake properties this weekend only!", time: "1w ago", read: true, icon: "🎉" },
  { id: "n6", type: "new_message", title: "New Message from James", message: "Looking forward to your arrival at Diani!", time: "2h ago", read: false, icon: "💬" },
];

// ─── ANALYTICS ───────────────────────────────────────────────
export const ANALYTICS = {
  monthly: [
    { month: "Sep", revenue: 84000,  bookings: 12, occupancy: 72 },
    { month: "Oct", revenue: 102000, bookings: 15, occupancy: 81 },
    { month: "Nov", revenue: 96000,  bookings: 14, occupancy: 76 },
    { month: "Dec", revenue: 158000, bookings: 22, occupancy: 94 },
    { month: "Jan", revenue: 134000, bookings: 19, occupancy: 88 },
    { month: "Feb", revenue: 121000, bookings: 17, occupancy: 82 },
    { month: "Mar", revenue: 147000, bookings: 21, occupancy: 90 },
  ],
  prop_breakdown: [
    { name: "Beach Villa",   revenue: 78000, pct: 53 },
    { name: "Safari Lodge",  revenue: 42000, pct: 29 },
    { name: "Nairobi Apt",   revenue: 27000, pct: 18 },
  ],
  top_cities: [
    { city: "Diani Beach",  bookings: 42, revenue: 263000 },
    { city: "Maasai Mara",  bookings: 28, revenue: 420000 },
    { city: "Nairobi",      bookings: 65, revenue: 187000 },
    { city: "Mombasa",      bookings: 38, revenue: 156000 },
    { city: "Lake Naivasha",bookings: 21, revenue: 58000  },
    { city: "Lamu",         bookings: 14, revenue: 91000  },
  ],
};
