import React from 'react';
import { Map, Layers, Compass, ExternalLink, Sparkles } from 'lucide-react';

export default function Header({ isMetroView, setIsMetroView, activeTab, setActiveTab }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white shadow-sm ring-2 ring-red-100">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Bản đồ Quy hoạch Hà Nội
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                  Tầm nhìn 100 năm
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Dữ liệu Vector Tiles PBF (Quyết định 2512/QĐ-UBND) · 127.000+ Vùng chức năng
              </p>
            </div>
          </div>

          {/* Center Tabs */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'map'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5 text-red-500" />
              Bản đồ tương tác
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'overview'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              9 Cực & 9 Trục
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMetroView(!isMetroView)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
                isMetroView
                  ? 'bg-slate-900 text-amber-400 border-slate-700 shadow-xs ring-2 ring-slate-800'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              title="Chuyển chế độ xem Metro Đêm"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isMetroView ? 'Chế độ: Metro Dark' : 'Chế độ: Chuẩn'}</span>
            </button>

            <a
              href="https://gateway.datviet.ai/api/tiles/hanoi/13/6503/3608.pbf"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 transition"
              title="Xem endpoint Vector Tile PBF demo"
            >
              <span>API Vector Tiles</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
