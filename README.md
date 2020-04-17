## Build
```bash
docker image build --tag "keydonix/faketime-http" .
```

## Use
```bash
docker container run --rm -it -p "12340:80" --name "faketime-http" keydonix/faketime-http
curl http://localhost:12340/<seconds_since_unix_epoch>
```

## Test
```bash
docker image build --file "test.Dockerfile" --tag "faketime-test" .
curl http://localhost:12340/0
docker container run --rm -it --volumes-from "faketime-http" faketime-test date
curl http://localhost:12340/1587000000
docker container run --rm -it --volumes-from "faketime-http" faketime-test date
```
