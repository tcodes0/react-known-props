## during refactor
- getElementProps('audio') (html and svg) x 97 thousand ops/sec
- getAllProps x 326 thousand ops/sec
- getElementProps('circle') (svg only) x 470 thousand ops/sec
- getElementProps('label') (html only) x 914 thousand ops/sec
- getGlobalProps() x 1,6 million ops/sec
- getEventProps() x 973 million ops/sec

## before refactor
- getAllProps x 31 thousand ops/sec
- getElementProps('label') x 35 thousand ops/sec
- getGlobalProps() x 1,6 million ops/sec
- getEventProps() x 926 million ops/sec