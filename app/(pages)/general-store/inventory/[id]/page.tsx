'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Package, DollarSign, AlertTriangle, TrendingUp, MapPin, User, FileText, CheckCircle, Clock, BarChart3, Share2, Printer, Edit, Calendar } from 'lucide-react'

interface InventoryItemDetails {
  id: string
  itemCode: string
  itemName: string
  category: string
  unit: string
  currentStock: number
  reorderLevel: number
  maxStock: number
  unitPrice: string
  totalValue: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  supplier: string
  location: string
  description: string
  lastPurchaseDate: string
  lastIssueDate: string
  itemInfo: {
    manufacturer: string
    model: string
    specifications: string
    warranty: string
    hsn: string
  }
  stockMovement: {
    date: string
    type: 'Inward' | 'Outward' | 'Adjustment'
    quantity: number
    reference: string
    remarks: string
    balanceStock: number
  }[]
  usageHistory: {
    department: string
    quantity: number
    date: string
    purpose: string
    issuedTo: string
  }[]
  purchaseHistory: {
    orderDate: string
    quantity: number
    supplier: string
    unitPrice: string
    totalAmount: string
    receiveDate: string
    status: 'Received' | 'Pending' | 'Partial'
  }[]
  reorderAlerts: {
    message: string
    severity: 'Critical' | 'Warning' | 'Info'
    date: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function GeneralStoreInventoryDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [item] = useState<InventoryItemDetails>({
    id: 'INV-GS-001',
    itemCode: 'STAT-001',
    itemName: 'A4 Paper (500 Sheets)',
    category: 'Stationery',
    unit: 'Ream',
    currentStock: 450,
    reorderLevel: 100,
    maxStock: 1000,
    unitPrice: '₹350',
    totalValue: '₹1,57,500',
    status: 'In Stock',
    supplier: 'JK Paper Ltd.',
    location: 'Store Room A - Shelf 1',
    description: 'Premium quality A4 size copier paper, 500 sheets per ream. 80 GSM, bright white finish suitable for all types of printing and copying.',
    lastPurchaseDate: '2025-10-15',
    lastIssueDate: '2025-10-28',
    itemInfo: {
      manufacturer: 'JK Paper Ltd.',
      model: 'JK Copier - A4',
      specifications: '210mm x 297mm, 80 GSM, 500 sheets',
      warranty: 'N/A',
      hsn: '48025610',
    },
    stockMovement: [
      {
        date: '2025-10-28',
        type: 'Outward',
        quantity: -50,
        reference: 'ISS/GS/2024/156',
        remarks: 'Issued to Accounts Department',
        balanceStock: 450,
      },
      {
        date: '2025-10-15',
        type: 'Inward',
        quantity: 200,
        reference: 'PO/2024/789',
        remarks: 'Stock replenishment order',
        balanceStock: 500,
      },
      {
        date: '2025-10-10',
        type: 'Outward',
        quantity: -100,
        reference: 'ISS/GS/2024/145',
        remarks: 'Issued to Engineering Department',
        balanceStock: 300,
      },
      {
        date: '2025-10-05',
        type: 'Adjustment',
        quantity: -10,
        reference: 'ADJ/2024/023',
        remarks: 'Stock adjustment - damaged items',
        balanceStock: 400,
      },
      {
        date: '2025-09-20',
        type: 'Inward',
        quantity: 300,
        reference: 'PO/2024/678',
        remarks: 'Regular purchase order',
        balanceStock: 410,
      },
    ],
    usageHistory: [
      {
        department: 'Accounts Department',
        quantity: 50,
        date: '2025-10-28',
        purpose: 'Monthly reporting and documentation',
        issuedTo: 'Priya Verma',
      },
      {
        department: 'Engineering Department',
        quantity: 100,
        date: '2025-10-10',
        purpose: 'Project documentation',
        issuedTo: 'Rajesh Kumar',
      },
      {
        department: 'HR Department',
        quantity: 75,
        date: '2025-09-25',
        purpose: 'Employee records maintenance',
        issuedTo: 'Amit Singh',
      },
      {
        department: 'Admin Department',
        quantity: 60,
        date: '2025-09-15',
        purpose: 'General office use',
        issuedTo: 'Sunita Sharma',
      },
    ],
    purchaseHistory: [
      {
        orderDate: '2025-10-10',
        quantity: 200,
        supplier: 'JK Paper Ltd.',
        unitPrice: '₹350',
        totalAmount: '₹70,000',
        receiveDate: '2025-10-15',
        status: 'Received',
      },
      {
        orderDate: '2025-09-15',
        quantity: 300,
        supplier: 'JK Paper Ltd.',
        unitPrice: '₹345',
        totalAmount: '₹1,03,500',
        receiveDate: '2025-09-20',
        status: 'Received',
      },
      {
        orderDate: '2025-08-10',
        quantity: 250,
        supplier: 'JK Paper Ltd.',
        unitPrice: '₹340',
        totalAmount: '₹85,000',
        receiveDate: '2025-08-15',
        status: 'Received',
      },
    ],
    reorderAlerts: [
      {
        message: 'Stock level is healthy - 450 units available',
        severity: 'Info',
        date: '2025-10-31',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2025-10-28 14:30:00',
      action: 'Stock Issued',
      performedBy: 'Store Manager - Amit Kumar',
      details: '50 reams issued to Accounts Department',
    },
    {
      id: 'AL-002',
      timestamp: '2025-10-15 10:00:00',
      action: 'Stock Received',
      performedBy: 'Store Manager - Amit Kumar',
      details: '200 reams received from JK Paper Ltd.',
    },
    {
      id: 'AL-003',
      timestamp: '2025-10-10 11:00:00',
      action: 'Stock Issued',
      performedBy: 'Store Manager - Amit Kumar',
      details: '100 reams issued to Engineering Department',
    },
    {
      id: 'AL-004',
      timestamp: '2025-10-10 09:00:00',
      action: 'Purchase Order Created',
      performedBy: 'Purchase Manager',
      details: 'Purchase order PO/2024/789 placed for 200 reams',
    },
    {
      id: 'AL-005',
      timestamp: '2025-10-05 15:00:00',
      action: 'Stock Adjustment',
      performedBy: 'Store Manager - Amit Kumar',
      details: 'Adjusted 10 reams - damaged items',
    },
  ])

  const handleExport = () => {
    const content = `
GENERAL STORE INVENTORY REPORT
==============================

Item ID: ${item.id}
Item Code: ${item.itemCode}
Status: ${item.status}

ITEM INFORMATION
================
Item Name: ${item.itemName}
Category: ${item.category}
Unit: ${item.unit}
Manufacturer: ${item.itemInfo.manufacturer}
Model: ${item.itemInfo.model}
Specifications: ${item.itemInfo.specifications}
HSN Code: ${item.itemInfo.hsn}

STOCK INFORMATION
=================
Current Stock: ${item.currentStock} ${item.unit}
Reorder Level: ${item.reorderLevel} ${item.unit}
Maximum Stock: ${item.maxStock} ${item.unit}
Unit Price: ${item.unitPrice}
Total Value: ${item.totalValue}

SUPPLIER & LOCATION
===================
Primary Supplier: ${item.supplier}
Storage Location: ${item.location}
Last Purchase Date: ${new Date(item.lastPurchaseDate).toLocaleDateString('en-IN')}
Last Issue Date: ${new Date(item.lastIssueDate).toLocaleDateString('en-IN')}

STOCK MOVEMENT (Recent)
=======================
${item.stockMovement.map(m => `${m.date} - ${m.type}: ${m.quantity} ${item.unit}\n   Reference: ${m.reference}\n   Balance: ${m.balanceStock}\n   ${m.remarks}`).join('\n\n')}

USAGE HISTORY
=============
${item.usageHistory.map(u => `${u.date} - ${u.department}\n   Quantity: ${u.quantity} ${item.unit}\n   Purpose: ${u.purpose}\n   Issued To: ${u.issuedTo}`).join('\n\n')}

PURCHASE HISTORY
================
${item.purchaseHistory.map(p => `${p.orderDate} - ${p.quantity} ${item.unit}\n   Supplier: ${p.supplier}\n   Unit Price: ${p.unitPrice}\n   Total: ${p.totalAmount}\n   Status: ${p.status}`).join('\n\n')}

DESCRIPTION
===========
${item.description}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inventory_${item.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-700'
      case 'Low Stock':
        return 'bg-orange-100 text-orange-700'
      case 'Out of Stock':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Low Stock':
        return <AlertTriangle size={40} className="text-orange-600" />
      case 'Out of Stock':
        return <AlertTriangle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const stockPercentage = ((item.currentStock / item.maxStock) * 100).toFixed(1)
  const totalInward = item.stockMovement.filter(m => m.type === 'Inward').reduce((sum, m) => sum + m.quantity, 0)
  const totalOutward = item.stockMovement.filter(m => m.type === 'Outward').reduce((sum, m) => sum + Math.abs(m.quantity), 0)
  const totalUsage = item.usageHistory.reduce((sum, u) => sum + u.quantity, 0)

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
            <h1 className="text-2xl font-bold text-gray-900">{item.itemName}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {item.itemCode} • {item.category}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(item.status)}`}>
            {item.status}
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
        item.status === 'In Stock' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        item.status === 'Low Stock' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              item.status === 'In Stock' ? 'text-green-100' :
              item.status === 'Low Stock' ? 'text-orange-100' :
              'text-red-100'
            }`}>
              Stock Status
            </p>
            <h2 className="text-4xl font-bold">{item.status}</h2>
            <p className={`text-sm mt-2 ${
              item.status === 'In Stock' ? 'text-green-100' :
              item.status === 'Low Stock' ? 'text-orange-100' :
              'text-red-100'
            }`}>
              Current Stock: {item.currentStock} {item.unit} • Value: {item.totalValue}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(item.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Current Stock</p>
              <h3 className="text-2xl font-bold text-gray-900">{item.currentStock}</h3>
              <p className="text-xs text-gray-500 mt-2">{item.unit}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Value</p>
              <h3 className="text-2xl font-bold text-blue-600">{item.totalValue}</h3>
              <p className="text-xs text-gray-500 mt-2">@ {item.unitPrice}/unit</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Reorder Level</p>
              <h3 className="text-2xl font-bold text-orange-600">{item.reorderLevel}</h3>
              <p className="text-xs text-gray-500 mt-2">{item.unit}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Max Stock</p>
              <h3 className="text-2xl font-bold text-purple-600">{item.maxStock}</h3>
              <p className="text-xs text-gray-500 mt-2">{item.unit}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stock Level Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock Level</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Current Stock vs Maximum Capacity</span>
            <span className="font-medium text-gray-900">{stockPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                parseFloat(stockPercentage) > 50 ? 'bg-green-500' :
                parseFloat(stockPercentage) > 20 ? 'bg-orange-500' :
                'bg-red-500'
              }`}
              style={{ width: `${stockPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Current: {item.currentStock}</span>
            <span>Reorder: {item.reorderLevel}</span>
            <span>Max: {item.maxStock}</span>
          </div>
        </div>
      </div>

      {/* Reorder Alerts */}
      {item.reorderAlerts.length > 0 && (
        <div className="space-y-3">
          {item.reorderAlerts.map((alert, index) => (
            <div 
              key={index}
              className={`rounded-lg p-4 flex items-start space-x-3 ${
                alert.severity === 'Critical' ? 'bg-red-50 border border-red-200' :
                alert.severity === 'Warning' ? 'bg-orange-50 border border-orange-200' :
                'bg-blue-50 border border-blue-200'
              }`}
            >
              <AlertTriangle 
                size={20} 
                className={
                  alert.severity === 'Critical' ? 'text-red-600' :
                  alert.severity === 'Warning' ? 'text-orange-600' :
                  'text-blue-600'
                }
              />
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  alert.severity === 'Critical' ? 'text-red-900' :
                  alert.severity === 'Warning' ? 'text-orange-900' :
                  'text-blue-900'
                }`}>
                  {alert.message}
                </p>
                <p className={`text-xs mt-1 ${
                  alert.severity === 'Critical' ? 'text-red-700' :
                  alert.severity === 'Warning' ? 'text-orange-700' :
                  'text-blue-700'
                }`}>
                  {new Date(alert.date).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Item Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Item ID</p>
            <p className="text-sm font-medium text-gray-900">{item.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Item Code</p>
            <p className="text-sm font-medium text-gray-900">{item.itemCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Category</p>
            <p className="text-sm font-medium text-gray-900">{item.category}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Unit</p>
            <p className="text-sm font-medium text-gray-900">{item.unit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Manufacturer</p>
            <p className="text-sm font-medium text-gray-900">{item.itemInfo.manufacturer}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Model</p>
            <p className="text-sm font-medium text-gray-900">{item.itemInfo.model}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Specifications</p>
            <p className="text-sm font-medium text-gray-900">{item.itemInfo.specifications}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">HSN Code</p>
            <p className="text-sm font-medium text-gray-900">{item.itemInfo.hsn}</p>
          </div>
        </div>
      </div>

      {/* Supplier & Location */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Supplier & Storage Information
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Primary Supplier</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {item.supplier}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Storage Location</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1" />
              {item.location}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Last Purchase Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(item.lastPurchaseDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Last Issue Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(item.lastIssueDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stock Movement Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 size={20} className="mr-2" />
          Stock Movement Summary
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Total Inward</p>
            <p className="text-2xl font-bold text-green-900">{totalInward}</p>
            <p className="text-xs text-green-600 mt-1">{item.unit}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-700 mb-2">Total Outward</p>
            <p className="text-2xl font-bold text-red-900">{totalOutward}</p>
            <p className="text-xs text-red-600 mt-1">{item.unit}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Net Movement</p>
            <p className="text-2xl font-bold text-blue-900">{totalInward - totalOutward}</p>
            <p className="text-xs text-blue-600 mt-1">{item.unit}</p>
          </div>
        </div>
      </div>

      {/* Stock Movement History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Stock Movement History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {item.stockMovement.map((movement, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(movement.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      movement.type === 'Inward' ? 'bg-green-100 text-green-700' :
                      movement.type === 'Outward' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {movement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {movement.quantity > 0 ? '+' : ''}{movement.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{movement.reference}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movement.balanceStock}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{movement.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Department Usage History</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {item.usageHistory.map((usage, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{usage.department}</p>
                  <p className="text-sm text-gray-600 mt-1">{usage.purpose}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-xs text-gray-500">
                      Quantity: <span className="font-medium text-gray-900">{usage.quantity} {item.unit}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Issued To: <span className="font-medium text-gray-900">{usage.issuedTo}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Date: {new Date(usage.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receive Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {item.purchaseHistory.map((purchase, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(purchase.orderDate).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {purchase.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{purchase.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.unitPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{purchase.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(purchase.receiveDate).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      purchase.status === 'Received' ? 'bg-green-100 text-green-700' :
                      purchase.status === 'Partial' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {purchase.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Item Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {item.description}
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
            <p className="text-xs text-gray-600 mb-2">Item ID</p>
            <p className="text-lg font-bold text-gray-900">{item.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Current Stock</p>
            <p className="text-lg font-bold text-green-600">{item.currentStock} {item.unit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Value</p>
            <p className="text-sm font-bold text-blue-600">{item.totalValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Usage</p>
            <p className="text-lg font-bold text-purple-600">{totalUsage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              item.status === 'In Stock' ? 'text-green-600' :
              item.status === 'Low Stock' ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {item.status}
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
          <span>Edit Item</span>
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