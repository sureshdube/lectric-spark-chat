import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Package, Settings, User, Zap, Shield, Headphones, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'admin' | null>(null);
  const [activeTab, setActiveTab] = useState("login");
  const [loginStep, setLoginStep] = useState<"details" | "otp">("details");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [smsOtp, setSmsOtp] = useState("");
  const [otpSentVia, setOtpSentVia] = useState<"email" | "sms" | "both" | null>(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const { toast } = useToast();

  // Predefined Q&A data
  const [qaList, setQaList] = useState([
    {
      id: 1,
      question: "How long does the battery last?",
      answer: "Our electric scooters typically have a battery life of 25-40 km on a single charge, depending on the model, rider weight, terrain, and riding conditions."
    },
    {
      id: 2,
      question: "How long does it take to charge the battery?",
      answer: "Most of our electric scooter batteries take 4-6 hours for a complete charge from empty. Some models support fast charging which can reach 80% in 2-3 hours."
    },
    {
      id: 3,
      question: "What is the maximum speed?",
      answer: "Our scooters have different speed settings. Economy models reach 25 km/h, while performance models can reach up to 45 km/h. Speed is also limited by local regulations."
    },
    {
      id: 4,
      question: "Is it waterproof?",
      answer: "Our scooters have IP54 water resistance rating, which means they can handle light rain and splashes but should not be submerged in water or used in heavy rain."
    },
    {
      id: 5,
      question: "What is the warranty period?",
      answer: "We provide a 2-year warranty on the frame and electrical components, and 1-year warranty on the battery. This covers manufacturing defects and normal wear."
    },
    {
      id: 6,
      question: "How do I maintain my scooter?",
      answer: "Regular maintenance includes checking tire pressure monthly, cleaning the scooter weekly, charging the battery regularly, and having professional service every 6 months."
    },
    {
      id: 7,
      question: "Can I ride in the rain?",
      answer: "Light rain is okay due to IP54 rating, but avoid heavy rain and puddles. Always dry the scooter after wet weather and check electrical connections."
    },
    {
      id: 8,
      question: "What is the weight limit?",
      answer: "Most of our scooters support riders up to 100-120 kg. Check your specific model specifications for exact weight limits to ensure optimal performance."
    }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingQA, setEditingQA] = useState<{id: number, question: string, answer: string} | null>(null);

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
                    {loginStep === "details" ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Mobile Number</Label>
                          <Input 
                            id="phone" 
                            placeholder="+1 (555) 123-4567"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={async () => {
                            if (!email.trim() && !phoneNumber.trim()) {
                              toast({
                                title: "Contact details required",
                                description: "Please enter either email or mobile number",
                                variant: "destructive"
                              });
                              return;
                            }

                            // Simulate OTP sending process
                            let emailSuccess = false;
                            let smsSuccess = false;
                            let generatedEmailOtp = "";
                            let generatedSmsOtp = "";

                            // First try email if provided
                            if (email.trim()) {
                              try {
                                // Simulate email OTP sending (90% success rate for demo)
                                emailSuccess = Math.random() > 0.1;
                                if (emailSuccess) {
                                  generatedEmailOtp = Math.floor(1000 + Math.random() * 9000).toString();
                                  setEmailOtp(generatedEmailOtp);
                                }
                              } catch (error) {
                                emailSuccess = false;
                              }
                            }

                            // If email failed or not provided, try SMS
                            if (!emailSuccess && phoneNumber.trim()) {
                              try {
                                // Simulate SMS OTP sending (95% success rate for demo)
                                smsSuccess = Math.random() > 0.05;
                                if (smsSuccess) {
                                  generatedSmsOtp = Math.floor(1000 + Math.random() * 9000).toString();
                                  setSmsOtp(generatedSmsOtp);
                                }
                              } catch (error) {
                                smsSuccess = false;
                              }
                            }

                            // Determine what happened and show appropriate message
                            if (emailSuccess && smsSuccess) {
                              setOtpSentVia("both");
                              setLoginStep("otp");
                              toast({
                                title: "OTP Sent Successfully",
                                description: `Email OTP: ${generatedEmailOtp}, SMS OTP: ${generatedSmsOtp}, or use 1111`,
                              });
                            } else if (emailSuccess) {
                              setOtpSentVia("email");
                              setLoginStep("otp");
                              toast({
                                title: "OTP Sent via Email",
                                description: `Verification code sent to ${email}. OTP: ${generatedEmailOtp} or use 1111`,
                              });
                            } else if (smsSuccess) {
                              setOtpSentVia("sms");
                              setLoginStep("otp");
                              toast({
                                title: "Email Failed - SMS OTP Sent",
                                description: `Email delivery failed. SMS sent to ${phoneNumber}. OTP: ${generatedSmsOtp} or use 1111`,
                              });
                            } else {
                              toast({
                                title: "OTP Delivery Failed",
                                description: "Unable to send OTP via email or SMS. Please try again or contact support.",
                                variant: "destructive"
                              });
                            }
                          }}
                          disabled={!email.trim() && !phoneNumber.trim()}
                        >
                          Send OTP
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          We'll first try to send OTP via email, then SMS if email fails
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setLoginStep("details");
                              setOtp("");
                              setEmailOtp("");
                              setSmsOtp("");
                              setOtpSentVia(null);
                            }}
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <div className="text-sm text-muted-foreground">
                            {otpSentVia === "email" && `Code sent to ${email}`}
                            {otpSentVia === "sms" && `Code sent to ${phoneNumber}`}
                            {otpSentVia === "both" && `Codes sent to ${email} & ${phoneNumber}`}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="otp">Enter OTP</Label>
                          <Input 
                            id="otp" 
                            placeholder="Enter 4-digit code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={4}
                            className="text-center text-lg tracking-widest"
                          />
                        </div>
                        {otpSentVia === "both" && (
                          <p className="text-xs text-muted-foreground text-center">
                            You can use either the email OTP or SMS OTP
                          </p>
                        )}
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            if (!otp.trim()) {
                              toast({
                                title: "OTP required",
                                description: "Please enter the verification code",
                                variant: "destructive"
                              });
                              return;
                            }
                            
                            // Accept email OTP, SMS OTP, or 1111 as valid
                            const isValidOtp = otp === emailOtp || otp === smsOtp || otp === "1111";
                            
                            if (isValidOtp) {
                               setIsAuthenticated(true);
                               setUserType('customer');
                               let otpSource = "";
                              if (otp === "1111") {
                                otpSource = "bypass code";
                              } else if (otp === emailOtp) {
                                otpSource = "email";
                              } else if (otp === smsOtp) {
                                otpSource = "SMS";
                              }
                              
                              toast({
                                title: "Login Successful",
                                description: `Welcome! Authenticated via ${otpSource}`,
                              });
                            } else {
                              toast({
                                title: "Invalid OTP",
                                description: "Please enter the correct verification code",
                                variant: "destructive"
                              });
                            }
                          }}
                          disabled={!otp.trim()}
                        >
                          Verify & Login
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          Didn't receive the code? 
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="px-1 h-auto text-xs"
                            onClick={async () => {
                              // Resend logic - try email first, then SMS
                              let emailSuccess = false;
                              let smsSuccess = false;

                              if (email.trim()) {
                                emailSuccess = Math.random() > 0.1;
                                if (emailSuccess) {
                                  const newEmailOtp = Math.floor(1000 + Math.random() * 9000).toString();
                                  setEmailOtp(newEmailOtp);
                                }
                              }

                              if (!emailSuccess && phoneNumber.trim()) {
                                smsSuccess = Math.random() > 0.05;
                                if (smsSuccess) {
                                  const newSmsOtp = Math.floor(1000 + Math.random() * 9000).toString();
                                  setSmsOtp(newSmsOtp);
                                }
                              }

                              if (emailSuccess) {
                                toast({
                                  title: "New OTP Sent via Email",
                                  description: `New email OTP: ${emailOtp} or use 1111`,
                                });
                              } else if (smsSuccess) {
                                toast({
                                  title: "New OTP Sent via SMS",
                                  description: `New SMS OTP: ${smsOtp} or use 1111`,
                                });
                              } else {
                                toast({
                                  title: "Resend Failed",
                                  description: "Unable to resend OTP. Please try again.",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                            Resend
                          </Button>
                        </p>
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="admin" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input 
                        id="admin-email" 
                        type="email" 
                        placeholder="admin@example.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input 
                        id="admin-password" 
                        type="password" 
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      variant="secondary"
                      onClick={() => {
                        if (!adminEmail.trim() || !adminPassword.trim()) {
                          toast({
                            title: "Credentials required",
                            description: "Please enter both email and password",
                            variant: "destructive"
                          });
                          return;
                        }
                        
                        // Simple admin validation - in real app this would be proper authentication
                        if ((adminEmail === "admin@example.com" && adminPassword === "admin") || 
                            (adminEmail === "suresh1dube@gmail.com" && adminPassword === "test")) {
                          setIsAuthenticated(true);
                          setUserType('admin');
                          toast({
                            title: "Admin Login Successful",
                            description: "Welcome to the admin dashboard",
                          });
                        } else {
                          toast({
                            title: "Invalid Credentials",
                            description: "Please check your email and password",
                            variant: "destructive"
                          });
                        }
                      }}
                      disabled={!adminEmail.trim() || !adminPassword.trim()}
                    >
                      Admin Login
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Use: admin@example.com / admin or suresh1dube@gmail.com / test
                    </p>
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

  // Q&A Management Functions
  const addQA = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both question and answer",
        variant: "destructive"
      });
      return;
    }

    const newQA = {
      id: Math.max(...qaList.map(qa => qa.id)) + 1,
      question: newQuestion.trim(),
      answer: newAnswer.trim()
    };

    setQaList([...qaList, newQA]);
    setNewQuestion('');
    setNewAnswer('');
    toast({
      title: "Q&A Added",
      description: "New question and answer added successfully",
    });
  };

  const updateQA = (id: number, question: string, answer: string) => {
    setQaList(qaList.map(qa => qa.id === id ? { ...qa, question, answer } : qa));
    setEditingQA(null);
    toast({
      title: "Q&A Updated",
      description: "Question and answer updated successfully",
    });
  };

  const deleteQA = (id: number) => {
    setQaList(qaList.filter(qa => qa.id !== id));
    toast({
      title: "Q&A Deleted",
      description: "Question and answer deleted successfully",
    });
  };

  // Authenticated Dashboard
  if (userType === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Electric Assist Admin</h1>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView(currentView === 'dashboard' ? 'qa-management' : 'dashboard')}
              >
                {currentView === 'dashboard' ? 'Manage Q&A' : 'Dashboard'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAuthenticated(false);
                  setUserType(null);
                  setCurrentView('dashboard');
                }}
              >
                Logout
              </Button>
            </div>
          </div>

          {currentView === 'dashboard' ? (
            <>
              {/* Admin Welcome */}
              <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                  <CardDescription className="text-lg">
                    Manage customer support and Q&A database
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Admin Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Q&A</CardTitle>
                    <div className="text-3xl font-bold text-primary">{qaList.length}</div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Active Users</CardTitle>
                    <div className="text-3xl font-bold text-primary">1,234</div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Support Tickets</CardTitle>
                    <div className="text-3xl font-bold text-primary">56</div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Response Rate</CardTitle>
                    <div className="text-3xl font-bold text-primary">98%</div>
                  </CardHeader>
                </Card>
              </div>
            </>
          ) : (
            <>
              {/* Q&A Management */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Q&A Management</CardTitle>
                  <CardDescription>
                    Add, edit, and manage frequently asked questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Q&A */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="text-lg font-semibold">Add New Q&A</h3>
                    <div className="space-y-2">
                      <Label htmlFor="new-question">Question</Label>
                      <Input
                        id="new-question"
                        placeholder="Enter the question..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-answer">Answer</Label>
                      <Input
                        id="new-answer"
                        placeholder="Enter the answer..."
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                      />
                    </div>
                    <Button onClick={addQA} disabled={!newQuestion.trim() || !newAnswer.trim()}>
                      Add Q&A
                    </Button>
                  </div>

                  {/* Q&A List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Existing Q&A ({qaList.length})</h3>
                    {qaList.map((qa) => (
                      <Card key={qa.id} className="p-4">
                        {editingQA?.id === qa.id ? (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Question</Label>
                              <Input
                                value={editingQA.question}
                                onChange={(e) => setEditingQA({...editingQA, question: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Answer</Label>
                              <Input
                                value={editingQA.answer}
                                onChange={(e) => setEditingQA({...editingQA, answer: e.target.value})}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                onClick={() => updateQA(editingQA.id, editingQA.question, editingQA.answer)}
                              >
                                Save
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingQA(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-primary">Q: {qa.question}</h4>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setEditingQA(qa)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => deleteQA(qa.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                            <p className="text-muted-foreground">A: {qa.answer}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    );
  }

  // Customer Dashboard
  const customerFeatures = [
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
      title: 'FAQ',
      description: 'Browse frequently asked questions',
      icon: Settings,
      action: () => setCurrentView(currentView === 'dashboard' ? 'faq' : 'dashboard'),
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
          <div className="flex gap-2">
            {currentView !== 'dashboard' && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('dashboard')}
              >
                Back to Dashboard
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAuthenticated(false);
                setUserType(null);
                setCurrentView('dashboard');
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        {currentView === 'dashboard' ? (
          <>
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
              {customerFeatures.map((feature, index) => (
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
          </>
        ) : currentView === 'faq' ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about electric scooters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qaList.map((qa) => (
                  <Card key={qa.id} className="p-4">
                    <h4 className="font-semibold text-primary mb-2">Q: {qa.question}</h4>
                    <p className="text-muted-foreground">A: {qa.answer}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default Index;