import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from './composables/useAuth';
import { setUnauthorizedHandler } from './services/api';

/**
 * /login, /admin/...           dashboard (wajib login)
 * /:slug                       undangan umum
 * /:slug/:guest                undangan pribadi per tamu ("Kepada Yth. Adit & Istri")
 * Rute statis (/admin, /login) selalu menang atas /:slug, karena itu slug tersebut dicadangkan di backend.
 */
const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/login', name: 'login', component: () => import('./views/LoginView.vue'), meta: { guest: true, title: 'Login' } },
  {
    path: '/admin',
    component: () => import('./views/admin/AdminLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('./views/admin/DashboardView.vue'), meta: { title: 'Undangan' } },
      { path: 'invitations/:id/guests', name: 'guests', component: () => import('./views/admin/GuestsView.vue'), meta: { title: 'Tamu' } },
      { path: 'users', name: 'users', component: () => import('./views/admin/UsersView.vue'), meta: { admin: true, title: 'Pengguna' } },
      { path: 'profile', name: 'profile', component: () => import('./views/admin/ProfileView.vue'), meta: { title: 'Profil' } },
    ],
  },
  { path: '/admin/invitations/:id/edit', name: 'builder', component: () => import('./views/BuilderView.vue'), meta: { auth: true, title: 'Editor' } },
  { path: '/:slug/:guest?', name: 'invitation', component: () => import('./views/PublicInvitationView.vue') },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('./views/NotFoundView.vue') },
];

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach(async (to) => {
  const { user, isAdmin, fetchUser } = useAuth();
  const needsUser = to.matched.some((r) => r.meta.auth) || to.meta.guest;
  if (needsUser && !user.value) await fetchUser();

  if (to.matched.some((r) => r.meta.auth) && !user.value) return { name: 'login', query: { redirect: to.fullPath } };
  if (to.meta.guest && user.value) return { name: 'dashboard' };
  if (to.meta.admin && !isAdmin.value) return { name: 'dashboard' };
});

router.afterEach((to) => {
  if (to.meta.title) document.title = `${to.meta.title} · Undangan Studio`;
});

setUnauthorizedHandler(() => {
  useAuth().clear();
  const current = router.currentRoute.value;
  if (current.matched.some((r) => r.meta.auth)) router.push({ name: 'login', query: { redirect: current.fullPath } });
});
