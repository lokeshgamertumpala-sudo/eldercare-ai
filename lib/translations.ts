import { Language } from '@/types';

export interface TranslationStrings {
  appTitle: string;
  tagline: string;
  startAssistant: string;
  listening: string;
  thinking: string;
  speaking: string;
  ready: string;
  prototypeActivation: string;
  camera: string;
  emergency: string;
  nextMedicine: string;
  recentConversation: string;
  askPlaceholder: string;
  emptyStateTitle: string;
  emptyStateSubtitle: string;
  sampleQuestions: string[];
  stopSpeaking: string;
  replay: string;
  mute: string;
  unmute: string;
  typeInstead: string;
  send: string;
  close: string;
  cancel: string;
  confirm: string;
  demoMode: string;
  simulated: string;
  demoReminderNow: string;
  demoEmergency: string;
  demoPharmacyCall: string;
  demoCameraAnalysis: string;
  resetDemoData: string;
  medicineReminder: string;
  reminderConfirmed: string;
  reminderPrompt: string;
  timeForMedicine: string;
  callFamily: string;
  callDoctor: string;
  callAmbulance: string;
  emergencyTitle: string;
  emergencyWarning: string;
  emergencyDisclaimer: string;
  pharmacyTitle: string;
  pharmacySubtitle: string;
  cameraModalTitle: string;
  cameraInstruction: string;
  takePhoto: string;
  retake: string;
  uploadPhoto: string;
  useDemoImage: string;
  analyzingImage: string;
  medicalDisclaimer: string;
  uncertaintyWarning: string;
  speechSpeed: string;
  speedNormal: string;
  speedSlow: string;
  textSize: string;
  highContrast: string;
  reducedMotion: string;
  settings: string;
  connectionStatus: string;
  connected: string;
  demoModeActive: string;
  urgentAlert: string;
  cautionAlert: string;
  whatToDo: string;
  nextStep: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    appTitle: 'ELDERCARE AI',
    tagline: 'One button. One voice. One calm answer.',
    startAssistant: 'Start Assistant',
    listening: 'Listening...',
    thinking: 'Thinking...',
    speaking: 'Speaking...',
    ready: 'Ready when you are',
    prototypeActivation: 'Prototype activation (future double-press)',
    camera: 'Show Camera',
    emergency: 'Emergency',
    nextMedicine: 'Next Medicine',
    recentConversation: 'Conversation',
    askPlaceholder: 'Ask about your medicine or symptoms...',
    emptyStateTitle: 'How can I help you today?',
    emptyStateSubtitle: 'Tap the big button below and speak in your language.',
    sampleQuestions: [
      'When should I take my medicine?',
      'Can I take Metformin before eating?',
      'Remind me to take my pill at 8 AM daily',
      'I have dizziness, what should I do?'
    ],
    stopSpeaking: 'Stop',
    replay: 'Replay',
    mute: 'Mute',
    unmute: 'Unmute',
    typeInstead: 'Type a question',
    send: 'Send',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    demoMode: 'DEMO MODE',
    simulated: 'Simulated Demo',
    demoReminderNow: 'Demo Reminder Now',
    demoEmergency: 'Demo Emergency Warning',
    demoPharmacyCall: 'Demo Pharmacy Call',
    demoCameraAnalysis: 'Demo Camera Analysis',
    resetDemoData: 'Reset Demo Data',
    medicineReminder: 'Medicine Reminder',
    reminderConfirmed: 'Reminder confirmed!',
    reminderPrompt: 'Would you like to set this reminder?',
    timeForMedicine: "It's time for your medicine.",
    callFamily: 'Call Family',
    callDoctor: 'Call Doctor',
    callAmbulance: 'Emergency 108 / 112',
    emergencyTitle: 'Emergency Help',
    emergencyWarning: 'If you are experiencing severe chest pain, breathlessness, or collapse, call emergency services immediately.',
    emergencyDisclaimer: 'This prototype provides simulated emergency contacts for demonstration. In a real emergency, please call 112 or 108.',
    pharmacyTitle: 'Pharmacy Call Bot',
    pharmacySubtitle: 'Simulated automated call to check medicine availability',
    cameraModalTitle: 'Medicine Camera Inspection',
    cameraInstruction: 'Point camera at the medicine box, blister pack, or label',
    takePhoto: 'Take Photo',
    retake: 'Retake',
    uploadPhoto: 'Upload Picture',
    useDemoImage: 'Use Sample Metformin Box',
    analyzingImage: 'Analyzing medicine image...',
    medicalDisclaimer: 'This prototype provides AI-assisted information for demonstration purposes and is not a substitute for a doctor, pharmacist, prescription, or emergency service.',
    uncertaintyWarning: 'I can read visible package labels, but cannot identify unknown pills by sight alone. Please verify with your doctor or pharmacist.',
    speechSpeed: 'Voice Speed',
    speedNormal: 'Normal',
    speedSlow: 'Slow (Easier to hear)',
    textSize: 'Text Size',
    highContrast: 'High Contrast',
    reducedMotion: 'Reduce Motion',
    settings: 'Settings & Accessibility',
    connectionStatus: 'AI Cloud Connection',
    connected: 'Connected to Gemini 3.8 Flash',
    demoModeActive: 'Demo Mode (Offline Heuristics Ready)',
    urgentAlert: 'URGENT NOTICE',
    cautionAlert: 'CAUTION',
    whatToDo: 'What you should do',
    nextStep: 'Next step',
  },
  te: {
    appTitle: 'ఎల్డర్‌కేర్ AI',
    tagline: 'ఒక్క మీట. స్పష్టమైన స్వరం. ప్రశాంతమైన సమాధానం.',
    startAssistant: 'సహాయం ప్రారంభించండి',
    listening: 'వింటున్నాను...',
    thinking: 'ఆలోచిస్తున్నాను...',
    speaking: 'మాట్లాడుతున్నాను...',
    ready: 'మీరు మాట్లాడవచ్చు',
    prototypeActivation: 'ప్రోటోటైప్ ప్రారంభ బటన్ (డబుల్ ప్రెస్ కాన్సెప్ట్)',
    camera: 'కెమెరా చూపించండి',
    emergency: 'అత్యవసరం',
    nextMedicine: 'తదుపరి మందు',
    recentConversation: 'సంభాషణ',
    askPlaceholder: 'మీ మందుల గురించి అడగండి...',
    emptyStateTitle: 'నమస్కారం, నేను మీకు ఎలా సహాయపడగలను?',
    emptyStateSubtitle: 'క్రింద ఉన్న పెద్ద బటన్ నొక్కి మాట్లాడండి.',
    sampleQuestions: [
      'నా మందు ఎప్పుడు తీసుకోవాలి?',
      'టిఫిన్ తర్వాత ఏ మందు వేసుకోవాలి?',
      'రోజూ ఉదయం 8 గంటలకు గుర్తు చేయండి',
      'నాకు కొద్దిగా తలతిరుగుతోంది, ఏం చేయాలి?'
    ],
    stopSpeaking: 'ఆపండి',
    replay: 'మళ్లీ వినండి',
    mute: 'శబ్దం ఆపండి',
    unmute: 'శబ్దం వినండి',
    typeInstead: 'టైప్ చేయండి',
    send: 'పంపండి',
    close: 'మూసివేయండి',
    cancel: 'రద్దు',
    confirm: 'ఖరారు చేయండి',
    demoMode: 'డెమో మోడ్',
    simulated: 'సిమ్యులేషన్ డెమో',
    demoReminderNow: 'ఇప్పుడే మందు అలారం చూపించు',
    demoEmergency: 'అత్యవసర హెచ్చరిక డెమో',
    demoPharmacyCall: 'ఫార్మసీ కాల్ బోట్ డెమో',
    demoCameraAnalysis: 'కెమెరా పరీక్ష డెమో',
    resetDemoData: 'డెమో డేటా రీసెట్',
    medicineReminder: 'మందుల రిమైండర్',
    reminderConfirmed: 'రిమైండర్ నమోదయింది!',
    reminderPrompt: 'ఈ రిమైండర్‌ను నమోదు చేయమంటారా?',
    timeForMedicine: 'మీ మందు తీసుకునే సమయం అయింది.',
    callFamily: 'కుటుంబ సభ్యులకు కాల్ చేయండి',
    callDoctor: 'డాక్టర్‌కు కాల్ చేయండి',
    callAmbulance: 'అంబులెన్స్ 108 / 112',
    emergencyTitle: 'అత్యవసర సహాయం',
    emergencyWarning: 'తీవ్రమైన గుండె నొప్పి, శ్వాస ఆడకపోవడం లాంటి సమస్యలు ఉంటే వెంటనే 108 కి కాల్ చేయండి.',
    emergencyDisclaimer: 'ఇది కేవలం ప్రదర్శన కోసం రూపొందించిన ప్రోటోటైప్. అత్యవసర సమయంలో నేరుగా 108 లేదా 112 కి కాల్ చేయండి.',
    pharmacyTitle: 'ఫార్మసీ కాల్ బోట్',
    pharmacySubtitle: 'మందులు ఉన్నాయో లేదో తెలుసుకోవడానికి సిమ్యులేటెడ్ ఆటోమేటిక్ కాల్',
    cameraModalTitle: 'మందుల ఫోటో పరీక్ష',
    cameraInstruction: 'మందుల బాక్స్ లేదా ప్యాకెట్ లేబుల్‌ను కెమెరా ముందు ఉంచండి',
    takePhoto: 'ఫోటో తీయండి',
    retake: 'మళ్లీ తీయండి',
    uploadPhoto: 'ఫోటో అప్‌లోడ్ చేయండి',
    useDemoImage: 'డెమో మెట్ఫార్మిన్ బాక్స్ వాడండి',
    analyzingImage: 'మందుల ఫోటోను పరిశీలిస్తున్నాను...',
    medicalDisclaimer: 'ఈ AI ప్రోటోటైప్ కేవలం ప్రదర్శన కొరకు మాత్రమే. ఇది డాక్టర్ లేదా ఫార్మసిస్ట్ సలహాకు ప్రత్యామ్నాయం కాదు.',
    uncertaintyWarning: 'ప్యాకెట్ పై ఉన్న వివరాలను చదవగలను, కానీ మాత్రను మాత్రమే చూసి పేరు చెప్పడం సురక్షితం కాదు. డాక్టర్‌ని సంప్రదించండి.',
    speechSpeed: 'మాటల వేగం',
    speedNormal: 'సాధారణం',
    speedSlow: 'నెమ్మదిగా (స్పష్టంగా వినపడేలా)',
    textSize: 'అక్షరాల పరిమాణం',
    highContrast: 'హై కాంట్రాస్ట్',
    reducedMotion: 'కదలికలు తగ్గించండి',
    settings: 'సెట్టింగ్‌లు & సౌలభ్యం',
    connectionStatus: 'AI క్లౌడ్ అనుసంధానం',
    connected: 'జెమిని 3.8 ఫ్లాష్‌తో అనుసంధానించబడింది',
    demoModeActive: 'డెమో మోడ్ (ఆఫ్‌లైన్ సిద్ధంగా ఉంది)',
    urgentAlert: 'అత్యవసర హెచ్చరిక',
    cautionAlert: 'జాగ్రత్త',
    whatToDo: 'మీరు చేయవలసినది',
    nextStep: 'తదుపరి అడుగు',
  },
  hi: {
    appTitle: 'एल्डरकेयर AI',
    tagline: 'एक बटन। एक आवाज़। एक शांत उत्तर।',
    startAssistant: 'सहायक शुरू करें',
    listening: 'सुन रहा हूँ...',
    thinking: 'सोच रहा हूँ...',
    speaking: 'बोल रहा हूँ...',
    ready: 'आप बोल सकते हैं',
    prototypeActivation: 'प्रोटोटाइप एक्टिवेशन बटन (पावर डबल-प्रेस)',
    camera: 'कैमरा दिखाएं',
    emergency: 'आपातकालीन',
    nextMedicine: 'अगली दवा',
    recentConversation: 'बातचीत',
    askPlaceholder: 'अपनी दवा या स्वास्थ्य के बारे में पूछें...',
    emptyStateTitle: 'नमस्ते, मैं आपकी क्या सहायता कर सकता हूँ?',
    emptyStateSubtitle: 'नीचे दिए गए बड़े बटन को दबाएं और अपनी भाषा में बोलें।',
    sampleQuestions: [
      'मुझे मेरी दवा कब लेनी चाहिए?',
      'नाश्ते के बाद कौन सी गोली लेनी है?',
      'रोजाना सुबह 8 बजे याद दिलाएं',
      'मुझे चक्कर आ रहे हैं, क्या करना चाहिए?'
    ],
    stopSpeaking: 'रोकें',
    replay: 'फिर से सुनें',
    mute: 'आवाज़ बंद',
    unmute: 'आवाज़ चालू',
    typeInstead: 'सवाल टाइप करें',
    send: 'भेजें',
    close: 'बंद करें',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    demoMode: 'डेमो मोड',
    simulated: 'सिमुलेटेड डेमो',
    demoReminderNow: 'दवा रिमाइंडर बजाएं',
    demoEmergency: 'आपातकालीन चेतावनी डेमो',
    demoPharmacyCall: 'फार्मेसी कॉल बॉट डेमो',
    demoCameraAnalysis: 'कैमरा जांच डेमो',
    resetDemoData: 'डेमो डेटा रीसेट करें',
    medicineReminder: 'दवा रिमाइंडर',
    reminderConfirmed: 'रिमाइंडर सेट हो गया!',
    reminderPrompt: 'क्या आप यह रिमाइंडर सेट करना चाहते हैं?',
    timeForMedicine: 'आपकी दवा लेने का समय हो गया है।',
    callFamily: 'परिवार को कॉल करें',
    callDoctor: 'डॉक्टर को कॉल करें',
    callAmbulance: 'एम्बुलेंस 108 / 112',
    emergencyTitle: 'आपातकालीन सहायता',
    emergencyWarning: 'यदि सीने में तेज दर्द या सांस लेने में तकलीफ हो रही है, तो तुरंत 108 पर कॉल करें।',
    emergencyDisclaimer: 'यह प्रोटोटाइप प्रदर्शन के लिए है। आपातकाल में सीधे 112 या 108 पर संपर्क करें।',
    pharmacyTitle: 'फार्मेसी कॉल बॉट',
    pharmacySubtitle: 'दवा उपलब्धता जांचने के लिए स्वचालित सिमुलेटेड कॉल',
    cameraModalTitle: 'दवा कैमरा परीक्षण',
    cameraInstruction: 'दवा के बॉक्स या पर्ची को कैमरे के सामने रखें',
    takePhoto: 'फोटो लें',
    retake: 'दोबारा लें',
    uploadPhoto: 'फोटो अपलोड करें',
    useDemoImage: 'सैंपल मेटफॉर्मिन बॉक्स उपयोग करें',
    analyzingImage: 'दवा की फोटो जांची जा रही है...',
    medicalDisclaimer: 'यह AI सहायक केवल प्रदर्शन और सहायता के लिए है। यह डॉक्टर या फार्मासिस्ट का विकल्प नहीं है।',
    uncertaintyWarning: 'मैं पैकेट पर लिखा पढ़ सकता हूँ, लेकिन केवल गोली देखकर पहचानना सुरक्षित नहीं है। डॉक्टर से जांच कराएं।',
    speechSpeed: 'बोलने की गति',
    speedNormal: 'सामान्य',
    speedSlow: 'धीमी (साफ सुनने के लिए)',
    textSize: 'अक्षर का आकार',
    highContrast: 'उच्च कंट्रास्ट',
    reducedMotion: 'मोशन कम करें',
    settings: 'सेटिंग्स और सुगमता',
    connectionStatus: 'AI क्लाउड कनेक्शन',
    connected: 'जेमिनी 3.8 फ्लैश से जुड़ा है',
    demoModeActive: 'डेमो मोड (सक्रिय)',
    urgentAlert: 'अति आवश्यक सूचना',
    cautionAlert: 'सावधानी',
    whatToDo: 'आपको क्या करना चाहिए',
    nextStep: 'अगला कदम',
  }
};
