import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FileText,
  Video,
  Dumbbell,
  MessageSquare,
  Terminal,
  Play,
  Pause,
  Send,
  Radio,
} from 'lucide-react';

const WidgetContainer = styled.div`
  background: ${({ theme }) => theme.codeBg};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 14px;
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.textPrimary};
  width: 100%;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (min-width: 480px) {
    padding: 1.25rem;
  }
`;

const WidgetHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
`;

const Badge = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  background: ${({ $color }) => ($color ? `${$color}1A` : 'rgba(16, 185, 129, 0.15)')};
  color: ${({ $color }) => $color || '#10B981'};
  border: 1px solid ${({ $color }) => ($color ? `${$color}33` : 'rgba(16, 185, 129, 0.3)')};
  white-space: nowrap;
`;

/* 1. Realtime-Cursor: Google Docs Collaborative Writing Sandbox */
export const RealtimeCursorWidget: React.FC = () => {
  const [typedText] = useState('Designing resilient microservice topology with zero-downtime failover.');
  const [peerWord, setPeerWord] = useState(' [Syncing]');
  const [activeEditor, setActiveEditor] = useState<'Alex' | 'Sara'>('Alex');

  useEffect(() => {
    const words = [' [Optimizing]', ' [Broadcasting]', ' [Replicating]', ' [Connected]'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % words.length;
      setPeerWord(words[idx]);
      setActiveEditor((prev) => (prev === 'Alex' ? 'Sara' : 'Alex'));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <WidgetContainer>
      <WidgetHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
          <FileText size={14} color="#10B981" />
          <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            System-Architecture.doc
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '0.65rem',
              padding: '2px 5px',
              borderRadius: '4px',
              background: 'rgba(16,185,129,0.15)',
              color: '#10B981',
              fontWeight: 700,
            }}
          >
            ● Alex
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '0.65rem',
              padding: '2px 5px',
              borderRadius: '4px',
              background: 'rgba(56,189,248,0.15)',
              color: '#38BDF8',
              fontWeight: 700,
            }}
          >
            ● Sara
          </span>
          <Badge $color="#10B981">14ms</Badge>
        </div>
      </WidgetHeader>

      <div
        style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px',
          padding: '0.75rem',
          border: '1px solid rgba(255,255,255,0.06)',
          minHeight: '75px',
          fontSize: '0.75rem',
          lineHeight: '1.55',
          fontFamily: "'JetBrains Mono', monospace",
          wordBreak: 'break-word',
        }}
      >
        <span style={{ color: '#E2E8F0' }}>{typedText}</span>

        {/* Live Peer Cursor */}
        <span
          style={{
            display: 'inline-block',
            position: 'relative',
            margin: '0 2px',
            color: activeEditor === 'Alex' ? '#10B981' : '#38BDF8',
            fontWeight: 700,
          }}
        >
          {peerWord}
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '13px',
              verticalAlign: 'middle',
              background: activeEditor === 'Alex' ? '#10B981' : '#38BDF8',
              marginLeft: '2px',
              animation: 'pulse 1s infinite',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: '-17px',
              left: '0',
              fontSize: '0.58rem',
              background: activeEditor === 'Alex' ? '#10B981' : '#38BDF8',
              color: '#000',
              padding: '0px 3px',
              borderRadius: '3px',
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            {activeEditor}
          </span>
        </span>
      </div>

      <div
        style={{
          marginTop: '0.65rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.7rem',
          color: '#888',
          flexWrap: 'wrap',
          gap: '0.35rem',
        }}
      >
        <span>WebSocket Offset Sync</span>
        <span style={{ color: '#10B981' }}>● 3 Active</span>
      </div>
    </WidgetContainer>
  );
};

/* 2. Video-Streaming: Real-Time FFmpeg HLS Transcoding Pipeline */
export const VideoStreamingWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [segmentIndex, setSegmentIndex] = useState(8);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSegmentIndex((idx) => (idx >= 32 ? 1 : idx + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <WidgetContainer>
      <WidgetHeader>
        <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
          <Video size={15} color="#38BDF8" /> FFmpeg HLS Stream
        </span>
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
          <Badge $color="#38BDF8">HLS.JS</Badge>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ color: '#38BDF8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
            aria-label={isPlaying ? 'Pause transcode' : 'Resume transcode'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </WidgetHeader>

      <div style={{ marginBottom: '0.65rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.25rem' }}>
          <span>Source: <strong style={{ color: '#E2E8F0' }}>stream.mkv</strong></span>
          <span style={{ color: '#38BDF8', fontWeight: 700 }}>Seg #{segmentIndex} (6s)</span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '3px',
            background: 'rgba(0,0,0,0.2)',
            padding: '5px',
            borderRadius: '6px',
            overflowX: 'auto',
          }}
        >
          {[segmentIndex - 2, segmentIndex - 1, segmentIndex, segmentIndex + 1, segmentIndex + 2].map((seg, i) => (
            <div
              key={seg}
              style={{
                flex: 1,
                minWidth: '52px',
                padding: '3px 1px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '0.62rem',
                fontWeight: 700,
                background: i === 2 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                color: i === 2 ? '#38BDF8' : '#888',
                border: i === 2 ? '1px solid #38BDF8' : '1px solid transparent',
              }}
            >
              _{String(seg).padStart(2, '0')}.ts
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          padding: '0.45rem 0.6rem',
          borderRadius: '6px',
          fontSize: '0.7rem',
          color: '#AAA',
          borderLeft: '2px solid #38BDF8',
          lineHeight: '1.4',
        }}
      >
        <span style={{ color: '#38BDF8', fontWeight: 700 }}>Index:</span> master.m3u8 (Sliding Window)
        <br />
        <span style={{ color: '#10B981', fontWeight: 700 }}>Purge:</span> delete_segments auto-recycle
      </div>
    </WidgetContainer>
  );
};

/* 3. Gym Progress Tracker Telemetry Widget */
export const GymAnalyticsWidget: React.FC = () => {
  const [exercise, setExercise] = useState<'bench' | 'squat' | 'deadlift'>('bench');

  const stats = {
    bench: { e1rm: '115 kg', sets: '4x8 @ 85kg', trend: '+12.5kg' },
    squat: { e1rm: '145 kg', sets: '5x5 @ 120kg', trend: '+17.5kg' },
    deadlift: { e1rm: '180 kg', sets: '3x4 @ 155kg', trend: '+20.0kg' },
  };

  return (
    <WidgetContainer>
      <WidgetHeader>
        <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
          <Dumbbell size={15} color="#A78BFA" /> 1RM Telemetry
        </span>
        <Badge $color="#A78BFA">E1RM ENGINE</Badge>
      </WidgetHeader>

      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.65rem' }}>
        {(['bench', 'squat', 'deadlift'] as const).map((ex) => (
          <button
            key={ex}
            onClick={() => setExercise(ex)}
            style={{
              flex: 1,
              padding: '0.25rem 0.4rem',
              borderRadius: '6px',
              fontSize: '0.68rem',
              fontWeight: 600,
              border: '1px solid',
              borderColor: exercise === ex ? '#A78BFA' : 'rgba(255,255,255,0.1)',
              background: exercise === ex ? '#A78BFA' : 'transparent',
              color: exercise === ex ? '#FFFFFF' : 'inherit',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {ex.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.62rem', color: '#888' }}>Est. 1RM</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#A78BFA', marginTop: '2px' }}>{stats[exercise].e1rm}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.62rem', color: '#888' }}>Last Set</div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10B981', marginTop: '2px' }}>{stats[exercise].sets}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.62rem', color: '#888' }}>Delta</div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38BDF8', marginTop: '2px' }}>{stats[exercise].trend}</div>
        </div>
      </div>
    </WidgetContainer>
  );
};

/* 4. Real-Time WebSocket Chat Platform Widget */
export const RealtimeChatWidget: React.FC = () => {
  const [messages, setMessages] = useState([
    { user: 'Alex', text: 'Just deployed the new MCP tool gateway!', time: '14:02' },
    { user: 'Sara', text: 'Confirmed sub-15ms broadcast latency 🚀', time: '14:03' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages((prev) => [...prev, { user: 'You', text: inputMsg, time: 'Now' }]);
    setInputMsg('');
  };

  return (
    <WidgetContainer>
      <WidgetHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
          <MessageSquare size={14} color="#FBBF24" />
          <span style={{ fontWeight: 600 }}>#production-ops</span>
        </div>
        <Badge $color="#FBBF24">
          <Radio size={11} /> WS CONNECTED
        </Badge>
      </WidgetHeader>

      <div
        style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px',
          padding: '0.65rem',
          marginBottom: '0.65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          maxHeight: '85px',
          overflowY: 'auto',
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ fontSize: '0.72rem', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <span style={{ color: m.user === 'You' ? '#10B981' : m.user === 'Alex' ? '#38BDF8' : '#FBBF24', fontWeight: 700 }}>
              {m.user}:
            </span>{' '}
            <span style={{ color: '#E2E8F0' }}>{m.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.35rem' }}>
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Send WS packet..."
          style={{
            flex: 1,
            minWidth: 0,
            padding: '0.35rem 0.55rem',
            borderRadius: '6px',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            color: '#FFF',
            fontFamily: 'inherit',
            fontSize: '0.72rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: '6px',
            background: '#FBBF24',
            color: '#000',
            fontWeight: 700,
            fontSize: '0.72rem',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Send size={11} /> Send
        </button>
      </form>
    </WidgetContainer>
  );
};

/* 5. Git-Broski Go CLI Terminal Automation Widget */
export const GitBroskiWidget: React.FC = () => {
  const [activeCmd, setActiveCmd] = useState<'open' | 'ignore' | 'help'>('open');

  const outputs = {
    open: [
      '$ gitbroski open',
      '[✓] Reading .git/config [branch: main]...',
      '[✓] Remote origin: https://github.com/gitbroskie/gitbroski',
      '[✓] Dispatched browser in 0.8ms',
    ],
    ignore: [
      '$ gitbroski ignore python',
      '[✓] Fetching Python gitignore template...',
      '[✓] Injected 42 rules into ./.gitignore',
      '[✓] Saved cleanly (0 conflicts)',
    ],
    help: [
      '$ gitbroski --help',
      'Broski for your Git! High-speed Go terminal tool.',
      'Commands: open, ignore <lang>, sync',
    ],
  };

  return (
    <WidgetContainer>
      <WidgetHeader>
        <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
          <Terminal size={15} color="#10B981" /> Git-Broski Go CLI
        </span>
        <Badge $color="#10B981">GO 1.22</Badge>
      </WidgetHeader>

      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
        {(['open', 'ignore', 'help'] as const).map((cmd) => (
          <button
            key={cmd}
            onClick={() => setActiveCmd(cmd)}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.68rem',
              fontWeight: 600,
              border: '1px solid',
              borderColor: activeCmd === cmd ? '#10B981' : 'rgba(255,255,255,0.1)',
              background: activeCmd === cmd ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              color: activeCmd === cmd ? '#10B981' : 'inherit',
              cursor: 'pointer',
            }}
          >
            {cmd === 'open' ? 'gitbroski open' : cmd === 'ignore' ? 'gitbroski ignore' : '--help'}
          </button>
        ))}
      </div>

      <div
        style={{
          background: 'rgba(0,0,0,0.35)',
          padding: '0.55rem 0.75rem',
          borderRadius: '8px',
          fontSize: '0.7rem',
          lineHeight: '1.5',
          border: '1px solid rgba(255,255,255,0.06)',
          wordBreak: 'break-all',
        }}
      >
        {outputs[activeCmd].map((line, idx) => (
          <div key={idx} style={{ color: idx === 0 ? '#10B981' : line.includes('[✓]') ? '#38BDF8' : '#AAA' }}>
            {line}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '0.65rem',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.68rem',
          color: '#888',
          flexWrap: 'wrap',
          gap: '0.35rem',
        }}
      >
        <span>Build: `go build`</span>
        <span style={{ color: '#10B981' }}>Latency: &lt; 2ms</span>
      </div>
    </WidgetContainer>
  );
};
