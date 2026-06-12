import { IconNotificationBell, IconHeadphones, IconUserProfile } from '../shared/ui/CustomIcons';

export default function ConsumerHeader({ onLogout }) {
  return (
    <header className="bg-white z-40 px-5 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
      <button onClick={onLogout} className="text-[#353535]">
        <IconUserProfile size={28} />
      </button>

      <div className="flex items-center gap-5 text-[#353535]">
        <button>
          <IconNotificationBell size={24} />
        </button>
        <button>
          <IconHeadphones size={24} />
        </button>
      </div>
    </header>
  );
}
