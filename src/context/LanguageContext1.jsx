
import React, { createContext, useState, useContext } from "react";

export const LanguageContext1 = createContext();

export const supportedLanguages = [
  { code: "ta", name: "தமிழ்" },
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  
];

const translations = {
  en: {// ===== ZONES =====
chennaiZone: "Chennai Zone",
kanchipuramZone: "Kanchipuram Zone",
velloreZone: "Vellore Zone",
dharmapuriZone: "Dharmapuri Zone",
vpmPdyZone: "VPM-PDY Zone",
salemZone: "Salem Zone",
trichyZone: "Trichy Zone",
thanjavurDeltaZone: "Thanjavur Delta Zone",
coimbatoreZone: "Coimbatore Zone",
maduraiZone: "Madurai Zone",
sivagangaiZone: "Sivagangai Zone",
tirunelveliZone: "Tirunelveli Zone",

// ===== DISTRICTS =====
thiruvallur: "Thiruvallur",
chennai: "Chennai",
kanchipuram: "Kanchipuram",
chengalpattu: "Chengalpattu",
ranipet: "Ranipet",
vellore: "Vellore",
tirupattur: "Tirupattur",
tiruvannamalai: "Tiruvannamalai",
krishnagiri: "Krishnagiri",
dharmapuri: "Dharmapuri",
viluppuram: "Viluppuram",
kallakkurichi: "Kallakkurichi",
puducherry: "Puducherry",
  karaikal: "Karaikal",

cuddalore: "Cuddalore",
salem: "Salem",
erode: "Erode",
namakkal: "Namakkal",
perambalur: "Perambalur",
karur: "Karur",
tiruchirappalli: "Tiruchirappalli",
ariyalur: "Ariyalur",
mayiladuthurai: "Mayiladuthurai",
thanjavur: "Thanjavur",
tiruvarur: "Tiruvarur",
nagapattinam: "Nagapattinam",
theNilgiris: "The Nilgiris",
coimbatore: "Coimbatore",
tiruppur: "Tiruppur",
dindigul: "Dindigul",
madurai: "Madurai",
theni: "Theni",
virudhunagar: "Virudhunagar",
pudukkottai: "Pudukkottai",
sivagangai: "Sivagangai",
ramanathapuram: "Ramanathapuram",
tenkasi: "Tenkasi",
thoothukudi: "Thoothukudi",
tirunelveli: "Tirunelveli",
kanniyakumari: "Kanniyakumari",
 

},

 ta:{
      chennaiZone: "சென்னை மண்டலம்",
kanchipuramZone: "காஞ்சிபுரம் மண்டலம்",
velloreZone: "வேலூர் மண்டலம்",
dharmapuriZone: "தர்மபுரி மண்டலம்",
vpmPdyZone: "விழுப்புரம் - புதுச்சேரி மண்டலம்",
salemZone: "சேலம் மண்டலம்",
trichyZone: "திருச்சி மண்டலம்",
thanjavurDeltaZone: "தஞ்சாவூர் டெல்டா மண்டலம்",
coimbatoreZone: "கோயம்புத்தூர் மண்டலம்",
maduraiZone: "மதுரை மண்டலம்",
sivagangaiZone: "சிவகங்கை மண்டலம்",
tirunelveliZone: "திருநெல்வேலி மண்டலம்",

thiruvallur: "திருவள்ளூர்",
chennai: "சென்னை",
kanchipuram: "காஞ்சிபுரம்",
chengalpattu: "செங்கல்பட்டு",
ranipet: "ராணிப்பேட்டை",
vellore: "வேலூர்",
tirupattur: "திருப்பத்தூர்",
tiruvannamalai: "திருவண்ணாமலை",
krishnagiri: "கிருஷ்ணகிரி",
dharmapuri: "தர்மபுரி",
viluppuram: "விழுப்புரம்",
kallakkurichi: "கல்லக்குறிச்சி",
puducherry: "புதுச்சேரி",
  karaikal: "காரைக்கால்",

cuddalore: "கடலூர்", 
salem: "சேலம்",
erode: "ஈரோடு",
namakkal: "நாமக்கல்",
perambalur: "பெரம்பலூர்",
karur: "கரூர்",
tiruchirappalli: "திருச்சிராப்பள்ளி",
ariyalur: "அரியலூர்",
mayiladuthurai: "மயிலாடுதுறை",
thanjavur: "தஞ்சாவூர்",
tiruvarur: "திருவாரூர்",
nagapattinam: "நாகப்பட்டினம்",
theNilgiris: "நீலகிரி",
coimbatore: "கோயம்புத்தூர்",
tiruppur: "திருப்பூர்",
dindigul: "திண்டுக்கல்",
madurai: "மதுரை",
theni: "தேனி",
virudhunagar: "விருதுநகர்",
pudukkottai: "புதுக்கோட்டை",
sivagangai: "சிவகங்கை",
ramanathapuram: "ராமநாதபுரம்",
tenkasi: "தேன்காசி",
thoothukudi: "தூத்துக்குடி",
tirunelveli: "திருநெல்வேலி",
kanniyakumari: "கன்னியாகுமரி",


 },

hi:{

  // ===== ZONES =====
chennaiZone: "चेन्नई क्षेत्र",
kanchipuramZone: "कांचीपुरम क्षेत्र",
velloreZone: "वेल्लोर क्षेत्र",
dharmapuriZone: "धर्मपुरी क्षेत्र",
vpmPdyZone: "विलुप्पुरम - पुदुचेरी क्षेत्र",
salemZone: "सलेम क्षेत्र",
trichyZone: "त्रिची क्षेत्र",
thanjavurDeltaZone: "तंजावुर डेल्टा क्षेत्र",
coimbatoreZone: "कोयंबटूर क्षेत्र",
maduraiZone: "मदुरै क्षेत्र",
sivagangaiZone: "सिवगंगई क्षेत्र",
tirunelveliZone: "तिरुनेलवेली क्षेत्र",

// ===== DISTRICTS =====
thiruvallur: "तिरुवल्लूर",
chennai: "चेन्नई",
kanchipuram: "कांचीपुरम",
chengalpattu: "चेंगलपट्टू",
ranipet: "रानीपेट",
vellore: "वेल्लोर",
tirupattur: "तिरुपत्तूर",
tiruvannamalai: "तिरुवन्नामलाई",
krishnagiri: "कृष्णगिरि",
dharmapuri: "धर्मपुरी",
viluppuram: "विलुप्पुरम",
kallakkurichi: "कल्लकुरिची",
puducherry: "पुडुचेरी",
  karaikal: "कराईकल",

cuddalore: "कडलूर",
salem: "सलेम",
erode: "इरोड",
namakkal: "नमक्कल",
perambalur: "पेरंबलुर",
karur: "करूर",
tiruchirappalli: "तिरुचिरापल्ली",
ariyalur: "अरियालूर",
mayiladuthurai: "मयिलाडुथुरई",
thanjavur: "तंजावुर",
tiruvarur: "तिरूवारूर",
nagapattinam: "नागपट्टिनम",
theNilgiris: "नीलगिरि",
coimbatore: "कोयंबटूर",
tiruppur: "तिरुप्पूर",
dindigul: "डिंडीगुल",
madurai: "मदुरै",
theni: "थेनी",
virudhunagar: "विरुधुनगर",
pudukkottai: "पुदुकोट्टई",
sivagangai: "सिवगंगई",
ramanathapuram: "रामनाथपुरम",
tenkasi: "तेनकासी",
thoothukudi: "थूथुकुडी",
tirunelveli: "तिरुनेलवेली",
kanniyakumari: "कन्याकुमारी",

}








}




export const LanguageProvider1 = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentLanguage, setCurrentLanguage] = useState("ta"); // Tamil as default

  // Simple translation function - NO API calls
  const t = (text) => {
    return translations[currentLanguage]?.[text] || translations.en[text] || text;
  };

  // Simple translateContent function - NO API calls
  const translateContent = async (jsonContent) => {
    if (currentLanguage === "en") return jsonContent;
    
    const translatedContent = { ...jsonContent };
    
    for (const key of Object.keys(jsonContent)) {
      const value = jsonContent[key];
      if (typeof value === "string") {
        // Use pre-loaded translations directly
        translatedContent[key] = translations[currentLanguage]?.[value] || value;
      }
    }
    
    return translatedContent;
  };

  const isTranslating = false;

  return (
    <LanguageContext1.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentLanguage,
        setCurrentLanguage,
        supportedLanguages,
        t,
        translateContent,
        isTranslating,
      }}
    >
      {children}
    </LanguageContext1.Provider>
  );
};

// ✅ MAKE SURE THIS EXPORT EXISTS
export const useLanguage = () => useContext(LanguageContext1);