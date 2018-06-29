# 2.2.0 - Performance refactor.

## Before refactor
- getAllProps() x 31 thousand ops/sec
- getElementProps('label') x 35 thousand ops/sec
- getGlobalProps() x 1,6 million ops/sec
- getEventProps() x 926 million ops/sec

## After refactor
- getAllProps() x 326 thousand ops/sec
- getElementProps('label') x 914 thousand ops/sec
- getGlobalProps() x 1,6 million ops/sec
- getEventProps() x 973 million ops/sec

### Also

Added benchmark.

Renamed and moved code around in files.

Added script to create lists.

Separated base lists from lists I create with script.

GetElementProps is now more robust against invalid elements.

Invalid option objects now throw. It used to only warn and return undefined.