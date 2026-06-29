import { Bell, Headphones, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ConsumerHeader({ onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-white z-50 px-2 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
      <button onClick={onLogout} className="text-[#353535]">
        <User size={28} strokeWidth={1.5} />
      </button>

      <div className="flex items-center gap-5 text-[#353535]">
        <button onClick={() => navigate('/consumer/notifications-feed')}>
          <Bell size={24} strokeWidth={1.5} />
        </button>
        <button>
          <Headphones size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
