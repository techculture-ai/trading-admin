'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, User, FileText, Building, CheckCircle, XCircle, AlertTriangle, Beaker, ClipboardCheck, Award } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface QualityTestDetails {
  id: string
  projectId: string
  projectName: string
  testType: string
  testDate: string
  sampleId: string
  requiredStrength: string
  actualStrength: string
  result: string
  testedBy: string
  remarks: string
  labName: string
  reportNumber: string
  projectDetails: {
    location: string
    projectHead: string
    contractor: string
  }
  sampleDetails: {
    collectionDate: string
    collectionLocation: string
    batchNumber: string
    quantity: string
    collectedBy: string
  }
  labDetails: {
    name: string
    address: string
    accreditationNo: string
    validUpto: string
    contactPerson: string
    contactNumber: string
  }
  testParameters: {
    testMethod: string
    testStandard: string
    temperature: string
    humidity: string
    curingDays: string
  }
}

interface TestReading {
  id: string
  parameter: string
  specification: string
  observed: string
  status: string
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function QualityTestDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  // Mock data - in real app, fetch based on params.id
  const [test] = useState<QualityTestDetails>({
    id: 'QA-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    testType: 'Concrete Cube Test',
    testDate: '2024-01-20',
    sampleId: 'CONC-001',
    requiredStrength: '25 MPa',
    actualStrength: '27 MPa',
    result: 'Pass',
    testedBy: 'Lab Technician A',
    remarks: 'Sample meets all specifications. Concrete quality is satisfactory. No deviations observed during testing.',
    labName: 'Central Testing Lab',
    reportNumber: 'CTL/2024/001',
    projectDetails: {
      location: 'Gomti Nagar, Lucknow',
      projectHead: 'Er. Suresh Chandra',
      contractor: 'ABC Builders Ltd.',
    },
    sampleDetails: {
      collectionDate: '2024-01-13',
      collectionLocation: 'Foundation Work - Block A',
      batchNumber: 'BATCH-2024-001',
      quantity: '3 Cubes (150mm x 150mm x 150mm)',
      collectedBy: 'Site Engineer',
    },
    labDetails: {
      name: 'Central Testing Laboratory',
      address: 'Plot No. 45, Industrial Area, Gomti Nagar, Lucknow - 226010',
      accreditationNo: 'NABL/ACC/2020/12345',
      validUpto: '2026-12-31',
      contactPerson: 'Dr. Rajesh Kumar',
      contactNumber: '+91 9876543210',
    },
    testParameters: {
      testMethod: 'IS 516:1959',
      testStandard: 'Compression Test as per IS Code',
      temperature: '27°C ± 2°C',
      humidity: '65% ± 5%',
      curingDays: '28 days',
    }
  })

  const [testReadings] = useState<TestReading[]>([
    {
      id: 'TR-001',
      parameter: 'Cube 1 Compressive Strength',
      specification: '≥ 25 MPa',
      observed: '27.2 MPa',
      status: 'Pass',
    },
    {
      id: 'TR-002',
      parameter: 'Cube 2 Compressive Strength',
      specification: '≥ 25 MPa',
      observed: '26.8 MPa',
      status: 'Pass',
    },
    {
      id: 'TR-003',
      parameter: 'Cube 3 Compressive Strength',
      specification: '≥ 25 MPa',
      observed: '27.0 MPa',
      status: 'Pass',
    },
    {
      id: 'TR-004',
      parameter: 'Average Compressive Strength',
      specification: '≥ 25 MPa',
      observed: '27.0 MPa',
      status: 'Pass',
    },
    {
      id: 'TR-005',
      parameter: 'Coefficient of Variation',
      specification: '≤ 10%',
      observed: '0.74%',
      status: 'Pass',
    },
  ])

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-13 10:00:00',
      action: 'Sample Collected',
      performedBy: 'Site Engineer',
      details: 'Concrete sample collected from foundation work',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-13 11:30:00',
      action: 'Sample Received at Lab',
      performedBy: 'Lab Assistant',
      details: 'Sample received and logged in lab register',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-13 14:00:00',
      action: 'Curing Started',
      performedBy: 'Lab Technician A',
      details: 'Cubes placed in curing tank as per IS specifications',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-20 09:00:00',
      action: 'Testing Commenced',
      performedBy: 'Lab Technician A',
      details: 'Compression test started after 28 days curing',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-20 10:30:00',
      action: 'Test Completed',
      performedBy: 'Lab Technician A',
      details: 'All three cubes tested successfully',
    },
    {
      id: 'AL-006',
      timestamp: '2024-01-20 14:00:00',
      action: 'Report Generated',
      performedBy: 'Lab Manager',
      details: 'Test report generated and approved',
    },
  ])

  const handleExport = () => {
    const content = `
Quality Test Report
===================

Report Number: ${test.reportNumber}
Test ID: ${test.id}
Test Type: ${test.testType}
Test Date: ${new Date(test.testDate).toLocaleDateString('en-IN')}
Result: ${test.result}

Project Details
===============
Project ID: ${test.projectId}
Project Name: ${test.projectName}
Location: ${test.projectDetails.location}
Project Head: ${test.projectDetails.projectHead}
Contractor: ${test.projectDetails.contractor}

Sample Details
==============
Sample ID: ${test.sampleId}
Batch Number: ${test.sampleDetails.batchNumber}
Collection Date: ${new Date(test.sampleDetails.collectionDate).toLocaleDateString('en-IN')}
Collection Location: ${test.sampleDetails.collectionLocation}
Quantity: ${test.sampleDetails.quantity}
Collected By: ${test.sampleDetails.collectedBy}

Laboratory Details
==================
Lab Name: ${test.labDetails.name}
Address: ${test.labDetails.address}
Accreditation: ${test.labDetails.accreditationNo}
Valid Upto: ${new Date(test.labDetails.validUpto).toLocaleDateString('en-IN')}
Contact: ${test.labDetails.contactPerson} (${test.labDetails.contactNumber})

Test Parameters
===============
Test Method: ${test.testParameters.testMethod}
Test Standard: ${test.testParameters.testStandard}
Temperature: ${test.testParameters.temperature}
Humidity: ${test.testParameters.humidity}
Curing Period: ${test.testParameters.curingDays}

Test Results
============
Required Strength: ${test.requiredStrength}
Actual Strength: ${test.actualStrength}
Result: ${test.result}

Detailed Readings
=================
${testReadings.map(r => `${r.parameter}: ${r.observed} (Spec: ${r.specification}) - ${r.status}`).join('\n')}

Tested By: ${test.testedBy}

Remarks
=======
${test.remarks}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quality_test_${test.id}.txt`
    a.click()
  }

  const getResultColor = (result: string) => {
    return result === 'Pass' ? 'text-green-600' : 'text-red-600'
  }

  const getResultBgColor = (result: string) => {
    return result === 'Pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
  }

  const getResultIcon = (result: string) => {
    return result === 'Pass' ? <CheckCircle size={40} /> : <XCircle size={40} />
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
            <h1 className="text-2xl font-bold text-gray-900">{test.testType} - {test.id}</h1>
            <p className="text-sm text-gray-600 mt-1">{test.reportNumber} • {test.projectName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getResultBgColor(test.result)}`}>
            {test.result}
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

      {/* Result Card */}
      <div className={`rounded-lg p-8 text-white ${
        test.result === 'Pass' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${test.result === 'Pass' ? 'text-green-100' : 'text-red-100'}`}>
              Test Result
            </p>
            <h2 className="text-4xl font-bold">{test.result}</h2>
            <p className={`text-sm mt-2 ${test.result === 'Pass' ? 'text-green-100' : 'text-red-100'}`}>
              {test.testType} • Sample: {test.sampleId}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getResultIcon(test.result)}
          </div>
        </div>
      </div>

      {/* Test Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Required Strength</p>
              <h3 className="text-2xl font-bold text-gray-900">{test.requiredStrength}</h3>
              <p className="text-xs text-gray-500 mt-2">Specification</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClipboardCheck size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Actual Strength</p>
              <h3 className={`text-2xl font-bold ${getResultColor(test.result)}`}>{test.actualStrength}</h3>
              <p className="text-xs text-gray-500 mt-2">Achieved</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              test.result === 'Pass' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Beaker size={24} className={test.result === 'Pass' ? 'text-green-600' : 'text-red-600'} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Test Standard</p>
              <h3 className="text-lg font-bold text-gray-900">{test.testParameters.testMethod}</h3>
              <p className="text-xs text-gray-500 mt-2">IS Code</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Curing Period</p>
              <h3 className="text-2xl font-bold text-gray-900">{test.testParameters.curingDays}</h3>
              <p className="text-xs text-gray-500 mt-2">As per standard</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Information */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Test ID</p>
              <p className="text-sm font-medium text-gray-900">{test.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Report Number</p>
              <p className="text-sm font-medium text-gray-900">{test.reportNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Test Type</p>
              <p className="text-sm font-medium text-gray-900">{test.testType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Test Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(test.testDate).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Sample ID</p>
              <p className="text-sm font-medium text-gray-900">{test.sampleId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Tested By</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <User size={14} className="mr-1" />
                {test.testedBy}
              </p>
            </div>
          </div>
        </div>

        {/* Result Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Result Summary</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Required</p>
              <p className="text-xl font-bold text-gray-900">{test.requiredStrength}</p>
            </div>
            <div className={`p-4 rounded-lg ${
              test.result === 'Pass' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`text-xs mb-2 ${
                test.result === 'Pass' ? 'text-green-700' : 'text-red-700'
              }`}>Achieved</p>
              <p className={`text-xl font-bold ${getResultColor(test.result)}`}>{test.actualStrength}</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${
              test.result === 'Pass' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              <p className={`text-xs mb-2 ${
                test.result === 'Pass' ? 'text-green-700' : 'text-red-700'
              }`}>Final Result</p>
              <p className={`text-2xl font-bold ${getResultColor(test.result)}`}>{test.result}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Project Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Project ID</p>
            <p className="text-sm font-medium text-gray-900">{test.projectId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Name</p>
            <p className="text-sm font-medium text-gray-900">{test.projectName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900">{test.projectDetails.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Head</p>
            <p className="text-sm font-medium text-gray-900">{test.projectDetails.projectHead}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contractor</p>
            <p className="text-sm font-medium text-gray-900">{test.projectDetails.contractor}</p>
          </div>
        </div>
      </div>

      {/* Sample Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sample Details</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Batch Number</p>
            <p className="text-sm font-medium text-gray-900">{test.sampleDetails.batchNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Collection Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(test.sampleDetails.collectionDate).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Collected By</p>
            <p className="text-sm font-medium text-gray-900">{test.sampleDetails.collectedBy}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Collection Location</p>
            <p className="text-sm font-medium text-gray-900">{test.sampleDetails.collectionLocation}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Sample Quantity</p>
            <p className="text-sm font-medium text-gray-900">{test.sampleDetails.quantity}</p>
          </div>
        </div>
      </div>

      {/* Laboratory Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Beaker size={20} className="mr-2" />
          Laboratory Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Laboratory Name</p>
            <p className="text-sm font-medium text-gray-900">{test.labDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Accreditation Number</p>
            <p className="text-sm font-medium text-gray-900">{test.labDetails.accreditationNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Valid Upto</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(test.labDetails.validUpto).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{test.labDetails.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Person</p>
            <p className="text-sm font-medium text-gray-900">{test.labDetails.contactPerson}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
            <p className="text-sm font-medium text-gray-900">{test.labDetails.contactNumber}</p>
          </div>
        </div>
      </div>

      {/* Test Parameters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Parameters & Conditions</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Test Method</p>
            <p className="text-sm font-medium text-gray-900">{test.testParameters.testMethod}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Test Standard</p>
            <p className="text-sm font-medium text-gray-900">{test.testParameters.testStandard}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Curing Period</p>
            <p className="text-sm font-medium text-gray-900">{test.testParameters.curingDays}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Temperature</p>
            <p className="text-sm font-medium text-gray-900">{test.testParameters.temperature}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Humidity</p>
            <p className="text-sm font-medium text-gray-900">{test.testParameters.humidity}</p>
          </div>
        </div>
      </div>

      {/* Test Readings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Test Readings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observed Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testReadings.map((reading) => (
                <tr key={reading.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{reading.parameter}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{reading.specification}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{reading.observed}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      reading.status === 'Pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {reading.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Remarks & Observations
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {test.remarks}
        </p>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <ClipboardCheck size={20} className="mr-2" />
            Test Process Audit Trail
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

      {/* Certification */}
      <div className={`rounded-lg border-2 p-6 ${
        test.result === 'Pass' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
      }`}>
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            test.result === 'Pass' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {test.result === 'Pass' ? (
              <CheckCircle size={32} className="text-green-600" />
            ) : (
              <XCircle size={32} className="text-red-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold mb-2 ${getResultColor(test.result)}`}>
              Test Certification
            </h3>
            <p className={`text-sm mb-4 ${
              test.result === 'Pass' ? 'text-green-800' : 'text-red-800'
            }`}>
              This is to certify that the sample has been tested as per {test.testParameters.testMethod} and the 
              result is <strong>{test.result}</strong>. {test.result === 'Pass' ? 
              'The material meets all required specifications.' : 
              'The material does not meet the required specifications and is rejected.'}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className={`font-medium ${test.result === 'Pass' ? 'text-green-900' : 'text-red-900'}`}>
                  Tested By: {test.testedBy}
                </p>
                <p className={`${test.result === 'Pass' ? 'text-green-700' : 'text-red-700'}`}>
                  {test.labName}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${test.result === 'Pass' ? 'text-green-900' : 'text-red-900'}`}>
                  Report No: {test.reportNumber}
                </p>
                <p className={`${test.result === 'Pass' ? 'text-green-700' : 'text-red-700'}`}>
                  Date: {new Date(test.testDate).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-5 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Test ID</p>
            <p className="text-lg font-bold text-gray-900">{test.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Sample ID</p>
            <p className="text-lg font-bold text-gray-900">{test.sampleId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Required</p>
            <p className="text-lg font-bold text-blue-600">{test.requiredStrength}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Achieved</p>
            <p className={`text-lg font-bold ${getResultColor(test.result)}`}>{test.actualStrength}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Result</p>
            <p className={`text-lg font-bold ${getResultColor(test.result)}`}>{test.result}</p>
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
          <span>Download Test Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <FileText size={20} />
          <span>Print Certificate</span>
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