FROM node:12.18.1-alpine AS build

WORKDIR /app/airnow

ENV PATH /app/dawei/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install 

COPY . ./

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/airnow/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
