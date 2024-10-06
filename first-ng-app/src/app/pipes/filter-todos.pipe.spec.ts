import { FilterTodosPipe } from './filter-todos.pipe';

describe('FilterTodosPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTodosPipe();
    expect(pipe).toBeTruthy();
  });
});
