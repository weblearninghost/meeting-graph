FROM node:18-slim

RUN apt-get update && apt-get install -y \
    curl \
    zstd \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

ENV OLLAMA_HOST=0.0.0.0:11434

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
EXPOSE 11434

CMD sh -c "\
ollama serve & \
echo 'Waiting for Ollama...' && \
until curl -s http://localhost:11434/api/tags > /dev/null; do sleep 2; done && \
echo 'Pulling model...' && \
ollama pull tinyllama && \
echo 'Starting Next.js' && \
npm run start"
