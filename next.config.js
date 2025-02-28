module.exports = {
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        has: [{ type: "protocol", value: "https" }],
        destination: "http://api.virtue-world.info:8081/:path*",
        permanent: false,
      },
    ];
  },
};
