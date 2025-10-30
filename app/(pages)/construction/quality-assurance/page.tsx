'use client'

import { useState } from 'react'
import { Search, Plus, Filter, CheckCircle, XCircle, Clock, X, Eye, Edit, Trash2, Download, FileText } from 'lucide-react'

interface QualityTest {
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
}

const initialQualityTests: QualityTest[] = [
  {
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
    remarks: 'Meets specifications',
    labName: 'Central Testing Lab',
    reportNumber: 'CTL/2024/001',
  },
  {
    id: 'QA-2024-002',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    testType: 'Steel Bar Test',
    testDate: '2024-01-22',
    sampleId: 'STEEL-002',
    requiredStrength: '415 MPa',
    actualStrength: '405 MPa',
    result: 'Fail',
    testedBy: 'Lab Technician B',
    remarks: 'Below specification, rejected',
    labName: 'Materials Testing Lab',
    reportNumber: 'MTL/2024/002',
  },
  {
    id: 'QA-2024-003',
    projectId: 'PROJ-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    testType: 'Brick Compression Test',
    testDate: '2024-01-23',
    sampleId: 'BRICK-003',
    requiredStrength: '7.5 MPa',
    actualStrength: '8.2 MPa',
    result: 'Pass',
    testedBy: 'Lab Technician A',
    remarks: 'Good quality',
    labName: 'Central Testing Lab',
    reportNumber: 'CTL/2024/003',
  },
]

export default function QualityAssurancePage() {
  const [qualityTests, setQualityTests] = useState<QualityTest[]>(initialQualityTests)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTest, setSelectedTest] = useState<QualityTest | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterResult, setFilterResult] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    testType: 'Concrete Cube Test',
    testDate: '',
    sampleId: '',
    requiredStrength: '',
    actualStrength: '',
    testedBy: '',
    remarks: '',
    labName: '',
    reportNumber: '',
  })

  const resetForm = () => {
    setFormData({
      projectId: '',
      projectName: '',
      testType: 'Concrete Cube Test',
      testDate: '',
      sampleId: '',
      requiredStrength: '',
      actualStrength: '',
      testedBy: '',
      remarks: '',
      labName: '',
      reportNumber: '',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const determineResult = (required: string, actual: string): string => {
    const reqValue = parseFloat(required.replace(/[^\d.]/g, ''))
    const actValue = parseFloat(actual.replace(/[^\d.]/g, ''))
    return actValue >= reqValue ? 'Pass' : 'Fail'
  }

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault()
    const result = determineResult(formData.requiredStrength, formData.actualStrength)

    const newTest: QualityTest = {
      id: `QA-2024-${String(qualityTests.length + 1).padStart(3, '0')}`,
      ...formData,
      result,
    }

    setQualityTests([...qualityTests, newTest])
    setShowAddModal(false)
    resetForm()
  }

  const handleViewTest = (test: QualityTest) => {
    setSelectedTest(test)
    setShowViewModal(true)
  }

  const handleEditTest = (test: QualityTest) => {
    setSelectedTest(test)
    setFormData({
      projectId: test.projectId,
      projectName: test.projectName,
      testType: test.testType,
      testDate: test.testDate,
      sampleId: test.sampleId,
      requiredStrength: test.requiredStrength,
      actualStrength: test.actualStrength,
      testedBy: test.testedBy,
      remarks: test.remarks,
      labName: test.labName,
      reportNumber: test.reportNumber,
    })
    setShowEditModal(true)
  }

  const handleUpdateTest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTest) return

    const result = determineResult(formData.requiredStrength, formData.actualStrength)

    const updatedTests = qualityTests.map(test =>
      test.id === selectedTest.id
        ? {
            ...test,
            ...formData,
            result,
          }
        : test
    )

    setQualityTests(updatedTests)
    setShowEditModal(false)
    resetForm()
    setSelectedTest(null)
  }

  const handleDeleteTest = (testId: string) => {
    if (confirm('Are you sure you want to delete this test report?')) {
      setQualityTests(qualityTests.filter(test => test.id !== testId))
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Test ID', 'Project Name', 'Test Type', 'Test Date', 'Sample ID', 'Required', 'Actual', 'Result', 'Tested By'],
      ...filteredTests.map(test => [
        test.id,
        test.projectName,
        test.testType,
        test.testDate,
        test.sampleId,
        test.requiredStrength,
        test.actualStrength,
        test.result,
        test.testedBy,
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quality_tests_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredTests = qualityTests.filter(test => {
    const matchesSearch = 
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.sampleId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterResult === 'all' || test.result === filterResult

    return matchesSearch && matchesFilter
  })

  const totalTests = qualityTests.length
  const passedTests = qualityTests.filter(t => t.result === 'Pass').length
  const failedTests = qualityTests.filter(t => t.result === 'Fail').length
  const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : '0'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quality Assurance & Testing</h1>
          <p className="text-sm text-gray-600 mt-1">Track material testing and quality control measures</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus size={20} />
          <span>Add Test Report</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Total Tests</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalTests}</h3>
              <p className="text-xs text-gray-500 mt-2">This year</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Passed</p>
              <h3 className="text-3xl font-bold text-green-600">{passedTests}</h3>
              <p className="text-xs text-green-600 mt-2">{passRate}% pass rate</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Failed</p>
              <h3 className="text-3xl font-bold text-red-600">{failedTests}</h3>
              <p className="text-xs text-gray-500 mt-2">{(100 - parseFloat(passRate)).toFixed(1)}% fail rate</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Pending Results</p>
              <h3 className="text-3xl font-bold text-orange-600">13</h3>
              <p className="text-xs text-gray-500 mt-2">In laboratory</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                {showFilterMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <button
                        onClick={() => { setFilterResult('all'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterResult === 'all' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        All Results
                      </button>
                      <button
                        onClick={() => { setFilterResult('Pass'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterResult === 'Pass' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Passed
                      </button>
                      <button
                        onClick={() => { setFilterResult('Fail'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterResult === 'Fail' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Failed
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sample ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tested By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{test.testType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(test.testDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{test.sampleId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{test.requiredStrength}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.actualStrength}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      test.result === 'Pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {test.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{test.testedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewTest(test)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Report"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditTest(test)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTest(test.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Test Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Test Report</h2>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddTest} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project ID</label>
                  <input
                    type="text"
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="PROJ-2024-XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sample ID</label>
                  <input
                    type="text"
                    name="sampleId"
                    value={formData.sampleId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="CONC-XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter project name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                  <select
                    name="testType"
                    value={formData.testType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Concrete Cube Test</option>
                    <option>Steel Bar Test</option>
                    <option>Brick Compression Test</option>
                    <option>Cement Test</option>
                    <option>Soil Test</option>
                    <option>Aggregate Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
                  <input
                    type="date"
                    name="testDate"
                    value={formData.testDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Strength</label>
                  <input
                    type="text"
                    name="requiredStrength"
                    value={formData.requiredStrength}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 25 MPa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Actual Strength</label>
                  <input
                    type="text"
                    name="actualStrength"
                    value={formData.actualStrength}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 27 MPa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
                  <input
                    type="text"
                    name="labName"
                    value={formData.labName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Testing laboratory name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Number</label>
                  <input
                    type="text"
                    name="reportNumber"
                    value={formData.reportNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="CTL/2024/XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tested By</label>
                <input
                  type="text"
                  name="testedBy"
                  value={formData.testedBy}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Lab technician name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Additional observations or notes..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Add Test Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Test Modal */}
      {showViewModal && selectedTest && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Test Report - {selectedTest.id}</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Result Badge */}
              <div className="flex justify-between items-start">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedTest.result === 'Pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {selectedTest.result}
                </span>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FileText size={16} />
                  <span>Download Report</span>
                </button>
              </div>

              {/* Test Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Test Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Test ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTest.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Project ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTest.projectId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Test Type</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTest.testType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sample ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTest.sampleId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Test Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedTest.testDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Lab & Personnel</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Project Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTest.projectName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Laboratory</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTest.labName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Report Number</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTest.reportNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tested By</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTest.testedBy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Results */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Test Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Required Strength</span>
                    <span className="text-sm font-medium text-gray-900">{selectedTest.requiredStrength}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Actual Strength</span>
                    <span className={`text-sm font-medium ${
                      selectedTest.result === 'Pass' ? 'text-green-600' : 'text-red-600'
                    }`}>{selectedTest.actualStrength}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-300 flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">Test Result</span>
                    <span className={`text-lg font-bold ${
                      selectedTest.result === 'Pass' ? 'text-green-600' : 'text-red-600'
                    }`}>{selectedTest.result}</span>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Remarks</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedTest.remarks}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Test Modal */}
      {showEditModal && selectedTest && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Test Report - {selectedTest.id}</h2>
              <button onClick={() => { setShowEditModal(false); resetForm(); setSelectedTest(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateTest} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project ID</label>
                  <input
                    type="text"
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sample ID</label>
                  <input
                    type="text"
                    name="sampleId"
                    value={formData.sampleId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                  <select
                    name="testType"
                    value={formData.testType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Concrete Cube Test</option>
                    <option>Steel Bar Test</option>
                    <option>Brick Compression Test</option>
                    <option>Cement Test</option>
                    <option>Soil Test</option>
                    <option>Aggregate Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
                  <input
                    type="date"
                    name="testDate"
                    value={formData.testDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Strength</label>
                  <input
                    type="text"
                    name="requiredStrength"
                    value={formData.requiredStrength}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Actual Strength</label>
                  <input
                    type="text"
                    name="actualStrength"
                    value={formData.actualStrength}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
                  <input
                    type="text"
                    name="labName"
                    value={formData.labName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Number</label>
                  <input
                    type="text"
                    name="reportNumber"
                    value={formData.reportNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tested By</label>
                <input
                  type="text"
                  name="testedBy"
                  value={formData.testedBy}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); resetForm(); setSelectedTest(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Test Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}