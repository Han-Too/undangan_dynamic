<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import AppSidebar from '@/components/admin/AppSidebar.vue';
import { pageCrumb } from '@/components/admin/format';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const route = useRoute();

/** [{ label, to? }] — item terakhir = halaman aktif. */
const crumbs = computed(() => {
  switch (route.name) {
    case 'guests':
      return [{ label: 'Undangan', to: '/admin' }, { label: pageCrumb.value || 'Tamu' }];
    default:
      return [{ label: route.meta.title ?? 'Dashboard' }];
  }
});
</script>

<template>
  <SidebarProvider class="ui-admin">
    <AppSidebar />
    <SidebarInset>
      <header class="bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4 md:rounded-t-xl lg:px-6">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <template v-for="(c, i) in crumbs" :key="i">
              <BreadcrumbSeparator v-if="i > 0" />
              <BreadcrumbItem>
                <BreadcrumbLink v-if="c.to" as-child><RouterLink :to="c.to">{{ c.label }}</RouterLink></BreadcrumbLink>
                <BreadcrumbPage v-else class="max-w-[50vw] truncate">{{ c.label }}</BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main class="flex flex-1 flex-col">
        <div class="mx-auto w-full max-w-7xl flex-1 p-4 md:p-6 lg:p-8">
          <RouterView />
        </div>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
