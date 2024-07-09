import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductItemProductItem extends Schema.Component {
  collectionName: 'components_product_item_product_items';
  info: {
    displayName: 'Product-item';
    description: '';
  };
  attributes: {
    amount: Attribute.Integer;
    price: Attribute.Decimal;
    product: Attribute.Relation<
      'product-item.product-item',
      'oneToOne',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'product-item.product-item': ProductItemProductItem;
    }
  }
}
