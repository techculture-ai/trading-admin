'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, User, FileText, Building, CheckCircle, AlertTriangle, TrendingUp, MapPin, Camera, Briefcase, Users, Truck, Clock, BarChart3 } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface SiteProgressDetails {
  id: string
  projectId: string
  projectName: string
  location: string
  plannedProgress: string
  actualProgress: string
  variance: string
  lastUpdated: string
  supervisor: string
  status: 'On Track' | 'Ahead of Schedule' | 'Behind Schedule' | 'Critical'
  photos: number
  workforce: number
  equipment: string
  remarks: string
  issues: string[]
  projectDetails: {
    contractor: string
    projectHead: string
    startDate: string
    endDate: string
    contractValue: string
    estimatedCost: string
  }
  workCompleted: {
    category: string
    planned: string
    actual: string
    status: string
  }[]
  resources: {
    type: string
    deployed: string
    utilized: string
    efficiency: string
  }[]
  timeline: {
    date: string
    milestone: string
    planned: string
    actual: string
    status: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

interface Photo {
  id: string
  url: string
  caption: string
  uploadedBy: string
  uploadedAt: string
}

export default function SiteProgressDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  
  // Mock data - in real app, fetch based on params.id
  const [siteProgress] = useState<SiteProgressDetails>({
    id: 'SP-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    location: 'Gomti Nagar, Lucknow',
    plannedProgress: '70%',
    actualProgress: '65%',
    variance: '-5%',
    lastUpdated: '2 hours ago',
    supervisor: 'Rajesh Sharma',
    status: 'On Track',
    photos: 12,
    workforce: 45,
    equipment: '2 Cranes, 3 Mixers, 1 Excavator',
    remarks: 'Work is progressing as per schedule. Minor delay due to material shortage has been addressed. Quality of work is satisfactory.',
    issues: ['Cement delivery delayed by 2 days', 'Temporary power outage affected work for 4 hours'],
    projectDetails: {
      contractor: 'ABC Builders Ltd.',
      projectHead: 'Er. Suresh Chandra',
      startDate: '2024-02-01',
      endDate: '2025-12-31',
      contractValue: '₹42,00,00,000',
      estimatedCost: '₹45,00,00,000',
    },
    workCompleted: [
      {
        category: 'Foundation Work',
        planned: '100%',
        actual: '100%',
        status: 'Completed',
      },
      {
        category: 'Superstructure (Ground to 3rd Floor)',
        planned: '90%',
        actual: '85%',
        status: 'In Progress',
      },
      {
        category: 'Brick Work',
        planned: '60%',
        actual: '55%',
        status: 'In Progress',
      },
      {
        category: 'Plumbing & Electrical',
        planned: '40%',
        actual: '35%',
        status: 'In Progress',
      },
      {
        category: 'Plastering & Finishing',
        planned: '20%',
        actual: '15%',
        status: 'In Progress',
      },
    ],
    resources: [
      {
        type: 'Skilled Labor',
        deployed: '30',
        utilized: '28',
        efficiency: '93%',
      },
      {
        type: 'Unskilled Labor',
        deployed: '15',
        utilized: '14',
        efficiency: '93%',
      },
      {
        type: 'Tower Cranes',
        deployed: '2',
        utilized: '2',
        efficiency: '100%',
      },
      {
        type: 'Concrete Mixers',
        deployed: '3',
        utilized: '3',
        efficiency: '100%',
      },
      {
        type: 'Excavators',
        deployed: '1',
        utilized: '1',
        efficiency: '100%',
      },
    ],
    timeline: [
      {
        date: '2024-05-31',
        milestone: 'Foundation Complete',
        planned: '100%',
        actual: '100%',
        status: 'Completed',
      },
      {
        date: '2024-09-30',
        milestone: 'Superstructure Complete',
        planned: '100%',
        actual: '95%',
        status: 'Near Completion',
      },
      {
        date: '2025-03-31',
        milestone: 'Finishing Works Complete',
        planned: '100%',
        actual: '25%',
        status: 'In Progress',
      },
      {
        date: '2025-12-31',
        milestone: 'Project Handover',
        planned: '100%',
        actual: '0%',
        status: 'Not Started',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-30 08:00:00',
      action: 'Progress Updated',
      performedBy: 'Rajesh Sharma',
      details: 'Site progress updated from 63% to 65%',
    },
    {
      id: 'AL-002',
      timestamp: '2024-10-29 16:30:00',
      action: 'Photos Uploaded',
      performedBy: 'Site Engineer',
      details: '5 new site photos uploaded',
    },
    {
      id: 'AL-003',
      timestamp: '2024-10-29 10:00:00',
      action: 'Issue Reported',
      performedBy: 'Rajesh Sharma',
      details: 'Cement delivery delay reported',
    },
    {
      id: 'AL-004',
      timestamp: '2024-10-28 14:00:00',
      action: 'Workforce Updated',
      performedBy: 'HR Department',
      details: 'Workforce count updated to 45 workers',
    },
    {
      id: 'AL-005',
      timestamp: '2024-10-27 09:00:00',
      action: 'Equipment Deployed',
      performedBy: 'Equipment Manager',
      details: 'Additional concrete mixer deployed to site',
    },
  ])

  const [photos] = useState<Photo[]>([
    {
      id: 'PH-001',
      url: '/placeholder-1.jpg',
      caption: 'Foundation work completed',
      uploadedBy: 'Site Engineer',
      uploadedAt: '2024-10-29',
    },
    {
      id: 'PH-002',
      url: '/placeholder-2.jpg',
      caption: 'Superstructure progress - Block A',
      uploadedBy: 'Site Engineer',
      uploadedAt: '2024-10-29',
    },
    {
      id: 'PH-003',
      url: '/placeholder-3.jpg',
      caption: 'Brick work in progress',
      uploadedBy: 'Supervisor',
      uploadedAt: '2024-10-28',
    },
    {
      id: 'PH-004',
      url: '/placeholder-4.jpg',
      caption: 'Equipment deployment',
      uploadedBy: 'Site Engineer',
      uploadedAt: '2024-10-28',
    },
  ])

  const handleExport = () => {
    const content = `
Site Progress Report
====================

Site ID: ${siteProgress.id}
Project: ${siteProgress.projectName}
Location: ${siteProgress.location}
Last Updated: ${siteProgress.lastUpdated}

Progress Summary
================
Planned Progress: ${siteProgress.plannedProgress}
Actual Progress: ${siteProgress.actualProgress}
Variance: ${siteProgress.variance}
Status: ${siteProgress.status}

Project Details
===============
Project ID: ${siteProgress.projectId}
Contractor: ${siteProgress.projectDetails.contractor}
Project Head: ${siteProgress.projectDetails.projectHead}
Contract Value: ${siteProgress.projectDetails.contractValue}
Start Date: ${new Date(siteProgress.projectDetails.startDate).toLocaleDateString('en-IN')}
End Date: ${new Date(siteProgress.projectDetails.endDate).toLocaleDateString('en-IN')}

Site Management
===============
Supervisor: ${siteProgress.supervisor}
Workforce: ${siteProgress.workforce} workers
Equipment: ${siteProgress.equipment}

Work Completed
==============
${siteProgress.workCompleted.map(w => `${w.category}: Planned ${w.planned}, Actual ${w.actual} - ${w.status}`).join('\n')}

Resources
=========
${siteProgress.resources.map(r => `${r.type}: Deployed ${r.deployed}, Utilized ${r.utilized} (${r.efficiency} efficiency)`).join('\n')}

Issues
======
${siteProgress.issues.length > 0 ? siteProgress.issues.join('\n') : 'No issues reported'}

Remarks
=======
${siteProgress.remarks}

Timeline
========
${siteProgress.timeline.map(t => `${new Date(t.date).toLocaleDateString('en-IN')} - ${t.milestone}: ${t.status}`).join('\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `site_progress_${siteProgress.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-700'
      case 'Ahead of Schedule':
        return 'bg-blue-100 text-blue-700'
      case 'Behind Schedule':
        return 'bg-orange-100 text-orange-700'
      case 'Critical':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'On Track':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Ahead of Schedule':
        return <TrendingUp size={40} className="text-blue-600" />
      case 'Behind Schedule':
      case 'Critical':
        return <AlertTriangle size={40} className="text-orange-600" />
      default:
        return <CheckCircle size={40} className="text-gray-600" />
    }
  }

  const getWorkStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Near Completion':
        return 'bg-yellow-100 text-yellow-700'
      case 'Not Started':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{siteProgress.projectName}</h1>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <MapPin size={14} className="mr-1" />
              {siteProgress.location} • {siteProgress.id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(siteProgress.status)}`}>
            {siteProgress.status}
          </span>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Progress Card */}
      <div className={`rounded-lg p-8 text-white ${
        siteProgress.variance.startsWith('-') ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${siteProgress.variance.startsWith('-') ? 'text-orange-100' : 'text-blue-100'}`}>
              Current Progress Status
            </p>
            <h2 className="text-4xl font-bold">{siteProgress.actualProgress}</h2>
            <p className={`text-sm mt-2 ${siteProgress.variance.startsWith('-') ? 'text-orange-100' : 'text-blue-100'}`}>
              Variance: {siteProgress.variance} • Last updated: {siteProgress.lastUpdated}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(siteProgress.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Planned Progress</p>
              <h3 className="text-3xl font-bold text-gray-900">{siteProgress.plannedProgress}</h3>
              <p className="text-xs text-gray-500 mt-2">Target completion</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 size={24} className="text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Actual Progress</p>
              <h3 className="text-3xl font-bold text-orange-600">{siteProgress.actualProgress}</h3>
              <p className="text-xs text-gray-500 mt-2">Current achievement</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Workforce</p>
              <h3 className="text-3xl font-bold text-blue-600">{siteProgress.workforce}</h3>
              <p className="text-xs text-gray-500 mt-2">Active workers</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Site Photos</p>
              <h3 className="text-3xl font-bold text-purple-600">{siteProgress.photos}</h3>
              <p className="text-xs text-gray-500 mt-2">Documented</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Camera size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Comparison */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress Comparison</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Planned Progress</span>
              <span className="font-medium text-gray-900">{siteProgress.plannedProgress}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gray-500 h-3 rounded-full transition-all duration-500"
                style={{ width: siteProgress.plannedProgress }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Actual Progress</span>
              <span className="font-medium text-gray-900">{siteProgress.actualProgress}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: siteProgress.actualProgress }}
              ></div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Variance</span>
              <span className={`text-2xl font-bold ${
                siteProgress.variance.startsWith('-') ? 'text-red-600' : 'text-green-600'
              }`}>
                {siteProgress.variance}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Briefcase size={20} className="mr-2" />
          Project Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Project ID</p>
            <p className="text-sm font-medium text-gray-900">{siteProgress.projectId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contractor</p>
            <p className="text-sm font-medium text-gray-900">{siteProgress.projectDetails.contractor}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Head</p>
            <p className="text-sm font-medium text-gray-900">{siteProgress.projectDetails.projectHead}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contract Value</p>
            <p className="text-sm font-medium text-gray-900">{siteProgress.projectDetails.contractValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimated Cost</p>
            <p className="text-sm font-medium text-gray-900">{siteProgress.projectDetails.estimatedCost}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Supervisor</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {siteProgress.supervisor}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Start Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(siteProgress.projectDetails.startDate).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">End Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(siteProgress.projectDetails.endDate).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Work Completed */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Work Completion Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Work Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Planned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {siteProgress.workCompleted.map((work, index) => {
                const plannedVal = parseFloat(work.planned)
                const actualVal = parseFloat(work.actual)
                const variance = actualVal - plannedVal
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{work.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{work.planned}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{work.actual}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`font-medium ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {variance >= 0 ? '+' : ''}{variance}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getWorkStatusColor(work.status)}`}>
                        {work.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            work.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: work.actual }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resources Deployment */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Truck size={20} className="mr-2" />
            Resources Deployment & Utilization
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resource Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deployed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilized</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilization</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {siteProgress.resources.map((resource, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{resource.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resource.deployed}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{resource.utilized}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`font-bold ${
                      parseFloat(resource.efficiency) >= 90 ? 'text-green-600' : 
                      parseFloat(resource.efficiency) >= 75 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {resource.efficiency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          parseFloat(resource.efficiency) >= 90 ? 'bg-green-500' : 
                          parseFloat(resource.efficiency) >= 75 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                        style={{ width: resource.efficiency }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equipment Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Truck size={20} className="mr-2" />
          Equipment Deployed
        </h3>
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4">
          {siteProgress.equipment}
        </p>
      </div>

      {/* Timeline/Milestones */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Project Timeline & Milestones
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {siteProgress.timeline.map((milestone, index) => (
              <div key={index} className="relative">
                {index !== siteProgress.timeline.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                    milestone.status === 'Completed' ? 'bg-green-100' :
                    milestone.status === 'Near Completion' ? 'bg-yellow-100' :
                    milestone.status === 'In Progress' ? 'bg-blue-100' :
                    'bg-gray-100'
                  }`}>
                    <CheckCircle size={16} className={
                      milestone.status === 'Completed' ? 'text-green-600' :
                      milestone.status === 'Near Completion' ? 'text-yellow-600' :
                      milestone.status === 'In Progress' ? 'text-blue-600' :
                      'text-gray-400'
                    } />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{milestone.milestone}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Target Date: {new Date(milestone.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Planned</p>
                          <p className="text-sm font-medium text-gray-900">{milestone.planned}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Actual</p>
                          <p className="text-sm font-medium text-blue-600">{milestone.actual}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getWorkStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          milestone.status === 'Completed' ? 'bg-green-500' :
                          milestone.status === 'Near Completion' ? 'bg-yellow-500' :
                          milestone.status === 'In Progress' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}
                        style={{ width: milestone.actual }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issues */}
      {siteProgress.issues.length > 0 && (
        <div className="bg-red-50 rounded-lg border border-red-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle size={20} className="mr-2 text-red-600" />
            Issues & Challenges
          </h3>
          <ul className="space-y-2">
            {siteProgress.issues.map((issue, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="text-red-600 mt-1">•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Remarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Supervisor's Remarks
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {siteProgress.remarks}
        </p>
      </div>

      {/* Site Photos */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Camera size={20} className="mr-2" />
          Site Photos ({siteProgress.photos})
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative">
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <Camera size={32} className="text-gray-400" />
              </div>
              <div className="mt-2">
                <p className="text-xs font-medium text-gray-900">{photo.caption}</p>
                <p className="text-xs text-gray-500">
                  {photo.uploadedBy} • {new Date(photo.uploadedAt).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Activity Log
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {auditLogs.map((log, index) => (
              <div key={log.id} className="flex items-start space-x-4 relative">
                {index !== auditLogs.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-orange-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        By {log.performedBy} • {new Date(log.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-5 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Site ID</p>
            <p className="text-lg font-bold text-gray-900">{siteProgress.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Planned</p>
            <p className="text-lg font-bold text-gray-600">{siteProgress.plannedProgress}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Actual</p>
            <p className="text-lg font-bold text-orange-600">{siteProgress.actualProgress}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Variance</p>
            <p className={`text-lg font-bold ${
              siteProgress.variance.startsWith('-') ? 'text-red-600' : 'text-green-600'
            }`}>
              {siteProgress.variance}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className="text-lg font-bold text-blue-600">{siteProgress.status}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button 
          onClick={handleExport}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Download Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Camera size={20} />
          <span>Upload Photos</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <FileText size={20} />
          <span>Print Report</span>
        </button>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </button>
      </div>
    </div>
  )
}