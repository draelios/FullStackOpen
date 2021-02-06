/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('Blog form testing', () => {
  test('Forms send the data it has when submitted', () => {
    const createBlog = jest.fn();
    const component = render(
      <BlogForm handleSumbit={createBlog} />,
    );

    fireEvent.input(component.container.querySelector('#title'), {
      target: {
        value: 'My title',
      },
    });
    fireEvent.input(component.container.querySelector('#author'), {
      target: {
        value: 'My author',
      },
    });
    fireEvent.input(component.container.querySelector('#url'), {
      target: {
        value: 'My url',
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Create/i }));

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('My title');
    expect(createBlog.mock.calls[0][0].author).toBe('My author');
    expect(createBlog.mock.calls[0][0].url).toBe('My url');
  });
});
