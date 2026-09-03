'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { Camera, RefreshCw, Upload, X, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAnalyzeImage: (base64Image: string, mimeType: string) => Promise<void>;
  isAnalyzing: boolean;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  language,
  onAnalyzeImage,
  isAnalyzing,
}) => {
  const t = TRANSLATIONS[language];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Start Camera Stream
  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, capturedImage]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('Camera access is not supported by your browser.');
        return;
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera access was denied or is unavailable. You can upload an image or use our sample medicine box.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate a clean bundled sample image of Metformin 500mg box via canvas
  const handleUseSampleImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Background medicine box gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 600, 400);
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 600, 400);

      // Accent medicine strip
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, 0, 600, 60);

      // Header text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('Rx Prescription Medicine', 30, 40);

      // Medicine title
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('METFORMIN HYDROCHLORIDE', 30, 130);

      // Dosage
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('TABLETS IP 500 mg', 30, 180);

      // Instructions & Details
      ctx.fillStyle = '#475569';
      ctx.font = '18px sans-serif';
      ctx.fillText('Dosage: 1 Tablet Daily After Meals or as directed by Physician', 30, 240);
      ctx.fillText('Batch No: MT2026-903 | Mfg: Feb 2026 | Exp: Jan 2028', 30, 280);
      ctx.fillText('Keep out of reach of children. Store below 25°C.', 30, 310);

      // Barcode simulation
      ctx.fillStyle = '#000000';
      for (let i = 0; i < 40; i++) {
        const x = 30 + i * 6;
        const w = (i % 3 === 0 ? 3 : (i % 2 === 0 ? 2 : 1));
        ctx.fillRect(x, 340, w, 35);
      }
      ctx.font = '12px monospace';
      ctx.fillText('8901234567890', 290, 365);

      const sampleUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(sampleUrl);
      stopCamera();
    }
  };

  const handleSubmit = async () => {
    if (!capturedImage) return;
    await onAnalyzeImage(capturedImage, 'image/jpeg');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-between p-4 animate-in fade-in duration-200">
      {/* Top Header with Close */}
      <div className="w-full max-w-lg flex items-center justify-between py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-sky-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {t.cameraModalTitle}
          </h2>
        </div>
        <button
          onClick={onClose}
          disabled={isAnalyzing}
          className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-slate-300 hover:text-white"
          aria-label={t.close}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Viewfinder / Image Preview Area */}
      <div className="w-full max-w-lg flex-1 flex flex-col items-center justify-center my-3 relative overflow-hidden rounded-3xl border border-white/20 liquid-glass shadow-liquid-lg">
        {capturedImage ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 relative">
            <img
              src={capturedImage}
              alt="Medicine package preview"
              className="max-h-[52vh] w-auto rounded-2xl object-contain shadow-md"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <Sparkles className="w-10 h-10 text-sky-400 animate-spin" />
                <p className="text-lg font-bold text-white tracking-wide">
                  {t.analyzingImage}
                </p>
              </div>
            )}
          </div>
        ) : cameraError ? (
          <div className="p-6 text-center max-w-md">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <p className="text-sm sm:text-base text-slate-300 mb-4">{cameraError}</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg tactile-button"
              >
                <Upload className="w-4 h-4" />
                <span>{t.uploadPhoto}</span>
              </button>
              <button
                onClick={handleUseSampleImage}
                className="w-full py-3 rounded-xl liquid-glass text-white border border-white/25 hover:bg-white/15 font-bold text-sm flex items-center justify-center gap-2 tactile-button"
              >
                <Sparkles className="w-4 h-4 text-sky-300" />
                <span>{t.useDemoImage}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Camera targeting frame for elderly */}
            <div className="absolute inset-6 border-2 border-dashed border-sky-400/60 rounded-2xl pointer-events-none flex items-end justify-center pb-4">
              <span className="bg-black/60 px-3 py-1 rounded-full text-xs text-slate-200 backdrop-blur-md">
                {t.cameraInstruction}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Medical Safety Disclaimer Alert */}
      <div className="w-full max-w-lg mb-3 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2 text-left">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[12px] text-amber-200/90 leading-tight">
          {t.uncertaintyWarning}
        </p>
      </div>

      {/* Action Controls */}
      <div className="w-full max-w-lg flex items-center justify-between gap-3 pb-2">
        {capturedImage ? (
          <>
            <button
              onClick={() => setCapturedImage(null)}
              disabled={isAnalyzing}
              className="flex-1 py-3.5 rounded-2xl liquid-glass text-slate-200 border border-white/20 font-bold text-base flex items-center justify-center gap-2 tactile-button"
            >
              <RefreshCw className="w-5 h-5" />
              <span>{t.retake}</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={isAnalyzing}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-base shadow-liquid flex items-center justify-center gap-2 tactile-button border border-sky-400/30"
            >
              <Sparkles className="w-5 h-5" />
              <span>Analyze Medicine</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-3 px-4 rounded-2xl liquid-glass text-slate-300 border border-white/15 text-sm font-semibold flex items-center gap-2"
              title={t.uploadPhoto}
            >
              <Upload className="w-5 h-5 text-sky-400" />
              <span className="hidden sm:inline">{t.uploadPhoto}</span>
            </button>

            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full bg-white p-1 shadow-liquid-lg flex items-center justify-center tactile-button"
              aria-label={t.takePhoto}
            >
              <div className="w-full h-full rounded-full border-4 border-slate-900 bg-white" />
            </button>

            <button
              onClick={handleUseSampleImage}
              className="py-3 px-3 rounded-2xl liquid-glass text-slate-300 border border-white/15 text-sm font-semibold flex items-center gap-1.5"
              title={t.useDemoImage}
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Demo Box</span>
            </button>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
