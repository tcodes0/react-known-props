## during refactor
- getAllProps x 47k ops/sec
- getElementProps('label') x 50k ops/sec
- getGlobalProps() x 1,6m ops/sec
- getEventProps() x 950m ops/sec

## before refactor
- getAllProps x 31k ops/sec
- getElementProps('label') x 35k ops/sec
- getGlobalProps() x 1,6m ops/sec
- getEventProps() x 926m ops/sec