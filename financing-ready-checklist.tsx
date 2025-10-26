import React, { useState } from 'react';
import { CheckSquare, Square, DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export default function FinancingChecklist() {
  const [checkedItems, setCheckedItems] = useState({});
  const [revenue, setRevenue] = useState('');
  const [avgProject, setAvgProject] = useState('');
  const [yearsInBusiness, setYearsInBusiness] = useState('');

  const requirements = [
    {
      category: "Web Presence",
      items: [
        { id: 'website', text: 'Professional website (not just Facebook page)', critical: true },
        { id: 'mobile', text: 'Mobile-responsive design', critical: true },
        { id: 'contact', text: 'Professional contact information displayed', critical: false },
        { id: 'services', text: 'Clear description of services offered', critical: false },
      ]
    },
    {
      category: "Trust Signals",
      items: [
        { id: 'reviews', text: 'Online reviews (Google, Yelp, or industry-specific)', critical: true },
        { id: 'licensing', text: 'Business license & contractor license (if required)', critical: true },
        { id: 'insurance', text: 'General liability insurance', critical: true },
        { id: 'portfolio', text: 'Photos of completed projects', critical: false },
      ]
    },
    {
      category: "Business Credentials",
      items: [
        { id: 'years', text: '1-3+ years in business (varies by lender)', critical: true },
        { id: 'ein', text: 'Federal EIN (Employer Identification Number)', critical: true },
        { id: 'revenue', text: 'Minimum annual revenue ($50K-$250K varies by lender)', critical: true },
        { id: 'bank', text: 'Business bank account', critical: true },
      ]
    },
    {
      category: "Business Credit Profile",
      items: [
        { id: 'duns', text: 'DUNS number (Dun & Bradstreet)', critical: false },
        { id: 'tradelines', text: 'Trade credit accounts with suppliers', critical: false },
        { id: 'paydex', text: 'Paydex score or business credit score', critical: false },
        { id: 'payment', text: 'Consistent payment history with vendors', critical: true },
      ]
    },
  ];

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalItems = requirements.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const criticalItems = requirements.flatMap(cat => cat.items.filter(item => item.critical));
  const criticalChecked = criticalItems.filter(item => checkedItems[item.id]).length;
  const completionPercent = Math.round((checkedCount / totalItems) * 100);

  const calculateROI = () => {
    if (!revenue || !avgProject) return null;
    const annualRevenue = parseFloat(revenue);
    const avgProjectSize = parseFloat(avgProject);
    
    // Industry data: 30-40% more jobs, 20-30% larger projects
    const additionalJobs = 0.35; // 35% more jobs
    const largerProjects = 0.25; // 25% larger projects
    
    const currentJobCount = annualRevenue / avgProjectSize;
    const newJobCount = currentJobCount * (1 + additionalJobs);
    const newAvgProject = avgProjectSize * (1 + largerProjects);
    const newRevenue = newJobCount * newAvgProject;
    const additionalRevenue = newRevenue - annualRevenue;
    
    return {
      current: annualRevenue,
      projected: newRevenue,
      increase: additionalRevenue,
      percentIncrease: ((additionalRevenue / annualRevenue) * 100).toFixed(0)
    };
  };

  const roi = calculateROI();

  const getTimelineEstimate = () => {
    const gaps = totalItems - checkedCount;
    if (gaps === 0) return "You may qualify now!";
    if (gaps <= 2) return "2-4 weeks";
    if (gaps <= 4) return "4-8 weeks";
    if (gaps <= 6) return "8-12 weeks";
    return "3-4 months";
  };

  const getPriorityRoadmap = () => {
    const unchecked = requirements.flatMap(cat => 
      cat.items.filter(item => !checkedItems[item.id])
    );
    const critical = unchecked.filter(item => item.critical);
    const nonCritical = unchecked.filter(item => !item.critical);
    
    return { critical, nonCritical };
  };

  const roadmap = getPriorityRoadmap();

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-sans">
      {/* Cover Page */}
      <div className="mb-12 border-b-4 border-blue-600 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            The Financing-Ready Contractor Checklist
          </h1>
          <p className="text-xl text-gray-600">
            Assess Your Qualification Status in 10 Minutes
          </p>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
          <h2 className="font-bold text-lg mb-2 text-gray-900">Why This Matters</h2>
          <p className="text-gray-700 mb-3">
            Contractors who offer customer financing close <strong>30-40% more jobs</strong> and increase average project size by <strong>20-30%</strong>. But most financing companies have specific requirements you must meet.
          </p>
          <p className="text-gray-700">
            Use this checklist to identify exactly where you stand and what you need to do to qualify.
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Progress</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-semibold">Overall Completion</span>
              <span className="font-semibold">{checkedCount} of {totalItems}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {completionPercent}%
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded border-l-4 border-red-500">
            <div className="text-sm text-gray-600 mb-1">Critical Items</div>
            <div className="text-2xl font-bold text-gray-900">
              {criticalChecked} / {criticalItems.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-1">Estimated Timeline</div>
            <div className="text-2xl font-bold text-gray-900">
              {getTimelineEstimate()}
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          <CheckSquare className="text-blue-600" />
          Lender Requirements Self-Assessment
        </h2>
        <p className="text-gray-600 mb-6">
          Check off each item you currently have. Items marked with 🔴 are considered critical by most financing companies.
        </p>

        {requirements.map((category, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-gray-800 bg-gray-100 p-3 rounded">
              {category.category}
            </h3>
            <div className="space-y-2 ml-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => toggleItem(item.id)}
                >
                  {checkedItems[item.id] ? (
                    <CheckSquare className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  ) : (
                    <Square className="text-gray-400 flex-shrink-0 mt-1" size={20} />
                  )}
                  <span className={`flex-1 ${checkedItems[item.id] ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {item.text}
                    {item.critical && <span className="ml-2 text-red-600 font-bold">🔴 CRITICAL</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Gap Analysis */}
      {roadmap.critical.length > 0 || roadmap.nonCritical.length > 0 ? (
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-500 p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            <AlertCircle className="text-yellow-600" />
            Your Gap Analysis
          </h2>
          
          {roadmap.critical.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-lg text-red-600 mb-2">🚨 Critical Gaps (Fix These First)</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {roadmap.critical.map((item, idx) => (
                  <li key={idx} className="text-gray-800">{item.text}</li>
                ))}
              </ul>
            </div>
          )}
          
          {roadmap.nonCritical.length > 0 && (
            <div>
              <h3 className="font-bold text-lg text-gray-700 mb-2">Additional Improvements</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {roadmap.nonCritical.map((item, idx) => (
                  <li key={idx} className="text-gray-700">{item.text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-6">
          <h2 className="text-2xl font-bold mb-2 text-green-800">✅ You're Financing-Ready!</h2>
          <p className="text-gray-700">
            Based on this self-assessment, you meet the basic requirements most financing companies look for. Your next step is to apply to financing partners.
          </p>
        </div>
      )}

      {/* Priority Roadmap */}
      <div className="mb-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <Calendar className="text-blue-600" />
          Your Priority Roadmap
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border-l-4 border-red-500">
            <h3 className="font-bold mb-2 text-gray-900">PHASE 1: Critical Requirements (Weeks 1-2)</h3>
            <p className="text-sm text-gray-600 mb-2">Without these, you won't qualify. Focus here first.</p>
            <ul className="text-sm space-y-1 ml-4">
              <li>✓ Professional website with mobile responsiveness</li>
              <li>✓ Business licensing and insurance documentation</li>
              <li>✓ Minimum business history and revenue verification</li>
              <li>✓ Online reviews and social proof</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
            <h3 className="font-bold mb-2 text-gray-900">PHASE 2: Trust Signals (Weeks 3-4)</h3>
            <p className="text-sm text-gray-600 mb-2">These improve approval odds and terms.</p>
            <ul className="text-sm space-y-1 ml-4">
              <li>✓ Project portfolio with before/after photos</li>
              <li>✓ Professional branding and contact information</li>
              <li>✓ Business credit profile (DUNS, trade lines)</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded border-l-4 border-green-500">
            <h3 className="font-bold mb-2 text-gray-900">PHASE 3: Apply & Integrate (Week 5+)</h3>
            <p className="text-sm text-gray-600 mb-2">Submit applications and add financing to your website.</p>
            <ul className="text-sm space-y-1 ml-4">
              <li>✓ Research and apply to 2-3 financing partners</li>
              <li>✓ Integrate financing widgets on your website</li>
              <li>✓ Train your sales team on offering financing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="mb-8 bg-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <TrendingUp className="text-green-600" />
          What's It Worth? ROI Calculator
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Current Annual Revenue
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="250000"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Average Project Size
            </label>
            <input
              type="number"
              value={avgProject}
              onChange={(e) => setAvgProject(e.target.value)}
              placeholder="5000"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
        </div>

        {roi && (
          <div className="bg-white p-6 rounded-lg border-2 border-green-500">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Your Projected Results</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Current Revenue</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${roi.current.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">With Financing</div>
                <div className="text-2xl font-bold text-green-600">
                  ${roi.projected.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Additional Revenue</div>
                <div className="text-2xl font-bold text-green-700">
                  +${roi.increase.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 font-semibold">
                  ({roi.percentIncrease}% increase)
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              Based on industry data: 35% more jobs closed, 25% larger average project size
            </p>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="mb-8 border-t-2 border-gray-200 pt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">What's Next?</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Need Help Getting Financing-Ready?</h3>
            <p className="mb-4">
              VetMG Media specializes in helping contractors meet lender requirements. We build professional websites you own outright—no monthly fees, no lock-in.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">📞 Call/Text:</span>
                <span>(502) 240-9897</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">🌐 Website:</span>
                <span>vetmgmedia.com</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-3 text-gray-900">DIY Resources</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span>📋</span>
                <span><strong>Business Credit:</strong> Get your free DUNS number at dnb.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⭐</span>
                <span><strong>Reviews:</strong> Set up Google Business Profile and ask recent customers</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📄</span>
                <span><strong>Documentation:</strong> Gather licenses, insurance certificates, and tax returns</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-6">
        <p className="mb-2">
          <strong>VetMG Media LLC</strong> | Veteran-Owned | Contractor-Focused
        </p>
        <p>
          © 2025 VetMG Media LLC | This checklist is for informational purposes only. 
          Financing approval is subject to lender requirements and discretion.
        </p>
      </div>
    </div>
  );
}