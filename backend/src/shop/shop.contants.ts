export enum SHOP_MESSAGE {
  SUPPLIER_IS_INVALID = 'the supplier is invalid',
  PRODUCTS_IS_INVALID = 'the products is invalid',
  CUSTOMER_IS_INVALID = 'the customer is invalid',
}

export enum SHOP_EVENT {
  PRODUCT_CREATED = 'product:created',
  PRODUCT_UPDATED = 'product:updated',
  PRODUCT_REMOVED = 'product:removed',
  PRODUCT_INVENTORY_CHANGED = 'product-inventory:changed'
}