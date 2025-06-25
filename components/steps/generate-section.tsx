"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Play,
  CheckCircle,
  Code2,
  Loader2,
  Upload,
  Copy,
  Check,
} from "lucide-react";
import { useGlobalFormStore } from "@/hooks/use-global-form-store";
import Image from "next/image";
import { GeneratedFile, GeneratedResponse } from "@/lib/types";

export default function GenerateSection() {
  const {
    uploadedFiles,
    figmaImages,
    generatedResponse,
    setGeneratedResponse,
  } = useGlobalFormStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState("");
  const [generationComplete, setGenerationComplete] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [copiedIds, setCopiedIds] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        setCopiedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const extractComponents = async () => {
    setIsExtracting(true);
    setExtractionProgress(0);

    // Simulate component extraction process
    const steps = [
      "Analyzing uploaded designs...",
      "Identifying UI patterns...",
      "Extracting components...",
      "Generating component metadata...",
      "Finalizing component library...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setExtractionProgress((i + 1) * 20);
    }

    // Mock extracted components
    const mockComponents: GeneratedFile[] = [
      {
        id: "mobile-status-bar",
        fileName: "components/mobile-status-bar.tsx",
        code: 'export function MobileStatusBar() {\n  return (\n    <div className="flex justify-between items-center px-6 py-2 text-black font-medium">\n      <div className="text-lg">9:27</div>\n      <div className="flex items-center gap-1">\n        <div className="flex gap-1">\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>\n        </div>\n        <div className="ml-2">\n          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">\n            <path d="M1 6C1 6 4 1 9 1C14 1 17 6 17 6C17 6 14 11 9 11C4 11 1 6 1 6Z" stroke="black" strokeWidth="2" />\n            <circle cx="9" cy="6" r="2" stroke="black" strokeWidth="2" />\n          </svg>\n        </div>\n        <div className="w-6 h-3 bg-black rounded-sm ml-2"></div>\n      </div>\n    </div>\n  )\n}',
      },
      {
        id: "back-button",
        fileName: "components/back-button.tsx",
        code: '"use client"\n\nimport { ArrowLeft } from "lucide-react"\nimport { Button } from "@/components/ui/button"\n\ninterface BackButtonProps {\n  onClick?: () => void\n}\n\nexport function BackButton({ onClick }: BackButtonProps) {\n  return (\n    <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10" onClick={onClick}>\n      <ArrowLeft className="h-6 w-6" />\n    </Button>\n  )\n}',
      },
      {
        id: "bottom-navigation",
        fileName: "components/bottom-navigation.tsx",
        code: 'import { Home, Search, Plus, MessageCircle, User } from "lucide-react"\nimport { Button } from "@/components/ui/button"\n\nexport function BottomNavigation() {\n  return (\n    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">\n      <div className="flex justify-around items-center max-w-sm mx-auto">\n        <Button variant="ghost" size="icon">\n          <Home className="h-6 w-6" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <Search className="h-6 w-6" />\n        </Button>\n        <Button\n          size="icon"\n          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-full"\n        >\n          <Plus className="h-6 w-6 text-white" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <MessageCircle className="h-6 w-6" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <User className="h-6 w-6" />\n        </Button>\n      </div>\n    </div>\n  )\n}',
      },
      {
        id: "photo-gallery",
        fileName: "components/photo-gallery.tsx",
        code: 'import Image from "next/image"\n\nconst photos = [\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n]\n\nexport function PhotoGallery() {\n  return (\n    <div className="grid grid-cols-2 gap-2 px-6 pb-20">\n      {photos.map((photo, index) => (\n        <div key={index} className="aspect-square relative">\n          <Image\n            src={photo || "/placeholder.svg"}\n            alt={`Photo ${index + 1}`}\n            fill\n            className="object-cover rounded-lg"\n          />\n        </div>\n      ))}\n    </div>\n  )\n}',
      },
    ];
    setGeneratedResponse({
      ...(generatedResponse || {}),
      sharedComponents: mockComponents,
    });
    setIsExtracting(false);
    setExtractionProgress(100);
  };

  const generateFullApp = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationComplete(false);

    const steps = [
      { step: "Initializing MCP server connection...", progress: 10 },
      { step: "Analyzing component structure...", progress: 25 },
      { step: "Generating component files...", progress: 45 },
      { step: "Creating application structure...", progress: 65 },
      { step: "Applying styling and configuration...", progress: 80 },
      { step: "Optimizing and finalizing code...", progress: 95 },
      { step: "Generation complete!", progress: 100 },
    ];

    for (const { step, progress } of steps) {
      setGenerationStep(step);
      setGenerationProgress(progress);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Mock generated code structure
    const mockGeneratedCode: GeneratedResponse["full"] = {
      files: [
        {
          id: "auth-store",
          fileName: "stores/auth-store.ts",
          code: 'import { create } from "zustand"\n\ninterface User {\n  id: string\n  name: string\n  email: string\n  location: string\n  profileImage: string\n  isFollowing: boolean\n}\n\ninterface AuthState {\n  user: User | null\n  isAuthenticated: boolean\n  login: (email: string, password: string) => void\n  register: (email: string, password: string) => void\n  logout: () => void\n  followUser: (userId: string) => void\n  unfollowUser: (userId: string) => void\n}\n\nexport const useAuthStore = create<AuthState>((set) => ({\n  user: null,\n  isAuthenticated: false,\n  login: (email: string, password: string) => {\n    // Mock login logic\n    set({\n      user: {\n        id: "1",\n        name: "Jane",\n        email,\n        location: "SAN FRANCISCO, CA",\n        profileImage: "/placeholder.svg?height=200&width=200",\n        isFollowing: false,\n      },\n      isAuthenticated: true,\n    })\n  },\n  register: (email: string, password: string) => {\n    // Mock registration logic\n    set({\n      user: {\n        id: "1",\n        name: "Jane",\n        email,\n        location: "SAN FRANCISCO, CA",\n        profileImage: "/placeholder.svg?height=200&width=200",\n        isFollowing: false,\n      },\n      isAuthenticated: true,\n    })\n  },\n  logout: () => {\n    set({ user: null, isAuthenticated: false })\n  },\n  followUser: (userId: string) => {\n    set((state) => ({\n      user: state.user ? { ...state.user, isFollowing: true } : null,\n    }))\n  },\n  unfollowUser: (userId: string) => {\n    set((state) => ({\n      user: state.user ? { ...state.user, isFollowing: false } : null,\n    }))\n  },\n}))',
        },
        {
          id: "mobile-status-bar",
          fileName: "components/mobile-status-bar.tsx",
          code: 'export function MobileStatusBar() {\n  return (\n    <div className="flex justify-between items-center px-6 py-2 text-black font-medium">\n      <div className="text-lg">9:27</div>\n      <div className="flex items-center gap-1">\n        <div className="flex gap-1">\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>\n        </div>\n        <div className="ml-2">\n          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">\n            <path d="M1 6C1 6 4 1 9 1C14 1 17 6 17 6C17 6 14 11 9 11C4 11 1 6 1 6Z" stroke="black" strokeWidth="2" />\n            <circle cx="9" cy="6" r="2" stroke="black" strokeWidth="2" />\n          </svg>\n        </div>\n        <div className="w-6 h-3 bg-black rounded-sm ml-2"></div>\n      </div>\n    </div>\n  )\n}',
        },
        {
          id: "back-button",
          fileName: "components/back-button.tsx",
          code: '"use client"\n\nimport { ArrowLeft } from "lucide-react"\nimport { Button } from "@/components/ui/button"\n\ninterface BackButtonProps {\n  onClick?: () => void\n}\n\nexport function BackButton({ onClick }: BackButtonProps) {\n  return (\n    <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10" onClick={onClick}>\n      <ArrowLeft className="h-6 w-6" />\n    </Button>\n  )\n}',
        },
        {
          id: "bottom-navigation",
          fileName: "components/bottom-navigation.tsx",
          code: 'import { Home, Search, Plus, MessageCircle, User } from "lucide-react"\nimport { Button } from "@/components/ui/button"\n\nexport function BottomNavigation() {\n  return (\n    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">\n      <div className="flex justify-around items-center max-w-sm mx-auto">\n        <Button variant="ghost" size="icon">\n          <Home className="h-6 w-6" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <Search className="h-6 w-6" />\n        </Button>\n        <Button\n          size="icon"\n          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-full"\n        >\n          <Plus className="h-6 w-6 text-white" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <MessageCircle className="h-6 w-6" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <User className="h-6 w-6" />\n        </Button>\n      </div>\n    </div>\n  )\n}',
        },
        {
          id: "photo-gallery",
          fileName: "components/photo-gallery.tsx",
          code: 'import Image from "next/image"\n\nconst photos = [\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n]\n\nexport function PhotoGallery() {\n  return (\n    <div className="grid grid-cols-2 gap-2 px-6 pb-20">\n      {photos.map((photo, index) => (\n        <div key={index} className="aspect-square relative">\n          <Image\n            src={photo || "/placeholder.svg"}\n            alt={`Photo ${index + 1}`}\n            fill\n            className="object-cover rounded-lg"\n          />\n        </div>\n      ))}\n    </div>\n  )\n}',
        },
        {
          id: "register-page",
          fileName: "app/register/page.tsx",
          code: '"use client"\n\nimport { useForm } from "react-hook-form"\nimport { useRouter } from "next/navigation"\nimport { Button } from "@/components/ui/button"\nimport { Input } from "@/components/ui/input"\nimport { MobileStatusBar } from "@/components/mobile-status-bar"\nimport { BackButton } from "@/components/back-button"\nimport { useAuthStore } from "@/stores/auth-store"\n\ninterface RegisterForm {\n  email: string\n  password: string\n}\n\nexport default function RegisterPage() {\n  const router = useRouter()\n  const register = useAuthStore((state) => state.register)\n\n  const {\n    register: registerField,\n    handleSubmit,\n    formState: { errors },\n  } = useForm<RegisterForm>()\n\n  const onSubmit = (data: RegisterForm) => {\n    register(data.email, data.password)\n    router.push("/profile")\n  }\n\n  const handleBack = () => {\n    router.back()\n  }\n\n  return (\n    <div className="min-h-screen bg-gray-50">\n      <MobileStatusBar />\n      <div className="relative px-6 pt-16">\n        <BackButton onClick={handleBack} />\n\n        <h1 className="text-4xl font-light text-black mb-12">Register</h1>\n\n        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">\n          <div>\n            <Input\n              {...registerField("email", {\n                required: "Email is required",\n                pattern: {\n                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,\n                  message: "Invalid email address",\n                },\n              })}\n              type="email"\n              placeholder="Email address"\n              className="h-14 text-lg border-2 border-black rounded-none bg-white"\n            />\n            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}\n          </div>\n\n          <div>\n            <Input\n              {...registerField("password", {\n                required: "Password is required",\n                minLength: {\n                  value: 6,\n                  message: "Password must be at least 6 characters",\n                },\n              })}\n              type="password"\n              placeholder="Create password"\n              className="h-14 text-lg border-2 border-black rounded-none bg-white"\n            />\n            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}\n          </div>\n\n          <Button\n            type="submit"\n            className="w-full h-14 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-none mt-8"\n          >\n            NEXT\n          </Button>\n        </form>\n      </div>\n    </div>\n  )\n}',
        },
        {
          id: "profile-page",
          fileName: "app/profile/page.tsx",
          code: '"use client"\n\nimport Image from "next/image"\nimport { Button } from "@/components/ui/button"\nimport { MobileStatusBar } from "@/components/mobile-status-bar"\nimport { BottomNavigation } from "@/components/bottom-navigation"\nimport { PhotoGallery } from "@/components/photo-gallery"\nimport { useAuthStore } from "@/stores/auth-store"\n\nexport default function ProfilePage() {\n  const { user, followUser, unfollowUser } = useAuthStore()\n\n  const handleFollowToggle = () => {\n    if (!user) return\n\n    if (user.isFollowing) {\n      unfollowUser(user.id)\n    } else {\n      followUser(user.id)\n    }\n  }\n\n  if (!user) {\n    return <div>Loading...</div>\n  }\n\n  return (\n    <div className="min-h-screen bg-gray-50">\n      <MobileStatusBar />\n\n      <div className="pt-8 pb-4">\n        {/* Profile Section */}\n        <div className="flex flex-col items-center px-6 mb-8">\n          <div className="relative w-32 h-32 mb-6">\n            <Image\n              src="/placeholder.svg?height=128&width=128"\n              alt="Profile"\n              fill\n              className="object-cover rounded-full"\n            />\n          </div>\n\n          <h1 className="text-3xl font-light text-black mb-2">{user.name}</h1>\n          <p className="text-lg font-medium text-black mb-8">{user.location}</p>\n\n          <div className="w-full space-y-4">\n            <Button\n              onClick={handleFollowToggle}\n              className="w-full h-12 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-none"\n            >\n              {user.isFollowing ? "UNFOLLOW JANE" : "FOLLOW JANE"}\n            </Button>\n\n            <Button\n              variant="outline"\n              className="w-full h-12 bg-white text-black text-lg font-medium rounded-none border-2 border-black hover:bg-gray-50"\n            >\n              MESSAGE\n            </Button>\n          </div>\n        </div>\n\n        {/* Photo Gallery */}\n        <PhotoGallery />\n      </div>\n\n      <BottomNavigation />\n    </div>\n  )\n}',
        },
        {
          id: "home-page",
          fileName: "app/page.tsx",
          code: '"use client"\n\nimport { useEffect } from "react"\nimport { useRouter } from "next/navigation"\nimport { useAuthStore } from "@/stores/auth-store"\n\nexport default function HomePage() {\n  const router = useRouter()\n  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)\n\n  useEffect(() => {\n    if (isAuthenticated) {\n      router.push("/profile")\n    } else {\n      router.push("/register")\n    }\n  }, [isAuthenticated, router])\n\n  return (\n    <div className="min-h-screen bg-gray-50 flex items-center justify-center">\n      <div className="text-center">\n        <h1 className="text-2xl font-light mb-4">Loading...</h1>\n      </div>\n    </div>\n  )\n}',
        },
        {
          id: "layout",
          fileName: "app/layout.tsx",
          code: 'import type React from "react"\nimport type { Metadata } from "next"\nimport { Inter } from "next/font/google"\nimport "./globals.css"\n\nconst inter = Inter({ subsets: ["latin"] })\n\nexport const metadata: Metadata = {\n  title: "Social Media App",\n  description: "A modern social media application",\n}\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body className={inter.className}>\n        <div className="max-w-sm mx-auto bg-white min-h-screen">{children}</div>\n      </body>\n    </html>\n  )\n}',
        },
      ],
      structure: {
        app: ["page.tsx", "layout.tsx"],
        "app/register": ["page.tsx"],
        "app/profile": ["page.tsx"],
        components: [
          "mobile-status-bar.tsx",
          "back-button.tsx",
          "bottom-navigation.tsx",
          "photo-gallery.tsx",
        ],
        stores: ["auth-store.ts"],
        "public/images": ["jane-profile.png", "register-screen.png"],
      },
    };
    setGeneratedResponse({ ...generatedResponse, full: mockGeneratedCode });
    setGenerationComplete(true);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Extract Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Extract Components
          </CardTitle>
          <CardDescription>
            First, extract reusable components from your uploaded designs and
            Figma links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Uploaded Files</h4>
              <div className="grid gap-2">
                {uploadedFiles.map((file, index) => (
                  <Card key={index}>
                    <CardContent className="flex justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={0}
                          height={0}
                          style={{ width: 150, height: "auto" }}
                        />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {figmaImages.map((image, index) => (
                  <Card key={index}>
                    <CardContent className="flex justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={image}
                          alt={image}
                          width={0}
                          height={0}
                          style={{ width: 150, height: "auto" }}
                        />
                        <p className="text-sm font-medium">{image}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">Ready to Extract Components</p>
              <p className="text-sm text-muted-foreground">
                Analyze your designs to identify reusable UI components
              </p>
            </div>
            <Button
              onClick={extractComponents}
              disabled={
                (uploadedFiles.length === 0 && figmaImages.length === 0) ||
                isExtracting
              }
              size="lg"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Extract Components
                </>
              )}
            </Button>
          </div>

          {isExtracting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Extracting components...</span>
                <span>{extractionProgress}%</span>
              </div>
              <Progress value={extractionProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Component Library (only shown after extraction) */}
      {!!generatedResponse?.sharedComponents?.length && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Component Library
            </CardTitle>
            <CardDescription>
              Review and manage your extracted components before generating the
              full application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Components Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {generatedResponse?.sharedComponents?.map((component) => (
                <Card
                  key={component.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">
                        {component.fileName}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Button
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() =>
                          copyToClipboard(component.code, component.id)
                        }
                      >
                        {copiedIds.has(component.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
                        <code className="language-typescript">
                          {component.code}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Generate Code */}
      {!!generatedResponse?.sharedComponents?.length && (
        <Card>
          <CardHeader>
            <CardTitle>Full App Generation</CardTitle>
            <CardDescription>
              Generate your application with the configured settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isGenerating && !generationComplete && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ready to Generate</p>
                  <p className="text-sm text-muted-foreground">
                    This will create a complete application with your components
                  </p>
                </div>
                <Button onClick={generateFullApp} size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Generate App
                </Button>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="font-medium">Generating...</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{generationStep}</span>
                    <span>{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="w-full" />
                </div>
              </div>
            )}

            {generationComplete && (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Code generation completed successfully!{" "}
                    {generatedResponse?.full?.files?.length || 0} files
                    generated.
                  </AlertDescription>
                </Alert>

                {/* Components Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {generatedResponse?.full?.files?.map((component) => (
                    <Card
                      key={component.id}
                      className="group hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">
                            {component.fileName}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <Button
                            size="sm"
                            className="absolute top-2 right-2 z-10"
                            onClick={() =>
                              copyToClipboard(component.code, component.id)
                            }
                          >
                            {copiedIds.has(component.id) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
                            <code className="language-typescript">
                              {component.code}
                            </code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Generation Complete</p>
                    <p className="text-sm text-muted-foreground">
                      Your application is ready for preview
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setGenerationComplete(false)}>
                      <Code2 className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
