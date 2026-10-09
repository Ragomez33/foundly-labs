import type { SvgIconComponent } from '@mui/icons-material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export interface AdminNavItem {
  href: string;
  label: string;
  icon: SvgIconComponent;
}

/** Primary module navigation for the Foundly Book admin panel. */
export const PRIMARY_NAV: AdminNavItem[] = [
  { href: '/agenda', label: 'Agenda', icon: EventNoteIcon },
  { href: '/services', label: 'Servicios', icon: DesignServicesIcon },
  { href: '/availability', label: 'Disponibilidad', icon: ScheduleIcon },
];

/** Secondary, non-core options (placeholder sections for this version). */
export const SECONDARY_NAV: AdminNavItem[] = [
  { href: '/configuracion', label: 'Configuración', icon: SettingsIcon },
  { href: '/soporte', label: 'Ayuda y soporte', icon: SupportAgentIcon },
  { href: '/acerca', label: 'Acerca de Foundly', icon: InfoOutlinedIcon },
];
