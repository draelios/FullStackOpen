const listHelper = require('../utils/list_helpers.js');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes tests', () => {
  test('No blogs counts as 0 likes', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('Only one blog, equals likes of the blog', () => {
    expect(listHelper.totalLikes(listHelper.listWithOneBlog)).toBe(5);
  });

  test('Total number of likes summed correctly', () => {
    expect(listHelper.totalLikes(listHelper.listBlogs)).toBe(17);
  });
});

describe('Favourite blog test', () => {
  const favouriteBlog = {
    title: 'Emotional intelligence',
    author: 'Daniel Golleman',
    likes: 7,
  };

  test('No blogs', () => {
    expect(listHelper.favouriteBlog([])).toEqual({});
  });

  test('One favourite blog should return that blog', () => {
    expect(listHelper.favouriteBlog(listHelper.listBlogs)).toEqual(favouriteBlog);
  });

  test('Many favourtie blogs, should return one of the top blogs', () => {
    expect(listHelper.favouriteBlog(listHelper.listFavouritesBlogs)).toEqual(favouriteBlog);
  });
});

describe('Most blogs author', () => {
  const blogsAuthor = {
    author: 'Daniel Golleman',
    blogs: 2,
  };

  test('No blogs', () => {
    expect(listHelper.mostBlogsAuthor([])).toEqual({});
  });

  test('One blog should return that blog author and count of 1', () => {
    expect(listHelper.mostBlogsAuthor(listHelper.listWithOneBlog)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('Authors with multplies blogs return correct author', () => {
    expect(listHelper.mostBlogsAuthor(listHelper.listBlogs)).toEqual(blogsAuthor);
  });
});

describe('Most liked author', () => {
  const favouriteAuthor = {
    author: 'Daniel Golleman',
    likes: 11,
  };

  test('No blogs', () => {
    expect(listHelper.mostLikedAuthor([])).toEqual({});
  });

  test('One blog should return that blog author and likes', () => {
    expect(listHelper.mostLikedAuthor(listHelper.listWithOneBlog)).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('Authors with multplies blogs return correct author', () => {
    expect(listHelper.mostLikedAuthor(listHelper.listBlogs)).toEqual(favouriteAuthor);
  });
});
