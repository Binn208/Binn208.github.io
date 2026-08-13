import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  MAP_BASE_URL, HANOI_CENTER, HANOI_ZOOM,
  ZONING_LAYERS, METRO_PLANNED_LAYERS, AIRPORT_LAYERS,
  GA_DUKIEN_LAYERS, METRO_ACTIVE_LAYERS, ZFILL_OPACITY
} from '../utils/mapConfig';

export default function HanoiPlanningMap({ layerState, isMetroView, setSelectedFeature, mapRef }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      hash: true,
      center: HANOI_CENTER,
      zoom: HANOI_ZOOM,
      minZoom: 8, maxZoom: 17,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
    });

    mapInstanceRef.current = map;
    if (mapRef) mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.GeolocateControl({ trackUserLocation: true }), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100 }), 'bottom-left');

    map.on('load', () => {
      map.addSource('hn', {
        type: 'vector',
        url: `https://corsproxy.io/?${encodeURIComponent(`${MAP_BASE_URL}/api/tiles/hanoi/tilejson.json`)}`
      });

      map.addSource('metro', { type: 'geojson', data: './metro-hanoi.geojson' });
      map.addSource('metrop', { type: 'geojson', data: './metro-hanoi-planned.geojson' });
      map.addSource('gadk', { type: 'geojson', data: './metro-hanoi-ga-dukien.geojson' });
      map.addSource('apt', { type: 'geojson', data: './hanoi-airports.geojson' });

      const allLayers = [
        ...ZONING_LAYERS, ...AIRPORT_LAYERS, ...METRO_PLANNED_LAYERS,
        ...GA_DUKIEN_LAYERS, ...METRO_ACTIVE_LAYERS
      ];

      allLayers.forEach((layer) => {
        if (!map.getLayer(layer.id)) map.addLayer(layer);
      });

      map.addSource('sel', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      map.addLayer({ id: 'sel-fill', type: 'fill', source: 'sel', paint: { 'fill-color': '#2563eb', 'fill-opacity': 0.2 } });
      map.addLayer({ id: 'sel-line', type: 'line', source: 'sel', paint: { 'line-color': '#1d4ed8', 'line-width': 2.8 } });
    });

    map.on('click', (e) => {
      const stLayers = ['metro-st', 'metrop-line', 'gadk-ring'].filter(l => map.getLayer(l));
      if (stLayers.length > 0) {
        const stationFs = map.queryRenderedFeatures(e.point, { layers: stLayers });
        if (stationFs.length > 0) {
          const feat = stationFs[0];
          const props = feat.properties || {};

          if (feat.layer.id === 'metro-st') {
            new maplibregl.Popup({ maxWidth: '240px' })
              .setLngLat(e.lngLat)
              .setHTML(`<div style="font-size:12px; font-family:sans-serif;"><span style="background:#0a7d3b; color:white; padding:2px 8px; border-radius:10px; font-weight:bold; font-size:10px;">Ga Metro Operational</span><div style="font-weight:bold; margin-top:6px; font-size:13px; color:#111;">${props.name || ''}</div></div>`)
              .addTo(map);
            return;
          }
          if (feat.layer.id === 'metrop-line') {
            new maplibregl.Popup({ maxWidth: '250px' })
              .setLngLat(e.lngLat)
              .setHTML(`<div style="font-size:12px; font-family:sans-serif;"><span style="background:${props.color || '#555'}; color:white; padding:2px 8px; border-radius:10px; font-weight:bold; font-size:10px;">Hành lang ${props.line || ''} · Quy hoạch</span><div style="font-weight:bold; margin-top:6px; font-size:13px; color:#111;">Hướng tuyến đường sắt đô thị</div></div>`)
              .addTo(map);
            return;
          }
          if (feat.layer.id === 'gadk-ring') {
            new maplibregl.Popup({ maxWidth: '260px' })
              .setLngLat(e.lngLat)
              .setHTML(`<div style="font-size:12px; font-family:sans-serif;"><span style="background:#f59e0b; color:white; padding:2px 8px; border-radius:10px; font-weight:bold; font-size:10px;">Vị trí ga dự kiến</span><div style="font-weight:bold; margin-top:6px; font-size:13px; color:#111;">${props.ward || 'Vị trí sơ bộ'}</div></div>`)
              .addTo(map);
            return;
          }
        }
      }

      const zoneLayers = ['qhpk-fill', 'qhc-fill', 'zon-line'].filter(l => map.getLayer(l));
      if (zoneLayers.length > 0) {
        const zoningFs = map.queryRenderedFeatures(e.point, { layers: zoneLayers });
        if (zoningFs.length > 0) {
          const feat = zoningFs[0];
          setSelectedFeature(feat);
          if (map.getSource('sel')) map.getSource('sel').setData({ type: 'Feature', geometry: feat.geometry, properties: {} });
          return;
        }
      }

      setSelectedFeature(null);
      if (map.getSource('sel')) map.getSource('sel').setData({ type: 'FeatureCollection', features: [] });
    });

    const hoverLayers = ['qhc-fill', 'qhpk-fill', 'metro-st', 'metrop-line', 'gadk-ring'];
    hoverLayers.forEach((id) => {
      map.on('mouseenter', id, () => { if (map.getLayer(id)) map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', id, () => { if (map.getLayer(id)) map.getCanvas().style.cursor = ''; });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const updateVisuals = () => {
      if (!map.isStyleLoaded()) return;
      
      const toggle = (layerId, visible) => {
        if (map.getLayer(layerId)) map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
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

      const fillOp = layerState.opacityBoost ? 0.28 : ZFILL_OPACITY;
      if (map.getLayer('qhc-fill')) map.setPaintProperty('qhc-fill', 'fill-opacity', fillOp);
      if (map.getLayer('qhpk-fill')) map.setPaintProperty('qhpk-fill', 'fill-opacity', fillOp + 0.08);
    };

    if (map.isStyleLoaded()) {
      updateVisuals();
    } else {
      map.once('idle', updateVisuals);
    }
  }, [layerState, isMetroView]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}