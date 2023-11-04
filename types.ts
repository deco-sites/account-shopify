export interface UserInfo {
  "@type": "UserInfo";
  id: string;
  firstName: string;
  lastName: string;
  acceptsMarketing: boolean;
  email: string;
  phone: string;
}

export interface UserOrder {
  "@type": "UserOrder";
  id: string;
  name: string;
  createdAt: string;
  totalPrice: string;
  status: string;
}

export interface CustomerInfo {
  id: string
  firstName: string
  lastName: string
  acceptsMarketing: boolean
  email: string
  phone: string
}

export type UserOrders = UserOrder[];