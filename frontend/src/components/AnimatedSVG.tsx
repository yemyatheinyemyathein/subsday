import { motion } from 'framer-motion';

export const LoginSVG = () => {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="40" y="30" width="120" height="140" rx="16"
        fill="url(#loginGrad)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      />
      <motion.rect
        x="60" y="50" width="80" height="8" rx="4"
        fill="rgba(255,255,255,0.4)"
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.rect
        x="60" y="68" width="60" height="8" rx="4"
        fill="rgba(255,255,255,0.3)"
        initial={{ width: 0 }}
        animate={{ width: 60 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.circle
        cx="100" cy="108" r="20"
        fill="rgba(255,255,255,0.2)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
      />
      <motion.path
        d="M92 108L98 114L108 104"
        stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path d="M100 140 L100 155 M92 147 L108 147" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
      <defs>
        <linearGradient id="loginGrad" x1="40" y1="30" x2="160" y2="170">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const RegisterSVG = () => {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="20" y="20" width="160" height="160" rx="20"
        fill="url(#registerGrad)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      />
      <motion.circle
        cx="100" cy="65" r="22"
        fill="rgba(255,255,255,0.25)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
      />
      <motion.path
        d="M60 130 C60 110 78 100 100 100 C122 100 140 110 140 130"
        fill="rgba(255,255,255,0.2)"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.rect
        x="68" y="33" width="64" height="4" rx="2"
        fill="rgba(255,255,255,0.5)"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={85 + i * 15} cy={65} r="3"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4, delay: 0.7 + i * 0.15, type: 'spring' }}
        />
      ))}
      <motion.g
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <motion.rect x="70" y="148" width="60" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
      </motion.g>
      <defs>
        <linearGradient id="registerGrad" x1="20" y1="20" x2="180" y2="180">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const SubscriptionCardSVG = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="4" y="8" width="40" height="32" rx="6"
        fill="url(#subGrad)"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
      />
      <motion.circle
        cx="16" cy="20" r="4"
        fill="rgba(255,255,255,0.3)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      />
      <motion.rect
        x="24" y="18" width="14" height="4" rx="2"
        fill="rgba(255,255,255,0.5)"
        initial={{ width: 0 }}
        animate={{ width: 14 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
      <motion.rect
        x="24" y="26" width="10" height="3" rx="1.5"
        fill="rgba(255,255,255,0.3)"
        initial={{ width: 0 }}
        animate={{ width: 10 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
      <defs>
        <linearGradient id="subGrad" x1="4" y1="8" x2="44" y2="40">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const CalendarSVG = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="6" y="8" width="36" height="32" rx="6"
        fill="url(#calGrad)"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
      />
      <motion.rect x="6" y="18" width="36" height="6" fill="rgba(255,255,255,0.15)" />
      <motion.rect
        x="12" y="4" width="4" height="8" rx="2"
        fill="#667eea"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.rect
        x="32" y="4" width="4" height="8" rx="2"
        fill="#667eea"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.25 }}
      />
      <motion.text x="17" y="30" fill="white" fontSize="10" fontWeight="bold" letterSpacing="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >15</motion.text>
      <motion.circle
        cx="30" cy="28" r="6"
        fill="rgba(255,255,255,0.25)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
      />
      <defs>
        <linearGradient id="calGrad" x1="6" y1="8" x2="42" y2="40">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const StatsSVG = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="6" y="30" width="8" height="10" rx="2"
        fill="url(#statGrad)"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0 }}
        style={{ transformOrigin: '10px 40px' }}
      />
      <motion.rect
        x="18" y="20" width="8" height="20" rx="2"
        fill="url(#statGrad)"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        style={{ transformOrigin: '22px 40px' }}
      />
      <motion.rect
        x="30" y="10" width="8" height="30" rx="2"
        fill="url(#statGrad)"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{ transformOrigin: '34px 40px' }}
      />
      <motion.path
        d="M10 38 L22 28 L34 18"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <defs>
        <linearGradient id="statGrad" x1="6" y1="10" x2="38" y2="40">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const SettingsSVG = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="24" cy="24" r="18"
        stroke="url(#setGrad)" strokeWidth="3"
        strokeDasharray="90 20"
        initial={{ rotate: -90 }}
        animate={{ rotate: 270 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '24px 24px' }}
      />
      <motion.circle
        cx="24" cy="24" r="8"
        fill="url(#setGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
      />
      <motion.path
        d="M24 8 L24 12 M24 36 L24 40 M8 24 L12 24 M36 24 L40 24"
        stroke="url(#setGrad)" strokeWidth="2" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <defs>
        <linearGradient id="setGrad" x1="6" y1="6" x2="42" y2="42">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const InvitationEnvelopeSVG = () => {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="20" y="60" width="160" height="80" rx="8"
        fill="url(#envelopeGrad)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      />
      <motion.path
        d="M20 68L100 120L180 68"
        stroke="white" strokeWidth="2"
        fill="rgba(255,255,255,0.1)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.rect
        x="40" y="40" width="120" height="60" rx="4"
        fill="white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
      />
      <motion.line x1="60" y1="55" x2="140" y2="55" stroke="#667eea" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.line x1="60" y1="65" x2="120" y2="65" stroke="#999" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      />
      <motion.line x1="60" y1="75" x2="130" y2="75" stroke="#999" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle cx="100" cy="100" r="12" fill="white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2, type: 'spring' }}
      />
      <motion.path d="M94 100L98 104L106 96" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      />
      <defs>
        <linearGradient id="envelopeGrad" x1="20" y1="60" x2="180" y2="140">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const AnimatedUsersSVG = () => {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle cx="60" cy="50" r="20" fill="url(#userGrad1)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      />
      <motion.path d="M30 110C30 90 45 80 60 80C75 80 90 90 90 110" fill="url(#userGrad1)"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
      />
      <motion.circle cx="120" cy="50" r="20" fill="url(#userGrad2)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
      />
      <motion.path d="M90 110C90 90 105 80 120 80C135 80 150 90 150 110" fill="url(#userGrad2)"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
      />
      <motion.path d="M85 65L95 75L105 55" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />
      <motion.circle cx="135" cy="15" r="8" fill="#f59e0b"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1, type: 'spring' }}
      />
      <motion.text x="135" y="19" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >+</motion.text>
      <defs>
        <linearGradient id="userGrad1" x1="30" y1="30" x2="90" y2="110">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="userGrad2" x1="90" y1="30" x2="150" y2="110">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const CelebrationSVG = () => {
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle cx="75" cy="75" r="60" fill="url(#celebGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line key={angle}
          x1={75 + 35 * Math.cos((angle * Math.PI) / 180)}
          y1={75 + 35 * Math.sin((angle * Math.PI) / 180)}
          x2={75 + 50 * Math.cos((angle * Math.PI) / 180)}
          y2={75 + 50 * Math.sin((angle * Math.PI) / 180)}
          stroke="white" strokeWidth="2" strokeLinecap="round"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
        />
      ))}
      <motion.path d="M55 75L68 88L95 62" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <defs>
        <linearGradient id="celebGrad" x1="15" y1="15" x2="135" y2="135">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const MailWithSparklesSVG = () => {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="10" y="30" width="140" height="70" rx="10" fill="url(#mailGrad)"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      />
      <motion.path d="M10 40L80 80L150 40" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.1)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      {[{ cx: 30, cy: 20 }, { cx: 130, cy: 15 }, { cx: 140, cy: 90 }, { cx: 20, cy: 95 }].map((pos, i) => (
        <motion.g key={i}>
          <motion.circle cx={pos.cx} cy={pos.cy} r="4" fill="#fbbf24"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 0.8], opacity: [0, 1, 0.6] }}
            transition={{ duration: 1, delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.path d={`M${pos.cx - 6} ${pos.cy}L${pos.cx + 6} ${pos.cy}M${pos.cx} ${pos.cy - 6}L${pos.cx} ${pos.cy + 6}`}
            stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.2, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.g>
      ))}
      <defs>
        <linearGradient id="mailGrad" x1="10" y1="30" x2="150" y2="100">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoutSVG = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="12" y="6" width="16" height="28" rx="4" fill="url(#logoutGrad)"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
      />
      <motion.path d="M28 14 L34 20 L28 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.line x1="34" y1="20" x2="16" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
      <motion.circle cx="20" cy="18" r="3" fill="rgba(255,255,255,0.4)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      />
      <defs>
        <linearGradient id="logoutGrad" x1="12" y1="6" x2="28" y2="34">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const EmptyStateSVG = () => {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="20" y="30" width="80" height="60" rx="8" fill="url(#emptyGrad)" opacity="0.3"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      />
      <motion.circle cx="60" cy="55" r="15" fill="url(#emptyGrad)" opacity="0.2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.path d="M50 55L57 62L70 48" stroke="url(#emptyGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.line x1="35" y1="78" x2="85" y2="78" stroke="url(#emptyGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <defs>
        <linearGradient id="emptyGrad" x1="20" y1="30" x2="100" y2="90">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LoadingSpinnerSVG = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle cx="12" cy="12" r="10" stroke="#667eea" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0.3 }}
        animate={{ pathLength: [0.3, 0.8, 0.3], rotate: [0, 360, 720] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '12px 12px' }}
      />
    </svg>
  );
};

export const DashboardStatsSVG = () => {
  return (
    <svg width="200" height="140" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M10 110 L40 80 L70 95 L100 60 L130 70 L160 40 L190 50"
        stroke="url(#dashGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, type: 'spring' }}
      />
      <motion.circle cx="40" cy="80" r="5" fill="#667eea"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      />
      <motion.circle cx="100" cy="60" r="5" fill="#10b981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
      />
      <motion.circle cx="160" cy="40" r="5" fill="#f59e0b"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      />
      <motion.rect x="10" y="110" width="80" height="20" rx="4" fill="url(#dashGrad)" opacity="0.15"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ transformOrigin: '50px 120px' }}
      />
      <defs>
        <linearGradient id="dashGrad" x1="10" y1="40" x2="190" y2="110">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  );
};
