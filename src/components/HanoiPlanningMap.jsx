import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  MAP_BASE_URL,
  GLYPHS_URL,
  HANOI_CENTER,
  HANOI_ZOOM,
  BASE_LAYERS,
  ZONING_LAYERS,
  METRO_PLANNED_LAYERS,
  AIRPORT_LAYERS,
  GA_DUKIEN_LAYERS,
  METRO_ACTIVE_LAYERS,
  ZFILL_OPACITY
} from '../utils/mapConfig';

export default function HanoiPlanningMap({
  layerState,
  isMetroView,
  setSelectedFeature,
  mapRef
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      hash: true,
      center: HANOI_CENTER,
      zoom: HANOI_ZOOM,
      minZoom: 8,
      maxZoom: 17,
      transformRequest: (url) => {
        // Redirect absolute gateway.datviet.ai URLs through local Vite proxy on localhost
        if (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) {
          if (url.startsWith('https://gateway.datviet.ai')) {
            return {
              url: url.replace('https://gateway.datviet.ai', window.location.origin)
            };
          }
        }
        return { url };
      },
      style: {
        version: 8,
        glyphs: GLYPHS_URL,
        sources: {
          openmaptiles: {
            type: 'vector',
            url: `${MAP_BASE_URL}/api/tiles/basemap-hanoi/tilejson.json`,
            attribution: '© DatViet AI · OpenMapTiles · Hà Nội'
          },
          hn: {
            type: 'vector',
            url: `${MAP_BASE_URL}/api/tiles/hanoi/tilejson.json`
          },
          metro: { type: 'geojson', data: '/metro-hanoi.geojson' },
          metrop: { type: 'geojson', data: '/metro-hanoi-planned.geojson' },
          gadk: { type: 'geojson', data: '/metro-hanoi-ga-dukien.geojson' },
          apt: { type: 'geojson', data: '/hanoi-airports.geojson' }
        },
        layers: [
          {
            id: 'bg',
            type: 'background',
            paint: { 'background-color': '#f4f3ee' }
          },
          ...BASE_LAYERS,
          ...ZONING_LAYERS,
          ...AIRPORT_LAYERS,
          ...METRO_PLANNED_LAYERS,
          ...GA_DUKIEN_LAYERS,
          ...METRO_ACTIVE_LAYERS
        ]
      }
    });

    mapInstanceRef.current = map;
    if (mapRef) mapRef.current = map;

    // Controls
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.GeolocateControl({ trackUserLocation: true }), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100 }), 'bottom-left');

    map.on('load', () => {
      // Highlight selection overlay source & layers
      map.addSource('sel', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      map.addLayer({
        id: 'sel-fill',
        type: 'fill',
        source: 'sel',
        paint: { 'fill-color': '#2563eb', 'fill-opacity': 0.2 }
      });

      map.addLayer({
        id: 'sel-line',
        type: 'line',
        source: 'sel',
        paint: { 'line-color': '#1d4ed8', 'line-width': 2.8, 'line-opacity': 0.95 }
      });
    });

    // Handle Map Clicks
    map.on('click', (e) => {
      // Check stations / lines first
      const stationFs = map.queryRenderedFeatures(e.point, {
        layers: ['metro-st', 'metrop-line', 'gadk-ring']
      });

      if (stationFs.length > 0) {
        const feat = stationFs[0];
        const props = feat.properties || {};

        if (feat.layer.id === 'metro-st') {
          new maplibregl.Popup({ maxWidth: '240px' })
            .setLngLat(e.lngLat)
            .setHTML(
              `<div style="font-size:12px; font-family:sans-serif;">
                <span style="background:#0a7d3b; color:white; padding:2px 8px; border-radius:10px; font-weight:bold; font-size:10px;">Ga Metro Operational</span>
                <div style="font-weight:bold; margin-top:6px; font-size:13px; color:#111;">${props.name || ''}</div>
              </div>`
            )
            .addTo(map);
          return;
        }

        if (feat.layer.id === 'metrop-line') {
          new maplibregl.Popup({ maxWidth: '250px' })
            .setLngLat(e.lngLat)
            .setHTML(
              `<div style="font-size:12px; font-family:sans-serif;">
                <span style="background:${props.color || '#555'}; color:white; padding:2px 8px; border-radius:10px; font-weight:bold; font-size:10px;">Hành lang ${props.line || ''} · Quy hoạch</span>
                <div style="font-weight:bold; margin-top:6px; font-size:13px; color:#111;">Hướng tuyến đường sắt đô thị</div>
                <div style="color:#6b7280; font-size:11px; margin-top:4px;">Theo QHTT Thủ đô tầm nhìn 100 năm (QĐ 2512/QĐ-UBND).</div>
              </div>`
            )
            .addTo(map);
          return;
        }

        if (feat.layer.id === 'gadk-ring') {
          new maplibregl.Popup({ maxWidth: '260px' })
            .setLngLat(e.lngLat)
            .setHTML(
              `<div style="font-size:12px; font-family:sans-serif;">
                <span style="background:#f59e0b; color:white; padding:2px 8px; border-radius:10px; font-weight:bold; font-size:10px;">Vị trí ga dự kiến</span>
                <div style="font-weight:bold; margin-top:6px; font-size:13px; color:#111;">${props.ward || 'Vị trí sơ bộ'}</div>
                <div style="color:#6b7280; font-size:11px; margin-top:4px;">Nguồn trích từ đồ án Điều chỉnh QHC Thủ đô (QĐ 1668/QĐ-TTg).</div>
              </div>`
            )
            .addTo(map);
          return;
        }
      }

      // Check zoning polygons
      const zoningFs = map.queryRenderedFeatures(e.point, {
        layers: ['qhpk-fill', 'qhc-fill', 'zon-line']
      });

      if (zoningFs.length > 0) {
        const feat = zoningFs[0];
        setSelectedFeature(feat);

        const selSource = map.getSource('sel');
        if (selSource) {
          selSource.setData({
            type: 'Feature',
            geometry: feat.geometry,
            properties: {}
          });
        }
      } else {
        setSelectedFeature(null);
        const selSource = map.getSource('sel');
        if (selSource) {
          selSource.setData({ type: 'FeatureCollection', features: [] });
        }
      }
    });

    // Cursors
    const hoverableLayers = ['qhc-fill', 'qhpk-fill', 'metro-st', 'metrop-line', 'gadk-ring'];
    hoverableLayers.forEach((id) => {
      map.on('mouseenter', id, () => (map.getCanvas().style.cursor = 'pointer'));
      map.on('mouseleave', id, () => (map.getCanvas().style.cursor = ''));
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Layer Visibility & Styling when layerState / isMetroView changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // Helper visibility toggle
    const toggle = (layerId, visible) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
      }
    };

    toggle('qhc-fill', layerState.qhc);
    toggle('qhpk-fill', layerState.qhpk);
    toggle('zon-line', layerState.qhc || layerState.qhpk);
    toggle('zon-outline', layerState.qhc || layerState.qhpk);

    const activeMetro = ['metro-casing', 'metro-op', 'metro-uc', 'metro-pr', 'metro-st', 'metro-lbl'];
    activeMetro.forEach((id) => toggle(id, layerState.metro));

    toggle('metrop-line', layerState.metrop);
    toggle('gadk-halo', layerState.gadk);
    toggle('gadk-ring', layerState.gadk);

    // Opacity boost slider
    const fillOp = layerState.opacityBoost ? 0.28 : ZFILL_OPACITY;
    if (map.getLayer('qhc-fill')) map.setPaintProperty('qhc-fill', 'fill-opacity', fillOp);
    if (map.getLayer('qhpk-fill')) map.setPaintProperty('qhpk-fill', 'fill-opacity', fillOp + 0.08);

    // Background color for metro dark vs light
    if (map.getLayer('bg')) {
      map.setPaintProperty('bg', 'background-color', isMetroView ? '#080c18' : '#f4f3ee');
    }
  }, [layerState, isMetroView]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
