import React, { useState } from 'react';
import { Bug, Camera, Upload, ShieldCheck, AlertTriangle, MapPin, Sparkles } from 'lucide-react';
import { DiseaseHeatmap } from '../components/maps/DiseaseHeatmap';
import { scanLeafDisease } from '../services/api';

export const DiseaseScannerPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('Please choose an image smaller than 10 MB.');
      return;
    }
    setSelectedImage(URL.createObjectURL(file));
    setDiagnosis(null);
    setError('');
    await runDiagnosis(file);
  };

  const runDiagnosis = async (file) => {
    setLoading(true);
    try {
      const result = await scanLeafDisease(file);
      setDiagnosis(result.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'The disease model could not analyse this image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-bold uppercase mb-3">
          <Bug className="w-3.5 h-3.5" />
          <span>Module 5 • Leaf Diagnostic Vision Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">AI Leaf Disease Scanner</h1>
        <p className="mt-2 text-sm text-gray-500">Snap or upload a photo of your infected leaf for instant deep-learning diagnosis and organic/chemical remedies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upload Box */}
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-red-500/40 relative">
          {selectedImage ? (
            <div className="space-y-4 w-full">
              <img src={selectedImage} alt="Uploaded Leaf" className="w-full h-64 object-cover rounded-2xl shadow-md border border-gray-300 dark:border-gray-700" />
              <button
                onClick={() => { setSelectedImage(null); setDiagnosis(null); setError(''); }}
                className="text-xs font-bold text-red-500 underline"
              >
                Upload Different Photo
              </button>
            </div>
          ) : (
            <label className="cursor-pointer space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 text-red-500 flex items-center justify-center shadow-lg">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">Upload or Capture Leaf Photo</h3>
                <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WEBP files up to 10MB</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <span className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md">
                Browse Image File
              </span>
            </label>
          )}
        </div>

        {/* Diagnosis Result */}
        <div>
          {loading && (
            <div className="glass-card p-12 text-center flex flex-col items-center justify-center h-full">
              <span className="text-4xl animate-bounce mb-3">🔍</span>
              <h3 className="text-lg font-bold">ResNet-50 Vision Model Processing...</h3>
              <p className="text-xs text-gray-500 mt-1">Comparing cellular leaf patterns against 54,000 crop disease datasets.</p>
            </div>
          )}

          {!loading && error && (
            <div className="glass-card p-8 text-center text-red-600"><AlertTriangle className="w-10 h-10 mx-auto mb-3" /><p className="text-sm font-semibold">{error}</p><p className="text-xs text-gray-500 mt-2">Check that the backend and the deep-learning dependencies are running, then try again.</p></div>
          )}

          {!loading && !diagnosis && !error && (
            <div className="glass-card p-12 text-center flex flex-col items-center justify-center h-full text-gray-400">
              <Bug className="w-16 h-16 mb-2 text-gray-300 dark:text-gray-700" />
              <p className="text-xs font-semibold">Upload a leaf photo on the left to see the AI diagnostic report.</p>
            </div>
          )}

          {!loading && diagnosis && (
            <div className="glass-card p-6 space-y-4 border-l-4 border-l-red-500 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-red-100 dark:bg-red-950 text-red-600">
                  {diagnosis.confidence}% Confidence
                </span>
                <span className="text-xs font-bold text-gray-500">Affected Crop: {diagnosis.crop}</span>
              </div>

              <h2 className="text-2xl font-black text-red-600 dark:text-red-400">{diagnosis.diseaseName}</h2>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed"><strong>Symptoms:</strong> {diagnosis.symptoms}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{diagnosis.imageQualityNote}</p>
              {diagnosis.topPredictions?.length > 1 && (<div className="text-xs text-gray-600 dark:text-gray-300"><strong>Other model matches:</strong> {diagnosis.topPredictions.slice(1).map((prediction) => `${prediction.label} (${prediction.confidence}%)`).join(' · ')}</div>)}

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <h4 className="font-bold text-xs text-amber-700 dark:text-amber-300 flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Recommended Chemical Spray</span>
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-200 mt-1">{diagnosis.chemicalTreatment}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="font-bold text-xs text-emerald-700 dark:text-emerald-300 flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Eco-Friendly Organic Remedy</span>
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-200 mt-1">{diagnosis.organicTreatment}</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Regional Disease Outbreak Map Section */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-red-500" />
          <span>Regional Disease Outbreak Heatmap</span>
        </h3>
        <DiseaseHeatmap />
      </div>

    </div>
  );
};
