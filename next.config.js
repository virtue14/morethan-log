module.exports = {
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // /api/로 시작하는 모든 요청을
        destination: "http://api.virtue-world.info/:path*", // EC2 API 서버로 프록시
      },
    ];
  },
};
