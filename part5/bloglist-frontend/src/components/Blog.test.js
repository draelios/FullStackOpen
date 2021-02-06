/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

describe('tests for the Blog component', () => {
  const blog = {
    author: 'Albert el autor',
    title: 'El título del libro',
    url: 'www.google.com',
    likes: 10,
  };
  let component;

  const mockHandler = jest.fn();
  beforeEach(() => {
    component = render(
      <Blog blog={blog} editBlog={mockHandler} />,
    );
  });

  test('Blog component only renders title and author initially', () => {
    expect(component.container).toHaveTextContent(`${blog.title} by ${blog.author} `);

    const details = component.container.querySelector('.details');
    expect(details).toHaveStyle('display: none');
  });

  test('Blog component shows url and likes after button \'Show info\' is clicked', () => {
    const details = component.container.querySelector('.details');
    expect(details).toHaveStyle('display: none');

    const button = component.getByText('Show info');
    fireEvent.click(button);

    expect(details).toHaveStyle('display: block');
  });

  test('Like button triggers as many times as clicked', () => {
    const button = component.getByText('Like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
