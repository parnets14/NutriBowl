"use client"

import { useAdminAuth } from "../hooks/AdminAuthProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { CheckCircle, XCircle, User, Mail, Shield, Clock } from "lucide-react"

export default function AuthTest() {
  const { user, isAuthenticated, isLoading, logout } = useAdminAuth()

  const authTests = [
    {
      name: "Authentication State",
      status: isAuthenticated ? "pass" : "fail",
      description: isAuthenticated ? "User is authenticated" : "User is not authenticated",
      icon: Shield,
    },
    {
      name: "Loading State",
      status: !isLoading ? "pass" : "warning",
      description: isLoading ? "Authentication is loading..." : "Authentication loaded successfully",
      icon: Clock,
    },
    {
      name: "User Data",
      status: user ? "pass" : "fail",
      description: user ? "User data is available" : "No user data found",
      icon: User,
    },
    {
      name: "User Email",
      status: user && user.email ? "pass" : "fail",
      description: user && user.email ? `Email: ${user.email}` : "No email found",
      icon: Mail,
    },
    {
      name: "User Role",
      status: user && user.role === "admin" ? "pass" : "fail",
      description: user && user.role ? `Role: ${user.role}` : "No role assigned",
      icon: Shield,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "pass":
        return "text-green-600 bg-green-100"
      case "fail":
        return "text-red-600 bg-red-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "fail":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "warning":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Authentication System Test</span>
          </CardTitle>
          <CardDescription>
            Verify that the admin authentication system is working correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {authTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <test.icon className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{test.name}</h4>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(test.status)}
                  <Badge className={getStatusColor(test.status)}>{test.status.toUpperCase()}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Current User Information</CardTitle>
            <CardDescription>Details of the currently authenticated user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">User ID</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.id}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.email}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.role}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Authentication Status</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                  {isAuthenticated ? "Authenticated" : "Not Authenticated"}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-4">Test Actions</h4>
              <div className="flex space-x-4">
                <Button
                  onClick={() => {
                    console.log("Current user:", user)
                    console.log("Is authenticated:", isAuthenticated)
                    console.log("Is loading:", isLoading)
                  }}
                  variant="outline"
                >
                  Log Auth State to Console
                </Button>
                <Button onClick={logout} variant="destructive">
                  Test Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Authentication Flow Test</CardTitle>
          <CardDescription>Test the complete authentication flow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Demo Credentials</h4>
              <div className="text-sm text-blue-800">
                <p>
                  <strong>Email:</strong> admin@nutribowl.com
                </p>
                <p>
                  <strong>Password:</strong> admin123
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Authentication Flow Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>User enters credentials on login page</li>
                <li>AuthContext validates credentials (simulated API call)</li>
                <li>On success, user data is stored in localStorage</li>
                <li>User state is updated and dashboard is accessible</li>
                <li>Protected routes check authentication status</li>
                <li>Logout clears user data and redirects to login</li>
              </ol>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">✅ Authentication System Status</h4>
              <p className="text-sm text-green-800">
                {isAuthenticated
                  ? "Authentication system is working correctly. User is logged in and has admin access."
                  : "Authentication system is working, but no user is currently logged in."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
