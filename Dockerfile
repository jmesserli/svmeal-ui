FROM node:lts as builder

COPY ./ /build
WORKDIR /build
RUN npm install && npm run build

FROM nginx:stable-alpine

COPY --from=builder /build/dist/svmeal-ui /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]