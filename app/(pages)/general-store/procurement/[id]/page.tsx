'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, ShoppingCart, Calendar, User, MapPin, FileText, CheckCircle, Clock, AlertCircle, DollarSign, Share2, Printer, Edit, TrendingUp, Package } from 'lucide-react'

interface ProcurementDetails {
  id: string
  poNumber: string
  vendor: string
  vendorContact: string
  vendorEmail: string
  vendorAddress: string
  category: string
  orderDate: string
  deliveryDate: string
  actualDeliveryDate?: string
  totalAmount: string
  status: 'Delivered' | 'In Transit' | 'Pending' | 'Cancelled' | 'Partial'
  items: number
  paymentTerms: string
  paymentStatus: string
  shippingAddress: string
  remarks: string
  orderDetails: {
    requisitionNumber: string
    requisitionDate: string
    approvedBy: string
    approvalDate: string
    department: string
  }
  itemsList: {
    itemCode: string
    itemName: string
    description: string
    quantity: number
    unit: string
    unitPrice: string
    taxRate: string
    totalPrice: string
    receivedQuantity?: number
    status: string
  }[]
  deliveryTracking: {
    date: string
    status: string
    location: string
    remarks: string
  }[]
  paymentSchedule: {
    milestone: string
    amount: string
    dueDate: string
    paidDate?: string
    status: string
  }[]
  documents: {
    name: string
    type: string
    uploadedDate: string
    uploadedBy: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function ProcurementDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [procurement] = useState<ProcurementDetails>({
    id: 'PO-GS-001',
    poNumber: 'PO/GS/2024/001',
    vendor: 'ABC Stationery Mart',
    vendorContact: '+91 9876543210',
    vendorEmail: 'sales@abcstationery.com',
    vendorAddress: 'Shop No. 123, Hazratganj, Lucknow - 226001',
    category: 'Stationery',
    orderDate: '2025-10-20',
    deliveryDate: '2025-10-30',
    actualDeliveryDate: '2025-10-30',
    totalAmount: '₹2,50,000',
    status: 'Delivered',
    items: 12,
    paymentTerms: 'Net 30 days',
    paymentStatus: 'Paid',
    shippingAddress: 'Main Office, Gomti Nagar, Lucknow - 226010',
    remarks: 'Regular monthly order for office stationery supplies',
    orderDetails: {
      requisitionNumber: 'REQ/2024/145',
      requisitionDate: '2025-10-15',
      approvedBy: 'Purchase Manager - Suresh Kumar',
      approvalDate: '2025-10-18',
      department: 'Admin Department',
    },
    itemsList: [
      {
        itemCode: 'STAT-001',
        itemName: 'A4 Paper (500 Sheets)',
        description: 'Premium quality copier paper',
        quantity: 200,
        unit: 'Ream',
        unitPrice: '₹350',
        taxRate: '12%',
        totalPrice: '₹78,400',
        receivedQuantity: 200,
        status: 'Received',
      },
      {
        itemCode: 'STAT-025',
        itemName: 'Ball Pens - Blue',
        description: 'Smooth writing gel pens',
        quantity: 500,
        unit: 'Box',
        unitPrice: '₹120',
        taxRate: '12%',
        totalPrice: '₹67,200',
        receivedQuantity: 500,
        status: 'Received',
      },
      {
        itemCode: 'STAT-042',
        itemName: 'File Folders',
        description: 'A4 size plastic folders',
        quantity: 300,
        unit: 'Piece',
        unitPrice: '₹25',
        taxRate: '12%',
        totalPrice: '₹8,400',
        receivedQuantity: 300,
        status: 'Received',
      },
      {
        itemCode: 'STAT-089',
        itemName: 'Stapler with Pins',
        description: 'Heavy duty stapler',
        quantity: 50,
        unit: 'Set',
        unitPrice: '₹180',
        taxRate: '18%',
        totalPrice: '₹10,620',
        receivedQuantity: 50,
        status: 'Received',
      },
    ],
    deliveryTracking: [
      {
        date: '2025-10-30',
        status: 'Delivered',
        location: 'Main Office, Lucknow',
        remarks: 'All items delivered and verified',
      },
      {
        date: '2025-10-28',
        status: 'Out for Delivery',
        location: 'Lucknow Hub',
        remarks: 'Package dispatched for delivery',
      },
      {
        date: '2025-10-25',
        status: 'In Transit',
        location: 'Delhi Sorting Center',
        remarks: 'Package in transit',
      },
      {
        date: '2025-10-22',
        status: 'Shipped',
        location: 'Vendor Warehouse - Delhi',
        remarks: 'Package picked up by courier',
      },
      {
        date: '2025-10-20',
        status: 'Order Placed',
        location: 'Purchase Office',
        remarks: 'Purchase order created and sent to vendor',
      },
    ],
    paymentSchedule: [
      {
        milestone: 'Full Payment',
        amount: '₹2,50,000',
        dueDate: '2025-11-29',
        paidDate: '2025-10-31',
        status: 'Paid',
      },
    ],
    documents: [
      {
        name: 'Purchase Order - PO-GS-001.pdf',
        type: 'Purchase Order',
        uploadedDate: '2025-10-20',
        uploadedBy: 'Purchase Manager',
      },
      {
        name: 'Vendor Quotation.pdf',
        type: 'Quotation',
        uploadedDate: '2025-10-18',
        uploadedBy: 'Purchase Manager',
      },
      {
        name: 'Delivery Challan.pdf',
        type: 'Delivery Note',
        uploadedDate: '2025-10-30',
        uploadedBy: 'Store Manager',
      },
      {
        name: 'Tax Invoice.pdf',
        type: 'Invoice',
        uploadedDate: '2025-10-30',
        uploadedBy: 'Vendor',
      },
      {
        name: 'Payment Receipt.pdf',
        type: 'Receipt',
        uploadedDate: '2025-10-31',
        uploadedBy: 'Accounts Department',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2025-10-31 14:30:00',
      action: 'Payment Completed',
      performedBy: 'Accounts Manager',
      details: 'Full payment of ₹2,50,000 processed',
    },
    {
      id: 'AL-002',
      timestamp: '2025-10-30 16:00:00',
      action: 'Delivery Completed',
      performedBy: 'Store Manager - Amit Kumar',
      details: 'All items received and verified',
    },
    {
      id: 'AL-003',
      timestamp: '2025-10-28 10:00:00',
      action: 'Shipment Dispatched',
      performedBy: 'Vendor - ABC Stationery',
      details: 'Package out for delivery',
    },
    {
      id: 'AL-004',
      timestamp: '2025-10-22 09:00:00',
      action: 'Order Confirmed',
      performedBy: 'Vendor - ABC Stationery',
      details: 'Order confirmed and processing started',
    },
    {
      id: 'AL-005',
      timestamp: '2025-10-20 11:00:00',
      action: 'PO Created',
      performedBy: 'Purchase Manager - Suresh Kumar',
      details: 'Purchase order PO/GS/2024/001 created',
    },
    {
      id: 'AL-006',
      timestamp: '2025-10-18 15:00:00',
      action: 'Requisition Approved',
      performedBy: 'Purchase Manager - Suresh Kumar',
      details: 'Purchase requisition REQ/2024/145 approved',
    },
  ])

  const handleExport = () => {
    const content = `
PURCHASE ORDER DETAILS
======================

PO Number: ${procurement.poNumber}
PO ID: ${procurement.id}
Status: ${procurement.status}

VENDOR INFORMATION
==================
Vendor Name: ${procurement.vendor}
Contact: ${procurement.vendorContact}
Email: ${procurement.vendorEmail}
Address: ${procurement.vendorAddress}

ORDER DETAILS
=============
Order Date: ${new Date(procurement.orderDate).toLocaleDateString('en-IN')}
Expected Delivery: ${new Date(procurement.deliveryDate).toLocaleDateString('en-IN')}
${procurement.actualDeliveryDate ? `Actual Delivery: ${new Date(procurement.actualDeliveryDate).toLocaleDateString('en-IN')}` : ''}
Category: ${procurement.category}
Total Items: ${procurement.items}
Total Amount: ${procurement.totalAmount}
Payment Terms: ${procurement.paymentTerms}
Payment Status: ${procurement.paymentStatus}

SHIPPING ADDRESS
================
${procurement.shippingAddress}

REQUISITION DETAILS
===================
Requisition Number: ${procurement.orderDetails.requisitionNumber}
Requisition Date: ${new Date(procurement.orderDetails.requisitionDate).toLocaleDateString('en-IN')}
Approved By: ${procurement.orderDetails.approvedBy}
Approval Date: ${new Date(procurement.orderDetails.approvalDate).toLocaleDateString('en-IN')}
Department: ${procurement.orderDetails.department}

ITEMS LIST
==========
${procurement.itemsList.map((item, i) => `
${i + 1}. ${item.itemName} (${item.itemCode})
   Description: ${item.description}
   Quantity: ${item.quantity} ${item.unit}
   Unit Price: ${item.unitPrice}
   Tax Rate: ${item.taxRate}
   Total: ${item.totalPrice}
   Received: ${item.receivedQuantity || 0} ${item.unit}
   Status: ${item.status}
`).join('\n')}

DELIVERY TRACKING
=================
${procurement.deliveryTracking.map(d => `${d.date} - ${d.status}\n   Location: ${d.location}\n   ${d.remarks}`).join('\n\n')}

PAYMENT SCHEDULE
================
${procurement.paymentSchedule.map(p => `Milestone: ${p.milestone}\n   Amount: ${p.amount}\n   Due Date: ${p.dueDate}\n   ${p.paidDate ? `Paid Date: ${p.paidDate}` : 'Pending'}\n   Status: ${p.status}`).join('\n\n')}

REMARKS
=======
${procurement.remarks}

DOCUMENTS
=========
${procurement.documents.map(d => `${d.name} (${d.type})\n   Uploaded: ${d.uploadedDate} by ${d.uploadedBy}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `PO_${procurement.poNumber.replace(/\//g, '_')}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700'
      case 'In Transit':
        return 'bg-blue-100 text-blue-700'
      case 'Partial':
        return 'bg-yellow-100 text-yellow-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle size={40} className="text-green-600" />
      case 'In Transit':
        return <TrendingUp size={40} className="text-blue-600" />
      case 'Partial':
        return <Clock size={40} className="text-yellow-600" />
      case 'Cancelled':
        return <AlertCircle size={40} className="text-red-600" />
      case 'Pending':
        return <Clock size={40} className="text-orange-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const subtotal = procurement.itemsList.reduce((sum, item) => 
    sum + parseFloat(item.totalPrice.replace(/[^0-9]/g, '')), 0
  )

  const daysToDelivery = Math.ceil((new Date(procurement.deliveryDate).getTime() - new Date(procurement.orderDate).getTime()) / (1000 * 60 * 60 * 24))

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
            <h1 className="text-2xl font-bold text-gray-900">Purchase Order {procurement.poNumber}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {procurement.vendor} • {procurement.category}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(procurement.status)}`}>
            {procurement.status}
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
        procurement.status === 'Delivered' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        procurement.status === 'In Transit' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        procurement.status === 'Partial' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
        procurement.status === 'Cancelled' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              procurement.status === 'Delivered' ? 'text-green-100' :
              procurement.status === 'In Transit' ? 'text-blue-100' :
              procurement.status === 'Partial' ? 'text-yellow-100' :
              procurement.status === 'Cancelled' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              Order Status
            </p>
            <h2 className="text-4xl font-bold">{procurement.status}</h2>
            <p className={`text-sm mt-2 ${
              procurement.status === 'Delivered' ? 'text-green-100' :
              procurement.status === 'In Transit' ? 'text-blue-100' :
              procurement.status === 'Partial' ? 'text-yellow-100' :
              procurement.status === 'Cancelled' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              Total Amount: {procurement.totalAmount} • {procurement.items} Items • Payment: {procurement.paymentStatus}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(procurement.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Amount</p>
              <h3 className="text-2xl font-bold text-gray-900">{procurement.totalAmount}</h3>
              <p className="text-xs text-gray-500 mt-2">{procurement.items} items</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Order Date</p>
              <h3 className="text-lg font-bold text-blue-600">
                {new Date(procurement.orderDate).toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </h3>
              <p className="text-xs text-gray-500 mt-2">{daysToDelivery} days lead time</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Delivery Date</p>
              <h3 className="text-lg font-bold text-purple-600">
                {new Date(procurement.deliveryDate).toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </h3>
              <p className="text-xs text-gray-500 mt-2">Expected</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Payment Status</p>
              <h3 className="text-lg font-bold text-orange-600">{procurement.paymentStatus}</h3>
              <p className="text-xs text-gray-500 mt-2">{procurement.paymentTerms}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Vendor Information
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Vendor Name</p>
            <p className="text-sm font-medium text-gray-900">{procurement.vendor}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
            <p className="text-sm font-medium text-gray-900">{procurement.vendorContact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900">{procurement.vendorEmail}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Vendor Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1" />
              {procurement.vendorAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <ShoppingCart size={20} className="mr-2" />
          Order Details
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">PO Number</p>
            <p className="text-sm font-medium text-gray-900">{procurement.poNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PO ID</p>
            <p className="text-sm font-medium text-gray-900">{procurement.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Category</p>
            <p className="text-sm font-medium text-gray-900">{procurement.category}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Items</p>
            <p className="text-sm font-medium text-gray-900">{procurement.items} items</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Requisition Number</p>
            <p className="text-sm font-medium text-gray-900">{procurement.orderDetails.requisitionNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Requisition Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(procurement.orderDetails.requisitionDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Approved By</p>
            <p className="text-sm font-medium text-gray-900">{procurement.orderDetails.approvedBy}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Department</p>
            <p className="text-sm font-medium text-gray-900">{procurement.orderDetails.department}</p>
          </div>
          <div className="col-span-4">
            <p className="text-xs text-gray-500 mb-1">Shipping Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1" />
              {procurement.shippingAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Package size={20} className="mr-2" />
            Items List ({procurement.items} items)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {procurement.itemsList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.itemName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unitPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.taxRate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{item.totalPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.receivedQuantity || 0} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Received' ? 'bg-green-100 text-green-700' :
                      item.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <div className="w-80 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (GST):</span>
                <span className="font-medium text-gray-900">Included</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-300">
                <span className="text-base font-bold text-gray-900">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">{procurement.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Tracking */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Delivery Tracking
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {procurement.deliveryTracking.map((tracking, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== procurement.deliveryTracking.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                  tracking.status === 'Delivered' ? 'bg-green-100' :
                  tracking.status === 'Out for Delivery' ? 'bg-blue-100' :
                  tracking.status === 'In Transit' ? 'bg-yellow-100' :
                  'bg-orange-100'
                }`}>
                  <CheckCircle size={16} className={
                    tracking.status === 'Delivered' ? 'text-green-600' :
                    tracking.status === 'Out for Delivery' ? 'text-blue-600' :
                    tracking.status === 'In Transit' ? 'text-yellow-600' :
                    'text-orange-600'
                  } />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tracking.status}</p>
                      <p className="text-sm text-gray-600 mt-1">{tracking.remarks}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <p className="text-xs text-gray-500">
                          <MapPin size={12} className="inline mr-1" />
                          {tracking.location}
                        </p>
                        <p className="text-xs text-gray-500">
                          <Calendar size={12} className="inline mr-1" />
                          {new Date(tracking.date).toLocaleDateString('en-IN', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <DollarSign size={20} className="mr-2" />
            Payment Schedule
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Milestone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {procurement.paymentSchedule.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.milestone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(payment.dueDate).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payment.paidDate 
                      ? new Date(payment.paidDate).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })
                      : '-'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      payment.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
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
            Documents ({procurement.documents.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {procurement.documents.map((doc, index) => (
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

      {/* Remarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Remarks & Notes
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {procurement.remarks}
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
            <p className="text-xs text-gray-600 mb-2">PO Number</p>
            <p className="text-lg font-bold text-gray-900">{procurement.poNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Vendor</p>
            <p className="text-sm font-bold text-blue-600">{procurement.vendor}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Amount</p>
            <p className="text-lg font-bold text-green-600">{procurement.totalAmount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Items</p>
            <p className="text-lg font-bold text-purple-600">{procurement.items}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              procurement.status === 'Delivered' ? 'text-green-600' :
              procurement.status === 'In Transit' ? 'text-blue-600' :
              procurement.status === 'Partial' ? 'text-yellow-600' :
              procurement.status === 'Cancelled' ? 'text-red-600' :
              'text-orange-600'
            }`}>
              {procurement.status}
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
          <span>Download PO</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit PO</span>
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