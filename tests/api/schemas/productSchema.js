const productSchema = {
  type: 'object',
  required: ['id', 'name', 'price', 'brand', 'category'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    price: { type: 'string' },
    brand: { type: 'string' },
    category: {
      type: 'object',
      required: ['usertype', 'category'],
      properties: {
        usertype: {
          type: 'object',
          required: ['usertype'],
          properties: {
            usertype: { type: 'string' },
          },
        },
        category: { type: 'string' },
      },
    },
  },
};

module.exports = { productSchema };