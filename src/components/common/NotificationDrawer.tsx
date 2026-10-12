import React, { useState } from 'react';
import { NotificationItem } from '../../types';
import { X, CheckCheck, Bell, AlertTriangle, BookOpen, CreditCard, Clock, Calendar } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  const [filter, setFilter] = useState<'All' | 'Academic' | 'Examination' | 'Fees' | 'Attendance'>('All');

  if (!isOpen) return null;

  const filteredItems = notifications.filter(
    item => filter === 'All' || item.category === filter
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Examination':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'Attendance':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'Fees':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'Academic':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-250"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Campus Alerts & Notices</h3>
              <p className="text-xs text-slate-500">Live Academic & Administrative Stream</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="p-3 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto text-xs bg-white">
          <div className="flex items-center gap-1">
            {(['All', 'Academic', 'Examination', 'Fees', 'Attendance'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 shrink-0"
            title="Mark all notifications as read"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-slate-100">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No alerts in this category</p>
              <p className="text-xs text-slate-500 mt-1">You're completely up to date.</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectNotification?.(item)}
                className={`pt-2.5 first:pt-0 p-2 rounded-lg cursor-pointer transition-all ${
                  !item.read ? 'bg-blue-50/60 border border-blue-100/80' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0 p-1.5 bg-white rounded-md border border-slate-200 shadow-2xs">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1.5 py-0.2 bg-slate-100 rounded">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.timestamp}
                      </span>
                    </div>
                    <h4 className={`text-xs font-semibold mt-1 leading-snug ${!item.read ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.message}
                    </p>
                    {item.priority === 'urgent' && (
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Action Required</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
          Integrated with University of Sindh Registrar & ITSC Webhook
        </div>
      </div>
    </div>
  );
};
