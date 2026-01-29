FROM node:20-alpine

RUN apk add --no-cache \
  curl \
  zstd \
  ca-certificates


# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

ENV OLLAMA_HOST=0.0.0.0:11434
ENV PORT=3000

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000


CMD sh -c "\
ollama serve & \
echo 'Waiting for Ollama...' && \
until curl -s http://localhost:11434/api/tags > /dev/null; do sleep 2; done && \
echo 'Pulling model...' && \
ollama pull tinyllama && \
echo 'Starting Next.js' && \
npm run start"
