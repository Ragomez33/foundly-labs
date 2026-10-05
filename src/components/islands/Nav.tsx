import { useState } from 'react';
import type { NavItem } from '@/types';

interface NavProps {
  items: NavItem[];
}

export default function Nav({ items }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Principal">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700"
      >
        Menú
      </button>
      <ul id="primary-navigation" hidden={!open} className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="block rounded px-3 py-2 text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
