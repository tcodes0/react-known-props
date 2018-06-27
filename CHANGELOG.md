## during refactor
- getElementProps('label') x 53k ops/sec
- getAllProps x 326k ops/sec
- getGlobalProps() x 1,6m ops/sec
- getEventProps() x 973m ops/sec

## before refactor
- getAllProps x 31k ops/sec
- getElementProps('label') x 35k ops/sec
- getGlobalProps() x 1,6m ops/sec
- getEventProps() x 926m ops/sec