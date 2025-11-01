'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Phone, Mail, MapPin, Calendar, User, FileText, CheckCircle, Clock, AlertCircle, DollarSign, Share2, Printer, Edit, TrendingUp, Target, MessageSquare } from 'lucide-react'

interface LeadDetails {
  id: string
  leadNo: string
  name: string
  contact: string
  email: string
  interest: string
  source: string
  assignedTo: string
  visitDate: string
  status: 'Hot' | 'Warm' | 'Cold' | 'Converted' | 'Lost'
  lastContact: string
  address: string
  budget: string
  notes: string
  followUpDate: string
  alternateContact: string
  profession: string
  referredBy: string
  leadInfo: {
    createdDate: string
    createdBy: string
    score: number
    priority: string
    stage: string
  }
  requirements: {
    propertyType: string
    bedrooms: string
    budget: string
    location: string
    possession: string
    purpose: string
  }
  interactions: {
    date: string
    type: string
    mode: string
    summary: string
    performedBy: string
    nextAction: string
  }[]
  siteVisits: {
    date: string
    project: string
    feedback: string
    rating: string
    attendedBy: string
  }[]
  followUps: {
    date: string
    scheduledBy: string
    purpose: string
    status: string
    outcome: string
  }[]
  documents: {
    name: string
    type: string
    uploadedDate: string
    uploadedBy: string
  }[]
  timeline: {
    date: string
    event: string
    details: string
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

export default function LeadDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [lead] = useState<LeadDetails>({
    id: 'LEAD-2024-001',
    leadNo: 'LD/2024/001',
    name: 'Rajesh Kumar Singh',
    contact: '+91 9876543210',
    email: 'rajesh.kumar@example.com',
    interest: '3BHK - Gomti Nagar Housing',
    source: 'Website',
    assignedTo: 'Sales Officer - Priya Sharma',
    visitDate: '2024-10-28',
    status: 'Hot',
    lastContact: '2 hours ago',
    address: 'Indira Nagar, Lucknow - 226016',
    budget: '₹50-60 Lakhs',
    notes: 'Very interested customer. Looking for immediate possession. Has own funding arrangement. Preference for East facing unit with parking.',
    followUpDate: '2024-11-01',
    alternateContact: '+91 9876543213',
    profession: 'IT Professional - TCS',
    referredBy: 'Website - Google Search',
    leadInfo: {
      createdDate: '2024-10-15',
      createdBy: 'Marketing Team',
      score: 85,
      priority: 'High',
      stage: 'Negotiation',
    },
    requirements: {
      propertyType: '3BHK Apartment',
      bedrooms: '3 BHK',
      budget: '₹50-60 Lakhs',
      location: 'Gomti Nagar, Lucknow',
      possession: 'Immediate',
      purpose: 'Self Use',
    },
    interactions: [
      {
        date: '2024-10-30',
        type: 'Follow-up Call',
        mode: 'Phone',
        summary: 'Discussed payment plan options. Customer interested in booking.',
        performedBy: 'Priya Sharma',
        nextAction: 'Schedule site visit for Nov 1st',
      },
      {
        date: '2024-10-28',
        type: 'Site Visit',
        mode: 'In-person',
        summary: 'Customer visited Gomti Nagar project. Very impressed with amenities.',
        performedBy: 'Priya Sharma',
        nextAction: 'Send payment plan details',
      },
      {
        date: '2024-10-25',
        type: 'Email Communication',
        mode: 'Email',
        summary: 'Sent project brochure and floor plans.',
        performedBy: 'Priya Sharma',
        nextAction: 'Follow up call scheduled',
      },
      {
        date: '2024-10-20',
        type: 'Initial Contact',
        mode: 'Phone',
        summary: 'First contact made. Customer expressed interest in 3BHK units.',
        performedBy: 'Priya Sharma',
        nextAction: 'Send project details',
      },
    ],
    siteVisits: [
      {
        date: '2024-10-28',
        project: 'Gomti Nagar Housing - Phase 2',
        feedback: 'Excellent. Loved the layout and amenities. Interested in Unit 304.',
        rating: '5/5',
        attendedBy: 'Priya Sharma',
      },
      {
        date: '2024-10-22',
        project: 'Gomti Nagar Housing - Phase 1',
        feedback: 'Good project but looking for newer units with better amenities.',
        rating: '4/5',
        attendedBy: 'Priya Sharma',
      },
    ],
    followUps: [
      {
        date: '2024-11-01',
        scheduledBy: 'Priya Sharma',
        purpose: 'Booking discussion and payment plan finalization',
        status: 'Scheduled',
        outcome: 'Pending',
      },
      {
        date: '2024-10-30',
        scheduledBy: 'Priya Sharma',
        purpose: 'Follow-up on payment plan',
        status: 'Completed',
        outcome: 'Customer interested. Site visit scheduled.',
      },
      {
        date: '2024-10-25',
        scheduledBy: 'Priya Sharma',
        purpose: 'Follow-up on brochure',
        status: 'Completed',
        outcome: 'Customer received brochure. Site visit scheduled.',
      },
    ],
    documents: [
      {
        name: 'ID Proof - Aadhaar Card.pdf',
        type: 'Identity Proof',
        uploadedDate: '2024-10-28',
        uploadedBy: 'Rajesh Kumar Singh',
      },
      {
        name: 'Salary Slip - October 2024.pdf',
        type: 'Income Proof',
        uploadedDate: '2024-10-28',
        uploadedBy: 'Rajesh Kumar Singh',
      },
      {
        name: 'PAN Card.pdf',
        type: 'Identity Proof',
        uploadedDate: '2024-10-28',
        uploadedBy: 'Rajesh Kumar Singh',
      },
      {
        name: 'Project Brochure.pdf',
        type: 'Marketing Material',
        uploadedDate: '2024-10-25',
        uploadedBy: 'Priya Sharma',
      },
    ],
    timeline: [
      {
        date: '2024-10-30',
        event: 'Follow-up Call',
        details: 'Discussed payment plan. Customer showing high interest.',
        status: 'Completed',
      },
      {
        date: '2024-10-28',
        event: 'Site Visit Conducted',
        details: 'Customer visited project site. Very positive feedback.',
        status: 'Completed',
      },
      {
        date: '2024-10-25',
        event: 'Marketing Material Sent',
        details: 'Project brochure and floor plans emailed to customer.',
        status: 'Completed',
      },
      {
        date: '2024-10-20',
        event: 'First Contact',
        details: 'Initial phone conversation. Customer expressed interest.',
        status: 'Completed',
      },
      {
        date: '2024-10-15',
        event: 'Lead Created',
        details: 'Lead generated from website inquiry form.',
        status: 'Completed',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-30 14:30:00',
      action: 'Follow-up Completed',
      performedBy: 'Priya Sharma',
      details: 'Follow-up call made. Customer interested in booking.',
    },
    {
      id: 'AL-002',
      timestamp: '2024-10-28 11:00:00',
      action: 'Site Visit Conducted',
      performedBy: 'Priya Sharma',
      details: 'Customer visited Gomti Nagar Housing project.',
    },
    {
      id: 'AL-003',
      timestamp: '2024-10-28 10:30:00',
      action: 'Documents Uploaded',
      performedBy: 'Rajesh Kumar Singh',
      details: 'Customer uploaded ID and income proofs.',
    },
    {
      id: 'AL-004',
      timestamp: '2024-10-25 16:00:00',
      action: 'Marketing Material Sent',
      performedBy: 'Priya Sharma',
      details: 'Project brochure and floor plans sent via email.',
    },
    {
      id: 'AL-005',
      timestamp: '2024-10-20 10:00:00',
      action: 'Initial Contact',
      performedBy: 'Priya Sharma',
      details: 'First phone call made to customer.',
    },
    {
      id: 'AL-006',
      timestamp: '2024-10-15 09:00:00',
      action: 'Lead Created',
      performedBy: 'Marketing Team',
      details: 'Lead generated from website inquiry.',
    },
  ])

  const handleExport = () => {
    const content = `
LEAD DETAILS REPORT
===================

Lead ID: ${lead.id}
Lead Number: ${lead.leadNo}
Status: ${lead.status}

PERSONAL INFORMATION
====================
Name: ${lead.name}
Contact: ${lead.contact}
Alternate Contact: ${lead.alternateContact}
Email: ${lead.email}
Address: ${lead.address}
Profession: ${lead.profession}

LEAD INFORMATION
================
Interest: ${lead.interest}
Budget: ${lead.budget}
Source: ${lead.source}
Referred By: ${lead.referredBy}
Assigned To: ${lead.assignedTo}
Lead Score: ${lead.leadInfo.score}/100
Priority: ${lead.leadInfo.priority}
Current Stage: ${lead.leadInfo.stage}

REQUIREMENTS
============
Property Type: ${lead.requirements.propertyType}
Bedrooms: ${lead.requirements.bedrooms}
Budget: ${lead.requirements.budget}
Preferred Location: ${lead.requirements.location}
Possession: ${lead.requirements.possession}
Purpose: ${lead.requirements.purpose}

INTERACTIONS
============
${lead.interactions.map(i => `${i.date} - ${i.type} (${i.mode})\n   Summary: ${i.summary}\n   By: ${i.performedBy}\n   Next Action: ${i.nextAction}`).join('\n\n')}

SITE VISITS
===========
${lead.siteVisits.map(v => `${v.date} - ${v.project}\n   Feedback: ${v.feedback}\n   Rating: ${v.rating}\n   Attended By: ${v.attendedBy}`).join('\n\n')}

FOLLOW-UPS
==========
${lead.followUps.map(f => `${f.date} - ${f.purpose}\n   Status: ${f.status}\n   Outcome: ${f.outcome}\n   Scheduled By: ${f.scheduledBy}`).join('\n\n')}

NOTES
=====
${lead.notes}

DOCUMENTS
=========
${lead.documents.map(d => `${d.name} (${d.type})\n   Uploaded: ${d.uploadedDate} by ${d.uploadedBy}`).join('\n\n')}

TIMELINE
========
${lead.timeline.map(t => `${t.date} - ${t.event}\n   ${t.details}\n   Status: ${t.status}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Lead_${lead.leadNo.replace(/\//g, '_')}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot':
        return 'bg-red-100 text-red-700'
      case 'Warm':
        return 'bg-orange-100 text-orange-700'
      case 'Cold':
        return 'bg-blue-100 text-blue-700'
      case 'Converted':
        return 'bg-green-100 text-green-700'
      case 'Lost':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hot':
        return <AlertCircle size={40} className="text-red-600" />
      case 'Warm':
        return <TrendingUp size={40} className="text-orange-600" />
      case 'Cold':
        return <Clock size={40} className="text-blue-600" />
      case 'Converted':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Lost':
        return <AlertCircle size={40} className="text-gray-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const leadAge = Math.ceil((new Date().getTime() - new Date(lead.leadInfo.createdDate).getTime()) / (1000 * 60 * 60 * 24))
  const daysToFollowUp = lead.followUpDate ? Math.ceil((new Date(lead.followUpDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

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
            <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {lead.leadNo} • {lead.interest}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(lead.status)}`}>
            {lead.status}
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
        lead.status === 'Hot' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        lead.status === 'Warm' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        lead.status === 'Cold' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        lead.status === 'Converted' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        'bg-gradient-to-r from-gray-500 to-gray-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              lead.status === 'Hot' ? 'text-red-100' :
              lead.status === 'Warm' ? 'text-orange-100' :
              lead.status === 'Cold' ? 'text-blue-100' :
              lead.status === 'Converted' ? 'text-green-100' :
              'text-gray-100'
            }`}>
              Lead Status - {lead.leadInfo.stage}
            </p>
            <h2 className="text-4xl font-bold">{lead.status} Lead</h2>
            <p className={`text-sm mt-2 ${
              lead.status === 'Hot' ? 'text-red-100' :
              lead.status === 'Warm' ? 'text-orange-100' :
              lead.status === 'Cold' ? 'text-blue-100' :
              lead.status === 'Converted' ? 'text-green-100' :
              'text-gray-100'
            }`}>
              Score: {lead.leadInfo.score}/100 • Priority: {lead.leadInfo.priority} • Budget: {lead.budget}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(lead.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Lead Score</p>
              <h3 className="text-2xl font-bold text-gray-900">{lead.leadInfo.score}/100</h3>
              <p className="text-xs text-gray-500 mt-2">{lead.leadInfo.priority} Priority</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Lead Age</p>
              <h3 className="text-2xl font-bold text-blue-600">{leadAge} Days</h3>
              <p className="text-xs text-gray-500 mt-2">Since creation</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Interactions</p>
              <h3 className="text-2xl font-bold text-orange-600">{lead.interactions.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Total touchpoints</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <MessageSquare size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Next Follow-up</p>
              <h3 className="text-2xl font-bold text-green-600">{daysToFollowUp > 0 ? `${daysToFollowUp} Days` : 'Today'}</h3>
              <p className="text-xs text-gray-500 mt-2">Scheduled</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Contact Information
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Primary Contact</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Phone size={14} className="mr-1 text-green-600" />
              {lead.contact}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Alternate Contact</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Phone size={14} className="mr-1 text-blue-600" />
              {lead.alternateContact || 'Not provided'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Mail size={14} className="mr-1 text-orange-600" />
              {lead.email}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1 text-red-600" />
              {lead.address}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Profession</p>
            <p className="text-sm font-medium text-gray-900">{lead.profession}</p>
          </div>
        </div>
      </div>

      {/* Lead Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Information</h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Lead ID</p>
            <p className="text-sm font-medium text-gray-900">{lead.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Lead Number</p>
            <p className="text-sm font-medium text-gray-900">{lead.leadNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Source</p>
            <p className="text-sm font-medium text-gray-900">{lead.source}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Referred By</p>
            <p className="text-sm font-medium text-gray-900">{lead.referredBy}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Assigned To</p>
            <p className="text-sm font-medium text-gray-900">{lead.assignedTo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Created Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(lead.leadInfo.createdDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Created By</p>
            <p className="text-sm font-medium text-gray-900">{lead.leadInfo.createdBy}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Stage</p>
            <p className="text-sm font-medium text-gray-900">{lead.leadInfo.stage}</p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Target size={20} className="mr-2" />
          Customer Requirements
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Property Type</p>
            <p className="text-sm font-bold text-blue-900">{lead.requirements.propertyType}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Budget Range</p>
            <p className="text-sm font-bold text-green-900">{lead.requirements.budget}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-700 mb-2">Preferred Location</p>
            <p className="text-sm font-bold text-purple-900">{lead.requirements.location}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-700 mb-2">Possession</p>
            <p className="text-sm font-bold text-orange-900">{lead.requirements.possession}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-700 mb-2">Purpose</p>
            <p className="text-sm font-bold text-red-900">{lead.requirements.purpose}</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-700 mb-2">Configuration</p>
            <p className="text-sm font-bold text-yellow-900">{lead.requirements.bedrooms}</p>
          </div>
        </div>
      </div>

      {/* Interactions History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare size={20} className="mr-2" />
            Interactions History ({lead.interactions.length})
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {lead.interactions.map((interaction, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{interaction.type}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(interaction.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })} • {interaction.mode} • By {interaction.performedBy}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {interaction.mode}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{interaction.summary}</p>
                <p className="text-xs text-orange-600 font-medium">Next Action: {interaction.nextAction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Site Visits */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Site Visits ({lead.siteVisits.length})</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {lead.siteVisits.map((visit, index) => (
              <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{visit.project}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(visit.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })} • Attended by {visit.attendedBy}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    {visit.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-700"><strong>Feedback:</strong> {visit.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Follow-ups */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar size={20} className="mr-2" />
            Follow-up Schedule ({lead.followUps.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Outcome</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lead.followUps.map((followUp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(followUp.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{followUp.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{followUp.scheduledBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      followUp.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      followUp.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {followUp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{followUp.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText size={20} className="mr-2" />
            Documents ({lead.documents.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {lead.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.type} • Uploaded: {new Date(doc.uploadedDate).toLocaleDateString('en-IN')} by {doc.uploadedBy}
                  </p>
                </div>
              </div>
              <button className="ml-4 text-orange-600 hover:text-orange-700">
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes & Remarks</h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          {lead.notes}
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Lead Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {lead.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== lead.timeline.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        <Calendar size={12} className="inline mr-1" />
                        {new Date(event.date).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-green-600" />
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
            <p className="text-xs text-gray-600 mb-2">Lead Number</p>
            <p className="text-lg font-bold text-gray-900">{lead.leadNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Score</p>
            <p className="text-lg font-bold text-purple-600">{lead.leadInfo.score}/100</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Interactions</p>
            <p className="text-lg font-bold text-orange-600">{lead.interactions.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Site Visits</p>
            <p className="text-lg font-bold text-green-600">{lead.siteVisits.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              lead.status === 'Hot' ? 'text-red-600' :
              lead.status === 'Warm' ? 'text-orange-600' :
              lead.status === 'Cold' ? 'text-blue-600' :
              lead.status === 'Converted' ? 'text-green-600' :
              'text-gray-600'
            }`}>
              {lead.status}
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
          <span>Edit Lead</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Phone size={20} />
          <span>Call Customer</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share</span>
        </button>
        <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print</span>
        </button>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Leads</span>
        </button>
      </div>
    </div>
  )
}