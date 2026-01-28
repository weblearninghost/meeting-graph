FROM node:18-slim

# Install system dependencies (IMPORTANT)
RUN apt-get update && apt-get install -y \
    curl \
    zstd \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install Node dependencies
RUN npm install

# Pull the SMALLEST model (still risky but required)
RUN ollama pull tinyllama

# Expose ports
EXPOSE 3000
EXPOSE 11434

# Start Ollama + Next.js
CMD sh -c "ollama serve & npm run start"
