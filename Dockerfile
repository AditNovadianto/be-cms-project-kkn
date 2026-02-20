# Gunakan base image Node.js versi LTS
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json terlebih dahulu
# agar Docker bisa cache dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code ke container
COPY . .

# Expose port (ubah sesuai port yang kamu pakai, misalnya 3000)
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]