import React from 'react';
import { Compass, Train, Shield, Award, MapPin, Zap } from 'lucide-react';

export default function PlanningSummary() {
  const poles = [
    { id: 1, title: 'Đô thị trung tâm', desc: 'Hữu ngạn sông Hồng · Văn hóa - Lịch sử - Chính trị, Đô thị Olympic' },
    { id: 2, title: 'Phía Bắc (Đông Anh – Mê Linh – Sóc Sơn)', desc: 'Cực hội nhập, Logistics & dịch vụ sân bay Nội Bài' },
    { id: 3, title: 'Phía Đông (Gia Lâm – Long Biên)', desc: 'Thương mại dịch vụ, cửa ngõ gắn QL5 & cao tốc Hải Phòng' },
    { id: 4, title: 'Phía Nam (Thường Tín – Phú Xuyên)', desc: 'Công nghiệp & Logistics gắn sân bay 2 & đường sắt tốc độ cao' },
    { id: 5, title: 'Vân Đình – Đại Nghĩa', desc: 'Đô thị sinh thái di sản & tín ngưỡng hai bên sông' },
    { id: 6, title: 'Tây Nam (Xuân Mai – Chương Mỹ)', desc: 'Đô thị giáo dục, y tế & nghỉ dưỡng sinh thái' },
    { id: 7, title: 'Phía Tây (Hòa Lạc)', desc: 'Đô thị khoa học công nghệ, ĐH Quốc gia & Khu CNC' },
    { id: 8, title: 'Tây Bắc (Sơn Tây – Ba Vì)', desc: 'Đô thị văn hóa di sản, du lịch nghỉ dưỡng & ANQP' },
    { id: 9, title: 'Cực Sông Hồng', desc: 'Trục cảnh quan văn hóa - tài chính - du lịch chủ đạo' }
  ];

  const axes = [
    { id: 1, title: 'Nhật Tân – Nội Bài', desc: 'Trục đô thị sân bay & dịch vụ quốc tế' },
    { id: 2, title: 'Hồ Tây – Cổ Loa – Gia Bình', desc: 'Kết nối vùng kinh tế Đông Bắc' },
    { id: 3, title: 'QL5 / Cao tốc Hải Phòng', desc: 'Hành lang thương mại & hàng hải' },
    { id: 4, title: 'QL1A / Pháp Vân – Cầu Giẽ', desc: 'Hành lang kết nối phía Nam' },
    { id: 5, title: 'QL21B / 21C', desc: 'Hành lang di sản tâm linh Mỹ Đình – Bái Đính' },
    { id: 6, title: 'QL6 / Hà Đông – Xuân Mai', desc: 'Chuỗi đô thị sinh thái cửa ngõ Tây Bắc' },
    { id: 7, title: 'Đại lộ Thăng Long', desc: 'Trục tri thức tới Hòa Lạc & Ba Vì' },
    { id: 8, title: 'QL32 / Tây Thăng Long', desc: 'Trục hướng tâm Sơn Tây & Thượng lưu sông Hồng' },
    { id: 9, title: 'Đại lộ cảnh quan Sông Hồng', desc: 'Trục xanh trung tâm văn hóa sáng tạo' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-amber-600 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
            Quyết định 2512/QĐ-UBND (13/5/2026)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Quy hoạch Tổng thể Hà Nội Tầm nhìn 100 năm
          </h2>
          <p className="text-sm sm:text-base text-red-100 leading-relaxed">
            Mô hình chùm đô thị <b>“Đa tầng, đa lớp, đa cực, đa trung tâm”</b> với quy mô dân số dự báo 17 – 19 triệu người năm 2065, lấy Sông Hồng làm trục xanh cảnh quan trung tâm.
          </p>
        </div>
      </div>

      {/* Target Milestones */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-red-600" />
          <span>Mục tiêu Phát triển Theo Mốc Thời gian</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="text-2xl font-black text-red-600">2035</div>
            <div className="font-semibold text-slate-900 text-sm">GRDP ~20.000 USD/người</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Đô thị xanh, thông minh; trung tâm giáo dục & y tế hàng đầu khu vực Châu Á - Thái Bình Dương. 6 tuyến Metro (~400 km).
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="text-2xl font-black text-orange-600">2045</div>
            <div className="font-semibold text-slate-900 text-sm">GRDP ~680 tỷ USD (45.000 USD/người)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trung tâm đổi mới sáng tạo; đạt phát thải ròng bằng 0 (Net Zero). 10 tuyến Metro (~800 km).
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="text-2xl font-black text-purple-600">2065</div>
            <div className="font-semibold text-slate-900 text-sm">GRDP ~2.000 tỷ USD (100.000 USD/người)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trở thành “Thành phố toàn cầu”, thuộc TOP 10 thủ đô hạnh phúc nhất thế giới. ~1.200 km Metro hoàn chỉnh.
            </p>
          </div>
        </div>
      </div>

      {/* 9 Poles & 9 Axes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 9 Development Poles */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-600" />
            <span>9 Cực Phát Triển</span>
          </h3>
          <div className="space-y-3">
            {poles.map((p) => (
              <div key={p.id} className="flex gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center flex-none">
                  {p.id}
                </span>
                <div>
                  <div className="font-semibold text-slate-900">{p.title}</div>
                  <div className="text-slate-500">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 9 Growth Axes */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <span>9 Trục Động Lực</span>
          </h3>
          <div className="space-y-3">
            {axes.map((a) => (
              <div key={a.id} className="flex gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center flex-none">
                  {a.id}
                </span>
                <div>
                  <div className="font-semibold text-slate-900">{a.title}</div>
                  <div className="text-slate-500">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
