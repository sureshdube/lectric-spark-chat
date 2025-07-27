import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Package, Settings, User, Zap, Shield, Headphones, ArrowLeft, Send } from "lucide-react";
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

  // Chat support state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, message: string, sender: 'user' | 'bot', timestamp: Date, isQuerySubmission?: boolean, file?: {name: string, url: string, type: string}}>>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showQuerySubmission, setShowQuerySubmission] = useState(false);
  const [queryText, setQueryText] = useState("");
  
  // Support tickets state  
  const [supportTickets, setSupportTickets] = useState<Array<{id: string, query: string, status: 'pending' | 'resolved', timestamp: Date, response?: string}>>([
    // Sample data for testing
    {
      id: "sample1",
      query: "My scooter is making a strange noise when I accelerate. What could be the issue?",
      status: 'resolved',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      response: "This could be due to loose bolts or wear in the motor bearings. Please bring your scooter to our service center for a free inspection within your warranty period."
    },
    {
      id: "sample2", 
      query: "Can I upgrade my scooter's battery to a higher capacity one?",
      status: 'pending',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    }
  ]);

  // Chat history with sample data for testing
  const [chatHistory, setChatHistory] = useState<Array<{id: string, messages: any[], timestamp: Date}>>([
    {
      id: "sample-chat1",
      messages: [
        {id: "1", message: "How long does the battery last?", sender: "user", timestamp: new Date()},
        {id: "2", message: "Our electric scooters typically have a battery life of 25-40 km on a single charge, depending on the model, rider weight, terrain, and riding conditions.", sender: "bot", timestamp: new Date()}
      ],
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ]);




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

  // Chat Functions
  const findMatchingAnswer = (userMessage: string): string | null => {
    const message = userMessage.toLowerCase();
    
    // Simple keyword matching for predefined Q&As
    for (const qa of qaList) {
      const questionWords = qa.question.toLowerCase().split(' ');
      const answerWords = qa.answer.toLowerCase().split(' ');
      
      // Check if user message contains key words from question or answer
      const hasMatchingWords = questionWords.some(word => 
        word.length > 3 && message.includes(word)
      ) || answerWords.some(word => 
        word.length > 4 && message.includes(word)
      );
      
      if (hasMatchingWords) {
        return qa.answer;
      }
    }
    
    return null;
  };

  const sendMessage = (file?: File) => {
    if (!currentMessage.trim() && !file) return;

    const userMessage = {
      id: Math.random().toString(36).substr(2, 9),
      message: currentMessage || (file ? `Shared file: ${file.name}` : ""),
      sender: 'user' as const,
      timestamp: new Date(),
      ...(file && {
        file: {
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        }
      })
    };

    setCurrentMessage(''); // Clear the input
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);

    // Try to find matching answer (only if there's a text message)
    const matchingAnswer = currentMessage.trim() ? findMatchingAnswer(currentMessage) : null;
    
    setTimeout(() => {
      let responseMessage = "";
      
      if (file && !currentMessage.trim()) {
        responseMessage = "I can see you've shared a file with us. For technical issues that require file analysis, our support team will review your attachment and provide personalized assistance. Would you like to submit this to our support team?";
      } else {
        responseMessage = matchingAnswer || "I couldn't find a specific answer to your question in our FAQ.";
        
        if (file) {
          responseMessage += " I can see you've shared a file with us. For technical issues that require file analysis, our support team will review your attachment and provide personalized assistance.";
        }
        
        if (!matchingAnswer) {
          responseMessage += " Would you like to submit this query to our support team for a personalized response?";
        }
      }

      const botResponse = {
        id: Math.random().toString(36).substr(2, 9),
        message: responseMessage,
        sender: 'bot' as const,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, botResponse];
      setChatMessages(finalMessages);

      // If no matching answer found or file without text, show option to submit query
      if (!matchingAnswer || (file && !currentMessage.trim())) {
        setShowQuerySubmission(true);
      }
    }, 1000);

    setCurrentMessage("");
  };

  const submitQuery = () => {
    if (!queryText.trim()) return;

    // Create support ticket
    const newTicket = {
      id: Math.random().toString(36).substr(2, 9),
      query: queryText,
      status: 'pending' as const,
      timestamp: new Date()
    };

    setSupportTickets([...supportTickets, newTicket]);

    // Save query submission in chat
    const querySubmission = {
      id: Math.random().toString(36).substr(2, 9),
      message: `Query submitted: ${queryText}`,
      sender: 'user' as const,
      timestamp: new Date(),
      isQuerySubmission: true
    };

    setChatMessages([...chatMessages, querySubmission]);
    
    toast({
      title: "Query Submitted",
      description: "Your query has been submitted to our support team. We'll get back to you soon!",
    });

    setQueryText("");
    setShowQuerySubmission(false);
  };

  const saveChatHistory = () => {
    if (chatMessages.length === 0) return;

    const chatSession = {
      id: Math.random().toString(36).substr(2, 9),
      messages: chatMessages,
      timestamp: new Date()
    };

    setChatHistory([...chatHistory, chatSession]);
    setChatMessages([]);
    setShowChat(false);
    
    toast({
      title: "Chat Saved",
      description: "Your chat session has been saved to history.",
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
              {(currentView === 'admin-support' || currentView === 'dashboard') && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentView(currentView === 'admin-support' ? 'dashboard' : 'admin-support')}
                >
                  {currentView === 'admin-support' ? 'Dashboard' : 'Support Tickets'}
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
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => setCurrentView('admin-support')}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Support Tickets</CardTitle>
                    <div className="text-3xl font-bold text-primary">{supportTickets.length}</div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentView('admin-support');
                      }}
                    >
                      View All Tickets
                    </Button>
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
          ) : currentView === 'admin-support' ? (
            <>
              {/* Admin Support Tickets View */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Customer Support Tickets</CardTitle>
                  <CardDescription>
                    View and manage all customer support tickets - latest first
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {supportTickets.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <Headphones className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <h3 className="text-lg font-medium mb-2">No Support Tickets</h3>
                      <p className="text-sm">No customer support tickets have been submitted yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {supportTickets.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((ticket) => (
                        <Card key={ticket.id} className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold">Ticket #{ticket.id}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  ticket.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Submitted on {ticket.timestamp.toLocaleDateString()} at {ticket.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                            {ticket.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setSupportTickets(prevTickets => 
                                    prevTickets.map(t => 
                                      t.id === ticket.id 
                                        ? { ...t, status: 'resolved' as const, response: 'Thank you for contacting us. We have reviewed your query and will follow up with you directly via email with detailed assistance.' }
                                        : t
                                    )
                                  );
                                  toast({
                                    title: "Ticket Resolved",
                                    description: `Ticket #${ticket.id} has been marked as resolved`,
                                  });
                                }}
                              >
                                Mark Resolved
                              </Button>
                            )}
                          </div>
                          
                          <div className="bg-muted/30 rounded-lg p-3 mb-3">
                            <p className="text-sm font-medium mb-1">Customer Query:</p>
                            <p className="text-sm">{ticket.query}</p>
                          </div>
                          
                          {ticket.response && (
                            <div className="bg-primary/10 rounded-lg p-3">
                              <p className="text-sm font-medium mb-1 text-primary">Admin Response:</p>
                              <p className="text-sm">{ticket.response}</p>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
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
      action: () => setCurrentView('chat'),
    },
    {
      title: 'My Orders',
      description: 'Track your order status and delivery',
      icon: Package,
      action: () => alert('Opening order tracking...'),
    },
    {
      title: 'Chat History',
      description: 'View your previous conversations',
      icon: MessageCircle,
      action: () => setCurrentView('chat-history'),
    },
    {
      title: 'Support Tickets',
      description: 'View your submitted support tickets',
      icon: Headphones,
      action: () => setCurrentView('support-tickets'),
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
                  <Button 
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setCurrentView('chat')}
                  >
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
        ) : currentView === 'chat' ? (
          <div className="max-w-4xl mx-auto">
            {/* Chat Interface */}
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Support Chat</CardTitle>
                    <CardDescription>
                      Ask questions about your electric scooter. We'll search our FAQ for quick answers.
                    </CardDescription>
                  </div>
                  {chatMessages.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={saveChatHistory}
                    >
                      Save & End Chat
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation by asking a question about your electric scooter!</p>
                    <p className="text-sm mt-2">Try asking: "How long does the battery last?" or "What is the maximum speed?"</p>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        } ${message.isQuerySubmission ? 'border-2 border-accent' : ''}`}
                      >
                        {message.file && (
                          <div className="mb-2 p-2 bg-white/10 rounded border">
                            {message.file.type.startsWith('image/') ? (
                              <div className="space-y-2">
                                <img 
                                  src={message.file.url} 
                                  alt={message.file.name}
                                  className="max-w-full max-h-48 rounded"
                                />
                                <p className="text-xs opacity-70">📎 {message.file.name}</p>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-lg">📎</span>
                                <span className="text-xs">{message.file.name}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
              
              {/* Query Submission Dialog */}
              {showQuerySubmission && (
                <div className="border-t p-4 bg-accent/10">
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Submit your query to our support team:</p>
                    <Input
                      placeholder="Describe your issue in detail..."
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && submitQuery()}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={submitQuery} disabled={!queryText.trim()}>
                        Submit Query
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowQuerySubmission(false)}
                      >
                        Continue Chat
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your question..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    className="flex-1"
                  />
                  
                  <Button 
                    onClick={() => sendMessage()} 
                    disabled={!currentMessage.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : currentView === 'chat-history' ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Chat History</CardTitle>
              <CardDescription>
                View your previous chat conversations and support interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chatHistory.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <h3 className="text-lg font-medium mb-2">No Chat History</h3>
                  <p className="text-sm">Start a conversation in the support chat to see your history here.</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setCurrentView('chat')}
                  >
                    Start New Chat
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatHistory.map((session) => (
                    <Card key={session.id} className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">
                          Chat Session - {session.timestamp.toLocaleDateString()}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {session.timestamp.toLocaleTimeString()} • {session.messages.length} messages
                        </span>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 max-h-40 overflow-y-auto">
                        {session.messages.slice(-3).map((msg: any) => (
                          <div key={msg.id} className="text-sm mb-2 last:mb-0">
                            <span className={`font-medium ${msg.sender === 'user' ? 'text-primary' : 'text-muted-foreground'}`}>
                              {msg.sender === 'user' ? 'You' : 'Support'}: 
                            </span>
                            <span className="ml-2">{msg.message}</span>
                          </div>
                        ))}
                        {session.messages.length > 3 && (
                          <p className="text-xs text-muted-foreground mt-2">... and {session.messages.length - 3} more messages</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : currentView === 'support-tickets' ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Support Tickets</CardTitle>
              <CardDescription>
                View and track your submitted support tickets and their responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {supportTickets.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <Headphones className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <h3 className="text-lg font-medium mb-2">No Support Tickets</h3>
                  <p className="text-sm">Submit a query through the chat when you need personalized help.</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setCurrentView('chat')}
                  >
                    Start Support Chat
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {supportTickets.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((ticket) => (
                    <Card key={ticket.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">Ticket #{ticket.id}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ticket.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Submitted on {ticket.timestamp.toLocaleDateString()} at {ticket.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-3 mb-3">
                        <p className="text-sm font-medium mb-1">Your Query:</p>
                        <p className="text-sm">{ticket.query}</p>
                      </div>
                      
                      {ticket.response && (
                        <div className="bg-primary/10 rounded-lg p-3">
                          <p className="text-sm font-medium mb-1 text-primary">Support Response:</p>
                          <p className="text-sm">{ticket.response}</p>
                        </div>
                      )}
                      
                      {ticket.status === 'pending' && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Your ticket is being reviewed. You'll receive a response soon.
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default Index;