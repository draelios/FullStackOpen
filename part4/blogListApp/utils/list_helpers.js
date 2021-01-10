// eslint-disable-next-line import/no-extraneous-dependencies
const _ = require('lodash');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const listBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422ab91b54a676234d17f8',
    title: 'Emotional intelligence',
    author: 'Daniel Golleman',
    url: 'http://www.EQ.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422ab91b54a676234d17f8',
    title: 'Emotional intelligence applied to work',
    author: 'Daniel Golleman',
    url: 'http://www.EQ.com/',
    likes: 4,
    __v: 0,
  },
  {
    _id: '5a422ab91b54a676234d17f8',
    title: 'Radical Focus',
    author: 'No one',
    url: 'www.okr.com',
    likes: 1,
    __v: 0,
  },
];

const listFavouritesBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422ab91b54a676234d17f8',
    title: 'Emotional intelligence',
    author: 'Daniel Golleman',
    url: 'http://www.EQ.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422ab91b54a676234d17f8',
    title: 'Radical Focus',
    author: 'No one',
    url: 'www.okr.com',
    likes: 7,
    __v: 0,
  },
];

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  // eslint-disable-next-line prefer-spread
  const maxLikes = Math.max.apply(Math, blogs.map((blog) => blog.likes));
  const resultBlog = blogs.find((blog) => blog.likes === maxLikes);
  const returnBlog = {
    title: resultBlog.title, author: resultBlog.author, likes: resultBlog.likes,
  };
  return returnBlog;
};

const mostBlogsAuthor = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const groupedLikes = _.countBy(blogs, 'author');

  const answer = _(groupedLikes).map((objs, key) => ({
    author: key,
    blogs: objs,
  }))
    .value();

  return _.maxBy(answer, 'blogs');
};

const mostLikedAuthor = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const groupedLikes = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value();

  const answer = _.maxBy(groupedLikes, 'likes');

  return answer;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogsAuthor,
  mostLikedAuthor,
  listWithOneBlog,
  listBlogs,
  listFavouritesBlogs,
};
