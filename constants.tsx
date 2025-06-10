import React from 'react';

export const TIME_OF_DAY_OPTIONS = [
  { value: "Pagi", label: "Pagi (Morning)" },
  { value: "Siang", label: "Siang (Afternoon)" },
  { value: "Sore", label: "Sore (Evening)" },
  { value: "Malam", label: "Malam (Night)" },
  { value: "Fajar", label: "Fajar (Dawn)" },
  { value: "Senja", label: "Senja (Dusk)" },
  { value: "Tengah Malam", label: "Tengah Malam (Midnight)" },
] as const;

export const CAMERA_MOVEMENTS = [
  { value: "Static", label: "Static (Statis)" },
  { value: "Pan Left", label: "Pan Left (Geser Kiri)" },
  { value: "Pan Right", label: "Pan Right (Geser Kanan)" },
  { value: "Tilt Up", label: "Tilt Up (Miring ke Atas)" },
  { value: "Tilt Down", label: "Tilt Down (Miring ke Bawah)" },
  { value: "Zoom In", label: "Zoom In (Perbesar)" },
  { value: "Zoom Out", label: "Zoom Out (Perkecil)" },
  { value: "Dolly In", label: "Dolly In (Dorong Maju)" },
  { value: "Dolly Out", label: "Dolly Out (Dorong Mundur)" },
  { value: "Pedestal Up", label: "Pedestal Up (Pedestal Naik)" },
  { value: "Pedestal Down", label: "Pedestal Down (Pedestal Turun)" },
  { value: "Truck Left", label: "Truck Left (Geser Kamera Kiri)" },
  { value: "Truck Right", label: "Truck Right (Geser Kamera Kanan)" },
  { value: "Follow Shot", label: "Follow Shot (Mengikuti Subjek)" },
  { value: "Tracking Shot", label: "Tracking Shot (Melacak Subjek)" },
  { value: "Handheld", label: "Handheld (Genggam Tangan)" },
  { value: "Steadicam", label: "Steadicam (Stabil)" },
  { value: "Drone Shot", label: "Drone Shot (Tampilan Udara)" },
  { value: "Orbit Left", label: "Orbit Left (Mengorbit Kiri)" },
  { value: "Orbit Right", label: "Orbit Right (Mengorbit Kanan)" },
  { value: "Boom Up", label: "Boom Up (Boom Naik)" },
  { value: "Boom Down", label: "Boom Down (Boom Turun)" },
  { value: "Crane Shot", label: "Crane Shot (Pengambilan Derek)" },
  { value: "Whip Pan", label: "Whip Pan (Pan Cepat)" },
  { value: "Crash Zoom", label: "Crash Zoom (Zoom Cepat Mendadak)" },
  { value: "Vertigo Effect (Dolly Zoom)", label: "Vertigo Effect / Dolly Zoom (Efek Vertigo)" },
  { value: "3D Rotation X-Axis", label: "3D Rotation - X Axis (Rotasi 3D - Sumbu X)" },
  { value: "3D Rotation Y-Axis", label: "3D Rotation - Y Axis (Rotasi 3D - Sumbu Y)" },
  { value: "3D Rotation Z-Axis", label: "3D Rotation - Z Axis (Rotasi 3D - Sumbu Z)" },
  { value: "Slow Motion", label: "Slow Motion (Gerak Lambat)" },
  { value: "Time Lapse", label: "Time Lapse (Selang Waktu)" },
  { value: "Dutch Angle", label: "Dutch Angle (Sudut Miring)" },
  { value: "Eye-Level Shot", label: "Eye-Level Shot (Sejajar Mata)" },
  { value: "Low Angle Shot", label: "Low Angle Shot (Sudut Rendah)" },
  { value: "High Angle Shot", label: "High Angle Shot (Sudut Tinggi)" },
  { value: "Overhead Shot", label: "Overhead Shot (Tampilan Atas)" },
  { value: "Point of View (POV)", label: "Point of View (POV) (Sudut Pandang Subjek)" },
] as const;

export const LIGHTING_STYLES = [
  { value: "Natural Light", label: "Natural Light (Cahaya Alami)" },
  { value: "Studio Lighting", label: "Studio Lighting (Pencahayaan Studio)" },
  { value: "Golden Hour", label: "Golden Hour (Jam Emas)" },
  { value: "Blue Hour", label: "Blue Hour (Jam Biru)" },
  { value: "Overcast", label: "Overcast (Mendung)" },
  { value: "Backlit", label: "Backlit (Cahaya dari Belakang)" },
  { value: "Rim Lighting", label: "Rim Lighting (Cahaya Tepi)" },
  { value: "High Key", label: "High Key (Dominan Terang)" },
  { value: "Low Key", label: "Low Key (Dominan Gelap)" },
  { value: "Neon Glow", label: "Neon Glow (Sinar Neon)" },
  { value: "Moonlight", label: "Moonlight (Sinar Bulan)" },
  { value: "Volumetric Lighting", label: "Volumetric Lighting (Cahaya Volumetrik)" },
  { value: "Film Noir", label: "Film Noir (Gaya Film Noir)" },
  { value: "Ambient Light", label: "Ambient Light (Cahaya Sekitar)" },
  { value: "Chiaroscuro", label: "Chiaroscuro (Kontras Terang-Gelap)" },
] as const;

export const VIDEO_STYLES = [
  { value: "Cinematic", label: "Cinematic (Sinematik)" },
  { value: "Photorealistic", label: "Photorealistic (Fotorealistik)" },
  { value: "Anime", label: "Anime" },
  { value: "Watercolor", label: "Watercolor (Cat Air)" },
  { value: "Oil Painting", label: "Oil Painting (Lukisan Cat Minyak)" },
  { value: "Pixel Art", label: "Pixel Art" },
  { value: "Steampunk", label: "Steampunk" },
  { value: "Cyberpunk", label: "Cyberpunk" },
  { value: "Fantasy Art", label: "Fantasy Art (Seni Fantasi)" },
  { value: "Impressionistic", label: "Impressionistic (Impresionistik)" },
  { value: "Surreal", label: "Surreal (Surealis)" },
  { value: "Minimalist", label: "Minimalist (Minimalis)" },
  { value: "Abstract", label: "Abstract (Abstrak)" },
  { value: "Documentary", label: "Documentary (Dokumenter)" },
  { value: "Vintage Film", label: "Vintage Film (Film Jadul)" },
  { value: "Claymation", label: "Claymation (Animasi Tanah Liat)" },
  { value: "Stop Motion", label: "Stop Motion" },
  { value: "Sketch", label: "Sketch (Sketsa)" },
  { value: "Comic Book", label: "Comic Book (Buku Komik)" },
  { value: "Low Poly", label: "Low Poly (Poligon Rendah)" },
] as const; // 'Kustom' will be added dynamically in the component

export const VIDEO_MOODS = [
  { value: "Dramatic", label: "Dramatic (Dramatis)" },
  { value: "Serene", label: "Serene (Tenang)" },
  { value: "Joyful", label: "Joyful (Gembira)" },
  { value: "Mysterious", label: "Mysterious (Misterius)" },
  { value: "Epic", label: "Epic (Epik)" },
  { value: "Whimsical", label: "Whimsical (Unik/Lucu)" },
  { value: "Nostalgic", label: "Nostalgic (Nostalgia)" },
  { value: "Futuristic", label: "Futuristic (Futuristik)" },
  { value: "Romantic", label: "Romantic (Romantis)" },
  { value: "Suspenseful", label: "Suspenseful (Mencekam)" },
  { value: "Gloomy", label: "Gloomy (Suram)" },
  { value: "Energetic", label: "Energetic (Energik)" },
  { value: "Peaceful", label: "Peaceful (Damai)" },
  { value: "Tense", label: "Tense (Tegang)" },
  { value: "Humorous", label: "Humorous (Humoris)" },
  { value: "Dark", label: "Dark (Gelap)" },
] as const;


export const CopyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

export const ResetIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const GenerateIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75M18.25 12L17 10.25m1.25 1.75L21 13.75M18.25 12L21 10.25M12.75 5.25L11 3.5M12.75 5.25L11 7M12.75 5.25L15 3.5M12.75 5.25L15 7M6.75 18.75L5 17M6.75 18.75L5 20.5M6.75 18.75L9 17M6.75 18.75L9 20.5M17.25 9.75L16 8M17.25 9.75L16 11.5M17.25 9.75L19 8M17.25 9.75L19 11.5" />
  </svg>
);

export const TranslateIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
  </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);
