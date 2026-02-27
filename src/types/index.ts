export type Role = 'admin' | 'customer';

export type Profile = {
  id: string;
  role: Role;
  full_name: string;
  phone: string;
  avatar_url?: string;
  created_at: string;
};

export type ProductType = 'pdf' | 'course' | 'physical' | 'bundle';

export type Product = {
  id: string;
  title: string;
  slug: string;
  short_desc: string;
  full_desc: string;
  price: number;
  old_price?: number;
  type: ProductType;
  category_id?: string;
  thumbnail_url: string;
  is_featured: boolean;
  is_popular: boolean;
  status: 'draft' | 'published';
  access_note?: string;
  created_at: string;
};

export type PurchaseStatus = 'pending' | 'approved' | 'rejected';

export type Purchase = {
  id: string;
  user_id: string;
  product_id: string;
  status: PurchaseStatus;
  admin_note?: string;
  created_at: string;
  product?: Product;
};
