export type LanguageType = 'हिंदी' | 'English' | 'తెలుగు';

export interface Translations {
  // Navigation
  navHome: string;
  navAskAI: string;
  navSymptom: string;
  navRecords: string;
  navClinics: string;
  navSettings: string;

  // Home Screen
  greeting: string;
  howAreYou: string;
  healthSnapshot: string;
  seeAll: string;
  weather: string;
  airQuality: string;
  waterQuality: string;
  sunny: string;
  good: string;
  safe: string;
  quickActions: string;
  healthCheck: string;
  speakToAI: string;
  scanPrescription: string;
  medicines: string;
  pregnancyCare: string;
  childHealth: string;
  firstAidGuide: string;
  nearbyClinics: string;
  needHelpTitle: string;
  needHelpSub: string;
  currentLocationLabel: string;
  getExactLocationBtn: string;
  locatingGPS: string;

  // Ask AI
  askAITitle: string;
  speakOrTypePlaceholder: string;
  listeningSpeech: string;
  send: string;
  askDoctor: string;
  offlineAiNotice: string;
  suggestedQuestionsTitle: string;

  // Symptom Checker
  symptomCheckerTitle: string;
  selectBodyPart: string;
  commonSymptoms: string;
  durationLabel: string;
  severityLabel: string;
  notesLabel: string;
  evaluateBtn: string;
  mild: string;
  moderate: string;
  severe: string;

  // AI Recommendation
  recommendationTitle: string;
  likelyCause: string;
  recommendedAction: string;
  whenToSeeDoctor: string;
  disclaimerText: string;
  wasHelpful: string;

  // Prescription Scanner
  scannerTitle: string;
  capturePhoto: string;
  uploadDoc: string;
  detectedMedicines: string;
  readingPrescription: string;
  viewFullDetails: string;

  // Family & Records
  familyTitle: string;
  addMemberBtn: string;
  healthTimeline: string;
  vaccinations: string;
  vitalsHistory: string;
  reportsPrescriptions: string;
  recentActivity: string;

  // Nearby Clinics
  clinicsTitle: string;
  all: string;
  phc: string;
  hospital: string;
  pharmacy: string;
  bloodBank: string;
  open24x7: string;
  callNow: string;
  exactGpsLoc: string;

  // Emergency Help
  emergencyTitle: string;
  emergencyNumber: string;
  tapToCall: string;
  quickHelp: string;
  ambulance: string;
  nearestHospital: string;
  callAsha: string;
  shakeSosTitle: string;
  shakeSosSub: string;

  // Medicine Reminder
  reminderTitle: string;
  upcomingReminder: string;
  todaySchedule: string;
  addReminderBtn: string;

  // Settings
  settingsTitle: string;
  languageSetting: string;
  voiceSpeech: string;
  offlineMode: string;
  dataSync: string;
  helpSupport: string;
  aboutApp: string;
}

export const translations: Record<LanguageType, Translations> = {
  'हिंदी': {
    navHome: 'होम',
    navAskAI: 'एआई परामर्श',
    navSymptom: 'लक्षण जांच',
    navRecords: 'रिकॉर्ड्स',
    navClinics: 'क्लीनिक',
    navSettings: 'सेटिंग्स',

    greeting: 'नमस्ते',
    howAreYou: 'आज आप कैसा महसूस कर रहे हैं?',
    healthSnapshot: 'आज का स्वास्थ्य स्नैपशॉट',
    seeAll: 'सभी देखें',
    weather: 'मौसम',
    airQuality: 'वायु गुणवत्ता',
    waterQuality: 'जल शुद्धता',
    sunny: 'धूपदार',
    good: 'उत्तम',
    safe: 'सुरक्षित',
    quickActions: 'त्वरित सेवाएं',
    healthCheck: 'स्वास्थ्य जांच',
    speakToAI: 'एआई से बोलें',
    scanPrescription: 'पर्चा स्कैन करें',
    medicines: 'दवाइयां',
    pregnancyCare: 'गर्भावस्था देखभाल',
    childHealth: 'शिशु स्वास्थ्य',
    firstAidGuide: 'प्राथमिक चिकित्सा',
    nearbyClinics: 'नजदीकी अस्पताल',
    needHelpTitle: 'क्या आपातकालीन मदद चाहिए?',
    needHelpSub: 'तुरंत स्वास्थ्य सलाह और आपातकालीन सहायता पाएं',
    currentLocationLabel: 'वर्तमान स्थान',
    getExactLocationBtn: 'सटीक GPS स्थान प्राप्त करें',
    locatingGPS: 'जीपीएस स्थान ढूंढा जा रहा है...',

    askAITitle: 'संजीवनी एआई स्वास्थ्य मित्र',
    speakOrTypePlaceholder: 'अपनी समस्या लिखें या माइक दबाकर बोलें...',
    listeningSpeech: 'सुन रहा है... कृपया बोलें',
    send: 'भेजें',
    askDoctor: 'डॉक्टर से पूछें',
    offlineAiNotice: 'ऑफ़लाइन मोड सक्रिय है। सीमित स्वास्थ्य सलाह उपलब्ध है।',
    suggestedQuestionsTitle: 'सुझाए गए प्रश्न:',

    symptomCheckerTitle: 'लक्षण चेकर',
    selectBodyPart: 'शरीर का अंग चुनें',
    commonSymptoms: 'सामान्य लक्षण चुनें',
    durationLabel: 'कब से समस्या है?',
    severityLabel: 'गंभीरता का स्तर',
    notesLabel: 'अतिरिक्त जानकारी (ऐच्छिक)',
    evaluateBtn: 'एआई द्वारा जांच करें',
    mild: 'हल्का',
    moderate: 'मध्यम',
    severe: 'गंभीर',

    recommendationTitle: 'एआई स्वास्थ्य परामर्श',
    likelyCause: 'संभावित कारण',
    recommendedAction: 'सुझाया गया उपाय',
    whenToSeeDoctor: 'डॉक्टर से कब मिलें?',
    disclaimerText: 'यह एक एआई सुझाव है, डॉक्टरी सलाह का विकल्प नहीं है।',
    wasHelpful: 'क्या यह सहायक था?',

    scannerTitle: 'पर्चा स्कैनर',
    capturePhoto: 'फोटो खींचें',
    uploadDoc: 'दस्तावेज़ अपलोड करें',
    detectedMedicines: 'पहचानी गई दवाएं',
    readingPrescription: 'एआई द्वारा पर्चा पढ़ा जा रहा है...',
    viewFullDetails: 'पूरा विवरण देखें',

    familyTitle: 'परिवार एवं मेडिकल रिकॉर्ड्स',
    addMemberBtn: 'सदस्य जोड़ें',
    healthTimeline: 'स्वास्थ्य टाइमलाइन',
    vaccinations: 'टीकाकरण रिकॉर्ड',
    vitalsHistory: 'वाइटल्स (बीपी/शुगर)',
    reportsPrescriptions: 'रिपोर्ट एवं पर्चे',
    recentActivity: 'हाल की गतिविधियां',

    clinicsTitle: 'नजदीकी क्लीनिक एवं अस्पताल',
    all: 'सभी',
    phc: 'प्राथमिक स्वास्थ्य केंद्र',
    hospital: 'अस्पताल',
    pharmacy: 'मेडिकल स्टोर',
    bloodBank: 'ब्लड बैंक',
    open24x7: '24 घंटे खुला',
    callNow: 'कॉल करें',
    exactGpsLoc: 'सटीक जीपीएस स्थान',

    emergencyTitle: 'आपातकालीन सहायता',
    emergencyNumber: '112',
    tapToCall: 'कॉल करने के लिए टैप करें',
    quickHelp: 'त्वरित सहायता विकल्प',
    ambulance: 'एम्बुलेंस',
    nearestHospital: 'निकटतम अस्पताल',
    callAsha: 'आशा कार्यकर्ता',
    shakeSosTitle: 'फोन हिलाकर एसओएस भेजें',
    shakeSosSub: 'खतरे में? फोन को 3 बार तेजी से हिलाएं',

    reminderTitle: 'दवा रिमाइंडर',
    upcomingReminder: 'अगली दवा का समय',
    todaySchedule: 'आज का शेड्यूलिंग',
    addReminderBtn: 'नया रिमाइंडर जोड़ें',

    settingsTitle: 'सेटिंग्स',
    languageSetting: 'भाषा / Language',
    voiceSpeech: 'आवाज एवं भाषण',
    offlineMode: 'ऑफ़लाइन मोड',
    dataSync: 'डेटा सिंक',
    helpSupport: 'सहायता एवं सपोर्ट',
    aboutApp: 'संजीवनी एआई के बारे में'
  },
  'English': {
    navHome: 'Home',
    navAskAI: 'Ask AI',
    navSymptom: 'Symptom Check',
    navRecords: 'Records',
    navClinics: 'Clinics',
    navSettings: 'Settings',

    greeting: 'Namaste',
    howAreYou: 'How are you feeling today?',
    healthSnapshot: "Today's Health Snapshot",
    seeAll: 'See All',
    weather: 'Weather',
    airQuality: 'Air Quality',
    waterQuality: 'Water Quality',
    sunny: 'Sunny',
    good: 'Good',
    safe: 'Safe',
    quickActions: 'Quick Actions',
    healthCheck: 'Health Check',
    speakToAI: 'Speak to AI',
    scanPrescription: 'Scan Prescription',
    medicines: 'Medicines',
    pregnancyCare: 'Pregnancy Care',
    childHealth: 'Child Health',
    firstAidGuide: 'First Aid Guide',
    nearbyClinics: 'Nearby Clinics',
    needHelpTitle: 'Need Help Immediately?',
    needHelpSub: 'Get guidance for urgent health concerns',
    currentLocationLabel: 'Current Location',
    getExactLocationBtn: 'Get Exact GPS Location',
    locatingGPS: 'Locating via GPS...',

    askAITitle: 'Sanjeevani AI Health Assistant',
    speakOrTypePlaceholder: 'Type your health concern or tap mic to speak...',
    listeningSpeech: 'Listening... Please speak clearly',
    send: 'Send',
    askDoctor: 'Ask AI Doctor',
    offlineAiNotice: 'Offline Mode Active. Limited health guidance available.',
    suggestedQuestionsTitle: 'Suggested Questions:',

    symptomCheckerTitle: 'Symptom Checker',
    selectBodyPart: 'Select Body Part',
    commonSymptoms: 'Select Common Symptoms',
    durationLabel: 'How long have you felt this?',
    severityLabel: 'Severity Level',
    notesLabel: 'Additional Notes (Optional)',
    evaluateBtn: 'Evaluate Symptoms with AI',
    mild: 'Mild',
    moderate: 'Moderate',
    severe: 'Severe',

    recommendationTitle: 'AI Health Recommendation',
    likelyCause: 'Likely Cause',
    recommendedAction: 'Recommended Action',
    whenToSeeDoctor: 'When to see a doctor?',
    disclaimerText: 'This is an AI recommendation, not a professional medical diagnosis.',
    wasHelpful: 'Was this helpful?',

    scannerTitle: 'Prescription Scanner',
    capturePhoto: 'Capture Photo',
    uploadDoc: 'Upload Doc',
    detectedMedicines: 'Detected Medicines',
    readingPrescription: 'Reading Prescription with AI...',
    viewFullDetails: 'View Full Details',

    familyTitle: 'Family & Records',
    addMemberBtn: 'Add Member',
    healthTimeline: 'Health Timeline',
    vaccinations: 'Vaccinations',
    vitalsHistory: 'Vitals History',
    reportsPrescriptions: 'Reports & Prescriptions',
    recentActivity: 'Recent Activity',

    clinicsTitle: 'Nearby Clinics',
    all: 'All',
    phc: 'PHC',
    hospital: 'Hospital',
    pharmacy: 'Pharmacy',
    bloodBank: 'Blood Bank',
    open24x7: 'Open 24x7',
    callNow: 'Call Now',
    exactGpsLoc: 'Exact GPS Location',

    emergencyTitle: 'Emergency Help',
    emergencyNumber: '112',
    tapToCall: 'Tap to call',
    quickHelp: 'Quick Help Options',
    ambulance: 'Ambulance',
    nearestHospital: 'Nearest Hospital',
    callAsha: 'Call ASHA Worker',
    shakeSosTitle: 'Shake Phone for SOS',
    shakeSosSub: 'In danger? Shake your device 3 times',

    reminderTitle: 'Medicine Reminder',
    upcomingReminder: 'Upcoming Reminder',
    todaySchedule: "Today's Schedule",
    addReminderBtn: 'Add Reminder',

    settingsTitle: 'Settings',
    languageSetting: 'Language / भाषा',
    voiceSpeech: 'Voice & Speech',
    offlineMode: 'Offline Mode',
    dataSync: 'Data Sync',
    helpSupport: 'Help & Support',
    aboutApp: 'About Sanjeevani AI'
  },
  'తెలుగు': {
    navHome: 'హోమ్',
    navAskAI: 'AI సలహా',
    navSymptom: 'లక్షణాల తనిఖీ',
    navRecords: 'రికార్డులు',
    navClinics: 'క్లినిక్‌లు',
    navSettings: 'సెట్టింగ్‌లు',

    greeting: 'నమస్కారం',
    howAreYou: 'ఈ రోజు మీ ఆరోగ్యం ఎలా ఉంది?',
    healthSnapshot: 'నేటి ఆరోగ్య సమాచారం',
    seeAll: 'అన్నీ చూడండి',
    weather: 'వాతావరణం',
    airQuality: 'గాలి నాణ్యత',
    waterQuality: 'నీటి నాణ్యత',
    sunny: 'ఎండగా ఉంది',
    good: 'బాగుంది',
    safe: 'సురక్షితం',
    quickActions: 'త్వరిత సేవలు',
    healthCheck: 'ఆరోగ్య తనిఖీ',
    speakToAI: 'AIతో మాట్లాడండి',
    scanPrescription: 'ప్రిస్క్రిప్షన్ స్కాన్ చేయండి',
    medicines: 'మందులు',
    pregnancyCare: 'గర్భధారణ సంరక్షణ',
    childHealth: 'పిల్లల ఆరోగ్యం',
    firstAidGuide: 'ప్రథమ చికిత్స మార్గదర్శి',
    nearbyClinics: 'సమీప ఆసుపత్రులు',
    needHelpTitle: 'అత్యవసర సహాయం కావాలా?',
    needHelpSub: 'అత్యవసర ఆరోగ్య సమస్యలకు తక్షణ సలహా పొందండి',
    currentLocationLabel: 'ప్రస్తుత స్థానం',
    getExactLocationBtn: 'ఖచ్చితమైన GPS స్థానాన్ని పొందండి',
    locatingGPS: 'GPS ద్వారా స్థానం గుర్తించబడుతోంది...',

    askAITitle: 'సంజీవని AI ఆరోగ్య మిత్రుడు',
    speakOrTypePlaceholder: 'మీ ఆరోగ్య సమస్యను టైప్ చేయండి లేదా మాట్లాడండి...',
    listeningSpeech: 'వింటోంది... స్పష్టంగా మాట్లాడండి',
    send: 'పంపు',
    askDoctor: 'డాక్టర్‌ను అడగండి',
    offlineAiNotice: 'ఆఫ్‌లైన్ మోడ్ యాక్టివ్‌గా ఉంది.',
    suggestedQuestionsTitle: 'సూచించబడిన ప్రశ్నలు:',

    symptomCheckerTitle: 'లక్షణాల చెకర్',
    selectBodyPart: 'శరీర భాగాన్ని ఎంచుకోండి',
    commonSymptoms: 'సాధారణ లక్షణాలను ఎంచుకోండి',
    durationLabel: 'ఎంతకాలంగా ఈ సమస్య ఉంది?',
    severityLabel: 'తీవ్రత స్థాయి',
    notesLabel: 'అదనపు వివరాలు (ఐచ్ఛికం)',
    evaluateBtn: 'AI ద్వారా తనిఖీ చేయండి',
    mild: 'తేలికపాటి',
    moderate: 'మధ్యస్థం',
    severe: 'తీవ్రమైన',

    recommendationTitle: 'AI ఆరోగ్య రికమండేషన్',
    likelyCause: 'సంభవనీయ కారణం',
    recommendedAction: 'సూచించిన చర్య',
    whenToSeeDoctor: 'డాక్టర్‌ను ఎప్పుడు కలవాలి?',
    disclaimerText: 'ఇది AI సూచన మాత్రమే, వైద్య నిపుణుడి సలహాకు ప్రత్యామ్నాయం కాదు.',
    wasHelpful: 'ఇది ఉపయోగకరంగా ఉందా?',

    scannerTitle: 'ప్రిస్క్రిప్షన్ స్కేనర్',
    capturePhoto: 'ఫోటో తీయండి',
    uploadDoc: 'డాక్యుమెంట్ అప్‌లోడ్ చేయండి',
    detectedMedicines: 'గుర్తించిన మందులు',
    readingPrescription: 'AI ప్రిస్క్రిప్షన్ చదువుతోంది...',
    viewFullDetails: 'పూర్తి వివరాలను చూడండి',

    familyTitle: 'కుటుంబం & మెడికల్ రికార్డులు',
    addMemberBtn: 'సభ్యుడిని చేర్చండి',
    healthTimeline: 'ఆరోగ్య టైమ్‌లైన్',
    vaccinations: 'టీకాల వివరాలు',
    vitalsHistory: 'వైటల్స్ (BP/షుగర్)',
    reportsPrescriptions: 'రిపోర్టులు & మందుల చీటీలు',
    recentActivity: 'ఇటీవలి కార్యకలాపాలు',

    clinicsTitle: 'సమీప క్లినిక్‌లు & ఆసుపత్రులు',
    all: 'అన్నీ',
    phc: 'ప్రథమ చికిత్స కేంద్రం (PHC)',
    hospital: 'ఆసుపత్రి',
    pharmacy: 'మెడికల్ షాప్',
    bloodBank: 'బ్లడ్ బ్యాంక్',
    open24x7: '24 గంటలు తెరిచి ఉంటుంది',
    callNow: 'కాల్ చేయండి',
    exactGpsLoc: 'ఖచ్చితమైన GPS స్థానం',

    emergencyTitle: 'అత్యవసర సహాయం',
    emergencyNumber: '112',
    tapToCall: 'కాల్ చేయడానికి నొక్కండి',
    quickHelp: 'త్వరిత సహాయ ఎంపికలు',
    ambulance: 'అంబులెన్స్',
    nearestHospital: 'సమీప ఆసుపత్రి',
    callAsha: 'ఆశా వర్కర్',
    shakeSosTitle: 'SOS కోసం ఫోన్ ఊపండి',
    shakeSosSub: 'ప్రమాదంలో ఉన్నారా? ఫోన్‌ను 3 సార్లు వేగంగా ఊపండి',

    reminderTitle: 'మందుల రిమైండర్',
    upcomingReminder: 'రాబోయే మందుల సమయం',
    todaySchedule: 'నేటి షెడ్యూల్',
    addReminderBtn: 'కొత్త రిమైండర్ జోడించండి',

    settingsTitle: 'సెట్టింగ్‌లు',
    languageSetting: 'భాష / Language',
    voiceSpeech: 'వాయిస్ & స్పీచ్',
    offlineMode: 'ఆఫ్‌లైన్ మోడ్',
    dataSync: 'డేటా సింక్',
    helpSupport: 'సహాయం & సపోర్ట్',
    aboutApp: 'సంజీవని AI గురించి'
  }
};

export function getTranslation(lang: string): Translations {
  const languageKey = (lang as LanguageType) in translations ? (lang as LanguageType) : 'English';
  return translations[languageKey];
}
