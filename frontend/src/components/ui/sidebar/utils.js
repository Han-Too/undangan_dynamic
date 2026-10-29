import { createContext } from "reka-ui";

export const SIDEBAR_COOKIE_NAME = "sidebar_state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "18rem"; // 16rem x --admin-scale (lihat styles/shadcn.css)
export const SIDEBAR_WIDTH_MOBILE = "20rem";
export const SIDEBAR_WIDTH_ICON = "3.375rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";
export const SIDEBAR_MOBILE_BREAKPOINT = 768;

export const [useSidebar, provideSidebarContext] = createContext("Sidebar");
