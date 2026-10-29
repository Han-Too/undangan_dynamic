<script setup>
import { computed, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ChevronsUpDownIcon, HeartIcon, LogOutIcon, MailIcon, UserIcon, UsersIcon } from '@lucide/vue';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/composables/useAuth';
import { initialsOf } from './format';

const { user, isAdmin, logout } = useAuth();
const { isMobile, setOpenMobile } = useSidebar();
const route = useRoute();
const router = useRouter();

const nav = computed(() => [
  { title: 'Undangan', to: '/admin', icon: MailIcon, active: ['dashboard', 'guests'].includes(route.name) },
  ...(isAdmin.value ? [{ title: 'Pengguna', to: '/admin/users', icon: UsersIcon, active: route.name === 'users' }] : []),
]);

// Di HP sidebar berupa sheet; tutup setelah pindah halaman.
watch(() => route.fullPath, () => setOpenMobile(false));

async function onLogout() {
  await logout();
  router.replace('/login');
}
</script>

<template>
  <Sidebar collapsible="offcanvas" variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child size="lg">
            <RouterLink to="/admin">
              <span class="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <HeartIcon class="size-4" />
              </span>
              <span class="grid flex-1 text-left leading-tight">
                <span class="truncate font-semibold">Undangan Studio</span>
                <span class="text-muted-foreground truncate text-xs">Dashboard</span>
              </span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Kelola</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in nav" :key="item.to">
              <SidebarMenuButton as-child :is-active="item.active" :tooltip="item.title">
                <RouterLink :to="item.to"><component :is="item.icon" /><span>{{ item.title }}</span></RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Akun</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child :is-active="route.name === 'profile'" tooltip="Profil">
                <RouterLink to="/admin/profile"><UserIcon /><span>Profil</span></RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar class="size-8 rounded-lg">
                  <AvatarFallback class="rounded-lg">{{ initialsOf(user?.name) }}</AvatarFallback>
                </Avatar>
                <span class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{{ user?.name }}</span>
                  <span class="text-muted-foreground truncate text-xs">{{ user?.email }}</span>
                </span>
                <ChevronsUpDownIcon class="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg" :side="isMobile ? 'bottom' : 'right'" align="end" :side-offset="4">
              <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar class="size-8 rounded-lg">
                    <AvatarFallback class="rounded-lg">{{ initialsOf(user?.name) }}</AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 leading-tight">
                    <span class="truncate font-medium">{{ user?.name }}</span>
                    <span class="text-muted-foreground truncate text-xs">{{ isAdmin ? 'Admin' : 'User' }} · {{ user?.email }}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem as-child>
                  <RouterLink to="/admin/profile"><UserIcon /> Profil</RouterLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem @select="onLogout"><LogOutIcon /> Keluar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
