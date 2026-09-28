import {
  Department,
  Service,
  Doctor,
  BeforeAfterCase,
  Testimonial,
  PricingPackage,
  FAQItem
} from '../types';

export const CLINIC_CONTACT = {
  name: "VOGUE Dental & Aesthetics",
  tagline: "Where Smiles Meet Aesthetics",
  address: "C43/11, 2nd Floor, Lake City",
  city: "Lake City, Lahore",
  phone: "0321-0052424",
  phoneDisplay: "+92 321 0052424",
  whatsappUrl: "https://wa.me/923210052424?text=Hello%20VOGUE%20Dental%20%26%20Aesthetics%2C%20I%20would%20like%20to%20inquire%20about%20an%20appointment.",
  email: "appointments@voguedentalaesthetics.com",
  instagram: "@voguedentalaesthetics1",
  instagramUrl: "https://instagram.com/voguedentalaesthetics1",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
    { days: "Sunday", time: "12:00 PM – 6:00 PM (By Pre-booked Appointment Only)" },
  ],
  emergencyNote: "24/7 Priority Emergency Dental Trauma & Post-Care Line Available"
};

export const CLINIC_STATS = [
  { value: "12+", label: "Years of Clinical Mastery" },
  { value: "15,000+", label: "Transforms & Happy Smiles" },
  { value: "18+", label: "Fellowship Specialists" },
  { value: "100%", label: "Hospital-Grade Sterilization" },
];

export const DEPARTMENTS: Department[] = [
  {
    id: "general-dentistry",
    name: "General & Family Dentistry",
    tagline: "Comprehensive Oral Health & Preventive Care",
    description: "Gentle preventive dentistry, digital examinations, restorations, and pediatric smile care for lifelong wellness.",
    iconName: "Stethoscope",
    serviceCount: 5,
    doctorCount: 2
  },
  {
    id: "cosmetic-smile",
    name: "Cosmetic & Smile Design",
    tagline: "Artistry in Porcelain & Golden Proportion",
    description: "Bespoke smile makeovers, hand-layered porcelain veneers, minimally invasive bonding, and professional laser whitening.",
    iconName: "Sparkles",
    serviceCount: 4,
    doctorCount: 3
  },
  {
    id: "orthodontics",
    name: "Orthodontics (Braces & Aligners)",
    tagline: "Precision Alignment with Invisible Discretion",
    description: "Diamond-level Invisalign clear aligners, self-ligating aesthetic ceramic brackets, and interceptive pediatric orthodontics.",
    iconName: "Smile",
    serviceCount: 4,
    doctorCount: 2
  },
  {
    id: "implants-surgery",
    name: "Dental Implants & Oral Surgery",
    tagline: "Permanent Titanium Restoration & Bone Regeneration",
    description: "Computer-guided implant placement, full-arch All-on-4 restorations, pain-free wisdom tooth extraction, and 3D bone grafting.",
    iconName: "ShieldCheck",
    serviceCount: 4,
    doctorCount: 2
  },
  {
    id: "dermatology",
    name: "Dermatology & Skin Care",
    tagline: "Clinical Skin Rejuvenation & Texture Restoration",
    description: "Medical-grade HydraFacials, OxyGeneo oxygenation, deep carbon peels, and tailored acne scar therapies.",
    iconName: "Activity",
    serviceCount: 4,
    doctorCount: 2
  },
  {
    id: "facial-aesthetics",
    name: "Facial Aesthetics & Anti-Aging",
    tagline: "Subtle Harmony & Restored Natural Contours",
    description: "Doctor-administered neuromodulators, hyaluronic acid dermal sculpting, regenerative polynucleotides, and skin boosters.",
    iconName: "Feather",
    serviceCount: 4,
    doctorCount: 2
  },
  {
    id: "laser-body",
    name: "Laser & Body Contouring",
    tagline: "Advanced Photonic Technology & Follicle Rebirth",
    description: "Pico laser pigmentation clearance, pain-free triple-wavelength hair removal, and autologous Hair & Face PRP rejuvenation.",
    iconName: "Zap",
    serviceCount: 4,
    doctorCount: 2
  }
];

export const SERVICES: Service[] = [
  // General & Family Dentistry
  {
    id: "scaling-polishing",
    departmentId: "general-dentistry",
    departmentName: "General & Family Dentistry",
    name: "Airflow Deep Scaling & Ultrasonic Polishing",
    subtitle: "Painless Subgingival Hygiene & Stain Eradication",
    description: "Gentle ultrasonic biofilm removal paired with fine erythritol air-powder spray to eliminate stubborn plaque, tartar, and coffee stains without enamel abrasion.",
    duration: "45 mins",
    recommendedFor: "Routine 6-month hygiene maintenance, gum health, and surface stain removal.",
    popular: true
  },
  {
    id: "root-canal",
    departmentId: "general-dentistry",
    departmentName: "General & Family Dentistry",
    name: "Microscopic Rotary Endodontics (Root Canal)",
    subtitle: "Tooth Preservation Under High-Power Optics",
    description: "Single-session painless root canal therapy performed under surgical magnification with flexible nickel-titanium files and warm 3D gutta-percha obturation.",
    duration: "60 - 90 mins",
    recommendedFor: "Severe toothache, deep dental caries, or pulpal infection needing tooth preservation."
  },
  {
    id: "dental-xray",
    departmentId: "general-dentistry",
    departmentName: "General & Family Dentistry",
    name: "HD Digital Panoramic & 3D CBCT Imaging",
    subtitle: "Ultra-Low Radiation Diagnostic Scanning",
    description: "Comprehensive sub-millimeter volumetric 3D analysis of bone density, nerve pathways, and hidden pathology with 90% less radiation than conventional films.",
    duration: "20 mins",
    recommendedFor: "Implant planning, wisdom tooth assessment, and comprehensive diagnostic evaluation."
  },
  {
    id: "full-partial-dentures",
    departmentId: "general-dentistry",
    departmentName: "General & Family Dentistry",
    name: "Precision Full & Partial Flexible Dentures",
    subtitle: "Natural Mastication & Restored Vertical Dimension",
    description: "Custom-molded bio-compatible acrylic and lightweight Valplast flexible dentures engineered for comfortable chewing and secure, natural retention.",
    duration: "30 - 45 mins (Multi-visit)",
    recommendedFor: "Patients with partial or complete tooth loss seeking non-surgical tooth replacement."
  },
  {
    id: "tooth-extractions",
    departmentId: "general-dentistry",
    departmentName: "General & Family Dentistry",
    name: "Atraumatic Tooth & Root Extractions",
    subtitle: "Painless Extraction with Bone Socket Preservation",
    description: "Micro-luxation instruments preserve surrounding alveolar bone volume, ensuring an anxiety-free procedure with rapid clotting and minimal post-op tenderness.",
    duration: "30 - 50 mins",
    recommendedFor: "Non-restorable teeth, orthodontic space creation, or fractured roots."
  },

  // Cosmetic & Smile Design
  {
    id: "teeth-whitening",
    departmentId: "cosmetic-smile",
    departmentName: "Cosmetic & Smile Design",
    name: "In-Office Laser Power Teeth Whitening",
    subtitle: "Up to 8 Shades Brighter in One Luxurious Session",
    description: "Medical-grade photo-activated hydrogen peroxide gel safely dissolves deep intrinsic discoloration caused by tea, coffee, and aging while desensitizing agents protect enamel.",
    duration: "60 mins",
    recommendedFor: "Bridal prep, special occasions, and reversing years of stubborn enamel stains.",
    popular: true
  },
  {
    id: "porcelain-veneers",
    departmentId: "cosmetic-smile",
    departmentName: "Cosmetic & Smile Design",
    name: "Ultra-Thin E-Max Porcelain Veneers",
    subtitle: "Master-Crafted Hollywood Smile Transformation",
    description: "Custom wafer-thin 0.3mm ceramic laminates hand-shaded by master ceramists to permanently refine tooth shape, alignment, spacing, and lifelike luminescence.",
    duration: "60 - 90 mins per visit",
    recommendedFor: "Chipped teeth, permanent tetracycline staining, fluorosis, and gap closure.",
    popular: true
  },
  {
    id: "composite-bonding",
    departmentId: "cosmetic-smile",
    departmentName: "Cosmetic & Smile Design",
    name: "Artistic Direct Composite Edge Bonding",
    subtitle: "Single-Visit Smile Re-Contouring",
    description: "Hand-sculpted nano-hybrid resin sculpted directly onto teeth to restore incisal wear, smooth jagged margins, and create symmetry without tooth drilling.",
    duration: "45 mins per tooth",
    recommendedFor: "Minor chips, small diastemas (gaps), and worn front enamel."
  },
  {
    id: "gum-contouring",
    departmentId: "cosmetic-smile",
    departmentName: "Cosmetic & Smile Design",
    name: "Cosmetic Laser Gingival Recontouring",
    subtitle: "Painless Gum Lift for Symmetrical Proportions",
    description: "Soft-tissue diode laser gently sculpts uneven or excessive gum lines (gummy smile) to unveil longer, beautifully balanced natural teeth with instant healing.",
    duration: "45 mins",
    recommendedFor: "Gummy smiles and asymmetrical gingival margins."
  },

  // Orthodontics
  {
    id: "invisalign",
    departmentId: "orthodontics",
    departmentName: "Orthodontics (Braces & Aligners)",
    name: "Invisalign® Clear Aligner System",
    subtitle: "Virtually Invisible Computer-Guided Teeth Straightening",
    description: "Series of custom SmartTrack medical aligners designed using our iTero 3D digital scanner. Removable for eating, brushing, and high-profile meetings.",
    duration: "30 mins check-ins",
    recommendedFor: "Crowding, spacing, overbites, and adults seeking discreet alignment.",
    popular: true
  },
  {
    id: "ceramic-braces",
    departmentId: "orthodontics",
    departmentName: "Orthodontics (Braces & Aligners)",
    name: "Self-Ligating Clear Ceramic Braces",
    subtitle: "Tooth-Colored Aesthetic Brackets with Fast Frictionless Action",
    description: "Translucent monocrystalline sapphire brackets blend into natural enamel while specialized shape-memory wires correct complex skeletal bite irregularities.",
    duration: "45 mins adjustments",
    recommendedFor: "Moderate to complex malocclusion requiring high mechanical precision."
  },
  {
    id: "retainers-maintenance",
    departmentId: "orthodontics",
    departmentName: "Orthodontics (Braces & Aligners)",
    name: "Vivera® Precision Retainers & Relapse Correction",
    subtitle: "Guaranteed Lifelong Retention for Your New Smile",
    description: "Digitally milled thermoformed retainers and lingual bonded wire splints that protect your orthodontic investment from unwanted teeth migration.",
    duration: "30 mins",
    recommendedFor: "Post-braces stability and patients noticing minor recent teeth shifting."
  },

  // Dental Implants & Oral Surgery
  {
    id: "single-implants",
    departmentId: "implants-surgery",
    departmentName: "Dental Implants & Oral Surgery",
    name: "Computer-Guided Single Tooth Titanium Implant",
    subtitle: "Lifelong Biological Root & Crown Replacement",
    description: "Surgical guide-assisted placement of Swiss/German grade-4 titanium or zirconia fixture with custom zirconium abutment and crown for indistinguishable natural chewing.",
    duration: "60 mins",
    recommendedFor: "Replacing missing single front or back teeth with zero damage to neighbor teeth.",
    popular: true
  },
  {
    id: "all-on-4-full-arch",
    departmentId: "implants-surgery",
    departmentName: "Dental Implants & Oral Surgery",
    name: "All-on-4 / All-on-6 Full Arch Rehabilitation",
    subtitle: "Teeth-in-a-Day Fixed Prosthetic Solutions",
    description: "Strategic angled placement of four to six implants supporting a full arch permanent fixed bridge, providing immediate functional teeth even with reduced bone.",
    duration: "120 - 180 mins",
    recommendedFor: "Patients with failing dentition or loose full dentures wanting permanent fixed teeth."
  },
  {
    id: "wisdom-surgery",
    departmentId: "implants-surgery",
    departmentName: "Dental Implants & Oral Surgery",
    name: "Surgical Impacted Wisdom Tooth Extraction",
    subtitle: "Safe Nerve-Sparing Surgical Odontotomy",
    description: "Piezo-surgical ultrasonic bone cutting avoids soft-tissue trauma and preserves the inferior alveolar nerve while gently disimpacting horizontal third molars.",
    duration: "45 - 60 mins",
    recommendedFor: "Painful, recurrent pericoronitis, impactions, or crowding risk from 3rd molars."
  },
  {
    id: "bone-grafting",
    departmentId: "implants-surgery",
    departmentName: "Dental Implants & Oral Surgery",
    name: "Bio-Oss® Bone Augmentation & Sinus Lift",
    subtitle: "Biological Foundation Rebuilding for Stable Implants",
    description: "Premium bovine and autologous bone matrix combined with PRF growth factors to regenerate lost jawbone height and width beneath maxillary sinuses.",
    duration: "60 mins",
    recommendedFor: "Patients previously told they have insufficient bone for dental implants."
  },

  // Dermatology & Skin Care
  {
    id: "hydrafacial",
    departmentId: "dermatology",
    departmentName: "Dermatology & Skin Care",
    name: "Medical Vortex-Infusion HydraFacial Elite",
    subtitle: "Deep Pore Cleanse, Vortex Extraction & Peptide Hydration",
    description: "Patented four-stage medical hydra-dermabrasion removes dead keratin, vacuums out stubborn blackheads, and floods skin with hyaluronic acid and antioxidants.",
    duration: "50 mins",
    recommendedFor: "Congested skin, enlarged pores, dull texture, and instant dewy glow.",
    popular: true
  },
  {
    id: "carbon-peel",
    departmentId: "dermatology",
    departmentName: "Dermatology & Skin Care",
    name: "Hollywood Carbon Laser Porcelain Peel",
    subtitle: "Thermal Pore Shrinking & Oil Regulation",
    description: "Liquid charcoal suspension penetrates deep into sebaceous follicles before being vaporized by Q-switched laser pulses, shattering sebum and stimulating collagen.",
    duration: "45 mins",
    recommendedFor: "Oily skin, active acne, enlarged pores, and uneven skin tone."
  },
  {
    id: "oxygeneo",
    departmentId: "dermatology",
    departmentName: "Dermatology & Skin Care",
    name: "OxyGeneo™ 3-in-1 Super Facial Ritual",
    subtitle: "Bohr Effect Oxygenation, Exfoliation & Nourishment",
    description: "Triggers physiological oxygen release from within skin capillaries while infusing potent active serums tailored for brightening, balancing, or youthful firming.",
    duration: "50 mins",
    recommendedFor: "Asphyxiated city skin, tired complexions, and pre-event radiance boost."
  },
  {
    id: "microneedling",
    departmentId: "dermatology",
    departmentName: "Dermatology & Skin Care",
    name: "Medical Microneedling with Growth Factors",
    subtitle: "Precision Collagen Induction Therapy (CIT)",
    description: "Vertical micro-channels trigger the body's natural wound-healing cascade, driving deep absorption of bio-identical peptides to erase acne scars and fine lines.",
    duration: "60 mins",
    recommendedFor: "Textured acne scarring, stretch marks, and enlarged facial pores."
  },

  // Facial Aesthetics & Anti-Aging
  {
    id: "botox-fillers",
    departmentId: "facial-aesthetics",
    departmentName: "Facial Aesthetics & Anti-Aging",
    name: "Artisan Botox® & Dynamic Line Relaxation",
    subtitle: "Soft Natural Expression Without Frozen Stiffness",
    description: "Micro-targeted muscular injections to smooth forehead lines, crow's feet, frown lines, and perform non-surgical masseter slimming or gummy smile correction.",
    duration: "30 mins",
    recommendedFor: "Expression wrinkles, teeth grinding (bruxism), and subtle facial slimming.",
    popular: true
  },
  {
    id: "dermal-fillers",
    departmentId: "facial-aesthetics",
    departmentName: "Facial Aesthetics & Anti-Aging",
    name: "Hyaluronic Acid Lip & Jawline Sculpting",
    subtitle: "Juvederm & Restylane Natural Contour Harmony",
    description: "Anatomically guided placement of cross-linked hyaluronic acid to restore cheek volume, define chin projections, and create luscious, hydrated lips.",
    duration: "45 mins",
    recommendedFor: "Volume loss, undefined jawlines, hollow tear troughs, and lip proportioning."
  },
  {
    id: "profhilo-skin-boosters",
    departmentId: "facial-aesthetics",
    departmentName: "Facial Aesthetics & Anti-Aging",
    name: "Profhilo® 100% Pure Hyaluronic Bio-Remodeling",
    subtitle: "Injectable Glow & Elastin Matrix Regeneration",
    description: "Ultra-pure dual-weight hyaluronic acid spreads across tissue planes to stimulate 4 types of collagen and elastin, restoring crepey skin firmness.",
    duration: "30 mins",
    recommendedFor: "Loss of skin elasticity, neck bands, laxity, and dehydrated crepey skin."
  },

  // Laser & Body Contouring
  {
    id: "pico-laser",
    departmentId: "laser-body",
    departmentName: "Laser & Body Contouring",
    name: "Picosecond Laser Melasma & Pigmentation Clearance",
    subtitle: "Acoustic Photomechanical Pigment Shattering",
    description: "Trillionth-of-a-second ultra-short pulses pulverize stubborn melanin into microscopic dust without burning the skin, safely clearing stubborn melasma and freckles.",
    duration: "40 mins",
    recommendedFor: "Stubborn melasma, sun spots, post-inflammatory hyperpigmentation, and tattoo removal.",
    popular: true
  },
  {
    id: "prp-hair-face",
    departmentId: "laser-body",
    departmentName: "Laser & Body Contouring",
    name: "Autologous Platelet-Rich Plasma (Hair & Face PRP)",
    subtitle: "Concentrated Healing Factors from Your Own Blood",
    description: "Double-centrifuged platelets loaded with VEGF and FGF injected into the scalp to awaken dormant hair follicles or micro-needled into the face for the Vampire Glow.",
    duration: "60 mins",
    recommendedFor: "Thinning hair, male/female pattern alopecia, and holistic skin rejuvenation.",
    popular: true
  },
  {
    id: "laser-hair-removal",
    departmentId: "laser-body",
    departmentName: "Laser & Body Contouring",
    name: "Triple-Wavelength Painless Laser Hair Removal",
    subtitle: "Alexandrite, Diode & Nd:YAG Simultaneous Action",
    description: "Sub-zero ice-contact cooling chill tip delivers simultaneous wavelengths suitable for all skin tones, permanently disabling hair follicles safely and comfortably.",
    duration: "30 - 60 mins",
    recommendedFor: "Smooth permanent hair reduction for face, underarms, arms, legs, and full body."
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-maha-farman",
    departmentId: "general-dentistry",
    departmentName: "General & Family Dentistry",
    name: "Dr. Maha Farman",
    role: "Head of Vogue Dental & Aesthetics / Senior Dental Surgeon",
    qualifications: "BDS, C-Endo, C-Ortho, C-Prostho",
    experience: "12+ Years Clinical Leadership",
    bio: "Head and founder of Vogue Dental & Aesthetics. Master clinician in advanced endodontics, cosmetic restorations, and comprehensive prosthodontic rehabilitation. Renowned for gentle chairside manner and patient-first ethos.",
    image: "/src/assets/images/regenerated_image_1790563387982.png",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    specialties: ["Microscopic Endodontics", "Prosthodontics", "Smile Makeovers", "Complex Restorations"],
    headOfDepartment: true
  },
  {
    id: "dr-zainab-tariq",
    departmentId: "facial-aesthetics",
    departmentName: "Facial Aesthetics & Anti-Aging",
    name: "Dr. Zainab Tariq",
    role: "Senior Consultant Aesthetic Physician & Dermatologist",
    qualifications: "MBBS, FCPS (Dermatology), Dip. Aesthetic Medicine (UK)",
    experience: "10+ Years Specialized Practice",
    bio: "Internationally certified facial injector and laser specialist. Specializes in anatomical facial balance, subtle liquid rhinoplasty, natural lip enhancements, and anti-aging bio-remodeling.",
    image: "/src/assets/images/doctor_aesthetic_dermatologist_1790612372606.jpg",
    availableDays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    specialties: ["Botox & Dermal Sculpting", "Profhilo Bio-Remodeling", "Laser Rejuvenation", "Skin Glow Protocols"],
    headOfDepartment: true
  },
  {
    id: "dr-hamza-malik",
    departmentId: "implants-surgery",
    departmentName: "Dental Implants & Oral Surgery",
    name: "Dr. Hamza Malik",
    role: "Consultant Implantologist & Maxillofacial Surgeon",
    qualifications: "BDS, MDS (Oral & Maxillofacial Surgery), FICOI (USA)",
    experience: "14+ Years Surgical Mastery",
    bio: "Fellow of the International Congress of Oral Implantologists. Expert in 3D computer-guided implant surgery, All-on-4 full arch restoration, and traumatic impact extractions with bone preservation.",
    image: "/src/assets/images/doctor_orthodontist_specialist_1790612436976.jpg",
    availableDays: ["Tuesday", "Thursday", "Friday", "Saturday"],
    specialties: ["Dental Implants", "All-on-4 Full Arch", "Wisdom Tooth Surgery", "Bone Grafting"],
    headOfDepartment: true
  },
  {
    id: "dr-sarah-al-mansoor",
    departmentId: "orthodontics",
    departmentName: "Orthodontics (Braces & Aligners)",
    name: "Dr. Sarah Al-Mansoor",
    role: "Specialist Orthodontist & Invisalign® Diamond Provider",
    qualifications: "BDS, MOrth RCSEd (Edinburgh, UK), Certified Invisalign Provider",
    experience: "9+ Years Orthodontic Focus",
    bio: "Dedicated solely to straightening teeth and creating harmonious jaw relationships. Has treated over 1,200 clear aligner cases with predictable, aesthetic, and functional perfection.",
    image: "/src/assets/images/doctor_facial_aesthetics_1790612456174.jpg",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Saturday"],
    specialties: ["Invisalign Clear Aligners", "Ceramic Braces", "Teen Orthodontics", "Bite Realignment"],
    headOfDepartment: true
  },
  {
    id: "dr-bilal-qureshi",
    departmentId: "cosmetic-smile",
    departmentName: "Cosmetic & Smile Design",
    name: "Dr. Bilal Qureshi",
    role: "Cosmetic Dentist & Porcelain Veneer Specialist",
    qualifications: "BDS, MSc Aesthetic Dentistry (King's College London)",
    experience: "11+ Years Aesthetic Focus",
    bio: "Pioneer in minimal-prep porcelain veneer artistry and digital smile simulation. Blends engineering precision with artistic sensitivity to craft naturally radiant celebrity smiles.",
    image: "/src/assets/images/doctor_orthodontist_specialist_1790612436976.jpg",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    specialties: ["E-Max Porcelain Veneers", "Digital Smile Design", "In-Office Whitening", "Composite Bonding"]
  },
  {
    id: "dr-ayesha-rauf",
    departmentId: "dermatology",
    departmentName: "Dermatology & Skin Care",
    name: "Dr. Ayesha Rauf",
    role: "Clinical Dermatologist & Laser Therapy Specialist",
    qualifications: "MBBS, MCPS (Dermatology), Certified Laser Safety Officer",
    experience: "8+ Years Dermatological Care",
    bio: "Specializes in clinical acne management, medical HydraFacials, and state-of-the-art Pico laser treatments for deep melasma and stubborn dermal pigmentation.",
    image: "/src/assets/images/doctor_aesthetic_dermatologist_1790612372606.jpg",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    specialties: ["HydraFacial Elite", "Pico Laser Pigmentation", "Acne Scar Revision", "Carbon Peels"]
  },
  {
    id: "dr-danish-siddiqui",
    departmentId: "laser-body",
    departmentName: "Laser & Body Contouring",
    name: "Dr. Danish Siddiqui",
    role: "Regenerative Medicine & Hair Restoration Specialist",
    qualifications: "MBBS, Dip. Trichology (UK), ISHRS Associate",
    experience: "9+ Years Clinical Practice",
    bio: "Specialist in autologous biological regenerative therapies. Expert in high-concentration PRP for male and female hair thinning, scar reduction, and non-surgical scalp restoration.",
    image: "/src/assets/images/doctor_orthodontist_specialist_1790612436976.jpg",
    availableDays: ["Monday", "Thursday", "Friday", "Saturday"],
    specialties: ["Hair & Scalp PRP", "Facial PRP Glow", "Triple Wavelength Laser", "Follicle Stimulation"]
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "case-veneers-smile",
    category: "cosmetic",
    title: "Full Arch Porcelain Smile Makeover",
    treatment: "8 Hand-Layered E-Max Veneers + Gingival Alignment",
    doctor: "Dr. Maha Farman & Dr. Bilal Qureshi",
    timeline: "2 Weeks / 3 Visits",
    description: "Correction of severe incisal wear, fluorosis staining, and midline asymmetry using ultra-thin ceramic veneers matching the patient's facial aesthetic proportions.",
    beforeImage: "/src/assets/images/smile_case_before_1790612470047.jpg",
    afterImage: "/src/assets/images/smile_case_after_1790612486731.jpg"
  },
  {
    id: "case-whitening-bonding",
    category: "cosmetic",
    title: "Laser Power Whitening & Edge Bonding",
    treatment: "In-Office Laser Whitening + Composite Edge Reshaping",
    doctor: "Dr. Maha Farman",
    timeline: "Single 90-Minute Session",
    description: "8-shade lift in intrinsic tooth brightness followed by seamless nano-hybrid composite bonding on fractured lateral incisors with zero tooth reduction.",
    beforeImage: "/src/assets/images/smile_case_before_1790612470047.jpg",
    afterImage: "/src/assets/images/smile_case_after_1790612486731.jpg"
  },
  {
    id: "case-invisalign-align",
    category: "ortho",
    title: "Comprehensive Invisalign® Arch Expansion",
    treatment: "Invisalign Clear Aligners (28 Trays)",
    doctor: "Dr. Sarah Al-Mansoor",
    timeline: "7 Months",
    description: "Non-extraction treatment resolving severe lower anterior crowding and upper lateral rotation with discreet, removable clear aligners.",
    beforeImage: "/src/assets/images/smile_case_before_1790612470047.jpg",
    afterImage: "/src/assets/images/smile_case_after_1790612486731.jpg"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    patientName: "Amina Khalid",
    treatment: "Porcelain Veneers & Laser Whitening",
    department: "Cosmetic & Smile Design",
    rating: 5,
    date: "February 2026",
    comment: "Dr. Maha Farman is truly an artist. I used to hide my smile in family photos because of discolored front teeth. From the 3D preview to the final cementation, everything was painless, elegant, and completely transformed my self-confidence.",
    verified: true
  },
  {
    id: "test-2",
    patientName: "Taimur Shah",
    treatment: "Single Tooth Dental Implant",
    department: "Dental Implants & Oral Surgery",
    rating: 5,
    date: "January 2026",
    comment: "I was terrified of getting a dental implant after a sports accident. Dr. Hamza Malik explained every step with the 3D scan and the surgery was completely painless. It looks and bites exactly like my natural tooth.",
    verified: true
  },
  {
    id: "test-3",
    patientName: "Dr. Nadia Bashir",
    treatment: "HydraFacial Elite & Carbon Peel",
    department: "Dermatology & Skin Care",
    rating: 5,
    date: "March 2026",
    comment: "As a physician myself, their strict hospital sterilization protocols and medical-grade equipment immediately impressed me. My skin has never looked clearer and more radiant. The Lake City clinic interior feels like a 5-star sanctuary.",
    verified: true
  },
  {
    id: "test-4",
    patientName: "Zubair Hashmi",
    treatment: "Invisalign Clear Aligners",
    department: "Orthodontics",
    rating: 5,
    date: "December 2025",
    comment: "At 34, I didn't want metal braces. Dr. Sarah designed my Invisalign plan and within 6 months my smile gap closed perfectly without anyone at my workplace ever noticing I was wearing trays!",
    verified: true
  },
  {
    id: "test-5",
    patientName: "Sana Tariq",
    treatment: "Profhilo & Masseter Botox",
    department: "Facial Aesthetics",
    rating: 5,
    date: "February 2026",
    comment: "Dr. Zainab has the lightest touch. The masseter treatment relieved my jaw clenching tension while naturally slimming my jawline, and the Profhilo gave me that effortless, dewy morning glow.",
    verified: true
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "pkg-smile-glow",
    title: "Signature Radiant Smile Package",
    department: "Cosmetic Dentistry",
    priceNote: "Starting from Consultation",
    tag: "Most Popular",
    popular: true,
    description: "Complete diagnostic makeover and instant revitalization for an effortlessly gleaming red-carpet smile.",
    features: [
      "Comprehensive Digital 3D Examination & X-Rays",
      "Airflow Ultrasonic Biofilm Scaling & Stain Polish",
      "In-Office Laser Power Teeth Whitening (up to 8 shades)",
      "Remineralizing Fluoride Enamel Shield",
      "Complimentary Home Touch-Up Maintenance Tray"
    ]
  },
  {
    id: "pkg-luxury-aesthetic",
    title: "Vogue Clinical Glow & Rejuvenation",
    department: "Aesthetic Dermatology",
    priceNote: "Customized to Skin Profile",
    tag: "Aesthetics Favorite",
    popular: false,
    description: "Bespoke dual-stage deep dermal renewal combining gentle vortex infusion with cellular oxygenation.",
    features: [
      "Digital Skin Complexion Analysis & Wood's Lamp Check",
      "Full Medical Vortex-Infusion HydraFacial Elite",
      "OxyGeneo™ 3-in-1 Active Oxygen Booster Infusion",
      "Cryo-Firming Ice Therapy & Hyaluronic Sheet Mask",
      "Post-Care Medical Serum Sample Prescription"
    ]
  },
  {
    id: "pkg-invisalign-align",
    title: "Invisalign® Diamond Alignment Plan",
    department: "Orthodontics",
    priceNote: "Flexible Installments Available",
    tag: "Clear Transformation",
    popular: false,
    description: "All-inclusive invisible aligner program with 3D digital simulation and retention guarantee.",
    features: [
      "iTero® Element 5D High-Speed Digital Scan",
      "ClinCheck® 3D Interactive Video Treatment Simulation",
      "Full Custom Series of Invisalign® SmartTrack Aligners",
      "All Monthly Progress Review Visits Included",
      "Final Set of Vivera® Precision Clear Retainers"
    ]
  },
  {
    id: "pkg-oral-wellness",
    title: "Executive Complete Dental Check & Hygiene",
    department: "Preventive Care",
    priceNote: "Essential Routine Care",
    tag: "Family Recommended",
    popular: false,
    description: "Meticulous preventive health evaluation to detect hidden decay, bone loss, or gum issues early.",
    features: [
      "Full Mouth Intraoral HD Camera Tour",
      "Digital Low-Radiation Bitewing & Panoramic X-Rays",
      "Ultrasonic Calculus & Plaque Removal",
      "Periodontal Pocket Health Assessment",
      "Personalized Oral Care & Brushing Prescription"
    ]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: "Appointments & Visits",
    question: "How do I book an appointment and what should I bring on my first visit?",
    answer: "You can book directly through our online booking form on this website, call us at 0321-0052424, or send a WhatsApp message. For your first visit, please arrive 10 minutes early to complete your medical history. If you have past dental records or recent X-rays, feel free to bring them along."
  },
  {
    category: "Comfort & Pain Relief",
    question: "Are your dental procedures and facial injections painful?",
    answer: "At VOGUE, patient comfort is our highest priority. We utilize computer-controlled micro-anesthesia, topical numbing gels, sub-zero skin chillers, and gentle ultrasonic technology. Most patients report feeling little to nothing at all during their procedures."
  },
  {
    category: "Safety & Cleanliness",
    question: "What sterilization and infection control protocols do you follow?",
    answer: "We adhere strictly to international hospital-grade sterilization protocols. Every non-disposable instrument undergoes ultrasonic enzymatic washing followed by high-pressure vacuum sterilization in Class B medical autoclaves with biological spore testing. Single-use disposables are always opened directly in front of you."
  },
  {
    category: "Aesthetics & Dentistry Harmony",
    question: "Can I combine dental treatments with aesthetic procedures on the same day?",
    answer: "Yes! One of the signature advantages of VOGUE Dental & Aesthetics is holistic facial and smile harmony. You can comfortably schedule a dental cleaning or whitening in the morning and a relaxing HydraFacial or facial consultation in the afternoon."
  },
  {
    category: "Pricing & Insurance",
    question: "How does pricing work and are payment plans available?",
    answer: "We provide upfront, transparent cost estimates following your comprehensive diagnostic examination—no hidden charges. For comprehensive treatments such as dental implants, full smile makeovers, and Invisalign, we offer convenient staged installment payment options."
  },
  {
    category: "Orthodontics",
    question: "How long does Invisalign treatment take compared to traditional braces?",
    answer: "Average Invisalign cases take between 6 to 14 months depending on individual complexity, which is often faster or equivalent to metal braces. Furthermore, because aligners are virtually invisible and removable, you can maintain your normal diet and lifestyle without interruption."
  },
  {
    category: "Emergency Care",
    question: "Do you accommodate dental emergencies or acute toothaches?",
    answer: "Yes, we reserve priority emergency slots daily for acute toothaches, fractured teeth, lost crowns, or dental trauma. Please call our clinic line at 0321-0052424 for same-day emergency intake."
  },
  {
    category: "Aftercare & Recovery",
    question: "What aftercare support do you provide after surgical or aesthetic procedures?",
    answer: "Every patient receives comprehensive post-procedure instructions, a printed aftercare booklet, and direct WhatsApp clinical follow-up from our nursing and doctor team within 24 to 48 hours to ensure a smooth, comfortable recovery."
  }
];

export const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
  "07:30 PM",
  "08:30 PM"
];
