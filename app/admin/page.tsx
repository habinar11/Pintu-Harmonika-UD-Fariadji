"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Package,
  FolderKanban,
  Layers,
  Star,
  Settings,
  Mail,
  Home,
  RefreshCw,
} from "lucide-react";
import {
  Product,
  ProjectItem,
  MaterialItem,
  TestimonialItem,
  CompanySettings,
  ContactMessage,
} from "@/lib/types";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<
    "products" | "projects" | "materials" | "testimonials" | "settings" | "messages"
  >("products");

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Modals / Editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingMaterial, setEditingMaterial] = useState<MaterialItem | null>(null);
  const [isNewMaterial, setIsNewMaterial] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState(false);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchAllData();
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [resProd, resProj, resMat, resTest, resSet, resMsg] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/projects"),
        fetch("/api/materials"),
        fetch("/api/testimonials"),
        fetch("/api/settings"),
        fetch("/api/messages"),
      ]);

      if (resProd.ok) setProducts(await resProd.json());
      if (resProj.ok) setProjects(await resProj.json());
      if (resMat.ok) setMaterials(await resMat.json());
      if (resTest.ok) setTestimonials(await resTest.json());
      if (resSet.ok) setSettings(await resSet.json());
      if (resMsg.ok) setMessages(await resMsg.json());
    } catch (e) {
      console.error("Gagal load data", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        setLoginError(data.message || "Username atau password salah");
      }
    } catch {
      setLoginError("Gagal menghubungi server");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // ---------------- PRODUCT HANDLERS ----------------
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      if (isNewProduct) {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProduct),
        });
        if (res.ok) {
          const created = await res.json();
          setProducts([...products, created]);
          showProductSuccess("Produk baru berhasil ditambahkan!");
        }
      } else {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProduct),
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
          showProductSuccess("Produk berhasil diperbarui!");
        }
      }
      setEditingProduct(null);
    } catch {
      showNotification("Gagal menyimpan produk", "error");
    }
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Hapus produk "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        showNotification("Produk telah dihapus");
      }
    } catch {
      showNotification("Gagal menghapus produk", "error");
    }
  };

  const showProductSuccess = (msg: string) => {
    showNotification(msg);
  };

  // ---------------- PROJECT HANDLERS ----------------
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      if (isNewProject) {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProject),
        });
        if (res.ok) {
          const created = await res.json();
          setProjects([created, ...projects]);
          showNotification("Proyek baru berhasil ditambahkan!");
        }
      } else {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProject),
        });
        if (res.ok) {
          const updated = await res.json();
          setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
          showNotification("Proyek berhasil diperbarui!");
        }
      }
      setEditingProject(null);
    } catch {
      showNotification("Gagal menyimpan proyek", "error");
    }
  };

  const deleteProject = async (id: string, title: string) => {
    if (!confirm(`Hapus proyek "${title}"?`)) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        showNotification("Proyek telah dihapus");
      }
    } catch {
      showNotification("Gagal menghapus proyek", "error");
    }
  };

  // ---------------- MATERIAL HANDLERS ----------------
  const saveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial) return;

    try {
      if (isNewMaterial) {
        const res = await fetch("/api/materials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingMaterial),
        });
        if (res.ok) {
          const created = await res.json();
          setMaterials([...materials, created]);
          showNotification("Material baru berhasil ditambahkan!");
        }
      } else {
        const res = await fetch(`/api/materials/${editingMaterial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingMaterial),
        });
        if (res.ok) {
          const updated = await res.json();
          setMaterials(materials.map((m) => (m.id === updated.id ? updated : m)));
          showNotification("Material berhasil diperbarui!");
        }
      }
      setEditingMaterial(null);
    } catch {
      showNotification("Gagal menyimpan material", "error");
    }
  };

  const deleteMaterial = async (id: string, name: string) => {
    if (!confirm(`Hapus material "${name}"?`)) return;
    try {
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMaterials(materials.filter((m) => m.id !== id));
        showNotification("Material telah dihapus");
      }
    } catch {
      showNotification("Gagal menghapus material", "error");
    }
  };

  // ---------------- TESTIMONIAL HANDLERS ----------------
  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    try {
      if (isNewTestimonial) {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingTestimonial),
        });
        if (res.ok) {
          const created = await res.json();
          setTestimonials([created, ...testimonials]);
          showNotification("Testimoni baru berhasil ditambahkan!");
        }
      } else {
        const res = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingTestimonial),
        });
        if (res.ok) {
          const updated = await res.json();
          setTestimonials(testimonials.map((t) => (t.id === updated.id ? updated : t)));
          showNotification("Testimoni berhasil diperbarui!");
        }
      }
      setEditingTestimonial(null);
    } catch {
      showNotification("Gagal menyimpan testimoni", "error");
    }
  };

  const deleteTestimonial = async (id: string, name: string) => {
    if (!confirm(`Hapus ulasan dari "${name}"?`)) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
        showNotification("Testimoni telah dihapus");
      }
    } catch {
      showNotification("Gagal menghapus testimoni", "error");
    }
  };

  // ---------------- SETTINGS HANDLERS ----------------
  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const updated = await res.json();
        setSettings(updated);
        showNotification("Pengaturan perusahaan & kontak berhasil disimpan!");
      }
    } catch {
      showNotification("Gagal menyimpan pengaturan", "error");
    }
  };

  // ---------------- MESSAGES HANDLERS ----------------
  const updateMessageStatus = async (id: string, status: "new" | "contacted" | "done") => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMessages(
          messages.map((m) => (m.id === id ? { ...m, status } : m))
        );
        showNotification("Status pesan diperbarui");
      }
    } catch {
      showNotification("Gagal memperbarui pesan", "error");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Hapus pesan ini?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        showNotification("Pesan dihapus");
      }
    } catch {
      showNotification("Gagal menghapus", "error");
    }
  };

  // If still checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-100">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-maroon-700 p-1 flex items-center justify-center mx-auto mb-4 shadow-xl overflow-hidden">
              <img
                src="/images/company-logo.png"
                alt="Logo UD.Fariadji"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Panel Pengelola Konten
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Masuk untuk menambah dan mengedit produk, proyek, material, dan info kontak.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {isLoggingIn ? "Memverifikasi..." : "Masuk ke Panel Admin"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            Kredensial Default: Username <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">admin</code> & Password <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      {/* Top Admin Bar in Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#28040a] to-maroon-950 text-white border-b-2 border-maroon-800 px-4 sm:px-8 py-4">
        <div className="w-full max-w-[1650px] mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white border border-amber-400 p-0.5 flex items-center justify-center shadow-md overflow-hidden shrink-0">
              <img
                src={settings?.logoUrl || "/images/company-logo.png"}
                alt="Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm sm:text-base leading-tight">
                Panel Kelola {settings?.companyName || "Pintu Harmonika"}
              </h2>
              <span className="text-[11px] text-amber-400 font-semibold flex items-center">
                <span className="w-2 h-2 rounded-full bg-amber-400 mr-1.5 animate-pulse" />
                Mode Pengeditan Aktif (Perubahan Langsung Tayang)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Buka Website Publik
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {statusMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-right duration-300">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center text-xs font-bold text-white border ${
              statusMessage.type === "success"
                ? "bg-emerald-600 border-emerald-400"
                : "bg-rose-600 border-rose-400"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 pt-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "products"
                ? "bg-maroon-800 text-white shadow-md shadow-maroon-900/30 border border-amber-400/30"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Package className="w-4 h-4 mr-2" />
            Kelola Produk ({products.length})
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "projects"
                ? "bg-maroon-800 text-white shadow-md shadow-maroon-900/30 border border-amber-400/30"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FolderKanban className="w-4 h-4 mr-2" />
            List Project ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab("materials")}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "materials"
                ? "bg-maroon-800 text-white shadow-md shadow-maroon-900/30 border border-amber-400/30"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-4 h-4 mr-2" />
            Material ({materials.length})
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "testimonials"
                ? "bg-maroon-800 text-white shadow-md shadow-maroon-900/30 border border-amber-400/30"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Star className="w-4 h-4 mr-2" />
            Testimoni ({testimonials.length})
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "settings"
                ? "bg-maroon-800 text-white shadow-md shadow-maroon-900/30 border border-amber-400/30"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Profil & Kontak
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "messages"
                ? "bg-maroon-800 text-white shadow-md shadow-maroon-900/30 border border-amber-400/30"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Mail className="w-4 h-4 mr-2" />
            Pesan Masuk ({messages.length})
          </button>
        </div>

        {/* ---------------- TAB 1: KELOLA PRODUK ---------------- */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">Katalog Produk Pintu Harmonika</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tambah tipe pintu baru, ubah harga per m², ketebalan daun, spesifikasi, dan foto.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewProduct(true);
                  setEditingProduct({
                    id: "",
                    name: "",
                    slug: "",
                    badge: "",
                    warrantyInfo: "Garansi 5 Tahun",
                    daunThickness: "TEBEL 1,0",
                    stripThickness: "2 cm x 4,5 mm",
                    unpSize: "UNP 5 + 19 | UNP 10 | 60x60",
                    frameSpec: "UNP 5 + 19 | UNP 10 | 60x60",
                    galaran: "56 - 25",
                    silangan: "2 cm x 4,5 mm",
                    relBesar: "UNP 5 + 19",
                    cakakTiang: "UNP 10",
                    pipaKotak: "60 x 60",
                    platTopi: "10 cm",
                    usageRecommendation: "Ruko Komersial Besar, Showroom",
                    bearingType: "Double Bearing 6204 Asli (Anti Macet)",
                    lockType: "Silinder Kuningan Extra Safety + Kupingan Gembok Baja",
                    finishing: "Cat Dasar Meni Epoxy + Finishing Oven Duco Gloss/Matte",
                    pricePerMeter: 1400000,
                    priceDisplay: "Rp 1.400.000 / m²",
                    description: "",
                    features: ["Baja murni SNI", "Roda ringan", "Garansi servis"],
                    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
                    isPopular: false,
                    order: products.length + 1,
                  });
                }}
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-md shadow-maroon-900/30 border border-amber-400/30"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Tambah Produk Baru
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-maroon-800 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-slate-900 text-base">{p.name}</h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              p.warrantyInfo?.includes("5") || p.name.includes("SUPER")
                                ? "bg-amber-50 text-amber-900 border-amber-300"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            {p.warrantyInfo || (p.name.includes("SUPER") ? "Garansi 5 Tahun" : "Ber-garansi Servis Resmi")}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-emerald-600">
                          {p.priceDisplay}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>

                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                        <div>
                          <strong>Tebal Daun:</strong> {p.daunThickness}
                        </div>
                        <div>
                          <strong>Rangka:</strong> {p.frameSpec || p.unpSize}
                        </div>
                        {p.silangan && (
                          <div>
                            <strong>Silangan:</strong> {p.silangan}
                          </div>
                        )}
                        {p.usageRecommendation && (
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            <strong>Rekomendasi:</strong> {p.usageRecommendation}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsNewProduct(false);
                          setEditingProduct({ ...p });
                        }}
                        className="flex-1 inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id, p.name)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 2: KELOLA LIST PROJECT ---------------- */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">List Project Selesai (Portofolio)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tambahkan dokumentasi foto ruko atau gudang yang baru Anda pasang untuk menarik minat calon pelanggan.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewProject(true);
                  setEditingProject({
                    id: "",
                    title: "",
                    category: "Ruko & Komersial",
                    location: "",
                    client: "",
                    year: new Date().getFullYear().toString(),
                    productType: "Tipe Super Heavy (1.2mm)",
                    unitsCount: "1 Unit",
                    description: "",
                    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
                    isFeatured: false,
                  });
                }}
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Tambah Proyek Selesai
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-100">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                      {proj.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs font-bold text-blue-600 block mb-1">
                        {proj.location} • {proj.year}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base mb-1">{proj.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{proj.description}</p>
                      <div className="text-xs text-slate-600 mt-2">
                        Klien: <span className="font-bold">{proj.client}</span> | {proj.productType}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsNewProject(false);
                          setEditingProject({ ...proj });
                        }}
                        className="flex-1 inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        Edit Proyek
                      </button>
                      <button
                        onClick={() => deleteProject(proj.id, proj.title)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: KELOLA MATERIAL ---------------- */}
        {activeTab === "materials" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">Komponen & Spesifikasi Material</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Perbarui deskripsi teknis daun, silangan, UNP, rel, bearing, dan kunci yang tampil di halaman Material.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewMaterial(true);
                  setEditingMaterial({
                    id: "",
                    name: "",
                    subtitle: "",
                    specs: "",
                    description: "",
                    advantages: ["Kualitas SNI teruji", "Tahan cuaca ekstrem"],
                    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
                    order: materials.length + 1,
                  });
                }}
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Tambah Komponen Material
              </button>
            </div>

            <div className="space-y-4">
              {materials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col md:flex-row gap-6 items-start justify-between"
                >
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full md:w-48 h-36 object-cover rounded-2xl bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {mat.subtitle}
                    </span>
                    <h4 className="text-lg font-black text-slate-900">{mat.name}</h4>
                    <p className="text-xs font-bold text-slate-700 bg-slate-100 inline-block px-2.5 py-1 rounded-md">
                      Spesifikasi: {mat.specs}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2">{mat.description}</p>
                  </div>
                  <div className="flex md:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setIsNewMaterial(false);
                        setEditingMaterial({ ...mat });
                      }}
                      className="inline-flex items-center px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMaterial(mat.id, mat.name)}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 4: KELOLA TESTIMONI ---------------- */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">Ulasan & Testimoni Pelanggan</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kelola ulasan kepuasan klien pemilik ruko, toko, dan mitra pemborong.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewTestimonial(true);
                  setEditingTestimonial({
                    id: "",
                    name: "",
                    role: "Pemilik Ruko",
                    companyOrLocation: "",
                    rating: 5,
                    content: "",
                    projectType: "Tipe Super Heavy (1.2mm)",
                    date: new Date().toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                  });
                }}
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Tambah Testimoni Baru
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex text-amber-400">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400">{t.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="border-t border-slate-100 pt-3">
                      <h5 className="font-extrabold text-slate-900 text-sm">{t.name}</h5>
                      <span className="text-[11px] text-slate-400 block">
                        {t.role} • {t.companyOrLocation}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsNewTestimonial(false);
                        setEditingTestimonial({ ...t });
                      }}
                      className="flex-1 inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTestimonial(t.id, t.name)}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 5: PENGATURAN PERUSAHAAN & KONTAK ---------------- */}
        {activeTab === "settings" && settings && (
          <form onSubmit={saveSettings} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Pengaturan Profil Perusahaan & Nomor Kontak
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Semua nomor WhatsApp, alamat workshop, nama perusahaan, dan teks banner yang diubah di sini akan otomatis terbarui di seluruh halaman website.
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
              >
                <Save className="w-4 h-4 mr-1.5" />
                Simpan Perubahan
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama Usaha / Perusahaan
                </label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Slogan / Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-amber-400 p-0.5 flex items-center justify-center shadow-md overflow-hidden shrink-0">
                  <img
                    src={settings.logoUrl || "/images/company-logo.png"}
                    alt="Preview Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Path / URL Logo Perusahaan (Default: /images/company-logo.png)
                  </label>
                  <input
                    type="text"
                    value={settings.logoUrl || "/images/company-logo.png"}
                    onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/images/company-logo.png"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Logo ditampilkan di header/navbar, banner utama hero, pop-up pembuka, dan footer.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nomor WhatsApp CS (Format: 62812xxx tanpa tanda +)
                </label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nomor Telepon Kantor
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Perusahaan
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Jam Kerja Workshop & CS
                </label>
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Alamat Kantor Pemasaran
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Alamat Workshop Perakitan
                </label>
                <input
                  type="text"
                  value={settings.workshopAddress}
                  onChange={(e) => setSettings({ ...settings, workshopAddress: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
                />
              </div>

              {/* FOTO PROFIL PERUSAHAAN (BISA DIGANTI) */}
              <div className="sm:col-span-1">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  URL Foto Profil Perusahaan (Halaman Profil)
                </label>
                <input
                  type="text"
                  value={settings.aboutImage || ""}
                  onChange={(e) => setSettings({ ...settings, aboutImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
                />
                {settings.aboutImage && (
                  <div className="mt-2 h-28 rounded-xl overflow-hidden border border-slate-200">
                    <img src={settings.aboutImage} alt="Preview Foto Profil" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* FOTO WORKSHOP PERAKITAN (BISA DIGANTI) */}
              <div className="sm:col-span-1">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  URL Foto Workshop Perakitan (Hero Beranda)
                </label>
                <input
                  type="text"
                  value={settings.workshopImage || ""}
                  onChange={(e) => setSettings({ ...settings, workshopImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
                />
                {settings.workshopImage && (
                  <div className="mt-2 h-28 rounded-xl overflow-hidden border border-slate-200">
                    <img src={settings.workshopImage} alt="Preview Foto Workshop" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Lama Garansi Servis (Tahun)
                </label>
                <input
                  type="number"
                  value={settings.warrantyYears}
                  onChange={(e) => setSettings({ ...settings, warrantyYears: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Pengalaman Usaha (Tahun)
                </label>
                <input
                  type="number"
                  value={settings.yearsExperience}
                  onChange={(e) => setSettings({ ...settings, yearsExperience: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Headline Judul Utama Website (Hero Title)
                </label>
                <input
                  type="text"
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Sub-judul Hero (Deskripsi Singkat di Beranda)
                </label>
                <textarea
                  rows={2}
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Cerita Tentang Perusahaan (About Story)
                </label>
                <textarea
                  rows={4}
                  value={settings.aboutStory}
                  onChange={(e) => setSettings({ ...settings, aboutStory: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center space-x-4">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-md shadow-maroon-900/30 transition-all border border-amber-400/30"
              >
                Simpan Semua Perubahan Pengaturan
              </button>
              <span className="text-xs text-slate-500">
                * Perubahan akan langsung tayang di website utama secara instan.
              </span>
            </div>
          </form>
        )}

        {/* ---------------- TAB 6: PESAN MASUK & LEADS ---------------- */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-black text-slate-900">
                Kotak Masuk Permintaan Survey & Kemitraan
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Daftar prospek / calon pelanggan yang mengisi form kontak, simulasi ukuran, dan kemitraan kontraktor di website.
              </p>
            </div>

            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          m.type === "partnership"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {m.type === "partnership" ? "Pengajuan Mitra B2B" : "Request Survey & Ukur"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(m.createdAt).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900">{m.name}</h4>
                    <div className="text-xs text-slate-600 space-x-3">
                      <span>
                        WA: <strong className="text-emerald-700">{m.phone}</strong>
                      </span>
                      {m.city && <span>Kota: <strong>{m.city}</strong></span>}
                      {m.width && m.height && (
                        <span>
                          Ukuran: <strong>{m.width}m x {m.height}m</strong>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                      {m.message}
                    </p>
                  </div>

                  <div className="flex md:flex-col justify-between items-end gap-2 shrink-0">
                    <div className="flex items-center space-x-2">
                      <select
                        value={m.status}
                        onChange={(e) => updateMessageStatus(m.id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                          m.status === "new"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : m.status === "contacted"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : "bg-emerald-50 text-emerald-800 border-emerald-300"
                        }`}
                      >
                        <option value="new">Belum Dihubungi</option>
                        <option value="contacted">Sudah Dihubungi</option>
                        <option value="done">Selesai / Deal</option>
                      </select>
                      <button
                        onClick={() => deleteMessage(m.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <a
                      href={`https://wa.me/${m.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Halo Bpk/Ibu ${m.name}, kami dari ${settings?.companyName}. Menindaklanjuti pesan yang Anda kirimkan melalui website mengenai pintu harmonika.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                    >
                      Chat WhatsApp Prospek
                    </a>
                  </div>
                </div>
              ))}

              {messages.length === 0 && (
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
                  Belum ada pesan masuk dari pengunjung.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- EDIT PRODUCT MODAL ---------------- */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                {isNewProduct ? "Tambah Produk Baru" : "Edit Produk Pintu Harmonika"}
              </h3>

              <form onSubmit={saveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nama Produk / Varian *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      placeholder="Contoh: SUPER 1, SUPER 2, KELAS 1..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Tebal Daun Rol *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.daunThickness}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, daunThickness: e.target.value })
                      }
                      placeholder="Contoh: TEBEL 1,2 atau 1.2 mm"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Spesifikasi Rangka *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.frameSpec || editingProduct.unpSize || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          frameSpec: e.target.value,
                          unpSize: e.target.value,
                        })
                      }
                      placeholder="Contoh: UNP 6,5 + 19 | UNP 12 | 60x60"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Plat Silangan *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.silangan || editingProduct.stripThickness}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stripThickness: e.target.value,
                          silangan: e.target.value,
                        })
                      }
                      placeholder="Contoh: 2 cm x 4,5 mm"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Galaran
                    </label>
                    <input
                      type="text"
                      value={editingProduct.galaran || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, galaran: e.target.value })
                      }
                      placeholder="Contoh: 58 - 25"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Rel / B. Besar
                    </label>
                    <input
                      type="text"
                      value={editingProduct.relBesar || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, relBesar: e.target.value })
                      }
                      placeholder="Contoh: UNP 6,5 + 19"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Cakak Tiang
                    </label>
                    <input
                      type="text"
                      value={editingProduct.cakakTiang || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, cakakTiang: e.target.value })
                      }
                      placeholder="Contoh: UNP 12"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Pipa Kotak
                    </label>
                    <input
                      type="text"
                      value={editingProduct.pipaKotak || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, pipaKotak: e.target.value })
                      }
                      placeholder="Contoh: 60 x 60"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Plat Topi
                    </label>
                    <input
                      type="text"
                      value={editingProduct.platTopi || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, platTopi: e.target.value })
                      }
                      placeholder="Contoh: 10 cm"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Rekomendasi Penggunaan
                    </label>
                    <input
                      type="text"
                      value={editingProduct.usageRecommendation || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          usageRecommendation: e.target.value,
                        })
                      }
                      placeholder="Contoh: Gudang Industri, Ruko Premium, Perbankan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Keterangan Garansi (Emas: "Garansi 5 Tahun" / Silver: "Ber-garansi Servis Resmi")
                    </label>
                    <input
                      type="text"
                      value={editingProduct.warrantyInfo || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, warrantyInfo: e.target.value })
                      }
                      placeholder="Contoh: Garansi 5 Tahun atau Ber-garansi Servis Resmi"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Badge Highlight (Opsional)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.badge || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, badge: e.target.value })
                      }
                      placeholder="Contoh: Best Seller / Paling Kokoh"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Roda Bearing
                    </label>
                    <input
                      type="text"
                      value={editingProduct.bearingType}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, bearingType: e.target.value })
                      }
                      placeholder="Double Bearing 6204 Asli"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Harga per m² (Angka saja untuk kalkulator) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingProduct.pricePerMeter}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setEditingProduct({
                          ...editingProduct,
                          pricePerMeter: val,
                          priceDisplay: `Rp ${val.toLocaleString("id-ID")} / m²`,
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Teks Tampilan Harga
                    </label>
                    <input
                      type="text"
                      value={editingProduct.priceDisplay}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, priceDisplay: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      URL Foto Produk
                    </label>
                    <input
                      type="text"
                      value={editingProduct.image}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, image: e.target.value })
                      }
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Deskripsi Singkat Produk
                    </label>
                    <textarea
                      rows={2}
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan Produk
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ---------------- EDIT PROJECT MODAL ---------------- */}
        {editingProject && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl my-8">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                {isNewProject ? "Tambah Proyek Selesai" : "Edit Proyek Portofolio"}
              </h3>

              <form onSubmit={saveProject} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Judul Proyek *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    placeholder="Contoh: Pemasangan 6 Unit Pintu Harmonika Ruko Central"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Kategori Proyek
                    </label>
                    <select
                      value={editingProject.category}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    >
                      <option value="Ruko & Komersial">Ruko & Komersial</option>
                      <option value="Gudang & Industri">Gudang & Industri</option>
                      <option value="Garasi Rumah">Garasi Rumah</option>
                      <option value="Toko & Pasar">Toko & Pasar</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Lokasi / Kota *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.location}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, location: e.target.value })
                      }
                      placeholder="Surabaya, Jawa Timur"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Klien / Pemilik
                    </label>
                    <input
                      type="text"
                      value={editingProject.client}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, client: e.target.value })
                      }
                      placeholder="PT Sinar Surya / Bpk. Hendra"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Tahun Pasang
                    </label>
                    <input
                      type="text"
                      value={editingProject.year}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, year: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Tipe Pintu
                    </label>
                    <input
                      type="text"
                      value={editingProject.productType}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, productType: e.target.value })
                      }
                      placeholder="Tipe Super Heavy (1.2mm)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Jumlah Unit / Dimensi
                    </label>
                    <input
                      type="text"
                      value={editingProject.unitsCount}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, unitsCount: e.target.value })
                      }
                      placeholder="4 Unit (4m x 3.5m)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    URL Foto Proyek
                  </label>
                  <input
                    type="text"
                    value={editingProject.image}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, image: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan Proyek
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ---------------- EDIT MATERIAL MODAL ---------------- */}
        {editingMaterial && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl my-8">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                {isNewMaterial ? "Tambah Komponen Material" : "Edit Komponen Material"}
              </h3>

              <form onSubmit={saveMaterial} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nama Komponen *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMaterial.name}
                    onChange={(e) =>
                      setEditingMaterial({ ...editingMaterial, name: e.target.value })
                    }
                    placeholder="Contoh: Daun Pintu Harmonika"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Sub-judul / Bahan
                  </label>
                  <input
                    type="text"
                    value={editingMaterial.subtitle}
                    onChange={(e) =>
                      setEditingMaterial({ ...editingMaterial, subtitle: e.target.value })
                    }
                    placeholder="Baja Cold Rolled Steel SPCC SNI"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Spesifikasi Ukuran
                  </label>
                  <input
                    type="text"
                    value={editingMaterial.specs}
                    onChange={(e) =>
                      setEditingMaterial({ ...editingMaterial, specs: e.target.value })
                    }
                    placeholder="Tebal: 0.8mm - 1.5mm"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    URL Foto Komponen
                  </label>
                  <input
                    type="text"
                    value={editingMaterial.image}
                    onChange={(e) =>
                      setEditingMaterial({ ...editingMaterial, image: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Deskripsi Lengkap
                  </label>
                  <textarea
                    rows={3}
                    value={editingMaterial.description}
                    onChange={(e) =>
                      setEditingMaterial({ ...editingMaterial, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingMaterial(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan Material
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ---------------- EDIT TESTIMONIAL MODAL ---------------- */}
        {editingTestimonial && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl my-8">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                {isNewTestimonial ? "Tambah Testimoni" : "Edit Testimoni"}
              </h3>

              <form onSubmit={saveTestimonial} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nama Pelanggan *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTestimonial.name}
                      onChange={(e) =>
                        setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Profesi / Toko
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.role}
                      onChange={(e) =>
                        setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Kota / Lokasi
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.companyOrLocation}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          companyOrLocation: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Rating Bintang (1 - 5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={editingTestimonial.rating}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          rating: parseInt(e.target.value) || 5,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Isi Ulasan Testimoni *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingTestimonial.content}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, content: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingTestimonial(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan Testimoni
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
