# ably-sample-code

Just a workspace for me to test out Ably realtime

``` shell
docker build -t nodeapp .

docker run --name nodeapp -p 9999:9999 nodeapp
```

To shutdown:

``` shell
docker stop nodeapp
```

To delete:

``` shell
docker rm nodeapp
```

You can also use the GUI.

To run multiple intsances:

``` shell
docker run -d -p 8000:9999 nodeapp
docker run -d -p 8001:9999 nodeapp
docker run -d -p 8002:9999 nodeapp
```

`-d` is detach.
