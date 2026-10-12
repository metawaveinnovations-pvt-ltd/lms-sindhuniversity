import React, { useState } from 'react';
import { 
  Server, 
  ShieldCheck, 
  Activity, 
  Database, 
  Users, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Lock, 
  RefreshCw,
  Cpu,
  Layers,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { SYSTEM_HEALTH_METRICS, AUDIT_LOGS_STREAM } from '../../data/mockAcademicData';
import { AuditLogItem } from '../../types';
import { TimetableMasterEngine } from '../common/TimetableMasterEngine';
import {
  ClassTimetableSlot,
  ExamDatesheetEntry,
  UniversityTimetableSettings
} from '../../data/timetableData';

interface AdminPortalProps {
  auditLogs: AuditLogItem[];
  onAddAuditLog: (log: any) => void;
  activeTab?: string;
  activeSubTab?: string;
  onTabChange?: (tab: string) => void;
  onSubTabChange?: (sub: string) => void;
  timetableSlots: ClassTimetableSlot[];
  onUpdateSlots: React.Dispatch<React.SetStateAction<ClassTimetableSlot[]>>;
  examEntries: ExamDatesheetEntry[];
  onUpdateExams: React.Dispatch<React.SetStateAction<ExamDatesheetEntry[]>>;
  timetableSettings: UniversityTimetableSettings;
  onUpdateSettings: React.Dispatch<React.SetStateAction<UniversityTimetableSettings>>;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  auditLogs, 
  onAddAuditLog,
  activeTab: controlledTab,
  activeSubTab: controlledSubTab,
  onTabChange: setControlledTab,
  onSubTabChange: setControlledSubTab,
  timetableSlots,
  onUpdateSlots,
  examEntries,
  onUpdateExams,
  timetableSettings,
  onUpdateSettings
}) => {
  const [internalTab, setInternalTab] = useState<'telemetry' | 'timetable' | 'users' | 'results' | 'audit' | 'profile'>('telemetry');
  const [internalSubTab, setInternalSubTab] = useState<string>('');

  const activeTab = controlledTab || internalTab;
  const activeSubTab = controlledSubTab !== undefined ? controlledSubTab : internalSubTab;

  const setActiveTab = (tab: any, sub: string = '') => {
    if (setControlledTab) {
      setControlledTab(tab);
    } else {
      setInternalTab(tab);
    }
    if (setControlledSubTab) {
      setControlledSubTab(sub);
    } else {
      setInternalSubTab(sub);
    }
  };

  const setSubTab = (sub: string) => {
    if (setControlledSubTab) {
      setControlledSubTab(sub);
    } else {
      setInternalSubTab(sub);
    }
  };
  const [searchAudit, setSearchAudit] = useState('');
  const [simulatedSpike, setSimulatedSpike] = useState(false);
  const [resultPublished, setResultPublished] = useState(false);
  const [mfaResetIds, setMfaResetIds] = useState<string[]>([]);

  const handleSimulateLoadSpike = () => {
    setSimulatedSpike(true);
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: 'ITSC Load Simulator Engine',
      role: 'Automated Worker',
      what: 'Simulated 15,000 Concurrent User Surge',
      category: 'Infrastructure',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.12.0.99 (Load Test Generator)',
      objectTarget: 'LMS API Gateway & Result Cache',
      beforeState: 'Concurrent: 1,420 users, CPU: 24%',
      afterState: 'Autoscaled 8 Replica Pods, Redis Hit: 96.2%, Latency: 310ms',
      reason: 'Automated Result-Day Capacity Stress Test',
      referenceId: 'LOAD-SIM-' + Date.now().toString().slice(-6)
    });

    setTimeout(() => setSimulatedSpike(false), 4000);
  };

  const handlePublishResults = () => {
    setResultPublished(true);
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: 'Engr. Kashif Laghari (Lead ITSC Engineer)',
      role: 'ITSC Admin',
      what: 'Semester Examination Results Published Live',
      category: 'Examination',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.12.0.1 (ITSC Core Terminal)',
      objectTarget: 'Batch: 2K23 BS Software Engineering (Semester 7)',
      beforeState: 'Status: Moderated & Approved by Controller',
      afterState: 'Status: Live on Student LMS & Transcripts',
      reason: 'Official Notification #UOS/EXM/2026/FINAL-09',
      referenceId: 'PUB-EXM-' + Date.now().toString().slice(-6)
    });
  };

  const filteredLogs = auditLogs.filter(log => 
    log.who.toLowerCase().includes(searchAudit.toLowerCase()) ||
    log.what.toLowerCase().includes(searchAudit.toLowerCase()) ||
    log.category.toLowerCase().includes(searchAudit.toLowerCase()) ||
    log.objectTarget.toLowerCase().includes(searchAudit.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 space-y-4 sm:space-y-6">
      {/* ITSC Systems Console Banner */}
      <div className="bg-white rounded-2xl border border-[#d8dadb] p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#004b87] text-[#c8e27b] flex items-center justify-center font-bold text-base sm:text-xl font-mono shrink-0">
            ITSC
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-xl font-black text-slate-900">ITSC Enterprise Operations Console</h1>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#eef4e3] text-[#4c6418] border border-[#84a433]/40">
                Production Cluster
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Information Technology Services Centre (ITSC) • University of Sindh, Jamshoro
            </p>
            <div className="text-[11px] text-slate-400 mt-0.5 truncate">
              Lead Engineer: <strong className="text-slate-700">Engr. Kashif Laghari</strong> • Cluster: <span className="font-mono">uos-prod-jamshoro-01</span>
            </div>
          </div>
        </div>

        {/* Live System Health Pulse */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>8 Core Services Nominal</span>
          </div>
          <button
            onClick={handleSimulateLoadSpike}
            disabled={simulatedSpike}
            className="min-h-[38px] px-3.5 py-2 bg-[#0068b5] hover:bg-[#004b87] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${simulatedSpike ? 'animate-spin' : ''}`} />
            <span>{simulatedSpike ? 'Simulating 15k Users...' : 'Simulate Result Load Spike'}</span>
          </button>
        </div>
      </div>

      {/* In-Portal Module Navigation Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold shadow-2xs">
        {[
          { id: 'telemetry', label: 'Cluster Telemetry & Health', icon: <Activity className="w-3.5 h-3.5" /> },
          { id: 'timetable', label: 'Master Timetable Engine', icon: <Calendar className="w-3.5 h-3.5" /> },
          { id: 'results', label: 'Result Publication Pipeline', icon: <Award className="w-3.5 h-3.5" /> },
          { id: 'users', label: 'User Directory & RBAC', icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'audit', label: 'Immutable Audit Trail Stream', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
          { id: 'profile', label: 'ITSC Security & Officer Profile', icon: <Lock className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#004b87] text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB: MASTER TIMETABLE ENGINE */}
      {activeTab === 'timetable' && (
        <TimetableMasterEngine
          role="admin"
          canManage={true}
          initialDeptId="dept_swe"
          activeSubView={activeSubTab || 'classes'}
          onSubViewChange={setSubTab}
          slots={timetableSlots}
          onUpdateSlots={onUpdateSlots}
          examEntries={examEntries}
          onUpdateExams={onUpdateExams}
          settings={timetableSettings}
          onUpdateSettings={onUpdateSettings}
          onAddAuditLog={onAddAuditLog}
        />
      )}

      {/* TAB 1: TELEMETRY (WITH SUB-TABS: SERVICES vs SPIKE SIMULATOR) */}
      {activeTab === 'telemetry' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Cluster Uptime</div>
              <div className="text-xl font-black text-emerald-700 font-mono">99.98%</div>
              <div className="text-[11px] text-slate-500">Past 90 Days SLA</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">API p95 Latency</div>
              <div className="text-xl font-black text-[#004b87] font-mono">{simulatedSpike ? '310 ms' : '48 ms'}</div>
              <div className="text-[11px] text-emerald-600">Within Target (&lt;500ms)</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Redis Cache Hit</div>
              <div className="text-xl font-black text-[#0b2545] font-mono">96.4%</div>
              <div className="text-[11px] text-slate-500">High cache efficiency</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Active Sessions</div>
              <div className="text-xl font-black text-slate-900 font-mono">{simulatedSpike ? '15,482' : '1,842'}</div>
              <div className="text-[11px] text-slate-500">OIDC JWT Tokens</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Target Microservices & Capacity Stress Engine</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time health telemetry and result-day 15,000 concurrent student surge simulator.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                {[
                  { id: 'services', label: 'Microservices Health' },
                  { id: 'spike', label: 'Load Spike Simulator' }
                ].map((st) => {
                  const isSelected = (activeSubTab || 'services') === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSubTab(st.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#004b87] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {(activeSubTab || 'services') === 'services' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Service Name</th>
                      <th className="py-2.5 px-3">Health Status</th>
                      <th className="py-2.5 px-3">Latency</th>
                      <th className="py-2.5 px-3">Uptime</th>
                      <th className="py-2.5 px-3">Incident Record</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SYSTEM_HEALTH_METRICS.map((srv, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{srv.service}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {srv.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-[#004b87]">{srv.latencyMs} ms</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">{srv.uptimePercent}%</td>
                        <td className="py-2.5 px-3 text-slate-500">{srv.lastIncident}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase text-[#004b87]">Result-Day Autoscaling Benchmark</div>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">15,000 Concurrent Student Result Lookup Stress Test</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Simulates peak semester result publication traffic against Redis Edge Cache and Kubernetes HPA replicas.
                    </p>
                  </div>
                  <button
                    onClick={handleSimulateLoadSpike}
                    disabled={simulatedSpike}
                    className="px-4 py-2.5 bg-[#004b87] hover:bg-[#0b2545] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shrink-0 shadow-xs"
                  >
                    <RefreshCw className={`w-4 h-4 ${simulatedSpike ? 'animate-spin' : ''}`} />
                    <span>{simulatedSpike ? 'Autoscaling 8 Replicas...' : 'Trigger 15,000 User Surge'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Replica Pods</span>
                    <strong className="text-base font-black text-slate-900 font-mono">
                      {simulatedSpike ? '8 / 8 Active (Scaled)' : '3 / 8 Baseline'}
                    </strong>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">DB Connection Pool</span>
                    <strong className="text-base font-black text-emerald-700 font-mono">
                      {simulatedSpike ? 'PgBouncer 74% Load' : 'PgBouncer 18% Load'}
                    </strong>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Zero-Downtime Status</span>
                    <strong className="text-base font-black text-[#004b87] font-mono">100% requests served</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RESULT PUBLICATION PIPELINE */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Examination Result Publication Stage-Gate</h3>
            <p className="text-xs text-slate-500">
              Four-stage verification pipeline ensuring academic integrity prior to portal release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { stage: 'Stage 1: Faculty Upload', desc: 'Course instructors submit marks rosters', status: 'Completed', color: 'emerald' },
              { stage: 'Stage 2: HOD Moderation', desc: 'Prof. Dr. Arifa Bhutto endorses grades', status: 'Approved', color: 'emerald' },
              { stage: 'Stage 3: Controller Audit', desc: 'Exam Controller seals tabulation sheet', status: 'Verified', color: 'emerald' },
              { stage: 'Stage 4: Public Release', desc: 'Published to Student LMS & Transcripts', status: resultPublished ? 'Live on Portal' : 'Pending ITSC Release', color: resultPublished ? 'emerald' : 'amber' }
            ].map((stg, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {stg.stage}
                </div>
                <div className="text-xs font-semibold text-slate-800">{stg.desc}</div>
                <div className="pt-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    stg.status.includes('Live') || stg.status === 'Completed' || stg.status === 'Approved' || stg.status === 'Verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {stg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-[#004b87]/5 rounded-xl border border-[#004b87]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-[#0b2545]">Release Batch 2K23 Fall 2026 Results Live</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Will invalidate Redis cache and dispatch automated push notifications to 124 enrolled students.
              </p>
            </div>
            <button
              onClick={handlePublishResults}
              disabled={resultPublished}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                resultPublished
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#004b87] hover:bg-[#0b2545] text-white shadow-xs'
              }`}
            >
              {resultPublished ? 'Results Live & Verified' : 'Authorize Live Publication'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: USERS & RBAC (WITH SUB-TABS: ROLES vs MFA ENFORCEMENT) */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Unified Role-Based Access Control (RBAC) & MFA Directory</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                OpenID Connect IAM integration ensuring least-privilege principles and masked CNIC protection.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              {[
                { id: 'roles', label: 'Role Access Matrix' },
                { id: 'mfa', label: 'MFA Enforcement' }
              ].map((st) => {
                const isSelected = (activeSubTab || 'roles') === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSubTab(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#004b87] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Identity / ID</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Masked CNIC</th>
                  <th className="py-2.5 px-3">Permissions Scope</th>
                  <th className="py-2.5 px-3">MFA Status</th>
                  {(activeSubTab === 'mfa') && <th className="py-2.5 px-3 text-right">Security Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: '2K23/SWE/104', name: 'Ali Hassan Chand', role: 'Student', cnic: '41302-******4-2', perms: 'read:enrolled_courses, write:assignments, pay:fees', mfa: 'TOTP Active' },
                  { id: 'UOS-FAC-8812', name: 'Engr. Farhan Shaikh', role: 'Faculty', cnic: '41303-******1-5', perms: 'write:attendance, write:grades, upload:courseware', mfa: 'FIDO2 / TOTP' },
                  { id: 'UOS-HOD-0021', name: 'Prof. Dr. Arifa Bhutto', role: 'HOD Chairperson', cnic: '41302-******9-8', perms: 'approve:grades, broadcast:department, view:analytics', mfa: 'FIDO2 Hardware Key' },
                  { id: 'UOS-ITSC-1004', name: 'Engr. Kashif Laghari', role: 'ITSC Admin', cnic: '41302-******3-1', perms: 'admin:cluster, write:publish_results, read:audit_logs', mfa: 'Hardware Key Enforced' }
                ].map((usr, idx) => {
                  const isReset = mfaResetIds.includes(usr.id);
                  return (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-3 px-3 font-mono font-bold text-[#004b87]">{usr.id}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{usr.name}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                          {usr.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-500">{usr.cnic}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{usr.perms}</td>
                      <td className="py-3 px-3 text-emerald-700 font-semibold">{isReset ? 'Re-enrolled FIDO2' : usr.mfa}</td>
                      {(activeSubTab === 'mfa') && (
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              setMfaResetIds(prev => [...prev, usr.id]);
                              onAddAuditLog({
                                id: 'log_' + Date.now().toString().slice(-4),
                                who: 'Engr. Kashif Laghari (ITSC Admin)',
                                role: 'ITSC Admin',
                                what: `MFA Token Rotation & Session Re-Verify for ${usr.id}`,
                                category: 'Security',
                                when: new Date().toLocaleString() + ' PKT',
                                whereIp: '10.12.0.1 (ITSC Core)',
                                objectTarget: `Identity: ${usr.name} (${usr.id})`,
                                beforeState: usr.mfa,
                                afterState: 'New FIDO2 / TOTP Seed Issued',
                                reason: 'Zero-Trust Periodic Credential Rotation',
                                referenceId: 'IAM-MFA-' + Date.now().toString().slice(-6)
                              });
                            }}
                            disabled={isReset}
                            className="px-2.5 py-1 rounded-lg bg-[#004b87]/10 hover:bg-[#004b87] text-[#004b87] hover:text-white text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isReset ? 'Token Rotated ✓' : 'Rotate MFA Key'}
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT TRAIL STREAM */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Immutable Security & Academic Audit Ledger</h3>
              <p className="text-xs text-slate-500">
                Meets Build Order Requirement #23 (WHO, WHAT, WHEN, WHERE, OBJECT, BEFORE, AFTER, REASON, REFERENCE).
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Filter audit entries..."
                value={searchAudit}
                onChange={(e) => setSearchAudit(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-[#d8dadb] rounded-lg text-xs outline-hidden focus:border-[#004b87] focus:ring-2 focus:ring-[#0068b5]/20 w-56"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredLogs.map(log => (
              <div key={log.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#004b87] bg-[#004b87]/10 border border-[#004b87]/20 px-2 py-0.5 rounded text-[10px]">
                      {log.id}
                    </span>
                    <span className="font-bold text-slate-900">{log.what}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.2 bg-slate-200 rounded text-slate-700">
                      {log.category}
                    </span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">{log.when}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block font-semibold">WHO:</span>
                    <strong className="text-slate-800">{log.who}</strong> ({log.role})
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">WHERE / IP:</span>
                    <span className="font-mono text-slate-700">{log.whereIp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">OBJECT:</span>
                    <span className="text-slate-800">{log.objectTarget}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">REFERENCE:</span>
                    <span className="font-mono text-blue-700">{log.referenceId}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-rose-600 font-semibold">BEFORE STATE: </span>
                    <span className="text-slate-600 font-mono">{log.beforeState}</span>
                  </div>
                  <div>
                    <span className="text-emerald-700 font-semibold">AFTER STATE: </span>
                    <span className="text-slate-800 font-mono">{log.afterState}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500">
                  <strong>REASON / AUTHORIZATION:</strong> {log.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: ITSC SECURITY OFFICER PROFILE & ACCESS KEYS
         ========================================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#003866] p-2 flex items-center justify-center shadow-md text-white font-bold text-xl border border-[#004b87]">
                <Lock className="w-8 h-8 text-[#c8e27b]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">Engr. Muhammad Ahsan</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#004b87]/10 text-[#004b87] border border-[#004b87]/20 font-mono">
                    Lead Systems & Security Engineer
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Information & Technology Services Centre (ITSC) · University of Sindh, Jamshoro
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>Datacenter Core: Allama I.I. Kazi Central Server Room</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Clearance: Level-5 SuperAdmin</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Security ID</span>
              <span className="text-xs font-mono font-bold text-[#004b87] bg-slate-100 px-2.5 py-1 rounded border border-[#d8dadb]">
                ITSC-ADMIN-SEC-01
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Cluster Security Safeguards</h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Hardware 2FA: YubiKey 5 FIPS Enforced</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>TLS 1.3 / mTLS Inter-Service Encryption</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>WAF Rate Limiting: Cloudflare DDoS Protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automated Snapshot Backups: Every 6 Hours</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Core Responsibilities</h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Active Kubernetes Nodes</span>
                  <span className="font-bold text-slate-900">8 High-Availability Nodes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>1Link Digital Payment Gateway</span>
                  <span className="font-bold text-emerald-700">Online & Reconciled</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Result Publishing Authority</span>
                  <span className="font-bold text-purple-900">Dual-Key Controller Signature</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Disaster Recovery Site</span>
                  <span className="font-bold text-slate-900">Karachi Data Bunker (Hot Standby)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Operations Desk & NOC</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">ITSC Network Operations Center</span>
                  <span className="font-mono text-slate-800 font-semibold">noc@usindh.edu.pk</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Emergency Server Incident Hotline</span>
                  <span className="font-mono text-slate-800 font-semibold">+92-22-9213181 Ext 111 (24/7)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Scheduled Maintenance Window</span>
                  <span className="text-slate-800">Sunday 02:00 AM – 04:00 AM PKT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
