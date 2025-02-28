module.exports = {
  images: {
    domains: ["www.notion.so", "lh5.googleusercontent.com", "s3-us-west-2.amazonaws.com"],
  },
  async redirects() {
    return [
      {
        source: "/api/:path*",
        destination: "http://api.virtue-world.info:8081/:path*",
        permanent: false, // HTTP 유지 (브라우저 캐싱 방지)
      },
    ];
  },
};
