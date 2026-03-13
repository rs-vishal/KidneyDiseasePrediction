import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Activity, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { uploadFusionData } from "../services/Execution";

export default function FusionModel() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    bp: "",
    creatinine: "",
    egfr: "",
    urea: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image first.");
      return;
    }
    
    setIsLoading(true);
    setResultData(null);
    
    try {
      const result = await uploadFusionData(file, formData);
      setResultData(result);
    } catch (error) {
      alert("Late Fusion Data submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white flex flex-col items-center px-6 py-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent pb-10"
      >
        Late Fusion Model Input
      </motion.h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-300 max-w-3xl text-center leading-relaxed mb-12"
      >
        Upload your <span className="text-blue-400 font-semibold">Kidney Image Scan</span> along with the required{" "}
        <span className="text-blue-400 font-semibold">5 Clinical Parameters</span> for a comprehensive late fusion analysis.
      </motion.p>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-gray-900/80 border border-blue-700 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
            Image Input
          </h2>

          <label className="cursor-pointer border-2 border-dashed border-blue-500 rounded-2xl p-8 w-full flex flex-col items-center justify-center bg-gray-900/60 hover:border-cyan-400 transition mb-6">
            <Upload className="w-12 h-12 text-blue-400 mb-4" />
            <p className="text-gray-300 text-center mb-2">
              Drag & Drop or <span className="text-blue-400">Browse</span>
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            <div className="flex flex-col items-center">
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-2xl border border-gray-700 shadow-lg"
              />
              <p className="mt-4 text-sm text-gray-400 truncate max-w-[200px]">{file?.name}</p>
            </div>
          )}
        </motion.div>

        {/* Text Parameters Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-gray-900/80 border border-cyan-700 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-cyan-300">
            Clinical Parameters
          </h2>

          <form className="flex flex-col space-y-4" id="fusion-form" onSubmit={handleSubmit}>
            {[
              { id: 'age', label: 'Age' },
              { id: 'bp', label: 'Blood Pressure (BP)' },
              { id: 'creatinine', label: 'Creatinine' },
              { id: 'egfr', label: 'eGFR' },
              { id: 'urea', label: 'Urea' }
            ].map((field) => (
              <div key={field.id} className="flex flex-col">
                <label className="text-gray-300 mb-1 text-sm font-semibold">{field.label}</label>
                <input
                  type="text"
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleInputChange}
                  placeholder={`Enter value for ${field.label}`}
                  className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  required
                />
              </div>
            ))}
          </form>
        </motion.div>

      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        form="fusion-form"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
        className="mt-12 px-12 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg font-bold rounded-2xl shadow-lg transition-all duration-300 w-full max-w-md disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" /> Processing...
          </>
        ) : (
          "Execute Late Fusion"
        )}
      </motion.button>

      {/* Results Section */}
      {resultData && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 w-full max-w-4xl bg-gray-900 border border-cyan-500 rounded-2xl p-8 shadow-2xl flex flex-col items-center"
        >
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-300 mb-6 flex items-center gap-3">
            <Activity className="w-8 h-8 text-cyan-400" /> Late Fusion Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-lg mb-2">Predicted Classification</p>
              <p className="text-4xl font-black text-white uppercase tracking-wider text-center">
                {resultData.classification}
              </p>
            </div>

            <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-lg mb-4">Grad-CAM Visualization</p>
              <img
                src={`data:image/png;base64,${resultData.gradcam}`}
                alt="Grad-CAM"
                className="w-full h-auto max-w-[250px] object-cover rounded-xl border-2 border-cyan-500/50 shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
