# Stage 1
FROM node:14 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
ARG REACT_APP_KEYCLOAK_URL
ARG REACT_APP_KEYCLOAK_EXTERNAL_URL

ENV REACT_APP_KEYCLOAK_URL $REACT_APP_KEYCLOAK_URL
ENV REACT_APP_KEYCLOAK_EXTERNAL_URL $REACT_APP_KEYCLOAK_EXTERNAL_URL
COPY . ./
RUN npm run build

# Stage 2
FROM nginx:1.20.1-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
