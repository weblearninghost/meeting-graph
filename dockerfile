FROM node:18-slim

# Install dependencies
RUN apt-get update && apt-get install -y curl

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Set working directory
WORKDIR /app

# Copy project
COPY . .

# Install Node dependencies
RUN npm install

# Pull SMALLEST possible model
RUN ollama pull tinyllama

# Expose ports
EXPOSE 3000
EXPOSE 11434

# Start Ollama + Next.js
CMD sh -c "ollama serve & npm run start"
