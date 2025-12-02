import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Heart, AlertCircle, CheckCircle, Stethoscope,
    Thermometer, Droplet, Wind, Zap, Moon, Sun, Info,
    User, ArrowRight
} from 'lucide-react';

// Tooltip component
const Tooltip = ({ text }) => (
    <div className="group relative inline-block ml-1.5">
        <Info className="w-3.5 h-3.5 text-gray-400/70 hover:text-rose-500 transition-colors cursor-help" />
        <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/10 translate-y-1 group-hover:translate-y-0">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95"></div>
        </div>
    </div>
);

// Premium Input Field
const InputField = ({ label, name, type = "number", value, onChange, options = null, step = "any", icon: Icon, tooltip }) => (
    <div className="flex flex-col space-y-1.5 group">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center truncate transition-colors duration-200 group-focus-within:text-rose-500">
            {Icon && <Icon className="w-3.5 h-3.5 mr-2 text-rose-500/60 group-hover:text-rose-500 group-focus-within:text-rose-500 transition-colors" />}
            {label}
            {tooltip && <Tooltip text={tooltip} />}
        </label>
        <div className="relative">
            {options ? (
                <div className="relative">
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="w-full bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 text-gray-900 dark:text-gray-100 text-sm rounded-xl p-2.5 pl-3 pr-8 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/50 transition-all duration-200 outline-none appearance-none cursor-pointer hover:bg-white dark:hover:bg-gray-800/60 hover:border-rose-200 dark:hover:border-rose-500/30 font-medium"
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value} className="dark:bg-gray-900">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    step={step}
                    className="w-full bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 text-gray-900 dark:text-gray-100 text-sm rounded-xl p-2.5 pl-3 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/50 transition-all duration-200 outline-none hover:bg-white dark:hover:bg-gray-800/60 hover:border-rose-200 dark:hover:border-rose-500/30 placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                    required
                />
            )}
        </div>
    </div>
);

// Enhanced Human Body Visual
const HumanBodyVisual = ({ riskLevel }) => (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
        {/* Abstract Body Outline - More detailed/artistic */}
        <svg viewBox="0 0 200 350" className="h-full w-auto opacity-10 dark:opacity-20 text-rose-950 dark:text-rose-100 fill-current drop-shadow-2xl">
            <path d="M100,10 C135,10 160,35 160,70 C160,95 145,110 135,120 L135,300 C135,310 125,320 115,320 L85,320 C75,320 65,310 65,300 L65,120 C55,110 40,95 40,70 C40,35 65,10 100,10 Z" />
            {/* Ribcage hint */}
            <path d="M70,130 Q100,150 130,130" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M70,150 Q100,170 130,150" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M75,170 Q100,190 125,170" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>

        {/* Glowing Heart Container */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: riskLevel === 'High' ? 0.35 : 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative flex items-center justify-center"
            >
                {/* Main Heart */}
                <Heart
                    className={`w-36 h-36 ${riskLevel === 'High'
                        ? 'text-rose-600 drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]'
                        : riskLevel === 'Low'
                            ? 'text-emerald-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                            : 'text-gray-200 dark:text-gray-800 drop-shadow-lg'
                        } fill-current transition-all duration-700`}
                    strokeWidth={1.5}
                />

                {/* Inner Detail */}
                <Activity className={`absolute w-12 h-12 ${riskLevel === 'High' ? 'text-rose-200' : riskLevel === 'Low' ? 'text-emerald-100' : 'text-gray-400 dark:text-gray-600'
                    } opacity-80`} />

                {/* Pulse Rings */}
                {(riskLevel === 'High' || riskLevel === 'Low') && (
                    <>
                        <motion.div
                            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`absolute inset-0 rounded-full ${riskLevel === 'High' ? 'bg-rose-500' : 'bg-emerald-500'
                                } blur-2xl -z-10`}
                        />
                        <motion.div
                            animate={{ scale: [1, 2.2], opacity: [0.2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            className={`absolute inset-0 rounded-full ${riskLevel === 'High' ? 'bg-rose-500' : 'bg-emerald-500'
                                } blur-3xl -z-20`}
                        />
                    </>
                )}
            </motion.div>
        </div>
    </div>
);

function App() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const [formData, setFormData] = useState({
        age: '', sex: '1', cp: '1', trestbps: '', chol: '', fbs: '0',
        restecg: '0', thalach: '', exang: '0', oldpeak: '', slope: '1', ca: '0', thal: '3'
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const payload = Object.fromEntries(
                Object.entries(formData).map(([k, v]) => [k, parseFloat(v)])
            );
            const apiUrl = import.meta.env.VITE_API_URL || 'https://heart-disease-predictor-alqg.onrender.com';
            const response = await axios.post(`${apiUrl}/predict`, payload);
            setResult(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`h-screen w-full overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-[#050505] text-gray-100' : 'bg-gray-50 text-gray-900'} flex flex-col font-sans selection:bg-rose-500/30`}>

            {/* Navbar - Transparent & Floating */}
            <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4 group cursor-pointer select-none">
                        <div className="relative">
                            <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full animate-pulse"></div>
                            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 rounded-2xl shadow-lg shadow-rose-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 border border-white/20 ring-1 ring-white/20 backdrop-blur-md overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Heart className="w-6 h-6 text-white fill-white/20 drop-shadow-md" strokeWidth={2.5} />
                                <Activity className="absolute w-3 h-3 text-white/80 bottom-2.5 right-2.5 opacity-60" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-2xl font-bold tracking-tight font-['Outfit'] leading-none flex items-center gap-0.5">
                                <span className="text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors duration-300">Cardio</span>
                                <span className="text-rose-600 dark:text-rose-500 font-extrabold">Care</span>
                                <span className="text-rose-600 dark:text-rose-500 text-sm align-top transform -translate-y-1">.ai</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.25em] text-gray-900 dark:text-gray-400 uppercase mt-1 group-hover:text-rose-600 transition-colors duration-300">
                                Intelligent Diagnostics
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-3 rounded-full bg-white/5 dark:bg-white/5 backdrop-blur-md border border-gray-200/50 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-lg group"
                    >
                        {darkMode ? (
                            <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-90 transition-transform duration-500" />
                        ) : (
                            <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform duration-500" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 container mx-auto px-8 pt-28 pb-8 min-h-0 flex flex-col lg:flex-row gap-8">

                {/* Left Panel: Form */}
                <div className="lg:w-2/3 h-full flex flex-col">
                    <div className="bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 dark:shadow-black/60 border border-white/40 dark:border-white/5 h-full flex flex-col relative overflow-hidden group">

                        {/* Decorative Gradient Blob */}
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-rose-500/15 transition-colors duration-1000"></div>

                        <div className="flex items-center justify-between mb-6 flex-none relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white font-['Outfit']">
                                    <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-xl mr-3">
                                        <Stethoscope className="w-6 h-6 text-rose-500" />
                                    </div>
                                    Patient Data
                                </h2>
                            </div>
                            <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20">
                                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">Live Model v1.0</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 relative z-10">
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar -mr-2">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 pb-4">
                                    {/* Section: Personal */}
                                    <div className="col-span-2 md:col-span-4 pb-2 border-b border-gray-100 dark:border-white/5 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Vitals & Demographics</span>
                                    </div>
                                    <InputField label="Age" name="age" value={formData.age} onChange={handleChange} icon={User} />
                                    <InputField label="Sex" name="sex" value={formData.sex} onChange={handleChange} icon={User} options={[{ value: '1', label: 'Male' }, { value: '0', label: 'Female' }]} />
                                    <InputField label="Resting BP" name="trestbps" value={formData.trestbps} onChange={handleChange} icon={Wind} tooltip="mm Hg" />
                                    <InputField label="Cholesterol" name="chol" value={formData.chol} onChange={handleChange} icon={Droplet} tooltip="mg/dl" />

                                    {/* Section: Cardiac */}
                                    <div className="col-span-2 md:col-span-4 pb-2 border-b border-gray-100 dark:border-white/5 mb-2 mt-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Cardiac Indicators</span>
                                    </div>
                                    <InputField label="Chest Pain" name="cp" value={formData.cp} onChange={handleChange} icon={Heart} options={[{ value: '1', label: 'Typical Angina' }, { value: '2', label: 'Atypical Angina' }, { value: '3', label: 'Non-anginal' }, { value: '4', label: 'Asymptomatic' }]} />
                                    <InputField label="Max Heart Rate" name="thalach" value={formData.thalach} onChange={handleChange} icon={Heart} />
                                    <InputField label="Resting ECG" name="restecg" value={formData.restecg} onChange={handleChange} icon={Activity} options={[{ value: '0', label: 'Normal' }, { value: '1', label: 'ST-T Abnormality' }, { value: '2', label: 'LV Hypertrophy' }]} />
                                    <InputField label="Fasting BS > 120" name="fbs" value={formData.fbs} onChange={handleChange} icon={Thermometer} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />

                                    {/* Section: Exercise */}
                                    <div className="col-span-2 md:col-span-4 pb-2 border-b border-gray-100 dark:border-white/5 mb-2 mt-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Stress Test Metrics</span>
                                    </div>
                                    <InputField label="Exer. Angina" name="exang" value={formData.exang} onChange={handleChange} icon={Zap} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
                                    <InputField label="Oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleChange} icon={Activity} tooltip="ST Depression" />
                                    <InputField label="Slope" name="slope" value={formData.slope} onChange={handleChange} icon={Activity} options={[{ value: '1', label: 'Upsloping' }, { value: '2', label: 'Flat' }, { value: '3', label: 'Downsloping' }]} />
                                    <InputField label="Major Vessels" name="ca" value={formData.ca} onChange={handleChange} icon={Activity} options={[{ value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }]} />

                                    <div className="col-span-2 md:col-span-4 mt-2">
                                        <InputField label="Thalassemia" name="thal" value={formData.thal} onChange={handleChange} icon={Activity} options={[{ value: '3', label: 'Normal' }, { value: '6', label: 'Fixed Defect' }, { value: '7', label: 'Reversable Defect' }]} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 mt-auto border-t border-gray-100 dark:border-white/5 flex-none">
                                <motion.button
                                    whileHover={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgba(225, 29, 72, 0.2)" }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-base tracking-wide font-['Outfit']"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Activity className="w-5 h-5" />
                                            <span>Analyze Risk Profile</span>
                                            <ArrowRight className="w-5 h-5 opacity-80" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Panel: Visuals & Results */}
                <div className="lg:w-1/3 h-full flex flex-col space-y-6">
                    {/* Visual Container */}
                    <div className="flex-1 bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 dark:shadow-black/60 border border-white/40 dark:border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

                        <HumanBodyVisual riskLevel={result?.risk_level} />

                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center z-10 mt-6 w-full"
                                >
                                    <div className={`inline-block px-6 py-2.5 rounded-full border ${result.risk_level === 'High'
                                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                        } mb-6`}>
                                        <span className="font-bold tracking-wider uppercase text-sm font-['Outfit']">
                                            {result.risk_level === 'High' ? 'High Risk Detected' : 'Low Risk Detected'}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center mb-2">
                                        <div className="flex items-baseline">
                                            <span className="text-6xl font-bold text-gray-900 dark:text-white font-['Outfit'] tracking-tighter">
                                                {(result.probability * 100).toFixed(0)}
                                            </span>
                                            <span className="text-2xl text-gray-400 dark:text-gray-500 ml-1 font-medium">%</span>
                                        </div>
                                        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium tracking-wide uppercase mt-2">Probability</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center z-10 mt-6"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-['Outfit']">Ready to Analyze</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[220px] mx-auto leading-relaxed">
                                        Awaiting clinical parameters to generate real-time health assessment.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Stats / Info */}
                    <div className="h-24 bg-white/60 dark:bg-[#0f0f0f]/60 backdrop-blur-xl rounded-[2rem] p-6 border border-white/20 dark:border-white/5 flex items-center justify-between px-10 shadow-xl shadow-gray-200/20 dark:shadow-black/20">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white font-['Outfit']">0.95</div>
                            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-1">ROC AUC</div>
                        </div>
                        <div className="w-px h-10 bg-gray-200 dark:bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white font-['Outfit']">86%</div>
                            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-1">Accuracy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
