import React, { useState } from 'react';
import { X, Terminal, Network, GitBranch, Database, Shield, Copy, Check } from 'lucide-react';

interface ITCheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ITCheatsheetModal: React.FC<ITCheatsheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'linux' | 'ports' | 'subnet' | 'git' | 'sql'>('linux');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">IT Quick Reference Cheatsheets</h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Instant formulas, protocol port numbers, and commands for your degree labs.
        </p>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('linux')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'linux' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Linux & Shell</span>
          </button>

          <button
            onClick={() => setActiveTab('ports')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'ports' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Ports & Protocols</span>
          </button>

          <button
            onClick={() => setActiveTab('subnet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'subnet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>CIDR Subnetting</span>
          </button>

          <button
            onClick={() => setActiveTab('git')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'git' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Git Workflows</span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'sql' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>SQL Snippets</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
          {/* TAB: LINUX */}
          {activeTab === 'linux' && (
            <div className="space-y-2.5">
              {[
                { cmd: 'ss -tulpn', desc: 'Display all listening TCP & UDP ports with process IDs' },
                { cmd: 'ip a || ifconfig', desc: 'Inspect IP addresses and active network interfaces' },
                { cmd: 'chmod 755 script.sh', desc: 'Set rwxr-xr-x permissions (User full, others read/execute)' },
                { cmd: 'ps aux | grep <name>', desc: 'Find active process by name' },
                { cmd: 'curl -I https://example.com', desc: 'Fetch HTTP response headers only' },
                { cmd: 'tail -f /var/log/syslog', desc: 'Real-time follow system logs' },
                { cmd: 'tar -czvf archive.tar.gz /path', desc: 'Compress folder to gzip tarball' },
              ].map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <code className="font-mono text-indigo-400 font-semibold">{item.cmd}</code>
                    <p className="text-slate-400 text-[11px] mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.cmd)}
                    className="p-1.5 text-slate-500 hover:text-white rounded-md bg-slate-900 border border-slate-800"
                  >
                    {copiedText === item.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB: PORTS */}
          {activeTab === 'ports' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { port: '20 / 21', proto: 'FTP', desc: 'File Transfer Protocol (Data / Control)' },
                { port: '22', proto: 'SSH / SFTP', desc: 'Secure Shell remote login & file transfer' },
                { port: '23', proto: 'Telnet', desc: 'Unencrypted terminal emulation' },
                { port: '25', proto: 'SMTP', desc: 'Simple Mail Transfer Protocol (Email)' },
                { port: '53', proto: 'DNS', desc: 'Domain Name System (UDP/TCP)' },
                { port: '67 / 68', proto: 'DHCP', desc: 'Dynamic Host Configuration Protocol' },
                { port: '80', proto: 'HTTP', desc: 'Hypertext Transfer Protocol' },
                { port: '443', proto: 'HTTPS', desc: 'HTTP over TLS/SSL' },
                { port: '3306', proto: 'MySQL', desc: 'MySQL / MariaDB database port' },
                { port: '5432', proto: 'PostgreSQL', desc: 'PostgreSQL default listener' },
              ].map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400">Port {item.port}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{item.proto}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: SUBNETTING */}
          {activeTab === 'subnet' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-[11px] text-slate-300">
                <span className="font-semibold text-indigo-300">Formulas:</span> Usable Hosts = <code className="text-white">2^(32 - Prefix) - 2</code> (Subtract 2 for Network ID and Broadcast).
              </div>

              <div className="rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-2">CIDR</th>
                      <th className="p-2">Subnet Mask</th>
                      <th className="p-2">Total IP</th>
                      <th className="p-2">Usable Hosts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    <tr className="bg-slate-900/40">
                      <td className="p-2 text-indigo-400 font-bold">/24</td>
                      <td className="p-2 text-slate-300">255.255.255.0</td>
                      <td className="p-2 text-slate-400">256</td>
                      <td className="p-2 text-emerald-400 font-bold">254</td>
                    </tr>
                    <tr className="bg-slate-900/20">
                      <td className="p-2 text-indigo-400 font-bold">/25</td>
                      <td className="p-2 text-slate-300">255.255.255.128</td>
                      <td className="p-2 text-slate-400">128</td>
                      <td className="p-2 text-emerald-400 font-bold">126</td>
                    </tr>
                    <tr className="bg-slate-900/40">
                      <td className="p-2 text-indigo-400 font-bold">/26</td>
                      <td className="p-2 text-slate-300">255.255.255.192</td>
                      <td className="p-2 text-slate-400">64</td>
                      <td className="p-2 text-emerald-400 font-bold">62</td>
                    </tr>
                    <tr className="bg-slate-900/20">
                      <td className="p-2 text-indigo-400 font-bold">/27</td>
                      <td className="p-2 text-slate-300">255.255.255.224</td>
                      <td className="p-2 text-slate-400">32</td>
                      <td className="p-2 text-emerald-400 font-bold">30</td>
                    </tr>
                    <tr className="bg-slate-900/40">
                      <td className="p-2 text-indigo-400 font-bold">/28</td>
                      <td className="p-2 text-slate-300">255.255.255.240</td>
                      <td className="p-2 text-slate-400">16</td>
                      <td className="p-2 text-emerald-400 font-bold">14</td>
                    </tr>
                    <tr className="bg-slate-900/20">
                      <td className="p-2 text-indigo-400 font-bold">/30</td>
                      <td className="p-2 text-slate-300">255.255.255.252</td>
                      <td className="p-2 text-slate-400">4</td>
                      <td className="p-2 text-emerald-400 font-bold">2 (Pt-to-Pt)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: GIT */}
          {activeTab === 'git' && (
            <div className="space-y-2.5">
              {[
                { cmd: 'git checkout -b feature/lab-name', desc: 'Create and switch to a new branch for lab experiments' },
                { cmd: 'git status && git add .', desc: 'Inspect changes and stage all modified files' },
                { cmd: 'git commit -m "feat: complete part 2 of lab assignment"', desc: 'Record staged snapshot with conventional commit format' },
                { cmd: 'git log --oneline --graph --decorate', desc: 'Visual ASCII graph of commit history' },
                { cmd: 'git stash && git stash pop', desc: 'Temporarily shelve uncommitted work and restore later' },
              ].map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <code className="font-mono text-purple-400 font-semibold">{item.cmd}</code>
                    <p className="text-slate-400 text-[11px] mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.cmd)}
                    className="p-1.5 text-slate-500 hover:text-white rounded-md bg-slate-900 border border-slate-800"
                  >
                    {copiedText === item.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB: SQL */}
          {activeTab === 'sql' && (
            <div className="space-y-2.5">
              {[
                { 
                  title: 'INNER JOIN & Aggregation', 
                  code: 'SELECT c.code, COUNT(a.id) AS total_tasks\nFROM courses c\nJOIN assignments a ON c.id = a.course_id\nGROUP BY c.code\nHAVING COUNT(a.id) > 2;' 
                },
                { 
                  title: 'Foreign Key Constraint', 
                  code: 'ALTER TABLE assignments\nADD CONSTRAINT fk_course\nFOREIGN KEY (course_id) REFERENCES courses(id)\nON DELETE CASCADE;' 
                },
                { 
                  title: 'B-Tree Index for Query Speed', 
                  code: 'CREATE INDEX idx_asg_due_date ON assignments(due_date);' 
                },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-400">{item.title}</span>
                    <button
                      onClick={() => copyToClipboard(item.code)}
                      className="p-1 text-slate-500 hover:text-white rounded bg-slate-900"
                    >
                      {copiedText === item.code ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre">
                    {item.code}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
