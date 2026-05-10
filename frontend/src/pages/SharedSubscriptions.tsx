import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Mail,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  UserPlus,
  CreditCard,
  Clock,
  AlertCircle,
  Send,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useSubscriptions, useInviteMember, useAcceptInvitation, useRemoveMember, useResendInvitation, useLeaveSharedSubscription } from '@/hooks/useSubscriptions';
import { useStats } from '@/hooks/useSubscriptions';
import { formatCurrency, getDaysUntil } from '@/lib/utils';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { InvitationEnvelopeSVG, AnimatedUsersSVG, CelebrationSVG, MailWithSparklesSVG } from '@/components/AnimatedSVG';

const SharedSubscriptions = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'mine' | 'invitations'>('mine');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteAmount, setInviteAmount] = useState('');
  const [acceptSuccess, setAcceptSuccess] = useState(false);

  const { data: subsData, isLoading } = useSubscriptions({ status: 'active' });
  const { data: statsData } = useStats();
  const inviteMutation = useInviteMember();
  const acceptMutation = useAcceptInvitation();
  const removeMutation = useRemoveMember();
  const resendMutation = useResendInvitation();
  const leaveMutation = useLeaveSharedSubscription();

  const subscriptions = subsData?.subscriptions || [];
  const stats = statsData;

  const sharedSubscriptions = subscriptions.filter((sub: any) => sub.isShared);
  const mySubscriptions = subscriptions.filter((sub: any) => !sub.isShared);

  const pendingInvitations = subscriptions.filter((sub: any) =>
    sub.sharedMembers?.some((m: any) => m.status === 'pending')
  );

  useEffect(() => {
    const acceptParam = searchParams.get('accept');
    const emailParam = searchParams.get('email');
    if (acceptParam && emailParam) {
      setActiveTab('invitations');
      const timer = setTimeout(() => {
        handleAccept(acceptParam);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleAccept = async (subId: string) => {
    try {
      await acceptMutation.mutateAsync(subId);
      setAcceptSuccess(true);
      setTimeout(() => setAcceptSuccess(false), 3000);
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleResendInvite = async (subId: string, email: string) => {
    try {
      await resendMutation.mutateAsync({ id: subId, email });
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleInvite = async () => {
    if (!selectedSub || !inviteEmail || !inviteAmount) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await inviteMutation.mutateAsync({
        id: selectedSub._id,
        data: {
          email: inviteEmail,
          shareAmount: parseFloat(inviteAmount),
        },
      });
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteAmount('');
      setSelectedSub(null);
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleRemoveMember = async (subId: string, memberEmail: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;
    try {
      await removeMutation.mutateAsync({ id: subId, memberEmail });
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleLeave = async (subId: string) => {
    if (!confirm('Are you sure you want to leave this shared subscription?')) return;
    try {
      await leaveMutation.mutateAsync(subId);
    } catch (error) {
      // Error handled in mutation
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      } as any,
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="url(#headerGrad)" strokeWidth="3" strokeDasharray="8 4" />
              <path d="M15 20L24 28L33 20" stroke="url(#headerGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="headerGrad" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Shared Subscriptions
            </h1>
            <p className="text-muted-foreground">Manage family and group subscriptions</p>
          </div>
        </div>
        <button
          className="btn-primary gap-2"
          onClick={() => {
            if (mySubscriptions.length === 0) {
              toast.error('You need at least one subscription to share');
              return;
            }
            setShowInviteModal(true);
          }}
        >
          <UserPlus size={16} />
          Share Subscription
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-2 border-b"
      >
        <button
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'mine'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('mine')}
        >
          <span className="flex items-center gap-2">
            <Users size={16} />
            My Shared Subs
          </span>
          {activeTab === 'mine' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'invitations'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('invitations')}
        >
          <span className="flex items-center gap-2">
            <Mail size={16} />
            Pending Invitations
          </span>
          {pendingInvitations.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
            >
              {pendingInvitations.length}
            </motion.span>
          )}
          {activeTab === 'invitations' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'mine' ? (
          <motion.div
            key="mine"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card p-6">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse mb-4" />
                    <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : sharedSubscriptions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-12 text-center"
              >
                <div className="flex justify-center mb-6">
                  <InvitationEnvelopeSVG />
                </div>
                <p className="text-muted-foreground mb-4">No shared subscriptions yet</p>
                <button
                  className="btn-primary gap-2"
                  onClick={() => setShowInviteModal(true)}
                >
                  <Plus size={16} />
                  Share Your First Subscription
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sharedSubscriptions.map((sub: any) => (
                  <motion.div
                    key={sub._id}
                    variants={itemVariants}
                    className="card p-6 relative overflow-hidden group"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        background: [
                          'linear-gradient(135deg, rgba(var(--primary), 0.05) 0%, rgba(126, 75, 162, 0.05) 100%)',
                          'linear-gradient(225deg, rgba(var(--primary), 0.1) 0%, rgba(126, 75, 162, 0.1) 100%)',
                          'linear-gradient(135deg, rgba(var(--primary), 0.05) 0%, rgba(126, 75, 162, 0.05) 100%)',
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="p-2 rounded-lg bg-primary/10"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                          >
                            <CreditCard size={20} className="text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold">{sub.name}</h3>
                            <span className="text-sm text-muted-foreground">
                              {formatCurrency(sub.price, sub.currency)}
                            </span>
                          </div>
                        </div>
                        <motion.span
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-500/10 text-green-600 rounded-full"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Users size={12} />
                          {sub.sharedMembers?.filter((m: any) => m.status === 'active').length || 0}
                        </motion.span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Billing</span>
                          <span className="capitalize">{sub.billingCycle}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Next Payment</span>
                          <span className={getDaysUntil(sub.nextBillingDate) <= 3 ? 'text-red-500' : ''}>
                            {format(new Date(sub.nextBillingDate), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Your Role</span>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            Owner
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Members</p>
                        <div className="space-y-2">
                          {sub.sharedMembers?.map((member: any, idx: number) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center justify-between text-sm"
                            >
                              <div className="flex items-center gap-2">
                                {member.status === 'active' ? (
                                  <CheckCircle size={14} className="text-green-500" />
                                ) : (
                                  <Clock size={14} className="text-orange-500" />
                                )}
                                <span className={member.status === 'pending' ? 'text-muted-foreground' : ''}>
                                  {member.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {formatCurrency(member.shareAmount, sub.currency)}
                                </span>
                                {member.status === 'pending' && (
                                  <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleResendInvite(sub._id, member.email)}
                                    className="text-primary hover:text-purple-700 transition-colors"
                                    title="Resend invitation"
                                  >
                                    <Send size={12} />
                                  </motion.button>
                                )}
                                {member.status === 'active' && (
                                  <button
                                    onClick={() => handleRemoveMember(sub._id, member.email)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="invitations"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            <AnimatePresence>
              {acceptSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl"
                  >
                    <div className="flex justify-center mb-4">
                      <CelebrationSVG />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Invitation Accepted!</h3>
                    <p className="text-muted-foreground">You're now part of the shared subscription</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {pendingInvitations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-12 text-center"
              >
                <div className="flex justify-center mb-6">
                  <MailWithSparklesSVG />
                </div>
                <p className="text-muted-foreground">No pending invitations</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {pendingInvitations.map((sub: any) => {
                  const pendingMember = sub.sharedMembers?.find(
                    (m: any) => m.status === 'pending'
                  );
                  return (
                    <motion.div
                      key={sub._id}
                      variants={itemVariants}
                      className="card p-6 relative overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-pink-500/10"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <AlertCircle size={24} className="text-orange-500" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold text-lg">{sub.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Invited to share {formatCurrency(sub.price, sub.currency)} subscription
                            </p>
                            {pendingMember && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Your share: {formatCurrency(pendingMember.shareAmount, sub.currency)}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            className="btn-primary gap-2"
                            onClick={() => handleAccept(sub._id)}
                            disabled={acceptMutation.isPending}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {acceptMutation.isPending ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              >
                                <Sparkles size={16} />
                              </motion.div>
                            ) : (
                              <>
                                <CheckCircle size={16} />
                                Accept
                              </>
                            )}
                          </motion.button>
                          <motion.button
                            className="btn-danger gap-2"
                            onClick={() => handleRemoveMember(sub._id, pendingMember?.email)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <XCircle size={16} />
                            Decline
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="card w-full max-w-md p-6 mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="5" y="10" width="30" height="20" rx="4" fill="url(#modalGrad)" />
                    <path d="M5 14L20 24L35 14" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
                    <defs>
                      <linearGradient id="modalGrad" x1="5" y1="10" x2="35" y2="30">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                <h2 className="text-xl font-bold">Share Subscription</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="label mb-2">Select Subscription</label>
                  <select
                    className="input"
                    value={selectedSub?._id || ''}
                    onChange={(e) => {
                      const sub = mySubscriptions.find((s: any) => s._id === e.target.value);
                      setSelectedSub(sub);
                      setInviteAmount(((sub?.price || 0) / 2).toFixed(2));
                    }}
                  >
                    <option value="">Choose a subscription...</option>
                    {mySubscriptions.map((sub: any) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name} - {formatCurrency(sub.price, sub.currency)}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSub && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="label mb-2">Member Email</label>
                      <input
                        type="email"
                        className="input"
                        placeholder="friend@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label mb-2">
                        Share Amount ({selectedSub.currency})
                      </label>
                      <input
                        type="number"
                        className="input"
                        placeholder="0.00"
                        value={inviteAmount}
                        onChange={(e) => setInviteAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Total: {formatCurrency(selectedSub.price, selectedSub.currency)} ÷{' '}
                        {inviteAmount ? Math.floor((selectedSub.price || 0) / parseFloat(inviteAmount)) : '?'} people
                      </p>
                    </div>
                    <motion.div
                      className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={16} className="text-primary" />
                        <span className="text-muted-foreground">
                          An invitation email will be sent with your share details
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                <div className="flex gap-2 pt-4">
                  <button
                    className="btn-secondary flex-1"
                    onClick={() => {
                      setShowInviteModal(false);
                      setSelectedSub(null);
                      setInviteEmail('');
                      setInviteAmount('');
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-primary flex-1 gap-2"
                    onClick={handleInvite}
                    disabled={inviteMutation.isPending}
                  >
                    {inviteMutation.isPending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles size={16} />
                      </motion.div>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Invite
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SharedSubscriptions;
