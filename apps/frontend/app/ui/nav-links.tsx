"use client";

// import {
//   UserGroupIcon,
//   HomeIcon,
//   UserIcon,
//   CurrencyDollarIcon,
// } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from "@/components/ui/sidebar"

// // Map of links to display in the side navigation.
// // Depending on the size of the application, this would be stored in a database.
// const links = [
//   { name: "Home", href: "/dashboard", icon: HomeIcon },
//   {
//     name: "HRM",
//     href: "/hrm",
//     icon: UserIcon,
//     children: [
//       { name: "Departments", href: "/hrm/departments", icon: UserGroupIcon },
//       { name: "Employees", href: "/hrm/employees", icon: UserGroupIcon },
//       { name: "Salaries", href: "/hrm/salaries", icon: CurrencyDollarIcon },
//     ],
//   },
//   { name: "Projects", href: "/proj", icon: UserGroupIcon },
//   { name: "Others", href: "/oth", icon: CurrencyDollarIcon },
// ];

// export default function NavLinks() {
//   return (
//     <NavigationMenu orientation="vertical">
//       <NavigationMenuList className="flex-col items-start">
//       {links.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//         <NavigationMenuItem key={link.name}>
//           <NavigationMenuTrigger>
//           <Link href={link.href} className="flex items-center gap-2">
//             <LinkIcon className="w-6" />
//             <span>{link.name}</span>
//           </Link>
//           </NavigationMenuTrigger>
//           {link.children && (
//           <NavigationMenuContent>
//             <NavigationMenuList>
//             {link.children.map((child) => {
//               const ChildIcon = child.icon;
//               return (
//               <NavigationMenuItem key={child.name}>
//                 <NavigationMenuLink asChild>
//                 <Link href={child.href} className="flex items-center gap-2">
//                   <ChildIcon className="w-6" />
//                   <span>{child.name}</span>
//                 </Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>
//               );
//             })}
//             </NavigationMenuList>
//           </NavigationMenuContent>
//           )}
//         </NavigationMenuItem>
//         );
//       })}
//       </NavigationMenuList>
//       <NavigationMenuIndicator />
//       <NavigationMenuViewport />
//     </NavigationMenu>
//   );
// }

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "主页",
      url: "/dashboard",
      items: [
        {
          title: "总体情况",
          url: "/dashboard",
        },
        {
          title: "个人情况",
          url: "#",
        },
      ],
    },
    {
      title: "人力资源管理",
      url: "#",
      items: [
        {
          title: "部门",
          url: "/hrm/departments",
        },
        {
          title: "员工",
          url: "/hrm/employees",
          isActive: true,
        },
        {
          title: "薪酬",
          url: "/hrm/salaries",
        },
      ],
    },
    {
      title: "项目管理",
      url: "/project",
      items: [
        {
          title: "项目部",
          url: "/project/projects",
        },
        {
          title: "隧道区间",
          url: "/project/subprojects",
        },
        {
          title: "进度管理",
          url: "#",
        },
      ],
    },
    {
      title: "指挥中心",
      url: "/production-center",
      items: [
        {
          title: "施工进度",
          url: "/production-center/construction-progress",
        },
        {
          title: "任务调度",
          url: "/production-center/task-dispatch",
        },

        {
          title: "项目监控",
          url: "/production-center/tbm-monitor",
        },
        {
          title: "报表统计",
          url: "/production-center/work-report",
        },
      ],
    },
    {
      title: "资源中心",
      url: "/resource-center",
      items: [
        {
          title: "区间",
          url: "/resource-center/tunnel",
        },
        {
          title: "车站",
          url: "/resource-center/station",
        },

        {
          title: "盾构机",
          url: "/resource-center/tbm",
        },
        {
          title: "其他设备",
          url: "/resource-center/others",
        },
      ],
    },
    {
      title: "其他",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
};

export default function NavLinks({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <SidebarProvider>
      <Sidebar {...props}>
        <SidebarHeader>
          <VersionSwitcher
            versions={data.versions}
            defaultVersion={data.versions[0]}
          />
          <SearchForm />
        </SidebarHeader>
        <SidebarContent className="gap-0">
          {/* We create a collapsible SidebarGroup for each parent. */}
          {data.navMain.map((item) => (
            <Collapsible
              key={item.title}
              title={item.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger>
                    {item.title}{" "}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={item.url === pathname}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
