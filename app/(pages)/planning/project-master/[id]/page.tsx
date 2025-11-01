'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, MapPin, User, DollarSign, Building, TrendingUp, CheckCircle, Clock, AlertCircle, FileText, Share2, Printer, Edit, Phone, Mail } from 'lucide-react'
import { usePageLoading } from '@/hooks/usePageLoading'
import { DetailsSkeleton } from '@/components/SkeletonLoader'

interface ProjectDetails {
  id: string
  name: string
  type: 'Residential' | 'Commercial' | 'Infrastructure' | 'Mixed Use'
  location: string
  estimatedCost: string
  startDate: string
  endDate: string
  status: 'Active' | 'Planning' | 'Completed' | 'On Hold'
  completion: string
  projectManager: string
  description: string
  area: string
  units: string
  contractor: string
  projectDetails: {
    contractorContact: string
    contractorEmail: string
    consultant: string
    consultantContact: string
    architectFirm: string
    sanctionedPlans: string
  }
  financialBreakdown: {
    item: string
    budgetAllocated: string
    amountSpent: string
    remaining: string
  }[]
  milestones: {
    name: string
    targetDate: string
    status: 'Completed' | 'In Progress' | 'Pending'
    completionPercentage: string
  }[]
  team: {
    role: string
    name: string
    contact: string
    email: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function ProjectDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  // Mock data - in real app, fetch based on params.id
  const [project] = useState<ProjectDetails>({
    id: 'PROJ-2024-001',
    name: 'Gomti Nagar Housing Scheme',
    type: 'Residential',
    location: 'Gomti Nagar Extension, Lucknow, Uttar Pradesh - 226010',
    estimatedCost: '₹45,00,00,000',
    startDate: '2024-02-01',
    endDate: '2025-12-31',
    status: 'Active',
    completion: '35%',
    projectManager: 'Rajesh Sharma',
    description: 'Comprehensive residential housing scheme aimed at providing modern, affordable housing units with world-class amenities. The project includes residential towers, community facilities, green spaces, internal roads, water supply network, sewerage system, and recreational facilities.',
    area: '25 acres',
    units: '200 residential units',
    contractor: 'ABC Construction Pvt Ltd',
    projectDetails: {
      contractorContact: '+91 98765 43210',
      contractorEmail: 'contact@abcconstruction.com',
      consultant: 'XYZ Engineering Consultants',
      consultantContact: '+91 98765 43211',
      architectFirm: 'Modern Architects & Planners',
      sanctionedPlans: 'LDA/BP/2024/001234',
    },
    financialBreakdown: [
      {
        item: 'Civil Construction',
        budgetAllocated: '₹28,00,00,000',
        amountSpent: '₹10,50,00,000',
        remaining: '₹17,50,00,000',
      },
      {
        item: 'Electrical Works',
        budgetAllocated: '₹5,50,00,000',
        amountSpent: '₹1,80,00,000',
        remaining: '₹3,70,00,000',
      },
      {
        item: 'Plumbing & Sanitation',
        budgetAllocated: '₹4,00,00,000',
        amountSpent: '₹1,20,00,000',
        remaining: '₹2,80,00,000',
      },
      {
        item: 'Landscaping',
        budgetAllocated: '₹2,50,00,000',
        amountSpent: '₹50,00,000',
        remaining: '₹2,00,00,000',
      },
      {
        item: 'Internal Roads',
        budgetAllocated: '₹3,00,00,000',
        amountSpent: '₹1,00,00,000',
        remaining: '₹2,00,00,000',
      },
      {
        item: 'Contingency',
        budgetAllocated: '₹2,00,00,000',
        amountSpent: '₹20,00,000',
        remaining: '₹1,80,00,000',
      },
    ],
    milestones: [
      {
        name: 'Site Preparation & Leveling',
        targetDate: '2024-03-31',
        status: 'Completed',
        completionPercentage: '100%',
      },
      {
        name: 'Foundation Work',
        targetDate: '2024-06-30',
        status: 'Completed',
        completionPercentage: '100%',
      },
      {
        name: 'Structural Construction - Phase 1',
        targetDate: '2024-10-31',
        status: 'In Progress',
        completionPercentage: '65%',
      },
      {
        name: 'Structural Construction - Phase 2',
        targetDate: '2025-03-31',
        status: 'Pending',
        completionPercentage: '0%',
      },
      {
        name: 'Internal Finishing Works',
        targetDate: '2025-08-31',
        status: 'Pending',
        completionPercentage: '0%',
      },
      {
        name: 'External Development & Landscaping',
        targetDate: '2025-11-30',
        status: 'Pending',
        completionPercentage: '0%',
      },
      {
        name: 'Final Handover',
        targetDate: '2025-12-31',
        status: 'Pending',
        completionPercentage: '0%',
      },
    ],
    team: [
      {
        role: 'Project Manager',
        name: 'Rajesh Sharma',
        contact: '+91 98765 43210',
        email: 'rajesh.sharma@email.com',
      },
      {
        role: 'Site Engineer',
        name: 'Amit Kumar',
        contact: '+91 98765 43211',
        email: 'amit.kumar@email.com',
      },
      {
        role: 'Quality Control Manager',
        name: 'Priya Singh',
        contact: '+91 98765 43212',
        email: 'priya.singh@email.com',
      },
      {
        role: 'Safety Officer',
        name: 'Suresh Gupta',
        contact: '+91 98765 43213',
        email: 'suresh.gupta@email.com',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-02-01 09:00:00',
      action: 'Project Created',
      performedBy: 'Admin',
      details: 'New project created in the system',
    },
    {
      id: 'AL-002',
      timestamp: '2024-02-05 10:30:00',
      action: 'Project Manager Assigned',
      performedBy: 'Admin',
      details: 'Rajesh Sharma assigned as Project Manager',
    },
    {
      id: 'AL-003',
      timestamp: '2024-02-15 14:00:00',
      action: 'Site Preparation Started',
      performedBy: 'Rajesh Sharma',
      details: 'Site preparation and leveling work initiated',
    },
    {
      id: 'AL-004',
      timestamp: '2024-03-31 16:00:00',
      action: 'Milestone Completed',
      performedBy: 'Amit Kumar',
      details: 'Site Preparation & Leveling milestone completed',
    },
    {
      id: 'AL-005',
      timestamp: '2024-04-10 09:00:00',
      action: 'Foundation Work Started',
      performedBy: 'Rajesh Sharma',
      details: 'Foundation work commenced for all blocks',
    },
    {
      id: 'AL-006',
      timestamp: '2024-06-30 17:00:00',
      action: 'Milestone Completed',
      performedBy: 'Amit Kumar',
      details: 'Foundation Work milestone completed',
    },
  ])

  const handleExport = () => {
    const content = `
Project Details Report
======================

Project ID: ${project.id}
Project Name: ${project.name}
Status: ${project.status}

Basic Information
=================
Type: ${project.type}
Location: ${project.location}
Total Area: ${project.area}
Units: ${project.units}

Timeline
========
Start Date: ${new Date(project.startDate).toLocaleDateString('en-IN')}
End Date: ${new Date(project.endDate).toLocaleDateString('en-IN')}
Current Completion: ${project.completion}

Financial Details
=================
Total Estimated Cost: ${project.estimatedCost}

Budget Breakdown:
${project.financialBreakdown.map(item => `${item.item}:\n  Allocated: ${item.budgetAllocated}\n  Spent: ${item.amountSpent}\n  Remaining: ${item.remaining}`).join('\n\n')}

Project Team
============
${project.team.map(member => `${member.role}: ${member.name}\n  Contact: ${member.contact}\n  Email: ${member.email}`).join('\n\n')}

Stakeholders
============
Contractor: ${project.contractor}
Contact: ${project.projectDetails.contractorContact}
Email: ${project.projectDetails.contractorEmail}

Consultant: ${project.projectDetails.consultant}
Contact: ${project.projectDetails.consultantContact}

Architect: ${project.projectDetails.architectFirm}

Milestones
==========
${project.milestones.map(m => `${m.name} - ${m.status} (${m.completionPercentage})\nTarget Date: ${new Date(m.targetDate).toLocaleDateString('en-IN')}`).join('\n\n')}

Description
===========
${project.description}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `project_${project.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Planning':
        return 'bg-blue-100 text-blue-700'
      case 'Completed':
        return 'bg-purple-100 text-purple-700'
      case 'On Hold':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <TrendingUp size={40} className="text-green-600" />
      case 'Planning':
        return <Clock size={40} className="text-blue-600" />
      case 'Completed':
        return <CheckCircle size={40} className="text-purple-600" />
      case 'On Hold':
        return <AlertCircle size={40} className="text-gray-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const totalBudget = project.financialBreakdown.reduce((sum, item) => 
    sum + (parseFloat(item.budgetAllocated.replace(/[^0-9]/g, '')) || 0), 0
  )
  const totalSpent = project.financialBreakdown.reduce((sum, item) => 
    sum + (parseFloat(item.amountSpent.replace(/[^0-9]/g, '')) || 0), 0
  )
  const spentPercentage = ((totalSpent / totalBudget) * 100).toFixed(1)

  const daysToCompletion = Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const totalDays = Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))
  const daysElapsed = totalDays - daysToCompletion

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
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Project ID: {project.id} • {project.type}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Status Card */}
      <div className={`rounded-lg p-8 text-white ${
        project.status === 'Active' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        project.status === 'Planning' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        project.status === 'Completed' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
        'bg-gradient-to-r from-gray-500 to-gray-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              project.status === 'Active' ? 'text-green-100' :
              project.status === 'Planning' ? 'text-blue-100' :
              project.status === 'Completed' ? 'text-purple-100' :
              'text-gray-100'
            }`}>
              Project Status
            </p>
            <h2 className="text-4xl font-bold">{project.status}</h2>
            <p className={`text-sm mt-2 ${
              project.status === 'Active' ? 'text-green-100' :
              project.status === 'Planning' ? 'text-blue-100' :
              project.status === 'Completed' ? 'text-purple-100' :
              'text-gray-100'
            }`}>
              Completion: {project.completion} • Budget: {project.estimatedCost}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(project.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Budget</p>
              <h3 className="text-2xl font-bold text-green-600">{project.estimatedCost}</h3>
              <p className="text-xs text-gray-500 mt-2">Allocated amount</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Completion</p>
              <h3 className="text-2xl font-bold text-blue-600">{project.completion}</h3>
              <p className="text-xs text-gray-500 mt-2">Overall progress</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Days Remaining</p>
              <h3 className="text-2xl font-bold text-purple-600">{daysToCompletion > 0 ? daysToCompletion : 0}</h3>
              <p className="text-xs text-gray-500 mt-2">Until completion</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Area</p>
              <h3 className="text-2xl font-bold text-orange-600">{project.area}</h3>
              <p className="text-xs text-gray-500 mt-2">{project.units}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Building size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline Progress</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Completion</span>
            <span className="font-medium text-gray-900">{project.completion}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: project.completion }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Started: {new Date(project.startDate).toLocaleDateString('en-IN')}</span>
            <span>Target: {new Date(project.endDate).toLocaleDateString('en-IN')}</span>
          </div>
          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Days Elapsed</p>
              <p className="text-lg font-bold text-gray-900">{daysElapsed}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Total Duration</p>
              <p className="text-lg font-bold text-gray-900">{totalDays} days</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Days Remaining</p>
              <p className="text-lg font-bold text-orange-600">{daysToCompletion > 0 ? daysToCompletion : 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Project ID</p>
            <p className="text-sm font-medium text-gray-900">{project.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Type</p>
            <p className="text-sm font-medium text-gray-900">{project.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Manager</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {project.projectManager}
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <MapPin size={12} className="mr-1" />
              Location
            </p>
            <p className="text-sm font-medium text-gray-900">{project.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Start Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(project.startDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">End Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(project.endDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Sanctioned Plans</p>
            <p className="text-sm font-medium text-gray-900">{project.projectDetails.sanctionedPlans}</p>
          </div>
        </div>
      </div>

      {/* Stakeholders */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Project Stakeholders
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Contractor</p>
            <p className="text-sm font-medium text-gray-900">{project.contractor}</p>
            <p className="text-xs text-gray-600 mt-1">{project.projectDetails.contractorContact}</p>
            <p className="text-xs text-gray-600">{project.projectDetails.contractorEmail}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Consultant</p>
            <p className="text-sm font-medium text-gray-900">{project.projectDetails.consultant}</p>
            <p className="text-xs text-gray-600 mt-1">{project.projectDetails.consultantContact}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg col-span-2">
            <p className="text-xs text-gray-500 mb-2">Architect Firm</p>
            <p className="text-sm font-medium text-gray-900">{project.projectDetails.architectFirm}</p>
          </div>
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign size={20} className="mr-2" />
          Financial Breakdown
        </h3>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Budget Utilization</span>
            <span className="font-medium text-gray-900">{spentPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${spentPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Spent: ₹{(totalSpent / 10000000).toFixed(2)} Cr</span>
            <span>Budget: ₹{(totalBudget / 10000000).toFixed(2)} Cr</span>
          </div>
        </div>
        <div className="space-y-3">
          {project.financialBreakdown.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">{item.item}</p>
                <p className="text-sm font-bold text-gray-900">{item.budgetAllocated}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500">Spent: </span>
                  <span className="font-medium text-green-600">{item.amountSpent}</span>
                </div>
                <div>
                  <span className="text-gray-500">Remaining: </span>
                  <span className="font-medium text-orange-600">{item.remaining}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Project Milestones
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {project.milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== project.milestones.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                  milestone.status === 'Completed' ? 'bg-green-100' :
                  milestone.status === 'In Progress' ? 'bg-blue-100' :
                  'bg-orange-100'
                }`}>
                  {milestone.status === 'Completed' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : milestone.status === 'In Progress' ? (
                    <Clock size={16} className="text-blue-600" />
                  ) : (
                    <AlertCircle size={16} className="text-orange-600" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{milestone.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Target Date: {new Date(milestone.targetDate).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                      {milestone.status === 'In Progress' && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">{milestone.completionPercentage}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: milestone.completionPercentage }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className={`ml-4 px-3 py-1 text-xs font-medium rounded-full ${getMilestoneStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Team */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Project Team
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {project.team.map((member, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 mb-1">{member.role}</p>
              <p className="text-sm font-medium text-gray-900 mb-2">{member.name}</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 flex items-center">
                  <Phone size={10} className="mr-1" />
                  {member.contact}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <Mail size={10} className="mr-1" />
                  {member.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Project Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {project.description}
        </p>
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
            <p className="text-xs text-gray-600 mb-2">Project ID</p>
            <p className="text-lg font-bold text-gray-900">{project.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Type</p>
            <p className="text-lg font-bold text-blue-600">{project.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Budget</p>
            <p className="text-sm font-bold text-green-600">{project.estimatedCost}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Completion</p>
            <p className="text-lg font-bold text-purple-600">{project.completion}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              project.status === 'Active' ? 'text-green-600' :
              project.status === 'Planning' ? 'text-blue-600' :
              project.status === 'Completed' ? 'text-purple-600' :
              'text-gray-600'
            }`}>
              {project.status}
            </p>
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
          <Edit size={20} />
          <span>Edit Project</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print</span>
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