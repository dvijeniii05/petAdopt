/**
 * @format
 */

import 'react-native';
import Sum from '../JestLearning/mathJS'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('JS test', () => {
  expect(Sum(1,6)).toEqual(7)
})
