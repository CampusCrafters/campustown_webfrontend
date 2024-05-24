FROM node:slim 
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5173
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
CMD ["npm","run","dev","--","--host"]
