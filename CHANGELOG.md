## during refactor
- getElementProps('circle') x 7 thousand ops/sec
- getElementProps('audio') x 11 thousand ops/sec
- getElementProps('label') x 53 thousand ops/sec
- getAllProps x 326 thousand ops/sec
- getGlobalProps() x 1,6 million ops/sec
- getEventProps() x 973 million ops/sec

## before refactor
- getAllProps x 31 thousand ops/sec
- getElementProps('label') x 35 thousand ops/sec
- getGlobalProps() x 1,6 million ops/sec
- getEventProps() x 926 million ops/sec