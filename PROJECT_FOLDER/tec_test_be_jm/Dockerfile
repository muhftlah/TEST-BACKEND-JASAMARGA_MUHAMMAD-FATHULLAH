# Gunakan Node.js versi LTS sebagai base image
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json terlebih dahulu
# Ini memanfaatkan Docker layer caching agar npm install
# tidak dijalankan ulang jika dependencies tidak berubah
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy seluruh source code ke dalam container
COPY . .

# Expose port yang digunakan aplikasi (default Express: 3000)
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Jalankan aplikasi
CMD ["npm", "start"]
