const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "public", "images", "sponsors");

// Ensure directory exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Create 19 empty SVG files with minimal valid structure
for (let i = 1; i <= 19; i++) {
  const fileName = `sponsor${i+1}.svg`;
  const filePath = path.join(folderPath, fileName);
 
  fs.writeFileSync(filePath, "", "utf8");
  console.log(`✅ Created: ${fileName}`);
}
