import React, { useState, useRef } from 'react';
import Header from './components/Header';
import HanoiPlanningMap from './components/HanoiPlanningMap';
import LayerControlPanel from './components/LayerControlPanel';
import FeatureCard from './components/FeatureCard';
import PlanningSummary from './components/PlanningSummary';

export default function App() {
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'overview'
  const [isMetroView, setIsMetroView] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const mapRef = useRef(null);

  const [layerState, setLayerState] = useState({
    qhc: true,
    qhpk: true,
    metro: true,
    metrop: true,
    gadk: true,
    opacityBoost: false
  });

  const handleFlyToLocation = (center, zoom) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center,
        zoom,
        essential: true,
        duration: 1800
      });
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Header */}
      <Header
        isMetroView={isMetroView}
        setIsMetroView={setIsMetroView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {activeTab === 'map' ? (
          <div className="w-full h-full relative">
            
            {/* Map Canvas */}
            <HanoiPlanningMap
              layerState={layerState}
              isMetroView={isMetroView}
              setSelectedFeature={setSelectedFeature}
              mapRef={mapRef}
            />

            {/* Floating Top-Left Layer Control Panel */}
            <div className="absolute top-4 left-4 z-20">
              <LayerControlPanel
                layerState={layerState}
                setLayerState={setLayerState}
                isMetroView={isMetroView}
                setIsMetroView={setIsMetroView}
                onFlyToLocation={handleFlyToLocation}
              />
            </div>

            {/* Floating Bottom-Left Inspector Card */}
            {selectedFeature && (
              <div className="absolute bottom-6 left-4 z-30">
                <FeatureCard
                  feature={selectedFeature}
                  onClose={() => setSelectedFeature(null)}
                  isMetroView={isMetroView}
                />
              </div>
            )}

            {/* Bottom Disclaimer Banner */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-[11px] text-slate-500 bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-full shadow-xs border border-slate-200/50 backdrop-blur-xs text-center max-w-md truncate">
              Dữ liệu Vector Tiles PBF: gateway.datviet.ai · Tham khảo QĐ 2512/QĐ-UBND
            </div>

          </div>
        ) : (
          <div className="h-full overflow-y-auto bg-slate-50">
            <PlanningSummary />
          </div>
        )}
      </main>
    </div>
  );
}
