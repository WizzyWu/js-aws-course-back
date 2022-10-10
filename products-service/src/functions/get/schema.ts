export default {
    type: "object",
    statusCode: { type: 'number' },
    headers: { type: 'object' },
    properties: {
        products: { type: 'array|void' },
        message: {type: 'string|void'}
    },
} as const;
  