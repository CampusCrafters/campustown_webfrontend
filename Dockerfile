FROM node:slim 
WORKDIR /app
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL ${VITE_BACKEND_URL}
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm","run","dev","--","--host"]
