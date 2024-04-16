import type { Schema, Attribute } from '@strapi/strapi';

export interface UserAddress extends Schema.Component {
  collectionName: 'components_user_addresses';
  info: {
    displayName: 'address';
    icon: 'database';
    description: '';
  };
  attributes: {
    street: Attribute.String;
    city: Attribute.String;
    zip: Attribute.Integer;
    country: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'user.address': UserAddress;
    }
  }
}
