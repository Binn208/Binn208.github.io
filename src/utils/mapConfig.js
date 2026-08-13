// MapLibre GL Configuration for Hanoi Master Plan (Tầm nhìn 100 năm)

const isLocal = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
export const MAP_BASE_URL = isLocal ? '' : 'https://gateway.datviet.ai';
export const GLYPHS_URL = `${MAP_BASE_URL}/font/{fontstack}/{range}.pbf`;

export const HANOI_CENTER = [105.834, 21.028];
export const HANOI_ZOOM = 11.2;

export const BASE_LAYERS = [
  {
    id: 'landcover_grass',
    type: 'fill',
    source: 'openmaptiles',
    'source-layer': 'landcover',
    minzoom: 10,
    maxzoom: 14,
    filter: ['==', 'class', 'grass'],
    paint: { 'fill-color': '#63E363', 'fill-opacity': 0.5 }
  },
  {
    id: 'road_trunk_primary',
    type: 'line',
    source: 'openmaptiles',
    'source-layer': 'transportation',
    minzoom: 10,
    maxzoom: 15,
    filter: ['all', ['==', '$type', 'LineString'], ['in', 'class', 'trunk', 'primary']],
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#f58742',
      'line-opacity': 0.8,
      'line-width': ['interpolate', ['exponential', 1.4], ['zoom'], 6, 0.5, 20, 20]
    }
  },
  {
    id: 'road_secondary_tertiary',
    type: 'line',
    source: 'openmaptiles',
    'source-layer': 'transportation',
    minzoom: 13,
    maxzoom: 15,
    filter: ['all', ['==', '$type', 'LineString'], ['in', 'class', 'secondary', 'tertiary', 'primary', 'trunk', 'motorway', 'path', 'track', 'raceway']],
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': 'gray',
      'line-opacity': 1,
      'line-width': ['interpolate', ['exponential', 1], ['zoom'], 6, 0.5, 20, 0.5]
    }
  },
  {
    id: 'water',
    type: 'fill',
    source: 'openmaptiles',
    'source-layer': 'water',
    minzoom: 10,
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'intermittent', 1]],
    paint: { 'fill-color': 'hsl(205, 56%, 73%)' }
  },
  {
    id: 'water_intermittent',
    type: 'fill',
    source: 'openmaptiles',
    'source-layer': 'water',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'intermittent', 1]],
    paint: { 'fill-color': 'hsl(205, 56%, 73%)', 'fill-opacity': 0.7 }
  },
  {
    id: 'admin_country_province',
    type: 'line',
    source: 'openmaptiles',
    'source-layer': 'boundary',
    filter: ['in', 'admin_level', 1, 2, 3, 4],
    paint: { 'line-color': 'red', 'line-width': 1.5, 'line-dasharray': [2, 1] }
  },
  {
    id: 'admin_ward',
    type: 'line',
    source: 'openmaptiles',
    'source-layer': 'boundary',
    minzoom: 14,
    filter: ['in', 'admin_level', 5, 6],
    paint: { 'line-color': 'red', 'line-width': 1.2, 'line-dasharray': [2, 1] }
  },
  {
    id: 'place_label_ward',
    type: 'symbol',
    source: 'openmaptiles',
    'source-layer': 'place',
    minzoom: 10,
    filter: ['all', ['==', '$type', 'Point'], ['in', 'class', 'suburb', 'town', 'village']],
    layout: {
      'text-font': ['Noto Sans Regular'],
      'text-anchor': 'center',
      'text-field': '{name}',
      'text-max-width': 7,
      'text-size': ['interpolate', ['linear'], ['zoom'], 10, 15, 13, 22, 17, 30],
      'text-letter-spacing': 0.04
    },
    paint: {
      'text-color': '#FFB066',
      'text-halo-blur': 0.5,
      'text-halo-color': '#ffffff',
      'text-halo-width': 2
    }
  },
  {
    id: 'place_label_city',
    type: 'symbol',
    source: 'openmaptiles',
    'source-layer': 'place',
    maxzoom: 16,
    filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'city']],
    layout: {
      'text-field': '{name}',
      'text-font': ['Noto Sans Regular'],
      'text-max-width': 10,
      'text-size': ['interpolate', ['linear'], ['zoom'], 3, 12, 8, 16]
    },
    paint: {
      'text-color': 'hsl(0, 0%, 0%)',
      'text-halo-blur': 0,
      'text-halo-color': 'hsla(0, 0%, 100%, 0.75)',
      'text-halo-width': 2
    }
  }
];

export const ZFILL_OPACITY = 0.62;

export const ZONING_LAYERS = [
  {
    id: 'qhc-fill',
    type: 'fill',
    source: 'hn',
    'source-layer': 'zoning',
    filter: ['all', ['==', ['get', 'grp'], 'QHC'], ['==', ['geometry-type'], 'Polygon']],
    paint: {
      'fill-color': ['coalesce', ['get', 'fc'], '#cccccc'],
      'fill-opacity': ZFILL_OPACITY
    }
  },
  {
    id: 'qhpk-fill',
    type: 'fill',
    source: 'hn',
    'source-layer': 'zoning',
    filter: ['all', ['==', ['get', 'grp'], 'QHPK'], ['==', ['geometry-type'], 'Polygon']],
    paint: {
      'fill-color': ['coalesce', ['get', 'fc'], '#cccccc'],
      'fill-opacity': ZFILL_OPACITY + 0.08
    }
  },
  {
    id: 'zon-line',
    type: 'line',
    source: 'hn',
    'source-layer': 'zoning',
    filter: ['!=', ['geometry-type'], 'Polygon'],
    paint: {
      'line-color': ['coalesce', ['get', 'lc'], ['get', 'fc'], '#666666'],
      'line-width': 0.7
    }
  },
  {
    id: 'zon-outline',
    type: 'line',
    source: 'hn',
    'source-layer': 'zoning',
    minzoom: 13.5,
    filter: ['==', ['geometry-type'], 'Polygon'],
    paint: {
      'line-color': 'rgba(0,0,0,.22)',
      'line-width': 0.3
    }
  }
];

export const METRO_PLANNED_LAYERS = [
  {
    id: 'metrop-line',
    type: 'line',
    source: 'metrop',
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': ['get', 'color'],
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.8, 16, 5],
      'line-dasharray': [2.2, 1.6],
      'line-opacity': 0.9
    }
  }
];

export const AIRPORT_LAYERS = [
  {
    id: 'apt-fill',
    type: 'fill',
    source: 'apt',
    filter: ['==', ['geometry-type'], 'Polygon'],
    paint: { 'fill-color': '#475569', 'fill-opacity': 0.35 }
  },
  {
    id: 'apt-outline',
    type: 'line',
    source: 'apt',
    filter: ['==', ['geometry-type'], 'Polygon'],
    paint: { 'line-color': '#334155', 'line-width': 1.4, 'line-dasharray': [3, 1.6] }
  },
  {
    id: 'apt-lbl',
    type: 'symbol',
    source: 'apt',
    filter: ['==', ['get', '_lbl'], 1],
    layout: {
      'text-field': ['get', 'name'],
      'text-font': ['Noto Sans Regular'],
      'text-anchor': 'bottom',
      'text-offset': [0, -0.4],
      'text-size': ['interpolate', ['linear'], ['zoom'], 8, 11, 14, 14]
    },
    paint: { 'text-color': '#1e293b', 'text-halo-color': '#ffffff', 'text-halo-width': 1.8 }
  }
];

export const GA_DUKIEN_LAYERS = [
  {
    id: 'gadk-halo',
    type: 'circle',
    source: 'gadk',
    minzoom: 9,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, 3.2, 16, 11],
      'circle-color': '#f59e0b',
      'circle-opacity': 0.14
    }
  },
  {
    id: 'gadk-ring',
    type: 'circle',
    source: 'gadk',
    minzoom: 9,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, 2.2, 16, 7],
      'circle-color': 'rgba(0,0,0,0)',
      'circle-stroke-color': '#f59e0b',
      'circle-stroke-width': 1.5,
      'circle-stroke-opacity': 0.95
    }
  }
];

const MW = ['interpolate', ['linear'], ['zoom'], 10, 1.6, 16, 4.6];

export const METRO_ACTIVE_LAYERS = [
  {
    id: 'metro-casing',
    type: 'line',
    source: 'metro',
    filter: ['==', ['geometry-type'], 'LineString'],
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#ffffff',
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 3, 16, 7.5],
      'line-opacity': 0.85
    }
  },
  {
    id: 'metro-op',
    type: 'line',
    source: 'metro',
    filter: ['all', ['==', ['geometry-type'], 'LineString'], ['==', ['get', 'status'], 'operational']],
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': '#0a7d3b', 'line-width': MW }
  },
  {
    id: 'metro-uc',
    type: 'line',
    source: 'metro',
    filter: ['all', ['==', ['geometry-type'], 'LineString'], ['==', ['get', 'status'], 'under_construction']],
    paint: { 'line-color': '#e67e22', 'line-width': MW, 'line-dasharray': [2, 1.4] }
  },
  {
    id: 'metro-pr',
    type: 'line',
    source: 'metro',
    filter: ['all', ['==', ['geometry-type'], 'LineString'], ['==', ['get', 'status'], 'proposed']],
    paint: {
      'line-color': '#7f8c8d',
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.4, 16, 3.6],
      'line-dasharray': [1, 1.6]
    }
  },
  {
    id: 'metro-st',
    type: 'circle',
    source: 'metro',
    filter: ['==', ['get', '_st'], 1],
    minzoom: 11,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 2.4, 16, 5],
      'circle-color': '#ffffff',
      'circle-stroke-color': '#0a7d3b',
      'circle-stroke-width': 1.6
    }
  },
  {
    id: 'metro-lbl',
    type: 'symbol',
    source: 'metro',
    filter: ['==', ['get', '_st'], 1],
    minzoom: 13,
    layout: {
      'text-field': ['get', 'name'],
      'text-font': ['Noto Sans Regular'],
      'text-anchor': 'top',
      'text-offset': [0, 0.85],
      'text-size': ['interpolate', ['linear'], ['zoom'], 13, 9, 16, 12]
    },
    paint: { 'text-color': '#0a5c2c', 'text-halo-color': '#ffffff', 'text-halo-width': 1.6 }
  }
];

export const GRP_INFO = {
  QHC: { name: 'Quy hoạch chung (QHC)', color: '#7c3aed', note: 'Tầm nhìn tổng thể toàn thành phố' },
  QHPK: { name: 'Phân khu (QHPK)', color: '#ea580c', note: 'Chi tiết theo từng khu vực' },
  QHCT: { name: 'Chi tiết (QHCT)', color: '#0891b2', note: 'Quy hoạch chi tiết 1/500' }
};

export function classifyLandFunction(name) {
  const s = (name || '').toLowerCase();
  const has = (...ks) => ks.some(k => s.includes(k));

  if (has('đất ở', 'đơn vị ở', 'nhóm ở', 'nhóm nhà', 'dân cư', 'khu phố', 'nhà ở', 'làng xóm', 'tái định cư', 'ở đô thị', 'ở nông thôn', 'ở nội đô', 'giãn dân', 'di dân'))
    return ['🏠', 'Đất ở / dân cư', 'Khu vực để ở — nhà ở, đơn vị ở, dân cư, làng xóm đô thị.'];
  if (has('cây xanh', 'công viên', 'vườn hoa', 'thể dục', 'thể thao', 'tdtt', 'sân gôn', 'quảng trường', 'vành đai xanh', 'hành lang xanh', 'nêm xanh'))
    return ['🌳', 'Cây xanh / TDTT', 'Không gian xanh, công viên, thể thao, vành đai xanh — không xây nhà ở.'];
  if (has('sông', 'suối', 'kênh', 'rạch', 'hồ', 'mặt nước', 'thủy', 'thoát nước'))
    return ['💧', 'Mặt nước', 'Sông, hồ, kênh rạch — hành lang thoát nước, không xây dựng.'];
  if (has('giao thông', 'đường sắt', 'bãi đỗ', 'bến xe', 'bến', 'nhà ga', 'đầu mối', 'hạ tầng kỹ thuật', 'htkt', 'sân bay', 'cảng'))
    return ['🚦', 'Giao thông / hạ tầng', 'Đất giao thông, bãi đỗ, đầu mối hạ tầng kỹ thuật.'];
  if (has('công nghiệp', 'công nghệ cao', 'tiểu thủ', 'làng nghề', 'kho tàng', 'kho bãi'))
    return ['🏭', 'Công nghiệp / kho', 'Đất công nghiệp, công nghệ cao, kho tàng, làng nghề.'];
  if (has('nông nghiệp', 'trồng lúa', 'cây lâu năm', 'canh tác', 'sản xuất nông', 'rừng', 'lâm nghiệp'))
    return ['🌾', 'Nông - lâm nghiệp', 'Đất nông nghiệp, canh tác, rừng phòng hộ/đặc dụng/sản xuất.'];
  if (has('an ninh', 'quốc phòng', 'quân sự'))
    return ['🛡️', 'An ninh / quốc phòng', 'Đất phục vụ an ninh — quốc phòng.'];
  if (has('di tích', 'tôn giáo', 'tín ngưỡng', 'đình', 'chùa', 'nghĩa trang', 'nghĩa địa', 'tâm linh'))
    return ['🏛️', 'Di tích / tôn giáo', 'Di tích, tôn giáo, tín ngưỡng, nghĩa trang.'];
  if (has('công cộng', 'hỗn hợp', 'dịch vụ', 'thương mại', 'cơ quan', 'trường', 'mầm non', 'nhà trẻ', 'giáo dục', 'đào tạo', 'y tế', 'bệnh viện', 'văn hóa', 'chợ', 'trung tâm', 'hành chính', 'du lịch', 'ngoại giao', 'sứ quán', 'hạ tầng xã hội'))
    return ['🏢', 'Công cộng / dịch vụ', 'Công trình công cộng, dịch vụ, thương mại, cơ quan, trường/viện, hạ tầng xã hội.'];
  if (has('dự trữ', 'phát triển'))
    return ['🧭', 'Dự trữ / phát triển', 'Quỹ đất dự trữ, khu vực phát triển dài hạn.'];
  if (has('dự án riêng'))
    return ['📐', 'Dự án riêng', 'Khu vực lập quy hoạch/dự án riêng được duyệt riêng.'];

  return ['📍', 'Chức năng khác', 'Chức năng sử dụng đất theo hệ quy hoạch Hà Nội.'];
}

export function statusOf(name) {
  const s = (name || '').toLowerCase();
  if (s.includes('hiện trạng')) return ['Hiện trạng', '#0a7d3b'];
  if (s.includes('cải tạo')) return ['Cải tạo', '#b45309'];
  if (s.includes('quy hoạch') || s.includes('dự kiến') || s.includes('mới')) return ['Quy hoạch', '#7c3aed'];
  return null;
}

export const PRESET_LOCATIONS = [
  { name: 'Trung tâm Hà Nội', center: [105.834, 21.028], zoom: 12 },
  { name: 'Cực phía Bắc (Đông Anh)', center: [105.845, 21.135], zoom: 11.5 },
  { name: 'Cực phía Tây (Hòa Lạc)', center: [105.535, 20.985], zoom: 11.8 },
  { name: 'Trục Sông Hồng', center: [105.875, 21.050], zoom: 11.8 },
  { name: 'Sân bay Nội Bài', center: [105.805, 21.220], zoom: 12.5 },
  { name: 'Phía Nam (Phú Xuyên)', center: [105.905, 20.730], zoom: 11.5 }
];
