import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Report Waste Issues - GreenTrack Citizen Dashboard</title>
        <meta name="description" content="Report uncollected trash, illegal dumping, and damaged bins to help keep your community clean and sustainable." />
        <meta name="keywords" content="waste reporting, environmental issues, community cleanup, municipal services" />
      </Helmet>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Report Waste Issues</h1>
              <p className="text-muted-foreground mt-1">
                Help us maintain a clean and sustainable community by reporting waste management issues
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Report Issues</span>
          </nav>
        </div>

        {/* Success Message */}
        {showSuccessMessage && lastSubmittedReport && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-green-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">Report Submitted Successfully!</h3>
                <p className="text-green-700 text-sm mt-1">
                  Your report (ID: {lastSubmittedReport?.id}) has been submitted and will be reviewed by our team. 
                  You'll receive updates on the progress via notifications.
                </p>
                <div className="mt-3 flex items-center space-x-4 text-xs text-green-600">
                  <span>• Expected response time: 1-3 business days</span>
                  <span>• You'll earn 10 community points for this report</span>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <QuickStats />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Report Form */}
            <ReportForm onSubmit={handleReportSubmit} />

            {/* Recent Reports */}
            <RecentReports reports={reports} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <EmergencyContact />

            {/* Reporting Guidelines */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Reporting Guidelines</h3>
                  <p className="text-sm text-muted-foreground">Best practices for effective reporting</p>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <Icon name="Camera" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Include Photos</p>
                    <p className="text-muted-foreground">Clear images help our team understand and prioritize issues</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Precise Location</p>
                    <p className="text-muted-foreground">Provide exact addresses or use GPS coordinates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="FileText" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Detailed Description</p>
                    <p className="text-muted-foreground">Include relevant details like size, duration, and impact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Clock" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Report Promptly</p>
                    <p className="text-muted-foreground">Early reporting helps prevent issues from escalating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community Impact</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your reports help maintain a cleaner, healthier environment for everyone
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">1,247</div>
                    <div className="text-xs text-muted-foreground">Issues Resolved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">89%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
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