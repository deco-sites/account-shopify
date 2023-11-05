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
  products: string[];
}

export interface CustomerInfo {
  id: string;
  firstName: string;
  lastName: string;
  acceptsMarketing: boolean;
  email: string;
  phone: string;
}

export interface Address {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  name: string;
  province_code: string;
  country_code: string;
  country_name: string;
  default: boolean;
}

export type UserOrders = UserOrder[];
