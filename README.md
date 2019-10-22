# Simple benchmark of web servers
4 web apps implemented, each has 2 GET routes:
- `/json` - returns `{"hello": "world"}`
- `/hash/sha256` - returns sha256 hash of the `text` query parameter in JSON object

## Prerequisites
* To run Node.js apps: Node.js v10.16.3
* To build Go app: Go v1.13

## Results
[wrk](https://github.com/wg/wrk) was used for benchmarking.

The following commands were used:
```bash
wrk -c 100 -d 60s -t 2 <app_url>/json
```

```bash
wrk -c 100 -d 60s -t 2 <app_url>/hash/sha256\?text\=hello
```

### Local machine
Specs:
- CPU: Core i7 6 cores,
- RAM: 16 GB

#### `/json`
|                 | Req/Sec  |
|-----------------|----------|
| Node.JS HTTP    | 56915.02 |
| Node.JS Express | 22463.66 |
| Node.JS Fastify | 50427.73 |
| Go HTTP         | 78911.17 |

##### Node.JS HTTP
```
Running 1m test @ http://localhost:3000/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.76ms  304.06us  23.79ms   97.57%
    Req/Sec    28.60k     1.37k   29.57k    98.34%
  3420673 requests in 1.00m, 381.68MB read
Requests/sec:  56915.02
Transfer/sec:      6.35MB
```

##### Node.JS Express
```
Running 1m test @ http://localhost:3002/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.47ms  712.57us  37.15ms   90.82%
    Req/Sec    11.29k   735.95    11.85k    97.67%
  1350103 requests in 1.00m, 294.85MB read
Requests/sec:  22463.66
Transfer/sec:      4.91MB
```

##### Node.JS Fastify
```
Running 1m test @ http://localhost:3001/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.99ms  334.33us  24.39ms   97.24%
    Req/Sec    25.34k     1.31k   26.41k    98.17%
  3030732 requests in 1.00m, 474.01MB read
Requests/sec:  50427.73
Transfer/sec:      7.89MB
```

##### Go HTTP
```
Running 1m test @ http://localhost:3003/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.04ms  402.29us   9.30ms   74.88%
    Req/Sec    39.66k     3.47k   50.64k    75.42%
  4735546 requests in 1.00m, 564.52MB read
Requests/sec:  78911.17
Transfer/sec:      9.41MB
```

#### `/sha256?text=hello`
|                 | Req/Sec  |
|-----------------|----------|
| Node.JS HTTP    | 32224.29 |
| Node.JS Express | 18598.32 |
| Node.JS Fastify | 32440.92 |
| Go HTTP         | 71665.60 |

##### Node.JS HTTP
```
Running 1m test @ http://localhost:3000/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.11ms  514.43us  42.89ms   94.98%
    Req/Sec    16.19k   832.12    17.12k    97.33%
  1933642 requests in 1.00m, 322.71MB read
Requests/sec:  32224.29
Transfer/sec:      5.38MB
```

##### Node.JS Express
```
Running 1m test @ http://localhost:3002/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.39ms    0.97ms  68.12ms   89.28%
    Req/Sec     9.35k   700.22    17.88k    96.75%
  1117803 requests in 1.00m, 305.95MB read
Requests/sec:  18598.32
Transfer/sec:      5.09MB
```

##### Node.JS Fastify
```
Running 1m test @ http://localhost:3001/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.09ms  519.63us  28.90ms   94.43%
    Req/Sec    16.30k     0.92k   17.34k    97.50%
  1946572 requests in 1.00m, 412.12MB read
Requests/sec:  32440.92
Transfer/sec:      6.87MB
```

##### Go HTTP
```
Running 1m test @ http://localhost:3003/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.13ms  535.49us  30.69ms   76.33%
    Req/Sec    36.02k     3.62k   48.99k    78.42%
  4301081 requests in 1.00m, 750.63MB read
Requests/sec:  71665.60
Transfer/sec:     12.51MB
```

### Google Cloud Compute Engine f1-micro
Specs:
- CPU: 1 VCPU,
- RAM: 614 MB

#### `/json`
|                 | Req/Sec |
|-----------------|---------|
| Node.JS HTTP    | 660.99  |
| Node.JS Express | 659.14  |
| Node.JS Fastify | 659.96  |
| Go HTTP         | 652.01  |

##### Node.JS HTTP
```
Running 1m test @ http://130.211.228.16:3000/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   150.62ms    5.20ms 530.68ms   97.90%
    Req/Sec   333.41    111.53   505.00     64.10%
  39701 requests in 1.00m, 4.43MB read
Requests/sec:    660.99
Transfer/sec:     75.52KB
```

##### Node.JS Express
```
Running 1m test @ http://130.211.228.16:3002/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   151.16ms   12.25ms 921.74ms   99.32%
    Req/Sec   332.33    101.82   505.00     65.87%
  39575 requests in 1.00m, 8.64MB read
Requests/sec:    659.14
Transfer/sec:    147.41KB
```

##### Node.JS Fastify
```
Running 1m test @ http://130.211.228.16:3001/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   150.78ms    4.55ms 699.68ms   96.77%
    Req/Sec   332.56     98.64   505.00     62.00%
  39607 requests in 1.00m, 6.19MB read
Requests/sec:    659.96
Transfer/sec:    105.70KB
```

##### Go HTTP
```
Running 1m test @ http://130.211.228.16:3003/json
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   153.95ms   33.05ms 921.22ms   98.63%
    Req/Sec   330.84    108.10   505.00     64.54%
  39129 requests in 1.00m, 4.66MB read
Requests/sec:    652.01
Transfer/sec:     79.59KB
```

#### `/sha256?text=hello`
|                 | Req/Sec |
|-----------------|---------|
| Node.JS HTTP    | 659.78  |
| Node.JS Express | 649.56  |
| Node.JS Fastify | 655.56  |
| Go HTTP         | 660.55  |

##### Node.JS HTTP
```
Running 1m test @ http://130.211.228.16:3000/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   150.83ms    3.15ms 532.32ms   95.22%
    Req/Sec   332.55     99.55   505.00     61.92%
  39625 requests in 1.00m, 6.61MB read
Requests/sec:    659.78
Transfer/sec:    112.76KB
```

##### Node.JS Express
```
Running 1m test @ http://130.211.228.16:3002/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   154.32ms   31.18ms 926.02ms   98.44%
    Req/Sec   330.30    116.99   505.00     62.72%
  39009 requests in 1.00m, 10.68MB read
Requests/sec:    649.56
Transfer/sec:    182.05KB
```

##### Node.JS Fastify
```
Running 1m test @ http://130.211.228.16:3001/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   152.45ms   23.95ms 938.40ms   98.56%
    Req/Sec   331.47    126.28   505.00     60.64%
  39350 requests in 1.00m, 8.33MB read
Requests/sec:    655.56
Transfer/sec:    142.12KB
```

##### Go HTTP
```
Running 1m test @ http://130.211.228.16:3003/hash/sha256?text=hello
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   150.57ms    1.88ms 214.07ms   90.28%
    Req/Sec   333.05    105.57   505.00     62.82%
  39678 requests in 1.00m, 6.92MB read
Requests/sec:    660.55
Transfer/sec:    118.05KB
```
