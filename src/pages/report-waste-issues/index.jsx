import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
// Removed framer-motion to eliminate page transition animations
import Header from '../../components/ui/Header';
import ReportForm from './components/ReportForm';
import RecentReports from './components/RecentReports';
import QuickStats from './components/QuickStats';
import EmergencyContact from './components/EmergencyContact';
import Icon from '../../components/AppIcon';

const initialReports = [
  {
    id: 'RPT-2025-001',
    issueType: 'uncollected',
    title: 'Uncollected Trash',
    location: '123 Oak Street, Downtown',
    description: 'Garbage bins have not been collected for over a week. Strong odor and attracting pests.',
    status: 'in_progress',
    priority: 'high',
    submittedDate: '2025-01-05',
    lastUpdate: '2025-01-06',
    photos: 2,
    assignedTo: 'Waste Management Team A'
  },
  {
    id: 'RPT-2025-002',
    issueType: 'illegal_dumping',
    title: 'Illegal Dumping',
    location: 'Behind City Mall, Parking Lot C',
    description: 'Large furniture items and construction debris dumped illegally. Blocking pedestrian access.',
    status: 'resolved',
    priority: 'medium',
    submittedDate: '2025-01-03',
    lastUpdate: '2025-01-04',
    photos: 3,
    assignedTo: 'Environmental Enforcement'
  },
  {
    id: 'RPT-2025-003',
    issueType: 'damaged_bins',
    title: 'Damaged Bins',
    location: 'Pine Avenue & 5th Street',
    description: 'Recycling bin has a large crack and lid is missing. Contents spilling onto sidewalk.',
    status: 'submitted',
    priority: 'low',
    submittedDate: '2025-01-08',
    lastUpdate: '2025-01-08',
    photos: 1,
    assignedTo: 'Pending Assignment'
  },
  {
    id: 'RPT-2025-004',
    issueType: 'uncollected',
    title: 'Uncollected Trash',
    location: '456 Elm Street, Residential Area',
    description: 'Missed collection on scheduled pickup day. Multiple households affected in the block.',
    status: 'in_progress',
    priority: 'medium',
    submittedDate: '2025-01-07',
    lastUpdate: '2025-01-08',
    photos: 0,
    assignedTo: 'Route Supervisor'
  },
  {
    id: 'RPT-2025-005',
    issueType: 'illegal_dumping',
    title: 'Illegal Dumping',
    location: 'Green Park Trail, Mile Marker 2',
    description: 'Electronic waste and old appliances dumped in natural area. Environmental concern.',
    status: 'resolved',
    priority: 'high',
    submittedDate: '2025-01-02',
    lastUpdate: '2025-01-03',
    photos: 4,
    assignedTo: 'Park Services'
  }
];

const ReportWasteIssues = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [lastSubmittedReport, setLastSubmittedReport] = useState(null);

  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem('greentrack_reports');
    return savedReports ? JSON.parse(savedReports) : initialReports;
  });

  useEffect(() => {
    localStorage.setItem('greentrack_reports', JSON.stringify(reports));
  }, [reports]);

  const handleReportSubmit = (reportData) => {
    const priorityMap = {
      uncollected: 'medium',
      illegal_dumping: 'high',
      damaged_bins: 'low'
    };
    const priority = priorityMap[reportData.issueType] || 'medium';

    const newReport = {
      id: `RPT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...reportData,
      priority: priority,
      status: 'submitted',
      submittedDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    setLastSubmittedReport(newReport);
    setShowSuccessMessage(true);

    // **MODIFICATION START**
    // This new logic ensures the list is always capped at 5 items.
    setReports(prevReports => {
      const updatedReports = [newReport, ...prevReports];
      return updatedReports.slice(0, 5);
    });
    // **MODIFICATION END**

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Helmet>
        <title>Report Waste Issues - GreenTrack Citizen Dashboard</title>
        <meta name="description" content="Report uncollected trash, illegal dumping, and damaged bins to help keep your community clean and sustainable." />
        <meta name="keywords" content="waste reporting, environmental issues, community cleanup, municipal services" />
      </Helmet>
      <Header />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-20 lg:pb-8 mobile-safe-area animate-fade-in">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <div 
              className="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center mx-auto sm:mx-0 shadow-mobile-card animate-scale-in"
            >
              <Icon name="AlertTriangle" size={24} className="text-red-600" />
            </div>
            <div className="text-center sm:text-left">
              <h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
              >
                 Report Waste Issues
              </h1>
              <p 
                className="text-gray-600 text-sm sm:text-base mt-1 leading-relaxed"
              >
                Help us maintain a clean and sustainable community by reporting waste management issues
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav 
            className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-gray-600"
          >
            <span>Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-gray-900 font-medium">Report Issues</span>
          </nav>
        </div>

        {/* Success Message */}
        {showSuccessMessage && lastSubmittedReport && (
          <div 
            className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-2xl p-4 shadow-mobile-card animate-slide-up"
          >
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-green-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-green-800">✅ Report Submitted Successfully!</h3>
                <p className="text-green-700 text-sm mt-1">
                  Your report (ID: {lastSubmittedReport?.id}) has been submitted and will be reviewed by our team. 
                  You'll receive updates on the progress via notifications.
                </p>
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs text-green-600">
                  <span>• Expected response time: 1-3 business days</span>
                  <span>• You'll earn 10 community points for this report</span>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-600 hover:text-green-800 transition-colors p-1 rounded-lg hover:bg-green-100 active:scale-95"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="animate-slide-up">
          <QuickStats />
        </div>

        <div 
          className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6 lg:space-y-8 animate-slide-up">
            {/* Report Form */}
            <div>
              <ReportForm onSubmit={handleReportSubmit} />
            </div>

            {/* Recent Reports */}
            <div className="animate-slide-up">
              <RecentReports reports={reports} />
            </div>
          </div>

          {/* Sidebar */}
          <div 
            className="space-y-6 animate-slide-up"
          >
            {/* Emergency Contact */}
            <div>
              <EmergencyContact />
            </div>

            {/* Reporting Guidelines */}
            <div 
              className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-gray-200/60 rounded-2xl p-6 shadow-mobile-card hover:shadow-elevation-2 transition-standard"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shadow-inner-glow">
                  <Icon name="BookOpen" size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">📋 Reporting Guidelines</h3>
                  <p className="text-sm text-gray-600">Best practices for effective reporting</p>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div 
                  className="flex items-start space-x-3"
                >
                  <Icon name="Camera" size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Include Photos</p>
                    <p className="text-gray-600">Clear images help our team understand and prioritize issues</p>
                  </div>
                </div>
                <div 
                  className="flex items-start space-x-3"
                >
                  <Icon name="MapPin" size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Precise Location</p>
                    <p className="text-gray-600">Provide exact addresses or use GPS coordinates</p>
                  </div>
                </div>
                <div 
                  className="flex items-start space-x-3"
                >
                  <Icon name="FileText" size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Detailed Description</p>
                    <p className="text-gray-600">Include relevant details like size, duration, and impact</p>
                  </div>
                </div>
                <div 
                  className="flex items-start space-x-3"
                >
                  <Icon name="Clock" size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Report Promptly</p>
                    <p className="text-gray-600">Early reporting helps prevent issues from escalating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div 
              className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border border-gray-200/60 rounded-2xl p-6 shadow-mobile-card hover:shadow-elevation-2 transition-standard"
            >
              <div className="text-center">
                <div 
                  className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner-glow animate-float"
                >
                  <Icon name="Users" size={24} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">🌍 Community Impact</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your reports help maintain a cleaner, healthier environment for everyone
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">1,247</div>
                    <div className="text-xs text-gray-600">Issues Resolved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <div className="text-xs text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportWasteIssues;