import { Bell, Headphones, CircleUser } from 'lucide-react';

export default function ConsumerHeader({ onLogout }) {
  return (
    <header className="bg-white z-40 px-5 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
      <button onClick={onLogout} className="text-[#353535]">
        <CircleUser size={28} strokeWidth={2} />
      </button>

      <div className="flex items-center gap-5 text-[#353535]">
        <button>
          <Bell size={24} strokeWidth={1.5} />
        </button>
        <button>
          <Headphones size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
