/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://Virtue-Hire_owner:5paRwhFSst3m@ep-floral-king-a1q617kr.ap-southeast-1.aws.neon.tech/Virtue-Hire?sslmode=require'
    }
}