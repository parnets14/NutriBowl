"use client"

import { useState } from "react"
import { useAdminAuth } from "../hooks/AdminAuthProvider"
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  LogOut,
  Users,
  MessageSquare,
  UtensilsCrossed,
  BarChart3,
  ChefHat,
  Shield,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar"
import { Separator } from "../components/ui/separator"
import ExpertsManager from "./Experts"
import TestimonialsManager from "./AdminTestimonial"
import MealPlansManager from "./MealPlans"
import StayFitMealManager from "./AdminStayfit"
import WeightGainMealManager from "./AdminWeightGain"
import WeightLossMealManager from "./AdminWeightLoss"
import MenuManager from "./AdminMenu"
import AuthTest from "../Admin/AuthTest"
import AdminAbout from "./AdminAbout"

import AdminBanner from "./AdminBanner"

const menuItems = [
  { title: "Overview", icon: BarChart3, id: "overview" },
  { title: "Auth Test", icon: Shield, id: "auth-test" },
  { title: "Experts", icon: Users, id: "experts" },
  { title: "Testimonials", icon: MessageSquare, id: "testimonials" },
  { title: "Menu", icon: ChefHat, id: "menu" },
  { title: "Meal Plans", icon: UtensilsCrossed, id: "meal-plans" },
  {title:"About", icon:Shield, id:"about"},
  {title:"Banner", icon:Shield, id:"banner"},
]

const mealPlanCategories = [
  { title: "Stay Fit Plans", id: "stay-fit-meals", color: "text-green-600" },
  { title: "Weight Gain Plans", id: "weight-gain-meals", color: "text-purple-600" },
  { title: "Weight Loss Plans", id: "weight-loss-meals", color: "text-blue-600" },
]

function AppSidebar({ setActiveView }) {
  const { user, logout } = useAdminAuth()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-800">NutriBowl</h2>
            <p className="text-xs text-gray-600">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <button onClick={() => setActiveView(item.id)} className="w-full flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Meal Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mealPlanCategories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => setActiveView(category.id)}
                      className={`w-full flex items-center space-x-2 ${category.color}`}
                    >
                      <UtensilsCrossed className="w-4 h-4" />
                      <span>{category.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-4 py-2">
              <p className="text-sm text-gray-600">Welcome,</p>
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={logout} className="w-full flex items-center space-x-2 text-red-600 hover:text-red-700">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("overview")

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <OverviewContent setActiveView={setActiveView} />
      case "auth-test":
        return <AuthTest />
      case "about":
        return<AdminAbout/>
        case "banner":
          return<AdminBanner/>
      case "experts":
        return <ExpertsManager />
      case "testimonials":
        return <TestimonialsManager />
      case "menu":
        return <MenuManager />
      case "meal-plans":
        return <MealPlansManager />
      case "stay-fit-meals":
        return <StayFitMealManager />
      case "weight-gain-meals":
        return <WeightGainMealManager />
      case "weight-loss-meals":
        return <WeightLossMealManager />
      default:
        return <OverviewContent setActiveView={setActiveView} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar setActiveView={setActiveView} />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-green-800">
                {activeView === "overview" && "Dashboard Overview"}
                {activeView === "auth-test" && "Authentication Test"}
                {activeView === "about" && "About"}
                {activeView === "experts" && "Experts Management"}
                {activeView === "testimonials" && "Testimonials Management"}
                {activeView === "menu" && "Menu Management"}
                {activeView === "meal-plans" && "Meal Plans Management"}
                {activeView === "stay-fit-meals" && "Stay Fit Meal Plans"}
                {activeView === "weight-gain-meals" && "Weight Gain Meal Plans"}
                {activeView === "weight-loss-meals" && "Weight Loss Meal Plans"}
              </h1>
            </div>
          </header>

          <main className="flex-1 p-6">{renderContent()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function OverviewContent({ setActiveView }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Experts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active nutrition experts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Customer reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meal Plans</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Available plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Registered customers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => setActiveView("experts")} className="h-20 flex flex-col items-center justify-center space-y-2">
            <Users className="w-6 h-6" />
            <span>Manage Experts</span>
          </Button>
          <Button onClick={() => setActiveView("testimonials")} variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <MessageSquare className="w-6 h-6" />
            <span>Manage Reviews</span>
          </Button>
          <Button onClick={() => setActiveView("meal-plans")} variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <UtensilsCrossed className="w-6 h-6" />
            <span>Manage Meal Plans</span>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meal Plan Categories</CardTitle>
          <CardDescription>Manage detailed meal plans for each category</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => setActiveView("stay-fit-meals")} variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 border-green-200 hover:bg-green-50">
            <UtensilsCrossed className="w-6 h-6 text-green-600" />
            <span className="text-green-600 font-medium">Stay Fit Plans</span>
            <span className="text-xs text-gray-500">Maintenance nutrition</span>
          </Button>
          <Button onClick={() => setActiveView("weight-gain-meals")} variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 border-purple-200 hover:bg-purple-50">
            <UtensilsCrossed className="w-6 h-6 text-purple-600" />
            <span className="text-purple-600 font-medium">Weight Gain Plans</span>
            <span className="text-xs text-gray-500">Muscle building nutrition</span>
          </Button>
          <Button onClick={() => setActiveView("weight-loss-meals")} variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 border-blue-200 hover:bg-blue-50">
            <UtensilsCrossed className="w-6 h-6 text-blue-600" />
            <span className="text-blue-600 font-medium">Weight Loss Plans</span>
            <span className="text-xs text-gray-500">Fat loss nutrition</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
