const bcrypt = require("bcryptjs");
const db = require("./models");

async function seedHR() {
  try {
    await db.sequelize.sync(); // ensure models are synced
    const existingUser = await db.User.findOne({ where: { email: "hr@example.com" } });

    if (!existingUser) {
      await db.User.create({
        email: "hr@example.com",
        password: bcrypt.hashSync("admin123"),
        role: "HR"
      });
      console.log("✅ HR user seeded successfully.");
    } else {
      console.log("ℹ️ HR user already exists.");
    }

    process.exit();
  } catch (err) {
    console.error("❌ Failed to seed HR user:", err);
    process.exit(1);
  }
}

seedHR();
