export function getDeadlineStatus(dueDateStr: string, status: string): {
  label: string;
  isOverdue: boolean;
  colorClass: string;
  badgeClass: string;
  daysRemaining: number;
} {
  if (status === 'graded' || status === 'submitted') {
    return {
      label: status === 'graded' ? 'Graded' : 'Submitted',
      isOverdue: false,
      colorClass: 'text-emerald-400',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      daysRemaining: 999,
    };
  }

  const now = new Date();
  const due = new Date(dueDateStr);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (diffMs < 0) {
    const daysAgo = Math.abs(diffDays);
    return {
      label: daysAgo === 0 ? 'Overdue today' : `Overdue by ${daysAgo}d`,
      isOverdue: true,
      colorClass: 'text-rose-400',
      badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse',
      daysRemaining: diffDays,
    };
  }

  if (diffHours <= 12) {
    return {
      label: diffHours <= 1 ? 'Due in <1 hour' : `Due in ${diffHours}h`,
      isOverdue: false,
      colorClass: 'text-rose-400',
      badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      daysRemaining: 0,
    };
  }

  if (diffDays <= 1) {
    return {
      label: 'Due tomorrow',
      isOverdue: false,
      colorClass: 'text-amber-400',
      badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      daysRemaining: 1,
    };
  }

  if (diffDays <= 3) {
    return {
      label: `Due in ${diffDays} days`,
      isOverdue: false,
      colorClass: 'text-amber-300',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      daysRemaining: diffDays,
    };
  }

  return {
    label: `Due in ${diffDays} days`,
    isOverdue: false,
    colorClass: 'text-slate-300',
    badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
    daysRemaining: diffDays,
  };
}

export function formatDateTime(isoStr: string): string {
  try {
    const date = new Date(isoStr);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch (e) {
    return isoStr;
  }
}
