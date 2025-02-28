module.exports = {
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://api.virtue-world.info/:path*",
      },
    ];
  },
};
