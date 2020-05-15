import Api from './Api';

export default {
  getPosts(limit) {
    return Api().get(`posts/${limit}`, limit);
  },
  deletePost(id) {
    return Api().delete(`/post/${id}`);
  },
  editPost(post) {
    return Api().put(`/post/${post.id}`, post);
  },
  addPost(post) {
    return Api().post('post', post);
  }
}