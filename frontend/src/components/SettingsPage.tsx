import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import api from '../services/api';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [enabled, setEnabled] = useState(true);
  const [tone, setTone] = useState('professional');
  const [customPrompt, setCustomPrompt] = useState(
    'You are a senior support strategist at AfterSell AI. Your goal is to provide high-level assistance that feels human and expert. Always prioritize clarity over jargon. If you cannot solve a problem immediately, acknowledge the complexity and provide a realistic timeline for escalation.'
  );
  const [delay, setDelay] = useState(45);
  const [loading, setLoading] = useState(false);

  // Load settings on page mount
  useEffect(() => {
      const fetchSettings = async () => {
          try {
              const res = await api.get('/settings');
              const data = res.data;
              if (data) {
                  setEnabled(data.enabled || false);
                  setTone(data.tone || 'professional');
                  setCustomPrompt(data.custom_prompt || '');
                  setDelay(data.delay_seconds || 45);
              }
          } catch (err) {
              console.error('Failed to load settings:', err);
          }
      };
      fetchSettings();
  }, []);


  const handleSave = async () => {
      setLoading(true);
      try {
          await api.put('/settings', {
              tone,
              custom_prompt: customPrompt,
              delay_seconds: delay,
              enabled
          });
          alert('Settings saved!');
      } catch (err) {
          console.error('Failed to save settings:', err);
          alert('Failed to save settings.');
      } finally {
          setLoading(false);
      }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-white text-xl font-semibold">System Settings</h2>
        <p className="text-gray-400 text-sm mt-1">
          Configure your AI agent's behavior and automated responses.
        </p>
      </div>

      <div className="bg-[#0F1623] rounded-xl border border-[#1F2937] p-6 space-y-6">
        {/* AI Follow-Up Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">AI Follow-Up</h3>
            <p className="text-gray-400 text-sm">
              Automatically respond to unresolved queries after the primary delay.
            </p>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              enabled ? 'bg-[#F97316]' : 'bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Voice Tone */}
        <div>
          <label className="text-white font-medium block mb-2">Voice Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-[#1A2236] border border-[#1F2937] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97316]"
          >
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
          </select>
        </div>

        {/* Custom System Prompt */}
        <div>
          <label className="text-white font-medium block mb-2">
            Custom System Prompt
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={5}
            className="w-full bg-[#1A2236] border border-[#1F2937] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97316] resize-none"
          />
          <p className="text-gray-500 text-xs mt-1">
            The prompt influences response structure and decision-making logic.
          </p>
        </div>

        {/* Response Delay */}
        <div>
          <label className="text-white font-medium block mb-2">
            Response Delay (Seconds)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="120"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="flex-1"
            />
            <span className="bg-[#1A2236] border border-[#1F2937] text-white rounded-lg px-3 py-1 text-sm w-16 text-center">
              {delay}
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-[#1F2937]">
          <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#E0620F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              {loading ? 'Saving...' : <><Save size={16} /> Save Changes</>}
          </button>
        </div>

        {/* Version History */}
        <div className="text-gray-500 text-xs space-y-1">
          <p>All prompt data is encrypted and SOC2 compliant.</p>
          <p>Last updated 2 hours ago by Admin.</p>
        </div>
      </div>
    </motion.div>
  );
}