# Simple benchmark of web servers
4 web apps implemented, each has 2 GET routes:
- `/json` - returns `{"hello": "world"}`
- `/hash/sha256` - returns sha256 hash of the `text` query parameter in JSON object

## Prerequisites
* To run Node.js apps: Node.js v20.17.0
* To build Go app: Go v1.23
* To run [Bun](https://bun.sh/) app: v1.1.29

## Build apps
### go-http
```bash
go build -o app ./...
```

### bun
```bash
bun build --compile --minify --outfile app index.ts
```

## Results
[wrk](https://github.com/wg/wrk) was used for benchmarking.

The following commands were used:
```bash
wrk -c 100 -d 60s -t 2 --latency <app_url>/json
```

```bash
wrk -c 100 -d 60s -t 2 --latency <app_url>/hash/sha256\?text\=hello
```

### Local machine
MacBook Pro 14 M2 Pro.

Specs:
- CPU: M2 Pro 10 cores,
- RAM: 16 GB

#### `/json`
| # |                 | Req/Sec  | Latency %%99 | Latency Max |
|---|-----------------|----------|--------------|-------------|
| 1 | Bun             | 93511.14 | 1.54ms       | 8.59ms      |
| 2 | Go HTTP         | 84580.25 | 2.40ms       | 4.80ms      |
| 3 | Node.JS HTTP    | 72360.00 | 1.51ms       | 116.90ms    |
| 4 | Node.JS Fastify | 69341.86 | 1.59ms       | 132.16ms    |
| 5 | Node.JS Express | 18121.32 | 6.92ms       | 338.18ms    |

##### Node.JS HTTP
```
Running 1m test @ http://localhost:3000/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.42ms    1.47ms 116.90ms   99.90%
    Req/Sec    36.36k     0.89k   38.83k    96.17%
  Latency Distribution
     50%    1.40ms
     75%    1.42ms
     90%    1.44ms
     99%    1.51ms
  4348974 requests in 1.00m, 580.65MB read
Requests/sec:  72360.00
Transfer/sec:      9.66MB
```

##### Node.JS Express
```
Running 1m test @ http://localhost:3002/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.74ms    6.24ms 338.18ms   99.77%
    Req/Sec     9.11k   384.49    17.71k    93.09%
  Latency Distribution
     50%    5.45ms
     75%    5.65ms
     90%    6.09ms
     99%    6.92ms
  1089134 requests in 1.00m, 261.75MB read
Requests/sec:  18121.32
Transfer/sec:      4.36MB
```

##### Node.JS Fastify
```
Running 1m test @ http://localhost:3001/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.49ms    1.76ms 132.16ms   99.88%
    Req/Sec    34.84k     0.96k   36.37k    97.92%
  Latency Distribution
     50%    1.45ms
     75%    1.47ms
     90%    1.49ms
     99%    1.59ms
  4167566 requests in 1.00m, 747.21MB read
Requests/sec:  69341.86
Transfer/sec:     12.43MB
```

##### Go HTTP
```
Running 1m test @ http://localhost:3003/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.13ms  338.84us   4.80ms   82.02%
    Req/Sec    42.50k     1.13k   47.13k    82.83%
  Latency Distribution
     50%    1.13ms
     75%    1.21ms
     90%    1.36ms
     99%    2.40ms
  5075058 requests in 1.00m, 604.99MB read
Requests/sec:  84580.25
Transfer/sec:     10.08MB
```

##### Bun
```
Running 1m test @ http://localhost:3004/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.07ms  143.23us   8.59ms   75.54%
    Req/Sec    46.98k     1.14k   51.05k    74.04%
  Latency Distribution
     50%    1.09ms
     75%    1.11ms
     90%    1.14ms
     99%    1.54ms
  5620253 requests in 1.00m, 745.02MB read
Requests/sec:  93511.14
Transfer/sec:     12.40MB
```

#### `/sha256?text=hello`
| # |                 | Req/Sec  | Latency %%99 | Latency Max |
|---|-----------------|----------|--------------|-------------|
| 1 | Bun             | 99384.66 | 1.69ms       | 5.73ms      |
| 2 | Go HTTP         | 84445.64 | 2.54ms       | 14.21ms     |
| 3 | Node.JS Fastify | 64697.52 | 1.99ms       | 98.22ms     |
| 4 | Node.JS HTTP    | 64632.50 | 2.02ms       | 105.60ms    |
| 5 | Node.JS Express | 15808.83 | 7.78ms       | 351.63ms    |

##### Node.JS HTTP
```
Running 1m test @ http://localhost:3000/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.57ms    1.10ms 105.60ms   99.64%
    Req/Sec    32.48k   729.72    34.21k    79.20%
  Latency Distribution
     50%    1.54ms
     75%    1.57ms
     90%    1.62ms
     99%    2.02ms
  3884567 requests in 1.00m, 733.51MB read
Requests/sec:  64632.50
Transfer/sec:     12.20MB
```

##### Node.JS Express
```
Running 1m test @ http://localhost:3002/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.54ms    6.24ms 351.63ms   99.79%
    Req/Sec     7.95k   284.13    15.31k    96.34%
  Latency Distribution
     50%    6.25ms
     75%    6.44ms
     90%    6.92ms
     99%    7.78ms
  950148 requests in 1.00m, 280.90MB read
Requests/sec:  15808.83
Transfer/sec:      4.67MB
```

##### Node.JS Fastify
```
Running 1m test @ http://localhost:3001/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.56ms    0.95ms  98.22ms   99.60%
    Req/Sec    32.51k     0.87k   34.20k    91.93%
  Latency Distribution
     50%    1.54ms
     75%    1.57ms
     90%    1.62ms
     99%    1.99ms
  3888480 requests in 1.00m, 0.89GB read
Requests/sec:  64697.52
Transfer/sec:     15.18MB
```

##### Go HTTP
```
Running 1m test @ http://localhost:3003/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.14ms  406.02us  14.21ms   79.06%
    Req/Sec    42.43k     0.91k   46.59k    75.33%
  Latency Distribution
     50%    1.11ms
     75%    1.22ms
     90%    1.57ms
     99%    2.54ms
  5066922 requests in 1.00m, 0.86GB read
Requests/sec:  84445.64
Transfer/sec:     14.74MB
```

##### Bun
```
Running 1m test @ http://localhost:3004/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.00ms  211.57us   5.73ms   77.91%
    Req/Sec    49.98k     3.47k   98.07k    77.52%
  Latency Distribution
     50%    0.94ms
     75%    1.18ms
     90%    1.22ms
     99%    1.69ms
  5973170 requests in 1.00m, 1.10GB read
Requests/sec:  99384.66
Transfer/sec:     18.67MB
```
