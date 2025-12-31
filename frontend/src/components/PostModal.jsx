import React, { useState, useEffect } from 'react';
import { postsAPI } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { Loading } from './Loading';

export const PostModal = ({ post, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        description: post.description || '',
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (post) {
        await postsAPI.updatePost(post._id, formData.title, formData.description);
        showToast('Post updated successfully!', 'success');
      } else {
        await postsAPI.createPost(formData.title, formData.description);
        showToast('Post created successfully!', 'success');
      }
      onSave();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loading show={loading} />
      <div className="modal active" onClick={(e) => {
        if (e.target.classList.contains('modal')) {
          onClose();
        }
      }}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{post ? 'Edit Post' : 'Create Post'}</h2>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="post-title">Title</label>
              <input
                type="text"
                id="post-title"
                placeholder="Enter post title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="post-description">Description</label>
              <textarea
                id="post-description"
                rows="5"
                placeholder="Write your post content..."
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
