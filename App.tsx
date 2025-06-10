
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PromptElements, VideoStyleValue } from './types';
import { 
  TIME_OF_DAY_OPTIONS, CAMERA_MOVEMENTS, LIGHTING_STYLES, 
  VIDEO_STYLES, VIDEO_MOODS,
  CopyIcon, ResetIcon, GenerateIcon, TranslateIcon, EditIcon
} from './constants';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import TextAreaField from './components/TextAreaField';

// Ensure API_KEY is accessed correctly from environment variables
const API_KEY = process.env.API_KEY;

const initialPromptElements: PromptElements = {
  subject: '',
  action: '',
  expression: '',
  place: '',
  timeOfDay: TIME_OF_DAY_OPTIONS[0].value,
  cameraMovement: CAMERA_MOVEMENTS[0].value,
  lightingStyle: LIGHTING_STYLES[0].value,
  videoStyle: VIDEO_STYLES[0].value as VideoStyleValue,
  customVideoStyleText: '',
  videoMood: VIDEO_MOODS[0].value,
  soundMusic: '',
  spokenWords: '',
  additionalDetails: '',
};

const App: React.FC = () => {
  const [promptElements, setPromptElements] = useState<PromptElements>(initialPromptElements);
  const [indonesianPrompt, setIndonesianPrompt] = useState<string>('');
  const [englishPrompt, setEnglishPrompt] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [ai, setAi] = useState<GoogleGenAI | null>(null);

  useEffect(() => {
    if (API_KEY) {
      try {
        setAi(new GoogleGenAI({ apiKey: API_KEY }));
      } catch (e) {
        console.error("Failed to initialize GoogleGenAI:", e);
        setError("Gagal menginisialisasi layanan AI. Pastikan API Key valid.");
      }
    } else {
      setError("API Key tidak ditemukan. Mohon konfigurasi API Key untuk menggunakan fitur terjemahan.");
    }
  }, []);


  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPromptElements(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleVideoStyleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPromptElements(prev => ({ 
      ...prev, 
      [name]: value as VideoStyleValue,
      customVideoStyleText: value === 'Kustom' ? prev.customVideoStyleText : '' 
    }));
  }, []);

  const handleIndonesianPromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIndonesianPrompt(e.target.value);
  }, []);

  const generateIndonesianNarrative = useCallback((): string => {
    const p = promptElements;
    let narrative = `Sebuah video menampilkan ${p.subject || 'subjek utama'}`;
    if (p.action) narrative += ` yang sedang ${p.action}`;
    if (p.expression) narrative += ` dengan ekspresi ${p.expression}`;
    narrative += `.`;

    if (p.place) narrative += ` Adegan ini berlatar di ${p.place}`;
    narrative += ` pada waktu ${p.timeOfDay || TIME_OF_DAY_OPTIONS[0].label}.`;
    
    const cameraLabel = CAMERA_MOVEMENTS.find(cm => cm.value === p.cameraMovement)?.label || p.cameraMovement;
    narrative += ` Pengambilan gambar menggunakan gerakan kamera ${cameraLabel}.`;

    const lightingLabel = LIGHTING_STYLES.find(ls => ls.value === p.lightingStyle)?.label || p.lightingStyle;
    narrative += ` Pencahayaan ${lightingLabel} digunakan`;

    let styleDesc = p.videoStyle === 'Kustom' ? p.customVideoStyleText : (VIDEO_STYLES.find(vs => vs.value === p.videoStyle)?.label || p.videoStyle);
    if (styleDesc) narrative += ` untuk menciptakan gaya video ${styleDesc}`;
    
    const moodLabel = VIDEO_MOODS.find(vm => vm.value === p.videoMood)?.label || p.videoMood;
    narrative += ` yang menonjolkan suasana ${moodLabel}.`;

    if (p.soundMusic) narrative += ` Efek suara atau musik yang mengiringi adalah ${p.soundMusic}.`;
    if (p.spokenWords) narrative += ` Kalimat yang diucapkan: "${p.spokenWords}".`;
    if (p.additionalDetails) narrative += ` Detail tambahan lainnya: ${p.additionalDetails}.`;
    
    return narrative.replace(/\s+\./g, '.').replace(/\s{2,}/g, ' ').trim();
  }, [promptElements]);


  const handleGenerateAndTranslate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    setEnglishPrompt('');

    const currentIndonesianPrompt = generateIndonesianNarrative();
    setIndonesianPrompt(currentIndonesianPrompt);

    if (!ai) {
      setError("Layanan AI tidak terinisialisasi. Tidak dapat menerjemahkan.");
      setIsGenerating(false);
      return;
    }

    if (!currentIndonesianPrompt) {
        setError("Prompt Bahasa Indonesia kosong, tidak ada yang bisa diterjemahkan.");
        setIsGenerating(false);
        return;
    }
    
    const translationPrompt = `Translate the following Indonesian text to English.
IMPORTANT: Do not translate any text that appears after "Kalimat yang diucapkan: " and is enclosed in double quotes. Keep that specific quoted text in its original language. If there is no "Kalimat yang diucapkan: " part, translate the entire text.

Indonesian text to translate:
${currentIndonesianPrompt}`;

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17', // Use appropriate model
        contents: translationPrompt,
      });
      
      const translatedText = response.text;
      if (translatedText) {
        setEnglishPrompt(translatedText.trim());
      } else {
        setError("Gagal mendapatkan terjemahan dari API.");
      }
    } catch (e: any) {
      console.error('Translation API error:', e);
      setError(`Gagal menerjemahkan: ${e.message || 'Terjadi kesalahan pada API.'}`);
      setEnglishPrompt(''); // Clear previous English prompt on error
    } finally {
      setIsGenerating(false);
    }
  }, [ai, generateIndonesianNarrative]);

  const handleCopyToClipboard = useCallback(() => {
    if (englishPrompt) {
      navigator.clipboard.writeText(englishPrompt)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy text: ', err));
    }
  }, [englishPrompt]);

  const handleReset = useCallback(() => {
    setPromptElements(initialPromptElements);
    setIndonesianPrompt('');
    setEnglishPrompt('');
    setIsCopied(false);
    setError(null);
  }, []);
  
  const dynamicVideoStyleOptions = [...VIDEO_STYLES, {value: 'Kustom', label: 'Kustom (Custom)'}];


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
            Veo 3 Prompt Generator by idriswiranata.com
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">Buat deskripsi prompt video yang detail dan terstruktur.</p>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-800 border border-red-600 text-red-100 rounded-md text-center">
            {error}
          </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Input Section */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl space-y-5">
            <h2 className="text-2xl font-semibold text-indigo-400 border-b border-slate-700 pb-3 mb-5 flex items-center">
              <EditIcon className="w-6 h-6 mr-2 text-purple-400"/>
              Parameter Prompt
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <InputField label="Subjek Utama" id="subject" value={promptElements.subject} onChange={handleChange} placeholder="Mis: Naga merah raksasa" />
              <InputField label="Ekspresi Subjek" id="expression" value={promptElements.expression} onChange={handleChange} placeholder="Mis: Marah, bahagia, terkejut" />
            </div>
            
            <TextAreaField label="Aksi / Kegiatan" id="action" value={promptElements.action} onChange={handleChange} placeholder="Mis: Terbang di atas gunung berapi, menari di bawah hujan" rows={2} />
            <InputField label="Tempat / Latar" id="place" value={promptElements.place} onChange={handleChange} placeholder="Mis: Hutan ajaib, kota futuristik" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <SelectField label="Waktu Kejadian" id="timeOfDay" value={promptElements.timeOfDay} onChange={handleChange} options={TIME_OF_DAY_OPTIONS} />
              <SelectField label="Gerakan Kamera" id="cameraMovement" value={promptElements.cameraMovement} onChange={handleChange} options={CAMERA_MOVEMENTS} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <SelectField label="Gaya Pencahayaan" id="lightingStyle" value={promptElements.lightingStyle} onChange={handleChange} options={LIGHTING_STYLES} />
              <SelectField label="Suasana Video" id="videoMood" value={promptElements.videoMood} onChange={handleChange} options={VIDEO_MOODS} />
            </div>
            
            <SelectField label="Gaya Video" id="videoStyle" value={promptElements.videoStyle} onChange={handleVideoStyleChange} options={dynamicVideoStyleOptions} />
            {promptElements.videoStyle === 'Kustom' && (
              <InputField label="Detail Gaya Kustom" id="customVideoStyleText" value={promptElements.customVideoStyleText} onChange={handleChange} placeholder="Mis: Terinspirasi Van Gogh, visual vaporwave" />
            )}
            
            <TextAreaField label="Suara atau Musik" id="soundMusic" value={promptElements.soundMusic} onChange={handleChange} placeholder="Mis: Musik orkestra epik, suara gemericik air" rows={2} />
            <TextAreaField label="Kalimat yang Diucapkan (Dialog/Narasi)" id="spokenWords" value={promptElements.spokenWords} onChange={handleChange} placeholder="Mis: 'Kita harus pergi sekarang!'" rows={2} />
            <TextAreaField label="Detail Tambahan" id="additionalDetails" value={promptElements.additionalDetails} onChange={handleChange} placeholder="Mis: Fokus pada detail mata subjek, gunakan warna dominan biru" rows={3} />
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
              <button
                onClick={handleGenerateAndTranslate}
                disabled={isGenerating || !ai}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-150 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <GenerateIcon className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Memproses...' : 'Buat & Terjemahkan Prompt'}
              </button>
              <button
                onClick={handleReset}
                disabled={isGenerating}
                className="sm:w-auto px-4 py-3 bg-slate-600 text-slate-200 font-semibold rounded-md shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors disabled:opacity-50"
                title="Reset semua input"
              >
                <ResetIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl h-fit sticky top-8 space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2 flex items-center">
                    <EditIcon className="w-5 h-5 mr-2"/>
                    Prompt Bahasa Indonesia (Dapat Diedit)
                </h3>
                <textarea
                    value={indonesianPrompt}
                    onChange={handleIndonesianPromptChange}
                    rows={8}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                    placeholder="Hasil prompt Bahasa Indonesia akan muncul di sini dan bisa Anda sunting..."
                    aria-label="Prompt Bahasa Indonesia yang dapat diedit"
                />
            </div>
            
            <div className="border-t border-slate-700 pt-6">
                <h3 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
                    <TranslateIcon className="w-5 h-5 mr-2"/>
                    Prompt Bahasa Inggris (Final)
                </h3>
                {isGenerating && !englishPrompt && (
                    <div className="flex items-center justify-center text-slate-400 py-8">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Menerjemahkan...
                    </div>
                )}
                {!isGenerating && !englishPrompt && !indonesianPrompt && (
                     <div className="text-center text-slate-400 py-8 px-4">
                        <p className="text-md">Prompt Bahasa Inggris akan muncul di sini setelah dibuat dan diterjemahkan.</p>
                        <p className="text-sm mt-1">Isi parameter di sebelah kiri, lalu klik "Buat & Terjemahkan Prompt".</p>
                    </div>
                )}
                 {!isGenerating && !englishPrompt && indonesianPrompt && (
                     <div className="text-center text-slate-400 py-8 px-4">
                        <p className="text-md">Klik "Buat & Terjemahkan Prompt" untuk menghasilkan versi Bahasa Inggris.</p>
                    </div>
                )}
                {englishPrompt && (
                    <div className="relative p-3 bg-slate-900 rounded-md min-h-[150px] glowing-border">
                        <pre className="text-sm text-slate-200 whitespace-pre-wrap break-words">
                        {englishPrompt}
                        </pre>
                        <button
                        onClick={handleCopyToClipboard}
                        className="absolute top-2 right-2 p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
                        aria-label="Salin prompt Bahasa Inggris"
                        title="Salin prompt Bahasa Inggris"
                        >
                        <CopyIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
                {isCopied && (
                    <p className="mt-2 text-xs text-green-400 text-right">Prompt Bahasa Inggris disalin ke clipboard!</p>
                )}
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-slate-500 text-sm py-8 border-t border-slate-700">
          <p>&copy; {new Date().getFullYear()} Veo 3 Prompt Generator by idriswiranata.com. Dibuat untuk tujuan demonstrasi.</p>
          <p className="mt-1">Memanfaatkan teknologi Gemini API.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
