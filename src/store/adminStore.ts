import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  description: string;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  status: 'active' | 'disabled';
  createdAt: string;
  lastLogin?: string;
  orders?: number;
  totalSpent?: number;
}

export interface Analytics {
  revenue: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  orders: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  users: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  inventory: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}

interface AdminStore {
  products: Product[];
  orders: Order[];
  users: User[];
  analytics: Analytics;
  notifications: Array<{
    id: number;
    type: 'info' | 'warning' | 'success' | 'error';
    message: string;
    timestamp: string;
    read: boolean;
  }>;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrder: (id: string, status: Order['status']) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  updateInventory: (id: string, stock: number) => void;
  markNotificationAsRead: (id: number) => void;
  clearNotifications: () => void;
  getAnalytics: (period: 'daily' | 'weekly' | 'monthly') => {
    revenue: number[];
    orders: number[];
    users: number[];
  };
}

// Generate sample data for analytics
const generateAnalyticsData = () => {
  const generateDataPoints = (base: number, variance: number, count: number) =>
    Array.from({ length: count }, () => 
      Math.max(0, base + Math.random() * variance - variance / 2)
    );

  return {
    revenue: {
      daily: generateDataPoints(1000, 500, 7),
      weekly: generateDataPoints(5000, 2000, 4),
      monthly: generateDataPoints(20000, 8000, 12)
    },
    orders: {
      daily: generateDataPoints(20, 10, 7),
      weekly: generateDataPoints(100, 30, 4),
      monthly: generateDataPoints(400, 100, 12)
    },
    users: {
      daily: generateDataPoints(5, 3, 7),
      weekly: generateDataPoints(25, 10, 4),
      monthly: generateDataPoints(100, 30, 12)
    },
    inventory: {
      inStock: 45,
      lowStock: 12,
      outOfStock: 3
    }
  };
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: 'tower',
          name: 'SmartAero Tower',
          category: 'Main Product',
          price: 299.99,
          stock: 50,
          status: 'active',
          description: 'Smart agriculture monitoring system',
          image: 'https://images.pexels.com/photos/3016430/pexels-photo-3016430.jpeg'
        },
        {
          id: 'soil-kit',
          name: 'Soil Moisture Sensor Kit',
          category: 'IoT Devices',
          price: 49.99,
          stock: 100,
          status: 'active',
          description: 'High accuracy soil moisture monitoring',
          image: 'https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg'
        }
      ],
      orders: [
        {
          id: 'ORD-2024001',
          customerId: 'user1',
          customerName: 'John Doe',
          date: '2024-02-20',
          total: 349.98,
          status: 'processing',
          items: [
            { productId: 'tower', quantity: 1, price: 299.99 },
            { productId: 'soil-kit', quantity: 1, price: 49.99 }
          ]
        }
      ],
      users: [
        {
          id: 'admin1',
          email: 'mohamedali.jaadari@gmail.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01',
          lastLogin: '2024-02-20T10:30:00Z',
          orders: 0,
          totalSpent: 0
        }
      ],
      analytics: generateAnalyticsData(),
      notifications: [
        {
          id: 1,
          type: 'warning',
          message: 'Low stock alert: SmartAero Tower (5 units remaining)',
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: 2,
          type: 'success',
          message: 'New order received: ORD-2024001',
          timestamp: new Date().toISOString(),
          read: false
        }
      ],
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: Math.random().toString(36).substr(2, 9) }
          ],
          notifications: [
            {
              id: Date.now(),
              type: 'success',
              message: `New product added: ${product.name}`,
              timestamp: new Date().toISOString(),
              read: false
            },
            ...state.notifications
          ]
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
          notifications: [
            {
              id: Date.now(),
              type: 'info',
              message: `Product updated: ${updates.name || id}`,
              timestamp: new Date().toISOString(),
              read: false
            },
            ...state.notifications
          ]
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
          notifications: [
            {
              id: Date.now(),
              type: 'warning',
              message: `Product deleted: ${id}`,
              timestamp: new Date().toISOString(),
              read: false
            },
            ...state.notifications
          ]
        })),
      updateOrder: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
          notifications: [
            {
              id: Date.now(),
              type: 'info',
              message: `Order ${id} status updated to ${status}`,
              timestamp: new Date().toISOString(),
              read: false
            },
            ...state.notifications
          ]
        })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          )
        })),
      updateInventory: (id, stock) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, stock } : product
          ),
          notifications: [
            {
              id: Date.now(),
              type: stock < 10 ? 'warning' : 'info',
              message: stock < 10
                ? `Low stock alert: ${id} (${stock} units remaining)`
                : `Inventory updated: ${id} (${stock} units)`,
              timestamp: new Date().toISOString(),
              read: false
            },
            ...state.notifications
          ]
        })),
      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        })),
      clearNotifications: () =>
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true
          }))
        })),
      getAnalytics: (period) => {
        const analytics = get().analytics;
        return {
          revenue: analytics.revenue[period],
          orders: analytics.orders[period],
          users: analytics.users[period]
        };
      }
    }),
    {
      name: 'admin-storage'
    }
  )
);