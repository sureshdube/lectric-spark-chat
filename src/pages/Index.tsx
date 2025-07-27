import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Package, Settings, User, Zap, Shield, Headphones } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-primary">Electric Assist</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Your electric scooter support portal
            </p>
            <p className="text-muted-foreground mt-2">
              Get instant support for your electric scooter, track orders, and manage your account.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Login/Registration Card */}
            <Card className="backdrop-blur-sm bg-card/80 border-2">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Access Portal</CardTitle>
                <CardDescription className="text-center">
                  Login to access your support dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Customer Login</TabsTrigger>
                    <TabsTrigger value="admin">Admin Access</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => setIsAuthenticated(true)}
                    >
                      Send OTP
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We'll send you a verification code via SMS
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="admin" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="admin@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <Button 
                      className="w-full" 
                      variant="secondary"
                      onClick={() => setIsAuthenticated(true)}
                    >
                      Admin Login
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Features Overview */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Platform Features</h3>
              <div className="grid gap-3">
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">AI Support Chat</h4>
                      <p className="text-sm text-muted-foreground">Get instant help with natural language FAQ</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Order Tracking</h4>
                      <p className="text-sm text-muted-foreground">Track your scooter orders and delivery status</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Secure Authentication</h4>
                      <p className="text-sm text-muted-foreground">OTP-based secure mobile authentication</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Headphones className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">24/7 Support</h4>
                      <p className="text-sm text-muted-foreground">Round-the-clock customer support tickets</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  const features = [
    {
      title: 'Support Chat',
      description: 'Get instant help with your scooter',
      icon: MessageCircle,
      action: () => alert('Opening chat support...'),
    },
    {
      title: 'My Orders',
      description: 'Track your order status and delivery',
      icon: Package,
      action: () => alert('Opening order tracking...'),
    },
    {
      title: 'Profile Settings',
      description: 'Manage your account and preferences',
      icon: User,
      action: () => alert('Opening profile settings...'),
    },
    {
      title: 'Admin Dashboard',
      description: 'Manage users, FAQs, and support tickets',
      icon: Settings,
      action: () => alert('Opening admin dashboard...'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Electric Assist</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        {/* Welcome Section */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription className="text-lg">
              How can we assist you with your electric scooter today?
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 border-2 hover:border-primary/50"
              onClick={feature.action}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used support options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="h-auto py-4 flex-col gap-2">
                <MessageCircle className="h-5 w-5" />
                Start Chat Support
              </Button>
              <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                <Package className="h-5 w-5" />
                Check Order Status
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <User className="h-5 w-5" />
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;