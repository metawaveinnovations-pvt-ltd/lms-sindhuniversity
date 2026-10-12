import React from 'react';
import { UserRole } from '../../types';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  Award, 
  Menu,
  GraduationCap,
  CreditCard,
  UserCheck,
  Server,
  ShieldCheck,
  School,
  FileText,
  Home,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface MobileBottomNavProps {
  currentRole: UserRole;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onRoleChange?: (role: UserRole) => void;
  onOpenMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRole,
  activeTab,
  onTabChange,
  onRoleChange,
  onOpenMenu
}) => {
  const orderedPortals: UserRole[] = [
    'public',
    'student',
    'faculty',
    'parent',
    'vc',
    'dean',
    'chairman',
    'hod',
    'admin',
    'architecture'
  ];

  const portalSwipe = useSwipeNavigation<UserRole>({
    items: orderedPortals,
    activeItem: currentRole,
    onSelect: (role) => {
      onRoleChange?.(role);
    },
    minSwipeDistance: 38
  });

  const getNavItems = () => {
    if (currentRole === 'vc') {
      return [
        { id: 'overview', label: 'Radar', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'faculties', label: 'Faculties', icon: <School className="w-5 h-5" /> },
        { id: 'examinations', label: 'Exams', icon: <Award className="w-5 h-5" /> },
        { id: 'governance', label: 'Syndicate', icon: <FileText className="w-5 h-5" /> }
      ];
    }
    if (currentRole === 'dean') {
      return [
        { id: 'overview', label: 'Faculty', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'departments', label: 'Depts', icon: <School className="w-5 h-5" /> },
        { id: 'faculty', label: 'Teachers', icon: <UserCheck className="w-5 h-5" /> },
        { id: 'accreditation', label: 'OBE', icon: <ShieldCheck className="w-5 h-5" /> }
      ];
    }
    if (currentRole === 'faculty') {
      return [
        { id: 'overview', label: 'Today', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-5 h-5" /> },
        { id: 'attendance', label: 'Attendance', icon: <Clock className="w-5 h-5" /> },
        { id: 'grading', label: 'Grading', icon: <FileText className="w-5 h-5" /> }
      ];
    }
    if (currentRole === 'chairman' || currentRole === 'hod') {
      return [
        { id: 'overview', label: currentRole === 'chairman' ? 'Chair' : 'HOD', icon: <School className="w-5 h-5" /> },
        { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-5 h-5" /> },
        { id: 'cohorts', label: 'Batches', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'appeals', label: 'Appeals', icon: <Clock className="w-5 h-5" />, hasAlert: true }
      ];
    }
    if (currentRole === 'admin') {
      return [
        { id: 'telemetry', label: 'Telemetry', icon: <Server className="w-5 h-5" /> },
        { id: 'results', label: 'Results', icon: <Award className="w-5 h-5" /> },
        { id: 'users', label: 'Users', icon: <UserCheck className="w-5 h-5" /> },
        { id: 'audit', label: 'Audit', icon: <ShieldCheck className="w-5 h-5" /> }
      ];
    }
    if (currentRole === 'parent') {
      return [
        { id: 'overview', label: 'Ward', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'attendance', label: '75% Rule', icon: <Clock className="w-5 h-5" />, hasAlert: true },
        { id: 'results', label: 'Grades', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'fees', label: '1Link Fees', icon: <CreditCard className="w-5 h-5" /> }
      ];
    }
    // Default: student
    return [
      { id: 'overview', label: 'Today', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'courses', label: 'Courses', icon: <BookOpen className="w-5 h-5" /> },
      { id: 'attendance', label: '75% Rule', icon: <Clock className="w-5 h-5" />, hasAlert: true },
      { id: 'exams', label: 'QR Slip', icon: <Award className="w-5 h-5" /> }
    ];
  };

  const navItems = getNavItems();
  const tabSwipe = useSwipeNavigation<string>({
    items: navItems.map(i => i.id),
    activeItem: activeTab,
    onSelect: onTabChange,
    minSwipeDistance: 38
  });

  // Public Gateway Bottom Thumb-Zone Navigation
  if (currentRole === 'public' || currentRole === 'architecture') {
    return (
      <nav
        onTouchStart={portalSwipe.onTouchStart}
        onTouchEnd={portalSwipe.onTouchEnd}
        aria-label="Mobile Quick Portal Bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#d8dadb] shadow-lg px-2 py-1 pb-safe grid grid-cols-5 items-center no-print select-none"
      >
        <button
          onClick={() => {
            onRoleChange?.('public');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl text-[10px] font-semibold transition-all cursor-pointer ${
            currentRole === 'public' ? 'text-[#004b87] font-extrabold' : 'text-slate-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="mt-0.5">Home</span>
        </button>

        <button
          onClick={() => onRoleChange?.('student')}
          className="min-h-[48px] flex flex-col items-center justify-center rounded-xl text-[10px] font-semibold text-slate-600 hover:text-[#007a33] transition-all cursor-pointer"
        >
          <GraduationCap className="w-5 h-5 text-[#007a33]" />
          <span className="mt-0.5">Student LMS</span>
        </button>

        <button
          onClick={() => {
            if (currentRole !== 'public') {
              onRoleChange?.('public');
              setTimeout(() => {
                document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            } else {
              document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="min-h-[48px] flex flex-col items-center justify-center rounded-xl text-[10px] font-bold text-[#4c6418] bg-[#eef4e3] border border-[#84a433]/40 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5 text-[#007a33]" />
          <span className="mt-0.5">Admissions</span>
        </button>

        <button
          onClick={() => onRoleChange?.('faculty')}
          className="min-h-[48px] flex flex-col items-center justify-center rounded-xl text-[10px] font-semibold text-slate-600 hover:text-[#0068b5] transition-all cursor-pointer"
        >
          <UserCheck className="w-5 h-5 text-[#0068b5]" />
          <span className="mt-0.5">Faculty</span>
        </button>

        <button
          onClick={onOpenMenu}
          className="min-h-[48px] flex flex-col items-center justify-center rounded-xl text-[10px] font-semibold text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
          aria-label="Open full portal menu"
        >
          <Menu className="w-5 h-5" />
          <span className="mt-0.5">Portals</span>
        </button>
      </nav>
    );
  }

  return (
    <nav 
      onTouchStart={tabSwipe.onTouchStart}
      onTouchEnd={tabSwipe.onTouchEnd}
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#d8dadb] shadow-lg px-2 py-1 pb-safe grid grid-cols-5 items-center no-print select-none"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl text-[10px] font-semibold transition-all relative cursor-pointer ${
              isActive
                ? 'text-[#004b87] font-extrabold bg-[#004b87]/10'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.hasAlert && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-600 rounded-full" />
              )}
            </div>
            <span className="mt-0.5 truncate max-w-[64px]">{item.label}</span>
          </button>
        );
      })}

      {/* All Modules / Portals Drawer button */}
      <button
        onClick={onOpenMenu}
        className="min-h-[48px] flex flex-col items-center justify-center rounded-xl text-[10px] font-semibold text-slate-600 hover:text-[#004b87] transition-all cursor-pointer"
        aria-label="Open full portal menu"
      >
        <Menu className="w-5 h-5" />
        <span className="mt-0.5">All Tools</span>
      </button>
    </nav>
  );
};
