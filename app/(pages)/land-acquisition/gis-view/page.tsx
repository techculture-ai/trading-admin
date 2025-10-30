'use client'

import { useState } from 'react'
import { Map, Layers, ZoomIn, ZoomOut, Maximize, Download, X, MapPin, Info, Search, Filter, Navigation, Crosshair, Ruler } from 'lucide-react'

interface MapLayer {
  id: string
  name: string
  enabled: boolean
  color: string
  icon: string
}

interface ParcelMarker {
  id: string
  parcelId: string
  location: string
  coordinates: { lat: number; lng: number }
  status: 'Acquired' | 'In Progress' | 'Pending' | 'Disputed'
  area: string
  owner: string
  value: string
}

const initialLayers: MapLayer[] = [
  { id: 'acquired', name: 'Acquired Land', enabled: true, color: '#22c55e', icon: '●' },
  { id: 'owned', name: 'Owned Land', enabled: true, color: '#3b82f6', icon: '●' },
  { id: 'proposed', name: 'Proposed Acquisition', enabled: true, color: '#f97316', icon: '●' },
  { id: 'disputed', name: 'Disputed Land', enabled: false, color: '#ef4444', icon: '●' },
  { id: 'infrastructure', name: 'Infrastructure', enabled: false, color: '#8b5cf6', icon: '●' },
  { id: 'boundaries', name: 'Municipal Boundaries', enabled: true, color: '#6b7280', icon: '—' },
]

const parcelMarkers: ParcelMarker[] = [
  {
    id: '1',
    parcelId: 'PAR-145',
    location: 'Gomti Nagar, Lucknow',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    status: 'Acquired',
    area: '2.5 acres',
    owner: 'Ram Kumar Singh',
    value: '₹45,00,000'
  },
  {
    id: '2',
    parcelId: 'PAR-146',
    location: 'Hazratganj, Lucknow',
    coordinates: { lat: 26.8547, lng: 80.9420 },
    status: 'In Progress',
    area: '3.2 acres',
    owner: 'Geeta Devi',
    value: '₹71,80,000'
  },
  {
    id: '3',
    parcelId: 'PAR-147',
    location: 'Aliganj, Lucknow',
    coordinates: { lat: 26.8947, lng: 80.9820 },
    status: 'Pending',
    area: '1.8 acres',
    owner: 'Suresh Kumar',
    value: '₹41,50,000'
  },
  {
    id: '4',
    parcelId: 'PAR-148',
    location: 'Indira Nagar, Lucknow',
    coordinates: { lat: 26.8667, lng: 80.9962 },
    status: 'Disputed',
    area: '2.1 acres',
    owner: 'Ramesh Gupta',
    value: '₹38,50,000'
  },
]

export default function GISViewPage() {
  const [layers, setLayers] = useState<MapLayer[]>(initialLayers)
  const [showLayersPanel, setShowLayersPanel] = useState(false)
  const [showParcelInfo, setShowParcelInfo] = useState(false)
  const [selectedParcel, setSelectedParcel] = useState<ParcelMarker | null>(null)
  const [zoomLevel, setZoomLevel] = useState(12)
  const [mapStyle, setMapStyle] = useState<'satellite' | 'roadmap' | 'terrain'>('roadmap')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [measurementMode, setMeasurementMode] = useState(false)
  const [showStats, setShowStats] = useState(true)

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ))
  }

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 1, 20))
  }

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 1, 1))
  }

  const handleParcelClick = (parcel: ParcelMarker) => {
    setSelectedParcel(parcel)
    setShowParcelInfo(true)
  }

  const handleExportMap = () => {
    alert('Map exported as PNG')
  }

  const filteredParcels = parcelMarkers.filter(parcel => 
    parcel.parcelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: ParcelMarker['status']) => {
    switch (status) {
      case 'Acquired': return '#22c55e'
      case 'In Progress': return '#3b82f6'
      case 'Pending': return '#f97316'
      case 'Disputed': return '#ef4444'
    }
  }

  const parcelStats = {
    acquired: parcelMarkers.filter(p => p.status === 'Acquired').length,
    inProgress: parcelMarkers.filter(p => p.status === 'In Progress').length,
    pending: parcelMarkers.filter(p => p.status === 'Pending').length,
    disputed: parcelMarkers.filter(p => p.status === 'Disputed').length,
    totalArea: parcelMarkers.reduce((sum, p) => sum + parseFloat(p.area), 0).toFixed(1),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GIS View - Land Parcels</h1>
          <p className="text-sm text-gray-600 mt-1">Interactive map view of all land parcels and acquisitions</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExportMap}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            <span>Export Map</span>
          </button>
          <button 
            onClick={() => setShowLayersPanel(!showLayersPanel)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Layers size={20} />
            <span>Layers</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-[600px] bg-gradient-to-br from-green-50 to-blue-50">
          {/* Map Placeholder with Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}>
            {/* Simulated Map Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map size={64} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Interactive GIS Map View</p>
                <p className="text-sm text-gray-500 mt-2">Map integration with Google Maps / OpenStreetMap / ArcGIS</p>
                <p className="text-xs text-gray-400 mt-2">Zoom Level: {zoomLevel} | Style: {mapStyle}</p>
              </div>
            </div>

            {/* Parcel Markers */}
            {parcelMarkers.map((parcel, index) => {
              const layer = layers.find(l => l.id === parcel.status.toLowerCase().replace(' ', ''))
              if (!layer?.enabled) return null
              
              return (
                <button
                  key={parcel.id}
                  onClick={() => handleParcelClick(parcel)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
                  style={{
                    left: `${30 + index * 20}%`,
                    top: `${40 + index * 10}%`,
                  }}
                  title={`${parcel.parcelId} - ${parcel.location}`}
                >
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: getStatusColor(parcel.status) }}
                    >
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow text-xs font-medium">
                      {parcel.parcelId}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Top Controls Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search parcels, locations..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSearchResults(e.target.value.length > 0)
                }}
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-80 shadow-md"
              />
              {showSearchResults && searchTerm && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filteredParcels.length > 0 ? (
                    filteredParcels.map(parcel => (
                      <button
                        key={parcel.id}
                        onClick={() => {
                          handleParcelClick(parcel)
                          setShowSearchResults(false)
                          setSearchTerm('')
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{parcel.parcelId}</p>
                            <p className="text-xs text-gray-500">{parcel.location}</p>
                          </div>
                          <span 
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ 
                              backgroundColor: `${getStatusColor(parcel.status)}20`,
                              color: getStatusColor(parcel.status)
                            }}
                          >
                            {parcel.status}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">No parcels found</div>
                  )}
                </div>
              )}
            </div>

            {/* Map Style Selector */}
            <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md p-1">
              <button
                onClick={() => setMapStyle('roadmap')}
                className={`px-3 py-1 text-xs rounded ${mapStyle === 'roadmap' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setMapStyle('satellite')}
                className={`px-3 py-1 text-xs rounded ${mapStyle === 'satellite' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Satellite
              </button>
              <button
                onClick={() => setMapStyle('terrain')}
                className={`px-3 py-1 text-xs rounded ${mapStyle === 'terrain' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Terrain
              </button>
            </div>
          </div>

          {/* Map Tools - Right Side */}
          <div className="absolute top-20 right-4 flex flex-col space-y-2">
            <button 
              onClick={handleZoomIn}
              className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={20} className="text-gray-700" />
            </button>
            <button 
              onClick={handleZoomOut}
              className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={20} className="text-gray-700" />
            </button>
            <button 
              className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
              title="Fullscreen"
            >
              <Maximize size={20} className="text-gray-700" />
            </button>
            <button 
              className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
              title="My Location"
            >
              <Navigation size={20} className="text-gray-700" />
            </button>
            <button 
              onClick={() => setMeasurementMode(!measurementMode)}
              className={`p-3 rounded-lg shadow-md transition-colors ${measurementMode ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'}`}
              title="Measure Distance"
            >
              <Ruler size={20} />
            </button>
            <button 
              className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
              title="Center Map"
            >
              <Crosshair size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4 max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Legend</h3>
              <button 
                onClick={() => setShowStats(!showStats)}
                className="text-xs text-orange-600 hover:text-orange-700"
              >
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </button>
            </div>
            <div className="space-y-2">
              {layers.filter(l => l.enabled).map(layer => (
                <div key={layer.id} className="flex items-center space-x-2">
                  <span className="text-lg" style={{ color: layer.color }}>{layer.icon}</span>
                  <span className="text-xs text-gray-700">{layer.name}</span>
                </div>
              ))}
            </div>
            {showStats && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-semibold text-gray-900 mb-2">Quick Stats</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Parcels:</span>
                    <span className="font-medium text-gray-900">{parcelMarkers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Acquired:</span>
                    <span className="font-medium text-green-600">{parcelStats.acquired}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">In Progress:</span>
                    <span className="font-medium text-blue-600">{parcelStats.inProgress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-medium text-orange-600">{parcelStats.pending}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scale Bar */}
          <div className="absolute bottom-4 right-4 bg-white rounded shadow-md px-3 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-20 h-1 bg-gray-800 relative">
                <div className="absolute left-0 top-0 w-px h-2 bg-gray-800"></div>
                <div className="absolute right-0 top-0 w-px h-2 bg-gray-800"></div>
              </div>
              <span className="text-xs text-gray-700">1 km</span>
            </div>
          </div>

          {measurementMode && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Measurement Mode Active</p>
              <p className="text-xs mt-1">Click on map to measure distances</p>
            </div>
          )}
        </div>

        {/* Layers Panel */}
        {showLayersPanel && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 w-80 z-20">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Map Layers</h3>
              <button 
                onClick={() => setShowLayersPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {layers.map(layer => (
                <div key={layer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl" style={{ color: layer.color }}>{layer.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{layer.name}</span>
                  </div>
                  <button
                    onClick={() => toggleLayer(layer.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      layer.enabled ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        layer.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={() => setLayers(layers.map(l => ({ ...l, enabled: true })))}
                className="w-full px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Enable All Layers
              </button>
            </div>
          </div>
        )}

        {/* Parcel Info Panel */}
        {showParcelInfo && selectedParcel && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-xl border border-gray-200 w-96 z-20">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Parcel Information</h3>
              <button 
                onClick={() => { setShowParcelInfo(false); setSelectedParcel(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span 
                  className="px-3 py-1 text-sm font-medium rounded-full"
                  style={{ 
                    backgroundColor: `${getStatusColor(selectedParcel.status)}20`,
                    color: getStatusColor(selectedParcel.status)
                  }}
                >
                  {selectedParcel.status}
                </span>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  View Full Details →
                </button>
              </div>

              {/* Parcel Details */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Parcel ID</label>
                  <p className="mt-1 text-lg font-bold text-gray-900">{selectedParcel.parcelId}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Area</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">{selectedParcel.area}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Valuation</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">{selectedParcel.value}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Location</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedParcel.location}</p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Owner</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedParcel.owner}</p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Coordinates</label>
                  <p className="mt-1 text-sm font-mono text-gray-900">
                    {selectedParcel.coordinates.lat.toFixed(4)}° N, {selectedParcel.coordinates.lng.toFixed(4)}° E
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Get Directions
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Parcel Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
            <Info size={18} className="mr-2 text-orange-500" />
            Parcel Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Acquired</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{parcelStats.acquired} parcels</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{parcelStats.inProgress} parcels</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{parcelStats.pending} parcels</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Disputed</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{parcelStats.disputed} parcels</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Area Coverage</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Area</span>
              <span className="text-sm font-medium text-gray-900">{parcelStats.totalArea} acres</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Acquired</span>
              <span className="text-sm font-medium text-gray-900">
                {parcelMarkers.filter(p => p.status === 'Acquired')
                  .reduce((sum, p) => sum + parseFloat(p.area), 0).toFixed(1)} acres
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="text-sm font-medium text-gray-900">
                {parcelMarkers.filter(p => p.status === 'Pending')
                  .reduce((sum, p) => sum + parseFloat(p.area), 0).toFixed(1)} acres
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(parcelStats.acquired / parcelMarkers.length) * 100}%` 
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              {((parcelStats.acquired / parcelMarkers.length) * 100).toFixed(0)}% acquisition complete
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Zone-wise Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Zone A (North)</span>
              <span className="text-sm font-medium text-gray-900">56 parcels</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Zone B (South)</span>
              <span className="text-sm font-medium text-gray-900">48 parcels</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Zone C (Central)</span>
              <span className="text-sm font-medium text-gray-900">52 parcels</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">Total Zones</span>
                <span className="text-sm font-bold text-gray-900">156 parcels</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Need Help with GIS Data?</h3>
            <p className="text-sm text-orange-100">Generate reports, export data, or integrate with external GIS systems</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium">
              Generate Report
            </button>
            <button className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition-colors font-medium">
              Export GIS Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}