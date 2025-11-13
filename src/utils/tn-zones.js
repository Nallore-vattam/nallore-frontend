// src/utils/tn-zones.js
// Zone → Districts mapping (keys MUST match your translation keys)
export const ZONES = [
  {
    key: "chennaiZone",
    color: "#2563eb",
    districts: ["thiruvallur", "chennai"],
  },
  {
    key: "kanchipuramZone",
    color: "#7c3aed",
    districts: ["kanchipuram", "chengalpattu"],
  },
  {
    key: "velloreZone",
    color: "#0ea5e9",
    districts: ["ranipet", "vellore", "tirupattur", "tiruvannamalai"],
  },
  {
    key: "dharmapuriZone",
    color: "#16a34a",
    districts: ["krishnagiri", "dharmapuri"],
  },
  {
    key: "vpmPdyZone",
    color: "#ea580c",
    districts: ["viluppuram", "kallakkurichi", "puducherry", "cuddalore"], // PDY included
  },
  {
    key: "salemZone",
    color: "#22c55e",
    districts: ["salem", "erode", "namakkal"],
  },
  {
    key: "trichyZone",
    color: "#06b6d4",
    districts: ["perambalur", "karur", "tiruchirappalli", "ariyalur"],
  },
  {
    key: "thanjavurDeltaZone",
    color: "#f59e0b",
    districts: ["mayiladuthurai", "thanjavur", "tiruvarur", "nagapattinam"],
  },
  {
    key: "coimbatoreZone",
    color: "#10b981",
    districts: ["theNilgiris", "coimbatore", "tiruppur"],
  },
  {
    key: "maduraiZone",
    color: "#ef4444",
    districts: ["dindigul", "madurai", "theni", "virudhunagar"],
  },
  {
    key: "sivagangaiZone",
    color: "#8b5cf6",
    districts: ["pudukkottai", "sivagangai", "ramanathapuram"],
  },
  {
    key: "tirunelveliZone",
    color: "#14b8a6",
    districts: ["tenkasi", "thoothukudi", "tirunelveli", "kanniyakumari"],
  },
];

// Normalize text to our translation keys (match Wikipedia <title> text to our keys)
export function normalizeDistrictName(str) {
  if (!str) return "";
  const s = str.trim().toLowerCase();

  const map = {
    "thiruvallur": "thiruvallur",
    "tiruvallur": "thiruvallur",
    "chennai": "chennai",
    "kancheepuram": "kanchipuram",
    "kanchipuram": "kanchipuram",
    "chengalpattu": "chengalpattu",
    "ranipet": "ranipet",
    "vellore": "vellore",
    "tirupattur": "tirupattur",
    "tiruppattur": "tirupattur",
    "tiruvannamalai": "tiruvannamalai",
    "krishnagiri": "krishnagiri",
    "dharmapuri": "dharmapuri",
    "viluppuram": "viluppuram",
    "villupuram": "viluppuram",
    "kallakurichi": "kallakkurichi",
    "kallakkurichi": "kallakkurichi",
    "puducherry": "puducherry",
    "pondicherry": "puducherry",
    "cuddalore": "cuddalore",
    "salem": "salem",
    "erode": "erode",
    "namakkal": "namakkal",
    "perambalur": "perambalur",
    "karur": "karur",
    "tiruchirappalli": "tiruchirappalli",
    "trichy": "tiruchirappalli",
    "ariyalur": "ariyalur",
    "mayiladuthurai": "mayiladuthurai",
    "thanjavur": "thanjavur",
    "tiruvarur": "tiruvarur",
    "nagapattinam": "nagapattinam",
    "the nilgiris": "theNilgiris",
    "nilgiris": "theNilgiris",
    "coimbatore": "coimbatore",
    "tiruppur": "tiruppur",
    "dindigul": "dindigul",
    "madurai": "madurai",
    "theni": "theni",
    "virudhunagar": "virudhunagar",
    "pudukkottai": "pudukkottai",
    "sivaganga": "sivagangai",
    "sivagangai": "sivagangai",
    "ramanathapuram": "ramanathapuram",
    "tenkasi": "tenkasi",
    "thoothukudi": "thoothukudi",
    "tuticorin": "thoothukudi",
    "tirunelveli": "tirunelveli",
    "kanniyakumari": "kanniyakumari",
    "kanyakumari": "kanniyakumari",
  };

  return map[s] || "";
}

export function findZoneByDistrictKey(dKey) {
  return ZONES.find(z => z.districts.includes(dKey));
}
