import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Settings,
  Mic,
  Keyboard,
  Camera,
  Send,
  Volume2,
  VolumeX,
  Loader2,
  Globe,
  Sparkles,
} from 'lucide-react';
import { ScreenType } from '../../types';
import { askAIChat, fetchTTSAudio } from '../../services/api';
import { getTranslation } from '../../data/translations';

interface AskAIScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  isOffline: boolean;
  selectedLanguage: string;
  onSelectLanguage?: (lang: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  disclaimer?: string;
  suggestedActions?: string[];
  audioBase64?: string | null;
}

export const AskAIScreen: React.FC<AskAIScreenProps> = ({
  onBack,
  onNavigate,
  isOffline,
  selectedLanguage,
  onSelectLanguage,
}) => {
  const t = getTranslation(selectedLanguage);

  const getLangDetails = (lang: string) => {
    if (lang.includes('తెలుగు') || lang.toLowerCase().includes('telugu')) {
      return { code: 'te-IN', name: 'తెలుగు (Telugu)', shortName: 'తెలుగు', voiceLabel: 'తెలుగు' };
    }
    if (lang.includes('हिंदी') || lang.toLowerCase().includes('hindi')) {
      return { code: 'hi-IN', name: 'हिंदी (Hindi)', shortName: 'हिंदी', voiceLabel: 'हिंदी' };
    }
    return { code: 'en-IN', name: 'English', shortName: 'English', voiceLabel: 'English' };
  };

  const getGreetingText = (lang: string) => {
    if (lang.includes('తెలుగు') || lang.toLowerCase().includes('telugu')) {
      return `నమస్కారం! నేను మీ సంజీవని AI ఆరోగ్య మిత్రుడిని. ఈ రోజు మీ ఆరోగ్యం ఎలా ఉంది? మీరు మీ సమస్యను తెలుగులో అడగవచ్చు లేదా మాట్లాడవచ్చు.`;
    }
    if (lang.includes('हिंदी') || lang.toLowerCase().includes('hindi')) {
      return `नमस्ते! मैं आपका संजीवनी AI स्वास्थ्य साथी हूँ। आज आप कैसा महसूस कर रहे हैं? आप बोलकर या लिखकर अपनी समस्या बता सकते हैं।`;
    }
    return `Hello! I am your Sanjeevani AI Health Companion. How are you feeling today? You can speak or type your concern.`;
  };

  const getPopularQuestions = (lang: string) => {
    if (lang.includes('తెలుగు') || lang.toLowerCase().includes('telugu')) {
      return [
        'నాకు జ్వరం మరియు తలనొప్పిగా ఉంది',
        'పిల్లల దగ్గు తగ్గడానికి చిట్కాలు',
        'కడుపు నొప్పికి ఏం చేయాలి?',
        'మందుల రిమైండర్ ఏర్పాటు చెయ్యి',
        'గర్భధారణ సమయంలో ఆహారం నియమాలు',
        'షుగర్ నియంత్రణ జాగ్రత్తలు',
      ];
    }
    if (lang.includes('हिंदी') || lang.toLowerCase().includes('hindi')) {
      return [
        'मुझे बुखार और सिरदर्द है',
        'बच्चे को खांसी का घरेलू उपाय',
        'पेट में दर्द है क्या करें?',
        'दवा रिमाइंडर सेट करें',
        'गर्भावस्था में भोजन सलाह',
        'डायबिटीज नियंत्रण के तरीके',
      ];
    }
    return [
      'I have fever and headache',
      'Child coughing remedies',
      'Stomach pain help',
      'Set medicine reminder',
      'Pregnancy nutrition guide',
      'Diabetes control tips',
    ];
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: getGreetingText(selectedLanguage),
      time: 'Just now',
      disclaimer: t.disclaimerText,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingMsgId, setCurrentSpeakingMsgId] = useState<string | null>(null);

  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Preload speech synthesis voices if available
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Sync initial greeting whenever selectedLanguage changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'm1') {
        return [
          {
            id: 'm1',
            sender: 'ai',
            text: getGreetingText(selectedLanguage),
            time: 'Just now',
            disclaimer: t.disclaimerText,
          },
        ];
      }
      return prev;
    });
  }, [selectedLanguage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Clean stop for all audio playback and speech synthesis
  const stopSpeaking = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentSpeakingMsgId(null);
  };

  // Browser SpeechSynthesis fallback
  const fallbackSpeechSynthesis = (
    cleanText: string,
    msgId: string | undefined,
    langCode: string
  ) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(false);
      setCurrentSpeakingMsgId(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = langCode;
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const targetLang = langCode.toLowerCase();
      const matchedVoice =
        voices.find((v) => v.lang.toLowerCase() === targetLang) ||
        voices.find((v) => v.lang.toLowerCase().replace('_', '-') === targetLang) ||
        voices.find((v) => v.lang.toLowerCase().startsWith(targetLang.slice(0, 2)));

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (msgId) setCurrentSpeakingMsgId(msgId);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentSpeakingMsgId(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentSpeakingMsgId(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
      setCurrentSpeakingMsgId(null);
    }
  };

  // Speaks text aloud in the designated language using Gemini Voice / Neural audio or Web Speech
  const speakText = async (
    text: string,
    msgId?: string,
    providedAudioBase64?: string | null,
    overrideLang?: string
  ) => {
    stopSpeaking();

    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s?/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/\n+/g, '. ')
      .trim();

    if (!cleanText) return;

    const langToUse = overrideLang || selectedLanguage;
    const langInfo = getLangDetails(langToUse);

    setIsSpeaking(true);
    if (msgId) setCurrentSpeakingMsgId(msgId);

    // 1. If base64 audio already exists from server, or if online, fetch neural audio in Telugu/Hindi
    let audioData = providedAudioBase64;
    if (!audioData && !isOffline) {
      try {
        audioData = await fetchTTSAudio(cleanText, langToUse);
      } catch (err) {
        console.warn('Fetch TTS audio failed, using browser speech fallback', err);
      }
    }

    if (audioData) {
      try {
        const audio = new Audio(`data:audio/wav;base64,${audioData}`);
        activeAudioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          setCurrentSpeakingMsgId(null);
          activeAudioRef.current = null;
        };
        audio.onerror = () => {
          activeAudioRef.current = null;
          fallbackSpeechSynthesis(cleanText, msgId, langInfo.code);
        };
        await audio.play();
        return;
      } catch (playErr) {
        console.warn('Audio play error, falling back to speech synthesis:', playErr);
      }
    }

    // 2. Fallback to native Web Speech Synthesis
    fallbackSpeechSynthesis(cleanText, msgId, langInfo.code);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    stopSpeaking();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await askAIChat(query, selectedLanguage, isOffline);

      const aiMsgId = (Date.now() + 1).toString();
      const defaultFallback = selectedLanguage.includes('తెలుగు')
        ? 'నమస్కారం! మీ ప్రశ్నకు ధన్యవాదాలు. దయచేసి తగినంత విశ్రాంతి తీసుకోండి.'
        : selectedLanguage.includes('हिंदी')
        ? 'नमस्ते! आपके प्रश्न के लिए धन्यवाद। कृपया पर्याप्त आराम करें।'
        : 'Hello! Thank you for asking. Please rest and drink safe water.';

      const aiMsg: Message = {
        id: aiMsgId,
        sender: 'ai',
        text: res.reply || defaultFallback,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        disclaimer: res.disclaimer,
        suggestedActions: res.suggestedActions,
        audioBase64: res.audioBase64,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Automatically speak the response aloud in Telugu or Hindi
      speakText(aiMsg.text, aiMsgId, res.audioBase64, selectedLanguage);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = () => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not directly supported in this browser. Please type your message.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const langInfo = getLangDetails(selectedLanguage);
    recognition.lang = langInfo.code;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
      handleSend(transcript);
    };

    recognition.onerror = (e: any) => {
      console.warn('Speech recognition error:', e);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const langDetails = getLangDetails(selectedLanguage);
  const popularQuestions = getPopularQuestions(selectedLanguage);

  return (
    <div className="flex-1 flex flex-col bg-[#FBF7EE] text-gray-800 animate-fadeIn">
      {/* Top Header */}
      <div className="p-3 bg-white border-b border-[#E5DEC9] flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <button
          onClick={() => {
            stopSpeaking();
            onBack();
          }}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <h1 className="text-sm font-black text-gray-900">{t.askAITitle}</h1>
          <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200 shadow-2xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isSpeaking ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
              }`}
            />
            <span>
              {isSpeaking
                ? `${langDetails.shortName} మాట్లాడుతోంది...`
                : `${langDetails.shortName} Voice Ready`}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            stopSpeaking();
            onNavigate('settings');
          }}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Language Switcher Bar for Voice Speech */}
      <div className="px-3 py-2 bg-emerald-50/90 border-b border-emerald-200 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 text-xs font-black text-[#2E6B4F] shrink-0">
          <Globe className="w-3.5 h-3.5" />
          <span>వాయిస్ భాష / Language:</span>
        </div>

        <div className="flex gap-1.5 shrink-0">
          {['తెలుగు', 'हिंदी', 'English'].map((lang) => {
            const isSelected = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => {
                  stopSpeaking();
                  if (onSelectLanguage) {
                    onSelectLanguage(lang);
                  }
                  // Update and speak the greeting in the newly selected language
                  const newGreeting = getGreetingText(lang);
                  setMessages([
                    {
                      id: 'm1',
                      sender: 'ai',
                      text: newGreeting,
                      time: 'Just now',
                      disclaimer: getTranslation(lang).disclaimerText,
                    },
                  ]);
                  // Speak greeting immediately in the chosen language
                  speakText(newGreeting, 'm1', null, lang);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition active:scale-95 shadow-2xs ${
                  isSelected
                    ? 'bg-[#2E6B4F] text-white ring-2 ring-[#2E6B4F]/30 shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Conversational Viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Doctor Avatar Hero Circle */}
        <div className="flex flex-col items-center justify-center my-1 text-center">
          <div className="relative mb-2">
            <div
              className={`absolute inset-0 rounded-full bg-[#2E6B4F]/20 animate-ping ${
                isRecording || isSpeaking ? 'opacity-100' : 'opacity-30'
              }`}
            />
            <div className="relative w-20 h-20 rounded-full bg-[#E2F0E8] border-4 border-[#2E6B4F] flex items-center justify-center overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1594824813566-78853a812328?auto=format&fit=crop&q=80&w=200"
                alt="AI Doctor Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <h2 className="text-sm font-extrabold text-gray-900">
            {t.howAreYou}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[11px] text-[#2E6B4F] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#2E6B4F]" />
              <span>Speaking strictly in {langDetails.name}</span>
            </p>
            <button
              onClick={() => {
                const currentMsg = messages[messages.length - 1]?.text || getGreetingText(selectedLanguage);
                speakText(currentMsg, messages[messages.length - 1]?.id || 'm1');
              }}
              className="text-[10px] font-bold bg-[#2E6B4F]/10 hover:bg-[#2E6B4F]/20 text-[#2E6B4F] px-2 py-0.5 rounded-full flex items-center gap-1 transition"
              title="Test Voice Speech"
            >
              <Volume2 className="w-3 h-3" />
              <span>🔊 టెస్ట్ వాయిస్ / Test</span>
            </button>
          </div>
        </div>

        {/* 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-2.5 my-2">
          {/* Speak Button */}
          <button
            onClick={toggleMic}
            className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition active:scale-95 shadow-2xs ${
              isRecording
                ? 'bg-red-500 text-white border-red-600 animate-pulse'
                : 'bg-white border-[#E5DEC9] hover:bg-gray-50 text-gray-800'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isRecording ? 'bg-red-600 text-white' : 'bg-[#2E6B4F] text-white'
              }`}
            >
              <Mic className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-center leading-tight">
              {isRecording ? t.listeningSpeech : `${t.speakToAI} (${langDetails.shortName})`}
            </span>
          </button>

          {/* Type Button */}
          <button
            onClick={() => {
              const inputEl = document.getElementById('chat-input-field');
              inputEl?.focus();
            }}
            className="p-3 rounded-2xl bg-white border border-[#E5DEC9] flex flex-col items-center gap-1.5 hover:bg-gray-50 text-gray-800 transition active:scale-95 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
              <Keyboard className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold">{t.send}</span>
          </button>

          {/* Scan Button */}
          <button
            onClick={() => {
              stopSpeaking();
              onNavigate('prescription-scanner');
            }}
            className="p-3 rounded-2xl bg-white border border-[#E5DEC9] flex flex-col items-center gap-1.5 hover:bg-gray-50 text-gray-800 transition active:scale-95 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold">{t.scanPrescription}</span>
          </button>
        </div>

        {/* Suggested Questions in Selected Language */}
        <div>
          <span className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider block mb-1.5">
            {t.suggestedQuestionsTitle} ({langDetails.shortName})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 bg-white border border-[#E5DEC9] rounded-full text-xs font-semibold text-gray-800 hover:bg-[#E2F0E8] hover:border-[#2E6B4F] hover:text-[#2E6B4F] transition shadow-2xs text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Feed */}
        <div className="space-y-3 pt-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs relative ${
                  m.sender === 'user'
                    ? 'bg-[#2E6B4F] text-white rounded-tr-none font-medium'
                    : 'bg-white border border-[#E5DEC9] text-gray-800 rounded-tl-none font-normal'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>

                {m.sender === 'ai' && (
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        if (isSpeaking && currentSpeakingMsgId === m.id) {
                          stopSpeaking();
                        } else {
                          speakText(m.text, m.id, m.audioBase64);
                        }
                      }}
                      className={`px-2.5 py-1 font-bold rounded-lg text-[10px] flex items-center gap-1.5 transition border ${
                        isSpeaking && currentSpeakingMsgId === m.id
                          ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/40'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-[#2E6B4F] border-emerald-200'
                      }`}
                    >
                      {isSpeaking && currentSpeakingMsgId === m.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                          <span>ఆపు / Stop Speaking</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#2E6B4F]" />
                          <span>🔊 Listen in {langDetails.shortName}</span>
                        </>
                      )}
                    </button>

                    {m.disclaimer && (
                      <span className="text-[9px] text-gray-400 italic">
                        AI Guidance
                      </span>
                    )}
                  </div>
                )}

                {m.disclaimer && (
                  <p className="mt-1.5 text-[10px] text-gray-500 italic">
                    📍 {m.disclaimer}
                  </p>
                )}

                {/* Suggested Action Buttons if present */}
                {m.suggestedActions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.suggestedActions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => {
                          stopSpeaking();
                          if (
                            act.includes('Clinic') ||
                            act.includes('కంటి') ||
                            act.includes('క్లినిక్') ||
                            act.includes('अस्पताल')
                          )
                            onNavigate('nearby-clinics');
                          else if (
                            act.includes('Medicines') ||
                            act.includes('Reminder') ||
                            act.includes('మందుల') ||
                            act.includes('दवा')
                          )
                            onNavigate('medicine-reminder');
                          else if (
                            act.includes('112') ||
                            act.includes('Emergency') ||
                            act.includes('అత్యవసర') ||
                            act.includes('इमरजेंसी')
                          )
                            onNavigate('emergency-help');
                        }}
                        className="px-2.5 py-1 bg-[#2E6B4F]/10 hover:bg-[#2E6B4F]/20 text-[#2E6B4F] font-bold rounded-lg text-[10px] transition"
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[9px] text-gray-500 mt-0.5 px-1">{m.time}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#2E6B4F] font-bold p-2.5 bg-white/80 rounded-2xl border border-emerald-100">
              <Loader2 className="w-4 h-4 animate-spin text-[#2E6B4F]" />
              <span>
                {selectedLanguage.includes('తెలుగు')
                  ? 'సంజీవని AI ఆలోచిస్తోంది...'
                  : selectedLanguage.includes('हिंदी')
                  ? 'संजीवनी AI सोच रहा है...'
                  : 'Sanjeevani AI is thinking...'}
              </span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Audio TTS Active Floating Bar */}
      {isSpeaking && (
        <div className="bg-amber-100 border-t border-amber-200 px-3 py-2 flex items-center justify-between text-xs text-amber-900 shadow-inner animate-pulse">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 animate-bounce text-amber-700" />
            <span className="font-bold text-[11px]">
              Speaking in {langDetails.name} ({langDetails.shortName})...
            </span>
          </div>
          <button
            onClick={stopSpeaking}
            className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2.5 py-1 rounded-md hover:bg-amber-300 transition"
          >
            ఆపు / Stop Voice
          </button>
        </div>
      )}

      {/* Bottom Text Input Bar */}
      <div className="p-2.5 bg-white border-t border-[#E5DEC9] flex items-center gap-2">
        <input
          id="chat-input-field"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`${t.speakOrTypePlaceholder} (${langDetails.shortName})`}
          className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="w-9 h-9 rounded-2xl bg-[#2E6B4F] disabled:bg-gray-300 text-white flex items-center justify-center shadow-xs transition active:scale-95 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
