import { Clock } from 'lucide-react';

export default function Badge({ hoursLeft }) {
  const isUrgent = hoursLeft < 2;
  const isWarning = hoursLeft >= 2 && hoursLeft < 24;
  
  let colorClasses = 'bg-brand-blue/10 text-brand-blue';
  if (isUrgent) {
    colorClasses = 'bg-brand-urgent/10 text-brand-urgent';
  } else if (isWarning) {
    colorClasses = 'bg-brand-warning/10 text-brand-warning-dark text-amber-700';
  }

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${colorClasses}`}>
      <Clock size={12} strokeWidth={2.5} />
      <span>Expires in: {hoursLeft} {hoursLeft === 1 ? 'hour' : 'hours'}</span>
    </div>
  );
}
