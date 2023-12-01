# shell



```shell
cd build

tar -zcvf build.tar.gz *

TIME=$(date "+%Y-%m-%d_%H-%M-%S")

cp -f -p build.tar.gz /var/jenkins_distribution/build_$TIME.tar.gz

```

```shell
#docker run --rm nginx:1.23.2 cat /etc/nginx/nginx.conf > nginx.conf

docker run --rm nginx:1.23.2 cat /etc/nginx/conf.d/default.conf > default.conf
```
