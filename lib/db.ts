import fs from "fs/promises";
import path from "path";
import {
  DatabaseData,
  CompanySettings,
  Product,
  MaterialItem,
  ProjectItem,
  TestimonialItem,
  ContactMessage,
} from "./types";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

// Read entire database
export async function getDb(): Promise<DatabaseData> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading database:", error);
    throw new Error("Gagal membaca data database");
  }
}

// Atomic save database
export async function saveDb(data: DatabaseData): Promise<void> {
  const tempPath = `${DB_PATH}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tempPath, DB_PATH);
}

// ---------------- Settings ----------------
export async function getSettings(): Promise<CompanySettings> {
  const db = await getDb();
  return db.settings;
}

export async function updateSettings(newSettings: Partial<CompanySettings>): Promise<CompanySettings> {
  const db = await getDb();
  db.settings = { ...db.settings, ...newSettings };
  await saveDb(db);
  return db.settings;
}

// ---------------- Products ----------------
export async function getProducts(): Promise<Product[]> {
  const db = await getDb();
  return db.products.sort((a, b) => a.order - b.order);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const db = await getDb();
  return db.products.find((p) => p.id === id);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const db = await getDb();
  return db.products.find((p) => p.slug === slug);
}

export async function createProduct(productData: Omit<Product, "id">): Promise<Product> {
  const db = await getDb();
  const id = `prod-${Date.now()}`;
  const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newProduct: Product = {
    ...productData,
    id,
    slug,
    order: productData.order || db.products.length + 1,
  };
  db.products.push(newProduct);
  await saveDb(db);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const db = await getDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.products[index] = { ...db.products[index], ...updates };
  await saveDb(db);
  return db.products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = await getDb();
  const beforeLen = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== beforeLen) {
    await saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Materials ----------------
export async function getMaterials(): Promise<MaterialItem[]> {
  const db = await getDb();
  return db.materials.sort((a, b) => a.order - b.order);
}

export async function updateMaterial(id: string, updates: Partial<MaterialItem>): Promise<MaterialItem | null> {
  const db = await getDb();
  const index = db.materials.findIndex((m) => m.id === id);
  if (index === -1) return null;

  db.materials[index] = { ...db.materials[index], ...updates };
  await saveDb(db);
  return db.materials[index];
}

export async function createMaterial(item: Omit<MaterialItem, "id">): Promise<MaterialItem> {
  const db = await getDb();
  const id = `mat-${Date.now()}`;
  const newMaterial: MaterialItem = {
    ...item,
    id,
    order: item.order || db.materials.length + 1,
  };
  db.materials.push(newMaterial);
  await saveDb(db);
  return newMaterial;
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const db = await getDb();
  const beforeLen = db.materials.length;
  db.materials = db.materials.filter((m) => m.id !== id);
  if (db.materials.length !== beforeLen) {
    await saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Projects ----------------
export async function getProjects(): Promise<ProjectItem[]> {
  const db = await getDb();
  return db.projects;
}

export async function createProject(project: Omit<ProjectItem, "id">): Promise<ProjectItem> {
  const db = await getDb();
  const id = `proj-${Date.now()}`;
  const newProject: ProjectItem = { ...project, id };
  db.projects.unshift(newProject);
  await saveDb(db);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<ProjectItem>): Promise<ProjectItem | null> {
  const db = await getDb();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.projects[index] = { ...db.projects[index], ...updates };
  await saveDb(db);
  return db.projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = await getDb();
  const beforeLen = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length !== beforeLen) {
    await saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Testimonials ----------------
export async function getTestimonials(): Promise<TestimonialItem[]> {
  const db = await getDb();
  return db.testimonials;
}

export async function createTestimonial(test: Omit<TestimonialItem, "id">): Promise<TestimonialItem> {
  const db = await getDb();
  const id = `test-${Date.now()}`;
  const newTest: TestimonialItem = { ...test, id };
  db.testimonials.unshift(newTest);
  await saveDb(db);
  return newTest;
}

export async function updateTestimonial(id: string, updates: Partial<TestimonialItem>): Promise<TestimonialItem | null> {
  const db = await getDb();
  const index = db.testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;

  db.testimonials[index] = { ...db.testimonials[index], ...updates };
  await saveDb(db);
  return db.testimonials[index];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = await getDb();
  const beforeLen = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  if (db.testimonials.length !== beforeLen) {
    await saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Messages & Leads ----------------
export async function getMessages(): Promise<ContactMessage[]> {
  const db = await getDb();
  return db.messages || [];
}

export async function createMessage(msg: Omit<ContactMessage, "id" | "createdAt" | "status">): Promise<ContactMessage> {
  const db = await getDb();
  if (!db.messages) db.messages = [];
  const id = `msg-${Date.now()}`;
  const newMsg: ContactMessage = {
    ...msg,
    id,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  db.messages.unshift(newMsg);
  await saveDb(db);
  return newMsg;
}

export async function updateMessageStatus(id: string, status: "new" | "contacted" | "done"): Promise<boolean> {
  const db = await getDb();
  if (!db.messages) return false;
  const msg = db.messages.find((m) => m.id === id);
  if (!msg) return false;
  msg.status = status;
  await saveDb(db);
  return true;
}

export async function deleteMessage(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db.messages) return false;
  const beforeLen = db.messages.length;
  db.messages = db.messages.filter((m) => m.id !== id);
  if (db.messages.length !== beforeLen) {
    await saveDb(db);
    return true;
  }
  return false;
}
