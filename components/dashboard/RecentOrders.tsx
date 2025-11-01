'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'

interface Order {
  id: string
  date: string
  customer: string
  category: string
  status: string
  items: number
  total: string
}

interface RecentOrdersProps {
  orders: Order[]
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [sortBy, setSortBy] = useState('date')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const filteredOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
      return matchesSearch && matchesStatus
    })

    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === 'amount') {
      filtered.sort((a, b) => {
        const amountA = parseInt(a.total.replace(/[^0-9]/g, ''))
        const amountB = parseInt(b.total.replace(/[^0-9]/g, ''))
        return amountB - amountA
      })
    }

    return filtered
  }, [orders, searchTerm, selectedStatus, sortBy])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(o => o.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-500 mt-1">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} 
              {selectedOrders.length > 0 && ` (${selectedOrders.length} selected)`}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
              >
                <Filter size={16} />
                <span>Status</span>
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    {['all', 'Completed', 'Pending', 'Processing', 'Cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status)
                          setShowFilterDropdown(false)
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm rounded ${
                          selectedStatus === status
                            ? 'bg-orange-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 cursor-pointer"
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 cursor-pointer"
                    checked={selectedOrders.includes(order.id)}
                    onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.items} Item{order.items > 1 ? 's' : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}